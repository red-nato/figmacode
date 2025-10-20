import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Sparkles, Zap, Rocket, Trophy, Crown } from "lucide-react";

interface TransitionScreenProps {
  phase: number;
  tokens: number;
  teamName: string;
  onContinue: () => void;
}

const transitionData: Record<number, { phrase: string; icon: React.ReactNode; color: string }> = {
  1: {
    phrase: "¡Boom! 💥 ¡Excelente comienzo! El fuego emprendedor está ardiendo fuerte en su equipo! 🔥",
    icon: <Rocket className="w-8 h-8" />,
    color: "from-orange-500 to-red-500"
  },
  2: {
    phrase: "¡Cha-ching! 💰 ¡Movimientos inteligentes y decisiones financieras brillantes! ¡Piensan como verdaderos empresarios! 🧠",
    icon: <Zap className="w-8 h-8" />,
    color: "from-yellow-500 to-orange-500"
  },
  3: {
    phrase: "¡Imparables! 🚀 ¿Competencia? ¡Están en una liga completamente propia! ¡Son únicos! ⭐",
    icon: <Sparkles className="w-8 h-8" />,
    color: "from-purple-500 to-pink-500"
  },
  4: {
    phrase: "¡Constructores de equipos extraordinarios! 👥 ¡Los grandes líderes saben identificar el talento! 🎯",
    icon: <Trophy className="w-8 h-8" />,
    color: "from-blue-500 to-purple-500"
  },
  5: {
    phrase: "¡Campeones del feedback! 🏆 ¡Convertir las críticas en oro es el verdadero espíritu emprendedor! ✨",
    icon: <Crown className="w-8 h-8" />,
    color: "from-green-500 to-blue-500"
  }
};

export function TransitionScreen({ phase, tokens, teamName, onContinue }: TransitionScreenProps) {
  const transition = transitionData[phase];
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-cyan-50 flex items-center justify-center p-4">
      <Card className="max-w-lg w-full shadow-xl">
        <CardContent className="p-8 text-center space-y-6">
          <div className={`mx-auto w-20 h-20 bg-gradient-to-r ${transition.color} rounded-full flex items-center justify-center text-white shadow-lg`}>
            {transition.icon}
          </div>
          
          <div className="space-y-4">
            <Badge variant="secondary" className="text-lg px-4 py-2">
              ¡Fase {phase} Completada!
            </Badge>
            
            <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent">
              ¡Increíble trabajo, {teamName}!
            </h2>
            
            <p className="text-lg leading-relaxed text-muted-foreground">
              {transition.phrase}
            </p>
          </div>
          
          <div className="bg-gradient-to-r from-amber-50 to-yellow-50 p-4 rounded-lg border border-amber-200">
            <p className="text-amber-800">
              <span className="font-bold">Total Tokens: {tokens}</span>
            </p>
            <p className="text-sm text-amber-700 mt-1">
              ¡Mantengan el impulso! 🌟
            </p>
          </div>
          
          <Button 
            onClick={onContinue}
            size="lg"
            className={`w-full bg-gradient-to-r ${transition.color} hover:opacity-90 transition-opacity`}
          >
            ¡Listos para el Siguiente Desafío!
          </Button>
          
          <div className="flex justify-center space-x-2">
            {[1, 2, 3, 4, 5].map((p) => (
              <div 
                key={p}
                className={`w-3 h-3 rounded-full ${
                  p <= phase 
                    ? 'bg-gradient-to-r from-green-400 to-blue-400' 
                    : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}