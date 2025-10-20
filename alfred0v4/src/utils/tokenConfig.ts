// Token configuration system for customizable scoring

export interface TokenReward {
  base: number;
  bonus?: number;
  timeBonus?: number;
  perfectScore?: number;
}

export interface PhaseTokenConfig {
  phase1: {
    completion: number;
    timeBonus: number;
    perfectAnagram: number;
    perfectWordSearch: number;
  };
  phase2: {
    completion: number;
    challengeSelection: number;
  };
  phase3: {
    correct: number;
    incorrect: number;
  };
  phase4: {
    correct: number;
    incorrect: number;
  };
  phase5: {
    correct: number;
    incorrect: number;
  };
}

export interface TokenConfigPreset {
  id: string;
  name: string;
  description: string;
  config: PhaseTokenConfig;
}

// Default token configuration
export const DEFAULT_TOKEN_CONFIG: PhaseTokenConfig = {
  phase1: {
    completion: 15,
    timeBonus: 10,
    perfectAnagram: 5,
    perfectWordSearch: 5,
  },
  phase2: {
    completion: 20,
    challengeSelection: 5,
  },
  phase3: {
    correct: 25,
    incorrect: 5,
  },
  phase4: {
    correct: 30,
    incorrect: 10,
  },
  phase5: {
    correct: 35,
    incorrect: 15,
  },
};

// Preset configurations for different game modes
export const TOKEN_PRESETS: TokenConfigPreset[] = [
  {
    id: 'balanced',
    name: 'Equilibrado',
    description: 'Distribución balanceada de tokens para una experiencia estándar',
    config: DEFAULT_TOKEN_CONFIG,
  },
  {
    id: 'high-stakes',
    name: 'Alto Riesgo',
    description: 'Mayores recompensas pero también mayores riesgos por errores',
    config: {
      phase1: {
        completion: 20,
        timeBonus: 15,
        perfectAnagram: 10,
        perfectWordSearch: 10,
      },
      phase2: {
        completion: 30,
        challengeSelection: 10,
      },
      phase3: {
        correct: 40,
        incorrect: 0,
      },
      phase4: {
        correct: 50,
        incorrect: 0,
      },
      phase5: {
        correct: 60,
        incorrect: 0,
      },
    },
  },
  {
    id: 'learning-focused',
    name: 'Enfoque Educativo',
    description: 'Premia la participación y el aprendizaje sobre la perfección',
    config: {
      phase1: {
        completion: 20,
        timeBonus: 5,
        perfectAnagram: 3,
        perfectWordSearch: 3,
      },
      phase2: {
        completion: 25,
        challengeSelection: 10,
      },
      phase3: {
        correct: 20,
        incorrect: 15,
      },
      phase4: {
        correct: 25,
        incorrect: 20,
      },
      phase5: {
        correct: 30,
        incorrect: 25,
      },
    },
  },
  {
    id: 'competitive',
    name: 'Competitivo',
    description: 'Máximas recompensas para respuestas perfectas y rápidas',
    config: {
      phase1: {
        completion: 25,
        timeBonus: 20,
        perfectAnagram: 15,
        perfectWordSearch: 15,
      },
      phase2: {
        completion: 35,
        challengeSelection: 5,
      },
      phase3: {
        correct: 50,
        incorrect: 5,
      },
      phase4: {
        correct: 60,
        incorrect: 5,
      },
      phase5: {
        correct: 75,
        incorrect: 5,
      },
    },
  },
];

// Token calculation utilities
export class TokenCalculator {
  private config: PhaseTokenConfig;

  constructor(config: PhaseTokenConfig = DEFAULT_TOKEN_CONFIG) {
    this.config = config;
  }

  updateConfig(config: PhaseTokenConfig) {
    this.config = config;
  }

  calculatePhase1Tokens(params: {
    completed: boolean;
    timeRemaining?: number;
    totalTime?: number;
    perfectAnagram?: boolean;
    perfectWordSearch?: boolean;
  }): number {
    const { completed, timeRemaining = 0, totalTime = 180, perfectAnagram = false, perfectWordSearch = false } = params;
    
    let tokens = 0;
    
    if (completed) {
      tokens += this.config.phase1.completion;
      
      // Time bonus (more time remaining = more bonus)
      if (timeRemaining > 0 && totalTime > 0) {
        const timePercentage = timeRemaining / totalTime;
        if (timePercentage > 0.5) {
          tokens += this.config.phase1.timeBonus;
        } else if (timePercentage > 0.25) {
          tokens += Math.floor(this.config.phase1.timeBonus * 0.5);
        }
      }
      
      // Perfect performance bonuses
      if (perfectAnagram) {
        tokens += this.config.phase1.perfectAnagram;
      }
      
      if (perfectWordSearch) {
        tokens += this.config.phase1.perfectWordSearch;
      }
    }
    
    return tokens;
  }

  calculatePhase2Tokens(params: {
    challengeSelected: boolean;
    storyRead: boolean;
  }): number {
    const { challengeSelected, storyRead } = params;
    
    let tokens = 0;
    
    if (challengeSelected) {
      tokens += this.config.phase2.challengeSelection;
    }
    
    if (storyRead) {
      tokens += this.config.phase2.completion;
    }
    
    return tokens;
  }

  calculatePhase3Tokens(isCorrect: boolean): number {
    return isCorrect ? this.config.phase3.correct : this.config.phase3.incorrect;
  }

  calculatePhase4Tokens(isCorrect: boolean): number {
    return isCorrect ? this.config.phase4.correct : this.config.phase4.incorrect;
  }

  calculatePhase5Tokens(isCorrect: boolean): number {
    return isCorrect ? this.config.phase5.correct : this.config.phase5.incorrect;
  }

  getMaxPossibleTokens(): number {
    return (
      this.config.phase1.completion +
      this.config.phase1.timeBonus +
      this.config.phase1.perfectAnagram +
      this.config.phase1.perfectWordSearch +
      this.config.phase2.completion +
      this.config.phase2.challengeSelection +
      this.config.phase3.correct +
      this.config.phase4.correct +
      this.config.phase5.correct
    );
  }

  getCurrentConfig(): PhaseTokenConfig {
    return { ...this.config };
  }
}

// Global token calculator instance
export const tokenCalculator = new TokenCalculator();