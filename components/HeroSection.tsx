"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";


export default function HeroSection() {

  return (
    <section className="hero-section">
      <motion.div
        className="flex flex-col gap-6 max-w-xl hero-text"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
          Master Your{" "}
          <span className="text-accent">Time</span> &{" "}
          <span className="text-accent">Finances</span> with Ease
        </h1>

        <p className="text-lg text-foreground max-w-lg leading-relaxed">
          A unified productivity and finance management platform designed to help you
          stay organized, automate tasks, and track financial health — powered by AI.
        </p>

        <div className="hero-buttons flex gap-4 mt-4">
        
           
              <Link href="/auth/signup" className="btn">
                Get Started Free
              </Link>

              <Link href="/learn-more" className="btn-outline">
                Learn More
              </Link>
        
        </div>
      </motion.div>

      <motion.div
        className="flex justify-center md:justify-end"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <Image
          src="/dashboard-preview.png"
          alt="Dashboard Preview"
          width={600}
          height={600}
          priority
          className="rounded-xl shadow-xl hero-image"
        />
      </motion.div>
    </section>
  );
}