"use client";
import css from "./page.module.css";
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import PsychologistsList from "@/components/PsychologistList/PsychologistList";
import { getAllPsychologists } from "@/lib/api";
import Filters from "@/components/Filters/Filters";
import { FilterValue } from "../../types/FilterValue";
import { filterPsychologists } from "@/utils/filteredPsychologists";

const PAGE_SIZE = 3;

export default function PsychologistsClientPage() {
  const [count, setCount] = useState(PAGE_SIZE);
  const [filter, setFilter] = useState<FilterValue>("a-z");

  const {
    data: psychologists = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["psychologists"],
    queryFn: getAllPsychologists,
  });

  const filteredPsychologists = useMemo(
    () => filterPsychologists(psychologists, filter),
    [psychologists, filter],
  );

  const visiblePsychologists = filteredPsychologists.slice(0, count);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong</p>;

  return (
    <div className={css.psychologists_page_container}>
      <div className="container">
        <Filters value={filter} onChange={setFilter} />
        <PsychologistsList psychologists={visiblePsychologists} />
        {count < filteredPsychologists.length && (
          <button
            type="button"
            className={css.load_more_btn}
            onClick={() => setCount((prev) => prev + PAGE_SIZE)}
          >
            Load More
          </button>
        )}
      </div>
    </div>
  );
}
