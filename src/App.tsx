
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Context Providers
import { AuthProvider } from "@/contexts/AuthContext";

// Pages
import Index from "@/pages/Index";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Home from "@/pages/Home";
import NotFound from "@/pages/NotFound";
import ForgotPassword from "@/pages/ForgotPassword";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Championships from "@/pages/Championships";
import Championship from "@/pages/Championship";
import ChampionshipDetails from "@/pages/ChampionshipDetails";
import ChampionshipRules from "@/pages/ChampionshipRules";
import Arenas from "@/pages/Arenas";
import ArenaDetails from "@/pages/ArenaDetails";
import Players from "@/pages/Players";
import PlayerProfile from "@/pages/PlayerProfile";
import Profile from "@/pages/Profile";
import Edit from "@/pages/Edit";
import CreateTeam from "@/pages/CreateTeam";
import SelectPlayer from "@/pages/SelectPlayer";
import Terms from "@/pages/Terms";
import Complaint from "@/pages/Complaint";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/terms" element={<Terms />} />
            
            {/* Protected Routes */}
            <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="/championships" element={<ProtectedRoute><Championships /></ProtectedRoute>} />
            <Route path="/championship/:id" element={<ProtectedRoute><Championship /></ProtectedRoute>} />
            <Route path="/championship/:id/details" element={<ProtectedRoute><ChampionshipDetails /></ProtectedRoute>} />
            <Route path="/championship/:id/rules" element={<ProtectedRoute><ChampionshipRules /></ProtectedRoute>} />
            <Route path="/create-team/:id" element={<ProtectedRoute><CreateTeam /></ProtectedRoute>} />
            <Route path="/select-player" element={<ProtectedRoute><SelectPlayer /></ProtectedRoute>} />
            <Route path="/arenas" element={<ProtectedRoute><Arenas /></ProtectedRoute>} />
            <Route path="/arena/:id" element={<ProtectedRoute><ArenaDetails /></ProtectedRoute>} />
            <Route path="/players" element={<ProtectedRoute><Players /></ProtectedRoute>} />
            <Route path="/player/:id" element={<ProtectedRoute><PlayerProfile /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/edit" element={<ProtectedRoute><Edit /></ProtectedRoute>} />
            <Route path="/complaint" element={<ProtectedRoute><Complaint /></ProtectedRoute>} />
            
            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
        <Toaster position="top-center" />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
