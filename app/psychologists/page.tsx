"use client";
import css from "./page.module.css";
import { useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import PsychologistsList from "@/components/PsychologistList/PsychologistList";
import { getAllPsychologists } from "@/lib/api";
import Filters from "@/components/Filters/Filters";

const PAGE_SIZE = 3;

export default function PsychologistsPage() {
  const [count, setCount] = useState(PAGE_SIZE);

  const {
    data: psychologists = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["psychologists"],
    queryFn: getAllPsychologists,
    refetchOnMount: false,
    retry: false,
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong</p>;
  const visiblePsychologists = psychologists.slice(0, count);

  return (
    <div className={css.psychologists_page_container}>
      <div className="container">
        <Filters />
        <PsychologistsList psychologists={visiblePsychologists} />
        {count < psychologists.length && (
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
