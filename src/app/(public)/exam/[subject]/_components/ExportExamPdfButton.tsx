'use client';

import { FileText } from 'lucide-react';
import Link from 'next/link';
import { FC, useState } from 'react';

import SupportDSE00Title from '@/app/_components/SupportDSE00Title';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useSubscription, useUser } from '@/hooks';
import { useQuota } from '@/hooks/useQuota';
import { useAppStore } from '@/store';
import { QuestionType } from '@/types/question';
type props = {
  questions?: QuestionType[];
  questionsId?: string[];
};

const ExportExamPdfButton: FC<props> = ({ questions, questionsId }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { userData } = useUser();

  const { isActiveSubscription } = useSubscription();
  const { quotaData, putQuota } = useQuota('exam-pdf');

  const { setLoginDialogOpen } = useAppStore();

  const href = '/pdf/exam-paper/' + btoa((questionsId || questions?.map(q => q._id))?.join('/') as string);

  const toExportPdf = async () => {
    if (!userData) {
      return setLoginDialogOpen(true);
    }

    putQuota('exam-pdf');

    window.open(
      href,
      'exam-pdf', // Window name (optional, can be any string)
      'width=900,height=700,top=100,resizable=yes,scrollbars=yes'
    );
    setIsDialogOpen(false);
  };

  const handleOnClickPdf = () => {
    if (!isActiveSubscription) {
      setIsDialogOpen(true);
    } else {
      toExportPdf();
    }
  };

  return (
    <>
      <Button onClick={handleOnClickPdf}>
        生成試卷 <FileText />
        PDF
      </Button>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              <SupportDSE00Title />
            </DialogTitle>
            <DialogDescription>每日限額已使用 {quotaData?.count}/3，訂閱會員無限制使用</DialogDescription>
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
