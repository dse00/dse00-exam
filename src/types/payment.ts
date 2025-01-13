import { BaseDataType } from '.';
import { SubscriptionType } from './subscription';

export type CreatePaymentRecordDto = {
  amount: number;
  user: string;
  message: string;
  type: string;
  referenceId?: string;
  status?: string;
};

export type PaymentType = CreatePaymentRecordDto & BaseDataType;

export type SubscriptionPaymentType = {
  payment: PaymentType;
  subscription: SubscriptionType;
};
