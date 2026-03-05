import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../lib/styles';
import type { ChatMessage } from '../hooks/useAria';

export function MessageBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === 'user';
  return (
    <View style={[styles.row, isUser && styles.rowUser]}>
      <View style={[styles.avatar, isUser ? styles.avatarUser : styles.avatarAi]}>
        <Text>{isUser ? '🙂' : '🎙'}</Text>
      </View>
      <View style={styles.body}>
        <Text style={[styles.who, isUser ? styles.whoUser : styles.whoAi]}>
          {isUser ? 'You' : 'Aria'}
        </Text>
        <Text style={styles.content}>{message.content}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: 9, marginBottom: 10 },
  rowUser: {},
  avatar: {
    width: 28, height: 28, borderRadius: 8,
    alignItems: 'center', justifyContent: 'center',
  },
  avatarUser: { backgroundColor: 'rgba(124,111,247,0.15)' },
  avatarAi: { backgroundColor: 'rgba(0,232,200,0.12)' },
  body: { flex: 1 },
  who: { fontSize: 10, fontWeight: '700', letterSpacing: 0.9, textTransform: 'uppercase', marginBottom: 3 },
  whoUser: { color: COLORS.violet },
  whoAi: { color: COLORS.aqua },
  content: { fontSize: 14, lineHeight: 21, color: COLORS.text },
});
