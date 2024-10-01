"use client";
import "jsvectormap/dist/jsvectormap.css";
import "flatpickr/dist/flatpickr.min.css";
import "@/css/satoshi.css";
import "@/css/style.css";
import React, { useEffect, useState } from "react";
import Loader from "@/components/Common/Loader";
import { RecoilRoot } from 'recoil';


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);

  // const pathname = usePathname();

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    <RecoilRoot>
        <html lang="en">
            <body suppressHydrationWarning={true}>
                <RecoilRoot>
                    <div className="dark:bg-boxdark-2 dark:text-bodydark">
                        {loading ? <div className="flex h-screen items-center justify-center bg-white dark:bg-black"><Loader /></div> : children}
                    </div>
                </RecoilRoot>
            </body>
        </html>
    </RecoilRoot>
  );
}
