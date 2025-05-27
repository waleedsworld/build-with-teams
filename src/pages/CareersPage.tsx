
import { Navigation } from "@/components/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { jobListings } from "@/data/jobListings";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function CareersPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <div className="container py-12 flex-1">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-4xl font-bold">Join Our Team</h1>
              <Link 
                to="/ai-marketing"
                className="text-blue-600 hover:text-blue-800 flex items-center gap-2"
              >
                Check our AI-Marketing Services <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <p className="text-xl text-muted-foreground">
              Help us build the future of team collaboration and software development
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {jobListings.map((job) => (
              <Card key={job.id} className="flex flex-col">
                <CardHeader>
                  <CardTitle>{job.title}</CardTitle>
                  <CardDescription className="line-clamp-2">
                    {job.taasDescription}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="mb-4">
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Key Requirements:</h3>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      {job.requirements.slice(0, 2).map((req, i) => (
                        <li key={i} className="line-clamp-1">{req}</li>
                      ))}
                    </ul>
                  </div>
                  <p className="text-xs text-muted-foreground italic mb-4">
                    {job.note}
                  </p>
                </CardContent>
                <div className="px-6 pb-6 mt-auto flex justify-between">
                  <Link 
                    to={`/careers/${job.id}`}
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium"
                  >
                    View Details
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link 
                    to={`/career/apply?jobId=${job.id}&title=${encodeURIComponent(job.title)}`}
                    className="text-sm font-medium text-blue-600 hover:text-blue-800"
                  >
                    Apply Now
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
