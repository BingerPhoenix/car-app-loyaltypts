// Common Types
export type ID = string | number;

export interface User {
  id: ID;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  profile: UserProfile;
  preferences: UserPreferences;
  membershipTier: MembershipTier;
  pointsBalance: number;
  createdAt: string;
  updatedAt: string;
}

export type UserRole = 'user' | 'admin' | 'serviceProvider';

export interface UserProfile {
  avatar?: string;
  phone?: string;
  address?: Address;
  notifications: NotificationPreferences;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  language: string;
  emailNotifications: boolean;
  pushNotifications: boolean;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface NotificationPreferences {
  email: boolean;
  push: boolean;
  sms: boolean;
  categories: {
    serviceReminders: boolean;
    promotions: boolean;
    accountUpdates: boolean;
    loyaltyRewards: boolean;
  };
}

// Service Provider Types
export interface ServiceProvider {
  id: ID;
  name: string;
  type: ProviderType;
  description: string;
  location: Address;
  contact: ContactInfo;
  services: Service[];
  certifications: Certification[];
  ratings: Rating[];
  availability: Availability;
  metrics: ProviderMetrics;
}

export type ProviderType = 'dealership' | 'independent' | 'specialist';

export interface Service {
  id: ID;
  name: string;
  description: string;
  category: ServiceCategory;
  price: PriceRange;
  duration: number; // in minutes
  availability: Availability;
}

export type ServiceCategory = 
  | 'maintenance'
  | 'repair'
  | 'inspection'
  | 'modification'
  | 'detailing';

export interface PriceRange {
  min: number;
  max: number;
  currency: string;
}

export interface Certification {
  id: ID;
  name: string;
  issuer: string;
  issuedDate: string;
  expiryDate: string;
  status: 'active' | 'expired' | 'pending';
}

export interface Rating {
  id: ID;
  userId: ID;
  score: number;
  review: string;
  date: string;
  serviceId: ID;
  response?: {
    content: string;
    date: string;
  };
}

export interface Availability {
  schedule: DaySchedule[];
  exceptions: DateRange[];
  nextAvailable: string;
}

export interface DaySchedule {
  day: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
  open: string;
  close: string;
  isOpen: boolean;
}

export interface DateRange {
  start: string;
  end: string;
  reason?: string;
}

export interface ProviderMetrics {
  totalServices: number;
  averageRating: number;
  responseTime: number;
  completionRate: number;
}

// Form Types
export interface FormField<T = any> {
  name: string;
  type: FormFieldType;
  label: string;
  value: T;
  required?: boolean;
  disabled?: boolean;
  validation?: ValidationRule[];
  options?: SelectOption[];
  placeholder?: string;
  helperText?: string;
  error?: string;
}

export type FormFieldType = 
  | 'text'
  | 'email'
  | 'password'
  | 'select'
  | 'checkbox'
  | 'radio'
  | 'textarea'
  | 'file';

export interface SelectOption {
  label: string;
  value: string | number;
  disabled?: boolean;
}

export interface ValidationRule {
  type: 'required' | 'email' | 'minLength' | 'maxLength' | 'pattern' | 'custom';
  value?: any;
  message: string;
  validator?: (value: any) => boolean | Promise<boolean>;
}

// API Response Types
export interface ApiResponse<T = any> {
  data: T;
  meta?: {
    page?: number;
    perPage?: number;
    total?: number;
    totalPages?: number;
  };
  message?: string;
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, any>;
}

// Loyalty Program Types
export type MembershipTier = 'bronze' | 'silver' | 'gold' | 'platinum';

export interface LoyaltyTransaction {
  id: ID;
  userId: ID;
  type: TransactionType;
  points: number;
  description: string;
  reference?: string;
  date: string;
}

export type TransactionType = 
  | 'service'
  | 'referral'
  | 'signup'
  | 'review'
  | 'redemption';

export interface Reward {
  id: ID;
  name: string;
  description: string;
  points: number;
  category: RewardCategory;
  validUntil?: string;
  terms?: string;
  availability: 'available' | 'limited' | 'soldout';
}

export type RewardCategory = 
  | 'service'
  | 'product'
  | 'experience'
  | 'discount';