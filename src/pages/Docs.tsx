
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Stethoscope, ArrowLeft } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useState } from "react";

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
  },
  {
    id: 4,
    name: "Dr. Stephen Strange",
    specialty: "Neurosurgery",
    description: "World-renowned neurosurgeon specializing in complex brain and spinal cord surgeries. Pioneered several revolutionary surgical techniques for previously inoperable conditions.",
    image: "/lovable-uploads/01434cbc-7462-485e-ba90-e3f6b95f40de.png"
  },
  {
    id: 5,
    name: "Dr. Bruce Banner",
    specialty: "Radiation Oncology",
    description: "Expert in radiation therapy for cancer treatment. Focuses on developing precise radiation protocols that maximize effectiveness while minimizing side effects.",
    image: "/lovable-uploads/066fe07d-df8d-4416-a6f4-db185a0dcc7e.png"
  },
  {
    id: 6,
    name: "Dr. Carol Danvers",
    specialty: "Aerospace Medicine",
    description: "Specializes in the physiological effects of flight and space travel on the human body. Provides care for astronauts and pilots facing unique healthcare challenges.",
    image: "/lovable-uploads/827e947a-155e-423c-822b-78fba6f0c593.png"
  },
  {
    id: 7,
    name: "Dr. T'Challa",
    specialty: "Trauma Surgery",
    description: "Leading trauma surgeon with expertise in emergency and critical care. Specializes in treating severe injuries and developing innovative recovery protocols.",
    image: "/lovable-uploads/01434cbc-7462-485e-ba90-e3f6b95f40de.png"
  },
  {
    id: 8,
    name: "Dr. Wanda Maximoff",
    specialty: "Pediatric Psychology",
    description: "Dedicated child psychologist focusing on early development and trauma recovery. Uses innovative therapy methods to help children overcome psychological challenges.",
    image: "/lovable-uploads/066fe07d-df8d-4416-a6f4-db185a0dcc7e.png"
  },
  {
    id: 9,
    name: "Dr. Sam Wilson",
    specialty: "Rehabilitation Medicine",
    description: "Rehabilitation specialist helping patients recover from injuries, surgeries, and chronic conditions. Develops comprehensive recovery plans focusing on regaining function and independence.",
    image: "/lovable-uploads/827e947a-155e-423c-822b-78fba6f0c593.png"
  },
  {
    id: 10,
    name: "Dr. Peter Parker",
    specialty: "Sports Medicine",
    description: "Sports medicine physician specializing in treating athletic injuries and improving performance. Works with athletes at all levels to prevent injuries and optimize recovery.",
    image: "/lovable-uploads/01434cbc-7462-485e-ba90-e3f6b95f40de.png"
  },
  {
    id: 11,
    name: "Dr. Maria Hill",
    specialty: "Emergency Medicine",
    description: "Emergency medicine specialist with extensive experience in critical care situations. Known for making quick, accurate diagnoses and providing life-saving interventions.",
    image: "/lovable-uploads/066fe07d-df8d-4416-a6f4-db185a0dcc7e.png"
  },
  {
    id: 12,
    name: "Dr. Scott Lang",
    specialty: "Infectious Disease",
    description: "Infectious disease specialist focused on diagnosing and treating complex or rare infections. Develops protocols for preventing the spread of communicable diseases.",
    image: "/lovable-uploads/827e947a-155e-423c-822b-78fba6f0c593.png"
  },
  {
    id: 13,
    name: "Dr. James Rhodes",
    specialty: "Orthopedic Surgery",
    description: "Orthopedic surgeon specializing in joint replacement surgeries and sports-related injuries. Utilizes the latest minimally invasive techniques for faster patient recovery.",
    image: "/lovable-uploads/01434cbc-7462-485e-ba90-e3f6b95f40de.png"
  },
  {
    id: 14,
    name: "Dr. Hope Van Dyne",
    specialty: "Immunology",
    description: "Immunologist researching and treating autoimmune disorders and immunodeficiencies. Combines clinical practice with cutting-edge research to develop new treatment approaches.",
    image: "/lovable-uploads/066fe07d-df8d-4416-a6f4-db185a0dcc7e.png"
  },
  {
    id: 15,
    name: "Dr. Nick Fury",
    specialty: "Ophthalmology",
    description: "Leading ophthalmologist specializing in surgical and non-surgical treatments for complex eye conditions. Pioneered several novel techniques for retinal repair.",
    image: "/lovable-uploads/827e947a-155e-423c-822b-78fba6f0c593.png"
  },
  {
    id: 16,
    name: "Dr. Clint Barton",
    specialty: "Audiology",
    description: "Audiologist specializing in diagnosing and treating hearing disorders. Provides innovative hearing solutions and rehabilitation techniques for patients of all ages.",
    image: "/lovable-uploads/01434cbc-7462-485e-ba90-e3f6b95f40de.png"
  },
  {
    id: 17,
    name: "Dr. Pepper Potts",
    specialty: "Endocrinology",
    description: "Endocrinologist focusing on hormonal disorders and metabolic conditions. Helps patients manage complex conditions like diabetes, thyroid disorders, and hormonal imbalances.",
    image: "/lovable-uploads/066fe07d-df8d-4416-a6f4-db185a0dcc7e.png"
  },
  {
    id: 18,
    name: "Dr. Thor Odinson",
    specialty: "Physical Therapy",
    description: "Physical therapist specializing in strength recovery and rehabilitation. Develops personalized exercise regimens to help patients regain mobility and function after injuries.",
    image: "/lovable-uploads/827e947a-155e-423c-822b-78fba6f0c593.png"
  }
];

const Docs = () => {
  const doctorsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);
  
  // Calculate total pages
  const totalPages = Math.ceil(doctors.length / doctorsPerPage);
  
  // Get current doctors
  const indexOfLastDoctor = currentPage * doctorsPerPage;
  const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;
  const currentDoctors = doctors.slice(indexOfFirstDoctor, indexOfLastDoctor);

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
          {currentDoctors.map((doctor) => (
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

        {totalPages > 1 && (
          <Pagination className="mt-12">
            <PaginationContent>
              {currentPage > 1 && (
                <PaginationItem>
                  <PaginationPrevious 
                    href="#" 
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentPage(prev => Math.max(1, prev - 1));
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }} 
                  />
                </PaginationItem>
              )}
              
              {[...Array(totalPages)].map((_, i) => {
                // Show first page, current page, last page, and one page before and after current
                if (
                  i === 0 || // First page
                  i === totalPages - 1 || // Last page
                  (i + 1) === currentPage || // Current page
                  (i + 1) === currentPage - 1 || // One before current
                  (i + 1) === currentPage + 1 // One after current
                ) {
                  return (
                    <PaginationItem key={i}>
                      <PaginationLink 
                        href="#" 
                        isActive={currentPage === i + 1}
                        onClick={(e) => {
                          e.preventDefault();
                          setCurrentPage(i + 1);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                      >
                        {i + 1}
                      </PaginationLink>
                    </PaginationItem>
                  );
                }
                
                // Add ellipsis after first page if there's a gap
                if (i === 1 && currentPage > 3) {
                  return <PaginationItem key="ellipsis-start"><PaginationEllipsis /></PaginationItem>;
                }
                
                // Add ellipsis before last page if there's a gap
                if (i === totalPages - 2 && currentPage < totalPages - 2) {
                  return <PaginationItem key="ellipsis-end"><PaginationEllipsis /></PaginationItem>;
                }
                
                return null;
              })}
              
              {currentPage < totalPages && (
                <PaginationItem>
                  <PaginationNext 
                    href="#" 
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentPage(prev => Math.min(totalPages, prev + 1));
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }} 
                  />
                </PaginationItem>
              )}
            </PaginationContent>
          </Pagination>
        )}
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
