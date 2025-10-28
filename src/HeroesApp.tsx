import { RouterProvider } from "react-router";
import { appRouter } from "./routes/app.router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { FavoriteHeroProvider } from "./useContext/FavoriteHeroContext";


function HeroesApp() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <FavoriteHeroProvider>
        <RouterProvider router={appRouter} />
        <ReactQueryDevtools initialIsOpen={false} />
      </FavoriteHeroProvider>
    </QueryClientProvider>
  );
}
export default HeroesApp;
