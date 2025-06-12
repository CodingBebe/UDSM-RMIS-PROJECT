import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/auth/Login";


// Risk Champion Pages
//import ChampionDashboard from "./pages/champion/Dashboard";
//import SubmitRisk from "./pages/champion/SubmitRisk";

// Risk Coordinator Pages
import CoordinatorLayout from "@/components/layout/CoordinatorLayout";
import Dashboard from "@/pages/riskCoordinator/Dashboard";
import RegisterRisk from "@/pages/riskCoordinator/RegisterRisk";
import RiskChampions from "@/pages/riskCoordinator/RiskChampions";
import GenerateReportsPage from "@/pages/riskCoordinator/GenerateReportsPage";
import Notifications from "@/pages/riskCoordinator/Notifications";

// Committee Pages
import CommitteeLayout from "@/components/layout/CommitteeLayout";
import CommitteeDashboard from "@/pages/riskCommittee/Dashboard";
import RiskHeatmap from "@/pages/riskCommittee/RiskHeatmap";
import MitigationProgress from "@/pages/riskCommittee/MitigationProgress";
import TrendAnalysis from "@/pages/riskCommittee/TrendAnalysis";

// DVC Pages
//import DVCDashboard from "./pages/dvc/Dashboard";

// General Pages
//import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
           <Route path="/" element={<Login />} />
          
          {/* Risk Champion Routes */}
          {/*<Route path="/champion/dashboard" element={<ChampionDashboard />} />
          <Route path="/champion/submit-risk" element={<SubmitRisk />} />*/}
          
          {/* Risk Coordinator Routes */}
          <Route path="/coordinator" element={<CoordinatorLayout/>}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="register-risk" element={<RegisterRisk />} />
          <Route path="risk-champions" element={<RiskChampions />} />
          <Route path="generate-reports" element={<GenerateReportsPage />} />
          <Route path="notifications" element={<Notifications />} />
          </Route>
          {/* Committee Routes */}
          <Route path="/committee" element={<CommitteeLayout />}>
            <Route path="dashboard" element={<CommitteeDashboard />} />
            <Route path="risk-heatmap" element={<RiskHeatmap />} />
            <Route path="mitigation-progress" element={<MitigationProgress />} />
            <Route path="trend-analysis" element={<TrendAnalysis />} />
          </Route>
          
          {/* DVC Routes */}
           {/*<Route path="/dvc/dashboard" element={<DVCDashboard />} />*/}
          
          {/* Catch-all */}
           {/*<Route path="*" element={<NotFound />} /> */}
        </Routes>
      </BrowserRouter>
   </TooltipProvider>
  </QueryClientProvider>
);

export default App;
