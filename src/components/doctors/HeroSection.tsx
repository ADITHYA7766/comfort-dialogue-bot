
import { Stethoscope } from "lucide-react";

const HeroSection = () => {
  return (
    <div className="text-center mb-12">
      <div className="flex items-center justify-center gap-2 mb-4">
        <Stethoscope className="h-8 w-8 text-primary" />
        <h1 className="text-4xl font-bold tracking-tight text-foreground">Our Healthcare Team</h1>
      </div>
      <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
        Meet our team of specialized healthcare professionals dedicated to providing exceptional care
      </p>
    </div>
  );
};

export default HeroSection;
