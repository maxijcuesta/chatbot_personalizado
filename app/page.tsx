"use client";

import { useState, useEffect } from 'react';

export default function Home() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [question, setQuestion] = useState<string>('');
  const [pdfText, setPdfText] = useState<string>(''); 
  const [answer, setAnswer] = useState<string | null>(null);
  const [conversation, setConversation] = useState<Array<{ sender: string, message: string }>>([]);

  useEffect(() => {
    fetch('/pdf/mi_informacion.pdf')
      .then(res => res.text())
      .then(text => setPdfText(text));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Agregar la pregunta al historial de la conversación
    setConversation((prev) => [...prev, { sender: 'user', message: question }]);

    setIsLoading(true); // Mostrar botón de cargando

    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ question, text: pdfText }),
    });

    const data = await res.json();
    setAnswer(data.answer || 'No se pudo obtener una respuesta.');

    // Agregar la respuesta al historial de la conversación
    setConversation((prev) => [...prev, { sender: 'bot', message: data.answer || 'No se pudo obtener una respuesta.' }]);
    
    setIsLoading(false); // Ocultar botón de cargando
    setQuestion(''); // Limpiar el input de la pregunta
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
    setConversation([]);
  };

  const handleChatToggle = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <div className="relative">
      {/* Botón de Robot */}
      <button
        onClick={handleChatToggle}
        className="fixed bottom-5 right-5 bg-[#25D366] p-4 rounded-full shadow-lg flex items-center justify-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 64 64"
          fill="currentColor"
          className="w-8 h-8 text-white"
        >
          <rect x="14" y="16" width="36" height="32" rx="8" ry="8" fill="white" stroke="#25D366" strokeWidth="2"/>
          <circle cx="22" cy="30" r="6" fill="#25D366"/>
          <circle cx="42" cy="30" r="6" fill="#25D366"/>
          <rect x="24" y="42" width="16" height="6" rx="3" ry="3" fill="#25D366"/>
          <path d="M14 20 L24 10 L34 20" stroke="#25D366" strokeWidth="2" fill="none"/> {/* Antena izquierda */}
          <path d="M50 20 L40 10 L30 20" stroke="#25D366" strokeWidth="2" fill="none"/> {/* Antena derecha */}
          <rect x="22" y="24" width="20" height="4" fill="#25D366"/> {/* Barra en la frente */}
          <rect x="20" y="8" width="24" height="8" rx="4" ry="4" fill="#25D366"/>
          <circle cx="32" cy="46" r="6" fill="#25D366"/>
        </svg>
      </button>

      {/* Contenedor del Chatbot */}
      {isChatOpen && (
        <div className="fixed bottom-20 right-5 w-80 h-[45rem] bg-black rounded-lg shadow-lg flex flex-col z-50">
          <div className="chatbot-header bg-[#386DBD] text-white p-4 rounded-t-lg flex justify-between items-center">
            <h3>MaxiBOT</h3>
            <button onClick={handleChatToggle} className="text-white text-xl font-bold">×</button>
          </div>
          <div id="chatbotMessages" className="chatbot-messages flex-grow p-4 overflow-y-auto bg-gray-100 text-black">
          Hola, soy tu asistente personal con IA. 🤖 Puedes consultarme cualquier duda que tengas sobre Maxi. Todavía estoy aprendiendo, así que a veces puedo cometer errores.
              <br /><br />
              ¿Qué preguntas tienes?
            {conversation.map((msg, index) => (
              <div
                key={index}
                className={`p-2 rounded-lg mb-2 ${
                  msg.sender === 'user' ? 'bg-[#386DBD] text-right ml-auto text-white' : 'bg-gray-300 text-black'
                }`}
              >
                {msg.message}
              </div>
            ))}
          </div>
          <div className="chatbot-input flex p-4 bg-black border-t border-gray-200">
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Escribe tu pregunta sobre Maxi"
              className="flex-grow p-2 border rounded-lg mr-2 text-black"
            />
            <button
              onClick={handleSubmit}
              className="bg-blue-600 text-black p-2 rounded-full flex items-center justify-center w-10 h-10"
            >
              {isLoading ? (
                <svg
                  className="animate-spin h-5 w-5 text-black"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8z"
                  ></path>
                </svg>
              ) : (
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M15.854 8.354a.5.5 0 0 0 0-.708l-4.146-4.146a.5.5 0 0 0-.708.708L14.293 8H1.5a.5.5 0 0 0 0 1h12.793l-3.293 3.293a.5.5 0 0 0 .708.708l4.146-4.146z"/>
                </svg>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}