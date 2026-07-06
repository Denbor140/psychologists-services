import { FilterValue, SortField } from "@/types/FilterValue";

export function getPsychologistsFilters(filter: FilterValue): {
  field: SortField;
  direction: "asc" | "desc";
  rangeStart?: number;
  rangeEnd?: number;
} {
  switch (filter) {
    case "z-a":
      return { field: "name", direction: "desc" };
    case "popular":
      return { field: "rating", direction: "desc" };
    case "not-popular":
      return { field: "rating", direction: "asc" };
    case "less-than-10":
      return { field: "price_per_hour", direction: "asc", rangeEnd: 10 };
    case "greater-than-10":
      return { field: "price_per_hour", direction: "asc", rangeStart: 10 };
    case "a-z":
    case "show-all":
    default:
      return { field: "name", direction: "asc" };
  }
}
