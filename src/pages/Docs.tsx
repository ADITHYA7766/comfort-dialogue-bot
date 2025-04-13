
import { useState, useEffect } from "react";
import HealthHeader from "@/components/doctors/HealthHeader";
import HealthFooter from "@/components/doctors/HealthFooter";
import HeroSection from "@/components/doctors/HeroSection";
import DoctorGrid from "@/components/doctors/DoctorGrid";
import DoctorsPagination from "@/components/doctors/DoctorsPagination";
import SpecialtyFilter from "@/components/doctors/SpecialtyFilter";
import { doctors } from "@/data/doctors";

const Docs = () => {
  const doctorsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSpecialty, setSelectedSpecialty] = useState<string | undefined>(undefined);
  
  // Filter doctors by specialty
  const filteredDoctors = selectedSpecialty
    ? doctors.filter(doctor => doctor.specialty === selectedSpecialty)
    : doctors;
  
  // Calculate total pages based on filtered doctors
  const totalPages = Math.ceil(filteredDoctors.length / doctorsPerPage);
  
  // Reset to first page when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedSpecialty]);

  // Get current doctors
  const indexOfLastDoctor = currentPage * doctorsPerPage;
  const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;
  const currentDoctors = filteredDoctors.slice(indexOfFirstDoctor, indexOfLastDoctor);

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle specialty filter change
  const handleSpecialtyChange = (specialty: string | undefined) => {
    setSelectedSpecialty(specialty);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <HealthHeader />

      <main className="flex-1 container py-8">
        <HeroSection />
        
        <div className="mt-8 mb-4">
          <SpecialtyFilter 
            doctors={doctors} 
            onChange={handleSpecialtyChange} 
            value={selectedSpecialty ? selectedSpecialty : "all"} 
          />
        </div>

        <DoctorGrid doctors={currentDoctors} />

        {totalPages > 1 && (
          <DoctorsPagination 
            currentPage={currentPage} 
            totalPages={totalPages} 
            onPageChange={handlePageChange}
          />
        )}
      </main>

      <HealthFooter />
    </div>
  );
};

export default Docs;
