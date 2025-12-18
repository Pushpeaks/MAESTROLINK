import { Camera, MapPin, Music, Award, Edit, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const instruments = ["Guitar", "Bass", "Piano", "Drums"];
const genres = ["Rock", "Jazz", "Blues", "Funk", "Soul"];

export default function DashboardProfile() {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold">My Profile</h1>
          <p className="text-muted-foreground mt-1">Manage your public profile and preferences.</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Edit className="w-4 h-4 mr-2" />
          Save Changes
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center">
              <div className="relative">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-primary-foreground text-4xl font-display font-bold">
                  JD
                </div>
                <button className="absolute bottom-0 right-0 w-10 h-10 rounded-full bg-card border border-border/50 flex items-center justify-center hover:bg-muted transition-colors">
                  <Camera className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>
              
              <h2 className="text-xl font-display font-bold mt-4">John Doe</h2>
              <p className="text-muted-foreground">Session Musician</p>
              
              <div className="flex items-center gap-2 mt-3 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>Los Angeles, CA</span>
              </div>

              <div className="flex items-center gap-2 mt-4">
                <Badge variant="secondary" className="bg-primary/10 text-primary border-0">
                  <Award className="w-3 h-3 mr-1" />
                  Verified
                </Badge>
                <Badge variant="secondary" className="bg-muted text-muted-foreground border-0">
                  Pro Member
                </Badge>
              </div>

              <div className="w-full mt-6 pt-6 border-t border-border/50">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-display font-bold">156</p>
                    <p className="text-xs text-muted-foreground">Views</p>
                  </div>
                  <div>
                    <p className="text-2xl font-display font-bold">23</p>
                    <p className="text-xs text-muted-foreground">Connections</p>
                  </div>
                  <div>
                    <p className="text-2xl font-display font-bold">4.9</p>
                    <p className="text-xs text-muted-foreground">Rating</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profile Details */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="font-display">Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" defaultValue="John" className="bg-muted/50 border-border/50" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" defaultValue="Doe" className="bg-muted/50 border-border/50" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue="john@example.com" className="bg-muted/50 border-border/50" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  defaultValue="Professional session musician with 10+ years of experience in rock, jazz, and blues. Available for studio recordings and live performances."
                  className="bg-muted/50 border-border/50 min-h-[100px]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input id="location" defaultValue="Los Angeles, CA" className="bg-muted/50 border-border/50" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="font-display">Instruments</CardTitle>
              <Button variant="ghost" size="sm" className="text-primary">
                <Plus className="w-4 h-4 mr-1" />
                Add
              </Button>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {instruments.map((instrument) => (
                  <Badge
                    key={instrument}
                    variant="secondary"
                    className="bg-primary/10 text-primary border-0 px-4 py-2"
                  >
                    <Music className="w-3 h-3 mr-2" />
                    {instrument}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="font-display">Genres</CardTitle>
              <Button variant="ghost" size="sm" className="text-primary">
                <Plus className="w-4 h-4 mr-1" />
                Add
              </Button>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {genres.map((genre) => (
                  <Badge
                    key={genre}
                    variant="secondary"
                    className="bg-muted text-muted-foreground border-0 px-4 py-2"
                  >
                    {genre}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
