import React, { useEffect, useRef } from 'react';
import { View, TouchableOpacity, Text, Animated, StyleSheet } from 'react-native';
import { COLORS } from '../lib/styles';
import type { AgentStatus } from '../hooks/useAria';

interface Props { status: AgentStatus; isListening: boolean; onPress: () => void; disabled?: boolean; }

export function OrbButton({ status, isListening, onPress, disabled }: Props) {
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (status === 'listening' || status === 'speaking') {
      const anim = Animated.loop(
        Animated.sequence([
          Animated.timing(scale, { toValue: 1.08, duration: 700, useNativeDriver: true }),
          Animated.timing(scale, { toValue: 1.0, duration: 700, useNativeDriver: true }),
        ])
      );
      anim.start();
      return () => anim.stop();
    } else if (status === 'thinking') {
      const anim = Animated.loop(
        Animated.sequence([
          Animated.timing(scale, { toValue: 1.04, duration: 350, useNativeDriver: true }),
          Animated.timing(scale, { toValue: 0.97, duration: 350, useNativeDriver: true }),
        ])
      );
      anim.start();
      return () => anim.stop();
    } else {
      Animated.spring(scale, { toValue: 1, useNativeDriver: true }).start();
    }
  }, [status]);

  const icons = { idle: '🎙', listening: '👂', thinking: '🧠', speaking: '🔊' };
  const orbColor = {
    idle: COLORS.violet, listening: COLORS.aqua2,
    thinking: COLORS.violet, speaking: COLORS.rose,
  };

  return (
    <View style={styles.wrap}>
      <TouchableOpacity onPress={onPress} disabled={disabled} activeOpacity={0.8}>
        <Animated.View style={[styles.orb, { backgroundColor: orbColor[status], transform: [{ scale }] }]}>
          <Text style={styles.icon}>{icons[status]}</Text>
        </Animated.View>
      </TouchableOpacity>
      <View style={styles.wave}>
        {Array.from({ length: 9 }).map((_, i) => (
          <View key={i} style={[styles.wbar,
            (status === 'listening' || status === 'speaking') && styles.wbarActive]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { alignItems: 'center', gap: 10 },
  orb: {
    width: 110, height: 110, borderRadius: 55,
    alignItems: 'center', justifyContent: 'center',
    shadowColor: COLORS.violet, shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.5, shadowRadius: 20, elevation: 10,
  },
  icon: { fontSize: 36 },
  wave: { flexDirection: 'row', alignItems: 'center', gap: 3, height: 20 },
  wbar: { width: 3, height: 4, borderRadius: 2, backgroundColor: COLORS.dim },
  wbarActive: { backgroundColor: COLORS.aqua },
});
