import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
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
    setIsTyping(true);
    
    // Simulate bot response
    setTimeout(() => {
      const botResponse = generateBotResponse(message);
      setMessages(prev => [...prev, { text: botResponse, sender: 'bot' }]);
      setIsTyping(false);
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
      <motion.div 
        className="flex justify-between items-center mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Conversation</h2>
        <button
          onClick={clearChat}
          className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700 hover:border-indigo-500 transition-all duration-300"
          aria-label="Nouvelle conversation"
        >
          Nouvelle conversation
        </button>
      </motion.div>

      {/* Chat Box */}
      <motion.div
        ref={chatBoxRef}
        className="flex-1 overflow-y-auto bg-white dark:bg-slate-900 rounded-xl p-4 mb-4 border border-gray-200 dark:border-gray-800 custom-scrollbar shadow-inner"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {messages.length === 0 ? (
          <motion.div 
            className="flex flex-col items-center justify-center h-full text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-4xl mb-4">Bonjour! 👋</h3>
            <p className="text-gray-600 dark:text-gray-400 text-lg">Comment puis-je vous aider aujourd'hui?</p>
          </motion.div>
        ) : (
          <AnimatePresence>
            {messages.map((msg, index) => (
              <motion.div
                key={index}
                className={`flex gap-4 mb-6 ${
                  msg.sender === 'user' ? 'flex-row-reverse' : ''
                }`}
                initial={{ opacity: 0, x: msg.sender === 'user' ? 20 : -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
              >
                {/* Avatar */}
                <motion.div
                  className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center font-bold ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600'
                      : 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                  }`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
                >
                  {msg.sender === 'user' ? 'U' : 'AI'}
                </motion.div>

                {/* Message Content */}
                <div
                  className={`flex-1 max-w-[80%] p-4 rounded-xl ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white'
                  }`}
                >
                  {msg.text}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
        
        {/* Typing indicator */}
        {isTyping && (
          <motion.div
            className="flex gap-4 mb-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
          >
            <div className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center font-bold bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
              AI
            </div>
            <div className="flex-1 max-w-[80%] p-4 rounded-xl bg-gray-100 dark:bg-gray-800">
              <div className="flex space-x-2">
                <motion.div
                  className="w-2 h-2 bg-gray-500 rounded-full"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                />
                <motion.div
                  className="w-2 h-2 bg-gray-500 rounded-full"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                />
                <motion.div
                  className="w-2 h-2 bg-gray-500 rounded-full"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Input Container */}
      <motion.div 
        className="flex gap-2 bg-white dark:bg-slate-900 border border-gray-200 dark:border-gray-800 rounded-xl p-2 shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Écrivez votre message ici..."
          className="flex-1 bg-transparent text-gray-900 dark:text-white px-4 py-3 outline-none placeholder-gray-500 dark:placeholder-gray-400"
          aria-label="Message à envoyer"
        />
        <motion.button
          onClick={handleSendMessage}
          className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg text-white"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
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
        </motion.button>
      </motion.div>
    </div>
  );
}
