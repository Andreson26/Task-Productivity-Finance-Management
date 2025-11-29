"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import PasswordField from "@/components/PasswordField";
import styles from "./Auth.module.css";

import { FcGoogle } from "react-icons/fc";
import { FaApple, FaArrowLeft } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function SignupPage() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState<{
    fullName?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});

  const validate = () => {
    const newErrors: typeof errors = {};

    if (!fullName.trim()) newErrors.fullName = "Full name is required";
    else if (fullName.trim().length < 2)
      newErrors.fullName = "Name must be at least 2 characters";

    if (!email) newErrors.email = "Email is required";
    else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email))
      newErrors.email = "Invalid email format";

    if (!password) newErrors.password = "Password is required";
    else if (password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    if (!confirmPassword) newErrors.confirmPassword = "Confirm your password";
    else if (confirmPassword !== password)
      newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
  };

  return (
    <div className={styles.container}>
      <button className={styles.backButton} onClick={() => router.push("/")} >
        <FaArrowLeft size={18} />
        <span>Back</span>
      </button>

      <motion.div
        className={styles.card}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link href="/" className="flex items-center justify-center group">
          <Image
            src="/logo.png"
            alt="App Logo"
            width={90}
            height={100}
            priority
            className="transition-transform group-hover:scale-105"
          />
          <span className="text-lg font-semibold tracking-tight">P&M</span>
        </Link>

        <h1 className={styles.title}>Create an Account</h1>

        <p className={styles.switchText}>
          Already have an account?{" "}
          <Link href="/auth/signin" className={styles.link}>
            Sign In
          </Link>
        </p>

        <button className={styles.socialBtn}>
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

        <form className={styles.form} onSubmit={handleSubmit}>
          <AnimatePresence>
            <motion.div
              key="fullname"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <input
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className={`${styles.input} ${
                  errors.fullName ? styles.errorInput : ""
                }`}
              />
              {errors.fullName && (
                <p className={styles.errorText}>{errors.fullName}</p>
              )}
            </motion.div>
          </AnimatePresence>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`${styles.input} ${
              errors.email ? styles.errorInput : ""
            }`}
          />
          {errors.email && <p className={styles.errorText}>{errors.email}</p>}

          <PasswordField
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
          />

          <PasswordField
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={errors.confirmPassword}
          />

          <button type="submit" className={styles.submitBtn} disabled={loading}>
            {loading ? "Creating..." : "Sign Up with Email"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
