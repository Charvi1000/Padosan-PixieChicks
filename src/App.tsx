import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { Login } from "./pages/Login";
import { EnterPadosan } from "./pages/EnterPadosan";
import { Chat } from "./pages/Chat";
import { BudgetSplitwise } from "./pages/BudgetSplitwise";
import { PGSuggestions } from "./pages/PGSuggestions";
import { PersonalBudget } from "./pages/PersonalBudget";
import { SOS } from "./pages/SOS";
import { MutualFriends } from "./pages/MutualFriends";
import { FamilyMode } from "./pages/FamilyMode";
import { AuthProvider } from "./contexts/AuthContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
                  <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/enter-padosan" element={<EnterPadosan />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/budget-splitwise" element={<BudgetSplitwise />} />
          <Route path="/pg-suggestions" element={<PGSuggestions />} />
          <Route path="/budget-options" element={<PersonalBudget />} />
          <Route path="/sos" element={<SOS />} />
          <Route path="/mutual-friends" element={<MutualFriends />} />
          <Route path="/family-mode" element={<FamilyMode />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
