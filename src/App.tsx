import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppNav } from "@/components/AppNav";
import { Home } from "@/pages/Home";
import { Marketplace } from "@/pages/Marketplace";
import { MyAgents } from "@/pages/MyAgents";
import { Builder } from "@/pages/Builder";
import { Earnings } from "@/pages/Earnings";
import { Pricing } from "@/pages/Pricing";
import { SignInModal } from "@/components/SignInModal";
import "@xyflow/react/dist/style.css";

const queryClient = new QueryClient();

export type View = "home" | "marketplace" | "my-agents" | "builder" | "earnings" | "pricing";

function AppContent() {
  const [activeView, setActiveView] = useState<View>("home");
  const [signInOpen, setSignInOpen] = useState(false);
  const [signInMode, setSignInMode] = useState<"signin" | "signup">("signin");

  const openSignIn = (mode: "signin" | "signup" = "signin") => {
    setSignInMode(mode);
    setSignInOpen(true);
  };

  const isHome = activeView === "home";

  const renderView = () => {
    switch (activeView) {
      case "home":        return <Home onNavigate={setActiveView} onSignIn={openSignIn} />;
      case "marketplace": return <Marketplace />;
      case "my-agents":  return <MyAgents />;
      case "builder":    return <Builder />;
      case "earnings":   return <Earnings />;
      case "pricing":    return <Pricing onNavigate={setActiveView} onSignIn={openSignIn} />;
    }
  };

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden" style={{ background: "#0a0c12" }}>
      {/* AppNav shown on all non-home views */}
      {!isHome && (
        <AppNav
          activeView={activeView}
          onNavigate={setActiveView}
          onSignIn={openSignIn}
        />
      )}

      {/* Page content */}
      <main
        className="flex-1 flex flex-col overflow-hidden"
        style={!isHome ? { paddingTop: "56px" } : {}}
      >
        {renderView()}
      </main>

      <SignInModal
        open={signInOpen}
        onClose={() => setSignInOpen(false)}
        mode={signInMode}
      />
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AppContent />
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}
