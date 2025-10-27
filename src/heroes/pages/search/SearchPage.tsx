import { CustomJumbotron } from "@/components/custom/CustomJumbotron";
import { HeroStarts } from "@/heroes/components/HeroStarts";
import { SearchControls } from "./ui/SearchControls";
import { CustomBreadcrumbs } from "@/components/custom/CustomBreadcrumbs";

const SearchPage = () => {
  return (
    <>
      <CustomJumbotron
        title="Busqueda de Super heroes"
        description="Descubre, explora, y administra tus superheroes y villanos favoritos"
      />
      <CustomBreadcrumbs
        currentPage="Buscador de héroes"
        breadcrumb={[
          // { label: "Home", to: "/" },
          // { label: "Home2", to: "/" },
          // { label: "Home3", to: "/" },
        ]}
      />
      <HeroStarts />
      <SearchControls />
    </>
  );
};
export default SearchPage;
