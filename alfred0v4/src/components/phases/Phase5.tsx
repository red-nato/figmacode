import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { MessageSquare, ChevronRight } from "lucide-react";

interface Phase5Props {
  teamName: string;
  onComplete: (tokensEarned: number) => void;
}

interface Option {
  text: string;
  tokens: number;
}

const PHASE_DATA = {
  title: "Gestión de Feedback",
  question: "Su producto recibe críticas muy duras en redes sociales y medios. ¿Cuál es su respuesta como equipo?",
  explanation: "¡Perfecto! Las críticas constructivas son oro puro para los emprendedores que buscan mejorar continuamente.",
  options: [
    { text: "Ignorar completamente todas las críticas", tokens: 5 },
    { text: "Responder agresivamente a cada crítico", tokens: 0 },
    { text: "Analizar el feedback y usarlo para mejorar el producto", tokens: 25 },
    { text: "Retirar el producto del mercado inmediatamente", tokens: 10 }
  ] as Option[]
};

export function Phase5({ teamName, onComplete }: Phase5Props) {
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
      <div className="min-h-screen bg-gradient-to-br from-rose-50 to-red-50 flex items-center justify-center p-4">
        <Card className="max-w-2xl w-full shadow-xl">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 w-16 h-16 bg-gradient-to-r from-rose-500 to-red-500 rounded-full flex items-center justify-center">
              <MessageSquare className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl text-rose-600">¡Fase 5 Completada!</CardTitle>
            <p className="text-muted-foreground">Equipo: {teamName}</p>
          </CardHeader>
          
          <CardContent className="text-center space-y-6">
            <div className="bg-rose-50 p-6 rounded-lg border border-rose-200">
              <p className="text-3xl font-bold text-rose-600 mb-2">+{tokensEarned} Tokens</p>
              <p className="text-rose-700">¡Gestión inteligente del feedback!</p>
            </div>
            
            <div className="bg-gradient-to-r from-pink-50 to-rose-50 p-4 rounded-lg border border-pink-200">
              <p className="text-pink-800">
                <strong>💬 Lección clave:</strong> {PHASE_DATA.explanation}
              </p>
            </div>
            
            <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg border border-green-200">
              <p className="text-green-800">
                🎉 <strong>¡Felicitaciones {teamName}!</strong> Han completado todas las fases del desafío emprendedor.
              </p>
            </div>
            
            <Button onClick={handleNext} size="lg" className="w-full bg-gradient-to-r from-rose-500 to-red-500">
              Ver Resultados Finales <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-red-50 flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full shadow-xl">
        <CardHeader>
          <div className="flex justify-between items-center mb-4">
            <Badge variant="secondary">Fase 5 de 5</Badge>
            <p className="text-sm text-muted-foreground">Equipo: <strong>{teamName}</strong></p>
          </div>
          
          <CardTitle className="text-xl">{PHASE_DATA.title}</CardTitle>
          <p className="text-muted-foreground">¡Última fase! Demuestren cómo manejan la presión y las críticas.</p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="bg-gradient-to-r from-rose-50 to-red-50 p-6 rounded-lg border">
            <h3 className="text-lg font-medium mb-4">{PHASE_DATA.question}</h3>
            
            <RadioGroup value={selectedOption} onValueChange={setSelectedOption}>
              {PHASE_DATA.options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2 p-3 rounded-lg hover:bg-white/50 border border-transparent hover:border-rose-200 transition-all">
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
            className="w-full bg-gradient-to-r from-rose-500 to-red-500 hover:from-rose-600 hover:to-red-600"
          >
            Confirmar Respuesta Final
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}