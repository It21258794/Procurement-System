export interface IBudget {
  site_id: string;
  amount: number;
  location: string;
  description: string;
}

export enum BudgetStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  REJECTED = 'rejected',
}
