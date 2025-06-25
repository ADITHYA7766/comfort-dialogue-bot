
import { FC } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface HealthWelcomeSectionProps {
  onStartChat: () => void;
}

const HealthWelcomeSection: FC<HealthWelcomeSectionProps> = ({ onStartChat }) => {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <div className="inline-block mb-2 animate-gentle-float">
          {/* Caduceus Symbol */}
          <svg 
            width="64" 
            height="64" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="text-primary"
          >
            {/* Staff */}
            <line x1="12" y1="2" x2="12" y2="22" />
            {/* Wings */}
            <path d="M8 6c-2 0-4-1-4-3s2-3 4-3 2 1 2 3-2 3-2 3" />
            <path d="M16 6c2 0 4-1 4-3s-2-3-4-3-2 1-2 3 2 3 2 3" />
            {/* Snakes */}
            <path d="M12 6c-2 0-3 1-3 3s1 3 3 3 3-1 3-3-1-3-3-3" />
            <path d="M12 12c2 0 3 1 3 3s-1 3-3 3-3-1-3-3 1-3 3-3" />
          </svg>
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-foreground">Welcome to HealthAI</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Your comprehensive health companion for both medical information and mental health support.
        </p>
        <Button onClick={onStartChat} size="lg" className="mt-4">
          Start a Conversation
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Medical Information</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Get reliable information about health conditions, symptoms, medications, and general wellness guidance.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Mental Health Support</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Receive compassionate guidance and coping strategies for emotional wellbeing and mental health challenges.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Comprehensive Care</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Experience holistic health support that addresses both physical and mental aspects of your wellbeing.</p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-muted/50 border-dashed">
        <CardHeader>
          <CardTitle>How HealthAI Can Help</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>HealthAI provides comprehensive support for various health topics, including:</p>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium mb-2">Medical Support:</h4>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li>Understanding symptoms and conditions</li>
                <li>Information about medications and treatments</li>
                <li>Cancer types and staging information</li>
                <li>Preventive health measures</li>
                <li>Nutrition and exercise guidance</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Mental Health Support:</h4>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li>Managing anxiety and stress</li>
                <li>Coping with depression</li>
                <li>Processing difficult emotions</li>
                <li>Improving sleep and relaxation</li>
                <li>Building resilience and positive thinking</li>
              </ul>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={onStartChat} variant="secondary">Begin Your Health Journey</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default HealthWelcomeSection;
