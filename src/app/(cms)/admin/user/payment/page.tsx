'use client';
import { BaseTable } from '@/app/(cms)/_components/BaseTable';
import { PaymentColumn, paymentColumn } from '@/app/(cms)/admin/user/payment/_components/column';
import { useCmsPayment } from '@/hooks/cms/useCmsPayment';

const AdminUserPaymentPage = () => {
  const { cmsPaymentData } = useCmsPayment();

  if (!cmsPaymentData) return null;

  return (
    <div>
      {
        <BaseTable
          data={cmsPaymentData as PaymentColumn[]}
          columns={paymentColumn}
          filter={{ key: 'message', name: 'Message' }}
        />
      }
    </div>
  );
};

export default AdminUserPaymentPage;
