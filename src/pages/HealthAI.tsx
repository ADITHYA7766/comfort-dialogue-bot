
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { Home, Heart } from "lucide-react";
import HealthChatInterface from "@/components/HealthChatInterface";
import HealthWelcomeSection from "@/components/HealthWelcomeSection";
import HealthResourcesSection from "@/components/HealthResourcesSection";
import HealthDisclaimerSection from "@/components/HealthDisclaimerSection";

const HealthAI = () => {
  const [activeTab, setActiveTab] = useState("welcome");
  const { toast } = useToast();

  const handleStartChat = () => {
    setActiveTab("chat");
    toast({
      title: "Welcome to HealthAI",
      description: "I'm here to help with both medical information and mental health support. What can I assist you with today?",
      duration: 5000,
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-semibold tracking-tight">HealthAI</h1>
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
            <HealthWelcomeSection onStartChat={handleStartChat} />
            <HealthDisclaimerSection />
          </TabsContent>
          
          <TabsContent value="chat">
            <HealthChatInterface />
          </TabsContent>
          
          <TabsContent value="resources">
            <HealthResourcesSection />
          </TabsContent>
        </Tabs>
      </main>

      <footer className="border-t border-border/40 bg-muted/50 py-6">
        <div className="container text-center text-sm text-muted-foreground">
          <p>HealthAI combines medical information and mental health support in one comprehensive platform.</p>
          <p className="mt-1">Always consult healthcare professionals for serious health concerns or emergencies.</p>
        </div>
      </footer>
    </div>
  );
};

export default HealthAI;
