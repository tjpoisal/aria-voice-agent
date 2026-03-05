// Claude API streaming client for Aria
const CLAUDE_MODEL = 'claude-sonnet-4-20250514';
const SYSTEM_PROMPT = `You are Aria, a smart, warm, direct AI voice assistant. Your responses are spoken aloud, so:
- Answer directly and completely — no "I found these links", no web result lists, no bullet points
- Use natural spoken language, plain sentences only  
- Keep it concise: 2-4 sentences max unless more detail is truly needed
- Be conversational, confident, and helpful`;

export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export async function streamClaude(
  messages: Message[],
  apiKey: string,
  onChunk: (text: string) => void,
): Promise<string> {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: CLAUDE_MODEL,
      max_tokens: 350,
      system: SYSTEM_PROMPT,
      messages: messages.slice(-12),
      stream: true,
    }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error((err as any).error?.message || `HTTP ${response.status}`);
  }

  const reader = response.body!.getReader();
  const decoder = new TextDecoder();
  let fullText = '';
  let buffer = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split('\n');
    buffer = lines.pop() ?? '';
    for (const line of lines) {
      if (!line.startsWith('data: ')) continue;
      const data = line.slice(6).trim();
      if (data === '[DONE]') continue;
      try {
        const json = JSON.parse(data);
        if (json.type === 'content_block_delta' && json.delta?.text) {
          fullText += json.delta.text;
          onChunk(fullText);
        }
      } catch {}
    }
  }
  return fullText;
}
