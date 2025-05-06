import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Check, File, Users, Rocket, HelpCircle, Play, Star } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { BetaSignupDialog } from "@/components/BetaSignupDialog";
import { AppDetailsDialog } from "@/components/AppDetailsDialog";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useIsMobile } from "@/hooks/use-mobile";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { WorkflowSection } from "@/components/WorkflowSection";
import { TeamSection } from "@/components/TeamSection";
import { Link } from "react-router-dom";

type CrmFeature = {
  title: string;
  tooltip: string;
  content: React.ReactNode;
};
const crmFeatures: CrmFeature[] = [{
  title: "Absurdly simple to setup",
  tooltip: "Start with a template, edit like a spreadsheet, and customize what you want to track. With folk, getting started is fast!",
  content: <div className="space-y-2">
        <div className="p-4 bg-gray-50 rounded-lg w-fit">
          <div className="flex items-center gap-2 p-2 border rounded-md bg-white">
            <Check className="h-4 w-4" />
            <span className="font-medium">Sales</span>
          </div>
          <div className="flex items-center gap-2 p-2 mt-2 border rounded-md bg-white opacity-50">
            <span className="font-medium">Partnerships</span>
          </div>
        </div>
      </div>
}, {
  title: "A single source of truth",
  tooltip: "Connect and sync all your favorite tools to keep your data consistent across your entire stack",
  content: <div className="grid grid-cols-4 gap-2">
        {[...Array(12)].map((_, i) => <div key={i} className="aspect-square border rounded-md p-1 flex items-center justify-center bg-gray-50">
            {i < 11 && <div className="w-6 h-6 bg-gray-200 rounded" />}
            {i === 11 && <span className="text-sm text-gray-500">+99</span>}
          </div>)}
      </div>
}, {
  title: "Built for team-selling",
  tooltip: "Collaborate seamlessly with your team through customizable roles and permissions",
  content: <div className="relative">
        <div className="w-full h-32 bg-gray-50 rounded-lg flex items-center justify-center">
          <div className="flex gap-4">
            <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">Admin</span>
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">Editor</span>
            <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm">Viewer</span>
          </div>
        </div>
      </div>
}, {
  title: "Surprisingly proactive",
  tooltip: "Smart reminders and notifications keep you on top of your follow-ups and tasks",
  content: <div className="p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center gap-2 p-3 border rounded-md bg-white">
          <div className="w-5 h-5 bg-gray-200 rounded" />
          <span className="font-medium">Follow-up with Walt</span>
        </div>
      </div>
}];
const builtProjects = [{
  title: "AI Interior Designing",
  description: "Transform spaces with AI-powered interior design solutions. Create stunning interior designs with the help of artificial intelligence.",
  image: "https://i.ibb.co/23gCWK1z/Screenshot-2025-04-27-at-2-38-50-AM.png",
  link: "https://interior.techrealm.pk"
}, {
  title: "AI Meals & Nutrition App",
  description: "Personalized meal plans and nutrition tracking using AI. Get customized meal recommendations and track your nutrition goals effortlessly.",
  image: "https://i.ibb.co/qLFnQpRv/Screenshot-2025-04-27-at-2-39-21-AM.png",
  link: "https://meals.techrealm.pk/"
}, {
  title: "AI 3D Model Creator",
  description: "Create stunning 3D models with AI assistance. Transform your ideas into professional 3D models with our innovative AI technology.",
  image: "https://i.ibb.co/kb5HxFc/Screenshot-2025-04-27-at-2-40-43-AM.png",
  link: "https://3dmodel.techrealm.pk/"
}, {
  title: "AI Fashion Design",
  description: "Design trendy fashion pieces with AI technology. Create unique and stylish fashion designs with the power of artificial intelligence.",
  image: "https://i.ibb.co/qFgT88Kx/Screenshot-2025-04-27-at-2-41-14-AM.png",
  link: "https://fashion.techrealm.pk/"
}, {
  title: "AI Document Creator",
  description: "Generate professional documents using AI. Create polished documents quickly and efficiently with AI-powered assistance.",
  image: "https://i.ibb.co/Pz9dqSsP/Screenshot-2025-04-27-at-2-41-50-AM.png",
  link: "https://documents.techrealm.pk/"
}, {
  title: "AI Presentation Creator",
  description: "Create engaging presentations with AI assistance. Build impressive presentations effortlessly using our AI-powered tools.",
  image: "https://i.ibb.co/5hSZZbhW/Screenshot-2025-04-27-at-2-42-19-AM.png",
  link: "https://presentations.techrealm.pk/"
}];
const features = [{
  title: "Workspace Overview",
  description: "TaaS's unified workspace combines AI-driven planning, real-time team collaboration, and end-to-end project tracking. From your initial prompt through deployment, every step—mockups, timelines, cost estimates, and live updates—is managed in one intuitive interface.",
  image: "https://i.ibb.co/tMdpVPWK/FB199-AD2-7-E30-4-A94-83-D7-911-C2-ACC2106-export.png"
}, {
  title: "Task Management",
  description: "Leverage AI to automatically assign, prioritize, and balance tasks across your team. Drag-and-drop cards or let the system reallocate work based on skills and availability—ensuring nothing falls through the cracks.",
  image: "https://i.ibb.co/FkqRv7Tj/5501317-E-FAF0-4663-9067-931-FB861-C83-C-export.png"
}, {
  title: "Calendar Integration",
  description: "Our smart calendar syncs milestones, deadlines, and on-demand meetings with your team and AI PM Assistant. Automated reminders and scheduling suggestions keep everyone aligned and on schedule.",
  image: "https://i.ibb.co/m5K3DDYJ/2400-C394-8946-4-E73-9-BF5-0-A2-E449-C336-D-export.png"
}, {
  title: "Quick Actions & Notifications",
  description: "Stay in control with contextual quick-action buttons—approve mockups, request changes, or launch sprints in a single click. Real-time alerts notify you of completed tasks, meeting invites, and critical updates.",
  image: "https://i.ibb.co/6cnKgRyr/B619-A99-C-3005-47-E7-B71-E-5-C36-ECFE1-F4-D-export.png"
}, {
  title: "Hire a Developer",
  description: "Spot top talent within your project's workspace and bring them on board instantly. Click to view a developer's profile, see their rate for your project, hire them for this build—or engage them for future work—all in one place.",
  image: "https://i.ibb.co/VrWt8Bt/86-F5-D48-D-AD4-D-4-F38-BB84-DE178-F2755-D2-export.png"
}, {
  title: "Task Details",
  description: "Click any task to reveal AI-generated specs, design notes, code snippets, and a full activity log. Edit requirements on the fly, leave feedback, and watch the AI update assignments and timelines accordingly.",
  image: "https://i.ibb.co/DHZZVMQ7/C6-B53-D20-E004-4-DF7-9230-DC2-D4-DA3-E76-B-export.png"
}];
const steps = [{
  title: "Submit Your Idea",
  description: "Share your vision and requirements"
}, {
  title: "Select Template",
  description: "Choose from our pre-built solutions"
}, {
  title: "Build Your App",
  description: "Watch your idea come to life"
}, {
  title: "Market Your App",
  description: "Use our AI-Marketing services",
  link: "/ai-marketing"
}];
const plans = [{
  name: "Starter",
  price: "$99",
  features: ["Basic AI assistance", "3 team members", "5 pages", "Basic support"]
}, {
  name: "Pro",
  price: "$199",
  features: ["Advanced AI tools", "5 team members", "10 pages", "Priority support"]
}, {
  name: "Enterprise",
  price: "Custom",
  features: ["Full AI suite", "Unlimited team", "Unlimited pages", "24/7 support"]
}];

// Brand logos for the moving carousel
const brandLogos = ["https://digitalsoftwaremarkett.com/wp-content/uploads/2025/05/Logos-01-4.avif", "https://digitalsoftwaremarkett.com/wp-content/uploads/2025/05/Logos-02-4.avif", "https://digitalsoftwaremarkett.com/wp-content/uploads/2025/05/Logos-03-3.avif", "https://digitalsoftwaremarkett.com/wp-content/uploads/2025/05/Logos-04-4.avif", "https://digitalsoftwaremarkett.com/wp-content/uploads/2025/05/Logos-05-3.avif", "https://digitalsoftwaremarkett.com/wp-content/uploads/2025/05/Logos-06-3.avif", "https://digitalsoftwaremarkett.com/wp-content/uploads/2025/05/Logos-07-4.avif", "https://digitalsoftwaremarkett.com/wp-content/uploads/2025/05/Logos-08-2.avif", "https://digitalsoftwaremarkett.com/wp-content/uploads/2025/05/Logos-09-1.avif", "https://digitalsoftwaremarkett.com/wp-content/uploads/2025/05/Logos-10-1.avif", "https://digitalsoftwaremarkett.com/wp-content/uploads/2025/05/Logos-11-1.avif", "https://digitalsoftwaremarkett.com/wp-content/uploads/2025/05/Logos-12-1.avif", "https://digitalsoftwaremarkett.com/wp-content/uploads/2025/05/Logos-13-1.avif", "https://digitalsoftwaremarkett.com/wp-content/uploads/2025/05/Logos-14-1.avif", "https://digitalsoftwaremarkett.com/wp-content/uploads/2025/05/Logos-15-1.avif", "https://digitalsoftwaremarkett.com/wp-content/uploads/2025/05/Logos-16-1.avif", "https://digitalsoftwaremarkett.com/wp-content/uploads/2025/05/Logos-17-1.avif", "https://digitalsoftwaremarkett.com/wp-content/uploads/2025/05/Logos-18-1.avif", "https://digitalsoftwaremarkett.com/wp-content/uploads/2025/05/Logos-20-1.avif", "https://digitalsoftwaremarkett.com/wp-content/uploads/2025/05/Logos-21-1.avif", "https://digitalsoftwaremarkett.com/wp-content/uploads/2025/05/Logos-22-1.avif", "https://digitalsoftwaremarkett.com/wp-content/uploads/2025/05/Logos-23-1.avif", "https://digitalsoftwaremarkett.com/wp-content/uploads/2025/05/Logos-24-1.avif", "https://digitalsoftwaremarkett.com/wp-content/uploads/2025/05/Logos-25-1.avif", "https://digitalsoftwaremarkett.com/wp-content/uploads/2025/05/Logos-26-1.avif", "https://digitalsoftwaremarkett.com/wp-content/uploads/2025/05/Logos-27-1.avif", "https://digitalsoftwaremarkett.com/wp-content/uploads/2025/05/Logos-28-1.avif", "https://digitalsoftwaremarkett.com/wp-content/uploads/2025/05/Logos-29-1.avif", "https://digitalsoftwaremarkett.com/wp-content/uploads/2025/05/Logos-30-1.avif"];
export function CrmFeatures() {
  const isMobile = useIsMobile();
  
  return <section className="container py-20">
      <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-16">
        Finally, an AI that works <span className="text-primary">for you</span>
      </h2>
      
      {isMobile ? (
        <Carousel className="w-full max-w-sm mx-auto">
          <CarouselContent>
            {crmFeatures.map((feature, index) => (
              <CarouselItem key={index}>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="space-y-4 p-6 border rounded-lg cursor-help transition-all hover:shadow-lg">
                        {feature.content}
                        <h3 className="text-2xl font-semibold">{feature.title}</h3>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent side="bottom" className="max-w-[200px] text-center">
                      <p>{feature.tooltip}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {crmFeatures.map((feature, index) => (
            <TooltipProvider key={index}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="space-y-4 p-6 border rounded-lg cursor-help transition-all hover:shadow-lg">
                    {feature.content}
                    <h3 className="text-2xl font-semibold">{feature.title}</h3>
                  </div>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="max-w-[200px] text-center">
                  <p>{feature.tooltip}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
      )}
    </section>;
}
export default function Index() {
  const [showBetaDialog, setShowBetaDialog] = useState(false);
  const [showAllIndustries, setShowAllIndustries] = useState(false);
  const [appIdea, setAppIdea] = useState("");
  const [selectedApp, setSelectedApp] = useState<typeof builtProjects[0] | null>(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [prompt, setPrompt] = useState("");
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [showTestimonialVideo, setShowTestimonialVideo] = useState(false);
  const [videoRef, setVideoRef] = useState<HTMLVideoElement | null>(null);
  const isMobile = useIsMobile();
  React.useEffect(() => {
    let loadedCount = 0;
    const totalImages = builtProjects.length + features.length;
    const preloadImage = (src: string) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = () => {
          loadedCount++;
          setLoadingProgress(loadedCount / totalImages * 100);
          resolve(true);
        };
        img.onerror = reject;
      });
    };
    const loadAllImages = async () => {
      try {
        const projectImages = builtProjects.map(project => preloadImage(project.image));
        const featureImages = features.map(feature => preloadImage(feature.image));
        await Promise.all([...projectImages, ...featureImages]);
        setImagesLoaded(true);
      } catch (error) {
        console.error('Error loading images:', error);
        setImagesLoaded(true); // Show content even if some images fail to load
      }
    };
    loadAllImages();

    // Safety net: some CDN images can hang without ever firing load/error,
    // which would trap visitors on the preloader forever. Reveal the page
    // regardless after a short grace period so the site is never stuck.
    const failsafe = window.setTimeout(() => setImagesLoaded(true), 4000);
    return () => window.clearTimeout(failsafe);
  }, []);

  // Preload testimonial video
  React.useEffect(() => {
    const video = document.createElement('video');
    video.src = "https://res.cloudinary.com/dg4qodgmz/video/upload/v1749322468/VN20250607_002652-vmake_dtrjab.mp4";
    video.preload = "metadata";
    video.load();
    setVideoRef(video);
  }, []);

  // Store the user's prompt in localStorage when it changes
  React.useEffect(() => {
    if (prompt) {
      localStorage.setItem("userPrompt", prompt);
    }
  }, [prompt]);
  const handleStartBuild = () => {
    if (prompt.trim()) {
      setShowBetaDialog(true);
    }
  };
  const handleTestimonialVideoPlay = () => {
    setShowTestimonialVideo(true);
    // Small delay to ensure video element is rendered before playing
    setTimeout(() => {
      const videoElement = document.querySelector('.testimonial-video') as HTMLVideoElement;
      if (videoElement) {
        videoElement.play();
      }
    }, 100);
  };
  if (!imagesLoaded) {
    return <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="w-full max-w-md space-y-4">
          <Progress value={loadingProgress} className="w-full" />
          <p className="text-center text-muted-foreground">Loading content... {Math.round(loadingProgress)}%</p>
        </div>
      </div>;
  }
  return <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section - Mobile Optimized */}
      <section className="min-h-screen flex flex-col px-4 sm:px-6 pt-16 sm:pt-20">
        <div className="container flex-1 flex flex-col lg:flex-row items-center justify-center gap-6 sm:gap-12 py-4 sm:py-8">
          <div className="flex-1 text-center lg:text-left space-y-4 sm:space-y-8">
            <div className="space-y-2">
              <h1 className="text-2xl sm:text-4xl lg:text-[64px] font-normal leading-tight sm:leading-none">
                Team as a Service
              </h1>
              <p className="text-base sm:text-2xl lg:text-[24px] font-normal leading-tight text-muted-foreground">
                On-demand AI + human experts for marketing, development & growth.
              </p>
            </div>

            {/* Prompt Bar - Mobile First */}
            <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
              <Input type="text" placeholder="Enter your idea or prompt..." value={prompt} onChange={e => setPrompt(e.target.value)} className="h-12 sm:h-14 text-base sm:text-lg w-full" />
              <Button onClick={handleStartBuild} className="h-12 sm:h-14 text-base sm:text-lg rounded-full bg-black text-white hover:bg-black/90 flex items-center justify-center min-h-[44px] w-full sm:w-auto" size="lg">
                Try for free
              </Button>
            </div>

            <div className="flex justify-center lg:justify-start">
              <Button variant="outline" onClick={() => setShowBetaDialog(true)} className="h-12 sm:h-14 text-base sm:text-lg rounded-full border-2 flex items-center justify-center min-h-[44px] w-full sm:w-auto" size="lg">
                Get a demo
              </Button>
            </div>

            {/* Three Step Process - Above video on mobile */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 mt-6 sm:mt-8 lg:hidden">
              <div className="flex flex-col items-center text-center space-y-1 sm:space-y-2">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-full flex items-center justify-center min-h-[44px] min-w-[44px]">
                  <File className="w-4 h-4 sm:w-6 sm:h-6 text-primary" />
                </div>
                <span className="text-xs sm:text-sm font-medium">You share</span>
              </div>
              <div className="flex flex-col items-center text-center space-y-1 sm:space-y-2">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-full flex items-center justify-center min-h-[44px] min-w-[44px]">
                  <Users className="w-4 h-4 sm:w-6 sm:h-6 text-primary" />
                </div>
                <span className="text-xs sm:text-sm font-medium">We match</span>
              </div>
              <div className="flex flex-col items-center text-center space-y-1 sm:space-y-2">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-full flex items-center justify-center min-h-[44px] min-w-[44px]">
                  <Rocket className="w-4 h-4 sm:w-6 sm:h-6 text-primary" />
                </div>
                <span className="text-xs sm:text-sm font-medium">Results delivered</span>
              </div>
            </div>
          </div>

          <div className="flex-1">
            {/* Video Section - Compressed for mobile */}
            <div className="space-y-3 sm:space-y-6">
              {/* Watch How It Works Label - Smaller on mobile */}
              <div className="flex justify-center">
                <div className="bg-black text-white px-3 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium">
                  WATCH HOW IT WORKS
                </div>
              </div>

              {/* Video/GIF Section */}
              <div className="relative rounded-lg overflow-hidden shadow-xl">
                {!showVideo ? (/* GIF with Play Button Overlay */
              <div className="relative cursor-pointer" onClick={() => setShowVideo(true)}>
                    <img src="https://res.cloudinary.com/dg4qodgmz/image/upload/v1749059432/WhatsAppVideo2025-06-03at19.05.19-ezgif.com-video-to-gif-converter_vxmpou.gif" alt="Team as a Service Demo" className="w-full aspect-[4/3] sm:aspect-video object-cover" />
                    
                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg">
                        <Play className="w-8 h-8 sm:w-10 sm:h-10 text-black ml-1" fill="currentColor" />
                      </div>
                    </div>
                    
                    {/* Meet Sophie Label */}
                    <div className="absolute top-2 left-2 sm:top-4 sm:left-4 bg-black/70 text-white px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm">
                      Meet Sophie, our Head of Operations
                    </div>
                  </div>) : (/* Actual Video Player */
              <video className="w-full aspect-[4/3] sm:aspect-video object-cover" controls autoPlay preload="metadata">
                    <source src="https://res.cloudinary.com/dg4qodgmz/video/upload/v1748962455/WhatsApp_Video_2025-06-03_at_19.05.19_udcd7v.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>)}
              </div>

              {/* Three Step Process - Desktop only */}
              <div className="hidden lg:grid grid-cols-3 gap-4 mt-8">
                <div className="flex flex-col items-center text-center space-y-2">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <File className="w-6 h-6 text-primary" />
                  </div>
                  <span className="text-sm font-medium">You share</span>
                </div>
                <div className="flex flex-col items-center text-center space-y-2">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <span className="text-sm font-medium">We match</span>
                </div>
                <div className="flex flex-col items-center text-center space-y-2">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Rocket className="w-6 h-6 text-primary" />
                  </div>
                  <span className="text-sm font-medium">Results delivered</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Brand Experience - Compressed for mobile */}
        <div className="pb-4 sm:pb-8 overflow-hidden">
          <div className="container mb-3 sm:mb-6">
            <div className="flex items-center justify-center gap-2">
              <h3 className="text-base sm:text-xl font-semibold text-center text-muted-foreground">Trusted by leading brands</h3>
              <Dialog open={showDisclaimer} onOpenChange={setShowDisclaimer}>
                <DialogTrigger asChild>
                  <button className="flex items-center gap-1 p-1 hover:bg-gray-100 rounded-full transition-colors">
                    <HelpCircle className="h-4 w-4 text-muted-foreground" />
                  </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      <HelpCircle className="h-5 w-5 text-orange-500" />
                      Important Notice
                    </DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      These logos do not represent direct partnerships with our company. Instead, we work through Digital Software Market—a Microsoft and major vendor partner that maintains direct relationships with these organizations—and have received authorization from Digital Software Market to display their logos.
                    </p>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          
          {/* Auto-scrolling logo carousel - Smaller on mobile */}
          <div className="relative">
            <div className="flex animate-scroll-left space-x-3 sm:space-x-6">
              {/* First set of logos */}
              {brandLogos.map((logo, index) => <div key={index} className="flex-shrink-0 w-16 h-8 sm:w-24 sm:h-12 flex items-center justify-center bg-white rounded-lg shadow-sm">
                  <img src={logo} alt={`Brand ${index + 1}`} className="max-w-full max-h-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300" loading="lazy" />
                </div>)}
              {/* Duplicate set for seamless loop */}
              {brandLogos.map((logo, index) => <div key={`duplicate-${index}`} className="flex-shrink-0 w-16 h-8 sm:w-24 sm:h-12 flex items-center justify-center bg-white rounded-lg shadow-sm">
                  <img src={logo} alt={`Brand ${index + 1} duplicate`} className="max-w-full max-h-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300" loading="lazy" />
                </div>)}
            </div>
          </div>
        </div>
      </section>

      <CrmFeatures />

      {/* Workflow Section */}
      <WorkflowSection />

      {/* Team Section */}
      <TeamSection />

      {/* What TaaS Has Built Section */}
      <section className="container py-20 border-t" id="industries">
        <h2 className="text-3xl font-bold text-center mb-12">What TaaS Has Built</h2>
        {isMobile ? <Carousel className="w-full max-w-xs mx-auto">
            <CarouselContent>
              {builtProjects.map((project, index) => <CarouselItem key={index}>
                  <Card className="overflow-hidden cursor-pointer" onClick={() => setSelectedApp(project)}>
                    <div className="aspect-video relative overflow-hidden rounded-t-lg">
                      <img src={project.image} alt={project.title} className="object-cover w-full h-full" />
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                      <p className="text-muted-foreground">{project.description}</p>
                    </CardContent>
                  </Card>
                </CarouselItem>)}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel> : <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {builtProjects.map((project, index) => <Card key={index} className="overflow-hidden transform hover:scale-105 transition-transform duration-200 cursor-pointer" onClick={() => setSelectedApp(project)}>
                <div className="aspect-video relative overflow-hidden rounded-t-lg">
                  <img src={project.image} alt={project.title} className="object-cover w-full h-full" />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                  <p className="text-muted-foreground">{project.description}</p>
                </CardContent>
              </Card>)}
          </div>}
      </section>

      {/* Testimonial Section - Moved here */}
      <section className="py-16 border-t bg-muted/30">
        <div className="container">
          {/* Section Heading */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Long-term partnerships is what we are always striving to build</h2>
          </div>

          <div className="flex flex-col lg:flex-row gap-12 items-center">
            {/* Video Section */}
            <div className="flex-1">
              <div className="relative">
                {/* Clutch Rating - Responsive and Dark Mode Fixed */}
                <div className="absolute top-2 right-2 sm:top-4 sm:right-4 z-10 bg-background border border-border rounded-lg shadow-lg p-2 sm:p-3 hidden sm:block">
                  <div className="flex items-center gap-1 sm:gap-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 sm:w-4 sm:h-4 fill-yellow-400 text-yellow-400" />)}
                    </div>
                    <span className="font-semibold text-xs sm:text-sm text-foreground">5.0</span>
                  </div>
                  
                </div>

                {/* Video Container */}
                <div className="relative rounded-lg overflow-hidden shadow-xl">
                  {!showTestimonialVideo ? (/* GIF Thumbnail with Play Button */
                <div className="relative cursor-pointer group" onClick={handleTestimonialVideoPlay}>
                      <img src="https://res.cloudinary.com/dg4qodgmz/image/upload/v1749324243/VN20250607-002652-vmake-unscreen_klhnog.gif" alt="Client testimonial preview" className="w-full aspect-video object-cover" />
                      
                      {/* Play Button Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/90 rounded-full flex items-center justify-center group-hover:bg-white transition-colors shadow-lg group-hover:scale-110 transition-transform">
                          <Play className="w-8 h-8 sm:w-10 sm:h-10 text-black ml-1" fill="currentColor" />
                        </div>
                      </div>

                      {/* Video Quality Indicator */}
                      <div className="absolute bottom-4 left-4 bg-black/70 text-white px-2 py-1 rounded-md text-xs">
                        HD Quality
                      </div>
                    </div>) : (/* Actual Video Player */
                <video className="w-full aspect-video object-cover testimonial-video" controls autoPlay preload="metadata" poster="https://res.cloudinary.com/dg4qodgmz/image/upload/v1749324243/VN20250607-002652-vmake-unscreen_klhnog.gif">
                      <source src="https://res.cloudinary.com/dg4qodgmz/video/upload/v1749322468/VN20250607_002652-vmake_dtrjab.mp4" type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>)}
                </div>
              </div>
            </div>

            {/* Testimonial Content */}
            <div className="flex-1 space-y-6">
              {/* Profile Section */}
              <div className="flex items-center gap-4">
                <img alt="Olha Metofor" className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-md" src="https://res.cloudinary.com/dg4qodgmz/image/upload/v1749327577/Screenshot_2025-06-08_at_1.19.24_AM_qsp1fe.png" />
                <div>
                  <h3 className="text-xl font-semibold">Natali
 Shevaniuk</h3>
                  <p className="text-muted-foreground">CEO of AI Stylist</p>
                </div>
              </div>

              {/* Testimonial Text */}
              <blockquote className="text-lg leading-relaxed">
                "Working with TaaS has been a game-changer for our business. Their AI-powered approach combined with expert human oversight delivered exceptional results that exceeded our expectations. The seamless collaboration and innovative solutions they provided transformed our project timeline and quality."
              </blockquote>

              {/* Social Media Icons */}
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 bg-blue-800 rounded-full flex items-center justify-center text-white hover:bg-blue-900 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 bg-pink-600 rounded-full flex items-center justify-center text-white hover:bg-pink-700 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.407-5.965 1.407-5.965s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.097.118.112.221.085.343-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.751-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24c6.624 0 11.99-5.367 11.99-11.987C24.007 5.367 18.641.001 12.017.001z" />
                  </svg>
                </a>
              </div>

              {/* View Case Study Button */}
              <Link to="/fashion-case-study">
                <Button className="bg-black text-white hover:bg-black/90 rounded-full px-8 py-3">
                  View case study
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    
      {/* Features Section */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          
          {/* Mobile Carousel */}
          <div className="md:hidden">
            <Carousel className="w-full max-w-sm mx-auto">
              <CarouselContent>
                {features.map((feature, index) => (
                  <CarouselItem key={index}>
                    <div className="space-y-6">
                      <div className="aspect-video">
                        <img 
                          src={feature.image} 
                          alt={feature.title} 
                          className="rounded-lg shadow-lg w-full h-full object-cover" 
                        />
                      </div>
                      <div className="space-y-4 text-center">
                        <h3 className="text-2xl font-semibold">{feature.title}</h3>
                        <p className="text-muted-foreground">{feature.description}</p>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>

          {/* Desktop Layout */}
          <div className="hidden md:block space-y-16">
            {features.map((feature, index) => (
              <div key={feature.title} className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 items-center`}>
                <div className="flex-1 space-y-4">
                  <h3 className="text-2xl font-semibold">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
                <div className="flex-1">
                  <img src={feature.image} alt={feature.title} className="rounded-lg shadow-lg w-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries We Serve */}
      <section className="container py-20 border-t" id="industries">
        <h2 className="text-3xl font-bold text-center mb-12">Industries We Serve</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {(showAllIndustries ? industries : industries.slice(0, 4)).map((industry, i) => <div key={i} className="glass p-6 space-y-4 animate-slide-up rounded-lg hover:shadow-lg transition-all" style={{
          animationDelay: `${i * 50}ms`
        }}>
              <div className="text-4xl">{industry.icon}</div>
              <h3 className="text-xl font-semibold">{industry.title}</h3>
              <p className="text-muted-foreground text-sm">{industry.description}</p>
            </div>)}
        </div>
        
        {industries.length > 4 && <div className="flex justify-center mt-8">
            <Button variant="outline" size="lg" onClick={() => setShowAllIndustries(!showAllIndustries)} className="rounded-full">
              {showAllIndustries ? 'Show Less' : 'View More Industries'}
            </Button>
          </div>}
      </section>

      {/* How It Works */}
      <section className="container py-20 border-t" id="features">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => <div key={i} className="glass p-6 animate-slide-up" style={{
          animationDelay: `${i * 100}ms`
        }}>
              <h3 className="text-xl font-semibold">{step.title}</h3>
              <p className="text-muted-foreground mb-2">{step.description}</p>
              {step.link && <Link to={step.link} className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  Learn more →
                </Link>}
            </div>)}
        </div>
      </section>

      {/* Features - Changed to What Others Can't Do */}
      <section className="container py-20 border-t">
        <h2 className="text-3xl font-bold text-center mb-12">What Others Can't Do</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
          <div className="flex items-center gap-2 animate-slide-up" style={{
          animationDelay: "0ms"
        }}>
            <Check className="h-5 w-5 text-primary" />
            <span>Instant AI + Human Team</span>
          </div>
          <div className="flex items-center gap-2 animate-slide-up" style={{
          animationDelay: "100ms"
        }}>
            <Check className="h-5 w-5 text-primary" />
            <span>End-to-End in One Workspace</span>
          </div>
          <div className="flex items-center gap-2 animate-slide-up" style={{
          animationDelay: "200ms"
        }}>
            <Check className="h-5 w-5 text-primary" />
            <span>On-Demand Expert Meetings</span>
          </div>
          <div className="flex items-center gap-2 animate-slide-up" style={{
          animationDelay: "300ms"
        }}>
            <Check className="h-5 w-5 text-primary" />
            <span>Hire Developers Permanently</span>
          </div>
          <div className="flex items-center gap-2 animate-slide-up" style={{
          animationDelay: "400ms"
        }}>
            <Check className="h-5 w-5 text-primary" />
            <span>Seamless Hosting & Bundling</span>
          </div>
          <div className="flex items-center gap-2 animate-slide-up" style={{
          animationDelay: "500ms"
        }}>
            <Check className="h-5 w-5 text-primary" />
            <span>Continuous AI-Driven Optimization</span>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="container py-20 border-t" id="pricing">
        <h2 className="text-3xl font-bold text-center mb-12">Simple Pricing</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, i) => <div key={i} className="glass p-6 space-y-4 animate-slide-up" style={{
          animationDelay: `${i * 100}ms`
        }}>
              <h3 className="text-xl font-semibold">{plan.name}</h3>
              <div className="text-3xl font-bold">{plan.price}</div>
              <ul className="space-y-2">
                {plan.features.map((feature, j) => <li key={j} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    <span className="text-sm">{feature}</span>
                  </li>)}
              </ul>
              <Button className="w-full">Choose {plan.name}</Button>
            </div>)}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 mt-20">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-muted-foreground">
              © 2024 TaaS - Team as a Service. All rights reserved.
            </div>
            <div className="flex gap-6 text-sm">
              <Link to="/ai-marketing" className="hover:text-primary">AI Marketing</Link>
              <Link to="/careers" className="hover:text-primary">Careers</Link>
              <Link to="/about" className="hover:text-primary">About</Link>
              <a href="#" className="hover:text-primary">Contact</a>
            </div>
          </div>
        </div>
      </footer>

      <BetaSignupDialog open={showBetaDialog} onOpenChange={setShowBetaDialog} />

      <AppDetailsDialog open={!!selectedApp} onOpenChange={open => !open && setSelectedApp(null)} app={selectedApp} />
    </div>;
}
const industries = [{
  title: "Retail Software Solutions",
  description: "Aalpha India, we deliver cutting edge technology solutions for online commerce industry. Our ecommerce solutions are built on latest technology",
  icon: "🛒"
}, {
  title: "ISVs and Product Development Solutions",
  description: "Aalpha India, we create winning business models through innovative product development practices. Committed to delivering the right value",
  icon: "💻"
}, {
  title: "Sports Software Development Company",
  description: "In the present era of digitalization, technology drives almost all the domains. The area of sports & entertainment is getting great attention",
  icon: "⚽"
}, {
  title: "Agri Tech",
  description: "We are a one-stop solution for Agritech Software Services. We develop custom Agritech Web and Mobile apps for clients worldwide.",
  icon: "🚜"
}, {
  title: "Education",
  description: "Boundless connectivity with the help of internet penetration, development of ICT devices, better access, convenience and flexibility to learners is shaping the future of this industry.",
  icon: "📚"
}, {
  title: "Fintech App Development Company",
  description: "Making quick yet careful decisions and managing large scale of operations with help of limited resources is the area of focus at the moment.",
  icon: "💰"
}, {
  title: "Food and Beverage",
  description: "The food and beverage industry needs advanced software and tools for its efficient management, delivery, manufacturing process, safe use",
  icon: "🍽️"
}, {
  title: "Healthcare",
  description: "We provide expert healthcare Healthcare Software Development services/solutions based on in-depth research and deep industry knowledge",
  icon: "❤️"
}, {
  title: "Hospitality & Travel",
  description: "The hospitality and travel software development industry is largely customer driven. Increasing customer demand for convenience and luxury is shaping the future dynamics of this industry.",
  icon: "✈️"
}, {
  title: "Government",
  description: "Empowering governments with AI-driven data solutions to enhance public services, streamline processes, and improve decision-making.",
  icon: "🏛️"
}, {
  title: "Pharma",
  description: "Enabling pharmaceutical innovation with AI and data platforms, accelerating drug discovery, compliance, and personalized medicine.",
  icon: "💊"
}, {
  title: "Logistics",
  description: "Optimizing supply chains with AI and data, improving efficiency, reducing costs, and ensuring timely delivery in logistics.",
  icon: "📦"
}, {
  title: "Telco",
  description: "Transforming telco operations with AI solutions, enhancing customer service, optimizing networks, and driving new service innovation.",
  icon: "📱"
}, {
  title: "Banking",
  description: "Revolutionizing banking with secure AI-driven solutions, enhancing customer interactions, risk management, and operational efficiency.",
  icon: "🏦"
}, {
  title: "FMCG",
  description: "Boosting FMCG success with AI, optimizing supply chains, analyzing consumer behaviour, and accelerating product development.",
  icon: "🛍️"
}, {
  title: "Industrial",
  description: "Enhancing industrial operations with AI, optimizing processes, reducing downtime, and improving product quality and compliance.",
  icon: "🏭"
}, {
  title: "Utilities",
  description: "Powering utilities with AI solutions, optimizing grid management, improving customer service, and ensuring regulatory compliance.",
  icon: "⚡"
}];
