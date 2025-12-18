import { Guitar, Plus, Search, Filter, MoreVertical, Calendar, DollarSign } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const myListings = [
  {
    id: 1,
    name: "Gibson Les Paul Standard",
    category: "Electric Guitar",
    price: "$50/day",
    status: "available",
    image: null,
    views: 45,
    inquiries: 3,
  },
  {
    id: 2,
    name: "Roland TD-17KVX",
    category: "Electronic Drums",
    price: "$75/day",
    status: "rented",
    image: null,
    views: 32,
    inquiries: 1,
  },
];

const myRentals = [
  {
    id: 1,
    name: "Fender Stratocaster",
    owner: "Mike S.",
    price: "$40/day",
    status: "active",
    startDate: "Dec 15, 2024",
    endDate: "Dec 22, 2024",
    image: null,
  },
  {
    id: 2,
    name: "Marshall JCM800",
    owner: "Sarah M.",
    price: "$60/day",
    status: "pending",
    startDate: "Dec 20, 2024",
    endDate: "Dec 25, 2024",
    image: null,
  },
  {
    id: 3,
    name: "Shure SM58 Bundle",
    owner: "Alex T.",
    price: "$25/day",
    status: "completed",
    startDate: "Dec 1, 2024",
    endDate: "Dec 5, 2024",
    image: null,
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "available":
      return "bg-green-500/10 text-green-500";
    case "rented":
    case "active":
      return "bg-primary/10 text-primary";
    case "pending":
      return "bg-yellow-500/10 text-yellow-500";
    case "completed":
      return "bg-muted text-muted-foreground";
    default:
      return "bg-muted text-muted-foreground";
  }
};

export default function DashboardRentals() {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold">My Rentals</h1>
          <p className="text-muted-foreground mt-1">Manage your instrument listings and rentals.</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="w-4 h-4 mr-2" />
          List New Instrument
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Guitar className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">My Listings</p>
              <p className="text-2xl font-display font-bold">2</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center">
              <Calendar className="w-6 h-6 text-green-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Active Rentals</p>
              <p className="text-2xl font-display font-bold">1</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-yellow-500/10 flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-yellow-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Earnings</p>
              <p className="text-2xl font-display font-bold">$450</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="renting" className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <TabsList className="bg-muted/50">
            <TabsTrigger value="renting">Renting</TabsTrigger>
            <TabsTrigger value="listings">My Listings</TabsTrigger>
          </TabsList>
          
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search..." className="pl-10 bg-muted/50 border-border/50 w-48" />
            </div>
            <Button variant="outline" size="icon" className="border-border/50">
              <Filter className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <TabsContent value="renting" className="space-y-4">
          {myRentals.map((rental) => (
            <Card key={rental.id} className="bg-card/50 border-border/50 backdrop-blur-sm hover:bg-card/80 transition-colors">
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-lg bg-muted/50 flex items-center justify-center flex-shrink-0">
                    <Guitar className="w-8 h-8 text-muted-foreground" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-semibold">{rental.name}</h3>
                        <p className="text-sm text-muted-foreground">From {rental.owner}</p>
                      </div>
                      <Badge className={`${getStatusColor(rental.status)} border-0`}>
                        {rental.status}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-6 mt-3 text-sm">
                      <span className="text-primary font-medium">{rental.price}</span>
                      <span className="text-muted-foreground">
                        {rental.startDate} - {rental.endDate}
                      </span>
                    </div>
                  </div>

                  <Button variant="ghost" size="icon">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="listings" className="space-y-4">
          {myListings.map((listing) => (
            <Card key={listing.id} className="bg-card/50 border-border/50 backdrop-blur-sm hover:bg-card/80 transition-colors">
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-lg bg-muted/50 flex items-center justify-center flex-shrink-0">
                    <Guitar className="w-8 h-8 text-muted-foreground" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-semibold">{listing.name}</h3>
                        <p className="text-sm text-muted-foreground">{listing.category}</p>
                      </div>
                      <Badge className={`${getStatusColor(listing.status)} border-0`}>
                        {listing.status}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-6 mt-3 text-sm">
                      <span className="text-primary font-medium">{listing.price}</span>
                      <span className="text-muted-foreground">{listing.views} views</span>
                      <span className="text-muted-foreground">{listing.inquiries} inquiries</span>
                    </div>
                  </div>

                  <Button variant="ghost" size="icon">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
