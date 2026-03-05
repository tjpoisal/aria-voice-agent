import * as Speech from 'expo-speech';

export const VOICES = [
  { id: 'com.apple.ttsbundle.Samantha-compact', label: '🌸 Samantha', lang: 'en-US' },
  { id: 'com.apple.ttsbundle.Karen-compact',    label: '🇦🇺 Karen',    lang: 'en-AU' },
  { id: 'com.apple.ttsbundle.Moira-compact',    label: '🇮🇪 Moira',    lang: 'en-IE' },
  { id: 'com.apple.ttsbundle.Daniel-compact',   label: '🎩 Daniel',   lang: 'en-GB' },
  { id: 'com.apple.ttsbundle.Tessa-compact',    label: '🌍 Tessa',    lang: 'en-ZA' },
  { id: 'default',                              label: '🔊 Default',  lang: 'en-US' },
];

export async function speak(text: string, voiceId: string): Promise<void> {
  return new Promise((resolve, reject) => {
    Speech.stop();
    const options: Speech.SpeechOptions = {
      rate: 0.95,
      pitch: 1.0,
      language: 'en-US',
      onDone: resolve,
      onError: (err) => {
        console.warn('TTS error, retrying with default:', err);
        // Fallback to default voice
        Speech.speak(text, { rate: 0.95, onDone: resolve, onError: reject });
      },
    };
    if (voiceId !== 'default') {
      options.voice = voiceId;
    }
    Speech.speak(text, options);
  });
}

export function stopSpeaking() {
  Speech.stop();
}
