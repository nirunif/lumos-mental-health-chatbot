
import React from "react";
import { Smile, User } from "lucide-react";
import { Message } from "./ChatContainer";
import { Card } from "@/components/ui/card";

interface MessageListProps {
  messages: Message[];
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  // Format timestamp to hh:mm AM/PM
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  return (
    <div className="space-y-4">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex items-start gap-2 ${
            message.sender === "user" ? "justify-end" : "justify-start"
          }`}
        >
          {message.sender === "ai" && (
            <div className="h-8 w-8 rounded-full bg-companion-purple flex items-center justify-center text-white">
              <Smile size={18} />
            </div>
          )}
          
          <div
            className={
              message.sender === "user" ? "user-message" : "companion-message"
            }
          >
            {message.text}
            <div className="text-xs text-muted-foreground mt-1 text-right">
              {formatTime(message.timestamp)}
            </div>
          </div>
          
          {message.sender === "user" && (
            <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
              <User size={18} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MessageList;
