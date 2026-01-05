import { useState } from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { RentalHero } from "@/components/rentals/RentalHero";
import { RentalFilters, RentalFiltersState } from "@/components/rentals/RentalFilters";
import { InstrumentCard, Instrument } from "@/components/rentals/InstrumentCard";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { addDays, format } from "date-fns";
import { CalendarIcon, MapPin, Star, User } from "lucide-react";

// Mock data for instruments
const mockInstruments: Instrument[] = [
  {
    id: "1",
    name: "Fender Stratocaster American Professional II",
    category: "Guitars",
    image: "https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?w=800&auto=format&fit=crop",
    pricePerDay: 35,
    pricePerWeek: 200,
    location: "Brooklyn, NY",
    rating: 4.9,
    reviews: 47,
    owner: { name: "Mike Chen", avatar: "https://i.pravatar.cc/100?img=1" },
    available: true,
    condition: "Excellent",
  },
  {
    id: "2",
    name: "Roland RD-2000 Stage Piano",
    category: "Keyboards",
    image: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=800&auto=format&fit=crop",
    pricePerDay: 50,
    pricePerWeek: 280,
    location: "Manhattan, NY",
    rating: 4.8,
    reviews: 32,
    owner: { name: "Sarah Wilson", avatar: "https://i.pravatar.cc/100?img=2" },
    available: true,
    condition: "Excellent",
  },
  {
    id: "3",
    name: "Pearl Masters Maple Complete Drum Kit",
    category: "Drums & Percussion",
    image: "https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?w=800&auto=format&fit=crop",
    pricePerDay: 75,
    pricePerWeek: 400,
    location: "Queens, NY",
    rating: 4.7,
    reviews: 23,
    owner: { name: "James Taylor", avatar: "https://i.pravatar.cc/100?img=3" },
    available: true,
    condition: "Good",
  },
  {
    id: "4",
    name: "Gibson Les Paul Standard '50s",
    category: "Guitars",
    image: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=800&auto=format&fit=crop",
    pricePerDay: 45,
    pricePerWeek: 250,
    location: "Jersey City, NJ",
    rating: 5.0,
    reviews: 18,
    owner: { name: "Alex Rivera", avatar: "https://i.pravatar.cc/100?img=4" },
    available: false,
    condition: "Excellent",
  },
  {
    id: "5",
    name: "Yamaha Montage 8 Synthesizer",
    category: "Keyboards",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop",
    pricePerDay: 65,
    pricePerWeek: 350,
    location: "Brooklyn, NY",
    rating: 4.6,
    reviews: 15,
    owner: { name: "Emily Park", avatar: "https://i.pravatar.cc/100?img=5" },
    available: true,
    condition: "Good",
  },
  {
    id: "6",
    name: "Selmer Paris Series III Alto Saxophone",
    category: "Woodwind",
    image: "https://images.unsplash.com/photo-1546539782-6fc531453083?w=800&auto=format&fit=crop",
    pricePerDay: 40,
    pricePerWeek: 220,
    location: "Hoboken, NJ",
    rating: 4.9,
    reviews: 29,
    owner: { name: "David Kim", avatar: "https://i.pravatar.cc/100?img=6" },
    available: true,
    condition: "Excellent",
  },
  {
    id: "7",
    name: "Bach Stradivarius Trumpet",
    category: "Brass",
    image: "https://images.unsplash.com/photo-1558098329-a11cff621064?w=800&auto=format&fit=crop",
    pricePerDay: 30,
    pricePerWeek: 170,
    location: "Manhattan, NY",
    rating: 4.8,
    reviews: 21,
    owner: { name: "Chris Brown", avatar: "https://i.pravatar.cc/100?img=7" },
    available: true,
    condition: "Good",
  },
  {
    id: "8",
    name: "Stradivarius Copy Violin",
    category: "Strings",
    image: "https://images.unsplash.com/photo-1612225330812-01a9c6b355ec?w=800&auto=format&fit=crop",
    pricePerDay: 55,
    pricePerWeek: 300,
    location: "Brooklyn, NY",
    rating: 4.7,
    reviews: 14,
    owner: { name: "Anna Lee", avatar: "https://i.pravatar.cc/100?img=8" },
    available: true,
    condition: "Excellent",
  },
];

export default function Rentals() {
  const [filters, setFilters] = useState<RentalFiltersState>({
    search: "",
    category: "all",
    condition: "All",
    priceRange: [0, 200],
    location: "",
    sort: "popular",
  });

  const [selectedInstrument, setSelectedInstrument] = useState<Instrument | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isRentOpen, setIsRentOpen] = useState(false);
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: new Date(),
    to: addDays(new Date(), 3),
  });
  const [message, setMessage] = useState("");

  // Filter instruments based on current filters
  const filteredInstruments = mockInstruments.filter((instrument) => {
    if (filters.search && !instrument.name.toLowerCase().includes(filters.search.toLowerCase())) {
      return false;
    }
    if (filters.category !== "all" && instrument.category.toLowerCase() !== filters.category) {
      return false;
    }
    if (filters.condition !== "All" && instrument.condition !== filters.condition) {
      return false;
    }
    if (instrument.pricePerDay < filters.priceRange[0] || instrument.pricePerDay > filters.priceRange[1]) {
      return false;
    }
    if (filters.location && !instrument.location.toLowerCase().includes(filters.location.toLowerCase())) {
      return false;
    }
    return true;
  });

  // Sort instruments
  const sortedInstruments = [...filteredInstruments].sort((a, b) => {
    switch (filters.sort) {
      case "price-low":
        return a.pricePerDay - b.pricePerDay;
      case "price-high":
        return b.pricePerDay - a.pricePerDay;
      case "rating":
        return b.rating - a.rating;
      case "newest":
        return 0; // Would use date field
      default:
        return b.reviews - a.reviews; // Popular
    }
  });

  const handleViewDetails = (instrument: Instrument) => {
    setSelectedInstrument(instrument);
    setIsDetailsOpen(true);
  };

  const handleRent = (instrument: Instrument) => {
    setSelectedInstrument(instrument);
    setIsRentOpen(true);
  };

  const handleSubmitRental = () => {
    toast.success("Rental request sent!", {
      description: `Your request for ${selectedInstrument?.name} has been sent to the owner.`,
    });
    setIsRentOpen(false);
    setMessage("");
  };

  const calculateTotal = () => {
    if (!selectedInstrument || !dateRange.from || !dateRange.to) return 0;
    const days = Math.ceil((dateRange.to.getTime() - dateRange.from.getTime()) / (1000 * 60 * 60 * 24));
    return days * selectedInstrument.pricePerDay;
  };

  return (
    <>
      <Helmet>
        <title>Rent Instruments | MaestroLink</title>
        <meta
          name="description"
          content="Rent quality instruments from fellow musicians. Find guitars, keyboards, drums, and more in your neighborhood."
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />
        
        <main>
          <RentalHero />
          
          <section className="container py-8 md:py-12">
            <RentalFilters filters={filters} onFiltersChange={setFilters} />
            
            <div className="mt-8">
              <div className="flex items-center justify-between mb-6">
                <p className="text-muted-foreground">
                  <span className="font-semibold text-foreground">{sortedInstruments.length}</span> instruments found
                </p>
              </div>
              
              {sortedInstruments.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {sortedInstruments.map((instrument) => (
                      <InstrumentCard
                        key={instrument.id}
                        instrument={instrument}
                        onViewDetails={handleViewDetails}
                        onRent={handleRent}
                      />
                    ))}
                  </div>
                  
                  <div className="mt-12 flex justify-center">
                    <Pagination>
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious href="#" />
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationLink href="#" isActive>1</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationLink href="#">2</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationLink href="#">3</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationNext href="#" />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  </div>
                </>
              ) : (
                <div className="text-center py-16">
                  <p className="text-xl text-muted-foreground">No instruments found matching your criteria.</p>
                  <Button variant="outline" className="mt-4" onClick={() => setFilters({
                    search: "",
                    category: "all",
                    condition: "All",
                    priceRange: [0, 200],
                    location: "",
                    sort: "popular",
                  })}>
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          </section>
        </main>
        
        <Footer />
      </div>

      {/* Instrument Details Dialog */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-w-2xl bg-card border-border">
          {selectedInstrument && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl">{selectedInstrument.name}</DialogTitle>
                <DialogDescription className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  {selectedInstrument.location}
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-6">
                <img
                  src={selectedInstrument.image}
                  alt={selectedInstrument.name}
                  className="w-full aspect-video object-cover rounded-lg"
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-background/50 border border-border/50">
                    <p className="text-sm text-muted-foreground">Daily Rate</p>
                    <p className="text-2xl font-bold text-primary">${selectedInstrument.pricePerDay}</p>
                  </div>
                  <div className="p-4 rounded-lg bg-background/50 border border-border/50">
                    <p className="text-sm text-muted-foreground">Weekly Rate</p>
                    <p className="text-2xl font-bold text-foreground">${selectedInstrument.pricePerWeek}</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={selectedInstrument.owner.avatar}
                      alt={selectedInstrument.owner.name}
                      className="h-10 w-10 rounded-full border border-border"
                    />
                    <div>
                      <p className="font-medium">{selectedInstrument.owner.name}</p>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Star className="h-3 w-3 fill-primary text-primary" />
                        {selectedInstrument.rating} ({selectedInstrument.reviews} reviews)
                      </div>
                    </div>
                  </div>
                  
                  <Button onClick={() => {
                    setIsDetailsOpen(false);
                    handleRent(selectedInstrument);
                  }} disabled={!selectedInstrument.available}>
                    <CalendarIcon className="h-4 w-4 mr-2" />
                    {selectedInstrument.available ? "Request to Rent" : "Currently Unavailable"}
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Rent Request Dialog */}
      <Dialog open={isRentOpen} onOpenChange={setIsRentOpen}>
        <DialogContent className="max-w-lg bg-card border-border">
          {selectedInstrument && (
            <>
              <DialogHeader>
                <DialogTitle>Request to Rent</DialogTitle>
                <DialogDescription>
                  {selectedInstrument.name}
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-6">
                <div>
                  <Label className="text-sm font-medium">Select Dates</Label>
                  <div className="mt-2 border border-border rounded-lg p-4 bg-background/50">
                    <Calendar
                      mode="range"
                      selected={{ from: dateRange.from, to: dateRange.to }}
                      onSelect={(range) => {
                        if (range?.from && range?.to) {
                          setDateRange({ from: range.from, to: range.to });
                        }
                      }}
                      disabled={(date) => date < new Date()}
                      className="mx-auto"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="message" className="text-sm font-medium">Message to Owner</Label>
                  <Textarea
                    id="message"
                    placeholder="Introduce yourself and explain what you'll use the instrument for..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="mt-2 bg-background/50 border-border/50"
                  />
                </div>
                
                <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        {format(dateRange.from, "MMM d")} - {format(dateRange.to, "MMM d, yyyy")}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {Math.ceil((dateRange.to.getTime() - dateRange.from.getTime()) / (1000 * 60 * 60 * 24))} days × ${selectedInstrument.pricePerDay}/day
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Total</p>
                      <p className="text-2xl font-bold text-primary">${calculateTotal()}</p>
                    </div>
                  </div>
                </div>
                
                <Button className="w-full" onClick={handleSubmitRental}>
                  Send Rental Request
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
