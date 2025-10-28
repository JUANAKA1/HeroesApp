import { getHeroesByPageAction } from "@/heroes/actions/get-heroes-by-page.actions";
import { useQuery } from "@tanstack/react-query";

export const usePaginateHero = (page: number, limit: number) => {
  return useQuery({
    queryKey: ["heroes", { page, limit }],
    queryFn: () => getHeroesByPageAction(+page, +limit),
    staleTime: 1000 * 60 * 5,
  });
};
