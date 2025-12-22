import { Sparkles, TrendingUp, Target } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { JobCard, Job } from './JobCard';
import { CVParseResult } from './CVUpload';

interface JobMatchResultsProps {
  cvData: CVParseResult;
  matchedJobs: Job[];
  onApply: (job: Job) => void;
  onViewDetails: (job: Job) => void;
}

export function JobMatchResults({ cvData, matchedJobs, onApply, onViewDetails }: JobMatchResultsProps) {
  return (
    <div className="space-y-8">
      {/* CV Summary Card */}
      <div className="relative overflow-hidden border border-primary/30 rounded-2xl p-6 bg-gradient-to-br from-primary/10 via-card/50 to-secondary/10">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        
        <div className="relative">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Your Profile Summary</h3>
              <p className="text-sm text-muted-foreground">Extracted from your CV</p>
            </div>
          </div>
          
          <p className="text-muted-foreground mb-4">{cvData.summary}</p>
          
          <div className="space-y-4">
            {/* Skills */}
            <div>
              <h4 className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                <Target className="w-4 h-4 text-primary" />
                Detected Skills
              </h4>
              <div className="flex flex-wrap gap-2">
                {cvData.skills.map((skill) => (
                  <Badge key={skill} className="bg-primary/20 text-primary hover:bg-primary/30 border-0">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
            
            {/* Experience */}
            {cvData.experience.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-primary" />
                  Recent Experience
                </h4>
                <div className="space-y-2">
                  {cvData.experience.slice(0, 2).map((exp, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <span className="text-foreground">{exp.title}</span>
                      <span className="text-muted-foreground">{exp.company} • {exp.duration}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Matched Jobs */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-semibold text-foreground">
              Jobs Matched to Your Profile
            </h3>
            <p className="text-muted-foreground">
              {matchedJobs.length} jobs found based on your skills and experience
            </p>
          </div>
        </div>
        
        <div className="grid gap-6">
          {matchedJobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              onApply={onApply}
              onViewDetails={onViewDetails}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
