import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { PaperPlaneIcon, Cross2Icon } from '@radix-ui/react-icons';
import { cn } from '@/lib/utils';
import spiderIcon from '../../assets/spider.png';
import './chat.css';
import { TypingAnimation } from './TypingAnimation';
import { StreamingText } from './StreamingText';

export const ChatInterface = ({ triggerAnimation }) => {
  // Add API base URL from environment variable
  const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [userId, setUserId] = useState(null);
  const [messages, setMessages] = useState([
    { text: "Hi! I'm your Spider-Man assistant! How can I help?", isBot: true }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [botThinking, setBotThinking] = useState(false);
  const [userTyping, setUserTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Get userId from localStorage
  useEffect(() => {
    try {
      const userData = JSON.parse(localStorage.getItem('userData'));
      if (userData && userData.id) {
        setUserId(userData.id);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleTyping = (e) => {
    setInputMessage(e.target.value);
  };

  const handleSend = async () => {
    if (!inputMessage.trim() || !userId) return;
    setIsTyping(true);

    const newMessages = [...messages, { text: inputMessage, isBot: false }];
    setMessages(newMessages);
    setInputMessage('');
    setBotThinking(true); // Show bot is thinking

    try {
      // Show typing animation while waiting for response
      setIsTyping(true);
      const response = await fetch(`${API_URL}/api/llm/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: inputMessage, userId })
      });
      const data = await response.json();
      setMessages([...newMessages, { text: data.reply, isBot: true }]);
    } catch (error) {
      setMessages([...newMessages, { text: "Oops! Something went wrong. 😵", isBot: true }]);
    } finally {
      setIsTyping(false);
      setBotThinking(false);
    }
  };
  return (
    <div className="fixed bottom-0 right-0 z-50 sm:bottom-6 sm:right-6">
      {isOpen ? (
        <Card className="w-full h-[100vh] sm:h-auto sm:w-[400px] shadow-2xl rounded-none sm:rounded-2xl overflow-hidden border-0 sm:border border-red-500/20 bg-gradient-to-br from-slate-900/95 to-slate-950/95 backdrop-blur-xl">
          <CardHeader className="p-3 sm:p-4 border-b border-red-500/20 bg-gradient-to-r from-slate-900/90 via-red-950/30 to-slate-900/90">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <Avatar className={`w-8 h-8 sm:w-10 sm:h-10 border-2 border-red-500/80 bg-slate-900/50 p-1 ring-2 ring-red-500/20 ${botThinking ? 'animate-pulse' : ''}`}>
                  <AvatarImage src={spiderIcon} className="p-1" />
                  <AvatarFallback className="bg-red-600/80">SP</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-sm sm:text-base font-bold bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">Spider-Assist</h3>
                  <p className="text-[10px] sm:text-xs text-red-500/80">
                    {isTyping ? 'Weaving response...' : botThinking ? 'Processing...' : 'Ready to assist'}
                  </p>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-red-400/50 hover:text-red-400 rounded-full hover:bg-red-500/10" 
                onClick={() => setIsOpen(false)}
              >
                <Cross2Icon className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
    
          <CardContent className="p-0 h-[calc(100vh-120px)] sm:h-[480px] bg-gradient-to-b from-slate-900/95 via-slate-950/95 to-slate-900/95">
            <ScrollArea className="h-full p-3 sm:p-4">
              <div className="flex flex-col gap-3 sm:gap-4">
                {messages.map((msg, i) => (
                  <div key={i} className={cn("flex", msg.isBot ? 'justify-start' : 'justify-end')}>
                    <div className={cn("max-w-[90%] sm:max-w-[85%] p-2.5 sm:p-3 rounded-2xl relative shadow-lg backdrop-blur-sm text-sm sm:text-base",
                      msg.isBot ? 'bg-gradient-to-br from-slate-800/90 to-slate-900/90 text-red-100 border border-red-500/10' : 'bg-gradient-to-r from-red-600 to-red-500 text-white shadow-lg shadow-red-500/20')}>
                      {msg.isBot ? (
                        <StreamingText text={msg.text} />
                      ) : (
                        msg.text
                      )}
                    </div>
                  </div>
                ))}
                {botThinking && (
                  <div className="flex justify-start">
                    <TypingAnimation />
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>
          </CardContent>
    
          <CardFooter className="p-3 sm:p-4 border-t border-red-500/20 bg-gradient-to-r from-slate-900/90 via-red-950/30 to-slate-900/90">
            <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex w-full gap-2">
              <Input 
                value={inputMessage} 
                onChange={handleTyping} 
                placeholder="Ask Spider-Assist..." 
                className="bg-slate-800/50 text-sm text-red-100 border-red-500/20 backdrop-blur-sm focus:border-red-500/50 focus-visible:ring-1 focus-visible:ring-red-500/50 rounded-xl h-10 sm:h-11 placeholder:text-red-400/50" 
              />
              <Button 
                type="submit" 
                size="icon" 
                className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 rounded-xl h-10 w-10 sm:h-11 sm:w-11 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-red-500/20" 
                disabled={isTyping}
              >
                <PaperPlaneIcon className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </form>
          </CardFooter>
        </Card>
      ) : (
        <Button 
          onClick={() => setIsOpen(true)} 
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 chat-icon-button h-12 w-12 sm:h-16 sm:w-16 rounded-full bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 shadow-lg shadow-red-500/20 hover:shadow-red-500/30 transition-all duration-300 hover:scale-105"
        >
          <img src={spiderIcon} alt="Chat" className="h-7 w-7 sm:h-9 sm:w-9 invert opacity-95 hover:opacity-100 transition-all duration-300" />
        </Button>
      )}
    </div>
  );
};