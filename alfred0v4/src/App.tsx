import { useState } from "react";
import { LanguageProvider } from "./contexts/LanguageContext";
import { TokenConfigProvider } from "./contexts/TokenConfigContext";
import { PhaseConfigProvider } from "./contexts/PhaseConfigContext";
import { IntroScreen } from "./components/IntroScreen";
import { TeamSetup } from "./components/TeamSetup";
import { Phase1 } from "./components/phases/Phase1";
import { Phase2 } from "./components/phases/Phase2";
import { Phase3 } from "./components/phases/Phase3";
import { Phase4 } from "./components/phases/Phase4";
import { Phase5 } from "./components/phases/Phase5";
import { TransitionScreen } from "./components/TransitionScreen";
import { CompletionScreen } from "./components/CompletionScreen";
import { AdminLogin } from "./components/AdminLogin";
import { AdminDashboard } from "./components/AdminDashboard";

type Screen = 'intro' | 'team-setup' | 'game' | 'transition' | 'complete' | 'admin-login' | 'admin-dashboard';

function AppContent() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('intro');
  const [currentPhase, setCurrentPhase] = useState(1);
  const [tokens, setTokens] = useState(0);
  const [teamName, setTeamName] = useState("");
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  // Nombre establecido por admin remoto (simulado)
  const [adminSetTeamName] = useState<string | undefined>(undefined);
  
  const totalPhases = 5;
  
  const handleStart = () => {
    setCurrentScreen('team-setup');
  };

  const handleTeamSetup = (name: string) => {
    setTeamName(name);
    setCurrentScreen('game');
    setCurrentPhase(1);
    setTokens(0);
  };
  
  const handleGameComplete = (tokensEarned: number) => {
    setTokens(prev => prev + tokensEarned);
    
    if (currentPhase < totalPhases) {
      setCurrentScreen('transition');
    } else {
      setCurrentScreen('complete');
    }
  };
  
  const handleTransitionContinue = () => {
    setCurrentPhase(prev => prev + 1);
    setCurrentScreen('game');
  };
  
  const handleRestart = () => {
    setCurrentScreen('intro');
    setCurrentPhase(1);
    setTokens(0);
    setTeamName("");
  };

  const handleAdminAccess = () => {
    setCurrentScreen('admin-login');
  };

  const handleAdminLogin = (success: boolean) => {
    if (success) {
      setIsAdminLoggedIn(true);
      setCurrentScreen('admin-dashboard');
    }
  };

  const handleAdminLogout = () => {
    setIsAdminLoggedIn(false);
    setCurrentScreen('intro');
  };

  const handleBackFromAdmin = () => {
    setCurrentScreen('intro');
  };
  
  // Función para renderizar la fase actual del juego
  const renderGamePhase = () => {
    const phaseProps = {
      teamName,
      onComplete: handleGameComplete
    };

    switch (currentPhase) {
      case 1:
        return <Phase1 {...phaseProps} />;
      case 2:
        return <Phase2 {...phaseProps} />;
      case 3:
        return <Phase3 {...phaseProps} />;
      case 4:
        return <Phase4 {...phaseProps} />;
      case 5:
        return <Phase5 {...phaseProps} />;
      default:
        return <Phase1 {...phaseProps} />;
    }
  };

  switch (currentScreen) {
    case 'intro':
      return <IntroScreen onStart={handleStart} onAdminAccess={handleAdminAccess} />;
      
    case 'team-setup':
      return (
        <TeamSetup
          onContinue={handleTeamSetup}
          adminSetTeamName={adminSetTeamName}
        />
      );
      
    case 'game':
      return renderGamePhase();
      
    case 'transition':
      return (
        <TransitionScreen
          phase={currentPhase}
          tokens={tokens}
          teamName={teamName}
          onContinue={handleTransitionContinue}
        />
      );
      
    case 'complete':
      return (
        <CompletionScreen
          tokens={tokens}
          teamName={teamName}
          onRestart={handleRestart}
        />
      );

    case 'admin-login':
      return (
        <AdminLogin
          onLogin={handleAdminLogin}
          onBack={handleBackFromAdmin}
        />
      );

    case 'admin-dashboard':
      return (
        <AdminDashboard
          onLogout={handleAdminLogout}
          tokens={tokens}
        />
      );
      
    default:
      return <IntroScreen onStart={handleStart} onAdminAccess={handleAdminAccess} />;
  }
}

export default function App() {
  return (
    <LanguageProvider>
      <TokenConfigProvider>
        <PhaseConfigProvider>
          <AppContent />
        </PhaseConfigProvider>
      </TokenConfigProvider>
    </LanguageProvider>
  );
}