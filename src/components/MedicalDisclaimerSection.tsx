
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const MedicalDisclaimerSection = () => {
  return (
    <Alert className="bg-muted border-primary/20">
      <AlertTitle className="text-base font-medium flex items-center gap-2">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-primary">
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
          <line x1="12" y1="9" x2="12" y2="13" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
        Important Medical Disclaimer
      </AlertTitle>
      <AlertDescription className="text-muted-foreground mt-2 space-y-2">
        <p>
          MedKitAI provides general health information for educational purposes only and is <strong>not</strong> a substitute for professional medical advice, diagnosis, or treatment.
        </p>
        <p>
          Never disregard professional medical advice or delay seeking it because of something you have read or heard from MedKitAI. If you think you may have a medical emergency, call your doctor or emergency services immediately.
        </p>
        <p>
          MedKitAI does not recommend or endorse any specific tests, physicians, products, procedures, opinions, or other information. Reliance on any information provided by MedKitAI is solely at your own risk.
        </p>
      </AlertDescription>
    </Alert>
  );
};

export default MedicalDisclaimerSection;
