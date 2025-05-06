
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Mail, AlertTriangle } from "lucide-react";

interface BetaSignupDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function BetaSignupDialog({ open, onOpenChange }: BetaSignupDialogProps) {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!firstName.trim() || !lastName.trim() || !email.trim()) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields to continue.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Get the prompt from local storage if it exists (set in the main page)
      const prompt = localStorage.getItem("userPrompt") || "";
      
      // Send to our Supabase Edge Function
      const response = await fetch("https://jpaxhfoyaytpmcqlwrfv.functions.supabase.co/send-waitlist-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          email, 
          firstName, 
          lastName,
          prompt
        }),
      });

      if (response.ok) {
        toast({
          title: "Waitlist Sign-up Successful!",
          description: `Thanks ${firstName}! We've added you to our beta waitlist. Check your inbox for confirmation.`,
          variant: "default",
        });
        onOpenChange(false);
      } else {
        throw new Error("Failed to submit");
      }
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Join TaaS Beta</DialogTitle>
          <DialogDescription asChild>
            {/* Using asChild to prevent p > div nesting issue */}
            <div>
              <div className="flex items-center text-yellow-600 bg-yellow-50 p-3 rounded-md mb-4">
                <AlertTriangle className="mr-2 h-5 w-5" />
                <span>
                  Get early access to our team as a service platform. Be the first to build amazing applications with our AI-powered team.
                </span>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="text-sm font-medium mb-1 block">
                First Name
              </label>
              <Input
                id="firstName"
                type="text"
                placeholder="Enter first name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="lastName" className="text-sm font-medium mb-1 block">
                Last Name
              </label>
              <Input
                id="lastName"
                type="text"
                placeholder="Enter last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
          </div>
          <div>
            <label htmlFor="email" className="text-sm font-medium mb-1 block">
              Email Address
            </label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-end gap-3">
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="flex items-center gap-2"
            >
              <Mail className="h-4 w-4" />
              {isSubmitting ? "Submitting..." : "Get Beta Access"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
