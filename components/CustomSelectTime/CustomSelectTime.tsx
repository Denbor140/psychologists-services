"use client";

import { useState } from "react";
import css from "./CustomSelectTime.module.css";
import { TimeValue } from "@/types/TimeValue";
import { Clock } from "lucide-react";

export interface SelectOption {
  label: string;
  value: TimeValue;
}

interface CustomSelectProps {
  options: SelectOption[];
  value: TimeValue | "";
  onChange: (value: TimeValue) => void;
  placeholder?: string;
}

export default function CustomSelectTime({
  options,
  value,
  onChange,
  placeholder,
}: CustomSelectProps) {
  const [open, setOpen] = useState(false);

  const selectedOption = options.find((option) => option.value === value);

  return (
    <div className={css.select_container}>
      <div
        className={css.select_value}
        onClick={() => setOpen((prev) => !prev)}
      >
        {selectedOption?.label || placeholder}

        <Clock
          width={20}
          height={20}
          strokeWidth={1.5}
          className={css.clock_img}
        />
      </div>

      <div
        className={`${css.dropdown_container} ${
          open ? css.dropdown_container_open : ""
        }`}
      >
        <h2>Meeting time</h2>
        <ul className={css.dropdown_list}>
          {options.map((option) => (
            <li
              key={option.value}
              className={`${css.select_option} ${
                value === option.value ? css.select_option_active : ""
              }`}
              onClick={() => {
                onChange(option.value);
                setOpen(false);
              }}
            >
              {option.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
