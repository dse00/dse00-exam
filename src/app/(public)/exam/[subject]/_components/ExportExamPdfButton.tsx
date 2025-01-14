'use client';

import Cookies from 'js-cookie';
import Link from 'next/link';
import { FC, useState } from 'react';

import { Button, buttonVariants } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useSubscription, useUser } from '@/hooks';
import { useQuota } from '@/hooks/useQuota';
import services from '@/services';
import { useAppStore } from '@/store';
type props = {
  href: string;
};

const ExportExamPdfButton: FC<props> = ({ href }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { userData } = useUser();

  const { isActiveSubscription } = useSubscription();
  const { quotaData } = useQuota('exam-pdf');
  const token = Cookies.get('token') as string;

  const { setLoginDialogOpen } = useAppStore();

  const toExportPdf = async () => {
    if (!userData) {
      return setLoginDialogOpen(true);
    }

    const res = await services.putQuota({
      topic: 'exam-pdf',
      token,
    });

    window.open(
      href,
      'exam-pdf', // Window name (optional, can be any string)
      'width=900,height=700,top=100,resizable=yes,scrollbars=yes'
    );
    setIsDialogOpen(false);
  };

  return (
    <>
      <Dialog open={isDialogOpen} onOpenChange={state => setIsDialogOpen(state)}>
        <DialogTrigger asChild>
          <Button>PDF</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>每日限額已使用 {quotaData?.count}/3</DialogTitle>
            <DialogDescription>DSE00 需要你們的支持，訂閱會員無限制使用</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              onClick={toExportPdf}
              variant={'secondary'}
              disabled={(quotaData?.count as number) >= 3 && !isActiveSubscription}
            >
              繼續
            </Button>
            <Link href={'/membership'} target='_blank' className={buttonVariants()}>
              訂閱
            </Link>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ExportExamPdfButton;
