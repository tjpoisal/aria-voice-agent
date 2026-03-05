import React, { useState, useRef, useCallback } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, ScrollView,
  StyleSheet, Animated, KeyboardAvoidingView, Platform,
  SafeAreaView, Alert,
} from 'react-native';
import { useAria } from '../src/hooks/useAria';
import { OrbButton } from '../src/components/OrbButton';
import { MessageBubble } from '../src/components/MessageBubble';
import { VoicePicker } from '../src/components/VoicePicker';
import { ApiKeySetup } from '../src/components/ApiKeySetup';
import { StatusPill } from '../src/components/StatusPill';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from './styles';

export default function HomeScreen() {
  const scrollRef = useRef<ScrollView>(null);
  const [textInput, setTextInput] = useState('');
  const [apiKeyReady, setApiKeyReady] = useState(false);

  const {
    messages,
    status,
    selectedVoice,
    setSelectedVoice,
    isListening,
    toggleListen,
    sendText,
    isBusy,
  } = useAria({ apiKeyReady });

  const handleSend = useCallback(() => {
    if (!textInput.trim() || isBusy) return;
    sendText(textInput.trim());
    setTextInput('');
  }, [textInput, isBusy, sendText]);

  const scrollToBottom = useCallback(() => {
    setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 100);
  }, []);

  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  if (!apiKeyReady) {
    return <ApiKeySetup onReady={() => setApiKeyReady(true)} />;
  }

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={0}
      >
        <View style={styles.shell}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.agentId}>
              <View style={styles.agentIcon}>
                <Text style={styles.agentIconText}>🎙</Text>
              </View>
              <View>
                <Text style={styles.agentName}>Aria</Text>
                <Text style={styles.agentSub}>Claude · Free TTS</Text>
              </View>
            </View>
            <StatusPill status={status} />
          </View>

          {/* Voice Picker */}
          <VoicePicker selected={selectedVoice} onSelect={setSelectedVoice} />

          {/* Orb */}
          <OrbButton
            status={status}
            isListening={isListening}
            onPress={toggleListen}
            disabled={isBusy}
          />

          {/* Transcript / Messages */}
          <ScrollView
            ref={scrollRef}
            style={styles.transcript}
            contentContainerStyle={styles.transcriptContent}
            showsVerticalScrollIndicator={false}
          >
            {messages.length === 0 ? (
              <View style={styles.empty}>
                <Text style={styles.emptyIcon}>🎙</Text>
                <Text style={styles.emptyText}>
                  Tap the orb or mic to speak{'\n'}Aria answers out loud — no link lists
                </Text>
              </View>
            ) : (
              messages.map((msg, i) => (
                <MessageBubble key={i} message={msg} />
              ))
            )}
          </ScrollView>

          {/* Text Input Row */}
          <View style={styles.inputRow}>
            <TouchableOpacity
              style={[styles.micBtn, isListening && styles.micBtnActive]}
              onPress={toggleListen}
              disabled={isBusy}
            >
              <Text style={styles.micBtnIcon}>{isListening ? '⏹' : '🎤'}</Text>
            </TouchableOpacity>
            <TextInput
              style={styles.textInput}
              value={textInput}
              onChangeText={setTextInput}
              placeholder="Or type here..."
              placeholderTextColor="#323A58"
              onSubmitEditing={handleSend}
              returnKeyType="send"
              editable={!isBusy}
            />
            <TouchableOpacity
              style={[styles.sendBtn, isBusy && styles.sendBtnDisabled]}
              onPress={handleSend}
              disabled={isBusy}
            >
              <Text style={styles.sendBtnText}>Send</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
