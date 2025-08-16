// src/components/layout/client-layout.tsx
"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/header";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  // On homepage, header is inside Hero component's glass container
  // On all other pages, show header as a fixed element at the top
  return (
    <>
      {!isHomePage && <Header variant="solid" />}

      {children}
    </>
  );
}
