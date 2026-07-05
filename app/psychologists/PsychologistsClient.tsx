"use client";
import css from "./page.module.css";
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllPsychologists } from "@/lib/api";
import { filterPsychologists } from "@/utils/filteredPsychologists";
import { FilterValue } from "@/types/FilterValue";
import Filters from "@/components/Filters/Filters";
import PsychologistsList from "@/components/PsychologistList/PsychologistList";
import Loader from "@/components/Loader/Loader";

const PAGE_SIZE = 3;

export default function PsychologistsClientPage() {
  const [filter, setFilter] = useState<FilterValue>("a-z");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const {
    data: psychologists = [],
    isFetching,
    error,
  } = useQuery({
    queryKey: ["psychologists"],
    queryFn: getAllPsychologists,
    refetchOnWindowFocus: false,
  });

  const filteredPsychologists = useMemo(
    () => filterPsychologists(psychologists ?? [], filter),
    [psychologists, filter],
  );

  const visiblePsychologists = filteredPsychologists.slice(0, visibleCount);
  const hasMore = visibleCount < filteredPsychologists.length;

  const handleFilterChange = (value: FilterValue) => {
    setFilter(value);
    setVisibleCount(PAGE_SIZE);
  };

  if (isFetching) return <Loader />;

  if (error) return <p>Something went wrong</p>;

  return (
    <div className={css.psychologists_page_container}>
      <div className="container">
        <Filters value={filter} onChange={handleFilterChange} />
        <PsychologistsList psychologists={visiblePsychologists} />
        {hasMore && (
          <button
            type="button"
            className={css.load_more_btn}
            onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
          >
            Load More
          </button>
        )}
      </div>
    </div>
  );
}
