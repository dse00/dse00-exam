import { LanguageEnum } from '@/components/LanguageButton';
import { create } from 'zustand';

export type State = {
    counter: number;
    increment: () => void;
    decrement: () => void;
    loginDialogOpen: boolean;
    setLoginDialogOpen: (open: boolean) => void;
    language: LanguageEnum | null;
    setLanguage: (language: LanguageEnum) => void;
};

export const useAppStore = create<State>((set, get) => ({
    counter: 0,
    increment: () => set((state) => ({ counter: state.counter + 1 })),
    decrement: () => set((state) => ({ counter: state.counter - 1 })),
    loginDialogOpen: false,
    setLoginDialogOpen: (open: boolean) => set({ loginDialogOpen: open }),
    language: null,
    setLanguage: (language: LanguageEnum) => set({ language }),

}));