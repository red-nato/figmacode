import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Users, ChevronRight } from "lucide-react";

interface Phase4Props {
  teamName: string;
  onComplete: (tokensEarned: number) => void;
}

interface Option {
  text: string;
  tokens: number;
}

const PHASE_DATA = {
  title: "Construcción de Equipo",
  question: "Es momento de contratar su primer empleado. ¿En qué se enfocan principalmente al elegir candidatos?",
  explanation: "¡Excelente! El ajuste cultural y el potencial de crecimiento son fundamentales en startups donde todos deben adaptarse rápidamente.",
  options: [
    { text: "Contratar a la persona más barata disponible", tokens: 5 },
    { text: "Solo considerar candidatos con experiencia perfecta", tokens: 10 },
    { text: "Buscar compatibilidad cultural y potencial de crecimiento", tokens: 25 },
    { text: "Contratar a un amigo cercano sin evaluación", tokens: 15 }
  ] as Option[]
};

export function Phase4({ teamName, onComplete }: Phase4Props) {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [showResult, setShowResult] = useState(false);
  const [tokensEarned, setTokensEarned] = useState(0);

  const handleSubmit = () => {
    if (!selectedOption) return;
    
    const selected = PHASE_DATA.options.find(opt => opt.text === selectedOption);
    const earned = selected?.tokens || 0;
    setTokensEarned(earned);
    setShowResult(true);
  };

  const handleNext = () => {
    onComplete(tokensEarned);
  };

  if (showResult) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center p-4">
        <Card className="max-w-2xl w-full shadow-xl">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 w-16 h-16 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full flex items-center justify-center">
              <Users className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl text-orange-600">¡Fase 4 Completada!</CardTitle>
            <p className="text-muted-foreground">Equipo: {teamName}</p>
          </CardHeader>
          
          <CardContent className="text-center space-y-6">
            <div className="bg-orange-50 p-6 rounded-lg border border-orange-200">
              <p className="text-3xl font-bold text-orange-600 mb-2">+{tokensEarned} Tokens</p>
              <p className="text-orange-700">¡Excelente estrategia de talento!</p>
            </div>
            
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-lg border border-yellow-200">
              <p className="text-yellow-800">
                <strong>👥 Lección clave:</strong> {PHASE_DATA.explanation}
              </p>
            </div>
            
            <Button onClick={handleNext} size="lg" className="w-full bg-gradient-to-r from-orange-500 to-amber-500">
              Continuar <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full shadow-xl">
        <CardHeader>
          <div className="flex justify-between items-center mb-4">
            <Badge variant="secondary">Fase 4 de 5</Badge>
            <p className="text-sm text-muted-foreground">Equipo: <strong>{teamName}</strong></p>
          </div>
          
          <CardTitle className="text-xl">{PHASE_DATA.title}</CardTitle>
          <p className="text-muted-foreground">¡El equipo adecuado puede hacer la diferencia entre el éxito y el fracaso!</p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="bg-gradient-to-r from-orange-50 to-amber-50 p-6 rounded-lg border">
            <h3 className="text-lg font-medium mb-4">{PHASE_DATA.question}</h3>
            
            <RadioGroup value={selectedOption} onValueChange={setSelectedOption}>
              {PHASE_DATA.options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2 p-3 rounded-lg hover:bg-white/50 border border-transparent hover:border-orange-200 transition-all">
                  <RadioGroupItem value={option.text} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                    {option.text}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
          
          <Button 
            onClick={handleSubmit}
            disabled={!selectedOption}
            size="lg"
            className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600"
          >
            Confirmar Respuesta
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}