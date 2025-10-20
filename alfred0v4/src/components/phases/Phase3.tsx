import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Zap, ChevronRight } from "lucide-react";

interface Phase3Props {
  teamName: string;
  onComplete: (tokensEarned: number) => void;
}

interface Option {
  text: string;
  tokens: number;
}

const PHASE_DATA = {
  title: "Competencia Directa",
  question: "Una gran empresa entra a su mercado con un producto similar pero con más recursos. ¿Cuál es su estrategia?",
  explanation: "¡Brillante! Enfocarse en lo que te hace único es la mejor defensa contra la competencia con más recursos.",
  options: [
    { text: "Iniciar una guerra de precios inmediatamente", tokens: 10 },
    { text: "Fortalecer y comunicar nuestra propuesta de valor única", tokens: 25 },
    { text: "Rendirse y buscar un mercado completamente diferente", tokens: 0 },
    { text: "Copiar exactamente su estrategia", tokens: 5 }
  ] as Option[]
};

export function Phase3({ teamName, onComplete }: Phase3Props) {
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
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center p-4">
        <Card className="max-w-2xl w-full shadow-xl">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl text-purple-600">¡Fase 3 Completada!</CardTitle>
            <p className="text-muted-foreground">Equipo: {teamName}</p>
          </CardHeader>
          
          <CardContent className="text-center space-y-6">
            <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
              <p className="text-3xl font-bold text-purple-600 mb-2">+{tokensEarned} Tokens</p>
              <p className="text-purple-700">¡Estrategia competitiva exitosa!</p>
            </div>
            
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg border border-blue-200">
              <p className="text-blue-800">
                <strong>⚡ Lección clave:</strong> {PHASE_DATA.explanation}
              </p>
            </div>
            
            <Button onClick={handleNext} size="lg" className="w-full bg-gradient-to-r from-purple-500 to-pink-500">
              Continuar <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full shadow-xl">
        <CardHeader>
          <div className="flex justify-between items-center mb-4">
            <Badge variant="secondary">Fase 3 de 5</Badge>
            <p className="text-sm text-muted-foreground">Equipo: <strong>{teamName}</strong></p>
          </div>
          
          <CardTitle className="text-xl">{PHASE_DATA.title}</CardTitle>
          <p className="text-muted-foreground">¡La competencia puede ser una oportunidad para destacar!</p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg border">
            <h3 className="text-lg font-medium mb-4">{PHASE_DATA.question}</h3>
            
            <RadioGroup value={selectedOption} onValueChange={setSelectedOption}>
              {PHASE_DATA.options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2 p-3 rounded-lg hover:bg-white/50 border border-transparent hover:border-purple-200 transition-all">
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
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
          >
            Confirmar Respuesta
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}