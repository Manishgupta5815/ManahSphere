import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heart, Sparkles, Users, BookOpen, TrendingUp } from "lucide-react";

const Index = () => {
  const features = [
    {
      icon: Sparkles,
      title: "AI Mood Analysis",
      description: "Get personalized insights about your emotional state",
    },
    {
      icon: BookOpen,
      title: "Daily Journaling",
      description: "Track your thoughts and feelings in a safe space",
    },
    {
      icon: Users,
      title: "Supportive Community",
      description: "Connect with friends who understand and care",
    },
    {
      icon: TrendingUp,
      title: "Mood Tracking",
      description: "Visualize your emotional journey over time",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4">
        <div className="max-w-6xl mx-auto text-center animate-fade-in">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6">
            <Heart className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            Welcome to MindEase 💙
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Your safe digital space for mental wellness. Journal your thoughts,
            track your mood, and receive AI-powered insights to support your
            emotional journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button size="lg" className="text-lg px-8">
                Get Started Free 🌈
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline" className="text-lg px-8">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-muted/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            How MindEase Helps You 🌟
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="p-6 shadow-card hover:shadow-float transition-smooth animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Card className="p-12 shadow-float bg-gradient-primary text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Start Your Wellness Journey Today ✨
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands who are taking care of their mental health with
              MindEase
            </p>
            <Link to="/signup">
              <Button
                size="lg"
                variant="secondary"
                className="text-lg px-8 bg-white text-primary hover:bg-white/90"
              >
                Create Free Account
              </Button>
            </Link>
          </Card>
        </div>
      </section>

      {/* Safety Notice */}
      <section className="py-8 px-4 bg-destructive/5">
        <div className="max-w-4xl mx-auto">
          <p className="text-sm text-center text-foreground">
            ⚠️ MindEase provides emotional insights, not medical diagnosis. If
            you are feeling severely distressed, please contact a professional
            or call:
            <br />
            <strong>India: AASRA Helpline – 91-9820466726</strong> |{" "}
            <strong>Global: findahelpline.com</strong>
          </p>
        </div>
      </section>
    </div>
  );
};

export default Index;
