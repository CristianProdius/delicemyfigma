// src/modules/contact/data/contact-content.ts

export interface ContactMethod {
  id: string;
  icon: string;
  title: string;
  value: string;
  description: string;
  link?: string;
  responseTime?: string;
}

export interface BusinessHour {
  day: string;
  hours: string;
  isOpen: boolean;
  note?: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: "booking" | "orders" | "visiting" | "general";
}

export interface LocationInfo {
  address: string;
  city: string;
  postalCode: string;
  country: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  landmark?: string;
  parking?: string;
}

export interface ContactContent {
  hero: {
    title: string;
    subtitle: string;
    description: string;
  };
  contactMethods: ContactMethod[];
  businessHours: {
    title: string;
    subtitle: string;
    schedule: BusinessHour[];
    specialNote: string;
  };
  location: LocationInfo;
  faqs: {
    title: string;
    subtitle: string;
    items: FAQ[];
  };
  form: {
    title: string;
    subtitle: string;
    fields: {
      name: { label: string; placeholder: string };
      email: { label: string; placeholder: string };
      phone: { label: string; placeholder: string };
      subject: {
        label: string;
        placeholder: string;
        options: string[];
      };
      message: { label: string; placeholder: string };
    };
    submitButton: string;
    submittingText: string;
    successMessage: string;
  };
  cta: {
    title: string;
    description: string;
    buttonText: string;
  };
}

export const contactContent: ContactContent = {
  hero: {
    title: "Visit Our Chocolate Atelier",
    subtitle: "Where Every Creation Tells a Story",
    description:
      "Step into our world of artisanal chocolate, where traditional craftsmanship meets innovative flavors. We welcome you to experience the magic of handcrafted confections.",
  },

  contactMethods: [
    {
      id: "email",
      icon: "Mail",
      title: "Email Correspondence",
      value: "atelier@delicemy.com",
      description: "For inquiries about custom orders and consultations",
      link: "mailto:atelier@delicemy.com",
      responseTime: "Within 24 hours",
    },
    {
      id: "phone",
      icon: "Phone",
      title: "Personal Consultation",
      value: "+1 (555) 123-4567",
      description: "Speak directly with our chocolatiers",
      link: "tel:+15551234567",
      responseTime: "Monday-Saturday, 9am-6pm",
    },
    {
      id: "whatsapp",
      icon: "MessageCircle",
      title: "WhatsApp",
      value: "+1 (555) 123-4567",
      description: "Quick questions and order updates",
      link: "https://wa.me/15551234567",
      responseTime: "Within 2 hours during business hours",
    },
    {
      id: "appointment",
      icon: "Calendar",
      title: "Private Consultations",
      value: "By Appointment",
      description: "Schedule an exclusive tasting experience",
      responseTime: "Bookings available 48 hours in advance",
    },
  ],

  businessHours: {
    title: "Atelier Hours",
    subtitle: "When Magic Happens",
    schedule: [
      {
        day: "Monday",
        hours: "9:00 AM - 6:00 PM",
        isOpen: true,
      },
      {
        day: "Tuesday",
        hours: "9:00 AM - 6:00 PM",
        isOpen: true,
      },
      {
        day: "Wednesday",
        hours: "9:00 AM - 6:00 PM",
        isOpen: true,
      },
      {
        day: "Thursday",
        hours: "9:00 AM - 7:00 PM",
        isOpen: true,
        note: "Extended hours for tastings",
      },
      {
        day: "Friday",
        hours: "9:00 AM - 7:00 PM",
        isOpen: true,
        note: "Extended hours for weekend orders",
      },
      {
        day: "Saturday",
        hours: "10:00 AM - 5:00 PM",
        isOpen: true,
        note: "Workshop sessions available",
      },
      {
        day: "Sunday",
        hours: "Closed",
        isOpen: false,
        note: "Available for private events",
      },
    ],
    specialNote:
      "Private events and exclusive consultations available outside regular hours by special arrangement. Holiday hours may vary.",
  },

  location: {
    address: "127 Rue du Chocolat",
    city: "San Francisco",
    postalCode: "94108",
    country: "United States",
    coordinates: {
      lat: 37.7749,
      lng: -122.4194,
    },
    landmark: "Near Union Square, between Grand Hotel and Artisan Market",
    parking:
      "Valet parking available. Public parking at Union Square Garage (2-minute walk)",
  },

  faqs: {
    title: "Frequently Asked Questions",
    subtitle: "Everything You Need to Know",
    items: [
      {
        id: "faq-1",
        question: "How do I book a chocolate-making masterclass?",
        answer:
          "Our intimate masterclasses can be reserved through our online booking system or by calling the atelier directly. Classes are limited to 8 participants to ensure personalized attention. We recommend booking at least two weeks in advance, especially for weekend sessions. Private group sessions can be arranged with 4-week notice.",
        category: "booking",
      },
      {
        id: "faq-2",
        question: "What is the process for custom chocolate orders?",
        answer:
          "Custom creations begin with a personal consultation where we discuss your vision, flavor preferences, and occasion. Our master chocolatiers will craft a proposal within 48 hours. Most custom orders require 2-3 weeks lead time, with rush orders available for an additional fee. Minimum order quantities apply for bespoke designs.",
        category: "orders",
      },
      {
        id: "faq-3",
        question: "Can I visit the atelier without an appointment?",
        answer:
          "Our boutique welcomes walk-in visitors during regular hours to explore our ready-made collection. However, for atelier tours, tastings, or consultations with our chocolatiers, we highly recommend scheduling an appointment to ensure we can provide you with our full attention and the exceptional experience you deserve.",
        category: "visiting",
      },
      {
        id: "faq-4",
        question: "Do you offer corporate gifting services?",
        answer:
          "Absolutely. We specialize in creating memorable corporate gifts that reflect your brand's sophistication. From custom packaging to personalized flavor profiles, our corporate services team will work closely with you. Volume discounts available for orders exceeding 50 pieces. Contact us for our corporate portfolio.",
        category: "orders",
      },
      {
        id: "faq-5",
        question: "What makes your chocolate different?",
        answer:
          "We source single-origin cacao beans directly from small farms, ensuring both exceptional quality and ethical practices. Each batch is crafted by hand in small quantities, allowing us to maintain the highest standards. Our unique flavor combinations are inspired by global cuisines while honoring traditional Belgian and French techniques.",
        category: "general",
      },
      {
        id: "faq-6",
        question: "Are private events available at the atelier?",
        answer:
          "Yes, our atelier transforms into an exclusive venue for private events. Whether it's an intimate celebration, corporate team-building, or a romantic evening, we create bespoke experiences. Events include guided tastings, chocolate-making sessions, and can be paired with champagne or wine. Sunday bookings are exclusively for private events.",
        category: "booking",
      },
      {
        id: "faq-7",
        question: "What is your cancellation policy?",
        answer:
          "For masterclasses and consultations, we request 48-hour notice for cancellations to receive a full refund. Custom orders require 7-day notice once production has begun. We understand plans change and will work with you to reschedule when possible. Private events have specific terms detailed in their contracts.",
        category: "booking",
      },
      {
        id: "faq-8",
        question: "Do you ship internationally?",
        answer:
          "We offer worldwide shipping for our signature collections. Each order is carefully packaged with temperature-controlled materials to ensure your chocolates arrive in perfect condition. International orders typically arrive within 5-7 business days. Customs fees may apply depending on destination.",
        category: "orders",
      },
    ],
  },

  form: {
    title: "Send Us a Message",
    subtitle: "We'd love to hear from you",
    fields: {
      name: {
        label: "Your Name",
        placeholder: "How may we address you?",
      },
      email: {
        label: "Email Address",
        placeholder: "your@email.com",
      },
      phone: {
        label: "Phone Number (Optional)",
        placeholder: "+1 (555) 000-0000",
      },
      subject: {
        label: "How Can We Assist You?",
        placeholder: "Select a topic",
        options: [
          "Custom Order Consultation",
          "Masterclass Booking",
          "Private Event Inquiry",
          "Corporate Gifting",
          "Atelier Visit",
          "General Inquiry",
        ],
      },
      message: {
        label: "Your Message",
        placeholder: "Share your thoughts, questions, or special requests...",
      },
    },
    submitButton: "Send Message",
    submittingText: "Sending your message...",
    successMessage:
      "Thank you for reaching out. We'll respond within 24 hours with the attention your inquiry deserves.",
  },

  cta: {
    title: "Experience Chocolate Perfection",
    description:
      "Join us for an unforgettable journey through the art of chocolate making. From bean to bar, discover the passion behind every creation.",
    buttonText: "Book Your Visit",
  },
};

// Helper function to check if atelier is currently open
export const isAtelierOpen = (): boolean => {
  const now = new Date();
  const day = now.getDay();
  const hour = now.getHours();
  const minute = now.getMinutes();
  const currentTime = hour * 60 + minute;

  const schedule: Record<number, { open: number; close: number } | null> = {
    0: null, // Sunday - closed
    1: { open: 9 * 60, close: 18 * 60 }, // Monday
    2: { open: 9 * 60, close: 18 * 60 }, // Tuesday
    3: { open: 9 * 60, close: 18 * 60 }, // Wednesday
    4: { open: 9 * 60, close: 19 * 60 }, // Thursday
    5: { open: 9 * 60, close: 19 * 60 }, // Friday
    6: { open: 10 * 60, close: 17 * 60 }, // Saturday
  };

  const todaySchedule = schedule[day];
  if (!todaySchedule) return false;

  return currentTime >= todaySchedule.open && currentTime < todaySchedule.close;
};

// Helper to get next opening time
export const getNextOpeningTime = (): string => {
  const now = new Date();
  const day = now.getDay();

  if (day === 0) return "Monday at 9:00 AM";
  if (day === 6 && now.getHours() >= 17) return "Monday at 9:00 AM";
  if (now.getHours() >= 18) return "Tomorrow at 9:00 AM";

  return "Today";
};
