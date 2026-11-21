export interface FounderInfo {
  name: string;
  role: string;
  background: string;
}

export interface AddressInfo {
  addressLine: string;
  floor: string;
  houseNo: string;
  locality: string;
  area: string;
  city: string;
  state: string;
  pincode: string;
  isCorporateOffice: boolean;
  fullAddress: string;
}

export interface ContactInfo {
  phone: string;
  phoneDisplay: string;
  whatsapp: string;
  whatsappDisplay: string;
  email: string;
  website: string;
}

export interface WorkingHoursInfo {
  opens: string;
  closes: string;
  display: string;
  workingDays: string | null;
}

export interface PendingConfirmationInfo {
  alternateAddress: string;
  claim24x7Monitoring: string;
}

export interface CompanyInfo {
  legalName: string;
  brandName: string;
  type: string;
  establishedYear: number;
  founder: FounderInfo;
  description: string;
  psaraLicensed: boolean;
  psaraLicenseNumber: string | null;
  tagline: string | null;
  registeredOffice: AddressInfo;
  contact: ContactInfo;
  workingHours: WorkingHoursInfo;
  socialLinks: Record<string, string> | null;
  googleMapsEmbedUrl: string | null;
  pendingConfirmation: PendingConfirmationInfo;
}
