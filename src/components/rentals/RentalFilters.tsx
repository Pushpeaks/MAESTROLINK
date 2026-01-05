import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Search, SlidersHorizontal, X, Guitar, Piano, Drum, Music } from "lucide-react";

const categories = [
  { id: "all", name: "All Instruments", icon: Music },
  { id: "guitars", name: "Guitars", icon: Guitar },
  { id: "keyboards", name: "Keyboards", icon: Piano },
  { id: "drums", name: "Drums & Percussion", icon: Drum },
  { id: "brass", name: "Brass", icon: Music },
  { id: "woodwind", name: "Woodwind", icon: Music },
  { id: "strings", name: "Strings", icon: Music },
];

const conditions = ["All", "Excellent", "Good", "Fair"];
const sortOptions = [
  { value: "popular", label: "Most Popular" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
  { value: "newest", label: "Newest" },
];

export interface RentalFiltersState {
  search: string;
  category: string;
  condition: string;
  priceRange: [number, number];
  location: string;
  sort: string;
}

interface RentalFiltersProps {
  filters: RentalFiltersState;
  onFiltersChange: (filters: RentalFiltersState) => void;
}

export function RentalFilters({ filters, onFiltersChange }: RentalFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);

  const updateFilter = <K extends keyof RentalFiltersState>(
    key: K,
    value: RentalFiltersState[K]
  ) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const clearFilters = () => {
    onFiltersChange({
      search: "",
      category: "all",
      condition: "All",
      priceRange: [0, 200],
      location: "",
      sort: "popular",
    });
  };

  const activeFiltersCount = [
    filters.category !== "all",
    filters.condition !== "All",
    filters.priceRange[0] > 0 || filters.priceRange[1] < 200,
    filters.location !== "",
  ].filter(Boolean).length;

  const FilterContent = () => (
    <div className="space-y-6">
      <div>
        <label className="text-sm font-medium text-foreground mb-2 block">
          Condition
        </label>
        <Select
          value={filters.condition}
          onValueChange={(value) => updateFilter("condition", value)}
        >
          <SelectTrigger className="bg-background/50 border-border/50">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {conditions.map((condition) => (
              <SelectItem key={condition} value={condition}>
                {condition}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="text-sm font-medium text-foreground mb-2 block">
          Price Range (per day)
        </label>
        <div className="px-2">
          <Slider
            value={filters.priceRange}
            onValueChange={(value) => updateFilter("priceRange", value as [number, number])}
            max={200}
            step={5}
            className="my-4"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>${filters.priceRange[0]}</span>
            <span>${filters.priceRange[1]}+</span>
          </div>
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-foreground mb-2 block">
          Location
        </label>
        <Input
          placeholder="City or zip code"
          value={filters.location}
          onChange={(e) => updateFilter("location", e.target.value)}
          className="bg-background/50 border-border/50"
        />
      </div>

      {activeFiltersCount > 0 && (
        <Button
          variant="outline"
          className="w-full"
          onClick={clearFilters}
        >
          Clear All Filters
        </Button>
      )}
    </div>
  );

  return (
    <div className="space-y-4">
      {/* Search and Sort Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search instruments..."
            value={filters.search}
            onChange={(e) => updateFilter("search", e.target.value)}
            className="pl-10 bg-background/50 backdrop-blur-sm border-border/50 focus:border-primary/50"
          />
        </div>
        
        <Select
          value={filters.sort}
          onValueChange={(value) => updateFilter("sort", value)}
        >
          <SelectTrigger className="w-full sm:w-[180px] bg-background/50 border-border/50">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {sortOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Mobile Filter Button */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" className="sm:hidden relative">
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              Filters
              {activeFiltersCount > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs">
                  {activeFiltersCount}
                </Badge>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-card border-border">
            <SheetHeader>
              <SheetTitle>Filters</SheetTitle>
            </SheetHeader>
            <div className="mt-6">
              <FilterContent />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Category Pills */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {categories.map((category) => {
          const Icon = category.icon;
          const isActive = filters.category === category.id;
          return (
            <Button
              key={category.id}
              variant={isActive ? "default" : "outline"}
              size="sm"
              onClick={() => updateFilter("category", category.id)}
              className={`whitespace-nowrap ${
                isActive 
                  ? "" 
                  : "bg-background/50 border-border/50 hover:border-primary/50"
              }`}
            >
              <Icon className="h-4 w-4 mr-1" />
              {category.name}
            </Button>
          );
        })}
      </div>

      {/* Active Filters */}
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap gap-2">
          {filters.condition !== "All" && (
            <Badge variant="secondary" className="gap-1">
              {filters.condition}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => updateFilter("condition", "All")}
              />
            </Badge>
          )}
          {(filters.priceRange[0] > 0 || filters.priceRange[1] < 200) && (
            <Badge variant="secondary" className="gap-1">
              ${filters.priceRange[0]} - ${filters.priceRange[1]}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => updateFilter("priceRange", [0, 200])}
              />
            </Badge>
          )}
          {filters.location && (
            <Badge variant="secondary" className="gap-1">
              {filters.location}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => updateFilter("location", "")}
              />
            </Badge>
          )}
        </div>
      )}
    </div>
  );
}
