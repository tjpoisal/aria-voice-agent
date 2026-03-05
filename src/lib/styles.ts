import { StyleSheet } from 'react-native';
export const COLORS = {
  void: '#05060C', deep: '#090C14', panel: '#0F1220', card: '#141828',
  lift: '#1A1F30', edge: '#1F2638', line: '#2A3050',
  text: '#E2E8FF', sub: '#6B75A0', dim: '#323A58',
  aqua: '#00E8C8', aqua2: '#00C4A8',
  violet: '#7C6FF7', violet2: '#5B57D4',
  rose: '#F0507A', gold: '#F5C842',
};
export const S = StyleSheet.create({
  flex: { flex: 1 },
  safe: { flex: 1, backgroundColor: COLORS.void },
  shell: { flex: 1, paddingHorizontal: 18, paddingBottom: 8, gap: 12 },
  header: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between', paddingTop: 8,
  },
  agentId: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  agentIcon: {
    width: 38, height: 38, borderRadius: 10,
    backgroundColor: COLORS.violet, alignItems: 'center', justifyContent: 'center',
  },
  agentIconText: { fontSize: 18 },
  agentName: { fontSize: 16, fontWeight: '800', color: COLORS.text, letterSpacing: -0.3 },
  agentSub: { fontSize: 10, color: COLORS.sub, marginTop: 1 },
});
