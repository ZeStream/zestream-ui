import { create } from 'zustand';
import { persist } from 'zustand/middleware'


export enum ThemeMode {
    LIGHT = 'light',
    DARK = 'dark',
}

interface ThemeState {
    theme: ThemeMode;
    toggleTheme: () => void
}

export const useThemeStore = create<ThemeState>()(
    persist(
        (set) => ({
            theme: ThemeMode.LIGHT,
            toggleTheme: () => set((state) => (
                { theme: state.theme === ThemeMode.DARK ? ThemeMode.LIGHT : ThemeMode.DARK }
            ))
        }),
        {
            name: 'theme'
        }
    )
)
