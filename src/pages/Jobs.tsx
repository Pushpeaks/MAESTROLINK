import { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Briefcase, Sparkles, ArrowRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { CVUpload, CVParseResult } from '@/components/jobs/CVUpload';
import { JobCard, Job } from '@/components/jobs/JobCard';
import { JobFilters, JobFiltersState } from '@/components/jobs/JobFilters';
import { JobMatchResults } from '@/components/jobs/JobMatchResults';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

// Mock jobs data - replace with API call
const mockJobs: Job[] = [
  {
    id: '1',
    title: 'Session Guitarist',
    company: 'Harmony Studios',
    location: 'Los Angeles, CA',
    type: 'Freelance',
    salary: '$500 - $1,500/session',
    posted: '2 days ago',
    description: 'Looking for an experienced session guitarist for upcoming album recording. Must be proficient in various styles including rock, blues, and jazz.',
    skills: ['Guitar', 'Studio Recording', 'Music Theory', 'Improvisation'],
    matchScore: 95,
  },
  {
    id: '2',
    title: 'Music Producer',
    company: 'Beat Factory',
    location: 'Remote',
    type: 'Full-time',
    salary: '$60k - $90k/year',
    posted: '1 week ago',
    description: 'Join our team as a music producer working with emerging artists. Experience with Ableton Live and Logic Pro required.',
    skills: ['Music Production', 'Ableton Live', 'Logic Pro', 'Mixing'],
    matchScore: 88,
  },
  {
    id: '3',
    title: 'Piano Teacher',
    company: 'Melody Music School',
    location: 'New York, NY',
    type: 'Part-time',
    salary: '$35 - $50/hour',
    posted: '3 days ago',
    description: 'Seeking a passionate piano teacher for students of all ages. Classical training preferred but not required.',
    skills: ['Piano', 'Music Education', 'Classical Music', 'Patience'],
    matchScore: 82,
  },
  {
    id: '4',
    title: 'Live Sound Engineer',
    company: 'Concert Productions Inc.',
    location: 'Nashville, TN',
    type: 'Contract',
    salary: '$400 - $800/event',
    posted: '5 days ago',
    description: 'Experienced live sound engineer needed for concert events. Must have FOH and monitor mixing experience.',
    skills: ['Live Sound', 'FOH Mixing', 'Monitor Engineering', 'Pro Tools'],
    matchScore: 75,
  },
  {
    id: '5',
    title: 'Vocalist for Wedding Band',
    company: 'Celebration Band',
    location: 'Chicago, IL',
    type: 'Gig',
    salary: '$300 - $500/event',
    posted: '1 day ago',
    description: 'Looking for a versatile vocalist to join our wedding band. Must know popular songs across multiple decades.',
    skills: ['Vocals', 'Stage Presence', 'Cover Songs', 'Versatility'],
  },
  {
    id: '6',
    title: 'Audio Engineer',
    company: 'Soundscape Studios',
    location: 'London, UK',
    type: 'Full-time',
    salary: '£35k - £50k/year',
    posted: '1 week ago',
    description: 'Full-time audio engineer position at our state-of-the-art recording studio. Experience with analog equipment a plus.',
    skills: ['Audio Engineering', 'Mixing', 'Mastering', 'Analog Equipment'],
  },
];

export default function Jobs() {
  const [activeTab, setActiveTab] = useState<'browse' | 'cv-match'>('browse');
  const [cvData, setCvData] = useState<CVParseResult | null>(null);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [showApplyDialog, setShowApplyDialog] = useState(false);
  const [filters, setFilters] = useState<JobFiltersState>({
    search: '',
    type: '',
    location: '',
    salary: '',
    skills: [],
  });
  const { toast } = useToast();

  // Filter jobs based on current filters
  const filteredJobs = useMemo(() => {
    return mockJobs.filter((job) => {
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const matchesSearch =
          job.title.toLowerCase().includes(searchLower) ||
          job.company.toLowerCase().includes(searchLower) ||
          job.skills.some((s) => s.toLowerCase().includes(searchLower));
        if (!matchesSearch) return false;
      }

      if (filters.type && filters.type !== 'All Types' && job.type !== filters.type) {
        return false;
      }

      if (filters.location && filters.location !== 'All Locations') {
        if (filters.location === 'Remote' && !job.location.toLowerCase().includes('remote')) {
          return false;
        } else if (filters.location !== 'Remote' && !job.location.includes(filters.location)) {
          return false;
        }
      }

      if (filters.skills.length > 0) {
        const hasMatchingSkill = filters.skills.some((skill) =>
          job.skills.some((s) => s.toLowerCase().includes(skill.toLowerCase()))
        );
        if (!hasMatchingSkill) return false;
      }

      return true;
    });
  }, [filters]);

  // Get matched jobs (sorted by match score)
  const matchedJobs = useMemo(() => {
    if (!cvData) return [];
    return [...mockJobs]
      .filter((job) => job.matchScore)
      .sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0));
  }, [cvData]);

  const handleApply = (job: Job) => {
    setSelectedJob(job);
    setShowApplyDialog(true);
  };

  const handleViewDetails = (job: Job) => {
    setSelectedJob(job);
    // Could open a details modal or navigate to job details page
    toast({
      title: job.title,
      description: `${job.company} • ${job.location}`,
    });
  };

  const handleCVUpload = (data: CVParseResult) => {
    setCvData(data);
    setActiveTab('cv-match');
    toast({
      title: 'CV Analyzed Successfully',
      description: `Found ${mockJobs.filter((j) => j.matchScore).length} matching jobs for your profile.`,
    });
  };

  return (
    <>
      <Helmet>
        <title>Jobs | MaestroLink - Find Music Industry Opportunities</title>
        <meta
          name="description"
          content="Discover music jobs and gigs. Upload your CV and let our AI match you with the perfect opportunities in the music industry."
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />

        <main className="pt-24 pb-20">
          <div className="container mx-auto px-4">
            {/* Header */}
            <div className="max-w-3xl mx-auto text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6">
                <Briefcase className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">Music Industry Jobs</span>
              </div>

              <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
                Find Your Next{' '}
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Opportunity
                </span>
              </h1>

              <p className="text-lg text-muted-foreground">
                Browse jobs or upload your CV and let our AI-powered matching find the perfect gigs for you.
              </p>
            </div>

            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'browse' | 'cv-match')} className="max-w-5xl mx-auto">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
                <TabsTrigger value="browse" className="gap-2">
                  <Briefcase className="w-4 h-4" />
                  Browse Jobs
                </TabsTrigger>
                <TabsTrigger value="cv-match" className="gap-2">
                  <Sparkles className="w-4 h-4" />
                  CV Match
                </TabsTrigger>
              </TabsList>

              <TabsContent value="browse" className="space-y-8">
                <JobFilters filters={filters} onFiltersChange={setFilters} />

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-muted-foreground">
                      Showing <span className="font-medium text-foreground">{filteredJobs.length}</span> jobs
                    </p>
                  </div>

                  <div className="grid gap-6">
                    {filteredJobs.map((job) => (
                      <JobCard
                        key={job.id}
                        job={job}
                        onApply={handleApply}
                        onViewDetails={handleViewDetails}
                      />
                    ))}
                  </div>

                  {filteredJobs.length === 0 && (
                    <div className="text-center py-12">
                      <p className="text-muted-foreground mb-4">No jobs found matching your filters.</p>
                      <Button variant="outline" onClick={() => setFilters({ search: '', type: '', location: '', salary: '', skills: [] })}>
                        Clear Filters
                      </Button>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="cv-match" className="space-y-8">
                {!cvData ? (
                  <div className="max-w-2xl mx-auto">
                    <div className="text-center mb-8">
                      <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                        <Sparkles className="w-8 h-8 text-primary" />
                      </div>
                      <h2 className="text-2xl font-semibold text-foreground mb-2">
                        AI-Powered Job Matching
                      </h2>
                      <p className="text-muted-foreground">
                        Upload your CV and our ML model will analyze your skills and experience to find the best matching opportunities.
                      </p>
                    </div>

                    <CVUpload onUploadComplete={handleCVUpload} />

                    <div className="mt-8 flex items-center justify-center gap-6 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500" />
                        Skill extraction
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500" />
                        Experience analysis
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500" />
                        Smart matching
                      </div>
                    </div>
                  </div>
                ) : (
                  <JobMatchResults
                    cvData={cvData}
                    matchedJobs={matchedJobs}
                    onApply={handleApply}
                    onViewDetails={handleViewDetails}
                  />
                )}

                {cvData && (
                  <div className="text-center">
                    <Button
                      variant="outline"
                      onClick={() => setCvData(null)}
                      className="gap-2"
                    >
                      Upload Different CV
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </main>

        <Footer />

        {/* Apply Dialog */}
        <Dialog open={showApplyDialog} onOpenChange={setShowApplyDialog}>
          <DialogContent className="bg-background border-border">
            <DialogHeader>
              <DialogTitle>Apply to {selectedJob?.title}</DialogTitle>
              <DialogDescription>
                {selectedJob?.company} • {selectedJob?.location}
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <p className="text-muted-foreground mb-4">
                This will connect to your MERN backend to submit the application.
              </p>
              <Button
                className="w-full"
                onClick={() => {
                  toast({
                    title: 'Application Submitted',
                    description: `Your application for ${selectedJob?.title} has been sent.`,
                  });
                  setShowApplyDialog(false);
                }}
              >
                Submit Application
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}
