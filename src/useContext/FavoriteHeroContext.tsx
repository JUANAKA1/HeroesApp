import type { Hero } from "@/heroes/types/hero.interface";
import { useEffect, useState, type PropsWithChildren } from "react";
import { FavoriteHeroContext } from "./FavoriteHeroContextProvider";

const getFavoritesFromLocalStorage = (): Hero[] => {
  const favorites = localStorage.getItem("favorites");
  return favorites ? JSON.parse(favorites) : [];
};

export const FavoriteHeroProvider = ({ children }: PropsWithChildren) => {
  const [favorites, setFavorites] = useState<Hero[]>(
    getFavoritesFromLocalStorage()
  );
  const toggleFavorite = (hero: Hero) => {
    const heroExist = favorites.find((h) => h.id === hero.id);

    if (heroExist) {
      const newFavorites = favorites.filter((h) => h.id !== hero.id);
      setFavorites(newFavorites);
      return;
    }
    setFavorites([...favorites, hero]);
  };

  const isFavorite = (hero: Hero) => {
    return favorites.some((h) => h.id === hero.id);
  };

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  return (
    <FavoriteHeroContext
      value={{
        favorites: favorites,
        favoriteCount: favorites.length,

        isFavorite: isFavorite,
        toggleFavorite: toggleFavorite,
      }}
    >
      {children}
    </FavoriteHeroContext>
  );
};
