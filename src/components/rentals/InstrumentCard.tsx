import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Star, Calendar, Heart } from "lucide-react";

export interface Instrument {
  id: string;
  name: string;
  category: string;
  image: string;
  pricePerDay: number;
  pricePerWeek: number;
  location: string;
  rating: number;
  reviews: number;
  owner: {
    name: string;
    avatar: string;
  };
  available: boolean;
  condition: string;
}

interface InstrumentCardProps {
  instrument: Instrument;
  onRent?: (instrument: Instrument) => void;
  onViewDetails?: (instrument: Instrument) => void;
}

export function InstrumentCard({ instrument, onRent, onViewDetails }: InstrumentCardProps) {
  return (
    <Card className="group overflow-hidden bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={instrument.image}
          alt={instrument.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
        
        <button className="absolute top-3 right-3 p-2 rounded-full bg-background/50 backdrop-blur-sm border border-border/50 hover:bg-primary/20 hover:border-primary/50 transition-all">
          <Heart className="h-4 w-4 text-foreground" />
        </button>
        
        <Badge 
          className={`absolute top-3 left-3 ${
            instrument.available 
              ? 'bg-green-500/20 text-green-400 border-green-500/30' 
              : 'bg-red-500/20 text-red-400 border-red-500/30'
          }`}
        >
          {instrument.available ? 'Available' : 'Rented'}
        </Badge>
        
        <div className="absolute bottom-3 left-3 right-3">
          <Badge variant="secondary" className="bg-background/50 backdrop-blur-sm">
            {instrument.category}
          </Badge>
        </div>
      </div>
      
      <CardContent className="p-4 space-y-3">
        <div>
          <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors line-clamp-1">
            {instrument.name}
          </h3>
          <div className="flex items-center gap-1 text-muted-foreground text-sm mt-1">
            <MapPin className="h-3 w-3" />
            <span>{instrument.location}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-primary text-primary" />
            <span className="font-medium text-foreground">{instrument.rating}</span>
            <span className="text-muted-foreground text-sm">({instrument.reviews})</span>
          </div>
          <Badge variant="outline" className="text-xs">
            {instrument.condition}
          </Badge>
        </div>
        
        <div className="flex items-center gap-2 pt-2 border-t border-border/50">
          <img
            src={instrument.owner.avatar}
            alt={instrument.owner.name}
            className="h-6 w-6 rounded-full border border-border"
          />
          <span className="text-sm text-muted-foreground">{instrument.owner.name}</span>
        </div>
        
        <div className="flex items-center justify-between pt-2">
          <div>
            <span className="text-xl font-bold text-primary">${instrument.pricePerDay}</span>
            <span className="text-muted-foreground text-sm">/day</span>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onViewDetails?.(instrument)}
            >
              Details
            </Button>
            <Button 
              size="sm"
              onClick={() => onRent?.(instrument)}
              disabled={!instrument.available}
            >
              <Calendar className="h-4 w-4 mr-1" />
              Rent
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
