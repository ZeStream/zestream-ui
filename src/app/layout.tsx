// components
import { Providers } from './providers';

// defs
import type { Metadata } from 'next';

// styles
import '@radix-ui/themes/styles.css';
import './globals.css';

// fonts
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'ZeStream',
    description:
        'Open sourced, streamlined image, video and audio streaming and processing through UI and APIs',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    return (
        <html lang="en" suppressHydrationWarning>
            <body className={inter.className}>
                <Providers>
                    {children}
                </Providers>
            </body>
        </html>
    );
}
