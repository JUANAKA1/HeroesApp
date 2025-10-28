import { use, useMemo } from "react";
import { useSearchParams } from "react-router";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CustomJumbotron } from "@/components/custom/CustomJumbotron";
import { HeroStarts } from "@/heroes/components/HeroStarts";
import { HeroGrid } from "@/heroes/components/HeroGrid";
import { CustomPagination } from "@/components/custom/CustomPagination";
import { Heart } from "lucide-react";
import { CustomBreadcrumbs } from "@/components/custom/CustomBreadcrumbs";
import { useHeroSummary } from "@/hooks/useHeroSummary";
import { usePaginateHero } from "@/hooks/usePaginateHero";
import { FavoriteHeroContext } from "@/useContext/FavoriteHeroContextProvider";

export function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get("tab") ?? "all";
  const page = searchParams.get("page") ?? "1";
  const limit = searchParams.get("limit") ?? "6";
  const category = searchParams.get("category") ?? "all";

  const selectedTab = useMemo(() => {
    const validTabs = ["all", "favorites", "heroes", "villains"];
    return validTabs.includes(activeTab) ? activeTab : "all";
  }, [activeTab]);

  // const [activeTab, setActiveTab] = useState<
  //   "all" | "favorites" | "heroes" | "villains"
  // >("all");
  const { data: heroesResponse } = usePaginateHero(+page, +limit, category);
  // const { data: heroesResponse } = useQuery({
  //   queryKey: ["heroes", { page, limit }],
  //   queryFn: () => getHeroesByPageAction(+page, +limit),
  //   staleTime: 1000 * 60 * 5,
  // });
  const { data: summary } = useHeroSummary();
  // const { data: summary } = useQuery({
  //   queryKey: ["sumary"],
  //   queryFn: getSummaryAction,
  //   staleTime: 6000 * 5,
  // });

  // useEffect(() => {
  //   getHeroesByPage().then((heroes) => console.log({ heroes }));
  // }, []);

  const { favoriteCount, favorites } = use(FavoriteHeroContext);

  const heroes = heroesResponse?.heroes ?? [];
  return (
    <>
      <>
        {/* Header */}
        <CustomJumbotron
          title="Universo de Super heroes"
          description="Descubre, explora, y administra tus superheroes y villanos favoritos"
        />

        <CustomBreadcrumbs currentPage="Super Héroes" />

        {/* Stats Dashboard */}
        <HeroStarts />

        {/* Tabs */}
        <Tabs value={selectedTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger
              value="all"
              onClick={() => {
                setSearchParams((prev) => {
                  prev.set("tab", "all");
                  prev.set("category", "all");
                  prev.set("page", "1");
                  return prev;
                });
              }}
            >
              All Characters ({summary?.totalHeroes})
            </TabsTrigger>
            <TabsTrigger
              value="favorites"
              className="flex items-center gap-2"
              onClick={() => {
                setSearchParams((prev) => {
                  prev.set("tab", "favorites");
                  return prev;
                });
              }}
            >
              <Heart className="h-4 w-4" />
              Favorites ({favoriteCount})
            </TabsTrigger>
            <TabsTrigger
              value="heroes"
              onClick={() => {
                setSearchParams((prev) => {
                  prev.set("tab", "heroes");
                  prev.set("category", "hero");
                  prev.set("page", "1");
                  return prev;
                });
              }}
            >
              Heroes ({summary?.heroCount})
            </TabsTrigger>
            <TabsTrigger
              value="villains"
              onClick={() => {
                setSearchParams((prev) => {
                  prev.set("tab", "villains");
                  prev.set("category", "villain");
                  prev.set("page", "1");
                  return prev;
                });
              }}
            >
              Villains ({summary?.villainCount})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <HeroGrid heroes={heroes} />
          </TabsContent>
          <TabsContent value="favorites">
            <h1>Favoritos</h1>
            <HeroGrid heroes={favorites} />
          </TabsContent>
          <TabsContent value="heroes">
            <h1>Heroes</h1>
            <HeroGrid heroes={heroes} />
          </TabsContent>
          <TabsContent value="villains">
            <h1>Villanos</h1>
            <HeroGrid heroes={heroes} />
          </TabsContent>
        </Tabs>

        {/* Character Grid */}

        {/* Pagination */}
        {selectedTab !== "favorites" && (
          <CustomPagination totalPages={heroesResponse?.pages ?? 1} />
        )}
      </>
    </>
  );
}
