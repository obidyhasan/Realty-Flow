import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Router from "./router/Router.jsx";
import AuthProvider from "./providers/AuthProvider.jsx";
import { ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Create a client
const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ToastContainer />
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router></Router>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
