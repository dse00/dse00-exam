'use client';
import { BaseTable } from '@/app/(cms)/_components/BaseTable';
import { subscriptionColumn } from '@/app/(cms)/_components/SubscriptionColumn';
import { useCmsSubscription } from '@/hooks/cms/useCmsSubscription';

const AdminUserSubscriptionPage = () => {
  const { cmsSubscriptiontData } = useCmsSubscription();

  if (!cmsSubscriptiontData) return null;

  const formattedData = cmsSubscriptiontData.map(data => ({
    ...data,
    email: data.user,
    plan: data.plan?.name,
    message: data.payment?.message,
  })) as any;

  return (
    <div>
      {
        <BaseTable
          data={formattedData}
          columns={subscriptionColumn}
          filter={{
            key: 'message',
            name: 'Message',
          }}
        />
      }
    </div>
  );
};

export default AdminUserSubscriptionPage;
