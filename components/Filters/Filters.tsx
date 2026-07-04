import css from "./Filters.module.css";
import { useState } from "react";
import CustomSelect from "../CustomSelect/CustomSelect";
import { filterOptions } from "@/constants/filterOptions";
import { FilterValue } from "@/app/types/FilterValue";

export default function Filters() {
  const [filter, setFilter] = useState<FilterValue>("show-all");
  return (
    <section className={css.filter_section_container}>
      <h2 className={css.filter_title}>Filters</h2>
      <CustomSelect
        options={filterOptions}
        value={filter}
        onChange={setFilter}
        placeholder="Filters"
      />
    </section>
  );
}
