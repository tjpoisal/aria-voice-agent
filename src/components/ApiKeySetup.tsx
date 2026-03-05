import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, SafeAreaView, Alert, KeyboardAvoidingView, Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS } from '../lib/styles';

interface Props { onReady: () => void; }

export function ApiKeySetup({ onReady }: Props) {
  const [key, setKey] = useState('');
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    const trimmed = key.trim();
    if (!trimmed) { Alert.alert('Error', 'Please enter your Anthropic API key'); return; }
    setSaving(true);
    try {
      await AsyncStorage.setItem('aria_api_key', trimmed);
      onReady();
    } catch (e) {
      Alert.alert('Error', 'Failed to save key');
    } finally {
      setSaving(false);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={styles.shell}>
          <View style={styles.icon}><Text style={styles.iconTxt}>🎙</Text></View>
          <Text style={styles.title}>Aria</Text>
          <Text style={styles.sub}>AI Voice Agent</Text>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Anthropic API Key</Text>
            <Text style={styles.cardSub}>
              Powers Aria's brain. Your key is stored securely on-device only.
              Voice is handled by iOS built-in TTS — no other keys needed.
            </Text>
            <TextInput
              style={styles.input}
              value={key}
              onChangeText={setKey}
              placeholder="sk-ant-api03-..."
              placeholderTextColor={COLORS.dim}
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
            />
            <TouchableOpacity
              style={[styles.btn, saving && styles.btnDisabled]}
              onPress={handleSave}
              disabled={saving}
            >
              <Text style={styles.btnTxt}>{saving ? 'Saving...' : 'Connect Aria →'}</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.foot}>
            Get your key at console.anthropic.com
          </Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.void },
  flex: { flex: 1 },
  shell: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  icon: {
    width: 72, height: 72, borderRadius: 20,
    backgroundColor: COLORS.violet, alignItems: 'center',
    justifyContent: 'center', marginBottom: 16,
    shadowColor: COLORS.violet, shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5, shadowRadius: 20,
  },
  iconTxt: { fontSize: 32 },
  title: { fontSize: 32, fontWeight: '800', color: COLORS.text, letterSpacing: -0.8 },
  sub: { fontSize: 14, color: COLORS.sub, marginBottom: 32 },
  card: {
    width: '100%', backgroundColor: COLORS.panel,
    borderWidth: 1, borderColor: COLORS.edge,
    borderRadius: 16, padding: 20,
  },
  cardTitle: { fontSize: 14, fontWeight: '700', color: COLORS.text, marginBottom: 4 },
  cardSub: { fontSize: 12, color: COLORS.sub, lineHeight: 18, marginBottom: 16 },
  input: {
    backgroundColor: COLORS.void, borderWidth: 1, borderColor: COLORS.edge,
    borderRadius: 10, padding: 12, color: COLORS.text,
    fontSize: 13, fontFamily: 'Courier', marginBottom: 12,
  },
  btn: {
    backgroundColor: COLORS.violet, borderRadius: 10,
    padding: 14, alignItems: 'center',
  },
  btnDisabled: { opacity: 0.5 },
  btnTxt: { color: '#fff', fontWeight: '700', fontSize: 15 },
  foot: { fontSize: 11, color: COLORS.dim, marginTop: 20 },
});
