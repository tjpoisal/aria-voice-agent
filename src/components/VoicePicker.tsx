import React from 'react';
import { ScrollView, TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { COLORS } from '../lib/styles';
import { VOICES } from '../lib/tts';

interface Props { selected: string; onSelect: (id: string) => void; }

export function VoicePicker({ selected, onSelect }: Props) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.row}>
      {VOICES.map(v => (
        <TouchableOpacity
          key={v.id}
          style={[styles.chip, selected === v.id && styles.chipActive]}
          onPress={() => onSelect(v.id)}
        >
          <Text style={[styles.label, selected === v.id && styles.labelActive]}>{v.label}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  row: { gap: 6, paddingVertical: 2 },
  chip: {
    paddingHorizontal: 13, paddingVertical: 6, borderRadius: 20,
    borderWidth: 1, borderColor: COLORS.edge, backgroundColor: COLORS.panel,
  },
  chipActive: { backgroundColor: 'rgba(124,111,247,0.12)', borderColor: 'rgba(124,111,247,0.4)' },
  label: { fontSize: 12, fontWeight: '600', color: COLORS.sub },
  labelActive: { color: COLORS.violet },
});
