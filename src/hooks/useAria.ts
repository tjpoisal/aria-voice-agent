import { useState, useCallback, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { streamClaude, Message } from '../lib/claude';
import { speak, stopSpeaking } from '../lib/tts';
import { VOICES } from '../lib/tts';
import { Audio } from 'expo-av';

export type AgentStatus = 'idle' | 'listening' | 'thinking' | 'speaking';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface UseAriaOptions {
  apiKeyReady: boolean;
}

export function useAria({ apiKeyReady }: UseAriaOptions) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [status, setStatus] = useState<AgentStatus>('idle');
  const [selectedVoice, setSelectedVoice] = useState(VOICES[0].id);
  const [isListening, setIsListening] = useState(false);
  const [isBusy, setIsBusy] = useState(false);
  const historyRef = useRef<Message[]>([]);
  const recordingRef = useRef<Audio.Recording | null>(null);

  const getApiKey = useCallback(async () => {
    return await AsyncStorage.getItem('aria_api_key');
  }, []);

  const processQuery = useCallback(async (userText: string) => {
    if (isBusy) return;
    setIsBusy(true);
    const userMsg: ChatMessage = { role: 'user', content: userText };
    setMessages(prev => [...prev, userMsg]);
    historyRef.current.push({ role: 'user', content: userText });
    setStatus('thinking');

    try {
      const apiKey = await getApiKey();
      if (!apiKey) throw new Error('No API key');

      // Add streaming AI message
      let aiText = '';
      setMessages(prev => [...prev, { role: 'assistant', content: '' }]);

      aiText = await streamClaude(
        historyRef.current,
        apiKey,
        (chunk) => {
          setMessages(prev => {
            const updated = [...prev];
            updated[updated.length - 1] = { role: 'assistant', content: chunk };
            return updated;
          });
        },
      );

      historyRef.current.push({ role: 'assistant', content: aiText });

      // Speak the response
      setStatus('speaking');
      await speak(aiText, selectedVoice);
    } catch (err: any) {
      console.error('Aria error:', err);
      setMessages(prev => [...prev, { role: 'assistant', content: `Error: ${err.message}` }]);
    } finally {
      setStatus('idle');
      setIsBusy(false);
    }
  }, [isBusy, selectedVoice, getApiKey]);

  const startListening = useCallback(async () => {
    try {
      const { granted } = await Audio.requestPermissionsAsync();
      if (!granted) { alert('Microphone permission required'); return; }
      await Audio.setAudioModeAsync({ allowsRecordingIOS: true, playsInSilentModeIOS: true });
      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      recordingRef.current = recording;
      setIsListening(true);
      setStatus('listening');
    } catch (e) {
      console.error('Start recording failed:', e);
    }
  }, []);

  const stopListening = useCallback(async () => {
    if (!recordingRef.current) return;
    setIsListening(false);
    setStatus('thinking');
    try {
      await recordingRef.current.stopAndUnloadAsync();
      const uri = recordingRef.current.getURI();
      recordingRef.current = null;
      if (!uri) return;

      // Transcribe via Whisper API
      const apiKey = await getApiKey();
      if (!apiKey) throw new Error('No API key');
      const formData = new FormData();
      formData.append('file', { uri, name: 'audio.m4a', type: 'audio/m4a' } as any);
      formData.append('model', 'whisper-1');
      const res = await fetch('https://api.openai.com/v1/audio/transcriptions', {
        method: 'POST',
        headers: { Authorization: `Bearer ${apiKey}` },
        body: formData,
      });
      // Fallback: if Whisper fails, just process empty (user can type)
      if (res.ok) {
        const data = await res.json();
        if (data.text?.trim()) await processQuery(data.text.trim());
        else setStatus('idle');
      } else {
        setStatus('idle');
        alert('Could not transcribe audio. Try typing instead.');
      }
    } catch (e) {
      console.error('Stop recording error:', e);
      setStatus('idle');
    }
  }, [getApiKey, processQuery]);

  const toggleListen = useCallback(() => {
    if (isBusy && !isListening) return;
    if (isListening) stopListening();
    else startListening();
  }, [isBusy, isListening, startListening, stopListening]);

  const sendText = useCallback((text: string) => {
    processQuery(text);
  }, [processQuery]);

  return {
    messages, status, selectedVoice, setSelectedVoice,
    isListening, toggleListen, sendText, isBusy,
  };
}
