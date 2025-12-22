import { MapPin, Clock, DollarSign, Briefcase, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Freelance' | 'Gig';
  salary: string;
  posted: string;
  description: string;
  skills: string[];
  matchScore?: number;
  logo?: string;
}

interface JobCardProps {
  job: Job;
  onApply: (job: Job) => void;
  onViewDetails: (job: Job) => void;
  variant?: 'default' | 'compact';
}

export function JobCard({ job, onApply, onViewDetails, variant = 'default' }: JobCardProps) {
  const isCompact = variant === 'compact';
  
  return (
    <div className={cn(
      "group relative border border-border/50 rounded-2xl bg-card/30 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:bg-card/50",
      isCompact ? "p-4" : "p-6"
    )}>
      {/* Match Score Badge */}
      {job.matchScore && (
        <div className="absolute -top-3 -right-3">
          <div className="flex items-center gap-1 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
            <Star className="w-3.5 h-3.5 fill-current" />
            {job.matchScore}% Match
          </div>
        </div>
      )}
      
      <div className={cn("flex gap-4", isCompact ? "items-center" : "items-start")}>
        {/* Company Logo */}
        <div className={cn(
          "flex-shrink-0 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center font-bold text-primary",
          isCompact ? "w-12 h-12 text-lg" : "w-16 h-16 text-xl"
        )}>
          {job.logo ? (
            <img src={job.logo} alt={job.company} className="w-full h-full object-cover rounded-xl" />
          ) : (
            job.company.charAt(0)
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className={cn(
                "font-semibold text-foreground group-hover:text-primary transition-colors",
                isCompact ? "text-base" : "text-lg"
              )}>
                {job.title}
              </h3>
              <p className="text-muted-foreground">{job.company}</p>
            </div>
            
            {!isCompact && (
              <Badge variant="outline" className="flex-shrink-0">
                {job.type}
              </Badge>
            )}
          </div>
          
          {!isCompact && (
            <>
              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4" />
                  {job.location}
                </span>
                <span className="flex items-center gap-1.5">
                  <DollarSign className="w-4 h-4" />
                  {job.salary}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  {job.posted}
                </span>
              </div>
              
              {/* Description */}
              <p className="mt-3 text-sm text-muted-foreground line-clamp-2">
                {job.description}
              </p>
              
              {/* Skills */}
              <div className="flex flex-wrap gap-2 mt-4">
                {job.skills.slice(0, 4).map((skill) => (
                  <Badge key={skill} variant="secondary" className="text-xs">
                    {skill}
                  </Badge>
                ))}
                {job.skills.length > 4 && (
                  <Badge variant="secondary" className="text-xs">
                    +{job.skills.length - 4} more
                  </Badge>
                )}
              </div>
            </>
          )}
          
          {isCompact && (
            <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {job.location}
              </span>
              <span>{job.type}</span>
              <span>{job.salary}</span>
            </div>
          )}
        </div>
      </div>
      
      {/* Actions */}
      <div className={cn(
        "flex items-center gap-3",
        isCompact ? "mt-3" : "mt-6"
      )}>
        <Button 
          onClick={() => onApply(job)}
          className={isCompact ? "flex-1" : ""}
          size={isCompact ? "sm" : "default"}
        >
          <Briefcase className="w-4 h-4 mr-2" />
          Apply Now
        </Button>
        <Button 
          variant="outline"
          onClick={() => onViewDetails(job)}
          size={isCompact ? "sm" : "default"}
        >
          View Details
        </Button>
      </div>
    </div>
  );
}
