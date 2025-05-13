
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Smile } from "lucide-react";
import MessageList from "./MessageList";
import { analyzeMessage } from "@/lib/sentimentAnalysis";
import { getAIResponse } from "@/lib/aiResponse";
import { Card } from "@/components/ui/card";

export interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
  sentiment?: "positive" | "negative" | "neutral";
  timestamp: Date;
}

const ChatContainer = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      text: "Hi there! I'm your mental health companion. How are you feeling today?",
      sender: "ai",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (input.trim() === "") return;
    
    // Add user message to chat
    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: "user",
      timestamp: new Date(),
    };
    
    setMessages([...messages, userMessage]);
    setInput("");
    setIsTyping(true);
    
    try {
      // Analyze sentiment
      const sentiment = await analyzeMessage(input);
      
      // Generate AI response based on user message and sentiment
      const aiResponse = await getAIResponse(input, sentiment);
      
      // Simulate AI typing delay
      setTimeout(() => {
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: aiResponse,
          sender: "ai",
          sentiment,
          timestamp: new Date(),
        };
        
        setMessages(prev => [...prev, aiMessage]);
        setIsTyping(false);
      }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds
      
    } catch (error) {
      console.error("Error processing message:", error);
      setIsTyping(false);
      
      // Fallback response if analysis fails
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        text: "I'm having trouble processing that. Could you try expressing your feelings in a different way?",
        sender: "ai",
        timestamp: new Date(),
      }]);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Card className="flex flex-col h-[calc(100vh-2rem)] max-w-md mx-auto overflow-hidden bg-white/80 backdrop-blur-sm dark:bg-gray-900/80 shadow-lg">
      {/* Header */}
      <div className="p-3 bg-gradient-to-r from-companion-purple to-companion-purple/70 text-white text-center">
        <h1 className="text-xl font-bold">Mental Health Companion</h1>
        <p className="text-sm text-white/80">I'm here to listen and support you</p>
      </div>
      
      {/* Message Area */}
      <div className="flex-1 overflow-y-auto p-4">
        <MessageList messages={messages} />
        {isTyping && (
          <div className="flex items-start gap-2 animate-fade-in mb-4">
            <div className="h-8 w-8 rounded-full bg-companion-purple flex items-center justify-center text-white">
              <Smile size={18} />
            </div>
            <div className="companion-message typing-indicator">
              <span>Thinking</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Input Area */}
      <div className="border-t p-3 flex gap-2 bg-white dark:bg-gray-800">
        <Input
          placeholder="Type how you're feeling..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          className="flex-1"
        />
        <Button 
          onClick={handleSend} 
          size="icon"
          className="bg-companion-purple hover:bg-companion-muted-purple"
        >
          <Send size={18} />
        </Button>
      </div>
    </Card>
  );
};

export default ChatContainer;
