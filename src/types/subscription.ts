import { BaseDataType } from '.';
import { PlanType } from './plan';

export type SubscriptionType = {
  message: string;
  user: string;
  plan: PlanType;
  endDate: Date;
} & BaseDataType;
