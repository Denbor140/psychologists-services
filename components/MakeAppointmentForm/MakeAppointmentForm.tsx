"use client";

import css from "./MakeAppointmentForm.module.css";
import { Psychologist } from "@/types/psychologist";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { X } from "lucide-react";
import { useModal } from "../ModalProvider/ModalProvider";
import Image from "next/image";
import toast from "react-hot-toast";
import CustomSelectTime, {
  SelectOption,
} from "../CustomSelectTime/CustomSelectTime";
import { TimeValue } from "@/types/TimeValue";
import { TIME_VALUES } from "@/constants/timeValues";

interface MakeAppointmentFormProps {
  psychologist?: Psychologist;
  onClose: () => void;
}

const timeOptions: SelectOption[] = TIME_VALUES.map((time) => ({
  label: time,
  value: time,
}));

const MakeAppointmentFormSchema = yup.object({
  name: yup.string().required("Name is required"),
  phone: yup.string().required("Phone is required"),
  time: yup.string().required("Time is required"),
  email: yup.string().email().required("Email is required"),
  comment: yup
    .string()
    .max(500, "Maximum 500 characters")
    .required("Comment is required"),
});

type FormData = yup.InferType<typeof MakeAppointmentFormSchema>;

export default function MakeAppointmentForm({
  psychologist,
  onClose,
}: MakeAppointmentFormProps) {
  const { closeModal } = useModal();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: yupResolver(MakeAppointmentFormSchema) });

  const onSubmit = async (data: FormData) => {
    toast.success(
      `Your visit with ${psychologist?.name} has been booked! ${data.name}, we will be in touch.`,
    );
    closeModal();
  };
  return (
    <div className={css.form_container}>
      <button type="button" className={css.btn_close} onClick={onClose}>
        <X width={24} height={24} strokeWidth={2.5} />
      </button>
      <h2 className={css.title}>Make an appointment with a psychologists</h2>
      <p className={css.subtitle}>
        You are on the verge of changing your life for the better. Fill out the
        short form below to book your personal appointment with a professional
        psychologist. We guarantee confidentiality and respect for your privacy.
      </p>
      <div className={css.psychologist_info_container}>
        {psychologist && (
          <>
            <Image
              src={psychologist.avatar_url}
              alt={psychologist.name}
              width={44}
              height={44}
              loading="eager"
              className={css.psychologist_img}
            />
            <div>
              <h2 className={css.psychologist_name}>{psychologist.name}</h2>
              <span>Your psychologists</span>
            </div>
          </>
        )}
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={css.form_name_container}>
          <input
            type="name"
            placeholder="Name"
            className={css.form_input}
            {...register("name")}
          />
          {errors.name && (
            <p style={{ color: "red", position: "absolute" }}>
              {errors.name.message}
            </p>
          )}
        </div>
        <div className={css.time_phone_container}>
          <div>
            <input
              type="text"
              placeholder="+380"
              className={css.phone_input}
              {...register("phone")}
            />
            {errors.phone && (
              <p style={{ color: "red", position: "absolute" }}>
                {errors.phone.message}
              </p>
            )}
          </div>
          <div>
            <Controller
              name="time"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <CustomSelectTime
                  options={timeOptions}
                  value={field.value as TimeValue | ""}
                  placeholder="00:00"
                  onChange={field.onChange}
                />
              )}
            />
            {errors.time && (
              <p style={{ color: "red", position: "absolute" }}>
                {errors.time.message}
              </p>
            )}
          </div>
        </div>
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
        <div className={css.form_comment_container}>
          <textarea
            placeholder="Comment"
            rows={4}
            className={css.form_textarea}
            {...register("comment")}
          />
          {errors.comment && (
            <p style={{ color: "red", position: "absolute" }}>
              {errors.comment.message}
            </p>
          )}
        </div>
        <button type="submit" className={css.form_btn}>
          {isSubmitting ? "Sending..." : "Send"}
        </button>
      </form>
    </div>
  );
}
