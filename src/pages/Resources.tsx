import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Music, Wind, Sparkles } from "lucide-react";

const Resources = () => {
  const quotes = [
    "You are stronger than you think 💪",
    "Every day is a new beginning 🌅",
    "Your mental health is a priority, not a luxury 🌸",
    "It's okay to not be okay sometimes 💙",
  ];

  const exercises = [
    {
      title: "5-Minute Breathing Exercise",
      description: "Calm your mind with deep, intentional breaths",
      icon: Wind,
    },
    {
      title: "Gratitude Journal",
      description: "Write three things you're grateful for today",
      icon: BookOpen,
    },
    {
      title: "Mindful Music",
      description: "Listen to calming playlists",
      icon: Music,
    },
  ];

  return (
    <div className="min-h-screen p-4 md:p-8 animate-fade-in">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-semibold text-foreground mb-2 flex items-center gap-3">
            <BookOpen className="w-10 h-10 text-primary" />
            Wellness Resources
          </h1>
          <p className="text-muted-foreground text-lg">
            Daily inspiration and self-care activities 🌈
          </p>
        </div>

        {/* Daily Quote */}
        <Card className="p-8 mb-8 shadow-card bg-gradient-primary text-white text-center">
          <Sparkles className="w-12 h-12 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold mb-2">Daily Motivation</h2>
          <p className="text-xl font-light">
            {quotes[Math.floor(Math.random() * quotes.length)]}
          </p>
        </Card>

        {/* Daily Challenge */}
        <Card className="p-6 mb-8 shadow-card bg-accent/20 border-accent">
          <h2 className="text-2xl font-semibold mb-4">Today's Challenge 🎯</h2>
          <p className="text-lg mb-4">
            Take a 15-minute break from your devices and enjoy nature 🌿
          </p>
          <Button variant="default">Accept Challenge</Button>
        </Card>

        {/* Wellness Exercises */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold mb-4">Self-Care Activities</h2>
          {exercises.map((exercise, index) => (
            <Card
              key={index}
              className="p-6 shadow-card hover:shadow-float transition-smooth"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <exercise.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-1">{exercise.title}</h3>
                  <p className="text-muted-foreground">{exercise.description}</p>
                </div>
                <Button variant="outline">Start</Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Relaxing Playlists */}
        <Card className="p-6 mt-8 shadow-card">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Music className="w-6 h-6 text-primary" />
            Relaxing Playlists
          </h2>
          <div className="space-y-3">
            <p className="text-muted-foreground">
              Listen to calming music to help you relax:
            </p>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://www.youtube.com/results?search_query=meditation+music"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  🎵 Meditation Music Collection
                </a>
              </li>
              <li>
                <a
                  href="https://www.youtube.com/results?search_query=nature+sounds"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  🌊 Nature Sounds for Relaxation
                </a>
              </li>
            </ul>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Resources;
