// src/modules/services/data/services-content.ts

// Type definitions for better TypeScript support and Strapi integration
export interface ServiceFeature {
  icon: string; // Icon name as string for Strapi compatibility
  title: string;
  description: string;
}

export interface ServiceTestimonial {
  id: string;
  name: string;
  role?: string;
  company?: string;
  content: string;
  rating: number;
  image?: string;
}

export interface ServiceFAQ {
  id: string;
  question: string;
  answer: string;
}

export interface ServicePricing {
  type: "fixed" | "range" | "custom" | "package";
  currency: string;
  amount?: number;
  minAmount?: number;
  maxAmount?: number;
  unit?: string; // per person, per hour, per event
  packages?: Array<{
    name: string;
    price: number;
    features: string[];
    highlighted?: boolean;
  }>;
  note?: string;
}

export interface Service {
  id: string; // URL slug
  title: string;
  shortDescription: string; // For cards
  longDescription: string; // For detail page
  heroImage: string;
  galleryImages: string[];
  features: ServiceFeature[];
  pricing?: ServicePricing;
  duration?: string;
  groupSize?: string;
  targetAudience: string[];
  benefits: string[];
  testimonials: ServiceTestimonial[];
  ctaText: string;
  ctaButtonText: string;
  faqs: ServiceFAQ[];
  accentColor: string; // Brand color for this service
  icon: string; // Main icon for the service
  availability?: string;
  location?: string;
  requirements?: string[];
  includedInPrice?: string[];
  additionalInfo?: string;
}

export const servicesContent: Service[] = [
  {
    id: "chocolate-classes-adults",
    title: "Chocolate Classes for Adults",
    shortDescription:
      "Learn to make chocolates like a pro. Group or private lessons available. We even help you start your own chocolate business!",
    longDescription:
      "Embark on an extraordinary journey into the world of artisan chocolate making. Our comprehensive adult classes combine traditional European techniques with modern innovation, taught by Master Chocolatier Olesea Kolomiets. Whether you're a passionate home cook, aspiring entrepreneur, or simply a chocolate enthusiast, our classes will transform your understanding and skills in chocolate craftsmanship. From tempering techniques to flavor pairing, from bonbon creation to business development, we cover every aspect of the chocolate arts.",
    heroImage: "/img/adult-classes.jpg",
    galleryImages: [
      "/img/adult-class-1.jpg",
      "/img/adult-class-2.jpg",
      "/img/adult-class-3.jpg",
      "/img/adult-class-4.jpg",
      "/img/adult-class-5.jpg",
    ],
    features: [
      {
        icon: "GraduationCap",
        title: "Expert Instruction",
        description:
          "Learn from a master chocolatier with 15+ years of international experience",
      },
      {
        icon: "BookOpen",
        title: "Comprehensive Curriculum",
        description:
          "From basic tempering to advanced decorating techniques and flavor development",
      },
      {
        icon: "Briefcase",
        title: "Business Mentorship",
        description:
          "Special modules on starting and scaling your own chocolate business",
      },
      {
        icon: "Award",
        title: "Certification",
        description:
          "Receive a professional certificate upon course completion",
      },
      {
        icon: "Users",
        title: "Small Groups",
        description: "Maximum 8 students per class for personalized attention",
      },
      {
        icon: "Coffee",
        title: "All Materials Included",
        description:
          "Premium chocolate, tools, and take-home creations provided",
      },
    ],
    pricing: {
      type: "package",
      currency: "USD",
      packages: [
        {
          name: "Introduction Workshop",
          price: 150,
          features: [
            "3-hour hands-on session",
            "Basic tempering techniques",
            "Create 20 bonbons to take home",
            "Recipe booklet included",
          ],
        },
        {
          name: "Master Class Series",
          price: 850,
          features: [
            "6 sessions (18 hours total)",
            "Advanced techniques",
            "Business module included",
            "Professional tool kit",
            "Lifetime recipe access",
          ],
          highlighted: true,
        },
        {
          name: "Private Mentorship",
          price: 2500,
          features: [
            "One-on-one instruction",
            "Customized curriculum",
            "12 hours of training",
            "Business plan development",
            "3-month follow-up support",
          ],
        },
      ],
      note: "Group discounts available for 4+ people",
    },
    duration: "3 hours to 6 weeks depending on program",
    groupSize: "2-8 participants (private sessions available)",
    targetAudience: [
      "Culinary enthusiasts",
      "Aspiring chocolatiers",
      "Home bakers wanting to expand skills",
      "Entrepreneurs planning chocolate businesses",
      "Couples seeking unique date experiences",
      "Corporate teams for team building",
    ],
    benefits: [
      "Master professional chocolate tempering techniques",
      "Create restaurant-quality bonbons and truffles",
      "Understand flavor pairing and recipe development",
      "Learn cost-effective sourcing and pricing strategies",
      "Develop your unique chocolate style and signature",
      "Network with fellow chocolate enthusiasts",
      "Receive ongoing support and recipe updates",
      "Access to wholesale chocolate suppliers",
    ],
    testimonials: [
      {
        id: "adult-1",
        name: "Sarah Mitchell",
        role: "Entrepreneur",
        company: "Sweet Beginnings Chocolates",
        content:
          "Olesea's business mentorship transformed my hobby into a thriving boutique chocolate brand. Her techniques are flawless and her business insights invaluable.",
        rating: 5,
        image: "/img/testimonial-sarah.jpg",
      },
      {
        id: "adult-2",
        name: "David Chen",
        role: "Executive Chef",
        company: "Le Bernardin",
        content:
          "The advanced techniques I learned elevated our dessert program. Olesea's attention to detail and passion for perfection is truly inspiring.",
        rating: 5,
        image: "/img/testimonial-david.jpg",
      },
      {
        id: "adult-3",
        name: "Maria Rodriguez",
        role: "Home Baker",
        content:
          "I came as a complete beginner and left feeling like a professional. The small class size meant personalized attention, and the atmosphere was warm and encouraging.",
        rating: 5,
        image: "/img/testimonial-maria.jpg",
      },
    ],
    ctaText:
      "Ready to master the art of chocolate? Join our next class and discover the chocolatier within you.",
    ctaButtonText: "Book Your Class",
    faqs: [
      {
        id: "adult-faq-1",
        question: "Do I need any prior experience?",
        answer:
          "Not at all! Our classes are designed for all skill levels. We start with fundamentals and progress at a comfortable pace. Many successful students started as complete beginners.",
      },
      {
        id: "adult-faq-2",
        question: "What should I bring to class?",
        answer:
          "Just bring yourself and your enthusiasm! We provide aprons, all tools, premium chocolate, and packaging for your creations. Wear comfortable closed-toe shoes.",
      },
      {
        id: "adult-faq-3",
        question: "Can I really start a business after taking your classes?",
        answer:
          "Absolutely! We've helped launch over 50 chocolate businesses. Our business module covers licensing, sourcing, pricing, marketing, and scaling. Plus, you get ongoing mentorship support.",
      },
      {
        id: "adult-faq-4",
        question: "Are the classes hands-on?",
        answer:
          "100% hands-on! You'll be working with chocolate from minute one. We believe in learning by doing, with expert guidance every step of the way.",
      },
    ],
    accentColor: "#D4A574",
    icon: "Users",
    availability: "Tuesday-Saturday, morning and evening sessions",
    location: "DeliceMy Atelier, 123 Chocolate Avenue, Chisinau",
    requirements: [
      "Minimum age 16 years",
      "Comfortable standing for extended periods",
      "No severe cocoa allergies",
    ],
    includedInPrice: [
      "All materials and ingredients",
      "Professional apron (yours to keep)",
      "Recipe booklet",
      "Your chocolate creations",
      "Coffee, tea, and light refreshments",
      "Certificate of completion",
    ],
  },
  {
    id: "kids-chocolate-classes",
    title: "Kids Chocolate Classes",
    shortDescription:
      "Fun, safe chocolate making for children. They create, play, and take home sweet treats!",
    longDescription:
      "Welcome to a magical world where chocolate dreams come true! Our kids' chocolate classes are specially designed to spark creativity, build confidence, and create unforgettable memories. Under careful supervision, young chocolatiers aged 5-14 explore the sweet science of chocolate making through fun, age-appropriate activities. From chocolate painting to truffle rolling, from creating edible sculptures to designing their own candy bars, every session is an adventure in taste and imagination. We maintain the highest safety standards while ensuring maximum fun!",
    heroImage: "/img/kids-classes.jpg",
    galleryImages: [
      "/img/kids-class-1.jpg",
      "/img/kids-class-2.jpg",
      "/img/kids-class-3.jpg",
      "/img/kids-class-4.jpg",
      "/img/kids-class-5.jpg",
    ],
    features: [
      {
        icon: "Smile",
        title: "Age-Appropriate Fun",
        description:
          "Tailored activities for different age groups (5-7, 8-10, 11-14)",
      },
      {
        icon: "Heart",
        title: "Safety First",
        description: "Child-safe tools, temperatures, and constant supervision",
      },
      {
        icon: "Sparkles",
        title: "Creative Expression",
        description: "Encouraging imagination through chocolate art and design",
      },
      {
        icon: "Trophy",
        title: "Achievement Rewards",
        description:
          "Every child receives a certificate and takes home their creations",
      },
      {
        icon: "Users",
        title: "Social Skills",
        description:
          "Building friendships and teamwork through group activities",
      },
      {
        icon: "Star",
        title: "Educational Value",
        description: "Learning math, science, and culture through chocolate",
      },
    ],
    pricing: {
      type: "package",
      currency: "USD",
      packages: [
        {
          name: "Single Session",
          price: 45,
          features: [
            "2-hour workshop",
            "Create 10 chocolates",
            "Fun certificate",
            "All materials included",
          ],
        },
        {
          name: "Birthday Party Package",
          price: 350,
          features: [
            "Up to 10 children",
            "2.5 hours of fun",
            "Birthday cake included",
            "Party decorations",
            "Special gift for birthday child",
          ],
          highlighted: true,
        },
        {
          name: "Summer Camp Week",
          price: 225,
          features: [
            "5 days (2 hours daily)",
            "Different theme each day",
            "Final day exhibition",
            "Recipe book for parents",
            "Graduation ceremony",
          ],
        },
      ],
      note: "Sibling discounts available",
    },
    duration: "2-2.5 hours per session",
    groupSize: "6-12 children per group",
    targetAudience: [
      "Children aged 5-14",
      "Birthday party celebrants",
      "Summer camp attendees",
      "School field trip groups",
      "Parent-child bonding seekers",
      "Young aspiring chefs",
    ],
    benefits: [
      "Develop fine motor skills and hand-eye coordination",
      "Build confidence through creative achievement",
      "Learn patience and following instructions",
      "Understand basic math and science concepts",
      "Explore different cultures through chocolate",
      "Create lasting memories with friends",
      "Take home delicious handmade treats",
      "Receive a fun certificate of completion",
    ],
    testimonials: [
      {
        id: "kids-1",
        name: "Jennifer Park",
        role: "Parent",
        content:
          "My daughter's birthday party here was magical! The kids were engaged the entire time, and the staff was incredibly patient and fun. Best party ever!",
        rating: 5,
        image: "/img/testimonial-jennifer.jpg",
      },
      {
        id: "kids-2",
        name: "Michael Thompson",
        role: "Teacher",
        company: "Sunshine Elementary",
        content:
          "Our class field trip exceeded expectations. Educational, fun, and perfectly organized. The kids are still talking about it weeks later!",
        rating: 5,
        image: "/img/testimonial-michael.jpg",
      },
      {
        id: "kids-3",
        name: "Lisa Martinez",
        role: "Parent",
        content:
          "My shy son came out of his shell during the summer camp. He made friends, learned new skills, and can't wait to go back!",
        rating: 5,
        image: "/img/testimonial-lisa.jpg",
      },
    ],
    ctaText:
      "Give your child an unforgettable chocolate adventure! Safe, fun, and deliciously educational.",
    ctaButtonText: "Book Kids Class",
    faqs: [
      {
        id: "kids-faq-1",
        question: "Is it safe for children with allergies?",
        answer:
          "We take allergies very seriously. Please inform us of any allergies when booking. We can accommodate most dietary restrictions and have allergy-free options available.",
      },
      {
        id: "kids-faq-2",
        question: "What age groups do you cater to?",
        answer:
          "We welcome chocolatiers aged 5-14, with activities tailored to three age groups: 5-7 (with parent assistance option), 8-10, and 11-14 years old.",
      },
      {
        id: "kids-faq-3",
        question: "Can parents stay and watch?",
        answer:
          "Parents are welcome to stay in our comfortable viewing area with complimentary coffee and Wi-Fi. For ages 5-7, one parent can participate if desired.",
      },
      {
        id: "kids-faq-4",
        question: "What do children take home?",
        answer:
          "Each child takes home their chocolate creations (usually 10-15 pieces), a fun certificate, their personalized apron (birthday parties), and wonderful memories!",
      },
    ],
    accentColor: "#E8B4B8",
    icon: "Sparkles",
    availability: "Wednesday-Sunday, morning and afternoon sessions",
    location: "DeliceMy Atelier, 123 Chocolate Avenue, Chisinau",
    requirements: [
      "Ages 5-14 years",
      "Parental consent form required",
      "Allergy information must be provided",
    ],
    includedInPrice: [
      "All materials and ingredients",
      "Child-safe tools and equipment",
      "Fun apron (rental)",
      "Packaging for creations",
      "Certificate of completion",
      "Juice and healthy snacks",
    ],
  },
  {
    id: "restaurant-cafe-services",
    title: "Restaurant & Café Services",
    shortDescription:
      "Add amazing chocolate desserts to your menu. We help you create treats that bring customers back.",
    longDescription:
      "Elevate your establishment's dessert program with our professional restaurant and café consulting services. We partner with hospitality businesses to create signature chocolate experiences that delight guests and drive revenue. From menu development and staff training to ongoing supply and seasonal specials, we provide comprehensive support tailored to your unique brand and clientele. Our expertise spans fine dining, boutique cafés, hotels, and catering companies. Let us help you stand out in the competitive culinary landscape with chocolate creations that become your signature.",
    heroImage: "/img/restaurant-service.jpg",
    galleryImages: [
      "/img/restaurant-1.jpg",
      "/img/restaurant-2.jpg",
      "/img/restaurant-3.jpg",
      "/img/restaurant-4.jpg",
      "/img/restaurant-5.jpg",
    ],
    features: [
      {
        icon: "ChefHat",
        title: "Custom Menu Development",
        description: "Signature desserts tailored to your brand and cuisine",
      },
      {
        icon: "Users",
        title: "Staff Training",
        description: "Comprehensive training for your kitchen team",
      },
      {
        icon: "TrendingUp",
        title: "Profit Optimization",
        description: "High-margin desserts with controlled costs",
      },
      {
        icon: "Truck",
        title: "Reliable Supply Chain",
        description: "Consistent quality ingredients and custom products",
      },
      {
        icon: "Calendar",
        title: "Seasonal Specials",
        description: "Rotating menu items to keep offerings fresh",
      },
      {
        icon: "Award",
        title: "Quality Guarantee",
        description: "Consistent excellence that enhances your reputation",
      },
    ],
    pricing: {
      type: "custom",
      currency: "USD",
      note: "Pricing varies based on scope and scale. Contact us for a customized proposal.",
    },
    duration: "Initial consultation: 2 hours | Implementation: 2-4 weeks",
    groupSize: "Unlimited staff training included",
    targetAudience: [
      "Fine dining restaurants",
      "Boutique cafés",
      "Hotels and resorts",
      "Catering companies",
      "Bakeries and patisseries",
      "Event venues",
    ],
    benefits: [
      "Differentiate your dessert menu from competitors",
      "Increase average check size with premium offerings",
      "Reduce dessert prep time with efficient systems",
      "Minimize waste with portioned products",
      "Build customer loyalty with signature items",
      "Enhance your establishment's reputation",
      "Access wholesale pricing on premium chocolate",
      "Receive ongoing seasonal menu updates",
    ],
    testimonials: [
      {
        id: "restaurant-1",
        name: "Alessandro Rossi",
        role: "Executive Chef",
        company: "Bella Vista Restaurant",
        content:
          "DeliceMy transformed our dessert program. Sales increased 40% and our chocolate soufflé is now our signature dish. Outstanding partnership!",
        rating: 5,
        image: "/img/testimonial-alessandro.jpg",
      },
      {
        id: "restaurant-2",
        name: "Emma Watson",
        role: "Owner",
        company: "The Garden Café",
        content:
          "The custom bonbons and seasonal specials keep our customers coming back. Olesea's creativity and professionalism are unmatched.",
        rating: 5,
        image: "/img/testimonial-emma.jpg",
      },
      {
        id: "restaurant-3",
        name: "James Laurent",
        role: "F&B Director",
        company: "Grand Hotel Chisinau",
        content:
          "Our afternoon tea service is now booked weeks in advance thanks to DeliceMy's exquisite chocolate creations. A game-changer for our business.",
        rating: 5,
        image: "/img/testimonial-james.jpg",
      },
    ],
    ctaText:
      "Transform your dessert menu into a profit center. Let's create chocolate experiences your guests will never forget.",
    ctaButtonText: "Schedule Consultation",
    faqs: [
      {
        id: "restaurant-faq-1",
        question: "What's the minimum order quantity?",
        answer:
          "We work with businesses of all sizes. Minimum orders start at just 50 pieces per week, with flexible scaling as your needs grow.",
      },
      {
        id: "restaurant-faq-2",
        question: "How quickly can we implement new desserts?",
        answer:
          "After initial consultation and menu approval, we can have your new desserts ready within 2-4 weeks, including staff training.",
      },
      {
        id: "restaurant-faq-3",
        question: "Do you provide ongoing support?",
        answer:
          "Yes! We offer continuous support including seasonal menu updates, troubleshooting, additional training, and new product development.",
      },
      {
        id: "restaurant-faq-4",
        question: "Can you match our existing brand aesthetic?",
        answer:
          "Absolutely! We specialize in creating custom designs that perfectly complement your brand identity and plating style.",
      },
    ],
    accentColor: "#A67B5B",
    icon: "Utensils",
    availability: "Year-round partnership opportunities",
    location: "On-site at your establishment + DeliceMy Atelier",
    requirements: [
      "Commercial kitchen facilities",
      "Proper storage capabilities",
      "Staff availability for training",
    ],
    includedInPrice: [
      "Initial consultation and menu development",
      "Staff training (up to 10 people)",
      "Recipe documentation",
      "Ongoing support and updates",
      "Access to wholesale pricing",
    ],
  },
  {
    id: "chocolate-parties-events",
    title: "Chocolate Parties & Events",
    shortDescription:
      "Book a chocolate tasting party. Perfect for birthdays, team building, or any celebration.",
    longDescription:
      "Transform your special occasion into an unforgettable chocolate experience! Our chocolate parties and events bring the magic of artisan chocolate making directly to your celebration. Whether it's a milestone birthday, corporate team building, bridal shower, or holiday party, we create customized experiences that engage, entertain, and delight your guests. From intimate gatherings to large corporate events, our professional team handles everything, ensuring a smooth, fun, and delicious event that your guests will talk about for years to come.",
    heroImage: "/img/parties-events.jpg",
    galleryImages: [
      "/img/party-1.jpg",
      "/img/party-2.jpg",
      "/img/party-3.jpg",
      "/img/party-4.jpg",
      "/img/party-5.jpg",
    ],
    features: [
      {
        icon: "PartyPopper",
        title: "Fully Customized",
        description: "Tailored to your theme, preferences, and group dynamics",
      },
      {
        icon: "MapPin",
        title: "Mobile Service",
        description: "We come to your venue or host at our beautiful atelier",
      },
      {
        icon: "Users",
        title: "All Group Sizes",
        description:
          "From intimate gatherings of 6 to corporate events of 100+",
      },
      {
        icon: "Clock",
        title: "Flexible Duration",
        description: "Events from 2 hours to full-day experiences",
      },
      {
        icon: "Gift",
        title: "Take-Home Treats",
        description: "Every guest leaves with their handmade creations",
      },
      {
        icon: "Sparkle",
        title: "Interactive Entertainment",
        description: "Engaging activities that break the ice and build bonds",
      },
    ],
    pricing: {
      type: "range",
      currency: "USD",
      minAmount: 45,
      maxAmount: 125,
      unit: "per person",
      note: "Minimum 8 participants. Custom packages available for large groups.",
    },
    duration: "2-4 hours (extended options available)",
    groupSize: "8-100+ participants",
    targetAudience: [
      "Corporate teams seeking unique team building",
      "Birthday party hosts (all ages)",
      "Bridal and baby shower planners",
      "Holiday party organizers",
      "School and university groups",
      "Social clubs and organizations",
    ],
    benefits: [
      "Create lasting memories with a unique experience",
      "Perfect ice-breaker for mixed groups",
      "No cleanup or preparation stress",
      "Professional photos of your event included",
      "Accommodate various dietary restrictions",
      "Build team cohesion through creative collaboration",
      "Flexible format to match your event style",
      "Guaranteed fun for all skill levels",
    ],
    testimonials: [
      {
        id: "party-1",
        name: "Rachel Green",
        role: "HR Director",
        company: "Tech Innovations Inc.",
        content:
          "Best team building event we've ever had! The chocolate making brought out creativity and laughter. Our team is still talking about it months later.",
        rating: 5,
        image: "/img/testimonial-rachel.jpg",
      },
      {
        id: "party-2",
        name: "Mark Sullivan",
        role: "Groom",
        content:
          "We did this for my wife's bridal shower and it was perfect! Fun, elegant, and everyone loved taking home their creations. Highly recommend!",
        rating: 5,
        image: "/img/testimonial-mark.jpg",
      },
      {
        id: "party-3",
        name: "Patricia Kim",
        role: "Event Planner",
        content:
          "I've booked DeliceMy for multiple client events. They're professional, flexible, and always deliver an amazing experience. My go-to for unique parties!",
        rating: 5,
        image: "/img/testimonial-patricia.jpg",
      },
    ],
    ctaText:
      "Make your next event extraordinarily sweet! Book a chocolate party that your guests will never forget.",
    ctaButtonText: "Plan Your Event",
    faqs: [
      {
        id: "party-faq-1",
        question: "Can you accommodate dietary restrictions?",
        answer:
          "Yes! We offer vegan, sugar-free, and allergy-friendly options. Just let us know your needs when booking, and we'll customize accordingly.",
      },
      {
        id: "party-faq-2",
        question: "Do you travel to our location?",
        answer:
          "We provide mobile services within 50km of Chisinau. For longer distances, travel fees may apply. Alternatively, host at our beautiful atelier!",
      },
      {
        id: "party-faq-3",
        question: "What's included in the price?",
        answer:
          "Everything! All materials, ingredients, instruction, packaging for take-home treats, and cleanup. For mobile events, we bring everything needed.",
      },
      {
        id: "party-faq-4",
        question: "How far in advance should we book?",
        answer:
          "We recommend booking 3-4 weeks in advance, especially for weekends and holidays. Last-minute bookings may be possible with a rush fee.",
      },
    ],
    accentColor: "#F4A460",
    icon: "PartyPopper",
    availability: "7 days a week, daytime and evening slots",
    location: "Your venue or DeliceMy Atelier",
    requirements: [
      "Table space for participants",
      "Access to water for handwashing",
      "Electrical outlet (for mobile events)",
    ],
    includedInPrice: [
      "All materials and premium chocolate",
      "Professional instruction and assistance",
      "Themed decorations (if requested)",
      "Packaging for take-home treats",
      "Event photos (digital delivery)",
      "Setup and cleanup",
    ],
  },
  {
    id: "custom-dessert-design",
    title: "Custom Dessert Design",
    shortDescription:
      "We create unique chocolate decorations and molds just for your business.",
    longDescription:
      "Bring your wildest chocolate dreams to life with our custom dessert design service. We specialize in creating one-of-a-kind chocolate sculptures, decorations, and molds that capture your vision perfectly. From corporate logos in chocolate to wedding cake toppers, from architectural chocolate models to artistic installations, our design team combines artistic vision with technical expertise to create edible masterpieces. Using state-of-the-art techniques including 3D modeling and precision molding, we ensure every detail is perfect.",
    heroImage: "/img/custom-desserts.jpg",
    galleryImages: [
      "/img/custom-1.jpg",
      "/img/custom-2.jpg",
      "/img/custom-3.jpg",
      "/img/custom-4.jpg",
      "/img/custom-5.jpg",
    ],
    features: [
      {
        icon: "Palette",
        title: "Unlimited Creativity",
        description: "From concept to creation, no design is too ambitious",
      },
      {
        icon: "Zap",
        title: "Advanced Techniques",
        description: "3D modeling, precision molding, and hand-sculpting",
      },
      {
        icon: "Target",
        title: "Perfect Precision",
        description: "Exact color matching and detailed reproduction",
      },
      {
        icon: "Award",
        title: "Premium Quality",
        description: "Using only the finest Belgian and Swiss chocolates",
      },
      {
        icon: "Clock",
        title: "Timely Delivery",
        description: "Reliable production schedules for your events",
      },
      {
        icon: "CheckCircle",
        title: "Food Safe",
        description: "All materials certified for food contact",
      },
    ],
    pricing: {
      type: "custom",
      currency: "USD",
      note: "Pricing based on design complexity, size, and quantity. Free consultation and quote.",
    },
    duration: "2-6 weeks depending on complexity",
    groupSize: "Minimum order varies by product type",
    targetAudience: [
      "Luxury hotels and resorts",
      "Wedding planners",
      "Corporate event organizers",
      "Marketing agencies",
      "High-end restaurants",
      "Retail chocolatiers",
    ],
    benefits: [
      "Stand out with completely unique chocolate creations",
      "Perfect brand representation in edible form",
      "Impress clients and guests with custom designs",
      "Long-lasting molds for repeated production",
      "Professional design consultation included",
      "Food photography-ready products",
      "Competitive pricing for bulk orders",
      "Exclusive designs protected by agreement",
    ],
    testimonials: [
      {
        id: "custom-1",
        name: "Victoria Sterling",
        role: "Creative Director",
        company: "Sterling Events",
        content:
          "The chocolate replica of our client's yacht was absolutely stunning! Every detail was perfect. It was the highlight of the launch party.",
        rating: 5,
        image: "/img/testimonial-victoria.jpg",
      },
      {
        id: "custom-2",
        name: "Robert Chen",
        role: "Marketing Manager",
        company: "Global Tech Corp",
        content:
          "Our logo chocolates for the product launch were incredible. Professional, delicious, and memorable. Exceeded all expectations!",
        rating: 5,
        image: "/img/testimonial-robert.jpg",
      },
      {
        id: "custom-3",
        name: "Isabella Martinez",
        role: "Wedding Planner",
        content:
          "The custom chocolate flowers for the royal wedding theme were breathtaking. Guests couldn't believe they were edible!",
        rating: 5,
        image: "/img/testimonial-isabella.jpg",
      },
    ],
    ctaText:
      "Let's create something extraordinary together. Your imagination, our chocolate expertise.",
    ctaButtonText: "Start Your Design",
    faqs: [
      {
        id: "custom-faq-1",
        question: "What's the minimum order for custom designs?",
        answer:
          "It varies by product type. Simple molds start at 100 pieces, while one-off sculptures have no minimum. We'll discuss options during consultation.",
      },
      {
        id: "custom-faq-2",
        question: "Can you match specific colors or logos?",
        answer:
          "Yes! We use professional food coloring and advanced techniques to match Pantone colors and recreate logos with precision.",
      },
      {
        id: "custom-faq-3",
        question: "How long do custom pieces last?",
        answer:
          "Properly stored chocolate sculptures can last 6-12 months. We provide detailed storage instructions with every order.",
      },
      {
        id: "custom-faq-4",
        question: "Do you ship internationally?",
        answer:
          "Yes, we ship worldwide with proper temperature-controlled packaging. Shipping costs and timeline vary by destination.",
      },
    ],
    accentColor: "#CD853F",
    icon: "Palette",
    availability: "Year-round, advance booking required",
    location: "DeliceMy Atelier + worldwide shipping",
    requirements: [
      "Design brief or reference materials",
      "2-6 weeks lead time",
      "50% deposit upon order confirmation",
    ],
    includedInPrice: [
      "Initial design consultation",
      "3D mockup or sketch (for complex designs)",
      "Premium chocolate materials",
      "Professional packaging",
      "Storage and handling instructions",
      "One round of revisions",
    ],
  },
  {
    id: "personalized-chocolate-gifts",
    title: "Personalized Chocolate Gifts",
    shortDescription:
      "Create unforgettable moments with our custom chocolate creations. Perfect for corporate gifts, weddings, or special celebrations.",
    longDescription:
      "Express your sentiments in the sweetest way possible with our personalized chocolate gifts. Each piece is crafted with attention to detail and infused with meaning, making every bite a reminder of your thoughtfulness. From elegant corporate gifts that strengthen business relationships to romantic gestures that melt hearts, from celebration favors that guests treasure to sympathy gifts that provide comfort, our personalized chocolates speak when words aren't enough. We offer complete customization including flavors, packaging, messages, and presentation.",
    heroImage: "/img/parties-events.jpg",
    galleryImages: [
      "/img/gift-1.jpg",
      "/img/gift-2.jpg",
      "/img/gift-3.jpg",
      "/img/gift-4.jpg",
      "/img/gift-5.jpg",
    ],
    features: [
      {
        icon: "Gift",
        title: "Complete Personalization",
        description: "Custom messages, packaging, and flavor selection",
      },
      {
        icon: "Heart",
        title: "Handcrafted with Love",
        description: "Every piece made with care and attention to detail",
      },
      {
        icon: "Briefcase",
        title: "Corporate Solutions",
        description:
          "Professional gifts that strengthen business relationships",
      },
      {
        icon: "Calendar",
        title: "Occasion Specific",
        description: "Designed for holidays, milestones, and celebrations",
      },
      {
        icon: "Truck",
        title: "Gift Delivery Service",
        description: "Direct shipping with temperature-controlled packaging",
      },
      {
        icon: "Star",
        title: "Luxury Presentation",
        description: "Elegant boxes, ribbons, and custom cards included",
      },
    ],
    pricing: {
      type: "range",
      currency: "USD",
      minAmount: 25,
      maxAmount: 500,
      unit: "per gift set",
      note: "Volume discounts available for orders over 50 units",
    },
    duration: "1-3 weeks for production",
    groupSize: "1 to 1000+ units",
    targetAudience: [
      "Corporate gift buyers",
      "Wedding couples",
      "Event planners",
      "Individuals seeking unique gifts",
      "Hotels and hospitality businesses",
      "Marketing departments",
    ],
    benefits: [
      "Make lasting impressions with thoughtful gifts",
      "Strengthen business relationships",
      "Stand out from generic gift options",
      "Support local artisan craftsmanship",
      "Accommodate dietary preferences",
      "Enjoy hassle-free gift giving with delivery service",
      "Receive bulk order discounts",
      "Create memorable unboxing experiences",
    ],
    testimonials: [
      {
        id: "gift-1",
        name: "Thomas Anderson",
        role: "CEO",
        company: "Anderson & Associates",
        content:
          "Our clients were blown away by the personalized chocolate gifts. It's elevated our corporate gifting game entirely. Outstanding quality and service!",
        rating: 5,
        image: "/img/testimonial-thomas.jpg",
      },
      {
        id: "gift-2",
        name: "Sophie Laurent",
        role: "Bride",
        content:
          "Our wedding favors were absolutely perfect! Each guest received a personalized box with our initials. So many compliments, and delicious too!",
        rating: 5,
        image: "/img/testimonial-sophie.jpg",
      },
      {
        id: "gift-3",
        name: "Marcus Williams",
        role: "Hotel Manager",
        company: "The Grand Chisinau",
        content:
          "We use DeliceMy's chocolates for VIP welcome gifts. The personalization and quality consistently exceed our five-star standards.",
        rating: 5,
        image: "/img/testimonial-marcus.jpg",
      },
    ],
    ctaText:
      "Give a gift that speaks from the heart. Personalized chocolates that create lasting memories.",
    ctaButtonText: "Create Your Gift",
    faqs: [
      {
        id: "gift-faq-1",
        question: "What's the minimum order for personalized gifts?",
        answer:
          "We accept orders starting from just 1 gift box for special occasions, though bulk orders of 10+ receive discounted pricing.",
      },
      {
        id: "gift-faq-2",
        question: "Can you ship directly to recipients?",
        answer:
          "Absolutely! We offer gift shipping services with beautiful packaging and can include personalized messages. We ship locally and internationally.",
      },
      {
        id: "gift-faq-3",
        question: "How far in advance should I order?",
        answer:
          "For best availability, order 2-3 weeks in advance. Rush orders may be possible for an additional fee, subject to availability.",
      },
      {
        id: "gift-faq-4",
        question: "Can you accommodate dietary restrictions?",
        answer:
          "Yes! We offer sugar-free, vegan, gluten-free, and nut-free options. Each dietary option is clearly labeled for recipient safety.",
      },
    ],
    accentColor: "#E0D9C9",
    icon: "Gift",
    availability: "Year-round, peak seasons may require earlier ordering",
    location: "DeliceMy Atelier + shipping worldwide",
    requirements: [
      "Personalization details",
      "1-3 weeks lead time",
      "Shipping address if applicable",
    ],
    includedInPrice: [
      "Premium chocolate selection",
      "Custom packaging",
      "Personalized message card",
      "Elegant gift wrapping",
      "Basic shipping (local)",
      "Storage instructions",
    ],
    additionalInfo:
      "We also offer gift subscriptions for monthly chocolate deliveries - perfect for the chocolate lover who has everything!",
  },
];

// Export individual service finder utility
export const getServiceById = (id: string): Service | undefined => {
  return servicesContent.find((service) => service.id === id);
};

// Export service categories for filtering
export const serviceCategories = [
  {
    id: "education",
    label: "Classes & Training",
    services: ["chocolate-classes-adults", "kids-chocolate-classes"],
  },
  {
    id: "business",
    label: "Business Services",
    services: ["restaurant-cafe-services", "custom-dessert-design"],
  },
  {
    id: "events",
    label: "Events & Gifts",
    services: ["chocolate-parties-events", "personalized-chocolate-gifts"],
  },
];

// Export for Strapi migration - formatted as Strapi collection type
export const strapiServiceSchema = {
  collectionName: "services",
  info: {
    singularName: "service",
    pluralName: "services",
    displayName: "Service",
    description: "Chocolate services offered by DeliceMy",
  },
  attributes: {
    slug: { type: "uid", targetField: "title", required: true },
    title: { type: "string", required: true },
    shortDescription: { type: "text", required: true, maxLength: 200 },
    longDescription: { type: "richtext", required: true },
    heroImage: { type: "media", required: true, allowedTypes: ["images"] },
    galleryImages: { type: "media", multiple: true, allowedTypes: ["images"] },
    features: {
      type: "component",
      repeatable: true,
      component: "service.feature",
    },
    pricing: { type: "component", component: "service.pricing" },
    duration: { type: "string" },
    groupSize: { type: "string" },
    targetAudience: { type: "json" },
    benefits: { type: "json" },
    testimonials: {
      type: "component",
      repeatable: true,
      component: "service.testimonial",
    },
    ctaText: { type: "text", required: true },
    ctaButtonText: { type: "string", required: true },
    faqs: { type: "component", repeatable: true, component: "service.faq" },
    accentColor: { type: "string", required: true },
    icon: { type: "string", required: true },
    availability: { type: "string" },
    location: { type: "string" },
    requirements: { type: "json" },
    includedInPrice: { type: "json" },
    additionalInfo: { type: "text" },
  },
};

export default servicesContent;
