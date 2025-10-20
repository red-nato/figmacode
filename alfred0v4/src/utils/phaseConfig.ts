// Phase configuration system for dynamic game management

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

export interface PhaseConfig {
  id: string;
  title: string;
  description: string;
  type: 'timed-challenge' | 'story-selection' | 'multiple-choice' | 'custom';
  timeLimit?: number; // in seconds
  questions?: Question[];
  content?: any; // For custom phase content
  isActive: boolean;
  order: number;
}

export interface GameSettings {
  gameName: string;
  gameDescription: string;
  showTokensToPlayers: boolean;
  totalPhases: number;
  teamNameRequired: boolean;
  allowTeamNameChange: boolean;
  maxTeamNameLength: number;
  gameLanguages: string[];
  defaultLanguage: string;
}

// Default game settings
export const DEFAULT_GAME_SETTINGS: GameSettings = {
  gameName: "Alfred0 - Desafío Emprendedor",
  gameDescription: "Un juego interactivo de emprendimiento donde los equipos enfrentan desafíos empresariales reales",
  showTokensToPlayers: false,
  totalPhases: 5,
  teamNameRequired: true,
  allowTeamNameChange: true,
  maxTeamNameLength: 30,
  gameLanguages: ["es", "en"],
  defaultLanguage: "es",
};

// Default phase configurations
export const DEFAULT_PHASES: PhaseConfig[] = [
  {
    id: "phase-1",
    title: "Desafíos Mentales",
    description: "Cronómetro de 3 minutos con anagramas y sopas de letras sobre emprendimiento",
    type: "timed-challenge",
    timeLimit: 180,
    isActive: true,
    order: 1,
    content: {
      timerDuration: 180,
      challenges: ["anagram", "wordsearch"],
      topics: ["entrepreneurship"]
    }
  },
  {
    id: "phase-2",
    title: "Identificación de Problemas",
    description: "Selección de desafíos empresariales con historias contextuales",
    type: "story-selection",
    isActive: true,
    order: 2,
    content: {
      challenges: [
        {
          id: "tech-seniors",
          title: "Tecnología para Adultos Mayores",
          story: "María, de 68 años, quiere comunicarse con su familia..."
        },
        {
          id: "fast-fashion",
          title: "Fast Fashion y Zonas de Desechos",
          story: "En Ghana, montañas de ropa usada..."
        },
        {
          id: "water-agriculture",
          title: "Sustentabilidad del Agua en Agricultura",
          story: "Los agricultores de California enfrentan..."
        }
      ]
    }
  },
  {
    id: "phase-3",
    title: "Estrategia de Mercado",
    description: "Preguntas sobre análisis de mercado y estrategias empresariales",
    type: "multiple-choice",
    isActive: true,
    order: 3,
    questions: [
      {
        id: "market-1",
        text: "¿Cuál es el primer paso para validar una idea de negocio?",
        options: [
          "Crear un prototipo completo",
          "Investigar el mercado objetivo",
          "Buscar inversionistas",
          "Registrar la marca"
        ],
        correctAnswer: 1,
        explanation: "Investigar el mercado objetivo es fundamental para entender si existe demanda real."
      }
    ]
  },
  {
    id: "phase-4",
    title: "Gestión de Equipos",
    description: "Desafíos sobre liderazgo y gestión de recursos humanos",
    type: "multiple-choice",
    isActive: true,
    order: 4,
    questions: [
      {
        id: "team-1",
        text: "¿Qué característica es más importante en un líder emprendedor?",
        options: [
          "Tomar todas las decisiones solo",
          "Delegar responsabilidades efectivamente",
          "Trabajar más horas que el equipo",
          "Evitar conflictos siempre"
        ],
        correctAnswer: 1,
        explanation: "Delegar efectivamente permite escalar el negocio y desarrollar al equipo."
      }
    ]
  },
  {
    id: "phase-5",
    title: "Decisiones Finales",
    description: "Casos complejos que requieren pensamiento estratégico avanzado",
    type: "multiple-choice",
    isActive: true,
    order: 5,
    questions: [
      {
        id: "final-1",
        text: "¿Cuál es la decisión más crítica para el crecimiento de una startup?",
        options: [
          "Expandirse geográficamente rápido",
          "Mantener el enfoque en el producto principal",
          "Contratar muchos empleados",
          "Gastar todo el presupuesto en marketing"
        ],
        correctAnswer: 1,
        explanation: "Mantener el enfoque es clave para no dispersar recursos y lograr la excelencia."
      }
    ]
  }
];

// Phase management utilities
export class PhaseManager {
  private phases: PhaseConfig[];
  private settings: GameSettings;

  constructor(phases: PhaseConfig[] = DEFAULT_PHASES, settings: GameSettings = DEFAULT_GAME_SETTINGS) {
    this.phases = [...phases].sort((a, b) => a.order - b.order);
    this.settings = { ...settings };
  }

  // Phase management
  getAllPhases(): PhaseConfig[] {
    return this.phases;
  }

  getActivePhases(): PhaseConfig[] {
    return this.phases.filter(phase => phase.isActive).sort((a, b) => a.order - b.order);
  }

  getPhaseById(id: string): PhaseConfig | undefined {
    return this.phases.find(phase => phase.id === id);
  }

  addPhase(phase: Omit<PhaseConfig, 'id' | 'order'>): PhaseConfig {
    const newPhase: PhaseConfig = {
      ...phase,
      id: `phase-${Date.now()}`,
      order: this.phases.length > 0 ? Math.max(...this.phases.map(p => p.order)) + 1 : 1
    };
    this.phases.push(newPhase);
    this.updateSettings({ totalPhases: this.getActivePhases().length });
    return newPhase;
  }

  updatePhase(id: string, updates: Partial<PhaseConfig>): boolean {
    const index = this.phases.findIndex(phase => phase.id === id);
    if (index === -1) return false;

    this.phases[index] = { ...this.phases[index], ...updates };
    this.updateSettings({ totalPhases: this.getActivePhases().length });
    return true;
  }

  deletePhase(id: string): boolean {
    const index = this.phases.findIndex(phase => phase.id === id);
    if (index === -1) return false;

    this.phases.splice(index, 1);
    this.reorderPhases();
    this.updateSettings({ totalPhases: this.getActivePhases().length });
    return true;
  }

  reorderPhases(): void {
    this.phases.sort((a, b) => a.order - b.order);
    this.phases.forEach((phase, index) => {
      phase.order = index + 1;
    });
  }

  movePhase(id: string, direction: 'up' | 'down'): boolean {
    const index = this.phases.findIndex(phase => phase.id === id);
    if (index === -1) return false;

    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= this.phases.length) return false;

    // Swap orders
    const currentOrder = this.phases[index].order;
    this.phases[index].order = this.phases[targetIndex].order;
    this.phases[targetIndex].order = currentOrder;

    this.reorderPhases();
    return true;
  }

  // Settings management
  getSettings(): GameSettings {
    return { ...this.settings };
  }

  updateSettings(updates: Partial<GameSettings>): void {
    this.settings = { ...this.settings, ...updates };
  }

  // Question management
  addQuestionToPhase(phaseId: string, question: Omit<Question, 'id'>): boolean {
    const phase = this.getPhaseById(phaseId);
    if (!phase || phase.type !== 'multiple-choice') return false;

    if (!phase.questions) phase.questions = [];
    
    const newQuestion: Question = {
      ...question,
      id: `q-${Date.now()}`
    };
    
    phase.questions.push(newQuestion);
    return true;
  }

  updateQuestionInPhase(phaseId: string, questionId: string, updates: Partial<Question>): boolean {
    const phase = this.getPhaseById(phaseId);
    if (!phase || !phase.questions) return false;

    const questionIndex = phase.questions.findIndex(q => q.id === questionId);
    if (questionIndex === -1) return false;

    phase.questions[questionIndex] = { ...phase.questions[questionIndex], ...updates };
    return true;
  }

  deleteQuestionFromPhase(phaseId: string, questionId: string): boolean {
    const phase = this.getPhaseById(phaseId);
    if (!phase || !phase.questions) return false;

    const questionIndex = phase.questions.findIndex(q => q.id === questionId);
    if (questionIndex === -1) return false;

    phase.questions.splice(questionIndex, 1);
    return true;
  }

  // Persistence
  saveToLocalStorage(): void {
    localStorage.setItem('alfred0-phases', JSON.stringify(this.phases));
    localStorage.setItem('alfred0-game-settings', JSON.stringify(this.settings));
  }

  loadFromLocalStorage(): void {
    const savedPhases = localStorage.getItem('alfred0-phases');
    const savedSettings = localStorage.getItem('alfred0-game-settings');

    if (savedPhases) {
      try {
        this.phases = JSON.parse(savedPhases);
      } catch (error) {
        console.error('Error loading phases from localStorage:', error);
      }
    }

    if (savedSettings) {
      try {
        this.settings = JSON.parse(savedSettings);
      } catch (error) {
        console.error('Error loading settings from localStorage:', error);
      }
    }
  }

  exportConfig(): string {
    return JSON.stringify({
      phases: this.phases,
      settings: this.settings
    }, null, 2);
  }

  importConfig(configJson: string): boolean {
    try {
      const config = JSON.parse(configJson);
      if (config.phases && config.settings) {
        this.phases = config.phases;
        this.settings = config.settings;
        this.saveToLocalStorage();
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error importing config:', error);
      return false;
    }
  }
}

// Global phase manager instance
export const phaseManager = new PhaseManager();