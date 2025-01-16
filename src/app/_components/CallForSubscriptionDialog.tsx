import { DialogDescription } from '@radix-ui/react-dialog';
import { Leaf } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useAppStore } from '@/store';

const CallForSubscriptionDialog = () => {
  const { callForSubscriptionDialogOpen, setCallForSubscriptionDialogOpen } = useAppStore();
  const router = useRouter();
  const onClick = (href: string) => {
    setCallForSubscriptionDialogOpen(false);
    router.push(href);
  };

  return (
    <Dialog open={callForSubscriptionDialogOpen} onOpenChange={setCallForSubscriptionDialogOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='flex items-center gap-1'>
            DSE00 <Leaf />
            需要你們的支持
          </DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <span>伺服器資源有限，現時只供</span>
          <span className='typo-round'>DSE00+</span>
          <span>用戶。</span>
        </DialogDescription>
        <DialogFooter>
          <Button onClick={() => onClick('/membership')}>
            訂閱
            <Leaf />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default CallForSubscriptionDialog;
