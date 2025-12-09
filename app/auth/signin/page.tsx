"use client";

import { useState, FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";

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
  const params = useSearchParams();

  const created = params.get("new"); // Show banner after signup

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setServerError("");

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false, // We control redirects manually
    });

    setLoading(false);

    if (res?.error) {
      // Backend currently only throws these:
      if (res.error === "MissingCredentials") {
        setServerError("Please enter both email and password.");
        return;
      }

      if (res.error === "CredentialsSignin") {
        setServerError("Invalid email or password.");
        return;
      }

      setServerError("Something went wrong. Please try again.");
      return;
    }

    // Success → redirect user
    router.push("/dashboard");
  }

  return (
    <div className={styles.container}>
      <button onClick={() => router.push("/")} className={styles.backButton}>
        <FaArrowLeft size={18} />
        <span>Back</span>
      </button>

      <motion.div
        className={styles.card}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Logo */}
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

        {created && (
          <p className="text-sm text-green-600 text-center mb-2">
            Account created! Please sign in.
          </p>
        )}

        {/* Social Logins */}
        <button
          className={styles.socialBtn}
          type="button"
          onClick={() =>
            signIn("google", { callbackUrl: "/dashboard", prompt: "consent" })
          }
        >
          <FcGoogle size={20} />
          Continue with Google
        </button>

        <button className={styles.socialBtn} type="button">
          <FaApple size={20} />
          Continue with Apple
        </button>

        <button className={styles.socialBtn} type="button">
          <FaXTwitter size={20} />
          Continue with X
        </button>

        <div className={styles.divider}>
          <hr />
          <span>or</span>
          <hr />
        </div>

        {/* Sign In Form */}
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

          {/* Error Message */}
          {serverError && (
            <p className="text-sm text-red-600 text-center mt-2">
              {serverError}
            </p>
          )}

          <button type="submit" className={styles.submitBtn} disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </button>

          <p className="mt-2 text-center">
            <Link href="/auth/forgot-password" className={styles.link}>
              Forgot password?
            </Link>
          </p>
        </form>

        {/* Switch */}
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
