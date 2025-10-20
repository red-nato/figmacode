import React, { createContext, useContext, useState, useEffect } from 'react';
import { PhaseConfig, GameSettings, PhaseManager, Question, DEFAULT_GAME_SETTINGS } from '../utils/phaseConfig';

interface PhaseConfigContextType {
  // Phase management
  phases: PhaseConfig[];
  activePhases: PhaseConfig[];
  getPhaseById: (id: string) => PhaseConfig | undefined;
  addPhase: (phase: Omit<PhaseConfig, 'id' | 'order'>) => PhaseConfig;
  updatePhase: (id: string, updates: Partial<PhaseConfig>) => boolean;
  deletePhase: (id: string) => boolean;
  movePhase: (id: string, direction: 'up' | 'down') => boolean;
  
  // Settings management
  settings: GameSettings;
  updateSettings: (updates: Partial<GameSettings>) => void;
  
  // Question management
  addQuestionToPhase: (phaseId: string, question: Omit<Question, 'id'>) => boolean;
  updateQuestionInPhase: (phaseId: string, questionId: string, updates: Partial<Question>) => boolean;
  deleteQuestionFromPhase: (phaseId: string, questionId: string) => boolean;
  
  // Persistence
  saveConfig: () => void;
  loadConfig: () => void;
  exportConfig: () => string;
  importConfig: (configJson: string) => boolean;
  resetToDefault: () => void;
}

const PhaseConfigContext = createContext<PhaseConfigContextType | undefined>(undefined);

export function usePhaseConfig(): PhaseConfigContextType {
  const context = useContext(PhaseConfigContext);
  if (!context) {
    throw new Error('usePhaseConfig must be used within a PhaseConfigProvider');
  }
  return context;
}

interface PhaseConfigProviderProps {
  children: React.ReactNode;
}

export function PhaseConfigProvider({ children }: PhaseConfigProviderProps) {
  const [manager] = useState(new PhaseManager());
  const [phases, setPhases] = useState<PhaseConfig[]>([]);
  const [settings, setSettings] = useState<GameSettings>(DEFAULT_GAME_SETTINGS);

  // Load config on mount
  useEffect(() => {
    loadConfig();
  }, []);

  // Update state when manager changes
  const refreshState = () => {
    setPhases([...manager.getAllPhases()]);
    setSettings({ ...manager.getSettings() });
  };

  const loadConfig = () => {
    manager.loadFromLocalStorage();
    refreshState();
  };

  const saveConfig = () => {
    manager.saveToLocalStorage();
  };

  const addPhase = (phase: Omit<PhaseConfig, 'id' | 'order'>): PhaseConfig => {
    const newPhase = manager.addPhase(phase);
    refreshState();
    saveConfig();
    return newPhase;
  };

  const updatePhase = (id: string, updates: Partial<PhaseConfig>): boolean => {
    const success = manager.updatePhase(id, updates);
    if (success) {
      refreshState();
      saveConfig();
    }
    return success;
  };

  const deletePhase = (id: string): boolean => {
    const success = manager.deletePhase(id);
    if (success) {
      refreshState();
      saveConfig();
    }
    return success;
  };

  const movePhase = (id: string, direction: 'up' | 'down'): boolean => {
    const success = manager.movePhase(id, direction);
    if (success) {
      refreshState();
      saveConfig();
    }
    return success;
  };

  const updateSettings = (updates: Partial<GameSettings>): void => {
    manager.updateSettings(updates);
    refreshState();
    saveConfig();
  };

  const addQuestionToPhase = (phaseId: string, question: Omit<Question, 'id'>): boolean => {
    const success = manager.addQuestionToPhase(phaseId, question);
    if (success) {
      refreshState();
      saveConfig();
    }
    return success;
  };

  const updateQuestionInPhase = (phaseId: string, questionId: string, updates: Partial<Question>): boolean => {
    const success = manager.updateQuestionInPhase(phaseId, questionId, updates);
    if (success) {
      refreshState();
      saveConfig();
    }
    return success;
  };

  const deleteQuestionFromPhase = (phaseId: string, questionId: string): boolean => {
    const success = manager.deleteQuestionFromPhase(phaseId, questionId);
    if (success) {
      refreshState();
      saveConfig();
    }
    return success;
  };

  const exportConfig = (): string => {
    return manager.exportConfig();
  };

  const importConfig = (configJson: string): boolean => {
    const success = manager.importConfig(configJson);
    if (success) {
      refreshState();
    }
    return success;
  };

  const resetToDefault = (): void => {
    localStorage.removeItem('alfred0-phases');
    localStorage.removeItem('alfred0-game-settings');
    manager.loadFromLocalStorage();
    refreshState();
  };

  const value: PhaseConfigContextType = {
    phases,
    activePhases: manager.getActivePhases(),
    getPhaseById: (id: string) => manager.getPhaseById(id),
    addPhase,
    updatePhase,
    deletePhase,
    movePhase,
    settings,
    updateSettings,
    addQuestionToPhase,
    updateQuestionInPhase,
    deleteQuestionFromPhase,
    saveConfig,
    loadConfig,
    exportConfig,
    importConfig,
    resetToDefault,
  };

  return (
    <PhaseConfigContext.Provider value={value}>
      {children}
    </PhaseConfigContext.Provider>
  );
}