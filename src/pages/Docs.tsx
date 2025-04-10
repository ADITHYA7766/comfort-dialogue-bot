
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Stethoscope, ArrowLeft } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThemeToggle } from "@/components/ThemeToggle";

// Doctor data
const doctors = [
  {
    id: 1,
    name: "Dr. Natasha Romanoff",
    nickname: "Black Widow",
    specialty: "Neuropsychiatry",
    description: "Specializes in complex neurological cases with psychological components. Known for her exceptional diagnostic skills and patient-centered approach.",
    image: "/lovable-uploads/066fe07d-df8d-4416-a6f4-db185a0dcc7e.png"
  },
  {
    id: 2,
    name: "Dr. Tony Stark",
    specialty: "Cardiothoracic Surgery",
    description: "Pioneering cardiothoracic surgeon who has developed innovative surgical techniques. Focuses on minimally invasive procedures with faster recovery times.",
    image: "/lovable-uploads/01434cbc-7462-485e-ba90-e3f6b95f40de.png"
  },
  {
    id: 3,
    name: "Dr. Elizabeth Olsen",
    specialty: "Internal Medicine & Preventive Care",
    description: "Passionate about preventive medicine and holistic wellness. Helps patients develop personalized health plans based on lifestyle and genetic factors.",
    image: "/lovable-uploads/827e947a-155e-423c-822b-78fba6f0c593.png"
  }
];

const Docs = () => {
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
            <h1 className="text-xl font-semibold tracking-tight">HealthCompanion</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Button variant="outline" asChild size="sm">
              <Link to="/" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 container py-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Stethoscope className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold tracking-tight text-foreground">Our Healthcare Team</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Meet our team of specialized healthcare professionals dedicated to providing exceptional care
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
          {doctors.map((doctor) => (
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
                <Button variant="outline">Schedule Consultation</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>

      <footer className="border-t border-border/40 bg-muted/50 py-6">
        <div className="container text-center text-sm text-muted-foreground">
          <p>HealthCompanion is not a replacement for professional healthcare services.</p>
          <p className="mt-1">If you're experiencing a crisis, please call your local emergency services or a crisis hotline immediately.</p>
        </div>
      </footer>
    </div>
  );
};

export default Docs;
