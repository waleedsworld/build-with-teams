
import React, { useState } from "react";
import { Navigation } from "@/components/navigation";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { Send, FileText } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

const ApiTestPage = () => {
  const [candidateName, setCandidateName] = useState("");
  const [uniqueId, setUniqueId] = useState("");
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [surveyFile, setSurveyFile] = useState<File | null>(null);
  const [surveyText, setSurveyText] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [useSurveyFile, setUseSurveyFile] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<any>(null);
  const [isManualOpen, setIsManualOpen] = useState(false);
  const [manualRequest, setManualRequest] = useState(
`curl -X POST https://test.applytocollege.pk/submit \\
  -F "candidate_name=John Doe" \\
  -F "unique_id=5678" \\
  -F "cv=@cv.pdf" \\
  -F "survey=@survey.txt" \\
  -F "video_url=https://jpaxhfoyaytpmcqlwrfv.supabase.co/storage/v1/object/public/videos/video_1747381619527.webm"`
  );

  const handleCvFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setCvFile(e.target.files[0]);
    }
  };

  const handleSurveyFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSurveyFile(e.target.files[0]);
    }
  };

  const validateForm = () => {
    if (!candidateName) {
      toast.error("Please enter candidate name");
      return false;
    }
    if (!uniqueId) {
      toast.error("Please enter unique ID");
      return false;
    }
    if (!cvFile) {
      toast.error("Please upload a CV file");
      return false;
    }
    if (useSurveyFile && !surveyFile) {
      toast.error("Please upload a survey file or switch to text input");
      return false;
    }
    if (!useSurveyFile && !surveyText) {
      toast.error("Please enter survey text or switch to file upload");
      return false;
    }
    if (!videoUrl) {
      toast.error("Please enter video URL");
      return false;
    }
    return true;
  };

  const handleSendButtonClick = async () => {
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      // Create form data
      const formData = new FormData();
      formData.append("candidate_name", candidateName);
      formData.append("unique_id", uniqueId);
      
      if (cvFile) {
        formData.append("cv", cvFile);
      }
      
      if (useSurveyFile && surveyFile) {
        formData.append("survey", surveyFile);
      } else if (!useSurveyFile) {
        formData.append("survey", surveyText);
      }
      
      formData.append("video_url", videoUrl);
      
      // Send the request
      const response = await fetch("https://test.applytocollege.pk/submit", {
        method: "POST",
        body: formData,
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }
      
      setResponse(data);
      toast.success("API request successful!");
    } catch (error) {
      console.error("API Error:", error);
      toast.error(`API request failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  };

  const generateManualRequest = () => {
    // This would generate the actual curl command based on form inputs
    // For now just returning a template
    return manualRequest;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateManualRequest())
      .then(() => toast.success("Copied to clipboard!"))
      .catch(err => toast.error("Failed to copy: " + err));
  };

  return (
    <div className="min-h-screen pb-20">
      <Navigation />
      <div className="container mx-auto px-4 pt-24">
        <Card className="w-full max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl">API Test Page</CardTitle>
            <CardDescription>
              Test the College Application API submission endpoint
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="candidate-name">Candidate Name</Label>
                <Input
                  id="candidate-name"
                  placeholder="Enter full name"
                  value={candidateName}
                  onChange={(e) => setCandidateName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="unique-id">Unique ID</Label>
                <Input
                  id="unique-id"
                  placeholder="Enter unique identifier"
                  value={uniqueId}
                  onChange={(e) => setUniqueId(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="cv-file">CV File (PDF or DOCX)</Label>
              <Input
                id="cv-file"
                type="file"
                accept=".pdf,.docx"
                onChange={handleCvFileChange}
              />
              {cvFile && (
                <p className="text-sm text-muted-foreground">
                  Selected: {cvFile.name} ({Math.round(cvFile.size / 1024)} KB)
                </p>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2 mb-2">
                <Checkbox 
                  id="use-survey-file" 
                  checked={useSurveyFile} 
                  onCheckedChange={(checked) => setUseSurveyFile(checked as boolean)}
                />
                <Label htmlFor="use-survey-file">Upload survey as file</Label>
              </div>
              
              {useSurveyFile ? (
                <div className="space-y-2">
                  <Label htmlFor="survey-file">Survey File (.txt)</Label>
                  <Input
                    id="survey-file"
                    type="file"
                    accept=".txt"
                    onChange={handleSurveyFileChange}
                  />
                  {surveyFile && (
                    <p className="text-sm text-muted-foreground">
                      Selected: {surveyFile.name} ({Math.round(surveyFile.size / 1024)} KB)
                    </p>
                  )}
                </div>
              ) : (
                <div className="space-y-2">
                  <Label htmlFor="survey-text">Survey Text</Label>
                  <textarea
                    id="survey-text"
                    className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Enter survey responses"
                    value={surveyText}
                    onChange={(e) => setSurveyText(e.target.value)}
                  ></textarea>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="video-url">Video URL</Label>
              <Input
                id="video-url"
                placeholder="Enter Supabase video URL"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Example: https://jpaxhfoyaytpmcqlwrfv.supabase.co/storage/v1/object/public/videos/video_1747381619527.webm
              </p>
            </div>

            {response && (
              <div className="bg-secondary p-4 rounded-md">
                <h3 className="font-medium mb-2">API Response:</h3>
                <pre className="text-xs overflow-x-auto p-2 bg-background rounded">
                  {JSON.stringify(response, null, 2)}
                </pre>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex-col space-y-4">
            <div className="flex flex-col sm:flex-row w-full gap-4">
              <Button 
                className="flex-1" 
                onClick={handleSendButtonClick} 
                disabled={isLoading}
              >
                <Send className="mr-2 h-4 w-4" />
                {isLoading ? "Sending..." : "Send API Request"}
              </Button>
              
              <Collapsible
                open={isManualOpen}
                onOpenChange={setIsManualOpen}
                className="flex-1"
              >
                <CollapsibleTrigger asChild>
                  <Button variant="outline" className="w-full">
                    <FileText className="mr-2 h-4 w-4" />
                    {isManualOpen ? "Hide Manual Test" : "Manual Test"}
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-4">
                  <div className="space-y-2">
                    <div className="bg-secondary p-3 rounded-md relative">
                      <pre className="text-xs overflow-x-auto whitespace-pre-wrap">
                        {generateManualRequest()}
                      </pre>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="absolute top-2 right-2"
                        onClick={copyToClipboard}
                      >
                        Copy
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Copy this curl command to test the API manually from your terminal.
                    </p>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>
          </CardFooter>
        </Card>
        
        {/* API Documentation */}
        <Card className="w-full max-w-3xl mx-auto mt-8">
          <CardHeader>
            <CardTitle className="text-xl">API Documentation</CardTitle>
            <CardDescription>
              Details about the /submit endpoint
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="prose prose-sm max-w-none dark:prose-invert">
              <h3>Endpoint</h3>
              <pre className="bg-secondary p-2 rounded-md">POST https://test.applytocollege.pk/submit</pre>
              
              <h3>Description</h3>
              <p>
                This API allows candidates to submit their application including full name, unique ID,
                CV file, survey response, and Supabase-hosted video URL.
              </p>
              
              <h3>Request Parameters</h3>
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="text-left py-2">Field</th>
                    <th className="text-left py-2">Type</th>
                    <th className="text-left py-2">Required</th>
                    <th className="text-left py-2">Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t">
                    <td className="py-2">candidate_name</td>
                    <td>string</td>
                    <td>✅</td>
                    <td>Full name of the applicant</td>
                  </tr>
                  <tr className="border-t">
                    <td className="py-2">unique_id</td>
                    <td>string</td>
                    <td>✅</td>
                    <td>A unique identifier for the applicant</td>
                  </tr>
                  <tr className="border-t">
                    <td className="py-2">cv</td>
                    <td>file</td>
                    <td>✅</td>
                    <td>CV file (PDF or DOCX)</td>
                  </tr>
                  <tr className="border-t">
                    <td className="py-2">survey</td>
                    <td>file or string</td>
                    <td>✅</td>
                    <td>Survey response as a text file or a raw text field</td>
                  </tr>
                  <tr className="border-t">
                    <td className="py-2">video_url</td>
                    <td>string</td>
                    <td>✅</td>
                    <td>Full public Supabase URL of the uploaded .webm video</td>
                  </tr>
                </tbody>
              </table>
              
              <h3>Response Format</h3>
              <pre className="bg-secondary p-2 rounded-md overflow-x-auto text-xs">
{`{
  "status": "success",
  "folder": "candidates/John_Doe_5678",
  "video_url": "https://test.applytocollege.pk/videos/John_Doe_5678/video.webm"
}`}
              </pre>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ApiTestPage;
