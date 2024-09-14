import { ReactNode } from "react";
import Home from "../Pages/Home/Home";
import NotFound from "../Pages/NotFound/NotFound";

// Define route type with ReactElement
type Route = {
  path: string;
  element: ReactNode;
};
 const routes: Route[] = [
  {
    path: "/",
    element: <Home/> , 
  },
  {
    path: "/*",
    element: <NotFound/> , 
  },
];

export default routes;
