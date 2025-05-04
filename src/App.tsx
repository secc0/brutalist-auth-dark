
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import NotFound from "./pages/NotFound";
import ProductDetail from "./pages/ProductDetail";
import QuotedItems from "./pages/QuotedItems";
import ReadyToShipItems from "./pages/ReadyToShipItems";
import MyQuotes from "./pages/MyQuotes";
import MyOrders from "./pages/MyOrders";

const queryClient = new QueryClient();

const App = () => {
  const isAuthenticated = !!localStorage.getItem('user');

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/products/:id" element={isAuthenticated ? <ProductDetail /> : <Navigate to="/login" />} />
            <Route path="/quoted-items" element={isAuthenticated ? <QuotedItems /> : <Navigate to="/login" />} />
            <Route path="/ready-to-ship" element={isAuthenticated ? <ReadyToShipItems /> : <Navigate to="/login" />} />
            <Route path="/my-quotes" element={isAuthenticated ? <MyQuotes /> : <Navigate to="/login" />} />
            <Route path="/my-orders" element={isAuthenticated ? <MyOrders /> : <Navigate to="/login" />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
