import { Badge } from "@/components/ui/badge";
import { Users, Heart, Zap, Trophy } from "lucide-react";
import { HeroStartCard } from "./HeroStartCard";
import { useHeroSummary } from "@/hooks/useHeroSummary";
import { use } from "react";
import { FavoriteHeroContext } from "@/useContext/FavoriteHeroContextProvider";

export const HeroStarts = () => {
  const { data: summary } = useHeroSummary();
  // const { data: summary } = useQuery({
  //   queryKey: ["summary-information"],
  //   queryFn: getSummaryAction,
  //   staleTime: 6000 * 5,
  // });
  const { favoriteCount } = use(FavoriteHeroContext);
  if (!summary) {
    return <h2>Cargando...</h2>;
  }
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      <HeroStartCard
        title="Total de personajes"
        icon={<Users className="h-4 w-4 text-muted-foreground" />}
      >
        <div className="text-2xl font-bold">{summary?.totalHeroes}</div>
        <div className="flex gap-1 mt-2">
          <Badge variant="secondary" className="text-xs">
            {summary?.heroCount} Heroes
          </Badge>
          <Badge variant="destructive" className="text-xs">
            {summary?.villainCount} Villains
          </Badge>
        </div>
      </HeroStartCard>
      <HeroStartCard
        title="favoritos"
        icon={<Heart className="h-4 w-4 text-muted-foreground" />}
      >
        <div className="text-2xl font-bold text-red-600">{favoriteCount}</div>
        <p className="text-xs text-muted-foreground">
          {((favoriteCount / summary?.totalHeroes) * 100).toFixed(2)}% of total
        </p>
      </HeroStartCard>

      <HeroStartCard
        title="Fuerte"
        icon={<Zap className="h-4 w-4 text-muted-foreground" />}
      >
        <div className="text-lg font-bold">{summary?.strongestHero.alias}</div>
        <p className="text-xs text-muted-foreground">
          Strength: {summary?.strongestHero.strength}/10
        </p>
      </HeroStartCard>

      <HeroStartCard
        title="Inteligente"
        icon={<Trophy className="h-4 w-4 text-muted-foreground" />}
      >
        <div className="text-lg font-bold">{summary?.smartestHero.alias}</div>
        <p className="text-xs text-muted-foreground">
          Intelligence: {summary?.smartestHero.intelligence}/10
        </p>
      </HeroStartCard>
    </div>
  );
};
