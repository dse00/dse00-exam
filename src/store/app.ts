import { create } from 'zustand';

import { LanguageEnum } from '@/constants';

export type State = {
  counter: number;
  increment: () => void;
  decrement: () => void;
  loginDialogOpen: boolean;
  setLoginDialogOpen: (open: boolean) => void;
  language: LanguageEnum | null;
  setLanguage: (language: LanguageEnum) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  callForSubscriptionDialogOpen: boolean;
  setCallForSubscriptionDialogOpen: (open: boolean) => void;
};

export const useAppStore = create<State>((set, get) => ({
  counter: 0,
  increment: () => set(state => ({ counter: state.counter + 1 })),
  decrement: () => set(state => ({ counter: state.counter - 1 })),
  loginDialogOpen: false,
  setLoginDialogOpen: (open: boolean) => set({ loginDialogOpen: open }),
  language: null,
  setLanguage: (language: LanguageEnum) => set({ language }),
  loading: false,
  setLoading: (loading: boolean) => set({ loading }),
  callForSubscriptionDialogOpen: false,
  setCallForSubscriptionDialogOpen: (open: boolean) => set({ callForSubscriptionDialogOpen: open }),
}));
