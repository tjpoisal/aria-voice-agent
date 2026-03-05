# Aria — AI Voice Agent

A React Native (Expo) iOS app that replaces Siri-style link lists with a real AI voice assistant.
**Claude Sonnet** for the brain. **iOS native TTS** for the voice (free, no API needed).

## Features
- 🎙 Tap orb or mic → speak your question
- 🧠 Claude answers directly in natural language (no link lists, no bullet points)  
- 🔊 Response spoken aloud via iOS native TTS voices (Samantha, Karen, Daniel, etc.)
- 💬 Full conversation history displayed on screen
- ⌨️ Text input fallback
- 🔑 API key stored securely on-device

## Setup

```bash
npm install
npx expo start
```

Scan QR code with **Expo Go** on your iPhone, or build for direct install:

```bash
npx eas build --platform ios --profile preview
```

## Required
- Anthropic API key (enter on first launch) — get at console.anthropic.com
- iOS 16+ for best TTS voice quality

## Stack
- Expo SDK 52 / React Native 0.76
- expo-speech (iOS TTS — free, on-device)
- expo-av (microphone recording)  
- Claude Sonnet via Anthropic API (streaming)
- AsyncStorage for key persistence

## Project: Get Stack MAX LLC
Built by Tim Poisal | tim@getstackmax.com
