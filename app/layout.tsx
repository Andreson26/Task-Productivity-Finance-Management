import "./globals.css";
import type { Metadata } from "next";
import "@fontsource/plus-jakarta-sans";

import { Providers } from "./providers";

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
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Prevent Flash of Light Mode */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
      (function () {
        try {
          let theme = localStorage.getItem("theme") || "dark";
          document.documentElement.dataset.theme = theme;

          if (theme === "dark") {
            document.documentElement.classList.add("dark");
          } else {
            document.documentElement.classList.remove("dark");
          }
        } catch (_) {
          document.documentElement.dataset.theme = "dark";
          document.documentElement.classList.add("dark");
        }
      })();
    `,
          }}
        />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
