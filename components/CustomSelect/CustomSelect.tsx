"use client";

import { useState } from "react";
import css from "./CustomSelect.module.css";
import { FilterValue } from "@/app/types/FilterValue";
import { ChevronDown } from "lucide-react";

export interface SelectOption {
  label: string;
  value: FilterValue;
}

interface CustomSelectProps {
  options: SelectOption[];
  value: FilterValue | "";
  onChange: (value: FilterValue) => void;
  placeholder?: string;
}

export default function CustomSelect({
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

        <ChevronDown
          width={20}
          height={20}
          stroke="#fbfbfb"
          strokeWidth={2.7}
          className={`${css.select_icon} ${open ? css.icon_open : ""}`}
        />
      </div>

      <div
        className={`${css.dropdown_container} ${
          open ? css.dropdown_container_open : ""
        }`}
      >
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
