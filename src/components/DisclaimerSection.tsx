
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const DisclaimerSection = () => {
  return (
    <Alert className="bg-muted border-primary/20">
      <AlertTitle className="text-base font-medium flex items-center gap-2">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-primary">
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
          <line x1="12" y1="9" x2="12" y2="13" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
        Important Disclaimer
      </AlertTitle>
      <AlertDescription className="text-muted-foreground mt-2 space-y-2">
        <p>
          MindfulAI is designed to provide supportive responses based on general mental health principles, but it is <strong>not</strong> a substitute for professional mental health care.
        </p>
        <p>
          This AI assistant cannot diagnose conditions, provide therapy, or handle emergencies. If you're experiencing a crisis or need medical advice, please contact a healthcare professional, call emergency services, or use a crisis helpline.
        </p>
        <p>
          Remember that your conversations are processed by AI to generate responses, and while we prioritize privacy, this is not a confidential medical service.
        </p>
      </AlertDescription>
    </Alert>
  );
};

export default DisclaimerSection;
