import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";

import PsychologistsClientPage from "./PsychologistsClient";
import { getAllPsychologists } from "@/lib/api";

export default async function PsychologistsPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["psychologists"],
    queryFn: getAllPsychologists,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PsychologistsClientPage />
    </HydrationBoundary>
  );
}
