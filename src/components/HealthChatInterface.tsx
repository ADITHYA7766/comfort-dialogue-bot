
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { getHealthResponse } from "@/utils/healthResponseUtils";
import { Message } from "@/types/chat";
import { useToast } from "@/components/ui/use-toast";

const HealthChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: "Hello, I'm HealthAI. I can provide support for both medical information and mental health guidance. How can I help you today?",
      sender: "ai",
      timestamp: new Date().toISOString(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  // Clear sessionStorage when component unmounts
  useEffect(() => {
    return () => {
      sessionStorage.removeItem('lastCancerType');
    };
  }, []);
  
  // Auto-focus input on component mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
      timestamp: new Date().toISOString(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);
    
    try {
      console.log("User input:", input);
      
      // Simulate AI thinking and typing
      setTimeout(async () => {
        const response = await getHealthResponse(input);
        console.log("AI response:", response);
        
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: response,
          sender: "ai",
          timestamp: new Date().toISOString(),
        };
        
        setMessages((prev) => [...prev, aiMessage]);
        setIsTyping(false);
      }, 1500);
    } catch (error) {
      console.error("Error getting response:", error);
      toast({
        title: "Error",
        description: "There was a problem getting a response. Please try again.",
        variant: "destructive",
      });
      setIsTyping(false);
    }
  };

  return (
    <Card className="border shadow-sm h-[calc(100vh-200px)] flex flex-col">
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={
                  message.sender === "user"
                    ? "chat-bubble-user"
                    : "chat-bubble-ai"
                }
                dangerouslySetInnerHTML={
                  message.sender === "ai" 
                    ? { __html: message.content }
                    : undefined
                }
              >
                {message.sender === "user" ? message.content : null}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="chat-bubble-ai flex space-x-1">
                <span className="animate-bounce">•</span>
                <span className="animate-bounce" style={{ animationDelay: "0.2s" }}>•</span>
                <span className="animate-bounce" style={{ animationDelay: "0.4s" }}>•</span>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
      <div className="p-4 border-t">
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <Input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about health topics or share how you're feeling..."
            className="flex-1"
          />
          <Button type="submit" disabled={isTyping || !input.trim()}>
            Send
          </Button>
        </form>
      </div>
    </Card>
  );
};

export default HealthChatInterface;
