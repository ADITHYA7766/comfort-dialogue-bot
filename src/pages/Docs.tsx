
import { useState, useEffect } from "react";
import HealthHeader from "@/components/doctors/HealthHeader";
import HealthFooter from "@/components/doctors/HealthFooter";
import HeroSection from "@/components/doctors/HeroSection";
import DoctorGrid from "@/components/doctors/DoctorGrid";
import DoctorsPagination from "@/components/doctors/DoctorsPagination";
import { doctors } from "@/data/doctors";

const Docs = () => {
  const doctorsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);
  
  // Calculate total pages
  const totalPages = Math.ceil(doctors.length / doctorsPerPage);
  
  // Get current doctors
  const indexOfLastDoctor = currentPage * doctorsPerPage;
  const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;
  const currentDoctors = doctors.slice(indexOfFirstDoctor, indexOfLastDoctor);

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <HealthHeader />

      <main className="flex-1 container py-8">
        <HeroSection />
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
