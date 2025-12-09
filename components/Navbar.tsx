"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import ThemeToggle from "./ThemeToggle";
import AvatarDropdown from "./AvatarDropdown";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const pathname = usePathname();
  const { data: session } = useSession();

  const isLoggedIn = !!session?.user;
  const isAdmin = session?.user?.role === "ADMIN";

  // Sticky shadow
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  const active = (href: string) =>
    isActive(href) ? "nav-link active" : "nav-link";

  const authenticatedNav = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Tasks", href: "/tasks" },
    { name: "Finance", href: "/finance" },
    { name: "Reports", href: "/reports" },
  ];

  const publicNav = [{ name: "Pricing", href: "/pricing" }];
  const adminNav = [{ name: "Admin", href: "/admin" }];

  return (
    <header
      className={`fixed inset-x-0 top-0  transition-all duration-300 py-2 z-[200] ${
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

        {/* DESKTOP NAV */}
        <div className="hidden md:flex items-center gap-8">
          {isLoggedIn &&
            authenticatedNav.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={active(item.href)}
              >
                {item.name}
              </Link>
            ))}

          {!isLoggedIn &&
            publicNav.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={active(item.href)}
              >
                {item.name}
              </Link>
            ))}

          {isAdmin &&
            adminNav.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="nav-link text-red-600"
              >
                {item.name}
              </Link>
            ))}

          {!isLoggedIn ? (
            <>
              <Link href="/auth/signup" className="btn">
                Sign Up
              </Link>
              <Link href="/auth/signin" className="btn-outline">
                Sign In
              </Link>
            </>
          ) : (
            <AvatarDropdown user={session.user} />
          )}

          <ThemeToggle />
        </div>

        {/* MOBILE TOGGLE */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 rounded-md hover:bg-card transition"
          >
            {menuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </nav>

      {/* MOBILE MENU OVERLAY (FULL BACKGROUND) */}
      <div
        className={`fixed inset-0  nav-transition md:hidden  ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
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

        {/* MOBILE MENU CONTENT */}
        <nav className="min-h-full nav-bg flex flex-col items-center p-10 space-y-8">
          {/* Avatar Block */}
          {isLoggedIn && (
            <div className="flex flex-col items-center">
              <Image
                src={session.user.image || "/avatar-fallback.png"}
                alt="Avatar"
                width={70}
                height={70}
                className="rounded-full border mb-2"
              />
              <p className="font-semibold">{session.user.name}</p>
              <p className="text-sm text-muted">{session.user.email}</p>
            </div>
          )}

          {/* Main navigation */}
          {isLoggedIn &&
            authenticatedNav.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className={`text-2xl font-semibold ${active(item.href)}
                }`}
              >
                {item.name}
              </Link>
            ))}

          {!isLoggedIn &&
            publicNav.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className={`text-2xl font-semibold ${active(item.href)}`}
              >
                {item.name}
              </Link>
            ))}

          {isAdmin && (
            <Link
              href="/admin"
              onClick={() => setMenuOpen(false)}
              className="text-2xl font-medium text-red-600"
            >
              Admin Panel
            </Link>
          )}

          {/* Personal links under avatar */}
          {isLoggedIn && (
            <div className="flex flex-col items-center border-t mt-4 pt-4 space-y-3">
              <Link
                href="/profile"
                onClick={() => setMenuOpen(false)}
                className="text-lg hover:text-accent"
              >
                Profile
              </Link>
              <Link
                href="/settings"
                onClick={() => setMenuOpen(false)}
                className="text-lg hover:text-accent"
              >
                Settings
              </Link>
              <Link
                href="/billing"
                onClick={() => setMenuOpen(false)}
                className="text-lg hover:text-accent"
              >
                Billing
              </Link>
            </div>
          )}

          {/* Auth buttons */}
          <div className="flex flex-col items-center gap-4 mt-10">
            {!isLoggedIn ? (
              <>
                <Link
                  href="/auth/signup"
                  className="btn w-40"
                  onClick={() => setMenuOpen(false)}
                >
                  Sign Up
                </Link>
                <Link
                  href="/auth/signin"
                  className="btn-outline w-40"
                  onClick={() => setMenuOpen(false)}
                >
                  Sign In
                </Link>
              </>
            ) : (
              <button
                className="btn-outline w-40"
                onClick={() => {
                  setMenuOpen(false);
                  signOut({ callbackUrl: "/" });
                }}
              >
                Logout
              </button>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
