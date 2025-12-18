import { Guitar, FileText, Calendar, TrendingUp, Music, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const stats = [
  { label: "Active Rentals", value: "3", icon: Guitar, change: "+1 this week" },
  { label: "Applications", value: "7", icon: FileText, change: "2 pending" },
  { label: "Upcoming Sessions", value: "4", icon: Calendar, change: "Next: Tomorrow" },
  { label: "Profile Views", value: "156", icon: TrendingUp, change: "+23% this month" },
];

const recentActivity = [
  { type: "rental", message: "Rental request approved for Fender Stratocaster", time: "2 hours ago" },
  { type: "application", message: "New job opportunity: Session Guitarist needed", time: "5 hours ago" },
  { type: "message", message: "Sarah M. sent you a message", time: "1 day ago" },
  { type: "booking", message: "Jam session booked at Studio A", time: "2 days ago" },
];

export default function DashboardOverview() {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold">Welcome back, John!</h1>
          <p className="text-muted-foreground mt-1">Here's what's happening with your music journey.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="border-border/50">
            <Guitar className="w-4 h-4 mr-2" />
            List Instrument
          </Button>
          <Button className="bg-primary hover:bg-primary/90">
            <Music className="w-4 h-4 mr-2" />
            Find Musicians
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="bg-card/50 border-border/50 backdrop-blur-sm hover:bg-card/80 transition-colors">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-3xl font-display font-bold mt-1">{stat.value}</p>
                  <p className="text-xs text-primary mt-2">{stat.change}</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <Card className="lg:col-span-2 bg-card/50 border-border/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="font-display">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    {activity.type === "rental" && <Guitar className="w-5 h-5 text-primary" />}
                    {activity.type === "application" && <FileText className="w-5 h-5 text-primary" />}
                    {activity.type === "message" && <Users className="w-5 h-5 text-primary" />}
                    {activity.type === "booking" && <Calendar className="w-5 h-5 text-primary" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm">{activity.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="font-display">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start border-border/50 hover:bg-muted/50">
              <Guitar className="w-4 h-4 mr-3" />
              Browse Instruments
            </Button>
            <Button variant="outline" className="w-full justify-start border-border/50 hover:bg-muted/50">
              <Users className="w-4 h-4 mr-3" />
              Find Collaborators
            </Button>
            <Button variant="outline" className="w-full justify-start border-border/50 hover:bg-muted/50">
              <Calendar className="w-4 h-4 mr-3" />
              Book a Jam Pad
            </Button>
            <Button variant="outline" className="w-full justify-start border-border/50 hover:bg-muted/50">
              <FileText className="w-4 h-4 mr-3" />
              View Job Listings
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
