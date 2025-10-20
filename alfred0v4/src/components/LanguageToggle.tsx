import { Button } from "./ui/button";
import { Globe } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

interface LanguageToggleProps {
  className?: string;
  variant?: "default" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

export function LanguageToggle({ 
  className = "", 
  variant = "ghost", 
  size = "sm" 
}: LanguageToggleProps) {
  const { language, setLanguage, t } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'es' ? 'en' : 'es');
  };

  return (
    <Button
      onClick={toggleLanguage}
      variant={variant}
      size={size}
      className={`flex items-center gap-2 ${className}`}
      title={t('language')}
    >
      <Globe className="w-4 h-4" />
      <span className="text-sm font-medium">
        {language === 'es' ? 'ES' : 'EN'}
      </span>
    </Button>
  );
}