"use client";

import css from "./LoginForm.module.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAuth } from "../AuthProvider/AuthProvider";
import { useState } from "react";
import { X } from "lucide-react";
import { useModal } from "../ModalProvider/ModalProvider";
import { useRouter } from "next/navigation";

const loginSchema = yup.object({
  email: yup.string().email("Incorrect email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Minimum 6 characters")
    .required("Password is required"),
});

type FormData = yup.InferType<typeof loginSchema>;

interface LoginFormProps {
  onSuccess?: () => void;
  onClose: () => void;
}

export default function LoginForm({ onSuccess, onClose }: LoginFormProps) {
  const { login } = useAuth();
  const [error, setError] = useState("");
  const { redirectPath, closeAuthModal } = useModal();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: yupResolver(loginSchema) });

  const onSubmit = async (data: FormData) => {
    setError("");
    try {
      await login(data.email, data.password);
      closeAuthModal();
      if (redirectPath) {
        router.push(redirectPath);
      }
      onSuccess?.();
    } catch (err) {
      const code = (err as { code?: string }).code;
      setError(mapFirebaseError(code));
    }
  };

  return (
    <div>
      <button type="button" className={css.login_btn_close} onClick={onClose}>
        <X width={32} height={32} strokeWidth={2.5} />
      </button>
      <h2 className={css.title}>Log In</h2>
      <p className={css.subtitle}>
        Welcome back! Please enter your credentials to access your account and
        continue your search for a psychologist.
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={css.form_email_container}>
          <input
            type="email"
            placeholder="Email"
            className={css.form_input}
            {...register("email")}
          />
          {errors.email && (
            <p style={{ color: "red", position: "absolute" }}>
              {errors.email.message}
            </p>
          )}
        </div>

        <div className={css.form_pass_container}>
          <input
            type="password"
            placeholder="Password"
            className={css.form_input}
            {...register("password")}
          />
          {errors.password && (
            <p style={{ color: "red", position: "absolute" }}>
              {errors.password.message}
            </p>
          )}
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button type="submit" disabled={isSubmitting} className={css.login_btn}>
          {isSubmitting ? "Log In..." : "Log In"}
        </button>
      </form>
    </div>
  );
}

function mapFirebaseError(code?: string): string {
  const messages: Record<string, string> = {
    "auth/invalid-credential": "Invalid login or password.",
    "auth/user-not-found": "Invalid login or password.",
    "auth/wrong-password": "Invalid login or password.",
    "auth/invalid-email": "Invalid email address.",
    "auth/too-many-requests":
      "Too many login attempts. Please try again later.",
    "auth/user-disabled": "This account has been blocked.",
  };
  return (code && messages[code]) || "An error occurred. Please try again.";
}
