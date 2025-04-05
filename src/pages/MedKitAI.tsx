
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { Home } from "lucide-react";
import MedicalChatInterface from "@/components/MedicalChatInterface";
import MedKitWelcomeSection from "@/components/MedKitWelcomeSection";
import MedicalResourcesSection from "@/components/MedicalResourcesSection";
import MedicalDisclaimerSection from "@/components/MedicalDisclaimerSection";

const MedKitAI = () => {
  const [activeTab, setActiveTab] = useState("welcome");
  const { toast } = useToast();

  const handleStartChat = () => {
    setActiveTab("chat");
    toast({
      title: "Welcome to MedKitAI",
      description: "I'm here to provide general medical information. What would you like to know about?",
      duration: 5000,
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <svg 
              viewBox="0 0 24 24" 
              fill="none" 
              className="h-6 w-6 text-primary"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" 
                stroke="currentColor" 
                strokeWidth="2"
              />
              <path 
                d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z" 
                fill="currentColor" 
              />
              <path 
                d="M18 7C18 7.55228 17.5523 8 17 8C16.4477 8 16 7.55228 16 7C16 6.44772 16.4477 6 17 6C17.5523 6 18 6.44772 18 7Z" 
                fill="currentColor" 
              />
            </svg>
            <h1 className="text-xl font-semibold tracking-tight">MedKitAI</h1>
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link to="/">
              <Home className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
          </Button>
        </div>
      </header>

      <main className="flex-1 container py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="welcome">Welcome</TabsTrigger>
            <TabsTrigger value="chat">Chat</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
          </TabsList>
          
          <TabsContent value="welcome" className="space-y-6">
            <MedKitWelcomeSection onStartChat={handleStartChat} />
            <MedicalDisclaimerSection />
          </TabsContent>
          
          <TabsContent value="chat">
            <MedicalChatInterface />
          </TabsContent>
          
          <TabsContent value="resources">
            <MedicalResourcesSection />
          </TabsContent>
        </Tabs>
      </main>

      <footer className="border-t border-border/40 bg-muted/50 py-6">
        <div className="container text-center text-sm text-muted-foreground">
          <p>MedKitAI is not a replacement for professional medical advice, diagnosis, or treatment.</p>
          <p className="mt-1">Always seek the advice of your physician or other qualified health provider with any questions.</p>
        </div>
      </footer>
    </div>
  );
};

export default MedKitAI;
