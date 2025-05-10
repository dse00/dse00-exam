'use client';
import { Download } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useSubscription } from '@/hooks';
import { useAppStore } from '@/store';

export default ({ subject }: { subject: string }) => {
  const href = '/export-all-questions/' + subject;
  const { setCallForSubscriptionDialogOpen } = useAppStore();
  const { isActiveSubscription } = useSubscription();

  const toExport = () => {
    if (!isActiveSubscription) {
      return setCallForSubscriptionDialogOpen(true);
    }
    window.open(
      href,
      'exam-pdf', // Window name (optional, can be any string)
      'width=900,height=700,top=100,resizable=yes,scrollbars=yes'
    );
  };

  return (
    <Button onClick={toExport} variant={'link'} className='self-start opacity-60 hover:opacity-100 transition'>
      <Download />
      <span>匯出所有題目成績</span>
    </Button>
  );
};
