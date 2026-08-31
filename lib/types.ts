export type DealType = 'sale' | 'rent';

export type PropertyType = 'apartment' | 'villa' | 'office' | 'store' | 'land';

export type DealStage = 'appraisal' | 'showing' | 'meeting' | 'closed';

export interface Property {
  id: string;
  code: string;
  title: string;
  dealType: DealType;
  propertyType: PropertyType;
  neighborhood: string;
  district: number; // e.g. 1, 2, 3, 5
  address: string;
  area: number; // in square meters (متر مربع)
  bedrooms: number;
  floor: number;
  totalFloors: number;
  // Sale specific
  totalPrice?: number; // in Tomans (تومان)
  pricePerMeter?: number;
  // Rent specific
  depositPrice?: number; // ودیعه (تومان)
  monthlyRent?: number; // اجاره ماهانه (تومان)
  // Features
  hasParking: boolean;
  hasElevator: boolean;
  hasStorage: boolean;
  hasBalcony: boolean;
  yearBuilt: number; // e.g. 1400
  // Contact & Management
  ownerName: string;
  ownerPhone: string;
  ownerPhoneMasked: string;
  assignedAgentId: string;
  status: 'active' | 'reserved' | 'sold' | 'rented';
  createdAt: string;
  image: string;
  description: string;
  tags: string[];
}

export interface Demand {
  id: string;
  clientName: string;
  clientPhone: string;
  dealType: DealType;
  propertyType: PropertyType;
  targetNeighborhoods: string[];
  minArea: number;
  maxArea?: number;
  minBedrooms: number;
  // Sale budget
  budgetMin?: number;
  budgetMax?: number;
  // Rent budget
  maxDeposit?: number;
  maxMonthlyRent?: number;
  urgency: 'immediate' | 'high' | 'normal';
  notes: string;
  assignedAgentId: string;
  status: 'active' | 'matched' | 'closed';
  createdAt: string;
}

export interface SmartMatch {
  id: string;
  propertyId: string;
  demandId: string;
  property: Property;
  demand: Demand;
  score: number; // 0 - 100
  reasons: string[];
  mismatches?: string[];
  createdAt: string;
}

export interface Deal {
  id: string;
  code: string;
  title: string;
  propertyId: string;
  propertyTitle: string;
  demandId?: string;
  clientName: string;
  ownerName: string;
  dealType: DealType;
  dealAmount: number; // Total volume in Tomans
  grossCommission: number; // Gross commission in Tomans
  stage: DealStage;
  agentId: string;
  agentName: string;
  neighborhood: string;
  createdAt: string;
  updatedAt: string;
  splitBreakdown?: {
    agentShare: number;
    managerShare: number;
    agencyShare: number;
    deduction: number;
  };
}

export interface Agent {
  id: string;
  name: string;
  roleTitle: string; // e.g. "مشاور ارشد رنج فروش", "سرپرست رنج ۱", "مشاور رهن و اجاره"
  avatar: string;
  phone: string;
  email: string;
  dealsCount: number;
  monthlyCommission: number; // in Tomans
  rating: number; // e.g. 4.9
  activeFilesCount: number;
  activeDemandsCount: number;
  isOnline: boolean;
}

export interface CommissionRule {
  id: string;
  name: string;
  agentPercent: number; // e.g. 40
  managerPercent: number; // e.g. 10
  agencyPercent: number; // e.g. 50
  applyMarketingDeduction: boolean; // 5%
  applyTaxDeduction: boolean; // 9%
  marketingDeductionPercent: number;
  taxDeductionPercent: number;
  sampleDealCommission: number; // default 100_000_000 Tomans
}

export interface DailyTask {
  id: string;
  title: string;
  clientName: string;
  time: string; // e.g. "۱۱:۳۰"
  type: 'showing' | 'call' | 'meeting' | 'file_check';
  propertyTitle?: string;
  completed: boolean;
  urgency: 'high' | 'medium' | 'normal';
}

export interface Tenant {
  id: string;
  name: string;
  subTitle: string;
  logoText: string;
  primaryColor: string; // Hex color for white-label accent
  primaryHover: string;
  accentColor: string;
  managerName: string;
  managerRole: string;
  city: string;
  address: string;
  phone: string;
  licenseNumber: string;
}
