import { BaseDataType } from '.';

export type PlanType = {
  name: string;
  price: number;
  originalPrice: number;
  description: React.ReactNode;
  key: string;
} & BaseDataType;
