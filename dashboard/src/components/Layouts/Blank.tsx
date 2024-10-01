"use client";
import React from "react";
import DarkModeSwitcher from "@/components/Header/DarkModeSwitcher";

export default function Blank({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
    <div className="absolute top-0 right-0 p-3">
        <DarkModeSwitcher />
    </div>
    <div className="h-screen w-screen flex items-center">
        {children}
    </div>
    </>
  );
}
