
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Championships from "./pages/Championships";
import Championship from "./pages/Championship";
import ChampionshipDetails from "./pages/ChampionshipDetails";
import ChampionshipRules from "./pages/ChampionshipRules";
import Terms from "./pages/Terms";
import Complaint from "./pages/Complaint";
import Edit from "./pages/Edit";
import NotFound from "./pages/NotFound";
import Players from "./pages/Players";
import PlayerProfile from "./pages/PlayerProfile";
import Arenas from "./pages/Arenas";
import ArenaDetails from "./pages/ArenaDetails";
import CreateTeam from "./pages/CreateTeam";
import SelectPlayer from "./pages/SelectPlayer";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Index />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/terms" element={<Terms />} />
            
            {/* Protected routes */}
            <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/championships" element={<ProtectedRoute><Championships /></ProtectedRoute>} />
            <Route path="/championship/:id" element={<ProtectedRoute><Championship /></ProtectedRoute>} />
            <Route path="/championship/:id/details" element={<ProtectedRoute><ChampionshipDetails /></ProtectedRoute>} />
            <Route path="/championship/:id/rules" element={<ProtectedRoute><ChampionshipRules /></ProtectedRoute>} />
            <Route path="/create-team/:id" element={<ProtectedRoute><CreateTeam /></ProtectedRoute>} />
            <Route path="/select-player" element={<ProtectedRoute><SelectPlayer /></ProtectedRoute>} />
            <Route path="/players" element={<ProtectedRoute><Players /></ProtectedRoute>} />
            <Route path="/player/:id" element={<ProtectedRoute><PlayerProfile /></ProtectedRoute>} />
            <Route path="/complaint" element={<ProtectedRoute><Complaint /></ProtectedRoute>} />
            <Route path="/edit" element={<ProtectedRoute><Edit /></ProtectedRoute>} />
            <Route path="/arenas" element={<ProtectedRoute><Arenas /></ProtectedRoute>} />
            <Route path="/arena/:id" element={<ProtectedRoute><ArenaDetails /></ProtectedRoute>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </TooltipProvider>
      </AuthProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
