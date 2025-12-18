import { FileText, Search, Filter, MoreVertical, Building2, MapPin, Clock, ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const applications = [
  {
    id: 1,
    title: "Session Guitarist for Studio Recording",
    company: "Sunset Sound Studios",
    location: "Los Angeles, CA",
    appliedDate: "Dec 10, 2024",
    status: "pending",
    type: "Full-time",
    salary: "$500/session",
  },
  {
    id: 2,
    title: "Lead Guitarist for Live Tour",
    company: "Rock Nation Events",
    location: "Nationwide",
    appliedDate: "Dec 8, 2024",
    status: "interview",
    type: "Contract",
    salary: "$2,000/week",
  },
  {
    id: 3,
    title: "Music Teacher - Guitar",
    company: "Harmony Music School",
    location: "Santa Monica, CA",
    appliedDate: "Dec 5, 2024",
    status: "rejected",
    type: "Part-time",
    salary: "$45/hour",
  },
  {
    id: 4,
    title: "Backup Musician for Recording Artist",
    company: "Universal Music",
    location: "Remote",
    appliedDate: "Dec 1, 2024",
    status: "offered",
    type: "Contract",
    salary: "$3,000/project",
  },
  {
    id: 5,
    title: "House Band Member",
    company: "The Blue Note LA",
    location: "Los Angeles, CA",
    appliedDate: "Nov 28, 2024",
    status: "accepted",
    type: "Part-time",
    salary: "$300/night",
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "pending":
      return "bg-yellow-500/10 text-yellow-500";
    case "interview":
      return "bg-blue-500/10 text-blue-500";
    case "offered":
      return "bg-primary/10 text-primary";
    case "accepted":
      return "bg-green-500/10 text-green-500";
    case "rejected":
      return "bg-red-500/10 text-red-500";
    default:
      return "bg-muted text-muted-foreground";
  }
};

const getStatusLabel = (status: string) => {
  switch (status) {
    case "pending":
      return "Under Review";
    case "interview":
      return "Interview";
    case "offered":
      return "Offer Received";
    case "accepted":
      return "Accepted";
    case "rejected":
      return "Not Selected";
    default:
      return status;
  }
};

export default function DashboardApplications() {
  const pendingCount = applications.filter((a) => a.status === "pending").length;
  const interviewCount = applications.filter((a) => a.status === "interview").length;
  const offeredCount = applications.filter((a) => a.status === "offered").length;

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold">Applications</h1>
          <p className="text-muted-foreground mt-1">Track your job applications and opportunities.</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <ExternalLink className="w-4 h-4 mr-2" />
          Browse Jobs
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
          <CardContent className="p-4 text-center">
            <p className="text-3xl font-display font-bold">{applications.length}</p>
            <p className="text-sm text-muted-foreground">Total</p>
          </CardContent>
        </Card>
        <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
          <CardContent className="p-4 text-center">
            <p className="text-3xl font-display font-bold text-yellow-500">{pendingCount}</p>
            <p className="text-sm text-muted-foreground">Pending</p>
          </CardContent>
        </Card>
        <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
          <CardContent className="p-4 text-center">
            <p className="text-3xl font-display font-bold text-blue-500">{interviewCount}</p>
            <p className="text-sm text-muted-foreground">Interviews</p>
          </CardContent>
        </Card>
        <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
          <CardContent className="p-4 text-center">
            <p className="text-3xl font-display font-bold text-primary">{offeredCount}</p>
            <p className="text-sm text-muted-foreground">Offers</p>
          </CardContent>
        </Card>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <Tabs defaultValue="all" className="w-full sm:w-auto">
          <TabsList className="bg-muted/50">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
        </Tabs>
        
        <div className="flex gap-2">
          <div className="relative flex-1 sm:flex-initial">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search applications..." className="pl-10 bg-muted/50 border-border/50 w-full sm:w-64" />
          </div>
          <Button variant="outline" size="icon" className="border-border/50">
            <Filter className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Applications List */}
      <div className="space-y-4">
        {applications.map((application) => (
          <Card key={application.id} className="bg-card/50 border-border/50 backdrop-blur-sm hover:bg-card/80 transition-colors">
            <CardContent className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-muted/50 flex items-center justify-center flex-shrink-0">
                  <Building2 className="w-7 h-7 text-muted-foreground" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4">
                    <div>
                      <h3 className="font-semibold text-lg">{application.title}</h3>
                      <p className="text-muted-foreground">{application.company}</p>
                    </div>
                    <Badge className={`${getStatusColor(application.status)} border-0 self-start`}>
                      {getStatusLabel(application.status)}
                    </Badge>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-4 mt-3 text-sm">
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      {application.location}
                    </span>
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      Applied {application.appliedDate}
                    </span>
                    <Badge variant="secondary" className="bg-muted/50 text-muted-foreground border-0">
                      {application.type}
                    </Badge>
                    <span className="text-primary font-medium">{application.salary}</span>
                  </div>
                </div>

                <Button variant="ghost" size="icon" className="self-start sm:self-center">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
