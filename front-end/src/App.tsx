import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const App: React.FC = () => (
  <Router>
    <QueryClientProvider client={new QueryClient()}>
      <AppRoutes />
    </QueryClientProvider>
  </Router>
);

export default App;
