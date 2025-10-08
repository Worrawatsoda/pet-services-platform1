export interface VeterinaryClinic {
  id: string
  name: string
  address: string
  city: string
  state: string
  zipCode: string
  phone: string
  email: string
  website?: string
  rating: number
  reviewCount: number
  distance?: number
  image: string
  services: string[]
  hours: {
    monday: string
    tuesday: string
    wednesday: string
    thursday: string
    friday: string
    saturday: string
    sunday: string
  }
  emergency24_7: boolean
  acceptsWalkIns: boolean
  description: string
}

export interface PetChaperone {
  id: string
  name: string
  businessName?: string
  address: string
  city: string
  state: string
  zipCode: string
  phone: string
  email: string
  rating: number
  reviewCount: number
  distance?: number
  image: string
  services: string[]
  vehicleTypes: string[]
  petTypes: string[]
  priceRange: string
  availability: string
  yearsExperience: number
  licensed: boolean
  insured: boolean
  description: string
}

export const mockVeterinaryClinics: VeterinaryClinic[] = [
  {
    id: "1",
    name: "Paws & Claws Animal Hospital",
    address: "123 Main Street",
    city: "San Francisco",
    state: "CA",
    zipCode: "94102",
    phone: "(415) 555-0123",
    email: "info@pawsandclaws.com",
    website: "https://pawsandclaws.com",
    rating: 4.8,
    reviewCount: 234,
    distance: 1.2,
    image: "/modern-veterinary-clinic-exterior.jpg",
    services: ["General Care", "Surgery", "Dental", "Emergency Care", "Vaccinations", "X-Ray"],
    hours: {
      monday: "8:00 AM - 6:00 PM",
      tuesday: "8:00 AM - 6:00 PM",
      wednesday: "8:00 AM - 6:00 PM",
      thursday: "8:00 AM - 6:00 PM",
      friday: "8:00 AM - 6:00 PM",
      saturday: "9:00 AM - 4:00 PM",
      sunday: "Closed",
    },
    emergency24_7: false,
    acceptsWalkIns: true,
    description:
      "Full-service veterinary hospital providing comprehensive care for dogs, cats, and exotic pets. Our experienced team is dedicated to your pet's health and wellbeing.",
  },
  {
    id: "2",
    name: "Bay Area Emergency Vet",
    address: "456 Oak Avenue",
    city: "San Francisco",
    state: "CA",
    zipCode: "94103",
    phone: "(415) 555-0456",
    email: "emergency@bayareavet.com",
    website: "https://bayareavet.com",
    rating: 4.9,
    reviewCount: 567,
    distance: 2.5,
    image: "/emergency-veterinary-hospital.jpg",
    services: ["Emergency Care", "Critical Care", "Surgery", "Diagnostics", "ICU"],
    hours: {
      monday: "Open 24 Hours",
      tuesday: "Open 24 Hours",
      wednesday: "Open 24 Hours",
      thursday: "Open 24 Hours",
      friday: "Open 24 Hours",
      saturday: "Open 24 Hours",
      sunday: "Open 24 Hours",
    },
    emergency24_7: true,
    acceptsWalkIns: true,
    description:
      "24/7 emergency veterinary care with board-certified specialists. State-of-the-art facility equipped to handle any pet emergency.",
  },
  {
    id: "3",
    name: "Sunset Pet Clinic",
    address: "789 Sunset Boulevard",
    city: "San Francisco",
    state: "CA",
    zipCode: "94122",
    phone: "(415) 555-0789",
    email: "care@sunsetpet.com",
    rating: 4.6,
    reviewCount: 189,
    distance: 3.8,
    image: "/cozy-pet-clinic.jpg",
    services: ["General Care", "Vaccinations", "Dental", "Grooming", "Wellness Exams"],
    hours: {
      monday: "9:00 AM - 5:00 PM",
      tuesday: "9:00 AM - 5:00 PM",
      wednesday: "9:00 AM - 5:00 PM",
      thursday: "9:00 AM - 5:00 PM",
      friday: "9:00 AM - 5:00 PM",
      saturday: "10:00 AM - 2:00 PM",
      sunday: "Closed",
    },
    emergency24_7: false,
    acceptsWalkIns: false,
    description:
      "Neighborhood veterinary clinic focused on preventive care and building lasting relationships with pets and their families.",
  },
  {
    id: "4",
    name: "Mission District Animal Care",
    address: "321 Valencia Street",
    city: "San Francisco",
    state: "CA",
    zipCode: "94110",
    phone: "(415) 555-0321",
    email: "hello@missionanimalcare.com",
    rating: 4.7,
    reviewCount: 312,
    distance: 2.1,
    image: "/modern-animal-hospital.jpg",
    services: ["General Care", "Surgery", "Dental", "Dermatology", "Behavioral Consultation"],
    hours: {
      monday: "8:00 AM - 7:00 PM",
      tuesday: "8:00 AM - 7:00 PM",
      wednesday: "8:00 AM - 7:00 PM",
      thursday: "8:00 AM - 7:00 PM",
      friday: "8:00 AM - 7:00 PM",
      saturday: "9:00 AM - 5:00 PM",
      sunday: "10:00 AM - 3:00 PM",
    },
    emergency24_7: false,
    acceptsWalkIns: true,
    description:
      "Comprehensive veterinary services with extended hours and weekend availability. Specializing in both routine and advanced care.",
  },
]

export const mockPetChaperones: PetChaperone[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    businessName: "Safe Paws Transport",
    address: "555 Market Street",
    city: "San Francisco",
    state: "CA",
    zipCode: "94105",
    phone: "(415) 555-1111",
    email: "sarah@safepaws.com",
    rating: 4.9,
    reviewCount: 156,
    distance: 1.5,
    image: "/professional-pet-transport-driver-with-van.jpg",
    services: ["Vet Appointments", "Airport Transport", "Long Distance", "Emergency Transport"],
    vehicleTypes: ["Climate-Controlled Van", "SUV"],
    petTypes: ["Dogs", "Cats", "Small Animals"],
    priceRange: "$$",
    availability: "Mon-Sun, 7 AM - 9 PM",
    yearsExperience: 8,
    licensed: true,
    insured: true,
    description:
      "Experienced pet transport specialist with climate-controlled vehicles. Your pet's comfort and safety are my top priorities.",
  },
  {
    id: "2",
    name: "Mike Chen",
    businessName: "Pet Ride Pro",
    address: "888 Howard Street",
    city: "San Francisco",
    state: "CA",
    zipCode: "94103",
    phone: "(415) 555-2222",
    email: "mike@petridepro.com",
    rating: 4.8,
    reviewCount: 203,
    distance: 2.3,
    image: "/pet-taxi-service-vehicle.jpg",
    services: ["Vet Appointments", "Grooming Transport", "Day Care Drop-off", "Emergency Transport"],
    vehicleTypes: ["Sedan", "SUV"],
    petTypes: ["Dogs", "Cats"],
    priceRange: "$",
    availability: "24/7",
    yearsExperience: 5,
    licensed: true,
    insured: true,
    description: "24/7 pet transportation service. Quick response times and gentle handling for anxious pets.",
  },
  {
    id: "3",
    name: "Jennifer Martinez",
    businessName: "Furry Friends Express",
    address: "234 Valencia Street",
    city: "San Francisco",
    state: "CA",
    zipCode: "94103",
    phone: "(415) 555-3333",
    email: "jen@furryfriends.com",
    rating: 4.7,
    reviewCount: 128,
    distance: 1.8,
    image: "/pet-transport-professional-with-small-dog.jpg",
    services: ["Vet Appointments", "Grooming Transport", "Airport Transport", "Pet Sitting"],
    vehicleTypes: ["SUV", "Minivan"],
    petTypes: ["Dogs", "Cats", "Birds", "Small Animals"],
    priceRange: "$$",
    availability: "Mon-Sat, 6 AM - 8 PM",
    yearsExperience: 6,
    licensed: true,
    insured: true,
    description:
      "Caring and reliable pet transport with experience handling all types of pets. Specialized in nervous and senior pets.",
  },
  {
    id: "4",
    name: "David Thompson",
    businessName: "Bay Area Pet Taxi",
    address: "567 Folsom Street",
    city: "San Francisco",
    state: "CA",
    zipCode: "94105",
    phone: "(415) 555-4444",
    email: "david@bayareapettaxi.com",
    rating: 4.9,
    reviewCount: 289,
    distance: 2.7,
    image: "/pet-transport-van-with-logo.jpg",
    services: ["Vet Appointments", "Emergency Transport", "Long Distance", "Airport Transport", "Multi-Pet Transport"],
    vehicleTypes: ["Climate-Controlled Van", "Large Van"],
    petTypes: ["Dogs", "Cats", "Exotic Pets"],
    priceRange: "$$$",
    availability: "24/7",
    yearsExperience: 12,
    licensed: true,
    insured: true,
    description:
      "Premium pet transportation service with over a decade of experience. Specializing in long-distance and multi-pet transport.",
  },
  {
    id: "5",
    name: "Lisa Wong",
    businessName: "Gentle Paws Transport",
    address: "890 Mission Street",
    city: "San Francisco",
    state: "CA",
    zipCode: "94103",
    phone: "(415) 555-5555",
    email: "lisa@gentlepaws.com",
    rating: 4.8,
    reviewCount: 167,
    distance: 3.2,
    image: "/caring-pet-transport-driver.jpg",
    services: ["Vet Appointments", "Grooming Transport", "Day Care Drop-off"],
    vehicleTypes: ["Sedan", "SUV"],
    petTypes: ["Dogs", "Cats"],
    priceRange: "$",
    availability: "Mon-Fri, 7 AM - 7 PM",
    yearsExperience: 4,
    licensed: true,
    insured: true,
    description:
      "Affordable and gentle pet transport service. Perfect for routine vet visits and grooming appointments.",
  },
]
