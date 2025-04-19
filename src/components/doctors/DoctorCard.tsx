
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";

export interface Doctor {
  id: number;
  name: string;
  nickname?: string;
  specialty: string;
  description: string;
  image: string;
}

interface DoctorCardProps {
  doctor: Doctor;
}

const DoctorCard = ({ doctor }: DoctorCardProps) => {
  const { toast } = useToast();

  const handleScheduleConsultation = () => {
    toast({
      title: `Consultation with Dr. ${doctor.name}`,
      description: "Your consultation request has been received. We'll contact you shortly to confirm the appointment.",
      duration: 5000,
    });
  };
  
  return (
    <Card key={doctor.id} className="flex flex-col border shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="text-center pb-0">
        <div className="mx-auto mb-4 relative">
          <Avatar className="h-40 w-40 border-4 border-primary/10">
            <AvatarImage src={doctor.image} alt={doctor.name} className="object-cover" />
            <AvatarFallback className="text-lg bg-primary/10">
              {doctor.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
        </div>
        <CardTitle className="text-2xl font-bold">{doctor.name}</CardTitle>
        {doctor.nickname && (
          <CardDescription className="text-sm font-medium">"{doctor.nickname}"</CardDescription>
        )}
        <CardDescription className="text-md font-semibold text-primary mt-1">
          {doctor.specialty}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow py-4">
        <p className="text-muted-foreground text-center">
          {doctor.description}
        </p>
      </CardContent>
      <CardFooter className="flex justify-center pt-0 pb-6">
        <Button variant="outline" onClick={handleScheduleConsultation}>Schedule Consultation</Button>
      </CardFooter>
    </Card>
  );
};

export default DoctorCard;
