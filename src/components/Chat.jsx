import { useState, useRef, useEffect } from 'react';

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const chatBoxRef = useRef(null);

  useEffect(() => {
    // Scroll to bottom when messages change
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  const generateBotResponse = (userMessage) => {
    const responses = [
      "C'est une question intéressante! Je suis là pour vous aider.",
      "Je comprends. Pouvez-vous m'en dire plus?",
      "Merci pour votre message! Comment puis-je vous assister davantage?",
      "C'est noté! Je suis ici pour répondre à vos questions.",
      "Excellent point! Laissez-moi vous aider avec cela.",
      "Je vois. Permettez-moi de vous guider.",
      "D'accord, je peux vous aider avec ça!",
      "Intéressant! Continuons cette conversation."
    ];
    
    const randomIndex = Math.floor(Math.random() * responses.length);
    return responses[randomIndex];
  };

  const handleSendMessage = () => {
    const message = inputValue.trim();
    
    if (!message) return;
    
    // Add user message
    setMessages(prev => [...prev, { text: message, sender: 'user' }]);
    setInputValue('');
    
    // Simulate bot response
    setTimeout(() => {
      const botResponse = generateBotResponse(message);
      setMessages(prev => [...prev, { text: botResponse, sender: 'bot' }]);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const clearChat = () => {
    setMessages([]);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] max-w-4xl mx-auto p-4">
      {/* Chat Header */}
      <div className="flex justify-between items-center mb-4 animate-fadeIn">
        <h2 className="text-2xl font-semibold">Conversation</h2>
        <button
          onClick={clearChat}
          className="px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 hover:bg-gray-700 hover:border-indigo-500 transition-all duration-300"
          aria-label="Nouvelle conversation"
        >
          Nouvelle conversation
        </button>
      </div>

      {/* Chat Box */}
      <div
        ref={chatBoxRef}
        className="flex-1 overflow-y-auto bg-gray-900 rounded-xl p-4 mb-4 border border-gray-800 custom-scrollbar"
      >
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <h3 className="text-4xl mb-4">Bonjour! 👋</h3>
            <p className="text-gray-400 text-lg">Comment puis-je vous aider aujourd'hui?</p>
          </div>
        ) : (
          messages.map((msg, index) => (
            <div
              key={index}
              className={`flex gap-4 mb-6 animate-slideIn ${
                msg.sender === 'user' ? 'flex-row-reverse' : ''
              }`}
            >
              {/* Avatar */}
              <div
                className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center font-bold ${
                  msg.sender === 'user'
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-600'
                    : 'bg-gray-800'
                }`}
              >
                {msg.sender === 'user' ? 'U' : 'AI'}
              </div>

              {/* Message Content */}
              <div
                className={`flex-1 max-w-[80%] p-4 rounded-xl ${
                  msg.sender === 'user'
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-600'
                    : 'bg-gray-800'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Input Container */}
      <div className="flex gap-2 bg-gray-900 border border-gray-800 rounded-xl p-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Écrivez votre message ici..."
          className="flex-1 bg-transparent text-white px-4 py-3 outline-none placeholder-gray-500"
          aria-label="Message à envoyer"
        />
        <button
          onClick={handleSendMessage}
          className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg hover:scale-105 hover:shadow-lg hover:shadow-indigo-500/50 active:scale-95 transition-all duration-300"
          aria-label="Envoyer le message"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-white"
          >
            <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
