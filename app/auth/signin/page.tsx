"use client";

import { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import PasswordField from "@/components/PasswordField";
import styles from "../signup/Auth.module.css";

import { FcGoogle } from "react-icons/fc";
import { FaApple, FaArrowLeft } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function SignInPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);



  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
   
  }

  return (
    <div className={styles.container}>
      <button  className={styles.backButton} onClick={() => router.push("/")}>
        <FaArrowLeft size={18} />
        <span>Back</span>
      </button>

      <motion.div
        className={styles.card}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* LOGO */}
        <Link href="/" className="flex items-center justify-center group mb-2">
          <Image
            src="/logo.png"
            alt="App Logo"
            width={90}
            height={100}
            priority
            className="transition-transform group-hover:scale-105"
          />
          <span className="text-lg font-bold tracking-tight">P&M</span>
        </Link>

        <h1 className={styles.title}>Welcome Back</h1>

   

        {/* SOCIAL LOGINS */}
        <button
          className={styles.socialBtn}
        >
          <FcGoogle size={20} />
          Continue with Google
        </button>

        <button className={styles.socialBtn}>
          <FaApple size={20} />
          Continue with Apple
        </button>

        <button className={styles.socialBtn}>
          <FaXTwitter size={20} />
          Continue with X
        </button>

        <div className={styles.divider}>
          <hr />
          <span>or</span>
          <hr />
        </div>

        {/* FORM */}
        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            className={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <PasswordField
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />


          <button type="submit" className={styles.submitBtn} disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </button>

          {/* FORGOT PASSWORD */}
          <p className="mt-2 text-center">
            <Link href="/auth/forgot-password" className={styles.link}>
              Forgot password?
            </Link>
          </p>
        </form>

        {/* SWITCH TO SIGNUP */}
        <p className={styles.switchText}>
          Don’t have an account?{" "}
          <Link href="/auth/signup" className={styles.link}>
            Sign Up
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
