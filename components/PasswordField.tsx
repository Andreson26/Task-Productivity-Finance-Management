"use client";

import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import styles from "@/app/auth/signup/Auth.module.css";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
};

export default function PasswordField({
  label,
  error,
  className,
  ...props
}: Props) {
  const [show, setShow] = useState(false);

  return (
    <div className={styles.inputWrapper}>
      {label && <label className={styles.label}>{label}</label>}

      <div className={styles.passwordContainer}>
        <input
          {...props}
          type={show ? "text" : "password"}
          className={`${styles.input} ${error ? styles.errorInput : ""} ${
            className || ""
          }`}
        />

        <button
          type="button"
          onClick={() => setShow(!show)}
          className={styles.showButton}
        >
          {show ? <FiEyeOff size={18} /> : <FiEye size={18} />}
        </button>
      </div>
      {error && <p className={styles.errorText}>{error}</p>}
    </div>
  );
}