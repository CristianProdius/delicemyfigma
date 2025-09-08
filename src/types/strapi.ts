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
export interface FooterNavigationSection {
  title?: string;
  links?: Array<{
    text?: string;
    url?: string;
  }>;
}

export interface FooterContactInfo {
  phone?: string;
  email?: string;
  address?: string;
  workingHours?: string;
}

export interface FooterSocialLink {
  platform?: string;
  url?: string;
  icon?: string;
}

export interface FooterNewsletter {
  title?: string;
  description?: string;
  placeholder?: string;
  buttonText?: string;
  successMessage?: string;
  errorMessage?: string;
}

export interface FooterCopyright {
  text?: string;
  developedByText?: string;
  developedByUrl?: string;
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
  newsletter?: FooterNewsletter;
  certifications?: unknown; // JSON field
  copyright?: FooterCopyright;
}

export interface HomepageData {
  heroSection?: {
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
  };
  serviceSection?: unknown;
  aboutSection?: unknown;
  testimonialsSection?: unknown;
  ctaSection?: unknown;
  seo?: unknown;
}