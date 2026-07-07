"use client";
import css from "./FavoriteButton.module.css";
import { useAuth } from "../AuthProvider/AuthProvider";
import { Heart } from "lucide-react";
import { useModal } from "../ModalProvider/ModalProvider";
import { addToFavorites, checkFavorite, removeFromFavorites } from "@/lib/api";
import { useEffect, useState } from "react";
import { Psychologist } from "@/types/psychologist";
import toast from "react-hot-toast";

interface FavoriteButtonProps {
  psychologist: Psychologist;
  onToggleFavorite?: (psychologist: Psychologist) => void;
}

export default function FavoriteButton({
  psychologist,
  onToggleFavorite,
}: FavoriteButtonProps) {
  const { currentUser } = useAuth();
  const { openModal } = useModal();
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (!currentUser) return;

    const uid = currentUser.uid;

    async function loadFavorite() {
      const favorite = await checkFavorite(uid, psychologist.name);
      setIsFavorite(favorite);
    }

    loadFavorite();
  }, [currentUser, psychologist.name]);

  const handleClick = async () => {
    if (!currentUser) {
      openModal("login");
      return;
    }

    if (isFavorite) {
      await removeFromFavorites(currentUser.uid, psychologist.name);
      setIsFavorite(false);
      onToggleFavorite?.(psychologist);
      toast.success(
        `Psychologist: ${psychologist.name} removed from favorites.`,
      );
    } else {
      await addToFavorites(currentUser.uid, psychologist.name);
      setIsFavorite(true);
      toast.success(`Psychologist: ${psychologist.name} added to favorites.`);
    }

    setIsFavorite(!isFavorite);
  };

  return (
    <button type="button" className={css.favorites_btn} onClick={handleClick}>
      <Heart className={`${css.heart} ${isFavorite ? css.is_active : ""}`} />
    </button>
  );
}
