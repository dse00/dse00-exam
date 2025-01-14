import { BaseDataType } from '.';
import { PaymentType } from './payment';
import { PlanType } from './plan';

export type SubscriptionType = {
  message: string;
  user: string;
  plan: PlanType;
  endDate: Date;
  payment: PaymentType;
} & BaseDataType;
