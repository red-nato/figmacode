import React, { createContext, useContext, useState, useEffect } from 'react';
import { PhaseTokenConfig, TokenCalculator, DEFAULT_TOKEN_CONFIG, TOKEN_PRESETS } from '../utils/tokenConfig';

interface TokenConfigContextType {
  config: PhaseTokenConfig;
  calculator: TokenCalculator;
  updateConfig: (config: PhaseTokenConfig) => void;
  loadPreset: (presetId: string) => void;
  resetToDefault: () => void;
  getAvailablePresets: () => typeof TOKEN_PRESETS;
  getCurrentPresetId: () => string | null;
}

const TokenConfigContext = createContext<TokenConfigContextType | undefined>(undefined);

export function useTokenConfig(): TokenConfigContextType {
  const context = useContext(TokenConfigContext);
  if (!context) {
    throw new Error('useTokenConfig must be used within a TokenConfigProvider');
  }
  return context;
}

interface TokenConfigProviderProps {
  children: React.ReactNode;
}

export function TokenConfigProvider({ children }: TokenConfigProviderProps) {
  const [config, setConfig] = useState<PhaseTokenConfig>(DEFAULT_TOKEN_CONFIG);
  const [calculator, setCalculator] = useState(new TokenCalculator(DEFAULT_TOKEN_CONFIG));
  const [currentPresetId, setCurrentPresetId] = useState<string | null>('balanced');

  // Load config from localStorage on mount
  useEffect(() => {
    const savedConfig = localStorage.getItem('alfred0-token-config');
    const savedPresetId = localStorage.getItem('alfred0-current-preset');
    
    if (savedConfig) {
      try {
        const parsedConfig = JSON.parse(savedConfig);
        setConfig(parsedConfig);
        setCalculator(new TokenCalculator(parsedConfig));
      } catch (error) {
        console.error('Error loading saved token config:', error);
      }
    }
    
    if (savedPresetId) {
      setCurrentPresetId(savedPresetId);
    }
  }, []);

  // Save config to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('alfred0-token-config', JSON.stringify(config));
    calculator.updateConfig(config);
  }, [config, calculator]);

  const updateConfig = (newConfig: PhaseTokenConfig) => {
    setConfig(newConfig);
    setCurrentPresetId(null); // Custom config, no preset selected
    localStorage.removeItem('alfred0-current-preset');
  };

  const loadPreset = (presetId: string) => {
    const preset = TOKEN_PRESETS.find(p => p.id === presetId);
    if (preset) {
      setConfig(preset.config);
      setCurrentPresetId(presetId);
      localStorage.setItem('alfred0-current-preset', presetId);
    }
  };

  const resetToDefault = () => {
    setConfig(DEFAULT_TOKEN_CONFIG);
    setCurrentPresetId('balanced');
    localStorage.setItem('alfred0-current-preset', 'balanced');
  };

  const getAvailablePresets = () => TOKEN_PRESETS;

  const getCurrentPresetId = () => currentPresetId;

  const value: TokenConfigContextType = {
    config,
    calculator,
    updateConfig,
    loadPreset,
    resetToDefault,
    getAvailablePresets,
    getCurrentPresetId,
  };

  return (
    <TokenConfigContext.Provider value={value}>
      {children}
    </TokenConfigContext.Provider>
  );
}