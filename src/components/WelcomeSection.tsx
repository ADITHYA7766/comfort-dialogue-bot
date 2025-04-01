
import { FC } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface WelcomeSectionProps {
  onStartChat: () => void;
}

const WelcomeSection: FC<WelcomeSectionProps> = ({ onStartChat }) => {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <div className="inline-block mb-2 animate-gentle-float">
          <svg 
            viewBox="0 0 24 24" 
            fill="none" 
            className="h-16 w-16 text-primary"
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
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-foreground">Welcome to MindfulAI</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          A supportive space for you to express your thoughts and receive compassionate guidance.
        </p>
        <Button onClick={onStartChat} size="lg" className="mt-4">
          Start a Conversation
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Safe Space</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Share your thoughts and feelings in a judgment-free environment. Your privacy is our priority.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Supportive Guidance</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Receive thoughtful responses based on established mental health approaches to help you navigate your emotions.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Helpful Resources</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Access curated mental health resources and crisis support information when you need it most.</p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-muted/50 border-dashed">
        <CardHeader>
          <CardTitle>How MindfulAI Can Help</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>MindfulAI is designed to provide emotional support and coping strategies for common challenges like:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Feeling anxious or overwhelmed</li>
            <li>Managing stress and burnout</li>
            <li>Processing difficult emotions</li>
            <li>Improving sleep and relaxation</li>
            <li>Building resilience and positive thinking</li>
          </ul>
        </CardContent>
        <CardFooter>
          <Button onClick={onStartChat} variant="secondary">Begin Your Journey</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default WelcomeSection;
