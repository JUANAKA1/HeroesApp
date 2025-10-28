import { getSummaryAction } from "@/heroes/actions/get-summary.action";
import { useQuery } from "@tanstack/react-query";

export const useHeroSummary = () => {
  return useQuery({
    queryKey: ["summary-information"],
    queryFn: getSummaryAction,
    staleTime: 6000 * 5,
  });
};
