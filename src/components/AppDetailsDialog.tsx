
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface AppDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  app: {
    title: string;
    description: string;
    image: string;
    link: string;
  } | null;
}

export function AppDetailsDialog({ open, onOpenChange, app }: AppDetailsDialogProps) {
  if (!app) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>{app.title}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="aspect-video relative overflow-hidden rounded-lg">
            <img
              src={app.image}
              alt={app.title}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="flex flex-col justify-between">
            <p className="text-muted-foreground">{app.description}</p>
            <Button 
              className="w-full sm:w-auto mt-4" 
              onClick={() => window.open(app.link, '_blank')}
            >
              Open App
              <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
