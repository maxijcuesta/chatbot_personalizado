"use client";

import { useState, useEffect } from 'react';

export default function Home() {
  const [question, setQuestion] = useState<string>('');
  const [pdfText, setPdfText] = useState<string>(''); 
  const [answer, setAnswer] = useState<string | null>(null);
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [conversation, setConversation] = useState<
    Array<{ sender: string; message: string }>
  >([]);

  useEffect(() => {
    fetch('/pdf/mi_informacion.pdf')
      .then(res => res.text())
      .then(text => setPdfText(text));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setConversation([...conversation, { sender: 'user', message: question }]);
    setIsLoading(true);

    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ question, text: pdfText }),
    });

    const data = await res.json();
    setAnswer(data.answer || 'No se pudo obtener una respuesta.');
    setIsLoading(false);
    setConversation([...conversation, { sender: 'user', message: question }, { sender: 'bot', message: data.answer }]);
    setQuestion('');
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
    <div>
      {/* Botón de abrir/cerrar chatbot */}
      <button
        onClick={handleChatToggle}
        className="fixed bottom-5 right-5 bg-green-500 p-4 rounded-full shadow-lg flex items-center justify-center"
      >
        <svg width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
          <path d="M8 0C3.589 0 0 3.589 0 8c0 4.411 3.589 8 8 8 4.411 0 8-3.589 8-8 0-4.411-3.589-8-8-8zM8 15C4.141 15 1 11.859 1 8 1 4.141 4.141 1 8 1c3.859 0 7 3.141 7 7C15 11.859 11.859 15 8 15z"></path>
          <path d="M7 9h2v1H7zm0-1h2V5H7z"></path>
        </svg>
      </button>

      {/* Contenedor del Chatbot */}
      {isChatOpen && (
        <div className="fixed bottom-20 right-5 w-80 h-[35rem] bg-white rounded-lg shadow-lg flex flex-col z-50">
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
                  msg.sender === 'user' ? 'bg-[#386DBD] text-white text-right' : 'bg-gray-300 text-black'
                }`}
              >
                {msg.message}
              </div>
            ))}
          </div>
          <div className="chatbot-input flex p-4 bg-gray-200 border-t border-gray-300">
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Escribe tu pregunta sobre Maxi..."
              className="flex-grow p-2 border rounded-lg mr-2 text-black"
            />
            <button
              onClick={handleSubmit}
              className="bg-[#386DBD] text-white p-2 rounded-full flex items-center justify-center w-10 h-10"
            >
              {isLoading ? (
                <svg
                  className="animate-spin h-5 w-5 text-white"
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