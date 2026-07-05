"use client";

import { Psychologist } from "@/types/psychologist";
import css from "./ReviewsList.module.css";
import { Star } from "lucide-react";
import { useModal } from "../ModalProvider/ModalProvider";

interface ReviewsListProps {
  psychologist: Psychologist;
}

export default function ReviewsList({ psychologist }: ReviewsListProps) {
  const { openModal } = useModal();
  return (
    <div>
      <ul className={css.reviews_list}>
        {psychologist.reviews.map((r, index) => (
          <li key={index} className={css.reviews_list_item}>
            <div className={css.reviewer_info_container}>
              <div className={css.reviewer_img_container}>
                <span>{r.reviewer.charAt(0).toUpperCase()}</span>
              </div>
              <div className={css.reviewer_info}>
                <span className={css.reviewer_name}>{r.reviewer}</span>
                <div className={css.reviews_rating_container}>
                  <Star
                    width={16}
                    height={16}
                    fill="#ffc531"
                    stroke="#ffc531"
                    strokeWidth={1.2}
                  />
                  <span className={css.reviews_rating}>{r.rating}</span>
                </div>
              </div>
            </div>
            <p className={css.reviewer_comment}>{r.comment}</p>
          </li>
        ))}
      </ul>
      <button
        type="button"
        className={css.reviews_btn}
        onClick={() => openModal("appointment", { psychologist })}
      >
        Make an appointment
      </button>
    </div>
  );
}
