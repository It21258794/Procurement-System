export interface IBudget {
  site_id: string;
  curr_budget: number;
  amount: number;
  location: string;
  description: string;
}

export enum BudgetStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  REJECTED = 'rejected',
}
