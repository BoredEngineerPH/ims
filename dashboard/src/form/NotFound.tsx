"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
// Components
import Button from '@/components/FormElements/Button';

export default function NotFound() {
    const router = useRouter();
    return (
        <>
            <div className="flex items-center justify-center w-full bg-white h-screen">
                <div className="block p-10 w-[800px] bg-blue not-found">
                    <div className="mb-8"><img src="/images/not-found.png" /></div>
                    <div className="mb-8 text-center bold text-black text-2xl">
                        Opps!!, sorry. Page Not Found
                    </div>
                    <div className="flex justify-center">
                        <Button
                            type="button"
                            color="primary"
                            size="sm"
                            className="rounded-full"
                            onClick={() => router.replace('/')}
                        >
                            Go Back Home
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
};
