'use client';
import { BaseTable } from '@/app/(cms)/_components/BaseTable';
import { PaymentColumn, paymentColumn } from '@/app/(cms)/_components/PaymentColumn';
import { useCmsPayment } from '@/hooks/cms/useCmsPayment';

const AdminUserPaymentPage = () => {
  const { cmsPaymentData } = useCmsPayment();

  if (!cmsPaymentData) return null;

  return <div>{<BaseTable data={cmsPaymentData as PaymentColumn[]} columns={paymentColumn} filter={'message'} />}</div>;
};

export default AdminUserPaymentPage;
