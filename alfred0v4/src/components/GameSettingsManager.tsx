import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Switch } from "./ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";
import { toast } from "sonner@2.0.3";
import { usePhaseConfig } from "../contexts/PhaseConfigContext";
import { useLanguage } from "../contexts/LanguageContext";
import { GameSettings } from "../utils/phaseConfig";
import { 
  Settings, 
  Save, 
  Download, 
  Upload, 
  RotateCcw,
  FileText,
  Globe,
  Users,
  Eye,
  EyeOff
} from "lucide-react";

export function GameSettingsManager() {
  const { t } = useLanguage();
  const { settings, updateSettings, exportConfig, importConfig, resetToDefault } = usePhaseConfig();
  const [editedSettings, setEditedSettings] = useState<GameSettings>(settings);
  const [hasChanges, setHasChanges] = useState(false);

  const handleSettingChange = (field: keyof GameSettings, value: any) => {
    const newSettings = { ...editedSettings, [field]: value };
    setEditedSettings(newSettings);
    setHasChanges(JSON.stringify(newSettings) !== JSON.stringify(settings));
  };

  const handleSaveSettings = () => {
    try {
      updateSettings(editedSettings);
      setHasChanges(false);
      toast.success(t('configurationSaved'));
    } catch (error) {
      toast.error(t('configurationError'));
    }
  };

  const handleExportConfig = () => {
    try {
      const config = exportConfig();
      const blob = new Blob([config], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `alfred0-config-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast.success("Configuración exportada exitosamente");
    } catch (error) {
      toast.error("Error al exportar la configuración");
    }
  };

  const handleImportConfig = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const success = importConfig(content);
        if (success) {
          setEditedSettings(settings);
          setHasChanges(false);
          toast.success("Configuración importada exitosamente");
        } else {
          toast.error("Error: Archivo de configuración inválido");
        }
      } catch (error) {
        toast.error("Error al leer el archivo");
      }
    };
    reader.readAsText(file);
    
    // Reset input
    event.target.value = '';
  };

  const handleReset = () => {
    resetToDefault();
    setEditedSettings(settings);
    setHasChanges(false);
    toast.success("Configuración restablecida por defecto");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            {t('gameConfiguration')}
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            {t('gameConfigurationDesc')}
          </p>
        </CardHeader>
      </Card>

      {/* Game Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Información del Juego
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>{t('gameName')}</Label>
            <Input
              value={editedSettings.gameName}
              onChange={(e) => handleSettingChange('gameName', e.target.value)}
              placeholder="Nombre del juego"
            />
          </div>
          <div>
            <Label>{t('gameDescription')}</Label>
            <Textarea
              value={editedSettings.gameDescription}
              onChange={(e) => handleSettingChange('gameDescription', e.target.value)}
              placeholder="Descripción del juego"
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Player Experience */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Experiencia del Jugador
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="flex items-center gap-2">
                {editedSettings.showTokensToPlayers ? (
                  <Eye className="w-4 h-4" />
                ) : (
                  <EyeOff className="w-4 h-4" />
                )}
                {t('showTokensToPlayers')}
              </Label>
              <p className="text-sm text-muted-foreground">
                Mostrar la puntuación de tokens durante el juego
              </p>
            </div>
            <Switch
              checked={editedSettings.showTokensToPlayers}
              onCheckedChange={(checked) => handleSettingChange('showTokensToPlayers', checked)}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>{t('teamNameRequired')}</Label>
              <p className="text-sm text-muted-foreground">
                Obligar a los equipos a ingresar un nombre
              </p>
            </div>
            <Switch
              checked={editedSettings.teamNameRequired}
              onCheckedChange={(checked) => handleSettingChange('teamNameRequired', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>{t('allowTeamNameChange')}</Label>
              <p className="text-sm text-muted-foreground">
                Permitir que los equipos cambien su nombre durante el juego
              </p>
            </div>
            <Switch
              checked={editedSettings.allowTeamNameChange}
              onCheckedChange={(checked) => handleSettingChange('allowTeamNameChange', checked)}
            />
          </div>

          <div>
            <Label>{t('maxTeamNameLength')}</Label>
            <Input
              type="number"
              min="5"
              max="100"
              value={editedSettings.maxTeamNameLength}
              onChange={(e) => handleSettingChange('maxTeamNameLength', parseInt(e.target.value) || 30)}
            />
            <p className="text-xs text-muted-foreground mt-1">
              Mínimo 5 caracteres, máximo 100 caracteres
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Language Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="w-5 h-5" />
            Configuración de Idioma
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>{t('defaultLanguage')}</Label>
            <Select
              value={editedSettings.defaultLanguage}
              onValueChange={(value) => handleSettingChange('defaultLanguage', value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="es">Español</SelectItem>
                <SelectItem value="en">English</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Idiomas Disponibles</Label>
            <div className="flex gap-2 mt-2">
              {editedSettings.gameLanguages.map((lang) => (
                <Badge key={lang} variant="outline">
                  {lang === 'es' ? 'Español' : 'English'}
                </Badge>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Actualmente se soportan Español e Inglés
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Statistics */}
      <Card>
        <CardHeader>
          <CardTitle>Estadísticas del Juego</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{editedSettings.totalPhases}</p>
              <p className="text-sm text-muted-foreground">Fases Totales</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">
                {editedSettings.gameLanguages.length}
              </p>
              <p className="text-sm text-muted-foreground">Idiomas</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">
                {editedSettings.maxTeamNameLength}
              </p>
              <p className="text-sm text-muted-foreground">Max. Caracteres</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-600">
                {editedSettings.showTokensToPlayers ? 'Visible' : 'Oculto'}
              </p>
              <p className="text-sm text-muted-foreground">Tokens</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Configuration Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Gestión de Configuración</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <Button onClick={handleExportConfig} variant="outline">
              <Download className="w-4 h-4 mr-2" />
              {t('exportConfiguration')}
            </Button>
            
            <div className="relative">
              <input
                type="file"
                accept=".json"
                onChange={handleImportConfig}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <Button variant="outline">
                <Upload className="w-4 h-4 mr-2" />
                {t('importConfiguration')}
              </Button>
            </div>
            
            <Button onClick={handleReset} variant="outline" className="text-orange-600">
              <RotateCcw className="w-4 h-4 mr-2" />
              {t('resetConfiguration')}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Save Changes */}
      {hasChanges && (
        <Card className="border-amber-200 bg-amber-50">
          <CardContent className="pt-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium text-amber-800">Cambios sin guardar</p>
                <p className="text-sm text-amber-600">
                  Tienes cambios pendientes en la configuración del juego
                </p>
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setEditedSettings(settings);
                    setHasChanges(false);
                  }}
                >
                  Descartar
                </Button>
                <Button onClick={handleSaveSettings}>
                  <Save className="w-4 h-4 mr-2" />
                  Guardar Cambios
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}