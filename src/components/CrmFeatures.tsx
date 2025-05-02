
import { Check } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type CrmFeature = {
  title: string;
  tooltip: string;
  content: React.ReactNode;
};

const crmFeatures: CrmFeature[] = [
  {
    title: "Absurdly simple to setup",
    tooltip: "Start with a template, edit like a spreadsheet, and customize what you want to track. With folk, getting started is fast!",
    content: (
      <div className="space-y-2">
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
    ),
  },
  {
    title: "A single source of truth",
    tooltip: "Connect and sync all your favorite tools to keep your data consistent across your entire stack",
    content: (
      <div className="grid grid-cols-4 gap-2">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="aspect-square border rounded-md p-1 flex items-center justify-center bg-gray-50">
            {i < 11 && <div className="w-6 h-6 bg-gray-200 rounded" />}
            {i === 11 && <span className="text-sm text-gray-500">+99</span>}
          </div>
        ))}
      </div>
    ),
  },
  {
    title: "Built for team-selling",
    tooltip: "Collaborate seamlessly with your team through customizable roles and permissions",
    content: (
      <div className="relative">
        <div className="w-full h-32 bg-gray-50 rounded-lg flex items-center justify-center">
          <div className="flex gap-4">
            <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">Admin</span>
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">Editor</span>
            <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm">Viewer</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "Surprisingly proactive",
    tooltip: "Smart reminders and notifications keep you on top of your follow-ups and tasks",
    content: (
      <div className="p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center gap-2 p-3 border rounded-md bg-white">
          <div className="w-5 h-5 bg-gray-200 rounded" />
          <span className="font-medium">Follow-up with Walt</span>
        </div>
      </div>
    ),
  },
];

export function CrmFeatures() {
  return (
    <section className="container py-20">
      <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-16">
        Finally, an AI that works <span className="text-primary">for you</span>
      </h2>
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
    </section>
  );
}
