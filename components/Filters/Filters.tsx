import css from "./Filters.module.css";
import CustomSelect from "../CustomSelect/CustomSelect";
import { filterOptions } from "@/constants/filterOptions";
import { FilterValue } from "@/types/FilterValue";

interface FiltersProps {
  value: FilterValue;
  onChange: (value: FilterValue) => void;
}

export default function Filters({ value, onChange }: FiltersProps) {
  return (
    <section className={css.filter_section_container}>
      <h2 className={css.filter_title}>Filters</h2>
      <CustomSelect
        options={filterOptions}
        value={value}
        onChange={onChange}
        placeholder="Filters"
      />
    </section>
  );
}
