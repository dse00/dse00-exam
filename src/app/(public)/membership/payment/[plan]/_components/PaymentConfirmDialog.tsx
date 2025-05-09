'use client';
import { Leaf, Wallet } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { FC, useState } from 'react';

import { Button, buttonVariants } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useMyToast, useUser } from '@/hooks';
import services from '@/services';
import { useAppStore } from '@/store';
import { SubscriptionPaymentType } from '@/types/payment';
import { PlanType } from '@/types/plan';

type props = {
  currentPlan: PlanType;
};
const PaymentConfirmDialog: FC<props> = ({ currentPlan }) => {
  const [open, setOpen] = useState(false);
  const [answer, setAnswer] = useState({
    screenshot: false,
    email: '',
  });
  const router = useRouter();
  const { userData } = useUser();
  const { errorToast } = useMyToast();

  const { setLoading } = useAppStore();

  const toConfirmPayment = async () => {
    if (!userData?.user) {
      return errorToast('請先登入');
    }
    if (!answer.email.includes('@')) {
      return errorToast('請填寫有效 Email');
    }

    setLoading(true);
    setOpen(false);
    const subscriptionPayment = await services.createPaymentRecord<SubscriptionPaymentType>({
      message: currentPlan.name + ' ' + answer.email,
      user: userData.user,
      amount: currentPlan.price,
      type: 'subscription',
      referenceId: currentPlan.key,
    });
    router.push('/membership/payment/success/' + subscriptionPayment.subscription._id);
    setLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className={buttonVariants()}>
        確認付款 <Leaf />
      </DialogTrigger>
      <DialogContent className='grid gap-4'>
        <DialogHeader>
          <DialogTitle>
            <p className='flex items-center gap-4'>
              <Wallet />
              <span>確認付款</span>
            </p>
          </DialogTitle>
        </DialogHeader>
        <DialogDescription> </DialogDescription>
        <div className='grid gap-4'>
          <div className='grid grid-cols-2 items-center gap-2'>
            <span> 1. 你已截圖了嗎？</span>
            <Checkbox
              checked={answer.screenshot}
              onCheckedChange={checked => setAnswer({ ...answer, screenshot: !!checked })}
            />
          </div>

          <div className='grid grid-cols-2 items-center gap-2'>
            <span>2. 輸入在PayMe 輸入的 Email </span>
            <Input
              placeholder='你 PayMe 輸入的 Email'
              value={answer.email}
              onChange={e => setAnswer({ ...answer, email: e.target.value })}
            />
          </div>
        </div>

        <DialogFooter>
          <Button disabled={!answer.screenshot || !answer.email} onClick={toConfirmPayment}>
            <span>確認</span>
            <Leaf />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentConfirmDialog;
