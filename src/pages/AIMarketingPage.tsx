
import React, { useState, useEffect, useRef } from "react";
import { Navigation } from "@/components/navigation";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ArrowRight, Check, MessageCircle, Mail, Phone } from "lucide-react";

export default function AIMarketingPage() {
  const [leadCount, setLeadCount] = useState<number>(1000);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    const currentRef = videoRef.current;
    if (currentRef) {
      observer.observe(currentRef);
      
      // Handle video play/pause based on visibility
      if (isInView) {
        currentRef.play();
      } else {
        currentRef.pause();
      }
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [isInView]);

  // Calculate metrics based on lead count
  const expectedConversions = Math.round(leadCount * 0.035); // 3.5% conversion rate
  const estimatedProfit = expectedConversions * 500; // $500 profit per conversion
  const totalSpend = leadCount * 5; // $5 per lead

  const timelineSteps = [
    {
      day: "Day 0",
      icon: <Mail className="h-8 w-8 text-blue-500" />,
      title: "Personalized Email",
      description: "Personalized Email with CTA + CEO voice note opt-in",
    },
    {
      day: "Day 1",
      icon: <MessageCircle className="h-8 w-8 text-green-500" />,
      title: "Reminder SMS",
      description: "Reminder SMS with direct link",
    },
    {
      day: "Day 2 AM",
      icon: <Mail className="h-8 w-8 text-blue-500" />,
      title: "Follow-up Email",
      description: "Email with social proof + booking link",
    },
    {
      day: "Day 2 PM",
      icon: <MessageCircle className="h-8 w-8 text-green-500" />,
      title: "Behavior-triggered SMS",
      description: "SMS sent based on user engagement",
    },
    {
      day: "Day 3",
      icon: <Phone className="h-8 w-8 text-purple-500" />,
      title: "Cold Call",
      description: "Cold Call + Voicemail Drop",
    },
    {
      day: "Day 5",
      icon: <MessageCircle className="h-8 w-8 text-green-500" />,
      title: "CEO WhatsApp",
      description: "CEO-recorded WhatsApp message",
    },
  ];

  const journeySteps = [
    {
      userAction: "Visited website",
      aiAction: "Tracked + Scored",
      icon: <Check className="h-6 w-6" />,
    },
    {
      userAction: "Ignored email",
      aiAction: "SMS triggered",
      icon: <MessageCircle className="h-6 w-6" />,
    },
    {
      userAction: "Clicked link",
      aiAction: "Agent cold-calls with context",
      icon: <Phone className="h-6 w-6" />,
    },
    {
      userAction: "Still hesitant",
      aiAction: "CEO WhatsApp Message Sent",
      icon: <MessageCircle className="h-6 w-6" />,
    },
  ];

  const testimonials = [
    {
      company: "TechGrowth Inc.",
      logo: "https://i.ibb.co/Kj8Bz5M/tech-growth.png",
      quote: "TaaS AI-Marketing increased our conversions by 4x while cutting our costs in half.",
      author: "Sarah Johnson, CMO",
    },
    {
      company: "StartupSucceed",
      logo: "https://i.ibb.co/n7ZfSzv/startup-succeed.png",
      quote: "The hybrid approach of AI + human touch made all the difference for our outreach campaigns.",
      author: "Michael Chen, CEO",
    },
    {
      company: "Enterprise Solutions",
      logo: "https://i.ibb.co/cxKhJJC/enterprise-solutions.png",
      quote: "We've tried dozens of marketing approaches, but TaaS AI-Marketing has the best ROI we've seen.",
      author: "David Williams, Director of Growth",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <video 
            ref={videoRef}
            className="object-cover w-full h-full"
            autoPlay 
            loop 
            muted 
            playsInline
          >
            <source src="https://data-pilot.com/wp-content/uploads/2025/02/DataPilotHeroimage-1.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        </div>
        
        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto text-white">
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Transform Cold Leads into Warm Conversations — with AI + Human Precision
          </motion.h1>
          <motion.p 
            className="text-lg md:text-xl mb-8 text-gray-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Our hybrid outreach system delivers up to 5x more conversions using AI-powered intent detection and real human touch.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white rounded-full py-6 px-8 text-lg">
              📅 Book Free Consultation
            </Button>
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our multi-day outreach system combines AI intelligence with human touchpoints for maximum conversion
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {timelineSteps.map((step, index) => (
              <motion.div
                key={step.day}
                className="bg-card p-6 rounded-lg shadow-md"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex items-center mb-4">
                  <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full mr-4">{step.icon}</div>
                  <div>
                    <h3 className="font-bold text-xl">{step.day}</h3>
                    <p className="text-blue-600 dark:text-blue-400">{step.title}</p>
                  </div>
                </div>
                <p className="text-muted-foreground">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI + Manual = Results Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">AI + Manual = Results</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our unique approach combines AI intelligence with human touchpoints exactly when they're needed
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              {journeySteps.map((step, index) => (
                <motion.div 
                  key={index}
                  className="flex gap-6 items-start"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="bg-muted p-3 rounded-full">
                    {step.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">{step.userAction}</h3>
                    <p className="text-muted-foreground">User behavior</p>
                  </div>
                  <ArrowRight className="mt-2 text-muted-foreground" />
                  <div>
                    <h3 className="font-bold text-lg mb-1">{step.aiAction}</h3>
                    <p className="text-blue-600 dark:text-blue-400">AI response</p>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <motion.div
              className="bg-blue-50 dark:bg-blue-900/50 p-8 rounded-xl"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7 }}
            >
              <h3 className="text-2xl font-bold mb-4">Why This Works</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Check className="text-green-500 mt-1 flex-shrink-0" />
                  <span>AI analyzes behavior patterns to identify the perfect time to reach out</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="text-green-500 mt-1 flex-shrink-0" />
                  <span>Multi-channel approach ensures your message reaches the prospect</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="text-green-500 mt-1 flex-shrink-0" />
                  <span>Human touchpoints add authenticity when it matters most</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="text-green-500 mt-1 flex-shrink-0" />
                  <span>Continuous optimization based on performance data</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Cost Breakdown Section */}
      <section className="py-20 bg-foreground text-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Visual Cost Breakdown</h2>
            <p className="text-lg text-muted max-w-2xl mx-auto">
              See how our AI-powered marketing system translates into real ROI
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <div className="bg-card text-card-foreground p-8 rounded-xl">
              <h3 className="text-xl font-semibold mb-6">Calculate Your ROI</h3>
              
              <div className="mb-8">
                <div className="flex justify-between mb-2">
                  <span>Number of Leads:</span>
                  <span className="font-bold">{leadCount.toLocaleString()}</span>
                </div>
                <Slider 
                  value={[leadCount]} 
                  min={1000} 
                  max={100000} 
                  step={1000} 
                  onValueChange={(value) => setLeadCount(value[0])}
                  className="my-4"
                />
                <div className="grid grid-cols-3 text-xs text-muted-foreground">
                  <div>1,000</div>
                  <div className="text-center">50,000</div>
                  <div className="text-right">100,000</div>
                </div>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6">
                <motion.div 
                  className="bg-muted p-4 rounded-lg text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <p className="text-muted-foreground text-sm mb-1">Total Spend</p>
                  <p className="text-2xl font-bold">${totalSpend.toLocaleString()}</p>
                </motion.div>
                
                <motion.div 
                  className="bg-blue-900 text-white p-4 rounded-lg text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <p className="text-gray-300 text-sm mb-1">Expected Conversions</p>
                  <p className="text-2xl font-bold">{expectedConversions}</p>
                </motion.div>
                
                <motion.div 
                  className="bg-green-800 text-white p-4 rounded-lg text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <p className="text-gray-300 text-sm mb-1">Estimated Profit</p>
                  <p className="text-2xl font-bold">${estimatedProfit.toLocaleString()}</p>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparative Impact Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Comparative Impact</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              See how our approach compares to traditional marketing methods
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-10">
            <motion.div 
              className="bg-muted p-8 rounded-xl"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-2xl font-bold mb-6">Traditional Marketing</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="text-red-500 text-xl font-bold">✕</span>
                  <span>Generic messages with low personalization</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-500 text-xl font-bold">✕</span>
                  <span>Low conversion rates (1-2%)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-500 text-xl font-bold">✕</span>
                  <span>Cold outreach with no behavior tracking</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-500 text-xl font-bold">✕</span>
                  <span>Limited to one or two channels</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-500 text-xl font-bold">✕</span>
                  <span>No optimization based on real-time data</span>
                </li>
              </ul>
            </motion.div>
            
            <motion.div 
              className="bg-blue-50 dark:bg-blue-900/40 p-8 rounded-xl"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-2xl font-bold mb-6 text-blue-800 dark:text-blue-100">Our TaaS Marketing</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Check className="text-green-500 mt-1 flex-shrink-0" />
                  <span>AI + CRM integration for deep personalization</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="text-green-500 mt-1 flex-shrink-0" />
                  <span>High conversion rates (3-5%)</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="text-green-500 mt-1 flex-shrink-0" />
                  <span>Warm lead scoring and behavior-based targeting</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="text-green-500 mt-1 flex-shrink-0" />
                  <span>Multi-channel approach (email, SMS, calls, WhatsApp)</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="text-green-500 mt-1 flex-shrink-0" />
                  <span>Continuous optimization with machine learning</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Clients Say</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Real results from companies just like yours
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-card p-6 rounded-lg shadow-md"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <h3 className="font-bold text-lg mb-2">{testimonial.company}</h3>
                <p className="text-muted-foreground italic mb-4">"{testimonial.quote}"</p>
                <p className="text-sm text-muted-foreground">- {testimonial.author}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ROI Guarantee Section */}
      <section className="py-20 bg-blue-900 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our ROI Guarantee</h2>
            <p className="text-lg text-blue-200 max-w-2xl mx-auto">
              Per 1,000 leads, our clients average 20–50 conversions
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <motion.div
              className="bg-white/10 backdrop-blur p-6 rounded-lg text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-4xl font-bold mb-2">350K+</h3>
              <p className="text-blue-200">Leads processed</p>
            </motion.div>
            
            <motion.div
              className="bg-white/10 backdrop-blur p-6 rounded-lg text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h3 className="text-4xl font-bold mb-2">4.2x</h3>
              <p className="text-blue-200">Average ROI</p>
            </motion.div>
            
            <motion.div
              className="bg-white/10 backdrop-blur p-6 rounded-lg text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="text-4xl font-bold mb-2">3.5%</h3>
              <p className="text-blue-200">Vs industry average of 1.2%</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Closing CTA Section */}
      <section className="py-16 bg-background border-t">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to convert your leads the modern way?
          </h2>
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white rounded-full py-6 px-8 text-lg">
            Try AI-Powered Outreach Now
          </Button>
          <p className="text-muted-foreground mt-4">Free consultation | Instant ROI calculator</p>
        </div>
      </section>
    </div>
  );
}
