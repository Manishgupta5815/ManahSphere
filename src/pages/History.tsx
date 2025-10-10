import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, TrendingUp } from "lucide-react";

const History = () => {
  // Mock data - will be replaced with actual data from backend
  const entries = [
    {
      id: 1,
      date: "2025-01-15",
      text: "Had a great day at work, feeling accomplished...",
      mood: "Happy",
      color: "bg-green-500",
    },
    {
      id: 2,
      date: "2025-01-14",
      text: "Feeling a bit overwhelmed with tasks...",
      mood: "Stressed",
      color: "bg-yellow-500",
    },
    {
      id: 3,
      date: "2025-01-13",
      text: "Enjoyed spending time with friends...",
      mood: "Happy",
      color: "bg-green-500",
    },
  ];

  return (
    <div className="min-h-screen p-4 md:p-8 animate-fade-in">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-semibold text-foreground mb-2 flex items-center gap-3">
            <Calendar className="w-10 h-10 text-primary" />
            Journal History
          </h1>
          <p className="text-muted-foreground text-lg">
            Track your emotional journey over time
          </p>
        </div>

        {/* Mood Trend Chart Placeholder */}
        <Card className="p-6 mb-8 shadow-card">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-semibold">Mood Trends</h2>
          </div>
          <div className="h-64 flex items-center justify-center bg-muted/20 rounded-lg">
            <p className="text-muted-foreground">
              Mood visualization chart will appear here 📊
            </p>
          </div>
        </Card>

        {/* Journal Entries */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold mb-4">Past Entries</h2>
          {entries.map((entry) => (
            <Card
              key={entry.id}
              className="p-6 shadow-card hover:shadow-float transition-smooth"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    {entry.date}
                  </Badge>
                  <Badge className={`${entry.color} text-white border-0`}>
                    {entry.mood}
                  </Badge>
                </div>
              </div>
              <p className="text-foreground">{entry.text}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default History;
