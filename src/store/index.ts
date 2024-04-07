// import {create}  from "zustand";
import { createWithEqualityFn } from "zustand/traditional";
import { devtools, persist } from "zustand/middleware";
import { shallow } from "zustand/shallow";

type UserType = {
    email: string,
    uid: string,
    username: string,
  }

interface ThemeState {
    isDarkTheme: boolean;
    toggleTheme: () => void;
    user: UserType | '';
    setUser: (user: UserType) => void;
    resetUser: () => void;
}

const useStore = createWithEqualityFn<ThemeState>()(devtools(persist((set) => ({
    isDarkTheme: false,
    toggleTheme: () => {
        set(state => ({ isDarkTheme: !state.isDarkTheme }))
    },
    user: '',
    setUser: (user => set({ user })),
    resetUser: () => set({ user: '' })
}),
    {
        name: 'reddit-clone-store'
    })), shallow);

export default useStore;