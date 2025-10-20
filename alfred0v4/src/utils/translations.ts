export type Language = "es" | "en";

export interface Translations {
  // Common
  continue: string;
  back: string;
  start: string;
  restart: string;
  confirm: string;
  cancel: string;

  // Intro Screen
  appTitle: string;
  appSubtitle: string;
  welcomeMessage: string;
  teamwork: string;
  teamworkDesc: string;
  innovation: string;
  innovationDesc: string;
  competition: string;
  competitionDesc: string;
  howItWorks: string;
  howItWorksDesc: string;
  letsStart: string;
  adminAccess: string;

  // Team Setup
  teamConfiguration: string;
  teamConfigSubtitle: string;
  letsBeginAdventure: string;
  teamConfigDesc: string;
  teamName: string;
  teamNamePlaceholder: string;
  nameRequiredError: string;
  nameMinLengthError: string;
  nameMaxLengthError: string;
  nameTips: string;
  tipCreative: string;
  tipEntrepreneurial: string;
  tipEasyPronounce: string;
  tipMotivating: string;
  startChallenge: string;
  confirmNameMessage: string;
  adminAssignedName: string;

  // Game Phases
  phaseOf: string;
  teamLabel: string;
  thinkStrategically: string;
  confirmAnswer: string;
  phaseCompleted: string;
  excellentDecision: string;
  keyLesson: string;
  continueNext: string;

  // Phase 1
  phase1Title: string;
  phase1Description: string;
  phase1Instruction: string;
  phase1Timer: string;
  phase1Complete: string;
  phase1TimeUp: string;
  phase1Anagram: string;
  phase1WordSearch: string;
  phase1AnagramInstruction: string;
  phase1WordSearchInstruction: string;
  phase1Solution: string;
  phase1FoundWords: string;
  phase1TimeRemaining: string;
  phase1MarkComplete: string;
  phase1ExplanationTimed: string;

  // Phase 2
  phase2Title: string;
  phase2IntroMessage: string;
  phase2ChooseChallenge: string;
  phase2Challenge1: string;
  phase2Challenge2: string;
  phase2Challenge3: string;
  phase2Challenge1Title: string;
  phase2Challenge2Title: string;
  phase2Challenge3Title: string;
  phase2Story1: string;
  phase2Story2: string;
  phase2Story3: string;
  phase2ContinueToSolution: string;
  phase2BackToSelection: string;
  clickToSelect: string;

  // Phase 3
  phase3Title: string;
  phase3Question: string;
  phase3Explanation: string;
  phase3Option1: string;
  phase3Option2: string;
  phase3Option3: string;
  phase3Option4: string;

  // Phase 4
  phase4Title: string;
  phase4Question: string;
  phase4Explanation: string;
  phase4Option1: string;
  phase4Option2: string;
  phase4Option3: string;
  phase4Option4: string;

  // Phase 5
  phase5Title: string;
  phase5Question: string;
  phase5Explanation: string;
  phase5Option1: string;
  phase5Option2: string;
  phase5Option3: string;
  phase5Option4: string;

  // Transition Screen
  transitionPhase1: string;
  transitionPhase2: string;
  transitionPhase3: string;
  transitionPhase4: string;
  transitionPhase5: string;
  phaseComplete: string;
  amazingWork: string;
  totalTokens: string;
  keepMomentum: string;
  readyNextChallenge: string;

  // Completion Screen
  challengeComplete: string;
  challengeCompleteDesc: string;
  phasesCompleted: string;
  skillsTested: string;
  skillsTestedList: string;
  keyLessons: string;
  lesson1: string;
  lesson2: string;
  lesson3: string;
  lesson4: string;
  lesson5: string;
  tryAgain: string;
  shareResults: string;

  // Performance Levels
  entrepreneurialLegend: string;
  businessMogul: string;
  risingStar: string;
  promisingEntrepreneur: string;
  futurePotential: string;
  legendMessage: string;
  mogulMessage: string;
  starMessage: string;
  promisingMessage: string;
  potentialMessage: string;

  // Admin
  adminAccess: string;
  adminTitle: string;
  adminSubtitle: string;
  adminCredentials: string;
  username: string;
  password: string;
  usernamePlaceholder: string;
  passwordPlaceholder: string;
  login: string;
  logout: string;
  backToGame: string;
  demoCredentials: string;
  invalidCredentials: string;

  // Admin Dashboard
  adminDashboard: string;
  adminDashboardSubtitle: string;
  totalPlayers: string;
  averageScore: string;
  completionRate: string;
  topScore: string;
  recentSessions: string;
  recentSessionsDesc: string;
  gameQuestions: string;
  gameQuestionsDesc: string;
  tokenConfiguration: string;
  tokenConfigurationDesc: string;
  currentPreset: string;
  customConfiguration: string;
  presetName: string;
  presetDescription: string;
  loadPreset: string;
  saveConfiguration: string;
  resetToDefault: string;
  maxPossibleTokens: string;
  phase1Config: string;
  phase2Config: string;
  phase3Config: string;
  phase4Config: string;
  phase5Config: string;
  completionTokens: string;
  timeBonusTokens: string;
  perfectAnagramTokens: string;
  perfectWordSearchTokens: string;
  challengeSelectionTokens: string;
  correctAnswerTokens: string;
  incorrectAnswerTokens: string;
  tokenConfigSaved: string;
  tokenConfigError: string;

  // Phase Management
  phaseManagement: string;
  phaseManagementDesc: string;
  addNewPhase: string;
  editPhase: string;
  deletePhase: string;
  moveUp: string;
  moveDown: string;
  phaseTitle: string;
  phaseDescription: string;
  phaseType: string;
  timeLimit: string;
  isActive: string;
  questions: string;
  addQuestion: string;
  editQuestion: string;
  deleteQuestion: string;
  questionText: string;
  questionOptions: string;
  correctAnswer: string;
  explanation: string;
  option: string;
  timedChallenge: string;
  storySelection: string;
  multipleChoice: string;
  customPhase: string;
  phaseSaved: string;
  phaseDeleted: string;
  phaseError: string;
  confirmDelete: string;
  confirmDeletePhase: string;

  // Game Settings
  gameConfiguration: string;
  gameConfigurationDesc: string;
  gameName: string;
  gameDescription: string;
  showTokensToPlayers: string;
  teamNameRequired: string;
  allowTeamNameChange: string;
  maxTeamNameLength: string;
  gameLanguages: string;
  defaultLanguage: string;
  configurationSaved: string;
  configurationError: string;
  exportConfiguration: string;
  importConfiguration: string;
  resetConfiguration: string;
  selectFile: string;
  downloadConfig: string;
  gameQuestionsDesc: string;
  gameSettings: string;
  gameSettingsDesc: string;
  tokenDisplay: string;
  tokenDisplayDesc: string;
  gamePhases: string;
  gamePhasesDesc: string;
  maximumScore: string;
  maximumScoreDesc: string;
  performanceLevels: string;
  performanceLevelsDesc: string;
  view: string;
  edit: string;
  answerOptions: string;
  tokens: string;
  hidden: string;
  phases: string;
  levels: string;
  answerOptions: string;

  // Language
  language: string;
  spanish: string;
  english: string;
}

export const translations: Record<Language, Translations> = {
  es: {
    // Common
    continue: "Continuar",
    back: "Volver",
    start: "Empezar",
    restart: "Reiniciar",
    confirm: "Confirmar",
    cancel: "Cancelar",

    // Intro Screen
    appTitle: "Alfred0",
    appSubtitle: "¡Aprende a emprender de manera divertida!",
    welcomeMessage:
      "Bienvenidos a este juego. ¿Serás capáz de demostrar tus habilidades creativas?",
    teamwork: "Trabajo en equipo",
    teamworkDesc:
      "Explorarás algunas maneras de trabajar con tus pares.",
    innovation: "Innovación",
    innovationDesc:
      "Piensa fuera de la caja. Abre la mente que todas las ideas son útiles.",
    competition: "Competencia",
    competitionDesc:
      "Compite por Tokens para ser el mejor grupo. ¿Podrás?",
    howItWorks: "Cómo funciona:",
    howItWorksDesc:
      "Compite durante 5 fases en retos variados para ganar Tokens. Aquel que logre superlos de la manera más innovadora ganará más puntos.",
    letsStart: "¿Empezamos?",
    adminAccess: "Administrador",

    // Team Setup
    teamConfiguration: "Configuración del Equipo",
    teamConfigSubtitle:
      "¡Es hora de darle identidad a tu equipo!",
    letsBeginAdventure: "¡Vamos a comenzar la aventura!",
    teamConfigDesc:
      "Cada equipo necesita un nombre único que los represente. ¡Elige algo que inspire a tu grupo!",
    teamName: "Nombre del Equipo",
    teamNamePlaceholder:
      "Ej: Los Innovadores, Team Alpha, Emprendedores Pro...",
    nameRequiredError:
      "Por favor ingresa un nombre para tu equipo",
    nameMinLengthError:
      "El nombre del equipo debe tener al menos 2 caracteres",
    nameMaxLengthError:
      "El nombre del equipo no puede exceder 20 caracteres",
    nameTips: "💡 Consejos para un buen nombre:",
    tipCreative: "• Sea creativo y memorable",
    tipEntrepreneurial: "• Refleje el espíritu emprendedor",
    tipEasyPronounce: "• Sea fácil de pronunciar",
    tipMotivating: "• ¡Que los motive a ganar!",
    startChallenge: "¡Comenzar el Desafío!",
    confirmNameMessage:
      "Una vez que confirmes el nombre, comenzarás las 5 fases del reto",
    adminAssignedName: "Nombre asignado por el administrador:",

    // Game Phases
    phaseOf: "Fase {current} de {total}",
    teamLabel: "Equipo:",
    thinkStrategically: "¡Piensen estratégicamente en equipo!",
    confirmAnswer: "Confirmar Respuesta",
    phaseCompleted: "¡Fase {phase} Completada!",
    excellentDecision: "¡Excelente decisión!",
    keyLesson: "Lección clave:",
    continueNext: "Continuar",

    // Phase 1
    phase1Title: "Desafío de Agilidad Mental",
    phase1Description:
      "¡Tu equipo tiene 3 minutos para completar este desafío!",
    phase1Instruction:
      "Trabajen juntos para resolver este reto lo más rápido posible.",
    phase1Timer: "Tiempo:",
    phase1Complete: "¡Completado!",
    phase1TimeUp: "¡Tiempo agotado!",
    phase1Anagram: "Anagrama Emprendedor",
    phase1WordSearch: "Sopa de Letras Empresarial",
    phase1AnagramInstruction:
      "Reordena las letras para formar una palabra relacionada con emprendimiento:",
    phase1WordSearchInstruction:
      "Encuentra todas las palabras relacionadas con emprendimiento en la sopa de letras:",
    phase1Solution: "Solución:",
    phase1FoundWords: "Palabras encontradas:",
    phase1TimeRemaining: "Tiempo restante:",
    phase1MarkComplete: "Marcar como Completado",
    phase1ExplanationTimed:
      "¡Excelente trabajo en equipo! La agilidad mental y la colaboración son fundamentales en el emprendimiento.",

    // Phase 2
    phase2Title: "Identificación de Desafíos",
    phase2IntroMessage:
      "Es importante tener un desafío o problemática en un emprendimiento porque proporciona un propósito claro, guía la creatividad y la innovación, y ayuda a identificar oportunidades de negocio al resolver necesidades reales del mercado.",
    phase2ChooseChallenge:
      "Selecciona uno de estos desafíos para desarrollar una solución emprendedora:",
    phase2Challenge1: "Tecnología adultos mayores",
    phase2Challenge2: "Fast fashion y zonas de desechos",
    phase2Challenge3:
      "Sustentabilidad del agua en la agricultura",
    phase2Challenge1Title: "Brecha Digital en Adultos Mayores",
    phase2Challenge2Title:
      "Impacto Ambiental de la Moda Rápida",
    phase2Challenge3Title: "Escasez de Agua en la Agricultura",
    phase2Story1:
      "El avance tecnológico en los últimos años ha sido incremental. Esto ha beneficiado a múltiples sectores, sin embargo el conocimiento y adaptación para los adultos mayores ha sido una gran dificultad. Osvaldo es un adulto mayor de 70 años y debe pedir ayuda a sus hijos o nietos cada vez que debe hacer trámites.",
    phase2Story2:
      "La moda rápida ha traído graves consecuencias al medio ambiente. Especialmente en sectores del norte de Chile en donde los vertederos y basurales están afectando el diario vivir de las personas. Gabriela es una estudiante de 18 años que vive cerca de esta zona y debe pasar a diario por lugares con desagradables olores.",
    phase2Story3:
      "El agua dulce es un recurso natural fundamental para la vida. Hay zonas rurales en que el agua se ha hecho escasa. Camila es una agricultora de 50 años que cultiva paltas de exportación, ella está complicada de perder su negocio por la cantidad de agua que debe utilizar.",
    phase2ContinueToSolution:
      "Continuar para desarrollar solución",
    phase2BackToSelection: "Volver a selección de desafíos",
    clickToSelect: "Haz clic en un desafío para seleccionarlo",

    // Phase 3
    phase3Title: "Competencia Directa",
    phase3Question:
      "Una gran empresa entra a su mercado con un producto similar pero con más recursos. ¿Cuál es su estrategia?",
    phase3Explanation:
      "¡Brillante! Enfocarse en lo que te hace único es la mejor defensa contra la competencia con más recursos.",
    phase3Option1:
      "Iniciar una guerra de precios inmediatamente",
    phase3Option2:
      "Fortalecer y comunicar nuestra propuesta de valor única",
    phase3Option3:
      "Rendirse y buscar un mercado completamente diferente",
    phase3Option4: "Copiar exactamente su estrategia",

    // Phase 4
    phase4Title: "Construcción de Equipo",
    phase4Question:
      "Es momento de contratar su primer empleado. ¿En qué se enfocan principalmente al elegir candidatos?",
    phase4Explanation:
      "¡Excelente! El ajuste cultural y el potencial de crecimiento son fundamentales en startups donde todos deben adaptarse rápidamente.",
    phase4Option1:
      "Contratar a la persona más barata disponible",
    phase4Option2:
      "Solo considerar candidatos con experiencia perfecta",
    phase4Option3:
      "Buscar compatibilidad cultural y potencial de crecimiento",
    phase4Option4:
      "Contratar a un amigo cercano sin evaluación",

    // Phase 5
    phase5Title: "Gestión de Feedback",
    phase5Question:
      "Su producto recibe críticas muy duras en redes sociales y medios. ¿Cuál es su respuesta como equipo?",
    phase5Explanation:
      "¡Perfecto! Las críticas constructivas son oro puro para los emprendedores que buscan mejorar continuamente.",
    phase5Option1: "Ignorar completamente todas las críticas",
    phase5Option2: "Responder agresivamente a cada crítico",
    phase5Option3:
      "Analizar el feedback y usarlo para mejorar el producto",
    phase5Option4:
      "Retirar el producto del mercado inmediatamente",

    // Transition Screen
    transitionPhase1:
      "¡Increíble agilidad mental! 🧠 ¡Su equipo demostró velocidad y colaboración excepcional! ⚡",
    transitionPhase2:
      "¡Excelente identificación del problema! 🎯 ¡Su equipo demostró gran visión emprendedora! Los mejores negocios nacen de problemas reales! 🔍",
    transitionPhase3:
      "¡Imparables! 🚀 ¿Competencia? ¡Están en una liga completamente propia! ¡Son únicos! ⭐",
    transitionPhase4:
      "¡Constructores de equipos extraordinarios! 👥 ¡Los grandes líderes saben identificar el talento! 🎯",
    transitionPhase5:
      "¡Campeones del feedback! 🏆 ¡Convertir las críticas en oro es el verdadero espíritu emprendedor! ✨",
    phaseComplete: "¡Fase {phase} Completada!",
    amazingWork: "¡Increíble trabajo, {teamName}!",
    totalTokens: "Total Tokens:",
    keepMomentum: "¡Mantengan el impulso! 🌟",
    readyNextChallenge: "¡Listos para el Siguiente Desafío!",

    // Completion Screen
    challengeComplete: "¡Desafío Completado!",
    challengeCompleteDesc:
      "¡{teamName} ha conquistado las 5 fases emprendedoras!",
    phasesCompleted: "Fases Completadas",
    skillsTested: "Habilidades Evaluadas",
    skillsTestedList:
      "Estrategia • Innovación • Liderazgo • Adaptabilidad • Crecimiento",
    keyLessons: "🎓 Lecciones Emprendedoras Clave",
    lesson1: "• La agilidad mental y colaboración son clave",
    lesson2:
      "• Identificar problemas reales genera oportunidades",
    lesson3:
      "• La propuesta de valor única es tu mejor defensa",
    lesson4:
      "• La compatibilidad cultural importa en las contrataciones",
    lesson5: "• El feedback es oro para la mejora continua",
    tryAgain: "Intentar de Nuevo",
    shareResults: "Compartir Resultados",

    // Performance Levels
    entrepreneurialLegend: "Leyenda Emprendedora",
    businessMogul: "Magnate de Negocios",
    risingStar: "Estrella en Ascenso",
    promisingEntrepreneur: "Emprendedor Prometedor",
    futurePotential: "Potencial Futuro",
    legendMessage:
      "¡Absolutamente fenomenal! ¡Están destinados a la grandeza! 🚀",
    mogulMessage:
      "¡Rendimiento excepcional! ¡Tienen lo necesario para triunfar! 💎",
    starMessage:
      "¡Excelente trabajo! ¡Están en el camino hacia el éxito! ⭐",
    promisingMessage:
      "¡Buen trabajo! ¡Sigan aprendiendo y creciendo! 🌱",
    potentialMessage:
      "¡Todos empiezan en algún lugar! ¡Inténtenlo de nuevo para mejorar! 💪",

    // Admin
    adminTitle: "Acceso Administrador",
    adminSubtitle: "Coloca tus credenciales de Administrador",
    adminCredentials: "Credenciales DEMO:",
    username: "Usuario",
    password: "Contraseña",
    usernamePlaceholder: "Coloca el nombre de usuario",
    passwordPlaceholder: "Coloca la contraseña",
    login: "Login",
    logout: "Cerrar Sesión",
    backToGame: "Volver al juego",
    demoCredentials: "Credenciales DEMO:",
    invalidCredentials:
      "Invalid credentials. Please try again.",

    // Admin Dashboard
    adminDashboard: "Panel de Administrador",
    adminDashboardSubtitle: "Alfred0 - Desafío Emprendedor",
    totalPlayers: "Total Jugadores",
    averageScore: "Puntuación Promedio",
    completionRate: "Tasa de Finalización",
    topScore: "Puntuación Máxima",
    recentSessions: "Sesiones Recientes",
    recentSessionsDesc:
      "Últimas completaciones del juego y puntuaciones",
    gameQuestions: "Gestión de Preguntas",
    gameQuestionsDesc:
      "Ver y editar las preguntas del desafío emprendedor",
    tokenConfiguration: "Configuración de Tokens",
    tokenConfigurationDesc:
      "Personalizar la distribución de tokens por fase",
    currentPreset: "Configuración Actual",
    customConfiguration: "Configuración Personalizada",
    presetName: "Nombre del Preset",
    presetDescription: "Descripción",
    loadPreset: "Cargar Preset",
    saveConfiguration: "Guardar Configuración",
    resetToDefault: "Restablecer por Defecto",
    maxPossibleTokens: "Máximo Tokens Posibles",
    phase1Config: "Fase 1 - Desafíos Mentales",
    phase2Config: "Fase 2 - Identificación de Problemas",
    phase3Config: "Fase 3 - Estrategia de Mercado",
    phase4Config: "Fase 4 - Gestión de Equipos",
    phase5Config: "Fase 5 - Decisiones Finales",
    completionTokens: "Tokens por Completar",
    timeBonusTokens: "Bonus por Tiempo",
    perfectAnagramTokens: "Bonus Anagrama Perfecto",
    perfectWordSearchTokens: "Bonus Sopa de Letras Perfecta",
    challengeSelectionTokens: "Tokens por Selección de Desafío",
    correctAnswerTokens: "Tokens por Respuesta Correcta",
    incorrectAnswerTokens: "Tokens por Respuesta Incorrecta",
    tokenConfigSaved:
      "Configuración de tokens guardada exitosamente",
    tokenConfigError:
      "Error al guardar la configuración de tokens",

    // Phase Management
    phaseManagement: "Gestión de Fases",
    phaseManagementDesc:
      "Crear, editar y organizar las fases del juego",
    addNewPhase: "Agregar Nueva Fase",
    editPhase: "Editar Fase",
    deletePhase: "Eliminar Fase",
    moveUp: "Mover Arriba",
    moveDown: "Mover Abajo",
    phaseTitle: "Título de la Fase",
    phaseDescription: "Descripción de la Fase",
    phaseType: "Tipo de Fase",
    timeLimit: "Límite de Tiempo (segundos)",
    isActive: "Fase Activa",
    questions: "Preguntas",
    addQuestion: "Agregar Pregunta",
    editQuestion: "Editar Pregunta",
    deleteQuestion: "Eliminar Pregunta",
    questionText: "Texto de la Pregunta",
    questionOptions: "Opciones de Respuesta",
    correctAnswer: "Respuesta Correcta",
    explanation: "Explicación",
    option: "Opción",
    timedChallenge: "Desafío Cronometrado",
    storySelection: "Selección de Historia",
    multipleChoice: "Opción Múltiple",
    customPhase: "Fase Personalizada",
    phaseSaved: "Fase guardada exitosamente",
    phaseDeleted: "Fase eliminada exitosamente",
    phaseError: "Error al procesar la fase",
    confirmDelete: "Confirmar Eliminación",
    confirmDeletePhase:
      "¿Estás seguro de que quieres eliminar esta fase? Esta acción no se puede deshacer.",

    // Game Settings
    gameConfiguration: "Configuración del Juego",
    gameConfigurationDesc:
      "Configurar parámetros generales del juego",
    gameName: "Nombre del Juego",
    gameDescription: "Descripción del Juego",
    showTokensToPlayers: "Mostrar Tokens a Jugadores",
    teamNameRequired: "Nombre de Equipo Obligatorio",
    allowTeamNameChange: "Permitir Cambio de Nombre",
    maxTeamNameLength: "Longitud Máxima del Nombre",
    gameLanguages: "Idiomas del Juego",
    defaultLanguage: "Idioma por Defecto",
    configurationSaved: "Configuración guardada exitosamente",
    configurationError: "Error al guardar la configuración",
    exportConfiguration: "Exportar Configuración",
    importConfiguration: "Importar Configuración",
    resetConfiguration: "Restablecer Configuración",
    selectFile: "Seleccionar Archivo",
    downloadConfig: "Descargar Configuración",
    gameQuestionsDesc:
      "Ver y editar preguntas de desafíos de emprendimiento",
    gameSettings: "Configuración del Juego",
    gameSettingsDesc:
      "Configurar parámetros y características del juego",
    tokenDisplay: "Visualización de Tokens",
    tokenDisplayDesc:
      "Actualmente oculto a los jugadores durante el juego",
    gamePhases: "Fases del Juego",
    gamePhasesDesc: "Número total de fases del desafío",
    maximumScore: "Puntuación Máxima",
    maximumScoreDesc: "Mayor cantidad posible de tokens",
    performanceLevels: "Niveles de Rendimiento",
    performanceLevelsDesc: "Niveles de logros disponibles",
    view: "Ver",
    edit: "Editar",
    answerOptions: "opciones",
    tokens: "tokens",
    hidden: "Oculto",
    phases: "Fases",
    levels: "Niveles",
    answerOptions: "opciones de respuesta",

    // Language
    language: "Idioma",
    spanish: "Español",
    english: "Inglés",
  },

  en: {
    // Common
    continue: "Continue",
    back: "Back",
    start: "Start",
    restart: "Restart",
    confirm: "Confirm",
    cancel: "Cancel",

    // Intro Screen
    appTitle: "Alfred0",
    appSubtitle: "Learn to be an entrepreneur in a fun way!",
    welcomeMessage:
      "Welcome to this game. Will you be able to demonstrate your creative skills?",
    teamwork: "Teamwork",
    teamworkDesc:
      "You'll explore some ways to work with your peers.",
    innovation: "Innovation",
    innovationDesc:
      "Think outside the box. Open your mind that all ideas are useful.",
    competition: "Competition",
    competitionDesc:
      "Compete for Tokens to be the best group. Can you do it?",
    howItWorks: "How it works:",
    howItWorksDesc:
      "Compete during 5 phases in varied challenges to earn Tokens. Those who manage to overcome them in the most innovative way will earn more points.",
    letsStart: "Shall we start?",
    adminAccess: "Administrator",

    // Team Setup
    teamConfiguration: "Team Configuration",
    teamConfigSubtitle:
      "It's time to give your team an identity!",
    letsBeginAdventure: "Let's begin the adventure!",
    teamConfigDesc:
      "Every team needs a unique name that represents them. Choose something that inspires your group!",
    teamName: "Team Name",
    teamNamePlaceholder:
      "Ex: The Innovators, Team Alpha, Entrepreneur Pro...",
    nameRequiredError: "Please enter a name for your team",
    nameMinLengthError:
      "Team name must be at least 2 characters",
    nameMaxLengthError: "Team name cannot exceed 20 characters",
    nameTips: "💡 Tips for a good name:",
    tipCreative: "• Be creative and memorable",
    tipEntrepreneurial: "• Reflect the entrepreneurial spirit",
    tipEasyPronounce: "• Be easy to pronounce",
    tipMotivating: "• Motivate them to win!",
    startChallenge: "Start the Challenge!",
    confirmNameMessage:
      "Once you confirm the name, you'll start the 5 challenge phases",
    adminAssignedName: "Name assigned by administrator:",

    // Game Phases
    phaseOf: "Phase {current} of {total}",
    teamLabel: "Team:",
    thinkStrategically: "Think strategically as a team!",
    confirmAnswer: "Confirm Answer",
    phaseCompleted: "Phase {phase} Completed!",
    excellentDecision: "Excellent decision!",
    keyLesson: "Key lesson:",
    continueNext: "Continue",

    // Phase 1
    phase1Title: "Mental Agility Challenge",
    phase1Description:
      "Your team has 3 minutes to complete this challenge!",
    phase1Instruction:
      "Work together to solve this challenge as fast as possible.",
    phase1Timer: "Time:",
    phase1Complete: "Completed!",
    phase1TimeUp: "Time's up!",
    phase1Anagram: "Entrepreneurial Anagram",
    phase1WordSearch: "Business Word Search",
    phase1AnagramInstruction:
      "Rearrange the letters to form a word related to entrepreneurship:",
    phase1WordSearchInstruction:
      "Find all the words related to entrepreneurship in the word search:",
    phase1Solution: "Solution:",
    phase1FoundWords: "Words found:",
    phase1TimeRemaining: "Time remaining:",
    phase1MarkComplete: "Mark as Complete",
    phase1ExplanationTimed:
      "Excellent teamwork! Mental agility and collaboration are fundamental in entrepreneurship.",

    // Phase 2
    phase2Title: "Challenge Identification",
    phase2IntroMessage:
      "It's important to have a challenge or problem in entrepreneurship because it provides a clear purpose, guides creativity and innovation, and helps identify business opportunities by solving real market needs.",
    phase2ChooseChallenge:
      "Select one of these challenges to develop an entrepreneurial solution:",
    phase2Challenge1: "Technology for elderly adults",
    phase2Challenge2: "Fast fashion and waste zones",
    phase2Challenge3: "Water sustainability in agriculture",
    phase2Challenge1Title: "Digital Gap in Elderly Adults",
    phase2Challenge2Title:
      "Environmental Impact of Fast Fashion",
    phase2Challenge3Title: "Water Scarcity in Agriculture",
    phase2Story1:
      "Technological advancement in recent years has been incremental. This has benefited multiple sectors, however knowledge and adaptation for elderly adults has been a great difficulty. Osvaldo is a 70-year-old elderly man and must ask his children or grandchildren for help every time he needs to do paperwork.",
    phase2Story2:
      "Fast fashion has brought serious consequences to the environment. Especially in northern Chile sectors where landfills and dumps are affecting people's daily lives. Gabriela is an 18-year-old student who lives near this area and must pass daily through places with unpleasant odors.",
    phase2Story3:
      "Fresh water is a fundamental natural resource for life. There are rural areas where water has become scarce. Camila is a 50-year-old farmer who grows export avocados, she is worried about losing her business due to the amount of water she must use.",
    phase2ContinueToSolution: "Continue to develop solution",
    phase2BackToSelection: "Back to challenge selection",
    clickToSelect: "Click on a challenge to select it",

    // Phase 3
    phase3Title: "Direct Competition",
    phase3Question:
      "A large company enters your market with a similar product but with more resources. What's your strategy?",
    phase3Explanation:
      "Brilliant! Focusing on what makes you unique is the best defense against competition with more resources.",
    phase3Option1: "Start a price war immediately",
    phase3Option2:
      "Strengthen and communicate our unique value proposition",
    phase3Option3:
      "Give up and look for a completely different market",
    phase3Option4: "Copy their strategy exactly",

    // Phase 4
    phase4Title: "Team Building",
    phase4Question:
      "It's time to hire your first employee. What do you mainly focus on when choosing candidates?",
    phase4Explanation:
      "Excellent! Cultural fit and growth potential are fundamental in startups where everyone must adapt quickly.",
    phase4Option1: "Hire the cheapest person available",
    phase4Option2:
      "Only consider candidates with perfect experience",
    phase4Option3:
      "Look for cultural compatibility and growth potential",
    phase4Option4: "Hire a close friend without evaluation",

    // Phase 5
    phase5Title: "Feedback Management",
    phase5Question:
      "Your product receives very harsh criticism on social media and in the press. What's your team's response?",
    phase5Explanation:
      "Perfect! Constructive criticism is pure gold for entrepreneurs seeking continuous improvement.",
    phase5Option1: "Completely ignore all criticism",
    phase5Option2: "Respond aggressively to every critic",
    phase5Option3:
      "Analyze the feedback and use it to improve the product",
    phase5Option4:
      "Remove the product from the market immediately",

    // Transition Screen
    transitionPhase1:
      "Incredible mental agility! 🧠 Your team showed exceptional speed and collaboration! ⚡",
    transitionPhase2:
      "Excellent problem identification! 🎯 Your team showed great entrepreneurial vision! The best businesses are born from real problems! 🔍",
    transitionPhase3:
      "Unstoppable! 🚀 Competition? You're in a league of your own! You're unique! ⭐",
    transitionPhase4:
      "Extraordinary team builders! 👥 Great leaders know how to identify talent! 🎯",
    transitionPhase5:
      "Feedback champions! 🏆 Turning criticism into gold is the true entrepreneurial spirit! ✨",
    phaseComplete: "Phase {phase} Completed!",
    amazingWork: "Amazing work, {teamName}!",
    totalTokens: "Total Tokens:",
    keepMomentum: "Keep the momentum! 🌟",
    readyNextChallenge: "Ready for the Next Challenge!",

    // Completion Screen
    challengeComplete: "Challenge Complete!",
    challengeCompleteDesc:
      "{teamName} has conquered all 5 entrepreneurial phases!",
    phasesCompleted: "Phases Completed",
    skillsTested: "Skills Tested",
    skillsTestedList:
      "Strategy • Innovation • Leadership • Adaptability • Growth",
    keyLessons: "🎓 Key Entrepreneurial Lessons",
    lesson1: "• Mental agility and collaboration are key",
    lesson2:
      "• Identifying real problems generates opportunities",
    lesson3: "• Unique value proposition is your best defense",
    lesson4: "• Cultural fit matters in hiring",
    lesson5: "• Feedback is gold for continuous improvement",
    tryAgain: "Try Again",
    shareResults: "Share Results",

    // Performance Levels
    entrepreneurialLegend: "Entrepreneurial Legend",
    businessMogul: "Business Mogul",
    risingStar: "Rising Star",
    promisingEntrepreneur: "Promising Entrepreneur",
    futurePotential: "Future Potential",
    legendMessage:
      "Absolutely phenomenal! You're destined for greatness! 🚀",
    mogulMessage:
      "Outstanding performance! You've got what it takes! 💎",
    starMessage: "Great job! You're on the path to success! ⭐",
    promisingMessage:
      "Good work! Keep learning and growing! 🌱",
    potentialMessage:
      "Everyone starts somewhere! Try again to improve! 💪",

    // Admin
    adminTitle: "Administrator Access",
    adminSubtitle: "Enter your Administrator credentials",
    adminCredentials: "DEMO Credentials:",
    username: "Username",
    password: "Password",
    usernamePlaceholder: "Enter username",
    passwordPlaceholder: "Enter password",
    login: "Login",
    logout: "Logout",
    backToGame: "Back to game",
    demoCredentials: "DEMO Credentials:",
    invalidCredentials:
      "Invalid credentials. Please try again.",

    // Admin Dashboard
    adminDashboard: "Admin Dashboard",
    adminDashboardSubtitle:
      "Alfred0 - Entrepreneurship Challenge",
    totalPlayers: "Total Players",
    averageScore: "Average Score",
    completionRate: "Completion Rate",
    topScore: "Top Score",
    recentSessions: "Recent Sessions",
    recentSessionsDesc: "Latest game completions and scores",
    gameQuestions: "Game Questions",
    gameQuestionsDesc:
      "View and edit entrepreneurship challenge questions",
    tokenConfiguration: "Token Configuration",
    tokenConfigurationDesc:
      "Customize token distribution per phase",
    currentPreset: "Current Configuration",
    customConfiguration: "Custom Configuration",
    presetName: "Preset Name",
    presetDescription: "Description",
    loadPreset: "Load Preset",
    saveConfiguration: "Save Configuration",
    resetToDefault: "Reset to Default",
    maxPossibleTokens: "Maximum Possible Tokens",
    phase1Config: "Phase 1 - Mental Challenges",
    phase2Config: "Phase 2 - Problem Identification",
    phase3Config: "Phase 3 - Market Strategy",
    phase4Config: "Phase 4 - Team Management",
    phase5Config: "Phase 5 - Final Decisions",
    completionTokens: "Completion Tokens",
    timeBonusTokens: "Time Bonus Tokens",
    perfectAnagramTokens: "Perfect Anagram Bonus",
    perfectWordSearchTokens: "Perfect Word Search Bonus",
    challengeSelectionTokens: "Challenge Selection Tokens",
    correctAnswerTokens: "Correct Answer Tokens",
    incorrectAnswerTokens: "Incorrect Answer Tokens",
    tokenConfigSaved: "Token configuration saved successfully",
    tokenConfigError: "Error saving token configuration",

    // Phase Management
    phaseManagement: "Phase Management",
    phaseManagementDesc:
      "Create, edit and organize game phases",
    addNewPhase: "Add New Phase",
    editPhase: "Edit Phase",
    deletePhase: "Delete Phase",
    moveUp: "Move Up",
    moveDown: "Move Down",
    phaseTitle: "Phase Title",
    phaseDescription: "Phase Description",
    phaseType: "Phase Type",
    timeLimit: "Time Limit (seconds)",
    isActive: "Active Phase",
    questions: "Questions",
    addQuestion: "Add Question",
    editQuestion: "Edit Question",
    deleteQuestion: "Delete Question",
    questionText: "Question Text",
    questionOptions: "Answer Options",
    correctAnswer: "Correct Answer",
    explanation: "Explanation",
    option: "Option",
    timedChallenge: "Timed Challenge",
    storySelection: "Story Selection",
    multipleChoice: "Multiple Choice",
    customPhase: "Custom Phase",
    phaseSaved: "Phase saved successfully",
    phaseDeleted: "Phase deleted successfully",
    phaseError: "Error processing phase",
    confirmDelete: "Confirm Deletion",
    confirmDeletePhase:
      "Are you sure you want to delete this phase? This action cannot be undone.",

    // Game Settings
    gameConfiguration: "Game Configuration",
    gameConfigurationDesc: "Configure general game parameters",
    gameName: "Game Name",
    gameDescription: "Game Description",
    showTokensToPlayers: "Show Tokens to Players",
    teamNameRequired: "Team Name Required",
    allowTeamNameChange: "Allow Team Name Change",
    maxTeamNameLength: "Maximum Name Length",
    gameLanguages: "Game Languages",
    defaultLanguage: "Default Language",
    configurationSaved: "Configuration saved successfully",
    configurationError: "Error saving configuration",
    exportConfiguration: "Export Configuration",
    importConfiguration: "Import Configuration",
    resetConfiguration: "Reset Configuration",
    selectFile: "Select File",
    downloadConfig: "Download Configuration",
    gameQuestionsDesc:
      "View and edit entrepreneurship challenge questions",
    gameSettings: "Game Settings",
    gameSettingsDesc: "Configure game parameters and features",
    tokenDisplay: "Token Display",
    tokenDisplayDesc:
      "Currently hidden from players during gameplay",
    gamePhases: "Game Phases",
    gamePhasesDesc: "Total number of challenge phases",
    maximumScore: "Maximum Score",
    maximumScoreDesc: "Highest possible token count",
    performanceLevels: "Performance Levels",
    performanceLevelsDesc: "Available achievement tiers",
    view: "View",
    edit: "Edit",
    answerOptions: "options",
    tokens: "tokens",
    hidden: "Hidden",
    phases: "Phases",
    levels: "Levels",
    answerOptions: "answer options",

    // Language
    language: "Language",
    spanish: "Spanish",
    english: "English",
  },
};

export function getTranslation(
  key: keyof Translations,
  language: Language,
  replacements?: Record<string, string>,
): string {
  let text = translations[language][key];

  if (replacements) {
    Object.entries(replacements).forEach(
      ([placeholder, value]) => {
        text = text.replace(`{${placeholder}}`, value);
      },
    );
  }

  return text;
}