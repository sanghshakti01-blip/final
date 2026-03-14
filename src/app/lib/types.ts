export type RegistrationCategory = 'Student' | 'Professional' | 'Elder' | 'Family';

export const PRICING: Record<RegistrationCategory, number> = {
  Student: 200,
  Professional: 500,
  Elder: 300,
  Family: 1200,
};

export interface Registrant {
  id: string;
  name: string;
  email: string;
  phone: string;
  category: RegistrationCategory;
  amount: number;
  status: 'Pending' | 'Under Process' | 'Paid';
  registrationDate: string;
  sanskritMantra?: string;
  personalizedGreeting?: string;
}
