import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { Clock, CheckCircle2, Users, Puzzle, Search } from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";
import { useTokenConfig } from "../../contexts/TokenConfigContext";

interface Phase1Props {
  teamName: string;
  onComplete: (tokens: number) => void;
}

// Datos de anagramas (palabra desordenada -> palabra correcta)
const anagramsES = [
  { scrambled: "VAINOCION", solution: "INNOVACION", hint: "Crear algo nuevo y útil" },
  { scrambled: "REPMASARIO", solution: "EMPRESARIO", hint: "Persona que inicia negocios" },
  { scrambled: "TEGIATRASE", solution: "ESTRATEGIA", hint: "Plan maestro de acción" },
  { scrambled: "VIDATICREDA", solution: "CREATIVIDAD", hint: "Capacidad de generar ideas originales" },
  { scrambled: "CILONOUS", solution: "SOLUCION", hint: "Respuesta a un problema" },
  { scrambled: "RAZGOLIDDE", solution: "LIDERAZGO", hint: "Habilidad para guiar equipos" },
  { scrambled: "DUCCIONPRO", solution: "PRODUCCION", hint: "Proceso de crear productos" },
  { scrambled: "MERCIALIZACION", solution: "COMERCIALIZACION", hint: "Llevar productos al mercado" }
];

const anagramsEN = [
  { scrambled: "NOITAVONNI", solution: "INNOVATION", hint: "Creating something new and useful" },
  { scrambled: "RUENERPTENE", solution: "ENTREPRENEUR", hint: "Person who starts businesses" },
  { scrambled: "YGETARTS", solution: "STRATEGY", hint: "Master plan of action" },
  { scrambled: "YTIVITAERC", solution: "CREATIVITY", hint: "Ability to generate original ideas" },
  { scrambled: "NOITULOS", solution: "SOLUTION", hint: "Answer to a problem" },
  { scrambled: "PIHSREDAEL", solution: "LEADERSHIP", hint: "Ability to guide teams" },
  { scrambled: "NOITCUDORP", solution: "PRODUCTION", hint: "Process of creating products" },
  { scrambled: "GNITEKRAM", solution: "MARKETING", hint: "Promoting and selling products" }
];

// Datos de sopas de letras
const wordSearchES = {
  words: ["IDEA", "PLAN", "META", "EXITO", "VISION", "LIDER", "RIESGO", "STARTUP"],
  grid: [
    ['I', 'D', 'E', 'A', 'X', 'R', 'I', 'E', 'S', 'G', 'O'],
    ['P', 'L', 'A', 'N', 'E', 'X', 'I', 'T', 'O', 'Q', 'W'],
    ['M', 'E', 'T', 'A', 'R', 'O', 'S', 'T', 'A', 'R', 'T'],
    ['L', 'I', 'D', 'E', 'R', 'Q', 'W', 'U', 'E', 'R', 'U'],
    ['V', 'I', 'S', 'I', 'O', 'N', 'A', 'P', 'R', 'T', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N'],
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 'A'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M', 'L', 'K', 'J', 'H']
  ]
};

const wordSearchEN = {
  words: ["IDEA", "PLAN", "GOAL", "SUCCESS", "VISION", "LEADER", "RISK", "STARTUP"],
  grid: [
    ['I', 'D', 'E', 'A', 'X', 'R', 'I', 'S', 'K', 'G', 'O'],
    ['P', 'L', 'A', 'N', 'G', 'O', 'A', 'L', 'O', 'Q', 'W'],
    ['S', 'U', 'C', 'C', 'E', 'S', 'S', 'T', 'A', 'R', 'T'],
    ['L', 'E', 'A', 'D', 'E', 'R', 'W', 'U', 'E', 'R', 'U'],
    ['V', 'I', 'S', 'I', 'O', 'N', 'A', 'P', 'R', 'T', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N'],
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 'A'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M', 'L', 'K', 'J', 'H']
  ]
};

type ChallengeType = 'anagram' | 'wordsearch';

export function Phase1({ teamName, onComplete }: Phase1Props) {
  const { t, language } = useLanguage();
  const { calculator } = useTokenConfig();
  const [timeLeft, setTimeLeft] = useState(180); // 3 minutes in seconds
  const [isCompleted, setIsCompleted] = useState(false);
  const [challengeType] = useState<ChallengeType>(
    Math.random() > 0.5 ? 'anagram' : 'wordsearch'
  );
  const [currentAnagram] = useState(() => {
    const anagrams = language === 'es' ? anagramsES : anagramsEN;
    return anagrams[Math.floor(Math.random() * anagrams.length)];
  });
  const [foundWords, setFoundWords] = useState<string[]>([]);
  const [showSolution, setShowSolution] = useState(false);

  useEffect(() => {
    if (timeLeft > 0 && !isCompleted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      handleTimeUp();
    }
  }, [timeLeft, isCompleted]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleComplete = () => {
    setIsCompleted(true);
    setShowSolution(true);
    
    // Calculate tokens based on time remaining (more time = more tokens)
    const baseTokens = 15;
    const timeBonus = Math.floor(timeLeft / 10); // 1 token per 10 seconds remaining
    const totalTokens = Math.min(baseTokens + timeBonus, 25); // Cap at 25 tokens
    
    setTimeout(() => {
      onComplete(totalTokens);
    }, 3000);
  };

  const handleTimeUp = () => {
    setIsCompleted(true);
    setShowSolution(true);
    
    // Give minimal tokens for participation
    setTimeout(() => {
      onComplete(5);
    }, 3000);
  };

  const progressPercentage = ((180 - timeLeft) / 180) * 100;
  const currentWordSearch = language === 'es' ? wordSearchES : wordSearchEN;

  const renderAnagramChallenge = () => (
    <div className="space-y-6">
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Puzzle className="w-6 h-6 text-purple-500" />
          <h3 className="text-xl">{t('phase1Anagram')}</h3>
        </div>
        <p className="text-muted-foreground mb-6">
          {t('phase1AnagramInstruction')}
        </p>
      </div>

      <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
        <CardContent className="p-8 text-center">
          <div className="space-y-4">
            <div className="text-sm text-muted-foreground">{currentAnagram.hint}</div>
            <div className="text-3xl font-mono tracking-widest bg-white p-4 rounded-lg border-2 border-dashed border-purple-300">
              {currentAnagram.scrambled}
            </div>
            {showSolution && (
              <div className="text-2xl text-purple-600 font-bold">
                {t('phase1Solution')} {currentAnagram.solution}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderWordSearchChallenge = () => (
    <div className="space-y-6">
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Search className="w-6 h-6 text-blue-500" />
          <h3 className="text-xl">{t('phase1WordSearch')}</h3>
        </div>
        <p className="text-muted-foreground mb-6">
          {t('phase1WordSearchInstruction')}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200">
          <CardContent className="p-6">
            <div className="grid grid-cols-11 gap-1 mb-4 max-w-md mx-auto">
              {currentWordSearch.grid.map((row, rowIndex) =>
                row.map((letter, colIndex) => (
                  <div
                    key={`${rowIndex}-${colIndex}`}
                    className="w-6 h-6 bg-white border border-blue-200 flex items-center justify-center text-xs font-mono"
                  >
                    {letter}
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
          <CardHeader>
            <CardTitle className="text-lg">{t('phase1FoundWords')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto">
              {currentWordSearch.words.map((word, index) => (
                <div
                  key={word}
                  className={`p-2 text-center rounded-lg border ${
                    showSolution
                      ? 'bg-green-100 border-green-300 text-green-800'
                      : 'bg-white border-gray-200 text-gray-600'
                  }`}
                >
                  {word}
                  {showSolution && <CheckCircle2 className="w-4 h-4 inline ml-2" />}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center p-4">
      <Card className="max-w-4xl w-full shadow-xl">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-2xl bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                {t('phaseOf', { current: '1', total: '5' })}
              </CardTitle>
              <p className="text-muted-foreground mt-1">
                {t('phase1Title')}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {t('teamLabel')} {teamName}
                </span>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Timer Section */}
          <div className="bg-gradient-to-r from-orange-50 to-red-50 p-6 rounded-lg border border-orange-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-orange-500" />
                <span className="font-medium">{t('phase1Timer')}</span>
              </div>
              <div className="text-2xl font-mono text-orange-600">
                {formatTime(timeLeft)}
              </div>
            </div>
            
            <Progress value={progressPercentage} className="h-3 mb-2" />
            
            <div className="text-center">
              <p className="text-orange-800">{t('phase1Description')}</p>
              <p className="text-sm text-orange-600 mt-1">{t('phase1Instruction')}</p>
            </div>
          </div>

          {/* Challenge Content */}
          {challengeType === 'anagram' ? renderAnagramChallenge() : renderWordSearchChallenge()}

          {/* Completion Section */}
          {isCompleted ? (
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center gap-2 text-green-600">
                <CheckCircle2 className="w-6 h-6" />
                <span className="text-xl">{timeLeft > 0 ? t('phase1Complete') : t('phase1TimeUp')}</span>
              </div>
              <p className="text-green-700 bg-green-50 p-4 rounded-lg border border-green-200">
                {t('phase1ExplanationTimed')}
              </p>
            </div>
          ) : (
            <div className="text-center">
              <p className="text-muted-foreground mb-4">{t('thinkStrategically')}</p>
              <Button
                onClick={handleComplete}
                size="lg"
                className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
              >
                {t('phase1MarkComplete')}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}