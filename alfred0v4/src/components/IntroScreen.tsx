import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Lightbulb, Target, TrendingUp } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { LanguageToggle } from "./LanguageToggle";

interface IntroScreenProps {
  onStart: () => void;
  onAdminAccess: () => void;
}

export function IntroScreen({
  onStart,
  onAdminAccess,
}: IntroScreenProps) {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
      <div className="absolute top-4 right-4">
        <LanguageToggle />
      </div>
      <Card className="max-w-2xl w-full shadow-xl">
        <CardHeader className="text-center pb-8">
          <div className="mx-auto mb-4 w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
            <Lightbulb className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-3xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {t('appTitle')}
          </CardTitle>
          <p className="text-muted-foreground mt-2">
            {t('appSubtitle')}
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center space-y-4">
            <p className="text-lg leading-relaxed">
              {t('welcomeMessage')}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
              <div className="flex flex-col items-center p-4 bg-blue-50 rounded-lg">
                <Target className="w-8 h-8 text-blue-500 mb-2" />
                <h3 className="font-medium">
                  {t('teamwork')}
                </h3>
                <p className="text-sm text-muted-foreground text-center">
                  {t('teamworkDesc')}
                </p>
              </div>

              <div className="flex flex-col items-center p-4 bg-purple-50 rounded-lg">
                <Lightbulb className="w-8 h-8 text-purple-500 mb-2" />
                <h3 className="font-medium">{t('innovation')}</h3>
                <p className="text-sm text-muted-foreground text-center">
                  {t('innovationDesc')}
                </p>
              </div>

              <div className="flex flex-col items-center p-4 bg-green-50 rounded-lg">
                <TrendingUp className="w-8 h-8 text-green-500 mb-2" />
                <h3 className="font-medium">{t('competition')}</h3>
                <p className="text-sm text-muted-foreground text-center">
                  {t('competitionDesc')}
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-4 rounded-lg border border-amber-200">
              <p className="text-amber-800">
                <strong>{t('howItWorks')}</strong> {t('howItWorksDesc')}
              </p>
            </div>
          </div>

          <div className="text-center pt-4 space-y-4">
            <Button
              onClick={onStart}
              size="lg"
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 px-8 w-full"
            >
              {t('letsStart')}
            </Button>

            <Button
              onClick={onAdminAccess}
              variant="ghost"
              size="sm"
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              {t('adminAccess')}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}