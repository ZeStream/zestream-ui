"use client"

// components
import Main from '@/layouts/Main/Main';

// next
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';



export default function Home() {
    const router = useRouter();

    useEffect(() => {
        router.replace('/files');
    });

    return (
        <Main>
            <h1>Loading...</h1>
        </Main>
    );
}
