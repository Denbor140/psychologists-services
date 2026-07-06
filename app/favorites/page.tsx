"use client";

import css from "./page.module.css";
import { useAuth } from "@/components/AuthProvider/AuthProvider";
import PsychologistsList from "@/components/PsychologistList/PsychologistList";
import { getFavoritePsychologists, removeFromFavorites } from "@/lib/api";
import { useMemo, useState } from "react";
import { Psychologist } from "@/types/psychologist";
import Loader from "@/components/Loader/Loader";
import { FilterValue } from "@/types/FilterValue";
import { filterPsychologists } from "@/utils/filteredPsychologists";
import Filters from "@/components/Filters/Filters";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const PAGE_SIZE = 3;

export default function FavoritesPage() {
  const [filter, setFilter] = useState<FilterValue>("a-z");
  const { currentUser, loading: authLoading } = useAuth();
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const queryClient = useQueryClient();

  const {
    data: favorites = [],
    isLoading: favoritesLoading,
    error,
  } = useQuery({
    queryKey: ["favorites", currentUser?.uid],
    queryFn: () => getFavoritePsychologists(currentUser!.uid),
    enabled: !!currentUser,
    refetchOnWindowFocus: false,
  });

  async function handleRemoveFavorite(psychologist: Psychologist) {
    if (!currentUser) return;

    await removeFromFavorites(currentUser.uid, psychologist.name);

    queryClient.setQueryData<Psychologist[]>(
      ["favorites", currentUser.uid],
      (prev) => prev?.filter((p) => p.name !== psychologist.name) ?? [],
    );
  }

  const filteredPsychologists = useMemo(
    () => filterPsychologists(favorites ?? [], filter),
    [favorites, filter],
  );

  const visiblePsychologists = filteredPsychologists.slice(0, visibleCount);
  const hasMore = visibleCount < filteredPsychologists.length;

  const handleFilterChange = (value: FilterValue) => {
    setFilter(value);
    setVisibleCount(PAGE_SIZE);
  };

  const isLoading = authLoading || (!!currentUser && favoritesLoading);
  const hasFavorites = favorites.length > 0;

  if (isLoading) return <Loader />;

  if (error) return <p>Something went wrong</p>;

  return (
    <div className={css.favorites_page_container}>
      <div className="container">
        {!hasFavorites ? (
          <div className={css.none_favorites_container}>
            <span>You don`t have any favorite psychologists yet.</span>
          </div>
        ) : (
          <Filters value={filter} onChange={handleFilterChange} />
        )}

        {visiblePsychologists.length === 0 && hasFavorites ? (
          <div className={css.none_favorites_match}>
            <span>No psychologists matching.</span>
          </div>
        ) : (
          <PsychologistsList
            psychologists={visiblePsychologists}
            onToggleFavorite={handleRemoveFavorite}
          />
        )}

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
