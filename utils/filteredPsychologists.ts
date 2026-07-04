import { Psychologist } from "@/types/psychologist";
import { FilterValue } from "@/types/FilterValue";

export function filterPsychologists(
  psychologists: Psychologist[],
  filter: FilterValue,
): Psychologist[] {
  const items = [...psychologists];

  switch (filter) {
    case "a-z":
      return items.sort((a, b) => a.name.localeCompare(b.name));

    case "z-a":
      return items.sort((a, b) => b.name.localeCompare(a.name));

    case "less-than-10":
      return items.filter((item) => item.price_per_hour < 10);

    case "greater-than-10":
      return items.filter((item) => item.price_per_hour >= 10);

    case "popular":
      return items.sort((a, b) => b.rating - a.rating);

    case "not-popular":
      return items.sort((a, b) => a.rating - b.rating);

    case "show-all":
    default:
      return items;
  }
}
