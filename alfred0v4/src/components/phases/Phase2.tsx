import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import {
  Users,
  Lightbulb,
  ArrowLeft,
  CheckCircle2,
  Timer,
  Recycle,
  Droplets,
} from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";

interface Phase2Props {
  teamName: string;
  onComplete: (tokens: number) => void;
}

type ChallengeType =
  | "elderly-tech"
  | "fast-fashion"
  | "water-agriculture";

export function Phase2({ teamName, onComplete }: Phase2Props) {
  const { t } = useLanguage();
  const [step, setStep] = useState<
    "intro" | "selection" | "story"
  >("intro");
  const [selectedChallenge, setSelectedChallenge] =
    useState<ChallengeType | null>(null);
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    if (step === "intro") {
      const timer = setTimeout(() => {
        setShowIntro(false);
        setTimeout(() => {
          setStep("selection");
        }, 500);
      }, 4000); // Show intro message for 4 seconds

      return () => clearTimeout(timer);
    }
  }, [step]);

  const handleChallengeSelect = (challenge: ChallengeType) => {
    setSelectedChallenge(challenge);
    setStep("story");
  };

  const handleBackToSelection = () => {
    setSelectedChallenge(null);
    setStep("selection");
  };

  const handleContinueToSolution = () => {
    // Award tokens based on selection (all equal for this phase)
    const tokens = 20;
    onComplete(tokens);
  };

  const getChallengeIcon = (challenge: ChallengeType) => {
    switch (challenge) {
      case "elderly-tech":
        return <Timer className="w-8 h-8 text-blue-500" />;
      case "fast-fashion":
        return <Recycle className="w-8 h-8 text-green-500" />;
      case "water-agriculture":
        return <Droplets className="w-8 h-8 text-cyan-500" />;
    }
  };

  const getChallengeColor = (challenge: ChallengeType) => {
    switch (challenge) {
      case "elderly-tech":
        return "from-blue-50 to-indigo-50 border-blue-200";
      case "fast-fashion":
        return "from-green-50 to-emerald-50 border-green-200";
      case "water-agriculture":
        return "from-cyan-50 to-teal-50 border-cyan-200";
    }
  };

  const getChallengeTitle = (challenge: ChallengeType) => {
    switch (challenge) {
      case "elderly-tech":
        return t("phase2Challenge1Title");
      case "fast-fashion":
        return t("phase2Challenge2Title");
      case "water-agriculture":
        return t("phase2Challenge3Title");
    }
  };

  const getChallengeStory = (challenge: ChallengeType) => {
    switch (challenge) {
      case "elderly-tech":
        return t("phase2Story1");
      case "fast-fashion":
        return t("phase2Story2");
      case "water-agriculture":
        return t("phase2Story3");
    }
  };

  const renderIntroMessage = () => (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center p-4">
      <Card
        className={`max-w-3xl w-full shadow-xl transition-all duration-500 ${showIntro ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
      >
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-2xl bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                {t("phaseOf", { current: "2", total: "5" })}
              </CardTitle>
              <p className="text-muted-foreground mt-1">
                {t("phase2Title")}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {t("teamLabel")} {teamName}
              </span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-8 rounded-lg border border-amber-200">
            <div className="flex items-start gap-4">
              <Lightbulb className="w-8 h-8 text-amber-500 flex-shrink-0 mt-1" />
              <div>
                <p className="text-lg leading-relaxed text-amber-900">
                  {t("phase2IntroMessage")}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderChallengeSelection = () => (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center p-4">
      <Card className="max-w-5xl w-full shadow-xl">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-2xl bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                {t("phaseOf", { current: "2", total: "5" })}
              </CardTitle>
              <p className="text-muted-foreground mt-1">
                {t("phase2Title")}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {t("teamLabel")} {teamName}
              </span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="text-center">
            <h3 className="text-xl mb-6">
              {t("phase2ChooseChallenge")}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Challenge 1: Elderly Tech */}
            <Card
              className={`cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 bg-gradient-to-br ${getChallengeColor("elderly-tech")}`}
              onClick={() =>
                handleChallengeSelect("elderly-tech")
              }
            >
              <CardContent className="p-6 text-center space-y-4">
                {getChallengeIcon("elderly-tech")}
                <h4 className="font-medium">
                  {t("phase2Challenge1")}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {t("phase2Challenge1Title")}
                </p>
              </CardContent>
            </Card>

            {/* Challenge 2: Fast Fashion */}
            <Card
              className={`cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 bg-gradient-to-br ${getChallengeColor("fast-fashion")}`}
              onClick={() =>
                handleChallengeSelect("fast-fashion")
              }
            >
              <CardContent className="p-6 text-center space-y-4">
                {getChallengeIcon("fast-fashion")}
                <h4 className="font-medium">
                  {t("phase2Challenge2")}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {t("phase2Challenge2Title")}
                </p>
              </CardContent>
            </Card>

            {/* Challenge 3: Water Agriculture */}
            <Card
              className={`cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 bg-gradient-to-br ${getChallengeColor("water-agriculture")}`}
              onClick={() =>
                handleChallengeSelect("water-agriculture")
              }
            >
              <CardContent className="p-6 text-center space-y-4">
                {getChallengeIcon("water-agriculture")}
                <h4 className="font-medium">
                  {t("phase2Challenge3")}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {t("phase2Challenge3Title")}
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              {t("clickToSelect")}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderStory = () => {
    if (!selectedChallenge) return null;

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center p-4">
        <Card className="max-w-4xl w-full shadow-xl">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-2xl bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  {t("phaseOf", { current: "2", total: "5" })}
                </CardTitle>
                <p className="text-muted-foreground mt-1">
                  {getChallengeTitle(selectedChallenge)}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {t("teamLabel")} {teamName}
                </span>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="text-center mb-6">
              <Badge variant="outline" className="mb-4">
                {selectedChallenge === "elderly-tech" &&
                  t("phase2Challenge1")}
                {selectedChallenge === "fast-fashion" &&
                  t("phase2Challenge2")}
                {selectedChallenge === "water-agriculture" &&
                  t("phase2Challenge3")}
              </Badge>
            </div>

            <Card
              className={`bg-gradient-to-br ${getChallengeColor(selectedChallenge)}`}
            >
              <CardContent className="p-8">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    {getChallengeIcon(selectedChallenge)}
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-xl">
                      {getChallengeTitle(selectedChallenge)}
                    </h3>
                    <p className="text-lg leading-relaxed">
                      {getChallengeStory(selectedChallenge)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-between items-center">
              <Button
                variant="outline"
                onClick={handleBackToSelection}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                {t("phase2BackToSelection")}
              </Button>

              <Button
                onClick={handleContinueToSolution}
                size="lg"
                className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 flex items-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                {t("phase2ContinueToSolution")}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  switch (step) {
    case "intro":
      return renderIntroMessage();
    case "selection":
      return renderChallengeSelection();
    case "story":
      return renderStory();
    default:
      return renderIntroMessage();
  }
}