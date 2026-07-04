"use client";

import { useEffect, useState } from "react";
import { ref, get } from "firebase/database";
import { db } from "@/lib/firebase";
import type { Psychologist } from "../types/psychologist";
import PsychologistsList from "@/components/PsychologistList/PsychologistList";

export default function PsychologistsPage() {
  const [psychologists, setPsychologists] = useState<Psychologist[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPsychologists() {
      try {
        const snapshot = await get(ref(db, "psychologists"));

        if (snapshot.exists()) {
          setPsychologists(snapshot.val());
        } else {
          setPsychologists([]);
        }
      } catch (error) {
        console.error("Failed to fetch psychologists:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchPsychologists();
  }, []);

  if (loading) return <p>Завантаження...</p>;

  if (psychologists.length === 0) return <p>Психологів поки немає.</p>;

  return <PsychologistsList psychologists={psychologists} />;
}
