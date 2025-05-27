
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Navigation } from "@/components/navigation";
import { getJobById, JobListing } from "@/data/jobListings";
import { ArrowLeft, Briefcase, Clock, Users, AlertCircle, X } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function JobDetailPage() {
  const { jobId } = useParams<{ jobId: string }>();
  const navigate = useNavigate();
  const [job, setJob] = useState<JobListing | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // State for special alert functionality
  const [showSpecialPopup, setShowSpecialPopup] = useState(false);
  const [showSpecialAlert, setShowSpecialAlert] = useState(false);

  useEffect(() => {
    if (jobId) {
      const foundJob = getJobById(jobId);
      if (foundJob) {
        setJob(foundJob);
        
        // Check if this is the video model job and show popup
        if (jobId === "video-model-reels-host") {
          setShowSpecialPopup(true);
          setShowSpecialAlert(true);
        }
      }
      setIsLoading(false);
    }
  }, [jobId]);

  const handlePopupClose = () => {
    setShowSpecialPopup(false);
  };

  const handleAlertClose = () => {
    setShowSpecialAlert(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <div className="container py-12 flex-1 flex items-center justify-center">
          <div className="text-center">
            <p>Loading job details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <div className="container py-12 flex-1 flex items-center justify-center">
          <Card className="max-w-md w-full">
            <CardHeader>
              <CardTitle>Job Not Found</CardTitle>
              <CardDescription>
                The job posting you're looking for doesn't exist or may have been removed.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="outline" className="w-full">
                <Link to="/careers">View All Job Openings</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      {/* Special Popup Dialog */}
      <Dialog open={showSpecialPopup} onOpenChange={setShowSpecialPopup}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-blue-600" />
              Important Notice
            </DialogTitle>
            <DialogDescription className="text-base pt-2">
              While we welcome applicants of all backgrounds, we especially encourage women with a strong affinity for beauty and fashion products to apply.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end pt-4">
            <Button onClick={handlePopupClose}>
              Continue
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      
      <div className="container pt-20 pb-12 flex-1">
        {/* Special Alert Banner */}
        {showSpecialAlert && (
          <Alert className="mb-6 border-blue-200 bg-blue-50">
            <AlertCircle className="h-4 w-4 text-blue-600" />
            <AlertDescription className="flex items-center justify-between w-full">
              <span className="text-blue-800">
                While we welcome applicants of all backgrounds, we especially encourage women with a strong affinity for beauty and fashion products to apply.
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleAlertClose}
                className="ml-4 h-6 w-6 p-0 text-blue-600 hover:text-blue-800"
              >
                <X className="h-4 w-4" />
              </Button>
            </AlertDescription>
          </Alert>
        )}
        
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Link 
              to="/careers" 
              className="flex items-center mb-6 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to All Jobs
            </Link>
            
            <h1 className="text-3xl font-bold mb-4">{job.title}</h1>
            
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex items-center text-sm text-muted-foreground">
                <Briefcase className="mr-2 h-4 w-4" />
                <span>Remote Position</span>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="mr-2 h-4 w-4" />
                <span>Project-based</span>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Users className="mr-2 h-4 w-4" />
                <span>Team-as-a-Service Model</span>
              </div>
            </div>
          </div>
          
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-xl">What is TaaS?</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{job.taasDescription}</p>
              <p className="mt-4 text-sm text-muted-foreground italic">
                <strong>Note:</strong> {job.note}
              </p>
            </CardContent>
          </Card>
          
          <div className="grid gap-8 md:grid-cols-2 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Requirements</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-2">
                  {job.requirements.map((req, i) => (
                    <li key={i}>{req}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Responsibilities</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-2">
                  {job.responsibilities.map((resp, i) => (
                    <li key={i}>{resp}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
          
          <div className="flex justify-center">
            <Button 
              onClick={() => navigate(`/career/apply?jobId=${jobId}&title=${encodeURIComponent(job.title)}`)}
              size="lg"
              className="px-8"
            >
              Apply for this Position
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
