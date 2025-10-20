import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Alert, AlertDescription } from "./ui/alert";
import { Users, Sparkles, ArrowRight, AlertCircle } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { LanguageToggle } from "./LanguageToggle";

interface TeamSetupProps {
  onContinue: (teamName: string) => void;
  adminSetTeamName?: string; // Nombre establecido por el admin remoto
}

export function TeamSetup({ onContinue, adminSetTeamName }: TeamSetupProps) {
  const [teamName, setTeamName] = useState("");
  const [error, setError] = useState("");
  const { t } = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!teamName.trim()) {
      setError(t('nameRequiredError'));
      return;
    }

    if (teamName.trim().length < 2) {
      setError(t('nameMinLengthError'));
      return;
    }

    if (teamName.trim().length > 20) {
      setError(t('nameMaxLengthError'));
      return;
    }

    onContinue(teamName.trim());
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="absolute top-4 right-4">
        <LanguageToggle />
      </div>
      <Card className="max-w-lg w-full shadow-xl">
        <CardHeader className="text-center pb-6">
          <div className="mx-auto mb-4 w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
            <Users className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            {t('teamConfiguration')}
          </CardTitle>
          <p className="text-muted-foreground mt-2">
            {t('teamConfigSubtitle')}
          </p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {adminSetTeamName && (
            <Alert className="border-blue-200 bg-blue-50">
              <AlertCircle className="w-4 h-4 text-blue-600" />
              <AlertDescription className="text-blue-800">
                <strong>{t('adminAssignedName')}</strong> {adminSetTeamName}
              </AlertDescription>
            </Alert>
          )}

          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2 text-green-600">
              <Sparkles className="w-5 h-5" />
              <span>{t('letsBeginAdventure')}</span>
              <Sparkles className="w-5 h-5" />
            </div>
            
            <p className="text-muted-foreground">
              {t('teamConfigDesc')}
            </p>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="w-4 h-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="teamName" className="text-lg">
                {t('teamName')}
              </Label>
              <Input
                id="teamName"
                type="text"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                placeholder={t('teamNamePlaceholder')}
                className="text-lg p-4 h-14"
                maxLength={20}
                autoFocus
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Mínimo 2 caracteres</span>
                <span>{teamName.length}/20</span>
              </div>
            </div>

            <div className="bg-gradient-to-r from-amber-50 to-yellow-50 p-4 rounded-lg border border-amber-200">
              <h4 className="font-medium text-amber-800 mb-2">{t('nameTips')}</h4>
              <ul className="text-sm text-amber-700 space-y-1">
                <li>{t('tipCreative')}</li>
                <li>{t('tipEntrepreneurial')}</li>
                <li>{t('tipEasyPronounce')}</li>
                <li>{t('tipMotivating')}</li>
              </ul>
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 h-14"
              disabled={!teamName.trim() || teamName.trim().length < 2}
            >
              <span className="mr-2">{t('startChallenge')}</span>
              <ArrowRight className="w-5 h-5" />
            </Button>
          </form>

          <div className="text-center text-sm text-muted-foreground">
            <p>{t('confirmNameMessage')}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}