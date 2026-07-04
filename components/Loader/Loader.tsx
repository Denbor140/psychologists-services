import css from "./Loader.module.css";

export default function Loader() {
  return (
    <div className={css.loader_wrapper}>
      <div className={css.three_body}>
        <div className={css.three_body__dot}></div>
        <div className={css.three_body__dot}></div>
        <div className={css.three_body__dot}></div>
      </div>
    </div>
  );
}
