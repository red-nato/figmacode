import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Switch } from "./ui/switch";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog";
import { toast } from "sonner@2.0.3";
import { usePhaseConfig } from "../contexts/PhaseConfigContext";
import { useLanguage } from "../contexts/LanguageContext";
import { PhaseConfig, Question } from "../utils/phaseConfig";
import { 
  Plus, 
  Edit, 
  Trash2, 
  ArrowUp, 
  ArrowDown, 
  Clock, 
  BookOpen, 
  HelpCircle, 
  Settings,
  Play,
  Pause,
  Save,
  X
} from "lucide-react";

export function PhaseManager() {
  const { t } = useLanguage();
  const { 
    phases, 
    addPhase, 
    updatePhase, 
    deletePhase, 
    movePhase,
    addQuestionToPhase,
    updateQuestionInPhase,
    deleteQuestionFromPhase
  } = usePhaseConfig();
  
  const [isAddingPhase, setIsAddingPhase] = useState(false);
  const [editingPhase, setEditingPhase] = useState<string | null>(null);
  const [editingQuestion, setEditingQuestion] = useState<{phaseId: string, questionId: string} | null>(null);
  const [newPhase, setNewPhase] = useState<Partial<PhaseConfig>>({
    title: '',
    description: '',
    type: 'multiple-choice',
    isActive: true,
    timeLimit: 300
  });

  const handleAddPhase = () => {
    if (!newPhase.title || !newPhase.description) {
      toast.error("Por favor completa todos los campos obligatorios");
      return;
    }

    try {
      addPhase(newPhase as Omit<PhaseConfig, 'id' | 'order'>);
      setNewPhase({
        title: '',
        description: '',
        type: 'multiple-choice',
        isActive: true,
        timeLimit: 300
      });
      setIsAddingPhase(false);
      toast.success(t('phaseSaved'));
    } catch (error) {
      toast.error(t('phaseError'));
    }
  };

  const handleUpdatePhase = (id: string, updates: Partial<PhaseConfig>) => {
    try {
      updatePhase(id, updates);
      setEditingPhase(null);
      toast.success(t('phaseSaved'));
    } catch (error) {
      toast.error(t('phaseError'));
    }
  };

  const handleDeletePhase = (id: string) => {
    try {
      deletePhase(id);
      toast.success(t('phaseDeleted'));
    } catch (error) {
      toast.error(t('phaseError'));
    }
  };

  const handleAddQuestion = (phaseId: string) => {
    const newQuestion: Omit<Question, 'id'> = {
      text: '',
      options: ['', '', '', ''],
      correctAnswer: 0,
      explanation: ''
    };

    try {
      addQuestionToPhase(phaseId, newQuestion);
      toast.success("Pregunta agregada exitosamente");
    } catch (error) {
      toast.error("Error al agregar la pregunta");
    }
  };

  const getPhaseTypeIcon = (type: string) => {
    switch (type) {
      case 'timed-challenge': return <Clock className="w-4 h-4" />;
      case 'story-selection': return <BookOpen className="w-4 h-4" />;
      case 'multiple-choice': return <HelpCircle className="w-4 h-4" />;
      default: return <Settings className="w-4 h-4" />;
    }
  };

  const getPhaseTypeName = (type: string) => {
    switch (type) {
      case 'timed-challenge': return t('timedChallenge');
      case 'story-selection': return t('storySelection');
      case 'multiple-choice': return t('multipleChoice');
      case 'custom': return t('customPhase');
      default: return type;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                {t('phaseManagement')}
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                {t('phaseManagementDesc')}
              </p>
            </div>
            <Dialog open={isAddingPhase} onOpenChange={setIsAddingPhase}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  {t('addNewPhase')}
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>{t('addNewPhase')}</DialogTitle>
                  <DialogDescription>
                    Crea una nueva fase para el juego
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label>{t('phaseTitle')} *</Label>
                    <Input
                      value={newPhase.title || ''}
                      onChange={(e) => setNewPhase(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Ej: Estrategia de Mercado"
                    />
                  </div>
                  <div>
                    <Label>{t('phaseDescription')} *</Label>
                    <Textarea
                      value={newPhase.description || ''}
                      onChange={(e) => setNewPhase(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Describe el objetivo y contenido de esta fase"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>{t('phaseType')}</Label>
                      <Select
                        value={newPhase.type}
                        onValueChange={(value: any) => setNewPhase(prev => ({ ...prev, type: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="multiple-choice">{t('multipleChoice')}</SelectItem>
                          <SelectItem value="timed-challenge">{t('timedChallenge')}</SelectItem>
                          <SelectItem value="story-selection">{t('storySelection')}</SelectItem>
                          <SelectItem value="custom">{t('customPhase')}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    {newPhase.type === 'timed-challenge' && (
                      <div>
                        <Label>{t('timeLimit')}</Label>
                        <Input
                          type="number"
                          value={newPhase.timeLimit || 300}
                          onChange={(e) => setNewPhase(prev => ({ ...prev, timeLimit: parseInt(e.target.value) || 300 }))}
                        />
                      </div>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={newPhase.isActive}
                      onCheckedChange={(checked) => setNewPhase(prev => ({ ...prev, isActive: checked }))}
                    />
                    <Label>{t('isActive')}</Label>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddingPhase(false)}>
                    Cancelar
                  </Button>
                  <Button onClick={handleAddPhase}>
                    <Save className="w-4 h-4 mr-2" />
                    Guardar Fase
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
      </Card>

      {/* Phases List */}
      <div className="space-y-4">
        {phases.map((phase) => (
          <Card key={phase.id} className={!phase.isActive ? "opacity-60" : ""}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="flex items-center gap-1">
                      {getPhaseTypeIcon(phase.type)}
                      {getPhaseTypeName(phase.type)}
                    </Badge>
                    {!phase.isActive && (
                      <Badge variant="secondary">
                        <Pause className="w-3 h-3 mr-1" />
                        Inactiva
                      </Badge>
                    )}
                    {phase.isActive && (
                      <Badge variant="default">
                        <Play className="w-3 h-3 mr-1" />
                        Activa
                      </Badge>
                    )}
                    <span className="text-sm text-muted-foreground">
                      Orden: {phase.order}
                    </span>
                  </div>
                  <h3 className="font-semibold">{phase.title}</h3>
                  <p className="text-sm text-muted-foreground">{phase.description}</p>
                  {phase.timeLimit && (
                    <p className="text-xs text-blue-600">
                      <Clock className="w-3 h-3 inline mr-1" />
                      Límite: {phase.timeLimit}s
                    </p>
                  )}
                </div>
                
                <div className="flex items-center gap-1">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => movePhase(phase.id, 'up')}
                    disabled={phase.order === 1}
                  >
                    <ArrowUp className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => movePhase(phase.id, 'down')}
                    disabled={phase.order === phases.length}
                  >
                    <ArrowDown className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setEditingPhase(phase.id)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>{t('confirmDelete')}</AlertDialogTitle>
                        <AlertDialogDescription>
                          {t('confirmDeletePhase')}
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction 
                          onClick={() => handleDeletePhase(phase.id)}
                          className="bg-red-600 hover:bg-red-700"
                        >
                          Eliminar
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </CardHeader>
            
            {/* Questions for multiple-choice phases */}
            {phase.type === 'multiple-choice' && (
              <CardContent>
                <Separator className="mb-4" />
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">{t('questions')} ({phase.questions?.length || 0})</h4>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleAddQuestion(phase.id)}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      {t('addQuestion')}
                    </Button>
                  </div>
                  
                  {phase.questions?.map((question, index) => (
                    <div key={question.id} className="border rounded-lg p-3 space-y-2">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <p className="font-medium text-sm">Pregunta {index + 1}</p>
                          <p className="text-sm text-muted-foreground">{question.text}</p>
                          <div className="grid grid-cols-2 gap-2 mt-2">
                            {question.options.map((option, optionIndex) => (
                              <div key={optionIndex} className={`text-xs p-2 rounded ${
                                optionIndex === question.correctAnswer 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-gray-100'
                              }`}>
                                {option}
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="flex gap-1">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setEditingQuestion({phaseId: phase.id, questionId: question.id})}
                          >
                            <Edit className="w-3 h-3" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-600"
                            onClick={() => deleteQuestionFromPhase(phase.id, question.id)}
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            )}
          </Card>
        ))}
        
        {phases.length === 0 && (
          <Card>
            <CardContent className="text-center py-8">
              <p className="text-muted-foreground">No hay fases configuradas</p>
              <Button className="mt-4" onClick={() => setIsAddingPhase(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Agregar Primera Fase
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}