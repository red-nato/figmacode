import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Trophy, Crown, Star, Sparkles, RotateCcw } from "lucide-react";

interface CompletionScreenProps {
  tokens: number;
  teamName: string;
  onRestart: () => void;
}

function getPerformanceLevel(tokens: number) {
  if (tokens >= 100) return { level: "Leyenda Emprendedora", icon: <Crown />, color: "from-yellow-400 to-orange-500", message: "¡Absolutamente fenomenal! ¡Están destinados a la grandeza! 🚀" };
  if (tokens >= 80) return { level: "Magnate de Negocios", icon: <Trophy />, color: "from-purple-500 to-pink-500", message: "¡Rendimiento excepcional! ¡Tienen lo necesario para triunfar! 💎" };
  if (tokens >= 60) return { level: "Estrella en Ascenso", icon: <Star />, color: "from-blue-500 to-purple-500", message: "¡Excelente trabajo! ¡Están en el camino hacia el éxito! ⭐" };
  if (tokens >= 40) return { level: "Emprendedor Prometedor", icon: <Sparkles />, color: "from-green-500 to-blue-500", message: "¡Buen trabajo! ¡Sigan aprendiendo y creciendo! 🌱" };
  return { level: "Potencial Futuro", icon: <Sparkles />, color: "from-gray-500 to-gray-600", message: "¡Todos empiezan en algún lugar! ¡Inténtenlo de nuevo para mejorar! 💪" };
}

export function CompletionScreen({ tokens, teamName, onRestart }: CompletionScreenProps) {
  const performance = getPerformanceLevel(tokens);
  const maxTokens = 125; // 5 phases × 25 max tokens each
  const percentage = Math.min((tokens / maxTokens) * 100, 100);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 to-purple-50 flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full shadow-xl">
        <CardHeader className="text-center pb-6">
          <div className={`mx-auto mb-4 w-20 h-20 bg-gradient-to-r ${performance.color} rounded-full flex items-center justify-center text-white shadow-lg`}>
            {performance.icon}
          </div>
          <CardTitle className="text-3xl bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
            ¡Desafío Completado!
          </CardTitle>
          <p className="text-muted-foreground mt-2">¡{teamName} ha conquistado las 5 fases emprendedoras!</p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="text-center space-y-4">
            <Badge variant="secondary" className="text-xl px-6 py-3">
              {performance.level}
            </Badge>
            
            <div className="bg-gradient-to-r from-violet-50 to-purple-50 p-6 rounded-lg border border-violet-200">
              <div className="text-4xl font-bold text-violet-600 mb-2">
                {tokens} Tokens
              </div>
              <Progress value={percentage} className="mb-3" />
              <p className="text-violet-700">
                {percentage.toFixed(0)}% of maximum possible score
              </p>
            </div>
            
            <p className="text-lg leading-relaxed">
              {performance.message}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h4 className="font-medium text-blue-800 mb-2">Fases Completadas</h4>
              <p className="text-2xl font-bold text-blue-600">5/5</p>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h4 className="font-medium text-green-800 mb-2">Habilidades Evaluadas</h4>
              <p className="text-sm text-green-700">Estrategia • Innovación • Liderazgo • Adaptabilidad • Crecimiento</p>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-4 rounded-lg border border-amber-200">
            <h4 className="font-medium text-amber-800 mb-2">🎓 Lecciones Emprendedoras Clave</h4>
            <ul className="text-sm text-amber-700 space-y-1">
              <li>• La validación temprana supera al perfeccionismo</li>
              <li>• Enfócate en ingresos quando los fondos son bajos</li>
              <li>• La propuesta de valor única es tu mejor defensa</li>
              <li>• La compatibilidad cultural importa en las contrataciones</li>
              <li>• El feedback es oro para la mejora continua</li>
            </ul>
          </div>
          
          <div className="flex gap-4">
            <Button 
              onClick={onRestart}
              size="lg"
              variant="outline"
              className="flex-1"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Intentar de Nuevo
            </Button>
            <Button 
              size="lg"
              className="flex-1 bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600"
              onClick={() => window.location.href = '#'}
            >
              <Trophy className="w-4 h-4 mr-2" />
              Compartir Resultados
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}