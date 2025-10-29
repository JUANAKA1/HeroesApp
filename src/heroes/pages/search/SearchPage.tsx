import { CustomJumbotron } from "@/components/custom/CustomJumbotron";
import { HeroStarts } from "@/heroes/components/HeroStarts";
import { SearchControls } from "./ui/SearchControls";
import { CustomBreadcrumbs } from "@/components/custom/CustomBreadcrumbs";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";
import { searchHerosAction } from "@/heroes/actions/search-heros.action";

import { HeroGrid } from "@/heroes/components/HeroGrid";

const SearchPage = () => {
  const [searchParams] = useSearchParams();

  const name = searchParams.get("name") ?? undefined;
  const strength = searchParams.get("strength") ?? undefined;

  const { data: heroes = [] } = useQuery({
    queryKey: ["search", { name, strength }],
    queryFn: () => searchHerosAction({ name, strength }),
    staleTime: 6000 * 5,
  });
  return (
    <>
      <CustomJumbotron
        title="Busqueda de Super heroes"
        description="Descubre, explora, y administra tus superheroes y villanos favoritos"
      />
      <CustomBreadcrumbs
        currentPage="Buscador de héroes"
        breadcrumb={
          [
            // { label: "Home", to: "/" },
            // { label: "Home2", to: "/" },
            // { label: "Home3", to: "/" },
          ]
        }
      />
      <HeroStarts />
      <SearchControls />
      <HeroGrid heroes={heroes} />
    </>
  );
};
export default SearchPage;
