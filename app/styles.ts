import { StyleSheet } from 'react-native';
import { COLORS } from '../src/lib/styles';

export const styles = StyleSheet.create({
  flex: { flex: 1 },
  safe: { flex: 1, backgroundColor: COLORS.void },
  shell: { flex: 1, paddingHorizontal: 18, paddingBottom: 8, gap: 12 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 8 },
  agentId: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  agentIcon: {
    width: 38, height: 38, borderRadius: 10,
    backgroundColor: COLORS.violet, alignItems: 'center', justifyContent: 'center',
  },
  agentIconText: { fontSize: 18 },
  agentName: { fontSize: 16, fontWeight: '800', color: COLORS.text, letterSpacing: -0.3 },
  agentSub: { fontSize: 10, color: COLORS.sub, marginTop: 1 },
  transcript: { flex: 1, backgroundColor: COLORS.panel, borderRadius: 14, borderWidth: 1, borderColor: COLORS.edge },
  transcriptContent: { padding: 14, flexGrow: 1 },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', opacity: 0.4, gap: 8, minHeight: 120 },
  emptyIcon: { fontSize: 28 },
  emptyText: { fontSize: 12, color: COLORS.sub, textAlign: 'center', lineHeight: 18 },
  inputRow: { flexDirection: 'row', gap: 8 },
  micBtn: {
    width: 42, height: 42, borderRadius: 10,
    backgroundColor: COLORS.lift, alignItems: 'center', justifyContent: 'center',
  },
  micBtnActive: { backgroundColor: 'rgba(0,232,200,0.15)' },
  micBtnIcon: { fontSize: 18 },
  textInput: {
    flex: 1, backgroundColor: COLORS.panel, borderWidth: 1, borderColor: COLORS.edge,
    borderRadius: 10, paddingHorizontal: 14, paddingVertical: 10,
    color: COLORS.text, fontSize: 13,
  },
  sendBtn: {
    paddingHorizontal: 18, paddingVertical: 10, borderRadius: 10,
    backgroundColor: COLORS.violet, justifyContent: 'center',
  },
  sendBtnDisabled: { opacity: 0.4 },
  sendBtnText: { color: '#fff', fontWeight: '700', fontSize: 13 },
});
