"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { signOut } from "next-auth/react";
import { Session } from "next-auth";

export default function AvatarDropdown({ user }: { user: Session["user"] }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handle = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, []);

  return (
    <div ref={ref} className="relative hidden md:block">
      <button onClick={() => setOpen((p) => !p)}>
        <Image
          src={user.image || "/avatar-fallback.png"}
          alt="Avatar"
          width={38}
          height={38}
          className="rounded-full border cursor-pointer"
        />
      </button>

      {open && (
        <div className="absolute right-0 mt-3 w-56 bg-card rounded-xl shadow-xl p-4 z-50">
          <div className="pb-3 border-b border-border mb-3">
            <p className="font-semibold">{user.name}</p>
            <p className="text-xs text-muted">{user.email}</p>
          </div>

          <nav className="flex flex-col gap-2 text-sm">
            <Link
              href="/profile"
              onClick={() => setOpen(false)}
              className="hover:text-muted"
            >
              Profile
            </Link>

            <Link
              href="/billing"
              onClick={() => setOpen(false)}
              className="hover:text-muted"
            >
              Billing
            </Link>

            <Link
              href="/settings"
              onClick={() => setOpen(false)}
              className="hover:text-muted"
            >
              Settings
            </Link>

            {user.role === "ADMIN" && (
              <Link
                href="/admin"
                onClick={() => setOpen(false)}
                className="text-red-500"
              >
                Admin Panel
              </Link>
            )}

            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="text-red-500 text-left mt-2"
            >
              Logout
            </button>
          </nav>
        </div>
      )}
    </div>
  );
}
