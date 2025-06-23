
import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/navigation";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, PackagePlus } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "$99",
    description: "Perfect for small teams and simple projects",
    features: [
      "Up to 3 team members",
      "5 projects",
      "Basic AI assistance",
      "Community support",
      "Basic analytics"
    ]
  },
  {
    name: "Pro",
    price: "$199",
    description: "Ideal for growing teams with advanced needs",
    features: [
      "Up to 10 team members",
      "Unlimited projects",
      "Advanced AI tools",
      "Priority support",
      "Advanced analytics",
      "Custom integrations"
    ]
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "Custom solutions for large organizations",
    features: [
      "Unlimited team members",
      "Unlimited projects",
      "Full AI suite",
      "24/7 dedicated support",
      "Custom analytics",
      "API access",
      "Custom development"
    ]
  }
];

const addOns = [
  {
    name: "Custom Design Package",
    price: "$499",
    description: "Professional UI/UX design customization"
  },
  {
    name: "CTO Consultation",
    price: "$999",
    description: "1:1 technical strategy session with our CTO"
  }
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container pt-24 pb-16">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            Choose Your Plan
          </h1>
          <p className="text-muted-foreground text-lg">
            Select the perfect plan for your team's needs. All plans include our core features.
          </p>
        </div>

        {/* Pricing Tiers */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan) => (
            <Card key={plan.name} className="flex flex-col">
              <CardHeader>
                <CardTitle>{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="mb-6">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  {plan.price !== "Custom" && <span className="text-muted-foreground">/month</span>}
                </div>
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full">
                  {plan.price === "Custom" ? "Contact Sales" : "Get Started"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Add-ons Section */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-center mb-12">Optional Add-ons</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {addOns.map((addon) => (
              <Card key={addon.name}>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <PackagePlus className="h-5 w-5 text-primary" />
                    <CardTitle className="text-xl">{addon.name}</CardTitle>
                  </div>
                  <CardDescription>{addon.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{addon.price}</div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">Add to Plan</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
