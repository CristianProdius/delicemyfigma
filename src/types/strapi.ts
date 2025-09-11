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

// Services Page interfaces
export interface ServiceFeature {
  id?: number;
  icon: string;
  title: string;
  description: string;
}

export interface ServicePricingPackage {
  id?: number;
  name: string;
  price: number;
  features?: any; // JSON field in Strapi - can be string or array
  highlighted?: boolean;
}

export interface ServicePricing {
  type: 'fixed' | 'range' | 'custom' | 'package';
  currency: string;
  amount?: number;
  minAmount?: number;
  maxAmount?: number;
  unit?: string;
  packages?: ServicePricingPackage[]; // Array of pricing-package components
  note?: string;
  variousPackagesText?: string;
  customPricingText?: string;
}

export interface ServiceTestimonial {
  id?: number;
  name: string; // Note: Strapi uses 'name' not 'author'
  role?: string;
  company?: string;
  content: string;
  rating: number;
  image?: StrapiImage;
}

export interface ServiceFAQ {
  id?: number;
  question: string;
  answer: string;
  category: 'booking' | 'orders' | 'visiting' | 'general'; // Strapi has category enum
}

export interface ServiceLocation {
  address: string;
  city: string;
  postalCode: string;
  country: string;
  latitude: number;
  longitude: number;
  landmark?: string;
  parking?: string;
}

// Hero Section Types
export interface ServiceStatCard {
  id?: number;
  icon: string;
  label: string;
  value: string;
  description?: string;
}

export interface ServiceHeroSection {
  id?: number;
  breadcrumbHome?: string;
  breadcrumbServices?: string;
  title?: string;
  subtitle?: string;
  primaryButtonText?: string;
  primaryButtonUrl?: string;
  secondaryButtonText?: string;
  secondaryButtonUrl?: string;
  backgroundImage?: StrapiImage;
  stats?: ServiceStatCard[];
}

// Service Details Types
export interface ServiceIncludeItem {
  id?: number;
  text: string;
  icon?: 'check' | 'gift' | 'star' | 'heart';
}

export interface ServiceIncludeSection {
  id?: number;
  title?: string;
  items?: ServiceIncludeItem[];
}

export interface ServiceMainContent {
  id?: number;
  aboutSectionTitle?: string;
  longDescription?: any; // blocks type
  includeSection?: ServiceIncludeSection;
}

export interface ServicePackage {
  id?: number;
  name: string;
  price: number;
  highlighted?: boolean;
}

export interface ServicePricingSection {
  id?: number;
  title?: string;
  pricingType?: 'fixed' | 'range' | 'package' | 'custom';
  currency?: string;
  fixedPrice?: number;
  minPrice?: number;
  maxPrice?: number;
  unit?: string;
  packages?: ServicePackage[];
  note?: string;
  contactForPricingText?: string;
}

export interface ServiceQuickInfo {
  id?: number;
  durationLabel?: string;
  duration?: string;
  groupSizeLabel?: string;
  groupSize?: string;
  includedLabel?: string;
  includedItems?: any; // JSON field
  seeDetailsText?: string;
}

export interface ServiceCtaSection {
  id?: number;
  buttonText?: string;
  buttonUrl?: string;
  additionalInfo?: string;
}

export interface ServiceBookingCard {
  id?: number;
  pricingSection?: ServicePricingSection;
  quickInfo?: ServiceQuickInfo;
  ctaSection?: ServiceCtaSection;
}

export interface ServiceDetails {
  id?: number;
  mainContent?: ServiceMainContent;
  bookingCard?: ServiceBookingCard;
}

// Service Features Types
export interface ServiceSectionHeader {
  id?: number;
  subtitle?: string;
  title: string;
}

export interface ServiceFeaturesGrid {
  id?: number;
  icon: 'Check' | 'Award' | 'GraduationCap' | 'Users2' | 'Package' | 'Gift';
  title: string;
  description: string;
}

export interface ServiceBenefitsSection {
  id?: number;
  title?: string;
  benefits?: any; // JSON array
}

export interface ServiceRequirementsSection {
  id?: number;
  title?: string;
  requirements?: any; // JSON array
}

export interface ServiceWhatsIncludedSection {
  id?: number;
  title?: string;
  items?: any; // JSON array
}

export interface ServiceFeaturesSection {
  id?: number;
  sectionHeader?: ServiceSectionHeader;
  featuresGrid?: ServiceFeaturesGrid[];
  benefitsSection?: ServiceBenefitsSection;
  requirementsSection?: ServiceRequirementsSection;
  whatsIncludedSection?: ServiceWhatsIncludedSection;
}

// Service Gallery Types
export interface ServiceGalleryHeader {
  id?: number;
  title: string;
  subtitle?: string;
}

export interface ServiceGallerySettings {
  id?: number;
  showThumbnails?: boolean;
  showCounter?: boolean;
  autoplay?: boolean;
  autoplayInterval?: number;
}

export interface ServiceGallerySection {
  id?: number;
  galleryHeader?: ServiceGalleryHeader;
  galleryImages?: StrapiImage[];
  gallerySettings?: ServiceGallerySettings;
}

// Service Testimonials Types
export interface ServiceTestimonialsSection {
  id?: number;
  testimonialHeader?: ServiceSectionHeader;
  testimonials?: Testimonial[];
}

// Service FAQs Types
export interface ServiceFAQSettings {
  id?: number;
  defaultOpenFirst?: boolean;
  allowMultipleOpen?: boolean;
  showCategories?: boolean;
}

export interface ServiceFAQ {
  id?: number;
  question: string;
  answer: any; // Rich text
  category: 'booking' | 'orders' | 'visiting' | 'general';
}

export interface ServiceFAQsSection {
  id?: number;
  faqHeader?: ServiceSectionHeader;
  faqs?: ServiceFAQ[];
  faqSettings?: ServiceFAQSettings;
}

// Service CTA Types
export interface ServiceCTAMainContent {
  id?: number;
  badgeText?: string;
  description?: any; // blocks type
  stats?: any; // JSON array
  highlights?: any; // JSON array
}

export interface ServiceCTAButtons {
  id?: number;
  primaryButtonText?: string;
  primaryButtonUrl?: string;
  secondaryButtonText?: string;
  secondaryButtonUrl?: string;
}

export interface ServiceCTAContactInfo {
  id?: number;
  email?: string;
  phone?: string;
  address?: string;
}

export interface ServiceCTAMascot {
  id?: number;
  mascotImage?: StrapiImage;
  mascotQuote?: string;
  showDecorative?: boolean;
}

export interface ServiceCTASection {
  id?: number;
  ctaHeader?: ServiceSectionHeader;
  mainContent?: ServiceCTAMainContent;
  ctaButtons?: ServiceCTAButtons;
  contactInfo?: ServiceCTAContactInfo;
  mascot?: ServiceCTAMascot;
}

export interface Service {
  id: number;
  slug: string;
  heroSection?: ServiceHeroSection; // New component-based field
  serviceDetails?: ServiceDetails; // New service details component
  ServiceFeatures?: ServiceFeaturesSection; // Service features component (capital S to match Strapi)
  serviceGallery?: ServiceGallerySection; // Service gallery component
  testimonialsSection?: ServiceTestimonialsSection; // Service testimonials component
  serviceFaqs?: ServiceFAQsSection; // Service FAQs component (lowercase 'a' to match Strapi)
  serviceCta?: ServiceCTASection; // Service CTA component
  
  // Legacy fields (to be removed once fully migrated)
  title?: string;
  shortDescription?: string;
  longDescription?: string;
  heroImage?: StrapiImage;
  galleryImages?: StrapiImage[];
  features?: ServiceFeature[];
  pricing?: ServicePricing;
  duration?: string;
  groupSize?: string;
  targetAudience?: any;
  benefits?: any;
  testimonials?: ServiceTestimonial[];
  ctaText?: string;
  ctaButtonText?: string;
  faqs?: ServiceFAQ[];
  accentColor?: string;
  icon?: string;
  availability?: string;
  location?: ServiceLocation;
  requirements?: any;
  includedInPrice?: any;
  additionalInfo?: string;
  buttonText?: string;
  pricePrefix?: string;
  featured?: boolean;
  sortOrder?: number;
  seo?: any;
  
  // Section titles and labels
  breadcrumbHome?: string;
  breadcrumbServices?: string;
  aboutSectionTitle?: string;
  includedSectionTitle?: string;
  pricingSectionTitle?: string;
  gallerySectionTitle?: string;
  gallerySubtitle?: string;
  testimonialsSectionTitle?: string;
  testimonialsSubtitle?: string;
  faqSectionTitle?: string;
  faqSubtitle?: string;
  relatedSectionTitle?: string;
  relatedSubtitle?: string;
  
  // Labels
  durationLabel?: string;
  groupSizeLabel?: string;
  locationLabel?: string;
  investmentLabel?: string;
  availabilityLabel?: string;
  requirementsLabel?: string;
  
  // Button texts
  bookNowText?: string;
  learnMoreText?: string;
  bookExperienceText?: string;
  getQuoteText?: string;
  askQuestionsText?: string;
  viewAllServicesText?: string;
  
  // Other texts
  customPricingText?: string;
  contactForPricingText?: string;
  seeDetailsText?: string;
  limitedAvailabilityText?: string;
  expertLevelText?: string;
  freeConsultationText?: string;
  flexiblePaymentText?: string;
  satisfactionText?: string;
  
  // CTA Section
  ctaDescription?: string;
  ctaStats?: any; // JSON field
  ctaContactInfo?: any; // JSON field
  mascotImage?: StrapiImage;
  mascotQuote?: string;
}

// Services Page Components
export interface ServicesBreadcrumbs {
  homeText?: string;
  servicesText?: string;
  showHomeIcon?: boolean;
}

export interface ServicesHeroSection {
  breadcrumbs?: ServicesBreadcrumbs;
  decorativeSubtitle?: string;
  pageTitle: string;
  pageDescription?: any; // Blocks type
  heroImage?: StrapiImage;
  showDecorativeLine?: boolean;
}

export interface ServicesGridSettings {
  gridColumns?: 'single' | 'two' | 'three';
  animationDelay?: number;
  showPriceBadge?: boolean;
  showMetaInfo?: boolean;
}

export interface ServiceCardDefaults {
  defaultButtonText?: string;
  pricePrefix?: string;
  durationIcon?: boolean;
  groupSizeIcon?: boolean;
}

export interface ServicesGridSection {
  gridSettings?: ServicesGridSettings;
  noServicesText?: string;
  serviceCardDefaults?: ServiceCardDefaults;
}

export interface ServicesCtaSection {
  ctaTitle?: string;
  ctaDescription?: any; // Blocks type
  ctaButtonText?: string;
  ctaButtonUrl?: string;
  showDecorativeElement?: boolean;
}

export interface ServicesPageData {
  id: number;
  servicesHeroSection?: ServicesHeroSection;
  servicesGridSection?: ServicesGridSection;
  servicesCtaSection?: ServicesCtaSection;
  seo?: any;
}