import React from "react";
import "./App.css"; 
import { useRoutes } from "react-router-dom";
import routes from "./Router/Router";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'


function App() {
  const queryClient = new QueryClient()

const router = useRoutes(routes)
  return (
    <>
     <QueryClientProvider client={queryClient}>
    {
      router
    }
    </QueryClientProvider>
    </>
  );
}

export default App;
