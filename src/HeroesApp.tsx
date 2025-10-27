import { RouterProvider } from "react-router";
import { appRouter } from "./routes/app.router";

function HeroesApp() {
  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  );
}
export default HeroesApp;
