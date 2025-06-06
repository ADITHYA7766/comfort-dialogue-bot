
export interface Doctor {
  id: number;
  name: string;
  nickname?: string;
  specialty: string;
  description: string;
  image: string;
}

// Doctor data
export const doctors: Doctor[] = [
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
    image: "/lovable-uploads/066fe07d-df8d-4416-a6f4-db185a0dcc7e.png"
  },
  {
    id: 8,
    name: "Dr. Wanda Maximoff",
    specialty: "Pediatric Psychology",
    description: "Dedicated child psychologist focusing on early development and trauma recovery. Uses innovative therapy methods to help children overcome psychological challenges.",
    image: "/lovable-uploads/827e947a-155e-423c-822b-78fba6f0c593.png"
  },
  {
    id: 9,
    name: "Dr. Sam Wilson",
    specialty: "Rehabilitation Medicine",
    description: "Rehabilitation specialist helping patients recover from injuries, surgeries, and chronic conditions. Develops comprehensive recovery plans focusing on regaining function and independence.",
    image: "/lovable-uploads/01434cbc-7462-485e-ba90-e3f6b95f40de.png"
  },
  {
    id: 10,
    name: "Dr. Peter Parker",
    specialty: "Sports Medicine",
    description: "Sports medicine physician specializing in treating athletic injuries and improving performance. Works with athletes at all levels to prevent injuries and optimize recovery.",
    image: "/lovable-uploads/066fe07d-df8d-4416-a6f4-db185a0dcc7e.png"
  },
  {
    id: 11,
    name: "Dr. Maria Hill",
    specialty: "Emergency Medicine",
    description: "Emergency medicine specialist with extensive experience in critical care situations. Known for making quick, accurate diagnoses and providing life-saving interventions.",
    image: "/lovable-uploads/827e947a-155e-423c-822b-78fba6f0c593.png"
  },
  {
    id: 12,
    name: "Dr. Scott Lang",
    specialty: "Infectious Disease",
    description: "Infectious disease specialist focused on diagnosing and treating complex or rare infections. Develops protocols for preventing the spread of communicable diseases.",
    image: "/lovable-uploads/01434cbc-7462-485e-ba90-e3f6b95f40de.png"
  },
  {
    id: 13,
    name: "Dr. James Rhodes",
    specialty: "Orthopedic Surgery",
    description: "Orthopedic surgeon specializing in joint replacement surgeries and sports-related injuries. Utilizes the latest minimally invasive techniques for faster patient recovery.",
    image: "/lovable-uploads/827e947a-155e-423c-822b-78fba6f0c593.png"
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
    image: "/lovable-uploads/01434cbc-7462-485e-ba90-e3f6b95f40de.png"
  },
  {
    id: 16,
    name: "Dr. Clint Barton",
    specialty: "Audiology",
    description: "Audiologist specializing in diagnosing and treating hearing disorders. Provides innovative hearing solutions and rehabilitation techniques for patients of all ages.",
    image: "/lovable-uploads/827e947a-155e-423c-822b-78fba6f0c593.png"
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
    image: "/lovable-uploads/01434cbc-7462-485e-ba90-e3f6b95f40de.png"
  }
];
