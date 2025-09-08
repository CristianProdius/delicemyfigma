// Strapi API Response Types

export interface StrapiImage {
  url?: string;
  alternativeText?: string;
  width?: number;
  height?: number;
}

export interface HeaderData {
  logo?: StrapiImage;
  companyName?: string;
  companyTagline?: string;
  navigation?: Array<{
    label: string;
    href: string;
    icon?: string;
    subItems?: Array<{
      label: string;
      href: string;
      icon?: string;
      description?: string;
    }>;
  }>;
  ctaText?: string;
  ctaUrl?: string;
  primaryCtaText?: string;
  primaryCtaUrl?: string;
  topBarEnabled?: boolean;
  topBarText?: string;
  topBarHighlight?: string;
  topBarCtaText?: string;
  topBarCtaUrl?: string;
  contactPhone?: string;
  contactEmail?: string;
  contactAddress?: string;
  workingHours?: string;
  businessSchedule?: string;
  businessScheduleNote?: string;
  socialLinks?: Array<{
    platform: string;
    url: string;
    icon?: string;
  }>;
}

export interface FooterData {
  companyName?: string;
  logo?: StrapiImage;
  description?: string;
  sections?: Array<{
    title: string;
    links?: Array<{
      label: string;
      url: string;
    }>;
  }>;
  social?: Array<{
    name: string;
    url: string;
    icon?: string;
  }>;
  newsletterTitle?: string;
  newsletterPlaceholder?: string;
  newsletterButtonText?: string;
  newsletterSuccessMessage?: string;
  certifications?: string;
  copyrightText?: string;
  developedByText?: string;
  developedByUrl?: string;
  contactPhone?: string;
  contactEmail?: string;
  contactAddress?: string;
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