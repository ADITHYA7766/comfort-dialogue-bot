
import DoctorCard, { Doctor } from "./DoctorCard";

interface DoctorGridProps {
  doctors: Doctor[];
}

const DoctorGrid = ({ doctors }: DoctorGridProps) => {
  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
      {doctors.map((doctor) => (
        <DoctorCard key={doctor.id} doctor={doctor} />
      ))}
    </div>
  );
};

export default DoctorGrid;
