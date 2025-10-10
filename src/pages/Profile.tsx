import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { User, Settings } from "lucide-react";

const Profile = () => {
  const [formData, setFormData] = useState({
    name: "User",
    email: "user@example.com",
    bio: "What keeps you motivated...",
    shareMood: true,
  });

  const handleSave = () => {
    // Backend integration will go here
    console.log("Profile updated:", formData);
  };

  return (
    <div className="min-h-screen p-4 md:p-8 animate-fade-in">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-semibold text-foreground mb-2 flex items-center gap-3">
            <User className="w-10 h-10 text-primary" />
            Your Profile
          </h1>
          <p className="text-muted-foreground text-lg">
            Manage your account settings
          </p>
        </div>

        <Card className="p-6 shadow-card">
          <div className="space-y-6">
            {/* Profile Picture Placeholder */}
            <div className="flex items-center gap-4">
              <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="w-12 h-12 text-primary" />
              </div>
              <Button variant="outline">Change Photo</Button>
            </div>

            {/* Name */}
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="mt-1"
              />
            </div>

            {/* Email */}
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="mt-1"
              />
            </div>

            {/* Bio */}
            <div>
              <Label htmlFor="bio">About You</Label>
              <Textarea
                id="bio"
                value={formData.bio}
                onChange={(e) =>
                  setFormData({ ...formData, bio: e.target.value })
                }
                className="mt-1 resize-none"
                rows={4}
              />
            </div>

            {/* Privacy Settings */}
            <Card className="p-4 bg-muted/20">
              <div className="flex items-center gap-3 mb-4">
                <Settings className="w-5 h-5 text-primary" />
                <h3 className="font-semibold">Privacy Settings</h3>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="share-mood" className="font-normal">
                    Share mood with friends
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Let friends see your mood status
                  </p>
                </div>
                <Switch
                  id="share-mood"
                  checked={formData.shareMood}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, shareMood: checked })
                  }
                />
              </div>
            </Card>

            {/* Save Button */}
            <Button onClick={handleSave} className="w-full" size="lg">
              Save Changes
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
