
import { useState, useEffect } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Filter } from "lucide-react";
import { Doctor } from "./DoctorCard";

interface SpecialtyFilterProps {
  doctors: Doctor[];
  onChange: (specialty: string | undefined) => void;
  value?: string;
}

const SpecialtyFilter = ({ doctors, onChange, value }: SpecialtyFilterProps) => {
  const [specialties, setSpecialties] = useState<string[]>([]);

  // Extract unique specialties from doctors on component mount
  useEffect(() => {
    const uniqueSpecialties = Array.from(new Set(doctors.map(doctor => doctor.specialty)));
    setSpecialties(uniqueSpecialties.sort());
  }, [doctors]);

  return (
    <div className="flex flex-col sm:flex-row items-center gap-3 mb-6">
      <div className="flex items-center gap-2 text-primary">
        <Filter size={20} />
        <span className="font-medium">Filter by specialty:</span>
      </div>
      
      <Select 
        value={value || ""} 
        onValueChange={(value) => onChange(value === "" ? undefined : value)}
      >
        <SelectTrigger className="w-full sm:w-[250px]">
          <SelectValue placeholder="All specialties" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="">All specialties</SelectItem>
          {specialties.map((specialty) => (
            <SelectItem key={specialty} value={specialty}>
              {specialty}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SpecialtyFilter;
