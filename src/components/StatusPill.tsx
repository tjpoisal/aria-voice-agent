import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../lib/styles';
import type { AgentStatus } from '../hooks/useAria';

export function StatusPill({ status }: { status: AgentStatus }) {
  const config = {
    idle:      { label: 'ready',       bg: COLORS.panel,  text: COLORS.sub,    border: COLORS.edge },
    listening: { label: 'listening...', bg: 'rgba(0,232,200,0.08)', text: COLORS.aqua, border: 'rgba(0,232,200,0.3)' },
    thinking:  { label: 'thinking...',  bg: 'rgba(124,111,247,0.08)', text: COLORS.violet, border: 'rgba(124,111,247,0.3)' },
    speaking:  { label: 'speaking...',  bg: 'rgba(240,80,122,0.08)', text: COLORS.rose, border: 'rgba(240,80,122,0.3)' },
  }[status];

  return (
    <View style={[styles.pill, { backgroundColor: config.bg, borderColor: config.border }]}>
      <View style={[styles.dot, { backgroundColor: config.text }]} />
      <Text style={[styles.label, { color: config.text }]}>{config.label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    paddingHorizontal: 12, paddingVertical: 5, borderRadius: 20, borderWidth: 1,
  },
  dot: { width: 7, height: 7, borderRadius: 3.5 },
  label: { fontSize: 11, fontWeight: '600', fontFamily: 'Courier' },
});
