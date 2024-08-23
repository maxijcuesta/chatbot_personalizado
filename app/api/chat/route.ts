import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import fs from 'fs';
import path from 'path';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Inicializar el historial de la conversación
let conversationHistory: Array<{ role: 'user' | 'assistant' | 'system'; content: string }> = [];

export async function POST(req: NextRequest) {
  const { question, reset } = await req.json();

  if (reset || conversationHistory.length === 0) {
    conversationHistory = [];
  }

  // Limitar el historial a las últimas 3 preguntas
  while (conversationHistory.filter(msg => msg.role === 'user').length > 3) {
    conversationHistory.shift();
  }

  // Agregar la pregunta del usuario al historial
  conversationHistory.push({ role: 'user', content: question });

  // Cargar y agregar los fragmentos del PDF
  const fragmentsDir = path.resolve('./public/pdf/fragments');
  const fragmentFiles = fs.readdirSync(fragmentsDir);

  for (const fragmentFile of fragmentFiles) {
    const fragmentPath = path.join(fragmentsDir, fragmentFile);
    const fragmentText = fs.readFileSync(fragmentPath, 'utf-8');
    conversationHistory.unshift({ role: 'system', content: fragmentText });
  }

  // Definir el role del sistema para guiar el tono de las respuestas
    conversationHistory.unshift({
        role: 'system',
        content: 'Eres un asistente amigable y conversacional. Responde de manera breve, como si estuvieras charlando con un amigo, usando un lenguaje relajado y cercano. Mantén las respuestas cortas, en no más de dos o tres frases.'
    });

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: conversationHistory,
      max_tokens: 100,
      temperature: 0.8,
    });

    const answer = response.choices[0]?.message?.content;

    // Dejar la respuesta tal cual, confiando en que el `system` role la ha guiado correctamente
    conversationHistory.push({ role: 'assistant', content: answer || '' });

    return NextResponse.json({ answer });
  } catch (error) {
    console.error('Error al llamar a la API de OpenAI:', error);
    return NextResponse.json({ error: 'Error al generar la respuesta' }, { status: 500 });
  }
}