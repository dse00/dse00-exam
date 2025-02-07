'use client';

import { Avatar, AvatarImage } from '@radix-ui/react-avatar';
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover';
import { Send } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useSubscription, useUser } from '@/hooks';
import { useMediaQuery } from '@/hooks/use-media-query';
import { useAIConversation } from '@/hooks/useAIConversation';
import { cn } from '@/lib/utils';
import services from '@/services';
import { useAppStore } from '@/store';
import { AIConversationType } from '@/types/ai-conversation';

import { Card, CardContent, CardFooter, CardHeader } from './ui/card';
import { Drawer, DrawerContent, DrawerTitle, DrawerTrigger } from './ui/drawer';

export default function ChatBot() {
  const [messages, setMessages] = useState<AIConversationType[]>([]);

  const triggerButtonClassname = 'fixed bottom-4 right-4 rounded-full overflow-hidden w-16 flex shadow-xl z-50';

  const isDesktop = useMediaQuery('(min-width: 768px)');

  // fetch previous conversation and load it to chat
  const { aiConversationData } = useAIConversation();
  useEffect(() => {
    if (aiConversationData?.length) {
      setMessages(aiConversationData);
    } else {
      setMessages([{ content: '你有咩唔明都可以問我！', role: 'bot' }]);
    }
  }, [aiConversationData]);

  if (isDesktop) {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <button className={triggerButtonClassname}>
            <Avatar>
              <AvatarImage src='/images/ai-tutor.png' alt='@shadcn' />
            </Avatar>
          </button>
        </PopoverTrigger>
        <PopoverContent className='w-96 z-50 mr-4 shadow-md rounded-lg overflow-hidden' sideOffset={10}>
          <CardsChat messages={messages} setMessages={setMessages} />
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Drawer>
      <DrawerTrigger className='flex sm:hidden'>
        <Avatar className={triggerButtonClassname}>
          <AvatarImage src='/images/ai-tutor.png' alt='@shadcn' />
        </Avatar>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerTitle />
        <CardsChat messages={messages} setMessages={setMessages} />
      </DrawerContent>
    </Drawer>
  );
}

function CardsChat({
  messages,
  setMessages,
}: {
  messages: { content: string; role: string }[];
  setMessages: React.Dispatch<React.SetStateAction<{ content: string; role: string }[]>>;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { setCallForSubscriptionDialogOpen } = useAppStore();

  const { token } = useUser();
  const { isActiveSubscription } = useSubscription();

  // send message
  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();

    if (input.trim()) {
      setMessages([...messages, { content: input, role: 'user' }]);
      setInput('');
      // Simulate bot response
    }

    // if not subscription member
    if (!isActiveSubscription || !token) {
      setTimeout(() => {
        setCallForSubscriptionDialogOpen(true);

        setMessages(prev => [...prev, { content: '你需要訂閱才可以使用此功能！', role: 'bot' }]);
      }, 500);

      return;
    }

    setIsLoading(true);
    const res = await services.askAi(input, token);

    setMessages(prev => [...prev, { content: res, role: 'bot' }]);
    setIsLoading(false);
  };

  const inputLength = input.trim().length;

  useEffect(() => {
    ref.current?.scrollTo({ top: ref.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  return (
    <>
      <Card className='border-none shadow-none'>
        <CardHeader className='flex flex-row items-center py-3'>
          <div className='flex items-center space-x-4'>
            <Avatar>
              <AvatarImage src='/images/ai-tutor.png' alt='Image' width={34} height={34} className='rounded-full' />
            </Avatar>
            <div>
              <p className='text-sm font-medium leading-none'>DSE00 AI Tutor</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div ref={ref} className='space-y-4 max-h-[350px] min-h-40 overflow-scroll'>
            {messages.map((message, index) => (
              <div
                key={message.content}
                className={cn(
                  'flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm',
                  message.role === 'user' ? 'ml-auto bg-primary text-primary-foreground' : 'bg-muted'
                )}
              >
                {message.content}
              </div>
            ))}
          </div>
          {isLoading && <p>...</p>}
        </CardContent>
        <CardFooter>
          <form onSubmit={handleSend} className='flex w-full items-center space-x-2'>
            <Input
              id='message'
              placeholder='你的問題...'
              className='flex-1'
              autoComplete='off'
              value={input}
              onChange={event => setInput(event.target.value)}
              maxLength={300}
            />
            <Button type='submit' size='icon' disabled={inputLength === 0 || isLoading}>
              <Send />
              <span className='sr-only'>Send</span>
            </Button>
          </form>
        </CardFooter>
      </Card>
    </>
  );
}
