import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Users, UserPlus, Heart } from "lucide-react";

const Friends = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data - will be replaced with actual data from backend
  const friends = [
    { id: 1, name: "Sarah Johnson", mood: "Happy", status: "Feeling great today! 🌟" },
    { id: 2, name: "Mike Chen", mood: "Neutral", status: "Taking it one step at a time" },
    { id: 3, name: "Emma Davis", mood: "Stressed", status: "Busy week ahead" },
  ];

  const getMoodColor = (mood: string) => {
    switch (mood) {
      case "Happy":
        return "bg-green-500";
      case "Neutral":
        return "bg-blue-500";
      case "Stressed":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-8 animate-fade-in">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-semibold text-foreground mb-2 flex items-center gap-3">
            <Users className="w-10 h-10 text-primary" />
            Friends Network
          </h1>
          <p className="text-muted-foreground text-lg">
            Connect with supportive friends who care 💛
          </p>
        </div>

        {/* Add Friend Section */}
        <Card className="p-6 mb-8 shadow-card">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <UserPlus className="w-5 h-5 text-primary" />
            Add New Friend
          </h2>
          <div className="flex gap-2">
            <Input
              placeholder="Search by username or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
            />
            <Button>Add Friend</Button>
          </div>
        </Card>

        {/* Friends List */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold mb-4">Your Friends</h2>
          {friends.map((friend) => (
            <Card
              key={friend.id}
              className="p-6 shadow-card hover:shadow-float transition-smooth"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Users className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{friend.name}</h3>
                      <Badge className={`${getMoodColor(friend.mood)} text-white border-0 text-xs`}>
                        {friend.mood}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-muted-foreground ml-15">{friend.status}</p>
                </div>
                <Button variant="outline" size="sm" className="gap-2">
                  <Heart className="w-4 h-4" />
                  Support
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Friends;
