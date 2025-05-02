
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Menu, LayoutGrid, User, CheckSquare, Calendar, LayoutDashboard, DollarSign, Info, Lock, ListCheck, Send, FileText, Briefcase } from "lucide-react"
import { Link } from "react-router-dom"
import { useState } from "react"
import { BetaSignupDialog } from "./BetaSignupDialog"

export function SidePanel() {
  const [showBetaDialog, setShowBetaDialog] = useState(false);

  const handleLinkClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowBetaDialog(true);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:flex">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[300px] sm:w-[400px] bg-background/80 backdrop-blur-lg">
        <SheetHeader>
          <SheetTitle>TaaS Menu - Apply for Beta Access</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-4 mt-6">
          {[
            { to: "/modal", icon: LayoutGrid, label: "Pop-Up Modal" },
            { to: "/workspace", icon: LayoutGrid, label: "Workspace View" },
            { to: "/person", icon: User, label: "Single Person Page" },
            { to: "/task", icon: CheckSquare, label: "Single Task Page" },
            { to: "/calendar", icon: Calendar, label: "Calendar Page" },
            { to: "/dashboard", icon: LayoutDashboard, label: "Worker/Employee Dashboard" },
            { to: "/pricing", icon: DollarSign, label: "Pricing Page" },
            { to: "/about", icon: Info, label: "About Us Page" }
          ].map((item) => (
            <div key={item.to} className="relative">
              <Button
                asChild
                variant="ghost"
                className="justify-start gap-2 w-full relative"
                onClick={handleLinkClick}
              >
                <Link to={item.to}>
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </Link>
              </Button>
              <div className="absolute inset-0 bg-background/60 backdrop-blur-[2px] flex items-center justify-center">
                <Lock className="h-4 w-4 text-muted-foreground" />
                <span className="ml-2 text-sm text-muted-foreground">Apply for Beta</span>
              </div>
            </div>
          ))}
          
          {/* Direct access links without beta signup */}
          <Button
            asChild
            variant="ghost"
            className="justify-start gap-2 w-full"
          >
            <Link to="/ptest">
              <ListCheck className="h-5 w-5" />
              Personality Test
            </Link>
          </Button>
          
          <Button
            asChild
            variant="ghost"
            className="justify-start gap-2 w-full"
          >
            <Link to="/api-test">
              <Send className="h-5 w-5" />
              API Test Page
            </Link>
          </Button>
          
          <Button
            asChild
            variant="ghost"
            className="justify-start gap-2 w-full"
          >
            <Link to="/career/apply">
              <FileText className="h-5 w-5" />
              Career Application
            </Link>
          </Button>
          
          <Button
            asChild
            variant="ghost"
            className="justify-start gap-2 w-full"
          >
            <Link to="/careers">
              <Briefcase className="h-5 w-5" />
              Job Listings
            </Link>
          </Button>
        </div>

        <BetaSignupDialog 
          open={showBetaDialog} 
          onOpenChange={setShowBetaDialog} 
        />
      </SheetContent>
    </Sheet>
  )
}
