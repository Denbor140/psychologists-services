import css from "./Hero.module.css";
import Image from "next/image";
import { Check } from "lucide-react";

export default function Hero() {
  return (
    <section className={css.hero_section_container}>
      <div className="container">
        <div className={css.hero_container}>
          <div className={css.hero_container_left}>
            <h1 className={css.hero_title}>
              The road to the <span>depths</span> of the human soul
            </h1>
            <p className={css.hero_subtitle}>
              We help you to reveal your potential, overcome challenges and find
              a guide in your own life with the help of our experienced
              psychologists.
            </p>
            <button className={css.hero_btn}>
              Get started
              <svg width={14} height={16}>
                <use href="/sprite.svg#icon-arrow"></use>
              </svg>
            </button>
          </div>
          <div className={css.hero_container_right}>
            <Image
              src={"/hero.png"}
              width={464}
              height={526}
              alt="hero-image"
            />

            <div className={css.hero_expienced_container}>
              <div className={css.experienced_check_container}>
                <Check
                  height={30}
                  width={30}
                  strokeWidth={3}
                  stroke="#54be96"
                />
              </div>
              <div>
                <h2 className={css.experienced_title}>
                  Experienced psychologists
                </h2>
                <p className={css.experienced_subtitle}>15,000</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
