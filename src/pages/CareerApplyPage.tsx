
import { useState, useEffect, useRef } from "react";
import { Navigation } from "@/components/navigation";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter, DrawerClose } from "@/components/ui/drawer";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowRight, ArrowLeft, Upload, Save, User, FileText, Video, CheckSquare, Send, Play, Pause, CircleStop, AlertTriangle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useIsMobile } from "@/hooks/use-mobile";

// Application steps - restore PERSONALITY step
const STEPS = {
  INTRO: 0,
  NAME: 1,
  DOCUMENTS: 2,
  PERSONALITY: 3,
  VIDEO: 4,
  SUBMIT: 5,
};

// Import personality assessment helpers
import { questions, generatePersonalityReport } from "../components/career/personalityQuestions";

// Browser detection function
const isSafari = (): boolean => {
  const userAgent = navigator.userAgent.toLowerCase();
  return userAgent.includes('safari') && !userAgent.includes('chrome') && !userAgent.includes('chromium');
};

const CareerApplyPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();
  const [showIntroModal, setShowIntroModal] = useState(true);
  const [showSafariWarning, setShowSafariWarning] = useState(false);
  const [step, setStep] = useState(STEPS.INTRO);
  const [progress, setProgress] = useState(0);
  
  // Check for Safari browser on mount
  useEffect(() => {
    if (isSafari()) {
      setShowSafariWarning(true);
      setShowIntroModal(false);
    }
  }, []);
  
  // Get job post param from URL
  const searchParams = new URLSearchParams(location.search);
  const jobId = searchParams.get('jobId') || 'default-position';
  const jobTitle = searchParams.get('title') || 'Default Position';
  
  // Application state
  const [candidateName, setCandidateName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [consentShowcase, setConsentShowcase] = useState(false);
  const [consentSaveProgress, setConsentSaveProgress] = useState(true);
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [coverLetterFile, setCoverLetterFile] = useState<File | null>(null);
  const [coverLetterText, setCoverLetterText] = useState("");
  const [useCoverLetterFile, setUseCoverLetterFile] = useState(true);
  const [videoUrl, setVideoUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uniqueId, setUniqueId] = useState(`TAAS-${Date.now().toString().slice(-6)}`);
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);
  
  // Personality assessment state
  const [personalityAnswers, setPersonalityAnswers] = useState<{
    questionIndex: number;
    selectedOption: number;
    score: number;
  }[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [personalityCompleted, setPersonalityCompleted] = useState(false);
  
  // Video recording state
  const [recording, setRecording] = useState<boolean>(false);
  const [paused, setPaused] = useState<boolean>(false);
  const [videoData, setVideoData] = useState<Blob | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [timerInterval, setTimerInterval] = useState<number | null>(null);
  const [showPreviewDialog, setShowPreviewDialog] = useState<boolean>(false);
  const [videoLoadError, setVideoLoadError] = useState<string | null>(null);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const previewVideoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<BlobPart[]>([]);
  
  const MAX_RECORDING_TIME = 60; // 1 minute in seconds

  // Check for videoUrl in location.state when returning from the video recording page
  useEffect(() => {
    if (location.state?.videoUrl) {
      setVideoUrl(location.state.videoUrl);
      
      // If we're already at the video step or beyond, just update the URL
      // If we're at an earlier step, advance to the video step
      if (step < STEPS.VIDEO) {
        setStep(STEPS.VIDEO);
      }
      
      toast.success("Video added successfully", {
        description: "Your video has been attached to your application."
      });
      
      // Clear location state to prevent reapplying the URL if the page refreshes
      window.history.replaceState({}, document.title);
    }
  }, [location.state, step]);

  // Video preview setup with improved error handling and format support
  useEffect(() => {
    if (previewUrl && previewVideoRef.current) {
      console.log("Setting up preview with URL:", previewUrl);
      
      // Reset previous errors
      setVideoLoadError(null);
      
      // Setup video element
      const videoElement = previewVideoRef.current;
      videoElement.src = previewUrl;
      videoElement.muted = true;
      videoElement.controls = true;
      
      // Event handlers
      const handleCanPlay = () => {
        console.log("Video can play");
        setVideoLoadError(null);
      };
      
      const handleError = (e: Event) => {
        console.error("Video error:", e);
        const target = e.target as HTMLVideoElement;
        const error = target.error;
        
        let errorMessage = "Failed to load video.";
        if (error) {
          switch (error.code) {
            case error.MEDIA_ERR_ABORTED:
              errorMessage = "Video loading was aborted.";
              break;
            case error.MEDIA_ERR_NETWORK:
              errorMessage = "Network error while loading video.";
              break;
            case error.MEDIA_ERR_DECODE:
              errorMessage = "Video format not supported.";
              break;
            case error.MEDIA_ERR_SRC_NOT_SUPPORTED:
              errorMessage = "Video format not supported by your browser.";
              break;
          }
        }
        
        setVideoLoadError(errorMessage);
        toast.error("Video Error", {
          description: errorMessage + " Please try recording again."
        });
      };
      
      // Set up event listeners
      videoElement.addEventListener('canplay', handleCanPlay);
      videoElement.addEventListener('error', handleError);
      
      // Load the video
      videoElement.load();
      
      // Clean up function
      return () => {
        videoElement.removeEventListener('canplay', handleCanPlay);
        videoElement.removeEventListener('error', handleError);
      };
    }
  }, [previewUrl]);

  // Load saved progress from session storage on mount
  useEffect(() => {
    const savedProgress = sessionStorage.getItem("careerApplicationProgress");
    if (savedProgress) {
      try {
        const parsedProgress = JSON.parse(savedProgress);
        
        // Restore all saved state
        if (parsedProgress.step !== undefined) setStep(parsedProgress.step);
        if (parsedProgress.candidateName !== undefined) setCandidateName(parsedProgress.candidateName);
        if (parsedProgress.email !== undefined) setEmail(parsedProgress.email);
        if (parsedProgress.phone !== undefined) setPhone(parsedProgress.phone);
        if (parsedProgress.consentShowcase !== undefined) setConsentShowcase(parsedProgress.consentShowcase);
        if (parsedProgress.uniqueId !== undefined) setUniqueId(parsedProgress.uniqueId);
        if (parsedProgress.coverLetterText !== undefined) setCoverLetterText(parsedProgress.coverLetterText);
        if (parsedProgress.useCoverLetterFile !== undefined) setUseCoverLetterFile(parsedProgress.useCoverLetterFile);
        if (parsedProgress.videoUrl !== undefined) setVideoUrl(parsedProgress.videoUrl);
        if (parsedProgress.personalityAnswers !== undefined) setPersonalityAnswers(parsedProgress.personalityAnswers);
        if (parsedProgress.currentQuestionIndex !== undefined) setCurrentQuestionIndex(parsedProgress.currentQuestionIndex);
        
        // Don't show intro modal if we're resuming
        if (parsedProgress.step > STEPS.INTRO) {
          setShowIntroModal(false);
        }
        
        toast("Application progress restored", {
          description: "You can continue from where you left off."
        });
      } catch (error) {
        console.error("Error loading saved progress:", error);
      }
    }
  }, []);
  
  // Save progress to session storage whenever state changes
  useEffect(() => {
    if (consentSaveProgress && step > STEPS.INTRO) {
      const progressData = {
        step,
        candidateName,
        email,
        phone,
        consentShowcase,
        uniqueId,
        coverLetterText,
        useCoverLetterFile,
        videoUrl,
        personalityAnswers,
        currentQuestionIndex,
      };
      
      sessionStorage.setItem("careerApplicationProgress", JSON.stringify(progressData));
    }
  }, [
    step, 
    candidateName,
    email,
    phone,
    consentShowcase, 
    consentSaveProgress, 
    uniqueId,
    coverLetterText,
    useCoverLetterFile,
    videoUrl,
    personalityAnswers,
    currentQuestionIndex,
  ]);
  
  // Update progress bar when step changes
  useEffect(() => {
    setProgress(((step - 1) / (Object.keys(STEPS).length - 2)) * 100);
  }, [step]);
  
  // Start application
  const handleStartApplication = () => {
    if (!consentShowcase) {
      toast.error("Consent required", {
        description: "Please provide consent to showcase your application."
      });
      return;
    }
    
    setShowIntroModal(false);
    setStep(STEPS.NAME);
  };
  
  // Handle file uploads
  const handleCvUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setCvFile(e.target.files[0]);
    }
  };
  
  const handleCoverLetterUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setCoverLetterFile(e.target.files[0]);
    }
  };
  
  // Next and previous step navigation
  const handleNextStep = () => {
    // Validate current step
    if (step === STEPS.NAME) {
      if (!candidateName) {
        toast.error("Please enter your full name");
        return;
      }
      
      if (!email) {
        toast.error("Please enter your email address");
        return;
      }
      
      if (!phone) {
        toast.error("Please enter your phone number");
        return;
      }
    }
    
    if (step === STEPS.DOCUMENTS && !cvFile) {
      toast("Continuing without CV", {
        description: "You can submit your application without a CV, but it may affect your chances."
      });
    }
    
    if (step === STEPS.PERSONALITY && !personalityCompleted) {
      toast.error("Please complete the personality assessment", {
        description: "All questions must be answered before proceeding."
      });
      return;
    }
    
    if (step === STEPS.VIDEO && !videoUrl) {
      toast.error("Video recording is required", {
        description: "Please record a video introduction before proceeding."
      });
      return;
    }
    
    setStep(prevStep => prevStep + 1);
  };
  
  // Handle personality question answers
  const handlePersonalityAnswer = (selectedOption: number) => {
    const question = questions[currentQuestionIndex];
    const score = question.options[selectedOption].score;
    
    setPersonalityAnswers(prevAnswers => {
      const updatedAnswers = prevAnswers.filter(a => a.questionIndex !== currentQuestionIndex);
      updatedAnswers.push({
        questionIndex: currentQuestionIndex,
        selectedOption,
        score
      });
      return updatedAnswers;
    });
  };

  const handlePersonalityNext = () => {
    const currentAnswer = personalityAnswers.find(a => a.questionIndex === currentQuestionIndex);
    if (!currentAnswer) {
      toast.error("Please select an answer before continuing");
      return;
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // All questions completed
      setPersonalityCompleted(true);
      toast.success("Personality assessment completed!");
    }
  };

  const handlePersonalityBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };
  
  const handlePreviousStep = () => {
    setStep(prevStep => prevStep - 1);
  };
  
  // Handle API submission with corrected video URL handling
  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      console.log("Starting submission process...");
      
      // Create form data
      const formData = new FormData();
      formData.append("candidate_name", candidateName);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("unique_id", uniqueId);
      formData.append("job_post_id", jobId);
      
      // Add CV if available
      if (cvFile) {
        formData.append("cv", cvFile);
      }
      
      // Generate detailed personality report with answers
      const personalityResults = generatePersonalityReport(personalityAnswers);
      
      // Convert detailedAnswers to array of objects with question and answer
      const detailedAnswersForApi = personalityResults.detailedAnswers.map(a => ({
        question: a.question,
        answer: a.answer,
        score: a.score
      }));
      
      // Create a complete survey object with all personality data including questions
      const surveyData = {
        answers: personalityAnswers,
        questions: questions.map((q, index) => ({
          questionIndex: index,
          question: q.question,
          options: q.options
        })),
        totalScore: personalityResults.totalScore,
        maxScore: personalityResults.maxScore,
        scorePercentage: personalityResults.scorePercentage,
        personalityType: personalityResults.personalityType,
        personalityEmoji: personalityResults.personalityEmoji,
        detailedAnswers: detailedAnswersForApi
      };
      
      // Convert to JSON and add as survey parameter
      formData.append("survey", JSON.stringify(surveyData));
      
      // Add cover letter as additional data
      if (useCoverLetterFile && coverLetterFile) {
        formData.append("cover_letter", coverLetterFile);
      } else if (!useCoverLetterFile && coverLetterText) {
        formData.append("cover_letter_text", coverLetterText);
      }
      
      // Test if the video URL is accessible before submitting
      if (videoUrl) {
        console.log("Testing video URL accessibility:", videoUrl);
        
        try {
          // Test if we can fetch the video URL to ensure it's publicly accessible
          const testResponse = await fetch(videoUrl, { method: 'HEAD' });
          console.log("Video URL test response status:", testResponse.status);
          
          if (!testResponse.ok) {
            console.error("Video URL is not publicly accessible:", testResponse.status);
            throw new Error(`Video URL is not accessible (Status: ${testResponse.status}). Please try uploading the video again.`);
          }
          
          formData.append("video_url", videoUrl);
        } catch (urlTestError) {
          console.error("Error testing video URL:", urlTestError);
          throw new Error("Video URL is not accessible. Please try uploading the video again.");
        }
      }
      
      // Log FormData contents for debugging
      console.log("FormData contents:");
      for (const pair of formData.entries()) {
        if (pair[1] instanceof File) {
          console.log(`${pair[0]}: [File] ${pair[1].name} (${pair[1].size} bytes)`);
        } else {
          console.log(`${pair[0]}: ${pair[1]}`);
        }
      }
      
      // Save to Supabase first
      console.log("Saving to Supabase...");
      const { error: supabaseError } = await supabase
        .from('job_applications')
        .insert({
          candidate_name: candidateName,
          email: email,
          phone: phone,
          unique_id: uniqueId,
          cv_url: null, // We'll add this later if needed
          cover_letter_url: null, // We'll add this later if needed
          cover_letter_text: !useCoverLetterFile ? coverLetterText : null,
          video_url: videoUrl,
          personality_data: surveyData,
          job_post_id: jobId
        });
        
      if (supabaseError) {
        console.error("Supabase error:", supabaseError);
        throw new Error("Failed to save application data to database");
      }
      
      console.log("Successfully saved to Supabase, now sending to external API...");
      
      // Send the request to external API
      const response = await fetch("https://test.applytocollege.pk/submit", {
        method: "POST",
        body: formData,
      });
      
      console.log("API Response status:", response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error("API Error response:", errorText);
        
        let errorData;
        try {
          errorData = JSON.parse(errorText);
        } catch {
          errorData = { message: errorText };
        }
        
        throw new Error(errorData.message || errorData.error || "Failed to submit application");
      }
      
      const data = await response.json();
      console.log("API Success response:", data);
      
      // Clear session storage
      sessionStorage.removeItem("careerApplicationProgress");
      
      toast.success("Application submitted successfully!", {
        description: "Thank you for applying. We'll review your application and get back to you."
      });
      
      // Set application as submitted and redirect to success page
      setApplicationSubmitted(true);
      navigate("/career/success", { 
        state: { 
          candidateName, 
          email, 
          uniqueId
        } 
      });
    } catch (error) {
      console.error("Error submitting application:", error);
      toast.error(`Failed to submit application: ${error instanceof Error ? error.message : "Please try again later."}`);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Video recording functions with improved codec support and better error handling
  const startRecording = async () => {
    try {
      console.log("Starting video recording...");
      
      // Request camera and microphone permissions with more specific constraints
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280, max: 1920 },
          height: { ideal: 720, max: 1080 },
          frameRate: { ideal: 30, max: 60 }
        },
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        }
      });
      
      streamRef.current = stream;
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      
      // Improved codec selection with audio/video compatibility
      let options: MediaRecorderOptions = {};
      const supportedTypes = [
        'video/mp4',
        'video/webm;codecs=vp9,opus',
        'video/webm;codecs=vp8,opus', 
        'video/webm;codecs=h264,opus',
        'video/webm'
      ];
      
      let selectedType = '';
      for (const type of supportedTypes) {
        if (MediaRecorder.isTypeSupported(type)) {
          options.mimeType = type;
          selectedType = type;
          console.log("Using MIME type:", type);
          break;
        }
      }
      
      if (!selectedType) {
        console.warn("No supported MIME type found, using default");
      }
      
      const mediaRecorder = new MediaRecorder(stream, options);
      mediaRecorderRef.current = mediaRecorder;
      
      chunksRef.current = [];
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
          console.log("Data chunk received:", event.data.size, "bytes");
        }
      };
      
      mediaRecorder.onstop = () => {
        console.log("Recording stopped, processing data...");
        const mimeType = mediaRecorder.mimeType || 'video/webm';
        const blob = new Blob(chunksRef.current, { type: mimeType });
        setVideoData(blob);
        
        // Create a URL for the recorded video blob
        const url = URL.createObjectURL(blob);
        console.log("Created blob URL:", url, "with MIME type:", blob.type, "Size:", blob.size);
        setPreviewUrl(url);
        
        // Stop the timer
        if (timerInterval !== null) {
          clearInterval(timerInterval);
          setTimerInterval(null);
        }
      };
      
      mediaRecorder.onerror = (event) => {
        console.error("MediaRecorder error:", event);
        toast.error("Recording Error", {
          description: "There was an error during recording. Please try again."
        });
      };
      
      // Start recording with timeslice for better data handling
      mediaRecorder.start(1000);
      setRecording(true);
      setPaused(false);
      setElapsedTime(0);
      setVideoLoadError(null);
      
      console.log("Recording started successfully");
      
      // Start the timer
      const interval = window.setInterval(() => {
        setElapsedTime(prev => {
          if (prev >= MAX_RECORDING_TIME) {
            stopRecording();
            return MAX_RECORDING_TIME;
          }
          return prev + 1;
        });
      }, 1000);
      setTimerInterval(interval);
      
    } catch (err) {
      console.error("Error accessing media devices:", err);
      
      let errorMessage = "Please allow access to camera and microphone to record video";
      
      if (err instanceof Error) {
        if (err.name === 'NotAllowedError') {
          errorMessage = "Camera and microphone access denied. Please allow permissions and try again.";
        } else if (err.name === 'NotFoundError') {
          errorMessage = "No camera or microphone found. Please check your devices.";
        } else if (err.name === 'NotSupportedError') {
          errorMessage = "Video recording not supported in this browser. Please try Chrome or Firefox.";
        } else if (err.name === 'NotReadableError') {
          errorMessage = "Camera or microphone is already in use by another application.";
        }
      }
      
      toast.error("Permission Error", {
        description: errorMessage
      });
    }
  };
  
  const stopRecording = () => {
    if (mediaRecorderRef.current && recording) {
      console.log("Stopping recording...");
      mediaRecorderRef.current.stop();
      
      // Stop all tracks in the stream
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => {
          track.stop();
          console.log("Stopped track:", track.kind);
        });
      }
      
      setRecording(false);
      
      // Stop the timer
      if (timerInterval !== null) {
        clearInterval(timerInterval);
        setTimerInterval(null);
      }
    }
  };
  
  const pauseRecording = () => {
    if (mediaRecorderRef.current && recording && !paused) {
      mediaRecorderRef.current.pause();
      setPaused(true);
      
      // Pause the timer
      if (timerInterval !== null) {
        clearInterval(timerInterval);
        setTimerInterval(null);
      }
    }
  };
  
  const resumeRecording = () => {
    if (mediaRecorderRef.current && recording && paused) {
      mediaRecorderRef.current.resume();
      setPaused(false);
      
      // Resume the timer
      const interval = window.setInterval(() => {
        setElapsedTime(prev => {
          if (prev >= MAX_RECORDING_TIME) {
            stopRecording();
            return MAX_RECORDING_TIME;
          }
          return prev + 1;
        });
      }, 1000);
      setTimerInterval(interval);
    }
  };

  const handlePreviewClick = () => {
    if (previewUrl) {
      setShowPreviewDialog(true);
    }
  };
  
  const uploadVideo = async () => {
    if (!videoData) return;
    
    try {
      setUploading(true);
      
      // Create a simple filename without subfolders to ensure proper public access
      const timestamp = Date.now();
      let fileName = `video_${timestamp}`;
      
      // Determine file extension based on blob type
      if (videoData.type.includes('mp4')) {
        fileName += '.mp4';
      } else if (videoData.type.includes('webm')) {
        fileName += '.webm';
      } else {
        fileName += '.webm'; // Default fallback
      }
      
      console.log("Uploading video to public bucket:", fileName, "Type:", videoData.type, "Size:", videoData.size);
      
      // Upload the video to Supabase Storage in the public videos bucket
      const { data, error } = await supabase.storage
        .from('videos')
        .upload(fileName, videoData, {
          cacheControl: '3600',
          upsert: false,
          contentType: videoData.type
        });
      
      if (error) {
        console.error("Upload error:", error);
        throw error;
      }
      
      // Get the public URL - construct it manually using the known Supabase URL
      const bucketUrl = `https://jpaxhfoyaytpmcqlwrfv.supabase.co/storage/v1/object/public/videos/${fileName}`;
      
      console.log("Video uploaded successfully. Testing public URL:", bucketUrl);
      
      // Test the public URL to make sure it's accessible
      try {
        const testResponse = await fetch(bucketUrl, { method: 'HEAD' });
        if (testResponse.ok) {
          console.log("Public URL is accessible");
          setVideoUrl(bucketUrl);
        } else {
          console.error("Public URL test failed:", testResponse.status);
          throw new Error("Video uploaded but not publicly accessible");
        }
      } catch (testError) {
        console.error("Error testing public URL:", testError);
        // Fallback to the Supabase generated URL
        const { data: publicUrlData } = supabase.storage
          .from('videos')
          .getPublicUrl(fileName);
        
        console.log("Using fallback public URL:", publicUrlData.publicUrl);
        setVideoUrl(publicUrlData.publicUrl);
      }
      
      setUploading(false);
      toast.success("Video uploaded successfully");
      
    } catch (err) {
      console.error("Error uploading video:", err);
      toast.error("Upload Failed", {
        description: "There was a problem uploading your video. Please try again."
      });
      setUploading(false);
    }
  };
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  // Render intro content - extracted to a separate function
  const renderIntroContent = () => {
    return (
      <div className="space-y-4">
        <div className="space-y-2">
          <p className="text-sm">
            Thank you for your interest in joining our team. This application process 
            consists of the following steps:
          </p>
          
          <ol className="list-decimal list-inside space-y-2 ml-2 text-sm">
            <li className="font-medium">Personal Information <span className="text-muted-foreground font-normal">(Name, Email, Contact)</span></li>
            <li className="font-medium">Document Upload <span className="text-muted-foreground font-normal">(CV, Cover Letter)</span></li>
            <li className="font-medium">Assessment <span className="text-muted-foreground font-normal">(Personality Test)</span></li>
            <li className="font-medium">Video Introduction <span className="text-muted-foreground font-normal">(60 seconds)</span></li>
            <li className="font-medium">Review & Submit</li>
          </ol>
        </div>
        
        <div className="space-y-2">
          <p className="text-sm font-medium">Time Required:</p>
          <p className="text-sm">Approximately 10-15 minutes to complete all sections.</p>
        </div>
        
        <div className="space-y-2">
          <p className="text-sm font-medium">Important Notes:</p>
          <ul className="list-disc list-inside space-y-1 ml-2 text-sm text-muted-foreground">
            <li>Have your resume/CV ready in PDF or DOCX format</li>
            <li>You'll need a working webcam and microphone for the video introduction</li>
            <li>Your application progress can be saved if you need to return later</li>
            <li>Once submitted, applications cannot be edited</li>
          </ul>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Switch
              id="consent"
              checked={consentShowcase}
              onCheckedChange={setConsentShowcase}
            />
            <Label htmlFor="consent" className="text-sm">
              I agree that my application materials may be kept for consideration for future positions.
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="save-progress"
              checked={consentSaveProgress}
              onCheckedChange={setConsentSaveProgress}
            />
            <Label htmlFor="save-progress" className="text-sm">
              Save my progress so I can continue later.
            </Label>
          </div>
        </div>
      </div>
    )
  };

  // Render footer content - extracted to a separate function
  const renderFooterContent = () => {
    return (
      <>
        <Button 
          onClick={handleStartApplication}
          className="w-full"
        >
          Start Application
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </>
    )
  };
  
  // Render the specific content for the current step
  const renderStepContent = () => {
    switch (step) {
      case STEPS.NAME:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="candidate-name">Full Name</Label>
              <Input
                id="candidate-name"
                placeholder="Enter your full name"
                value={candidateName}
                onChange={(e) => setCandidateName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="Enter your phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="job-post">Applying For</Label>
              <Input
                id="job-post"
                value={jobTitle}
                readOnly
                className="bg-muted dark:bg-gray-700 dark:text-white"
              />
              <p className="text-xs text-muted-foreground">Position you're applying for.</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="unique-id">Application ID</Label>
              <Input
                id="unique-id"
                value={uniqueId}
                readOnly
                className="bg-muted dark:bg-gray-700 dark:text-white"
              />
              <p className="text-xs text-muted-foreground">This is your unique application ID for reference.</p>
            </div>
          </div>
        );
      
      case STEPS.DOCUMENTS:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="cv-file">Upload CV/Resume (PDF or DOCX)</Label>
              <Input
                id="cv-file"
                type="file"
                accept=".pdf,.docx"
                onChange={handleCvUpload}
              />
              {cvFile && (
                <p className="text-sm text-muted-foreground">
                  Selected: {cvFile.name} ({Math.round(cvFile.size / 1024)} KB)
                </p>
              )}
              {!cvFile && (
                <p className="text-sm text-muted-foreground">
                  Optional, but recommended for better chances.
                </p>
              )}
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch
                  checked={useCoverLetterFile}
                  onCheckedChange={setUseCoverLetterFile}
                  id="cover-letter-switch"
                />
                <Label htmlFor="cover-letter-switch">Upload cover letter as file</Label>
              </div>
              
              {useCoverLetterFile ? (
                <div className="space-y-2">
                  <Label htmlFor="cover-letter-file">Upload Cover Letter (PDF or DOCX)</Label>
                  <Input
                    id="cover-letter-file"
                    type="file"
                    accept=".pdf,.docx,.txt"
                    onChange={handleCoverLetterUpload}
                  />
                  {coverLetterFile && (
                    <p className="text-sm text-muted-foreground">
                      Selected: {coverLetterFile.name} ({Math.round(coverLetterFile.size / 1024)} KB)
                    </p>
                  )}
                </div>
              ) : (
                <div className="space-y-2">
                  <Label htmlFor="cover-letter-text">Cover Letter</Label>
                  <textarea
                    id="cover-letter-text"
                    className="flex min-h-[160px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Write your cover letter here..."
                    value={coverLetterText}
                    onChange={(e) => setCoverLetterText(e.target.value)}
                  />
                </div>
              )}
            </div>
          </div>
        );
      
      case STEPS.PERSONALITY:
        const currentQuestion = questions[currentQuestionIndex];
        const currentAnswer = personalityAnswers.find(a => a.questionIndex === currentQuestionIndex);
        
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Personality Assessment</h3>
                <span className="text-sm text-muted-foreground">
                  {currentQuestionIndex + 1} of {questions.length}
                </span>
              </div>
              <Progress value={((currentQuestionIndex + 1) / questions.length) * 100} className="h-2" />
            </div>
            
            <div className="space-y-4 p-6 border rounded-lg">
              <h4 className="font-medium text-lg mb-4">
                {currentQuestion.question}
              </h4>
              
              <div className="space-y-3">
                {currentQuestion.options.map((option, optionIndex) => (
                  <label 
                    key={optionIndex}
                    className="flex items-start space-x-3 cursor-pointer p-3 rounded-lg border hover:bg-muted transition-colors"
                  >
                    <input
                      type="radio"
                      name={`question-${currentQuestionIndex}`}
                      value={optionIndex}
                      checked={currentAnswer?.selectedOption === optionIndex}
                      onChange={() => handlePersonalityAnswer(optionIndex)}
                      className="mt-1"
                    />
                    <span className="text-sm leading-relaxed">{option.text}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <div className="flex justify-between">
              <Button 
                variant="outline" 
                onClick={handlePersonalityBack}
                disabled={currentQuestionIndex === 0}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous
              </Button>
              
              {currentQuestionIndex < questions.length - 1 ? (
                <Button 
                  onClick={handlePersonalityNext}
                  disabled={!currentAnswer}
                >
                  Next
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button 
                  onClick={handlePersonalityNext}
                  disabled={!currentAnswer}
                  className="bg-green-600 hover:bg-green-700"
                >
                  Complete Assessment
                  <CheckSquare className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>
            
            {personalityCompleted && (
              <div className="bg-green-50 dark:bg-green-950/30 text-green-800 dark:text-green-300 p-4 rounded-md">
                <p className="text-sm font-medium">
                  ✓ Assessment completed! You can proceed to the next step.
                </p>
              </div>
            )}
          </div>
        );
      
      case STEPS.VIDEO:
        return (
          <div className="space-y-6">
            <p className="text-sm">
              Please record a video introduction (required). Speak in English and cover the following:
            </p>
            <ul className="list-disc pl-5 text-sm space-y-1 text-muted-foreground">
              <li>Introduce yourself</li>
              <li>Talk about your interests and hobbies</li>
              <li>How you got into tech</li>
              <li>Your education or skills</li>
              <li>Why you chose TaaS</li>
              <li>Your relevant experience</li>
            </ul>
            
            <div className="relative w-full aspect-video bg-slate-100 dark:bg-slate-800 overflow-hidden rounded-lg">
              {!previewUrl ? (
                <video 
                  ref={videoRef} 
                  autoPlay 
                  muted 
                  playsInline
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="relative w-full h-full">
                  {videoLoadError ? (
                    <div className="flex items-center justify-center h-full bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4">
                      <div className="text-center">
                        <p className="font-medium mb-2">Video Error</p>
                        <p className="text-sm">{videoLoadError}</p>
                        <Button 
                          onClick={() => {
                            setPreviewUrl(null);
                            setVideoData(null);
                            setVideoLoadError(null);
                          }}
                          variant="outline"
                          size="sm"
                          className="mt-3"
                        >
                          Try Again
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <video 
                      ref={previewVideoRef}
                      playsInline
                      className="w-full h-full object-cover cursor-pointer"
                      controls
                      onClick={handlePreviewClick}
                    />
                  )}
                </div>
              )}
              
              {!recording && !previewUrl && (
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <p className="text-center text-gray-500 dark:text-gray-400 mb-4">
                    Click record to start
                  </p>
                </div>
              )}
              
              {recording && (
                <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full flex items-center space-x-2">
                  <span className={`h-3 w-3 rounded-full bg-white ${!paused ? 'animate-pulse' : ''}`}></span>
                  <span>{formatTime(elapsedTime)} / {formatTime(MAX_RECORDING_TIME)}</span>
                </div>
              )}
            </div>
            
            <div className="flex justify-center space-x-2">
              {!recording && !previewUrl && (
                <Button onClick={startRecording} className="bg-red-500 hover:bg-red-600">
                  <span className="w-4 h-4 mr-2 inline-block rounded-full bg-white"></span>
                  Record
                </Button>
              )}
              
              {recording && !paused && (
                <>
                  <Button onClick={pauseRecording} variant="outline">
                    <Pause className="w-4 h-4 mr-2" />
                    Pause
                  </Button>
                  <Button onClick={stopRecording} variant="secondary">
                    <CircleStop className="w-4 h-4 mr-2" />
                    Stop
                  </Button>
                </>
              )}
              
              {recording && paused && (
                <>
                  <Button onClick={resumeRecording} variant="outline">
                    <Play className="w-4 h-4 mr-2" />
                    Resume
                  </Button>
                  <Button onClick={stopRecording} variant="secondary">
                    <CircleStop className="w-4 h-4 mr-2" />
                    Stop
                  </Button>
                </>
              )}
              
              {previewUrl && !videoUrl && !videoLoadError && (
                <>
                  <Button onClick={() => {
                    setPreviewUrl(null);
                    setVideoData(null);
                    setVideoLoadError(null);
                  }} variant="outline">
                    Record Again
                  </Button>
                  <Button 
                    onClick={uploadVideo} 
                    disabled={uploading}
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    {uploading ? "Uploading..." : "Save Video"}
                  </Button>
                </>
              )}
            </div>
            
            {videoUrl && (
              <div className="space-y-2">
                <Label htmlFor="video-url">Video URL</Label>
                <Input
                  id="video-url"
                  value={videoUrl}
                  readOnly
                  className="bg-muted"
                />
                <p className="text-xs text-green-600 dark:text-green-400">
                  ✓ Video uploaded successfully
                </p>
                
                <div className="space-y-2">
                  <Label>Video Preview</Label>
                  <video 
                    src={videoUrl} 
                    controls 
                    className="w-full h-auto rounded-md"
                  />
                  <Button 
                    onClick={() => {
                      setPreviewUrl(null);
                      setVideoData(null);
                      setVideoUrl("");
                      setVideoLoadError(null);
                    }} 
                    variant="outline"
                    size="sm"
                  >
                    Record New Video
                  </Button>
                </div>
              </div>
            )}
          </div>
        );
        
      case STEPS.SUBMIT:
        // Don't show personality results to user, just show basic completion status
        return (
          <div className="space-y-6">
            <div className="rounded-md border p-4">
              <h3 className="font-medium mb-2">Application Summary</h3>
              <dl className="space-y-2">
                <div className="flex justify-between">
                  <dt className="font-medium">Name:</dt>
                  <dd>{candidateName}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="font-medium">Email:</dt>
                  <dd>{email}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="font-medium">Phone:</dt>
                  <dd>{phone}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="font-medium">Position:</dt>
                  <dd>{jobTitle}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="font-medium">Application ID:</dt>
                  <dd>{uniqueId}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="font-medium">CV:</dt>
                  <dd>{cvFile ? cvFile.name : "Not provided"}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="font-medium">Cover Letter:</dt>
                  <dd>
                    {useCoverLetterFile 
                      ? (coverLetterFile ? coverLetterFile.name : "Not provided")
                      : (coverLetterText ? "Provided as text" : "Not provided")
                    }
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="font-medium">Personality Assessment:</dt>
                  <dd>{personalityCompleted ? "✓ Completed" : "Not completed"}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="font-medium">Video:</dt>
                  <dd>{videoUrl ? "✓ Provided" : "Not provided"}</dd>
                </div>
              </dl>
            </div>
            
            <div className="bg-amber-50 dark:bg-amber-950/30 text-amber-800 dark:text-amber-300 p-4 rounded-md">
              <p className="text-sm">
                <strong>⚠️ Warning:</strong> Once submitted, you will not be able to edit your application. 
                Please review all information carefully before proceeding.
              </p>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };
  
  // Step icons for the progress indicator - restore PERSONALITY
  const stepIcons = {
    [STEPS.NAME]: <User />,
    [STEPS.DOCUMENTS]: <FileText />,
    [STEPS.PERSONALITY]: <CheckSquare />,
    [STEPS.VIDEO]: <Video />,
    [STEPS.SUBMIT]: <Send />,
  };
  
  // Step titles for the progress indicator - restore PERSONALITY
  const stepTitles = {
    [STEPS.NAME]: "Personal Info",
    [STEPS.DOCUMENTS]: "Documents",
    [STEPS.PERSONALITY]: "Assessment",
    [STEPS.VIDEO]: "Video",
    [STEPS.SUBMIT]: "Submit",
  };

  // If Safari is detected, show warning modal
  if (showSafariWarning) {
    return (
      <div className="min-h-screen pb-16">
        <Navigation />
        
        <Dialog open={showSafariWarning} onOpenChange={() => {}}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-xl text-amber-600">
                <AlertTriangle className="h-6 w-6" />
                Browser Not Supported
              </DialogTitle>
              <DialogDescription className="text-base">
                Our career application system requires advanced video recording features that work best with Chrome-based browsers.
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="bg-amber-50 dark:bg-amber-950/30 text-amber-800 dark:text-amber-300 p-4 rounded-md">
                <p className="text-sm font-medium mb-2">
                  ⚠️ Safari Detected
                </p>
                <p className="text-sm">
                  To ensure the best experience and avoid technical issues during video recording, 
                  please use a Chrome-based browser such as:
                </p>
              </div>
              
              <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                <li>Google Chrome</li>
                <li>Microsoft Edge</li>
                <li>Brave Browser</li>
                <li>Opera</li>
              </ul>
              
              <div className="bg-blue-50 dark:bg-blue-950/30 text-blue-800 dark:text-blue-300 p-4 rounded-md">
                <p className="text-sm">
                  <strong>Why this is needed:</strong> Video recording and upload functionality 
                  requires specific web APIs that work more reliably in Chrome-based browsers.
                </p>
              </div>
            </div>
            
            <DialogFooter className="flex-col gap-2">
              <Button 
                onClick={() => navigate('/careers')}
                className="w-full"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Careers Page
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setShowSafariWarning(false)}
                className="w-full text-sm"
              >
                Continue Anyway (Not Recommended)
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-16">
      <Navigation />
      
      {/* Use Drawer for mobile and Dialog for desktop */}
      {isMobile ? (
        <Drawer open={showIntroModal} onOpenChange={setShowIntroModal}>
          <DrawerContent>
            <DrawerHeader className="text-center">
              <DrawerTitle className="text-xl">📝 Application Process – TaaS</DrawerTitle>
              <DrawerDescription>
                Please review the following information before proceeding.
              </DrawerDescription>
            </DrawerHeader>
            <div className="p-4 overflow-y-auto max-h-[70vh]">
              {renderIntroContent()}
            </div>
            <DrawerFooter>
              {renderFooterContent()}
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      ) : (
        <Dialog open={showIntroModal} onOpenChange={setShowIntroModal}>
          <DialogContent className="sm:max-w-[600px] max-h-[85vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl">📝 Application Process – TaaS</DialogTitle>
              <DialogDescription>
                Please review the following information before proceeding.
              </DialogDescription>
            </DialogHeader>
            
            {renderIntroContent()}
            
            <DialogFooter>
              {renderFooterContent()}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
      
      {/* Main application container */}
      <div className="container mx-auto px-4 pt-20 max-w-3xl">
        {step > STEPS.INTRO && (
          <>
            {/* Progress indicator */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                {Object.entries(stepTitles).map(([stepKey, title]) => {
                  const stepNumber = parseInt(stepKey);
                  // Skip intro step
                  if (stepNumber === STEPS.INTRO) return null;
                  
                  // Determine status: completed, current, or upcoming
                  const isCompleted = step > stepNumber;
                  const isCurrent = step === stepNumber;
                  
                  return (
                    <div 
                      key={stepKey}
                      className={`flex flex-col items-center ${isCurrent ? 'text-primary' : isCompleted ? 'text-green-500' : 'text-muted-foreground'}`}
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        isCurrent 
                          ? 'bg-primary/20 border-2 border-primary' 
                          : isCompleted 
                            ? 'bg-green-100 dark:bg-green-900' 
                            : 'bg-muted'
                      }`}>
                        {stepIcons[stepNumber as keyof typeof stepIcons]}
                      </div>
                      <span className="text-xs mt-1 hidden sm:block">{title}</span>
                    </div>
                  );
                })}
              </div>
              <Progress value={progress} className="h-2" />
            </div>
            
            {/* Application card */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>{stepTitles[step as keyof typeof stepTitles]}</CardTitle>
                <CardDescription>
                  {step === STEPS.NAME && "Enter your personal information"}
                  {step === STEPS.DOCUMENTS && "Upload your CV and cover letter (optional)"}
                  {step === STEPS.PERSONALITY && "Complete the personality assessment"}
                  {step === STEPS.VIDEO && "Record a video introduction"}
                  {step === STEPS.SUBMIT && "Review and submit your application"}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                {renderStepContent()}
              </CardContent>
              
              <CardFooter className="flex justify-between">
                <Button 
                  variant="outline" 
                  onClick={handlePreviousStep}
                  disabled={step === STEPS.NAME}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
                
                {step < STEPS.SUBMIT ? (
                  <Button onClick={handleNextStep}>
                    Next
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button 
                    onClick={handleSubmit} 
                    disabled={isSubmitting}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Application"}
                    <Send className="ml-2 h-4 w-4" />
                  </Button>
                )}
              </CardFooter>
            </Card>
            
            {/* Save progress button */}
            {consentSaveProgress && step > STEPS.INTRO && (
              <div className="mt-4 flex justify-center">
                <Button 
                  variant="ghost" 
                  onClick={() => {
                    toast.success("Progress saved", {
                      description: "You can resume your application later from this device."
                    });
                  }}
                >
                  <Save className="mr-2 h-4 w-4" />
                  Save Progress
                </Button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Full-screen preview dialog */}
      <Dialog open={showPreviewDialog} onOpenChange={setShowPreviewDialog}>
        <DialogContent className="max-w-3xl w-full">
          <DialogHeader>
            <DialogTitle>Video Preview</DialogTitle>
          </DialogHeader>
          <div className="relative aspect-video w-full">
            {previewUrl && (
              <video 
                src={previewUrl}
                controls
                autoPlay
                className="w-full h-full rounded-md"
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CareerApplyPage;
