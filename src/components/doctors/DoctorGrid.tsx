
import DoctorCard, { Doctor } from "./DoctorCard";

interface DoctorGridProps {
  doctors: Doctor[];
  specialty?: string;
}

const DoctorGrid = ({ doctors, specialty }: DoctorGridProps) => {
  // Filter doctors by specialty if a filter is provided
  const filteredDoctors = specialty 
    ? doctors.filter(doctor => doctor.specialty === specialty) 
    : doctors;

  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
      {filteredDoctors.length > 0 ? (
        filteredDoctors.map((doctor) => (
          <DoctorCard key={doctor.id} doctor={doctor} />
        ))
      ) : (
        <div className="col-span-full text-center py-12">
          <h3 className="text-xl font-semibold mb-2">No doctors found</h3>
          <p className="text-muted-foreground">
            No doctors match the selected specialty. Please try another filter.
          </p>
        </div>
      )}
    </div>
  );
};

export default DoctorGrid;
