"use client";
import css from "./page.module.css";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Cursor, getAllPsychologists } from "@/lib/api";
import PsychologistsList from "@/components/PsychologistList/PsychologistList";
import Loader from "@/components/Loader/Loader";
import { FilterValue } from "@/types/FilterValue";
import { useState } from "react";
import Filters from "@/components/Filters/Filters";

export default function PsychologistsPage() {
  const [filter, setFilter] = useState<FilterValue>("a-z");

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useInfiniteQuery({
    queryKey: ["psychologists", filter],
    queryFn: ({ pageParam }) => getAllPsychologists(filter, pageParam),
    initialPageParam: null as Cursor,
    getNextPageParam: (lastPage) =>
      lastPage.hasMore ? lastPage.lastCursor : undefined,
    refetchOnWindowFocus: false,
    retry: false,
  });

  const psychologists = data?.pages.flatMap((page) => page.items) ?? [];

  if (isLoading) return <Loader />;

  if (error) return <p>Something went wrong</p>;

  return (
    <div className={css.psychologists_page_container}>
      <div className="container">
        <Filters value={filter} onChange={setFilter} />

        {psychologists.length === 0 ? (
          <div className={css.none_psychologists_container}>
            <span>No psychologists matching.</span>
          </div>
        ) : (
          <PsychologistsList psychologists={psychologists} />
        )}

        {hasNextPage && (
          <button
            type="button"
            className={css.load_more_btn}
            disabled={isFetchingNextPage}
            onClick={() => fetchNextPage()}
          >
            Load More
          </button>
        )}
      </div>
    </div>
  );
}
