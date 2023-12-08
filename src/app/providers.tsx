'use client';

// state
import { useThemeStore } from '@/context/ThemeState';

// radix
import { Theme } from "@radix-ui/themes";

// defs
import type { ReactNode } from 'react';


interface IProps {
    children: ReactNode;
}

export function Providers({ children }: IProps) {
    const { theme } = useThemeStore();

    return (
        <Theme appearance={theme}>
            {children}
        </Theme>
    );
}