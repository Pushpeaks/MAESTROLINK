import { Search, SlidersHorizontal, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

export interface JobFiltersState {
  search: string;
  type: string;
  location: string;
  salary: string;
  skills: string[];
}

interface JobFiltersProps {
  filters: JobFiltersState;
  onFiltersChange: (filters: JobFiltersState) => void;
}

const jobTypes = ['All Types', 'Full-time', 'Part-time', 'Contract', 'Freelance', 'Gig'];
const locations = ['All Locations', 'Remote', 'New York', 'Los Angeles', 'Nashville', 'London', 'Berlin'];
const salaryRanges = ['Any Salary', '$0 - $25k', '$25k - $50k', '$50k - $75k', '$75k - $100k', '$100k+'];
const skillOptions = ['Guitar', 'Piano', 'Drums', 'Bass', 'Vocals', 'Music Production', 'Audio Engineering', 'Live Sound', 'Mixing', 'Mastering'];

export function JobFilters({ filters, onFiltersChange }: JobFiltersProps) {
  const activeFiltersCount = [
    filters.type && filters.type !== 'All Types',
    filters.location && filters.location !== 'All Locations',
    filters.salary && filters.salary !== 'Any Salary',
    filters.skills.length > 0,
  ].filter(Boolean).length;

  const handleSkillToggle = (skill: string) => {
    const newSkills = filters.skills.includes(skill)
      ? filters.skills.filter((s) => s !== skill)
      : [...filters.skills, skill];
    onFiltersChange({ ...filters, skills: newSkills });
  };

  const clearFilters = () => {
    onFiltersChange({
      search: '',
      type: '',
      location: '',
      salary: '',
      skills: [],
    });
  };

  return (
    <div className="space-y-4">
      {/* Search and Quick Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search jobs, skills, companies..."
            value={filters.search}
            onChange={(e) => onFiltersChange({ ...filters, search: e.target.value })}
            className="pl-10 bg-card/50 border-border/50"
          />
        </div>
        
        <div className="flex gap-3">
          <Select
            value={filters.type || 'All Types'}
            onValueChange={(value) => onFiltersChange({ ...filters, type: value })}
          >
            <SelectTrigger className="w-[140px] bg-card/50 border-border/50">
              <SelectValue placeholder="Job Type" />
            </SelectTrigger>
            <SelectContent>
              {jobTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select
            value={filters.location || 'All Locations'}
            onValueChange={(value) => onFiltersChange({ ...filters, location: value })}
          >
            <SelectTrigger className="w-[150px] bg-card/50 border-border/50 hidden sm:flex">
              <SelectValue placeholder="Location" />
            </SelectTrigger>
            <SelectContent>
              {locations.map((loc) => (
                <SelectItem key={loc} value={loc}>
                  {loc}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          {/* Mobile Filters Sheet */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="relative bg-card/50 border-border/50">
                <SlidersHorizontal className="w-4 h-4 mr-2" />
                Filters
                {activeFiltersCount > 0 && (
                  <span className="absolute -top-2 -right-2 w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center">
                    {activeFiltersCount}
                  </span>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent className="bg-background border-border">
              <SheetHeader>
                <SheetTitle>Filter Jobs</SheetTitle>
              </SheetHeader>
              
              <div className="mt-6 space-y-6">
                {/* Location (Mobile) */}
                <div className="sm:hidden">
                  <Label className="text-sm font-medium mb-2 block">Location</Label>
                  <Select
                    value={filters.location || 'All Locations'}
                    onValueChange={(value) => onFiltersChange({ ...filters, location: value })}
                  >
                    <SelectTrigger className="w-full bg-card/50 border-border/50">
                      <SelectValue placeholder="Location" />
                    </SelectTrigger>
                    <SelectContent>
                      {locations.map((loc) => (
                        <SelectItem key={loc} value={loc}>
                          {loc}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Salary Range */}
                <div>
                  <Label className="text-sm font-medium mb-2 block">Salary Range</Label>
                  <Select
                    value={filters.salary || 'Any Salary'}
                    onValueChange={(value) => onFiltersChange({ ...filters, salary: value })}
                  >
                    <SelectTrigger className="w-full bg-card/50 border-border/50">
                      <SelectValue placeholder="Salary Range" />
                    </SelectTrigger>
                    <SelectContent>
                      {salaryRanges.map((range) => (
                        <SelectItem key={range} value={range}>
                          {range}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Skills */}
                <div>
                  <Label className="text-sm font-medium mb-3 block">Skills</Label>
                  <div className="space-y-2">
                    {skillOptions.map((skill) => (
                      <div key={skill} className="flex items-center space-x-2">
                        <Checkbox
                          id={skill}
                          checked={filters.skills.includes(skill)}
                          onCheckedChange={() => handleSkillToggle(skill)}
                        />
                        <Label htmlFor={skill} className="text-sm font-normal cursor-pointer">
                          {skill}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Clear Filters */}
                <Button variant="outline" className="w-full" onClick={clearFilters}>
                  Clear All Filters
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      
      {/* Active Filters */}
      {(filters.skills.length > 0 || activeFiltersCount > 0) && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-muted-foreground">Active filters:</span>
          
          {filters.type && filters.type !== 'All Types' && (
            <Badge variant="secondary" className="gap-1">
              {filters.type}
              <X
                className="w-3 h-3 cursor-pointer"
                onClick={() => onFiltersChange({ ...filters, type: '' })}
              />
            </Badge>
          )}
          
          {filters.location && filters.location !== 'All Locations' && (
            <Badge variant="secondary" className="gap-1">
              {filters.location}
              <X
                className="w-3 h-3 cursor-pointer"
                onClick={() => onFiltersChange({ ...filters, location: '' })}
              />
            </Badge>
          )}
          
          {filters.salary && filters.salary !== 'Any Salary' && (
            <Badge variant="secondary" className="gap-1">
              {filters.salary}
              <X
                className="w-3 h-3 cursor-pointer"
                onClick={() => onFiltersChange({ ...filters, salary: '' })}
              />
            </Badge>
          )}
          
          {filters.skills.map((skill) => (
            <Badge key={skill} variant="secondary" className="gap-1">
              {skill}
              <X
                className="w-3 h-3 cursor-pointer"
                onClick={() => handleSkillToggle(skill)}
              />
            </Badge>
          ))}
          
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-foreground"
            onClick={clearFilters}
          >
            Clear all
          </Button>
        </div>
      )}
    </div>
  );
}
