import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { toast } from "sonner@2.0.3";
import { useTokenConfig } from "../contexts/TokenConfigContext";
import { useLanguage } from "../contexts/LanguageContext";
import { Settings, Trophy, Zap, Target, Users, Crown } from "lucide-react";

export function TokenConfigManager() {
  const { t } = useLanguage();
  const { 
    config, 
    updateConfig, 
    loadPreset, 
    resetToDefault, 
    getAvailablePresets, 
    getCurrentPresetId,
    calculator 
  } = useTokenConfig();
  
  const [editedConfig, setEditedConfig] = useState(config);
  const [hasChanges, setHasChanges] = useState(false);

  const presets = getAvailablePresets();
  const currentPresetId = getCurrentPresetId();

  const handleConfigChange = (phase: keyof typeof editedConfig, field: string, value: number) => {
    const newConfig = {
      ...editedConfig,
      [phase]: {
        ...editedConfig[phase],
        [field]: value
      }
    };
    setEditedConfig(newConfig);
    setHasChanges(JSON.stringify(newConfig) !== JSON.stringify(config));
  };

  const handleSaveConfiguration = () => {
    try {
      updateConfig(editedConfig);
      setHasChanges(false);
      toast.success(t('tokenConfigSaved'));
    } catch (error) {
      toast.error(t('tokenConfigError'));
    }
  };

  const handleLoadPreset = (presetId: string) => {
    loadPreset(presetId);
    setEditedConfig(config);
    setHasChanges(false);
    const preset = presets.find(p => p.id === presetId);
    toast.success(`Preset "${preset?.name}" cargado exitosamente`);
  };

  const handleReset = () => {
    resetToDefault();
    setEditedConfig(config);
    setHasChanges(false);
    toast.success("Configuración restablecida por defecto");
  };

  const maxTokens = calculator.getMaxPossibleTokens();

  const getPhaseIcon = (phase: number) => {
    switch (phase) {
      case 1: return <Zap className="w-4 h-4" />;
      case 2: return <Target className="w-4 h-4" />;
      case 3: return <Trophy className="w-4 h-4" />;
      case 4: return <Users className="w-4 h-4" />;
      case 5: return <Crown className="w-4 h-4" />;
      default: return <Settings className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            {t('tokenConfiguration')}
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            {t('tokenConfigurationDesc')}
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Current Status */}
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium">{t('currentPreset')}</p>
              <p className="text-sm text-muted-foreground">
                {currentPresetId ? 
                  presets.find(p => p.id === currentPresetId)?.name : 
                  t('customConfiguration')
                }
              </p>
            </div>
            <Badge variant="outline" className="flex items-center gap-1">
              <Trophy className="w-3 h-3" />
              {t('maxPossibleTokens')}: {maxTokens}
            </Badge>
          </div>

          {/* Preset Selection */}
          <div className="space-y-2">
            <Label>{t('loadPreset')}</Label>
            <div className="flex gap-2">
              <Select onValueChange={handleLoadPreset}>
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Seleccionar preset..." />
                </SelectTrigger>
                <SelectContent>
                  {presets.map((preset) => (
                    <SelectItem key={preset.id} value={preset.id}>
                      <div>
                        <div className="font-medium">{preset.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {preset.description}
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button variant="outline" onClick={handleReset}>
                {t('resetToDefault')}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Phase Configurations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Phase 1 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {getPhaseIcon(1)}
              {t('phase1Config')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>{t('completionTokens')}</Label>
                <Input
                  type="number"
                  value={editedConfig.phase1.completion}
                  onChange={(e) => handleConfigChange('phase1', 'completion', parseInt(e.target.value) || 0)}
                />
              </div>
              <div>
                <Label>{t('timeBonusTokens')}</Label>
                <Input
                  type="number"
                  value={editedConfig.phase1.timeBonus}
                  onChange={(e) => handleConfigChange('phase1', 'timeBonus', parseInt(e.target.value) || 0)}
                />
              </div>
              <div>
                <Label>{t('perfectAnagramTokens')}</Label>
                <Input
                  type="number"
                  value={editedConfig.phase1.perfectAnagram}
                  onChange={(e) => handleConfigChange('phase1', 'perfectAnagram', parseInt(e.target.value) || 0)}
                />
              </div>
              <div>
                <Label>{t('perfectWordSearchTokens')}</Label>
                <Input
                  type="number"
                  value={editedConfig.phase1.perfectWordSearch}
                  onChange={(e) => handleConfigChange('phase1', 'perfectWordSearch', parseInt(e.target.value) || 0)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Phase 2 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {getPhaseIcon(2)}
              {t('phase2Config')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>{t('completionTokens')}</Label>
                <Input
                  type="number"
                  value={editedConfig.phase2.completion}
                  onChange={(e) => handleConfigChange('phase2', 'completion', parseInt(e.target.value) || 0)}
                />
              </div>
              <div>
                <Label>{t('challengeSelectionTokens')}</Label>
                <Input
                  type="number"
                  value={editedConfig.phase2.challengeSelection}
                  onChange={(e) => handleConfigChange('phase2', 'challengeSelection', parseInt(e.target.value) || 0)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Phase 3 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {getPhaseIcon(3)}
              {t('phase3Config')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>{t('correctAnswerTokens')}</Label>
                <Input
                  type="number"
                  value={editedConfig.phase3.correct}
                  onChange={(e) => handleConfigChange('phase3', 'correct', parseInt(e.target.value) || 0)}
                />
              </div>
              <div>
                <Label>{t('incorrectAnswerTokens')}</Label>
                <Input
                  type="number"
                  value={editedConfig.phase3.incorrect}
                  onChange={(e) => handleConfigChange('phase3', 'incorrect', parseInt(e.target.value) || 0)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Phase 4 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {getPhaseIcon(4)}
              {t('phase4Config')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>{t('correctAnswerTokens')}</Label>
                <Input
                  type="number"
                  value={editedConfig.phase4.correct}
                  onChange={(e) => handleConfigChange('phase4', 'correct', parseInt(e.target.value) || 0)}
                />
              </div>
              <div>
                <Label>{t('incorrectAnswerTokens')}</Label>
                <Input
                  type="number"
                  value={editedConfig.phase4.incorrect}
                  onChange={(e) => handleConfigChange('phase4', 'incorrect', parseInt(e.target.value) || 0)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Phase 5 */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {getPhaseIcon(5)}
              {t('phase5Config')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 max-w-md">
              <div>
                <Label>{t('correctAnswerTokens')}</Label>
                <Input
                  type="number"
                  value={editedConfig.phase5.correct}
                  onChange={(e) => handleConfigChange('phase5', 'correct', parseInt(e.target.value) || 0)}
                />
              </div>
              <div>
                <Label>{t('incorrectAnswerTokens')}</Label>
                <Input
                  type="number"
                  value={editedConfig.phase5.incorrect}
                  onChange={(e) => handleConfigChange('phase5', 'incorrect', parseInt(e.target.value) || 0)}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Save Actions */}
      {hasChanges && (
        <Card className="border-amber-200 bg-amber-50">
          <CardContent className="pt-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium text-amber-800">Cambios sin guardar</p>
                <p className="text-sm text-amber-600">
                  Tienes cambios pendientes en la configuración de tokens
                </p>
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setEditedConfig(config);
                    setHasChanges(false);
                  }}
                >
                  Descartar
                </Button>
                <Button onClick={handleSaveConfiguration}>
                  {t('saveConfiguration')}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}