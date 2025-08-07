export interface TrendItem {
  logo: string;
  amount: number;
  percentage: number;
}

export interface TrendMonth {
  month: string;
  date: string;
  amount: number;
  categorySpending: TrendItem[];
}

export interface SpendingTrends {
  totalAmount: number;
  monthlySpending: TrendMonth[];
}
