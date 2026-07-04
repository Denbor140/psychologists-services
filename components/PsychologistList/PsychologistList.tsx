import css from "./PsychologistList.module.css";
import { Psychologist } from "@/app/types/psychologist";
import Image from "next/image";
import { Star, Heart } from "lucide-react";

interface PsychologistsListProps {
  psychologists: Psychologist[];
}

export default function PsychologistsList({
  psychologists,
}: PsychologistsListProps) {
  return (
    <section>
      <div className="container">
        <ul className={css.list_container}>
          {psychologists.map((psychologist) => (
            <li key={psychologist.name} className={css.list_item}>
              <div className={css.item_img_container}>
                <Image
                  src={psychologist.avatar_url}
                  alt={psychologist.name}
                  width={96}
                  height={96}
                  className={css.item_img}
                />
              </div>
              <div>
                <div className={css.info_top_container}>
                  <div className={css.info_top_left}>
                    <h1 className={css.info_name}>{psychologist.name}</h1>
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
                    <button type="button">
                      <Heart width={26} height={26} strokeWidth={2} />
                    </button>
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
                <button type="button" className={css.psychologist_btn}>
                  Read more
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
