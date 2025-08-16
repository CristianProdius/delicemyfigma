// src/modules/about/data/about-content.ts

// Define types inline (no separate types file)
export interface TimelineEvent {
  id: string;
  year: string;
  title: string;
  description: string;
  achievement?: string;
  image?: string;
}

export interface Philosophy {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Skill {
  id: string;
  name: string;
  level: number;
  category: string;
  description: string;
  certifications?: string[];
}

export interface AboutPerson {
  id: string;
  name: string;
  title: string;
  subtitle: string;
  tagline: string;
  description: string;
  heroImage: string;
  signature?: string;
  timeline: TimelineEvent[];
  philosophy: Philosophy[];
  skills: Skill[];
  achievements: {
    yearsExperience: number;
    studentsTraught: number;
    creationsDesigned: number;
    awardsWon: number;
  };
  testimonials: Array<{
    id: string;
    name: string;
    role: string;
    company?: string;
    content: string;
    rating: number;
  }>;
  accentColor: string;
}

export interface AboutCompany {
  id: string;
  name: string;
  tagline: string;
  established: string;
  mission: string;
  vision: string;
  heroImage: string;
  story: {
    chapters: Array<{
      id: string;
      title: string;
      year: string;
      content: string;
      image: string;
    }>;
  };
  values: Array<{
    id: string;
    title: string;
    description: string;
    icon: string;
    color: string;
  }>;
  awards: Array<{
    id: string;
    title: string;
    year: string;
    organization: string;
    description: string;
  }>;
  metrics: {
    chocolatesCrafted: string;
    happyCustomers: string;
    recipesCreated: string;
    eventsHosted: string;
  };
  team: Array<{
    id: string;
    name: string;
    role: string;
    bio: string;
    image: string;
    specialties: string[];
  }>;
  accentColor: string;
}

export const oleseaContent: AboutPerson = {
  id: "olesea-profile",
  name: "Olesea Stamatin",
  title: "Master Chocolatier & Artisan",
  subtitle: "Crafting Sweet Moments Since 2012",
  tagline: "Where Passion Meets Perfection in Every Creation",
  description:
    "With over a decade of experience in the art of chocolate and pastry making, I bring together traditional techniques and modern innovation to create unforgettable culinary experiences. My journey from a passionate home baker to a renowned chocolatier has been driven by an unwavering commitment to quality, creativity, and the joy of sharing handcrafted delights.",
  heroImage: "/images/about/olesea-hero.jpg",
  signature: "/images/about/signature.png",
  timeline: [
    {
      id: "timeline-1",
      year: "2012",
      title: "The Sweet Beginning",
      description:
        "Started my journey with a small home kitchen and a big dream to create artisanal chocolates that tell a story.",
      achievement: "First successful chocolate collection launched",
      image: "/images/timeline/2012-beginning.jpg",
    },
    {
      id: "timeline-2",
      year: "2015",
      title: "Professional Certification",
      description:
        "Completed advanced chocolatier training at the prestigious Callebaut Academy in Belgium.",
      achievement: "Certified Master Chocolatier",
      image: "/images/timeline/2015-certification.jpg",
    },
    {
      id: "timeline-3",
      year: "2018",
      title: "Studio Opening",
      description:
        "Opened our first professional chocolate studio and workshop space in the heart of the city.",
      achievement: "Established Cocoa Dreams Studio",
      image: "/images/timeline/2018-studio.jpg",
    },
    {
      id: "timeline-4",
      year: "2020",
      title: "Digital Expansion",
      description:
        "Launched online masterclasses and reached students globally during challenging times.",
      achievement: "Taught over 500 students worldwide",
      image: "/images/timeline/2020-digital.jpg",
    },
    {
      id: "timeline-5",
      year: "2023",
      title: "International Recognition",
      description:
        "Awarded Best Artisan Chocolatier at the International Chocolate Awards.",
      achievement: "Gold Medal Winner",
      image: "/images/timeline/2023-award.jpg",
    },
  ],
  philosophy: [
    {
      id: "philosophy-1",
      title: "Quality Over Quantity",
      description:
        "Every creation is handcrafted with premium ingredients and meticulous attention to detail.",
      icon: "✨",
    },
    {
      id: "philosophy-2",
      title: "Continuous Innovation",
      description:
        "Blending traditional techniques with modern creativity to push the boundaries of chocolate art.",
      icon: "🎨",
    },
    {
      id: "philosophy-3",
      title: "Sustainable Practices",
      description:
        "Committed to ethical sourcing and environmentally conscious production methods.",
      icon: "🌱",
    },
    {
      id: "philosophy-4",
      title: "Knowledge Sharing",
      description:
        "Passionate about teaching and inspiring the next generation of chocolatiers.",
      icon: "📚",
    },
  ],
  skills: [
    {
      id: "skill-1",
      name: "Chocolate Tempering",
      level: 95,
      category: "Technical",
      description:
        "Expert in all tempering methods including tabling, seeding, and continuous tempering.",
      certifications: ["Callebaut Academy Advanced", "Valrhona Professional"],
    },
    {
      id: "skill-2",
      name: "Flavor Pairing",
      level: 90,
      category: "Creative",
      description:
        "Innovative combinations that balance traditional and exotic flavors.",
      certifications: ["International Flavor Institute"],
    },
    {
      id: "skill-3",
      name: "Sugar Art",
      level: 85,
      category: "Artistic",
      description:
        "Creating intricate sugar sculptures and decorative elements.",
      certifications: ["French Pastry School Sugar Art"],
    },
    {
      id: "skill-4",
      name: "Recipe Development",
      level: 92,
      category: "Innovation",
      description:
        "Developing unique recipes that become signature bestsellers.",
      certifications: [],
    },
    {
      id: "skill-5",
      name: "Teaching & Mentoring",
      level: 88,
      category: "Education",
      description:
        "Effectively communicating complex techniques to students of all levels.",
      certifications: ["Professional Teaching Certificate"],
    },
  ],
  achievements: {
    yearsExperience: 12,
    studentsTraught: 850,
    creationsDesigned: 300,
    awardsWon: 15,
  },
  testimonials: [
    {
      id: "testimonial-1",
      name: "Sarah Mitchell",
      role: "Food Critic",
      company: "Gourmet Magazine",
      content:
        "Olesea's chocolates are not just confections; they are edible art pieces that tell a story with every bite. Her attention to detail and flavor innovation is unmatched.",
      rating: 5,
    },
    {
      id: "testimonial-2",
      name: "Marcus Chen",
      role: "Executive Chef",
      company: "Le Bernardin",
      content:
        "Working with Olesea has elevated our dessert program to new heights. Her creativity and technical expertise are truly inspiring.",
      rating: 5,
    },
    {
      id: "testimonial-3",
      name: "Elena Rodriguez",
      role: "Student",
      company: "Masterclass Graduate",
      content:
        "Olesea's teaching style is patient, thorough, and encouraging. She transformed my hobby into a professional skill set.",
      rating: 5,
    },
    {
      id: "testimonial-4",
      name: "James Thompson",
      role: "Event Planner",
      company: "Luxe Events",
      content:
        "For our high-end events, Olesea's creations are always the highlight. Her ability to customize and exceed expectations is remarkable.",
      rating: 5,
    },
  ],
  accentColor: "#8B4513",
};

export const companyContent: AboutCompany = {
  id: "company-profile",
  name: "Cocoa Dreams Artisan Studio",
  tagline: "Where Every Bite Tells a Story",
  established: "2018",
  mission:
    "To create extraordinary chocolate experiences that celebrate craftsmanship, innovation, and the pure joy of indulgence while maintaining sustainable and ethical practices.",
  vision:
    "To become the premier destination for artisanal chocolate education and bespoke confections, inspiring a global community of chocolate enthusiasts and professionals.",
  heroImage: "/images/about/company-hero.jpg",
  story: {
    chapters: [
      {
        id: "chapter-1",
        title: "The Foundation",
        year: "2018",
        content:
          "Born from a passion for chocolate and a dream to share the art of confectionery, Cocoa Dreams opened its doors in a cozy studio space. What started as a one-woman operation quickly grew into a beloved local institution.",
        image: "/images/story/foundation.jpg",
      },
      {
        id: "chapter-2",
        title: "Growing Community",
        year: "2019",
        content:
          "As word spread about our unique approach to chocolate making, we expanded our team and began offering workshops. The studio became a gathering place for chocolate lovers and aspiring chocolatiers.",
        image: "/images/story/community.jpg",
      },
      {
        id: "chapter-3",
        title: "Innovation Era",
        year: "2021",
        content:
          "We invested in state-of-the-art equipment and launched our signature collection, featuring revolutionary flavor combinations that pushed the boundaries of traditional chocolate making.",
        image: "/images/story/innovation.jpg",
      },
      {
        id: "chapter-4",
        title: "Global Reach",
        year: "2023",
        content:
          "With online masterclasses and international shipping, we've connected with chocolate enthusiasts worldwide, sharing our passion and expertise across continents.",
        image: "/images/story/global.jpg",
      },
    ],
  },
  values: [
    {
      id: "value-1",
      title: "Excellence",
      description:
        "We never compromise on quality, using only the finest ingredients and time-honored techniques.",
      icon: "⭐",
      color: "#FFD700",
    },
    {
      id: "value-2",
      title: "Creativity",
      description:
        "Innovation drives us to constantly explore new flavors, techniques, and presentations.",
      icon: "🎨",
      color: "#FF69B4",
    },
    {
      id: "value-3",
      title: "Sustainability",
      description:
        "Committed to ethical sourcing, minimal waste, and supporting cocoa farming communities.",
      icon: "🌍",
      color: "#228B22",
    },
    {
      id: "value-4",
      title: "Education",
      description:
        "Sharing knowledge and inspiring others to discover the art of chocolate making.",
      icon: "📖",
      color: "#4169E1",
    },
    {
      id: "value-5",
      title: "Community",
      description:
        "Building connections through chocolate, creating moments of joy and celebration.",
      icon: "🤝",
      color: "#FF6347",
    },
  ],
  awards: [
    {
      id: "award-1",
      title: "Best Artisan Chocolatier",
      year: "2023",
      organization: "International Chocolate Awards",
      description:
        "Recognized for exceptional craftsmanship and innovative flavor profiles in the artisan category.",
    },
    {
      id: "award-2",
      title: "Sustainability Excellence",
      year: "2022",
      organization: "Green Business Alliance",
      description:
        "Awarded for commitment to sustainable practices and ethical sourcing.",
    },
    {
      id: "award-3",
      title: "Innovation in Confectionery",
      year: "2021",
      organization: "Pastry Arts Magazine",
      description:
        "Celebrated for groundbreaking techniques in chocolate tempering and flavor development.",
    },
    {
      id: "award-4",
      title: "Best Educational Program",
      year: "2020",
      organization: "Culinary Institute Awards",
      description:
        "Recognized for outstanding chocolate-making workshops and masterclasses.",
    },
  ],
  metrics: {
    chocolatesCrafted: "50,000+",
    happyCustomers: "10,000+",
    recipesCreated: "300+",
    eventsHosted: "200+",
  },
  team: [
    {
      id: "team-1",
      name: "Olesea Stamatin",
      role: "Founder & Master Chocolatier",
      bio: "With over 12 years of experience, Olesea leads our creative vision and maintains the highest standards of quality in every creation.",
      image: "/images/team/olesea.jpg",
      specialties: ["Chocolate Tempering", "Flavor Innovation", "Sugar Art"],
    },
    {
      id: "team-2",
      name: "Maria Petrov",
      role: "Head Pastry Chef",
      bio: "Maria brings 8 years of pastry expertise, specializing in French techniques and modern dessert architecture.",
      image: "/images/team/maria.jpg",
      specialties: ["French Pastry", "Cake Design", "Ganache Mastery"],
    },
    {
      id: "team-3",
      name: "David Laurent",
      role: "Chocolate Specialist",
      bio: "Trained in Belgium, David ensures perfect tempering and assists in developing our signature chocolate blends.",
      image: "/images/team/david.jpg",
      specialties: ["Bean-to-Bar", "Tempering", "Truffle Making"],
    },
    {
      id: "team-4",
      name: "Ana Silva",
      role: "Workshop Coordinator",
      bio: "Ana manages our educational programs and ensures every student has an enriching learning experience.",
      image: "/images/team/ana.jpg",
      specialties: ["Teaching", "Event Planning", "Customer Relations"],
    },
    {
      id: "team-5",
      name: "Robert Kim",
      role: "Creative Director",
      bio: "Robert oversees our visual identity, packaging design, and ensures every creation is Instagram-worthy.",
      image: "/images/team/robert.jpg",
      specialties: ["Design", "Photography", "Brand Development"],
    },
  ],
  accentColor: "#D2691E",
};

// Utility functions
export const getOleseaContent = (): AboutPerson => oleseaContent;
export const getCompanyContent = (): AboutCompany => companyContent;

// Helper functions for specific data retrieval
export const getTimelineEvents = (): TimelineEvent[] => oleseaContent.timeline;
export const getPhilosophy = (): Philosophy[] => oleseaContent.philosophy;
export const getSkills = (): Skill[] => oleseaContent.skills;
export const getTeamMembers = () => companyContent.team;
export const getCompanyValues = () => companyContent.values;
export const getAwards = () => companyContent.awards;

// Function to get combined metrics
export const getCombinedMetrics = () => ({
  personal: oleseaContent.achievements,
  company: companyContent.metrics,
});

// Function to get testimonials with filtering
export const getTestimonials = (minRating: number = 0) =>
  oleseaContent.testimonials.filter((t) => t.rating >= minRating);

// Function to get team member by role
export const getTeamMemberByRole = (role: string) =>
  companyContent.team.find((member) =>
    member.role.toLowerCase().includes(role.toLowerCase())
  );

// Export all content as default
export default {
  personal: oleseaContent,
  company: companyContent,
};
