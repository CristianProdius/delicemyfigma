// Strapi API Response Types

export interface StrapiImage {
  url?: string;
  alternativeText?: string;
  width?: number;
  height?: number;
}

export interface HeaderData {
  companyName?: string;
  companyTagline?: string;
  logo?: StrapiImage;
  contactPhone?: string;
  contactEmail?: string;
  contactAddress?: string;
  businessSchedule?: string;
  businessScheduleNote?: string;
  primaryCtaText?: string;
  primaryCtaUrl?: string;
  secondaryCtaText?: string;
  defaultLanguage?: string;
  navigationData?: unknown; // JSON field
  languageData?: unknown; // JSON field
}

// Footer component interfaces
export interface FooterNavigationLink {
  label: string;
  href: string;
}

export interface FooterNavigationSection {
  title: string;
  links?: FooterNavigationLink[];
}

export interface FooterContactInfo {
  email: string;
  phone: string;
  address: string;
  hours?: string;
  title?: string;
}

export interface FooterSocialLink {
  label: string;
  href: string;
  iconName: string;
}

export interface FooterNewsletter {
  title: string;
  description?: string;
  placeholder?: string;
  buttonText?: string;
  successMessage?: string;
}

export interface FooterCopyright {
  companyName: string;
  rightsText?: string;
  madeWithText?: string;
  locationText?: string;
}

export interface FooterData {
  logo?: StrapiImage;
  tagline?: string;
  description?: string;
  servicesSection?: FooterNavigationSection;
  learnSection?: FooterNavigationSection;
  exploreSection?: FooterNavigationSection;
  connectSection?: FooterNavigationSection;
  contactInfo?: FooterContactInfo;
  socialLinks?: FooterSocialLink[];
  socialTitle?: string;
  newsletter?: FooterNewsletter;
  certifications?: unknown; // JSON field
  copyright?: FooterCopyright;
}

// Homepage component interfaces
export interface HeroSection {
  heroTitle?: string;
  heroSubtitle?: string;
  heroDescription?: string;
  heroCtaText?: string;
  heroCtaUrl?: string;
  heroImage?: StrapiImage;
  quote?: string;
  quoteAuthor?: string;
  statsNumber?: string;
  statsLabel?: string;
}

export interface FeaturedService {
  title: string;
  description: string;
  image?: StrapiImage;
  buttonText?: string;
  href: string;
  gridClass: string;
  iconName: string;
  accentColor: string;
}

export interface ServiceSection {
  sectionTitle?: string;
  featuredServices?: FeaturedService[];
}

export interface AboutStat {
  number: string;
  label: string;
}

export interface AboutKeyPoint {
  icon: string;
  title: string;
  description: string;
}

export interface AboutSection {
  sectionLabel?: string;
  sectionTitle?: string;
  ownerName: string;
  ownerTitle: string;
  ownerSubtitle?: string;
  ownerHighlight?: string;
  ownerQuote: string;
  ownerImage?: StrapiImage;
  stats?: AboutStat[];
  keyPoints?: AboutKeyPoint[];
  ctaText?: string;
  ctaUrl?: string;
}

export interface Testimonial {
  name: string;
  role?: string;
  company?: string;
  content: string;
  rating: number;
  image?: StrapiImage;
}

export interface TestimonialsSection {
  sectionTitle?: string;
  testimonials?: Testimonial[];
}

export interface CTASection {
  ctaTitle: string;
  ctaDescription: string;
  ctaButtonText: string;
  preheading?: string;
  primaryButtonSubtext?: string;
  secondaryButtonText?: string;
  secondaryButtonSubtext?: string;
  contactEmail?: string;
  contactPhone?: string;
  contactAddress?: string;
  mascotImage?: StrapiImage;
  mascotAlt?: string;
  mascotQuote?: string;
}

export interface HomepageData {
  heroSection?: HeroSection;
  serviceSection?: ServiceSection;
  aboutSection?: AboutSection;
  testimonialsSection?: TestimonialsSection;
  ctaSection?: CTASection;
  seo?: unknown;
}