"use client";
import css from "./FavoriteButton.module.css";
import { useAuth } from "../AuthProvider/AuthProvider";
import { Heart } from "lucide-react";
import { useModal } from "../ModalProvider/ModalProvider";
import { addToFavorites, checkFavorite, removeFromFavorites } from "@/lib/api";
import { useEffect, useState } from "react";

interface FavoriteButtonProps {
  psychologistName: string;
}

export default function FavoriteButton({
  psychologistName,
}: FavoriteButtonProps) {
  const { currentUser } = useAuth();
  const { openAuthModal } = useModal();
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (!currentUser) return;

    const uid = currentUser.uid;

    async function loadFavorite() {
      const favorite = await checkFavorite(uid, psychologistName);

      setIsFavorite(favorite);
    }

    loadFavorite();
  }, [currentUser, psychologistName]);

  const handleClick = async () => {
    if (!currentUser) {
      openAuthModal("login");
      return;
    }

    if (isFavorite) {
      await removeFromFavorites(currentUser.uid, psychologistName);
    } else {
      await addToFavorites(currentUser.uid, psychologistName);
    }

    setIsFavorite(!isFavorite);
  };

  return (
    <button type="button" className={css.favorites_btn} onClick={handleClick}>
      <Heart className={`${css.heart} ${isFavorite ? css.is_active : ""}`} />
    </button>
  );
}
