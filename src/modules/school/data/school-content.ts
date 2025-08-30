// src/modules/school/data/school-content.ts

export interface SchoolCourse {
  id: string;
  title: string;
  description: string;
  duration: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "Professional";
  price?: string;
  startDate?: string;
  maxStudents?: number;
}

export interface SchoolFeature {
  id: string;
  title: string;
  description?: string;
  icon?: string;
}

export interface SchoolStat {
  id: string;
  value: string;
  label: string;
  icon?: string;
}

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  caption?: string;
}

export interface SchoolContent {
  heroTitle: string;
  heroSubtitle: string;
  description: string;
  externalUrl: string;
  features: SchoolFeature[];
  courses: SchoolCourse[];
  stats: SchoolStat[];
  gallery: GalleryImage[];
  redirectMessage: string;
  ctaButtonText: string;
  comingSoonBadge: boolean;
  metadata?: {
    established?: string;
    accreditation?: string[];
    partners?: string[];
  };
}

export const schoolContent: SchoolContent = {
  heroTitle: "Shkolla e Čokollatës",
  heroSubtitle: "Master the Art of Chocolate Making",
  description:
    "Welcome to Albania's premier chocolate education center, where passion meets precision. Our comprehensive programs combine traditional European techniques with modern innovation, preparing students for successful careers in the world of fine chocolate and confectionery arts.",
  externalUrl: "https://school.kakaodreamalbania.com",

  features: [
    {
      id: "feature-1",
      title: "Professional Instructors",
      description:
        "Learn from master chocolatiers with decades of international experience",
      icon: "users",
    },
    {
      id: "feature-2",
      title: "Certified Programs",
      description: "Internationally recognized certifications upon completion",
      icon: "award",
    },
    {
      id: "feature-3",
      title: "Hands-on Learning",
      description: "80% practical training in our state-of-the-art facilities",
      icon: "hand",
    },
    {
      id: "feature-4",
      title: "Small Class Sizes",
      description: "Maximum 12 students per class for personalized attention",
      icon: "users-group",
    },
    {
      id: "feature-5",
      title: "Industry Connections",
      description: "Direct placement opportunities with partner establishments",
      icon: "briefcase",
    },
    {
      id: "feature-6",
      title: "Flexible Scheduling",
      description:
        "Weekend and evening classes available for working professionals",
      icon: "calendar",
    },
  ],

  courses: [
    {
      id: "course-1",
      title: "Professional Chocolatier Certificate",
      description:
        "Comprehensive 6-month program covering bean-to-bar chocolate making, tempering techniques, ganache creation, and artistic presentation. Perfect for aspiring professionals seeking a career in chocolate.",
      duration: "6 months",
      level: "Professional",
      price: "€2,500",
      startDate: "September 2024",
      maxStudents: 12,
    },
    {
      id: "course-2",
      title: "Artisan Truffle & Bonbon Masterclass",
      description:
        "Intensive workshop focusing on creating premium filled chocolates, including classic ganaches, fruit preparations, and alcohol-infused centers. Learn molding, dipping, and decoration techniques.",
      duration: "4 weeks",
      level: "Intermediate",
      price: "€650",
      startDate: "Monthly",
      maxStudents: 10,
    },
    {
      id: "course-3",
      title: "Bean-to-Bar Fundamentals",
      description:
        "Discover the journey from cacao bean to finished chocolate. Learn roasting profiles, grinding techniques, conching, and how to develop your own signature chocolate recipes.",
      duration: "8 weeks",
      level: "Advanced",
      price: "€950",
      startDate: "October 2024",
      maxStudents: 8,
    },
    {
      id: "course-4",
      title: "Chocolate Tasting & Pairing Workshop",
      description:
        "Develop your palate and learn the art of chocolate tasting. Explore flavor profiles, origin characteristics, and expert pairing with wine, spirits, cheese, and other gourmet foods.",
      duration: "2 days",
      level: "Beginner",
      price: "€150",
      startDate: "Bi-weekly",
      maxStudents: 15,
    },
  ],

  stats: [
    {
      id: "stat-1",
      value: "500+",
      label: "Graduates",
      icon: "graduation-cap",
    },
    {
      id: "stat-2",
      value: "25+",
      label: "Courses Offered",
      icon: "book",
    },
    {
      id: "stat-3",
      value: "12",
      label: "Years Experience",
      icon: "calendar-check",
    },
    {
      id: "stat-4",
      value: "95%",
      label: "Job Placement Rate",
      icon: "briefcase",
    },
    {
      id: "stat-5",
      value: "8",
      label: "Master Instructors",
      icon: "star",
    },
    {
      id: "stat-6",
      value: "1000m²",
      label: "Training Facility",
      icon: "building",
    },
  ],

  gallery: [
    {
      id: "gallery-1",
      src: "/images/school/tempering-class.jpg",
      alt: "Students learning chocolate tempering techniques",
      caption: "Mastering the art of tempering",
    },
    {
      id: "gallery-2",
      src: "/images/school/truffle-workshop.jpg",
      alt: "Hands-on truffle making workshop",
      caption: "Creating artisan truffles",
    },
    {
      id: "gallery-3",
      src: "/images/school/bean-to-bar-process.jpg",
      alt: "Bean to bar chocolate making process",
      caption: "From bean to bar excellence",
    },
    {
      id: "gallery-4",
      src: "/images/school/decoration-techniques.jpg",
      alt: "Advanced chocolate decoration techniques",
      caption: "Artistic chocolate decorations",
    },
    {
      id: "gallery-5",
      src: "/images/school/classroom-facility.jpg",
      alt: "Modern chocolate making classroom",
      caption: "State-of-the-art facilities",
    },
    {
      id: "gallery-6",
      src: "/images/school/graduation-ceremony.jpg",
      alt: "Graduation ceremony with certificates",
      caption: "Celebrating our graduates",
    },
    {
      id: "gallery-7",
      src: "/images/school/tasting-session.jpg",
      alt: "Professional chocolate tasting session",
      caption: "Developing refined palates",
    },
    {
      id: "gallery-8",
      src: "/images/school/industry-partnership.jpg",
      alt: "Industry partnership and placement",
      caption: "Industry connections",
    },
  ],

  redirectMessage:
    "Visit our dedicated school platform for full course catalog and enrollment",
  ctaButtonText: "Explore Our School",
  comingSoonBadge: false, // Set to true if the school site is not ready yet

  metadata: {
    established: "2012",
    accreditation: [
      "International Chocolate Awards Academy",
      "European Confectionery Association",
      "Albanian Ministry of Education",
    ],
    partners: [
      "Valrhona Academy",
      "Barry Callebaut",
      "Cacao Barry",
      "Local Hotels & Restaurants",
    ],
  },
};

// Additional content sections that might be useful for the page

export const testimonials = [
  {
    id: "testimonial-1",
    name: "Maria Kovaçi",
    role: "Graduate 2023, Now Head Chocolatier",
    company: "Hotel Plaza Tirana",
    content:
      "The Professional Chocolatier program transformed my passion into a career. The hands-on training and industry connections were invaluable.",
    rating: 5,
  },
  {
    id: "testimonial-2",
    name: "Arben Hoxha",
    role: "Small Business Owner",
    company: "Artisan Chocolates Shkodra",
    content:
      "After completing the Bean-to-Bar course, I launched my own chocolate brand. The school provided not just skills, but the confidence to succeed.",
    rating: 5,
  },
  {
    id: "testimonial-3",
    name: "Elena Duka",
    role: "Pastry Chef",
    company: "Rogner Hotel",
    content:
      "The truffle masterclass elevated my dessert presentations to a new level. My customers consistently compliment the chocolate work.",
    rating: 5,
  },
];

export const upcomingEvents = [
  {
    id: "event-1",
    title: "Open House & Tasting",
    date: "2024-09-15",
    time: "14:00-17:00",
    description: "Tour our facilities and sample student creations",
  },
  {
    id: "event-2",
    title: "Guest Masterclass: Swiss Techniques",
    date: "2024-09-22",
    time: "10:00-16:00",
    description: "Special workshop with visiting Swiss master chocolatier",
  },
  {
    id: "event-3",
    title: "Student Showcase 2024",
    date: "2024-10-05",
    time: "18:00-21:00",
    description: "Annual exhibition of student final projects",
  },
];

export const faqs = [
  {
    id: "faq-1",
    question: "Do I need prior experience to enroll?",
    answer:
      "No prior experience is required for our beginner courses. We offer programs for all skill levels, from complete beginners to professional chefs looking to specialize.",
  },
  {
    id: "faq-2",
    question: "What equipment do I need to bring?",
    answer:
      "All equipment and materials are provided during classes. Students receive a professional toolkit upon enrollment in certificate programs.",
  },
  {
    id: "faq-3",
    question: "Are payment plans available?",
    answer:
      "Yes, we offer flexible payment plans for all certificate programs. Contact our admissions team for details.",
  },
  {
    id: "faq-4",
    question: "Can I visit the school before enrolling?",
    answer:
      "Absolutely! We host regular open houses and offer private tours by appointment. Contact us to schedule your visit.",
  },
];


 
const schoolData = {
  schoolContent,
  testimonials,
  upcomingEvents,
  faqs,
};

export default schoolData;