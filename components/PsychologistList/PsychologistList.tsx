"use client";

import css from "./PsychologistList.module.css";
import { Psychologist } from "@/types/psychologist";
import Image from "next/image";
import { Star, Circle } from "lucide-react";
import FavoriteButton from "../FavoriteButton/FavoriteButton";
import { useState } from "react";
import ReviewsList from "../ReviewsList/ReviewsList";

interface PsychologistsListProps {
  psychologists: Psychologist[];
  onToggleFavorite?: (psychologist: Psychologist) => void;
  initialIsFavorite?: boolean;
}

export default function PsychologistsList({
  psychologists,
  onToggleFavorite,
}: PsychologistsListProps) {
  const [readMore, setReadMore] = useState<Set<string>>(new Set());

  function toggleExpand(name: string) {
    setReadMore((prev) => {
      const next = new Set(prev);
      if (next.has(name)) {
        next.delete(name);
      } else {
        next.add(name);
      }
      return next;
    });
  }

  return (
    <section className={css.psychologist_section_container}>
      <ul className={css.list_container}>
        {psychologists.map((psychologist) => {
          const isReadMore = readMore.has(psychologist.name);

          return (
            <li key={psychologist.name} className={css.list_item}>
              <div className={css.item_img_container}>
                <Image
                  src={psychologist.avatar_url}
                  alt={psychologist.name}
                  width={96}
                  height={96}
                  className={css.item_img}
                />
                <Circle
                  width={14}
                  height={14}
                  fill="#38cd3e"
                  stroke="#fbfbfb"
                  strokeWidth={4}
                  className={css.item_circle}
                />
              </div>
              <div>
                <div className={css.info_top_container}>
                  <div className={css.info_top_left}>
                    <h2 className={css.info_name}>{psychologist.name}</h2>
                    <span className={css.info_categorie}>Psychologist</span>
                  </div>
                  <div className={css.info_top_right}>
                    <div className={css.info_rating}>
                      <Star
                        width={16}
                        height={16}
                        fill="#ffc531"
                        stroke="#ffc531"
                        strokeWidth={1.2}
                      />
                      <span>Rating: {psychologist.rating}</span>
                    </div>
                    <span className={css.info_price}>
                      Price / 1 hour:{" "}
                      <span>{psychologist.price_per_hour}$</span>
                    </span>
                    <FavoriteButton
                      psychologist={psychologist}
                      onToggleFavorite={onToggleFavorite}
                    />
                  </div>
                </div>
                <ul className={css.info_medium_list}>
                  <li className={css.info_medium_list_item}>
                    <span>Experience:</span> {psychologist.experience}
                  </li>
                  <li className={css.info_medium_list_item}>
                    <span>License:</span> {psychologist.license}
                  </li>
                  <li className={css.info_medium_list_item}>
                    <span>Specialization:</span> {psychologist.specialization}
                  </li>
                  <li className={css.info_medium_list_item}>
                    <span>Initial_consultation:</span>{" "}
                    {psychologist.initial_consultation}
                  </li>
                </ul>
                <p className={css.psychologist_about}>{psychologist.about}</p>
                <button
                  type="button"
                  className={css.psychologist_btn}
                  onClick={() => toggleExpand(psychologist.name)}
                >
                  {isReadMore ? "Hide" : "Read more"}
                </button>

                <div
                  className={`${css.reviews_wrapper} ${isReadMore ? css.reviews_wrapper_open : ""}`}
                >
                  <div className={css.reviews_inner}>
                    <ReviewsList psychologist={psychologist} />
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
