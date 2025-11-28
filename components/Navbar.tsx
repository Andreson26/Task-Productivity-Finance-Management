"use client";

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Sticky shadow on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Disable scroll when mobile menu opens
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Pricing", href: "/pricing" },
  ];

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  const activeClass = (href: string) =>
    isActive(href) ? "nav-link active" : "nav-link";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[200] py-2 transition-all duration-300 ${
        scrolled ? "nav-bg shadow-md" : ""
      }`}
    >
      <nav className="max-w-7xl mx-auto h-20 md:h-24 px-6 md:px-12 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          onClick={() => setMenuOpen(false)}
          className="flex items-center group"
        >
          <Image
            src="/logo.png"
            alt="App Logo"
            width={90}
            height={100}
            className="transition-transform group-hover:scale-105"
          />
          <span className="text-lg font-semibold tracking-tight">P&M</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link key={item.name} href={item.href} className={activeClass(item.href)}>
              {item.name}
            </Link>
          ))}
           <ThemeToggle />
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMenuOpen(true)}
          className="md:hidden p-2 rounded-md hover:bg-card transition"
        >
          <Menu size={26} />
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 nav-bg md:hidden nav-transition ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Top row (logo + close) */}
        <div className="flex justify-between items-center px-6 py-5 nav-bg">
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-2"
          >
            <Image src="/logo.png" alt="App Logo" width={60} height={60} />
            <span className="text-lg font-semibold">P&M</span>
          </Link>

          <button
            onClick={() => setMenuOpen(false)}
            className="p-2 rounded-md hover:bg-muted transition"
          >
            <X size={26} />
          </button>
        </div>

        {/* Mobile nav links */}
        <nav className="min-h-full nav-bg flex flex-col items-center p-10 space-y-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className={`text-2xl font-semibold ${activeClass(item.href)}`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
