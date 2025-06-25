
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";

const HealthDisclaimerSection = () => {
  return (
    <Card className="border-amber-200 bg-amber-50 dark:bg-amber-950/10">
      <CardHeader>
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-amber-600" />
          <CardTitle className="text-amber-800 dark:text-amber-400">Important Disclaimer</CardTitle>
        </div>
        <CardDescription className="text-amber-700 dark:text-amber-300">
          Please read this important information before using HealthAI
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 text-amber-800 dark:text-amber-200">
        <p>
          <strong>HealthAI is not a replacement for professional medical advice, diagnosis, or treatment.</strong> 
          The information provided is for educational and informational purposes only.
        </p>
        
        <p>
          <strong>For Medical Concerns:</strong> Always seek the advice of your physician or other qualified 
          healthcare provider with any questions you may have regarding a medical condition. Never disregard 
          professional medical advice or delay seeking it because of something you have read here.
        </p>
        
        <p>
          <strong>For Mental Health Support:</strong> HealthAI provides general emotional support and coping 
          strategies, but is not a substitute for professional mental health treatment. If you're experiencing 
          a mental health crisis, please contact a mental health professional or crisis hotline immediately.
        </p>
        
        <p>
          <strong>Emergency Situations:</strong> If you are experiencing a medical emergency or having thoughts 
          of self-harm, please call emergency services (911) or go to your nearest emergency room immediately.
        </p>
        
        <p className="text-sm">
          By using HealthAI, you acknowledge that you have read and understood this disclaimer.
        </p>
      </CardContent>
    </Card>
  );
};

export default HealthDisclaimerSection;
