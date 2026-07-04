"use client";

import css from "./RegisterForm.module.css";
import { useState } from "react";
import { useAuth } from "../AuthProvider/AuthProvider";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { X } from "lucide-react";

interface RegisterFormProps {
  onSuccess?: () => void;
  onClose: () => void;
}

const registerSchema = yup.object({
  name: yup
    .string()
    .min(2, "Minimum 2 characters")
    .required("Name is required"),
  email: yup.string().email("Incorrect email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Minimum 6 characters")
    .required("Password is required"),
});

type RegisterFormData = yup.InferType<typeof registerSchema>;

export default function RegisterForm({
  onSuccess,
  onClose,
}: RegisterFormProps) {
  const { register: registerUser } = useAuth();
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({ resolver: yupResolver(registerSchema) });

  const onSubmit = async (data: RegisterFormData) => {
    setError("");
    try {
      await registerUser(data.email, data.password, data.name);
      onSuccess?.();
    } catch (err) {
      const code = (err as { code?: string }).code;
      setError(mapFirebaseError(code));
    }
  };

  return (
    <div className={css.register_form_container}>
      <button
        type="button"
        className={css.register_btn_close}
        onClick={onClose}
      >
        <X width={32} height={32} strokeWidth={2.5} />
      </button>
      <div>
        <h2 className={css.title}>Registration</h2>
        <p className={css.subtitle}>
          Thank you for your interest in our platform! In order to register, we
          need some information. Please provide us with the following
          information.
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={css.form_name_container}>
          <input
            type="text"
            placeholder="Name"
            {...register("name")}
            className={css.form_input}
          />
          {errors.name && (
            <p style={{ color: "red", position: "absolute" }}>
              {errors.name.message}
            </p>
          )}
        </div>

        <div className={css.form_email_container}>
          <input
            type="email"
            placeholder="Email"
            {...register("email")}
            className={css.form_input}
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
            {...register("password")}
            className={css.form_input}
          />
          {errors.password && (
            <p style={{ color: "red", position: "absolute" }}>
              {errors.password.message}
            </p>
          )}
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}

        <button type="submit" disabled={isSubmitting} className={css.form_btn}>
          {isSubmitting ? "Registration..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
}

function mapFirebaseError(code?: string): string {
  const messages: Record<string, string> = {
    "auth/email-already-in-use": "This email address is already registered..",
    "auth/invalid-email": "Invalid e-mail address.",
    "auth/weak-password": "The password is too weak (minimum 6 characters).",
  };
  return (code && messages[code]) || "An error occurred. Please try again.";
}
