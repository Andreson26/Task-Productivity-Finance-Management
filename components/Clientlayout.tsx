"use client";

import Navbar from "@/components/Navbar";
import { usePathname } from "next/navigation";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Pages where navbar should NOT appear
  const hideNavbar = pathname.startsWith("/auth");

  return (
    <>
      {!hideNavbar && <Navbar />}

      {/* Global page spacing */}
      <div className="global-wrapper">{children}</div>
    </>
  );
}
