import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { 
  Settings, 
  Users, 
  BarChart3, 
  Edit, 
  LogOut, 
  Trophy,
  TrendingUp,
  Eye,
  Coins
} from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { LanguageToggle } from "./LanguageToggle";
import { TokenConfigManager } from "./TokenConfigManager";
import { PhaseManager } from "./PhaseManager";
import { GameSettingsManager } from "./GameSettingsManager";

interface AdminDashboardProps {
  onLogout: () => void;
  tokens: number;
}

// Mock data for demonstration
const mockStats = {
  totalPlayers: 247,
  averageScore: 78,
  completionRate: 92,
  topScore: 125
};

const recentSessions = [
  { id: 1, player: "Player #001", score: 115, date: "2 hours ago", level: "Business Mogul" },
  { id: 2, player: "Player #002", score: 89, date: "5 hours ago", level: "Rising Star" },
  { id: 3, player: "Player #003", score: 67, date: "1 day ago", level: "Promising Entrepreneur" },
  { id: 4, player: "Player #004", score: 125, date: "1 day ago", level: "Entrepreneurial Legend" },
  { id: 5, player: "Player #005", score: 45, date: "2 days ago", level: "Future Potential" }
];

const gameQuestions = [
  { phase: 1, question: "Mental Agility Challenge: Anagram or Word Search (3-minute timer)", answers: "Timer-based" },
  { phase: 2, question: "Challenge Identification: Select and analyze real-world problems", answers: "3 options + story analysis" },
  { phase: 3, question: "A major competitor enters your market. Your response?", answers: 4 },
  { phase: 4, question: "How do you approach hiring your first employee?", answers: 4 },
  { phase: 5, question: "Your product receives harsh criticism online. What's your move?", answers: 4 }
];

export function AdminDashboard({ onLogout, tokens }: AdminDashboardProps) {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-50 p-4">
      <div className="absolute top-4 right-4">
        <LanguageToggle />
      </div>
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-slate-600 to-gray-600 rounded-full flex items-center justify-center">
                  <Settings className="w-5 h-5 text-white" />
                </div>
                <div>
                  <CardTitle>{t('adminDashboard')}</CardTitle>
                  <p className="text-sm text-muted-foreground">{t('adminDashboardSubtitle')}</p>
                </div>
              </div>
              <Button onClick={onLogout} variant="outline" size="sm">
                <LogOut className="w-4 h-4 mr-2" />
                {t('logout')}
              </Button>
            </div>
          </CardHeader>
        </Card>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-500" />
                <div>
                  <p className="text-sm text-muted-foreground">{t('totalPlayers')}</p>
                  <p className="text-2xl font-bold">{mockStats.totalPlayers}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-green-500" />
                <div>
                  <p className="text-sm text-muted-foreground">{t('averageScore')}</p>
                  <p className="text-2xl font-bold">{mockStats.averageScore}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-purple-500" />
                <div>
                  <p className="text-sm text-muted-foreground">{t('completionRate')}</p>
                  <p className="text-2xl font-bold">{mockStats.completionRate}%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-500" />
                <div>
                  <p className="text-sm text-muted-foreground">{t('topScore')}</p>
                  <p className="text-2xl font-bold">{mockStats.topScore}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="sessions" className="space-y-4">
          <TabsList>
            <TabsTrigger value="sessions">{t('recentSessions')}</TabsTrigger>
            <TabsTrigger value="phases">{t('phaseManagement')}</TabsTrigger>
            <TabsTrigger value="tokens">{t('tokenConfiguration')}</TabsTrigger>
            <TabsTrigger value="settings">{t('gameConfiguration')}</TabsTrigger>
          </TabsList>

          <TabsContent value="sessions">
            <Card>
              <CardHeader>
                <CardTitle>{t('recentSessions')}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  {t('recentSessionsDesc')}
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentSessions.map((session) => (
                    <div key={session.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                          {session.player.slice(-3)}
                        </div>
                        <div>
                          <p className="font-medium">{session.player}</p>
                          <p className="text-sm text-muted-foreground">{session.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant="secondary">{session.level}</Badge>
                        <div className="text-right">
                          <p className="font-bold text-lg">{session.score}</p>
                          <p className="text-sm text-muted-foreground">tokens</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="questions">
            <Card>
              <CardHeader>
                <CardTitle>{t('gameQuestions')}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  {t('gameQuestionsDesc')}
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {gameQuestions.map((question) => (
                    <div key={question.phase} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline">Phase {question.phase}</Badge>
                          <span className="text-sm text-muted-foreground">
                            {typeof question.answers === 'number' 
                              ? `${question.answers} ${t('answerOptions')}` 
                              : question.answers
                            }
                          </span>
                        </div>
                        <p className="text-sm">{question.question}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4 mr-2" />
                          {t('view')}
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="w-4 h-4 mr-2" />
                          {t('edit')}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="phases">
            <PhaseManager />
          </TabsContent>

          <TabsContent value="tokens">
            <TokenConfigManager />
          </TabsContent>

          <TabsContent value="settings">
            <GameSettingsManager />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}