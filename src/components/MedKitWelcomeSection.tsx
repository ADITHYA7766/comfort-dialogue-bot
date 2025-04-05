
import { FC } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface MedKitWelcomeSectionProps {
  onStartChat: () => void;
}

const MedKitWelcomeSection: FC<MedKitWelcomeSectionProps> = ({ onStartChat }) => {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <div className="inline-block mb-2 animate-gentle-float">
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
            <rect x="4" y="4" width="16" height="16" rx="2" />
            <path d="M12 8v8" />
            <path d="M8 12h8" />
          </svg>
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-foreground">Welcome to MedKitAI</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Your digital assistant for general medical information and health guidance.
        </p>
        <Button onClick={onStartChat} size="lg" className="mt-4">
          Start a Consultation
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Health Information</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Access reliable information about common health concerns, symptoms, and conditions.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Wellness Guidance</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Learn about preventive care, healthy habits, and lifestyle recommendations for better health.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Medical Resources</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Find links to trusted health organizations and resources for further information.</p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-muted/50 border-dashed">
        <CardHeader>
          <CardTitle>How MedKitAI Can Help</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>MedKitAI provides information and guidance on various health topics, such as:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Understanding common symptoms and conditions</li>
            <li>General information about medications and treatments</li>
            <li>Preventive health measures and wellness tips</li>
            <li>Nutrition and exercise guidance</li>
            <li>Finding appropriate healthcare resources</li>
          </ul>
        </CardContent>
        <CardFooter>
          <Button onClick={onStartChat} variant="secondary">Begin Your Consultation</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default MedKitWelcomeSection;
