"use client";

import { useState, useEffect } from 'react';

export default function Home() {
  const [question, setQuestion] = useState<string>('');
  const [pdfText, setPdfText] = useState<string>(''); // Asume que ya tienes el texto del PDF
  const [answer, setAnswer] = useState<string | null>(null);

  useEffect(() => {
    // Aquí cargarías el texto del PDF una vez al montar el componente
    fetch('/pdf/mi_informacion.pdf')
      .then(res => res.text())
      .then(text => setPdfText(text));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ question, text: pdfText }),
    });

    const data = await res.json();
    setAnswer(data.answer || 'No se pudo obtener una respuesta.');
  };

  const handleReset = async () => {
    await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ reset: true }),
    });
    setAnswer(null);
    setQuestion('');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">MaxiBOT</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Haz una pregunta sobre Maxi..."
          className="p-2 border border-gray-300 rounded w-full"
        />
        <button
          type="submit"
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Enviar
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Reiniciar Conversación
        </button>
      </form>
      {answer && <p className="mt-4 text-lg whitespace-pre-line">{answer}</p>}
    </div>
  );
}