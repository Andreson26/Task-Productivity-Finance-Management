import type { Metadata } from "next";
import "@fontsource/plus-jakarta-sans";
import "./globals.css";



export const metadata: Metadata = {
  title: "Task Productivity & Finance Management",
  description: "Manage productivity and finances intelligently",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
       
      >
        {children}
      </body>
    </html>
  );
}
