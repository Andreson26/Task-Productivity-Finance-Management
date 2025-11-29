"use client";

import Link from "next/link";
import Image from "next/image";
import { Twitter, Github, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border mt-20 pt-12 pb-8 global-wrapper">
      <div className="grid gap-10 md:grid-cols-4">
        {/* Brand */}
        <div>
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.png" alt="Logo" width={45} height={45} />
            <span className="text-xl font-semibold tracking-tight">P&M</span>
          </Link>

          <p className="text-muted text-sm mt-4 max-w-xs leading-relaxed">
            The unified platform to manage tasks, automate workflows, and track
            your finances intelligently.
          </p>
        </div>

        {/* Product */}
        <div>
          <h4 className="footer-title">Product</h4>
          <ul className="footer-links">
            <li>
              <Link href="/features">Features</Link>
            </li>
            <li>
              <Link href="/pricing">Pricing</Link>
            </li>
            <li>
              <Link href="/dashboard">Dashboard</Link>
            </li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="footer-title">Company</h4>
          <ul className="footer-links">
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
            <li>
              <Link href="/careers">Careers</Link>
            </li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h4 className="footer-title">Legal</h4>
          <ul className="footer-links">
            <li>
              <Link href="/privacy">Privacy Policy</Link>
            </li>
            <li>
              <Link href="/terms">Terms of Service</Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom */}
      <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-muted text-sm">
          © {new Date().getFullYear()} P&M — All rights reserved.
        </p>

        <div className="flex gap-4 text-muted">
          <a
            href="https://twitter.com"
            target="_blank"
            className="hover:text-accent transition"
          >
            <Twitter size={18} />
          </a>
          <a
            href="https://github.com"
            target="_blank"
            className="hover:text-accent transition"
          >
            <Github size={18} />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            className="hover:text-accent transition"
          >
            <Linkedin size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}
