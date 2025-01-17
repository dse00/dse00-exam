import { Leaf } from 'lucide-react';
import { useEffect, useState } from 'react';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useMessage } from '@/hooks/useMessage';
import { MessageType } from '@/types/message';

const MessageDialog = () => {
  const { messageData, acknowledgeMessage } = useMessage();
  const [isOpen, setIsOpen] = useState(false);

  const toAcknowledgeMessage = (messages: MessageType[]) => {
    for (const message of messages) {
      acknowledgeMessage(message._id);
    }
    setIsOpen(false);
  };

  const unacknowledgedMessages = messageData?.filter(message => !message.acknowledged).length || 0;

  useEffect(() => {
    if (unacknowledgedMessages > 0) {
      setIsOpen(true);
    }
  }, [unacknowledgedMessages]);

  if (!messageData) return null;

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        {messageData.map(message => (
          <AlertDialogHeader key={message._id}>
            <AlertDialogTitle>{message.title}</AlertDialogTitle>
            <AlertDialogDescription>{message.message}</AlertDialogDescription>
          </AlertDialogHeader>
        ))}
        <AlertDialogFooter>
          <AlertDialogAction onClick={() => toAcknowledgeMessage(messageData)}>
            確定
            <Leaf />
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default MessageDialog;
