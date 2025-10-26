import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Loader2, Sparkles, User, Bot } from 'lucide-react';
import { useLanguageStore } from '../../store/languageStore';
import api from '../../utils/api';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const { language } = useLanguageStore();
  const isRTL = language === 'ar';

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Welcome message
      const welcomeMessage = language === 'ar' 
        ? 'مرحباً! 👋 أنا مساعد زياد الذكي. يمكنني مساعدتك في معرفة المزيد عن مشاريعه ومهاراته وخبراته. كيف يمكنني مساعدتك؟'
        : 'Hello! 👋 I\'m Zyad\'s AI assistant. I can help you learn more about his projects, skills, and experience. How can I help you?';
      
      setMessages([{
        role: 'assistant',
        content: welcomeMessage,
        timestamp: new Date()
      }]);
    }
  }, [isOpen, language]);

  const suggestedQuestions = language === 'ar' ? [
    'ما هي مشاريع زياد؟',
    'ما هي مهاراته التقنية؟',
    'أخبرني عن خبرته',
    'كيف يمكنني التواصل معه؟'
  ] : [
    'What are Zyad\'s projects?',
    'What are his technical skills?',
    'Tell me about his experience',
    'How can I contact him?'
  ];

  const handleSend = async (messageText = input) => {
    if (!messageText.trim() || isLoading) return;

    const userMessage = {
      role: 'user',
      content: messageText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await api.post('/chat', {
        message: messageText,
        language: language,
        history: messages.slice(-6) // Send last 6 messages for context
      });

      const assistantMessage = {
        role: 'assistant',
        content: response.data.response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage = {
        role: 'assistant',
        content: language === 'ar' 
          ? 'عذراً، حدث خطأ. يرجى المحاولة مرة أخرى.'
          : 'Sorry, something went wrong. Please try again.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Parse markdown links and make them clickable
  const parseMessageContent = (content) => {
    // Match markdown links: [text](url)
    const markdownLinkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = markdownLinkRegex.exec(content)) !== null) {
      // Add text before the link
      if (match.index > lastIndex) {
        parts.push({
          type: 'text',
          content: content.substring(lastIndex, match.index)
        });
      }
      
      // Add the link
      parts.push({
        type: 'link',
        text: match[1],
        url: match[2]
      });
      
      lastIndex = match.index + match[0].length;
    }
    
    // Add remaining text
    if (lastIndex < content.length) {
      parts.push({
        type: 'text',
        content: content.substring(lastIndex)
      });
    }
    
    return parts.length > 0 ? parts : [{ type: 'text', content }];
  };

  return (
    <>
      {/* Floating Chat Button - Visible on all devices */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="fixed bottom-20 md:bottom-6 left-6 z-50"
        style={{ display: isOpen ? 'none' : 'flex' }}
      >
        

        {/* Main Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(!isOpen)}
          className="relative bg-gradient-to-r from-primary-500 to-accent p-3 md:p-4 rounded-full shadow-2xl hover:shadow-primary-500/50 transition-all group"
        >
          {/* Pulsing Ring */}
          <motion.div
            className="absolute inset-0 rounded-full bg-primary-500/30"
            animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          
          {/* Bot Icon with Sparkle Effect */}
          <div className="relative">
            <Bot size={24} className="md:w-7 md:h-7 text-white relative z-10" />
            <motion.div
              className="absolute -top-1 -right-1"
              animate={{ 
                rotate: [0, 360],
                scale: [1, 1.2, 1]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Sparkles size={14} className="text-yellow-300" />
            </motion.div>
          </div>

          {/* Online Status Indicator */}
          <motion.div
            className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.button>
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            className={`chatbot-window fixed inset-0 md:inset-auto md:bottom-6 md:left-6 z-50 w-full md:w-[380px] h-full md:h-[600px] bg-surface md:rounded-2xl shadow-2xl flex flex-col overflow-hidden border-0 md:border md:border-primary-500/20`}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary-500 to-accent p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Bot className="text-white" size={24} />
                  <motion.div
                    className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white"
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
                <div>
                  <h3 className="text-white font-bold">
                    {language === 'ar' ? 'مساعد زياد الذكي' : 'Zyad\'s AI Assistant'}
                  </h3>
                  <p className="text-white/80 text-xs">
                    {language === 'ar' ? 'متصل الآن' : 'Online now'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-background">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-3 ${message.role === 'user' ? (isRTL ? 'flex-row' : 'flex-row-reverse') : (isRTL ? 'flex-row-reverse' : 'flex-row')}`}
                >
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                    message.role === 'user' 
                      ? 'bg-primary-500' 
                      : 'bg-gradient-to-br from-accent to-primary-500'
                  }`}>
                    {message.role === 'user' ? (
                      <User size={16} className="text-white" />
                    ) : (
                      <Sparkles size={16} className="text-white" />
                    )}
                  </div>
                  <div className={`flex-1 ${message.role === 'user' ? (isRTL ? 'text-right' : 'text-left') : (isRTL ? 'text-left' : 'text-right')}`}>
                    <div className={`inline-block px-4 py-2 rounded-2xl ${
                      message.role === 'user'
                        ? 'bg-primary-500 text-white'
                        : 'bg-surface border border-primary-500/20'
                    }`}>
                      <div className="text-sm whitespace-pre-wrap">
                        {parseMessageContent(message.content).map((part, idx) => {
                          if (part.type === 'link') {
                            return (
                              <a
                                key={idx}
                                href={part.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary-500 hover:text-primary-600 underline font-medium"
                                onClick={(e) => e.stopPropagation()}
                              >
                                {part.text}
                              </a>
                            );
                          }
                          return <span key={idx}>{part.content}</span>;
                        })}
                      </div>
                    </div>
                    <p className="text-xs text-text-secondary mt-1">
                      {message.timestamp.toLocaleTimeString(language === 'ar' ? 'ar-EG' : 'en-US', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </p>
                  </div>
                </motion.div>
              ))}
              
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={`flex gap-3 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-accent to-primary-500 flex items-center justify-center">
                    <Sparkles size={16} className="text-white" />
                  </div>
                  <div className="bg-surface border border-primary-500/20 px-4 py-2 rounded-2xl">
                    <Loader2 size={16} className="animate-spin text-primary-500" />
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Questions */}
            {messages.length <= 1 && !isLoading && (
              <div className="px-4 py-2 border-t border-primary-500/10">
                <p className="text-xs text-text-secondary mb-2">
                  {language === 'ar' ? 'أسئلة مقترحة:' : 'Suggested questions:'}
                </p>
                <div className="flex flex-wrap gap-2">
                  {suggestedQuestions.slice(0, 2).map((question, index) => (
                    <button
                      key={index}
                      onClick={() => handleSend(question)}
                      className="text-xs px-3 py-1.5 bg-primary-500/10 hover:bg-primary-500/20 text-primary-500 rounded-full transition-colors"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-primary-500/10 bg-surface">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={language === 'ar' ? 'اكتب رسالتك...' : 'Type your message...'}
                  className="flex-1 px-4 py-2 bg-background border border-primary-500/20 rounded-xl focus:outline-none focus:border-primary-500 transition-colors text-sm"
                  disabled={isLoading}
                  dir={isRTL ? 'rtl' : 'ltr'}
                />
                <button
                  onClick={() => handleSend()}
                  disabled={!input.trim() || isLoading}
                  className="px-4 py-2 bg-gradient-to-r from-primary-500 to-accent text-white rounded-xl hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;
