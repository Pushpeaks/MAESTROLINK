import { useState, useCallback } from 'react';
import { Upload, FileText, X, CheckCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface CVUploadProps {
  onUploadComplete: (data: CVParseResult) => void;
  onUploadStart?: () => void;
}

export interface CVParseResult {
  skills: string[];
  experience: {
    title: string;
    company: string;
    duration: string;
  }[];
  education: {
    degree: string;
    institution: string;
    year: string;
  }[];
  summary: string;
}

export function CVUpload({ onUploadComplete, onUploadStart }: CVUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploaded, setUploaded] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const validateFile = (file: File): boolean => {
    const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    const maxSize = 10 * 1024 * 1024; // 10MB
    
    if (!validTypes.includes(file.type)) {
      alert('Please upload a PDF or Word document');
      return false;
    }
    
    if (file.size > maxSize) {
      alert('File size must be less than 10MB');
      return false;
    }
    
    return true;
  };

  const simulateUpload = useCallback(async (file: File) => {
    setUploading(true);
    onUploadStart?.();
    
    // Simulate upload progress
    for (let i = 0; i <= 100; i += 10) {
      await new Promise((resolve) => setTimeout(resolve, 200));
      setProgress(i);
    }
    
    // Simulate parsed CV response (replace with actual API call)
    const mockResult: CVParseResult = {
      skills: ['Guitar', 'Piano', 'Music Production', 'Audio Engineering', 'Ableton Live', 'Pro Tools'],
      experience: [
        { title: 'Session Musician', company: 'Studio XYZ', duration: '2020 - Present' },
        { title: 'Music Teacher', company: 'Music Academy', duration: '2018 - 2020' },
      ],
      education: [
        { degree: 'Bachelor of Music', institution: 'Berklee College of Music', year: '2018' },
      ],
      summary: 'Experienced session musician with 5+ years in recording studios. Proficient in multiple instruments and DAWs.',
    };
    
    setUploading(false);
    setUploaded(true);
    onUploadComplete(mockResult);
  }, [onUploadComplete, onUploadStart]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && validateFile(droppedFile)) {
      setFile(droppedFile);
      simulateUpload(droppedFile);
    }
  }, [simulateUpload]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && validateFile(selectedFile)) {
      setFile(selectedFile);
      simulateUpload(selectedFile);
    }
  }, [simulateUpload]);

  const handleRemoveFile = useCallback(() => {
    setFile(null);
    setUploaded(false);
    setProgress(0);
  }, []);

  return (
    <div className="w-full">
      {!file ? (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={cn(
            "relative border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 cursor-pointer group",
            isDragging
              ? "border-primary bg-primary/10 scale-[1.02]"
              : "border-border/50 hover:border-primary/50 hover:bg-card/50"
          )}
        >
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileSelect}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          
          <div className="flex flex-col items-center gap-4">
            <div className={cn(
              "w-20 h-20 rounded-2xl flex items-center justify-center transition-all duration-300",
              isDragging ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary group-hover:bg-primary/20"
            )}>
              <Upload className="w-10 h-10" />
            </div>
            
            <div>
              <p className="text-xl font-semibold text-foreground mb-2">
                Drop your CV here
              </p>
              <p className="text-muted-foreground">
                or <span className="text-primary font-medium">browse files</span>
              </p>
            </div>
            
            <p className="text-sm text-muted-foreground">
              Supports PDF, DOC, DOCX (max 10MB)
            </p>
          </div>
        </div>
      ) : (
        <div className="border border-border/50 rounded-2xl p-6 bg-card/30">
          <div className="flex items-start gap-4">
            <div className={cn(
              "w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0",
              uploaded ? "bg-green-500/20 text-green-500" : "bg-primary/10 text-primary"
            )}>
              {uploaded ? (
                <CheckCircle className="w-7 h-7" />
              ) : (
                <FileText className="w-7 h-7" />
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="font-medium text-foreground truncate">{file.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
                
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleRemoveFile}
                  className="flex-shrink-0 text-muted-foreground hover:text-foreground"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
              
              {uploading && (
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Parsing your CV...
                    </span>
                    <span className="text-sm font-medium text-primary">{progress}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>
              )}
              
              {uploaded && (
                <p className="mt-3 text-sm text-green-500 font-medium">
                  CV parsed successfully! View your matched jobs below.
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
