import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Sparkles, TrendingUp, Users, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [journalText, setJournalText] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [moodResult, setMoodResult] = useState<{
    status: string;
    task: string;
  } | null>(null);

  const handleAnalyzeMood = async () => {
    setIsAnalyzing(true);
    // Simulate AI analysis - backend integration will go here
    setTimeout(() => {
      setMoodResult({
        status: "You seem a bit stressed today 💙",
        task: "Take a short walk and breathe deeply for 5 minutes 🌿",
      });
      setIsAnalyzing(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen p-4 md:p-8 animate-fade-in">
      <div className="max-w-6xl mx-auto">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-semibold text-foreground mb-2">
            Hello, User 👋
          </h1>
          <p className="text-muted-foreground text-lg">
            How are you feeling today?
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Journal Section */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6 shadow-card">
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-primary" />
                Daily Journal
              </h2>
              <Textarea
                placeholder="Write about your day, your feelings, your thoughts... This is a safe space 💭"
                value={journalText}
                onChange={(e) => setJournalText(e.target.value)}
                className="min-h-[200px] resize-none mb-4"
              />
              <Button
                onClick={handleAnalyzeMood}
                disabled={!journalText || isAnalyzing}
                size="lg"
                className="w-full md:w-auto"
              >
                {isAnalyzing ? "Analyzing... 💭" : "Analyze My Mood 💙"}
              </Button>
            </Card>

            {/* Mood Analysis Result */}
            {moodResult && (
              <Card className="p-6 shadow-card bg-primary/5 border-primary/20 animate-slide-up">
                <h3 className="text-xl font-semibold mb-3 text-primary">
                  AI Insight
                </h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      Mood Status
                    </p>
                    <p className="text-lg">{moodResult.status}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      Suggested Activity
                    </p>
                    <p className="text-lg">{moodResult.task}</p>
                  </div>
                </div>
              </Card>
            )}
          </div>

          {/* Quick Links Sidebar */}
          <div className="space-y-4">
            <Link to="/history">
              <Card className="p-6 hover:shadow-card transition-smooth cursor-pointer bg-gradient-card">
                <div className="flex items-center gap-3 mb-2">
                  <TrendingUp className="w-6 h-6 text-primary" />
                  <h3 className="font-semibold">Journal History</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  View your mood trends and past entries
                </p>
              </Card>
            </Link>

            <Link to="/friends">
              <Card className="p-6 hover:shadow-card transition-smooth cursor-pointer bg-gradient-card">
                <div className="flex items-center gap-3 mb-2">
                  <Users className="w-6 h-6 text-primary" />
                  <h3 className="font-semibold">Friends</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Connect with supportive friends
                </p>
              </Card>
            </Link>

            <Link to="/resources">
              <Card className="p-6 hover:shadow-card transition-smooth cursor-pointer bg-gradient-card">
                <div className="flex items-center gap-3 mb-2">
                  <BookOpen className="w-6 h-6 text-primary" />
                  <h3 className="font-semibold">Resources</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Motivational content and exercises
                </p>
              </Card>
            </Link>
          </div>
        </div>

        {/* Safety Footer */}
        <Card className="mt-8 p-6 bg-destructive/5 border-destructive/20">
          <p className="text-sm text-center">
            ⚠️ MindEase provides emotional insights, not medical diagnosis. If
            you are feeling severely distressed, please contact a professional
            or call:
            <br />
            <strong>India: AASRA Helpline – 91-9820466726</strong>
            <br />
            <strong>Global: findahelpline.com</strong>
          </p>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
