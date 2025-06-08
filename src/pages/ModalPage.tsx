
import { useState } from "react";
import { Navigation } from "@/components/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";

// Types
type Template = "saas" | "ecommerce" | "blog" | "custom";
type PageRange = "1-5" | "6-10" | "11-20" | "21+";
type Feature = "auth" | "payments" | "analytics" | "admin" | "api" | "notifications";

const ModalPage = () => {
  const [step, setStep] = useState<number>(1);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [selectedPageRange, setSelectedPageRange] = useState<PageRange | null>(null);
  const [selectedFeatures, setSelectedFeatures] = useState<Feature[]>([]);
  const [addOns, setAddOns] = useState<string[]>([]);

  // Templates data
  const templates = [
    { id: "saas" as Template, name: "SaaS Application", 
      desc: "Software as a Service platform with subscription model", 
      basePrice: 2999 },
    { id: "ecommerce" as Template, name: "E-Commerce Store", 
      desc: "Online store with product catalog and checkout", 
      basePrice: 2499 },
    { id: "blog" as Template, name: "Blog / Content Site", 
      desc: "Content-focused website with article management", 
      basePrice: 1499 },
    { id: "custom" as Template, name: "Custom Application", 
      desc: "Fully customized application built to your specs", 
      basePrice: 3999 },
  ];

  // Page ranges
  const pageRanges = [
    { id: "1-5" as PageRange, name: "1-5 pages", multiplier: 1 },
    { id: "6-10" as PageRange, name: "6-10 pages", multiplier: 1.5 },
    { id: "11-20" as PageRange, name: "11-20 pages", multiplier: 2 },
    { id: "21+" as PageRange, name: "21+ pages", multiplier: 2.5 },
  ];

  // Features
  const features = [
    { id: "auth" as Feature, name: "User Authentication", price: 499 },
    { id: "payments" as Feature, name: "Payment Processing", price: 799 },
    { id: "analytics" as Feature, name: "Analytics Dashboard", price: 599 },
    { id: "admin" as Feature, name: "Admin Panel", price: 899 },
    { id: "api" as Feature, name: "API Integration", price: 699 },
    { id: "notifications" as Feature, name: "Notifications System", price: 399 },
  ];

  // Add-ons
  const availableAddOns = [
    { id: "fastDelivery", name: "Fast Delivery (2x speed)", price: 999 },
    { id: "meetings", name: "Weekly Progress Meetings", price: 499 },
    { id: "seo", name: "SEO Optimization", price: 699 },
    { id: "support", name: "6-Month Extended Support", price: 899 },
  ];

  // Page sample designs (Would be images in a real application)
  const pageDesigns = [
    { title: "Home Page", desc: "Landing page with hero section and features" },
    { title: "About Us", desc: "Company information and team" },
    { title: "Services", desc: "List of services with pricing" },
    { title: "Contact", desc: "Contact form and information" },
  ];

  // Handle template selection
  const handleSelectTemplate = (template: Template) => {
    setSelectedTemplate(template);
  };

  // Handle page range selection
  const handleSelectPageRange = (range: PageRange) => {
    setSelectedPageRange(range);
  };

  // Handle feature toggle
  const handleToggleFeature = (feature: Feature) => {
    if (selectedFeatures.includes(feature)) {
      setSelectedFeatures(selectedFeatures.filter(f => f !== feature));
    } else {
      setSelectedFeatures([...selectedFeatures, feature]);
    }
  };

  // Handle add-on toggle
  const handleToggleAddOn = (addOnId: string) => {
    if (addOns.includes(addOnId)) {
      setAddOns(addOns.filter(a => a !== addOnId));
    } else {
      setAddOns([...addOns, addOnId]);
    }
  };

  // Calculate price
  const calculatePrice = () => {
    if (!selectedTemplate || !selectedPageRange) return 0;
    
    const template = templates.find(t => t.id === selectedTemplate);
    const pageRange = pageRanges.find(p => p.id === selectedPageRange);
    
    if (!template || !pageRange) return 0;
    
    let basePrice = template.basePrice * pageRange.multiplier;
    
    // Add features cost
    const featuresPrice = selectedFeatures.reduce((sum, featureId) => {
      const feature = features.find(f => f.id === featureId);
      return sum + (feature?.price || 0);
    }, 0);
    
    // Add add-ons cost
    const addOnsPrice = addOns.reduce((sum, addOnId) => {
      const addOn = availableAddOns.find(a => a.id === addOnId);
      return sum + (addOn?.price || 0);
    }, 0);
    
    return basePrice + featuresPrice + addOnsPrice;
  };

  // Navigation handlers
  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  // Render steps
  const renderStep = () => {
    switch(step) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-center">Select Template</h2>
            <p className="text-muted-foreground text-center">Select the type of app you want to build.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {templates.map((template) => (
                <Card 
                  key={template.id}
                  className={`cursor-pointer transition-all ${selectedTemplate === template.id ? 'border-primary ring-2 ring-primary' : 'hover:border-gray-300'}`}
                  onClick={() => handleSelectTemplate(template.id)}
                >
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      {template.name}
                      {selectedTemplate === template.id && <Check className="h-5 w-5 text-primary" />}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{template.desc}</p>
                    <p className="mt-2 font-semibold">Starting at ${template.basePrice}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );
        
      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-center">Number of Pages</h2>
            <p className="text-muted-foreground text-center">How many pages does your app need?</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {pageRanges.map((range) => (
                <Card 
                  key={range.id}
                  className={`cursor-pointer transition-all ${selectedPageRange === range.id ? 'border-primary ring-2 ring-primary' : 'hover:border-gray-300'}`}
                  onClick={() => handleSelectPageRange(range.id)}
                >
                  <CardContent className="flex items-center justify-between p-6">
                    <div>
                      <h3 className="font-medium">{range.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {range.multiplier > 1 ? `${range.multiplier}x base price` : 'Base price'}
                      </p>
                    </div>
                    {selectedPageRange === range.id && <Check className="h-5 w-5 text-primary" />}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );
        
      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-center">Page Design Preview</h2>
            <p className="text-muted-foreground text-center">Review your page layouts. Would you like to make any changes?</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {pageDesigns.map((page, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="aspect-video bg-muted rounded-md mb-4 flex items-center justify-center">
                      <p className="text-muted-foreground">Page Preview {index + 1}</p>
                    </div>
                    <h3 className="font-medium">{page.title}</h3>
                    <p className="text-sm text-muted-foreground">{page.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );
        
      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-center">Features Selection</h2>
            <p className="text-muted-foreground text-center">Select key features for your app.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {features.map((feature) => (
                <Card 
                  key={feature.id}
                  className={`cursor-pointer transition-all ${selectedFeatures.includes(feature.id) ? 'border-primary ring-2 ring-primary' : 'hover:border-gray-300'}`}
                  onClick={() => handleToggleFeature(feature.id)}
                >
                  <CardContent className="flex items-center justify-between p-6">
                    <div>
                      <h3 className="font-medium">{feature.name}</h3>
                      <p className="text-sm text-muted-foreground">${feature.price}</p>
                    </div>
                    {selectedFeatures.includes(feature.id) && <Check className="h-5 w-5 text-primary" />}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );
        
      case 5:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-center">Pricing and Add-Ons</h2>
            <p className="text-muted-foreground text-center">Confirm your app's pricing and features.</p>
            
            <Card>
              <CardHeader>
                <CardTitle>Price Breakdown</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Base Template ({templates.find(t => t.id === selectedTemplate)?.name})</span>
                  <span>${templates.find(t => t.id === selectedTemplate)?.basePrice}</span>
                </div>
                
                <div className="flex justify-between">
                  <span>Pages ({pageRanges.find(p => p.id === selectedPageRange)?.name})</span>
                  <span>x{pageRanges.find(p => p.id === selectedPageRange)?.multiplier}</span>
                </div>
                
                {selectedFeatures.length > 0 && (
                  <div>
                    <p className="font-medium mb-2">Selected Features:</p>
                    {selectedFeatures.map(featureId => {
                      const feature = features.find(f => f.id === featureId);
                      return (
                        <div key={featureId} className="flex justify-between text-sm pl-4">
                          <span>{feature?.name}</span>
                          <span>${feature?.price}</span>
                        </div>
                      );
                    })}
                  </div>
                )}
                
                <div className="pt-4">
                  <p className="font-medium mb-2">Add-Ons (Optional):</p>
                  {availableAddOns.map(addOn => (
                    <div 
                      key={addOn.id} 
                      className="flex items-center justify-between text-sm py-2 cursor-pointer"
                      onClick={() => handleToggleAddOn(addOn.id)}
                    >
                      <div className="flex items-center gap-2">
                        <div className={`w-4 h-4 rounded border ${addOns.includes(addOn.id) ? 'bg-primary border-primary' : 'border-gray-400'}`}>
                          {addOns.includes(addOn.id) && <Check className="h-3 w-3 text-white" />}
                        </div>
                        <span>{addOn.name}</span>
                      </div>
                      <span>${addOn.price}</span>
                    </div>
                  ))}
                </div>
                
                <div className="pt-4 border-t">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total Estimated Price:</span>
                    <span>${calculatePrice().toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );
        
      default:
        return null;
    }
  };

  // Render buttons
  const renderButtons = () => {
    return (
      <div className="flex justify-between items-center">
        {step > 1 ? (
          <Button variant="outline" onClick={prevStep}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
        ) : (
          <div></div>
        )}
        
        {step < 5 ? (
          <Button onClick={nextStep} disabled={
            (step === 1 && !selectedTemplate) || 
            (step === 2 && !selectedPageRange)
          }>
            Next <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        ) : (
          <Button>
            Confirm & Proceed <Check className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen pb-20">
      <Navigation />
      
      <div className="container mx-auto py-20 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Progress bar */}
          <div className="mb-8 pt-6">
            <div className="flex items-center justify-between">
              {[1, 2, 3, 4, 5].map((s) => (
                <div key={s} className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${s <= step ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                    {s}
                  </div>
                  <span className="text-xs mt-1 text-muted-foreground hidden sm:inline-block">
                    {s === 1 && "Template"}
                    {s === 2 && "Pages"}
                    {s === 3 && "Design"}
                    {s === 4 && "Features"}
                    {s === 5 && "Pricing"}
                  </span>
                </div>
              ))}
            </div>
            <div className="relative mt-2">
              <div className="absolute h-1 top-0 left-0 right-0 bg-muted" />
              <div 
                className="absolute h-1 top-0 left-0 bg-primary transition-all" 
                style={{ width: `${(step - 1) * 25}%` }} 
              />
            </div>
          </div>
          
          {/* Main content */}
          <div className="bg-card border rounded-lg p-6">
            {renderStep()}
            
            <div className="mt-8">
              {renderButtons()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalPage;
