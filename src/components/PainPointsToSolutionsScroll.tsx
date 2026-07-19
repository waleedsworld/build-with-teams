
import React, { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";

interface ProblemSolution {
  id: string;
  problem: string;
  solution: string;
  solutionImageUrl: string;
  color: string;
}

export const PainPointsToSolutionsScroll = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const problems: ProblemSolution[] = [
    {
      id: "dispersed-data",
      problem: "My Data Is Dispersed And Disorganised",
      solution: "Centralized Data Hub with AI Organization",
      solutionImageUrl: "/uploads/864a9f09-60ed-4d56-a7be-7b418913a116.png",
      color: "from-blue-100 to-blue-50 dark:from-blue-900/30 dark:to-blue-900/10",
    },
    {
      id: "real-time-insights",
      problem: "I Can't Get Real-Time Insights From My Data",
      solution: "Live Analytics Dashboard with Predictive Metrics",
      solutionImageUrl: "/uploads/864a9f09-60ed-4d56-a7be-7b418913a116.png",
      color: "from-indigo-100 to-indigo-50 dark:from-indigo-900/30 dark:to-indigo-900/10",
    },
    {
      id: "ineffective-campaigns",
      problem: "My Ad Campaigns Have Low ROI",
      solution: "AI-Powered Targeting & Personalization Engine",
      solutionImageUrl: "/uploads/864a9f09-60ed-4d56-a7be-7b418913a116.png",
      color: "from-sky-100 to-sky-50 dark:from-sky-900/30 dark:to-sky-900/10",
    },
  ];

  // Create refs for each solution card for intersection observer
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        } else {
          entry.target.classList.remove("active");
        }
      });
    }, observerOptions);

    cardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      cardRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  return (
    <section className="relative w-full bg-white dark:bg-gray-900">
      <div className="max-w-screen-2xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center py-12 text-gray-900 dark:text-white">
          Common Marketing Challenges & Our Solutions
        </h2>
        
        <div 
          ref={containerRef} 
          className="relative w-full"
        >
          {problems.map((item, index) => (
            <div 
              key={item.id} 
              className="min-h-screen flex flex-col md:flex-row"
            >
              <div className="flex-1 flex items-center p-6 md:p-16">
                {/* Problem Card */}
                <motion.div 
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true, amount: 0.3 }}
                  className="w-full max-w-xl mx-auto bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-8 md:p-12"
                >
                  <h3 className="text-xl font-medium text-gray-500 dark:text-gray-400 mb-2">Problem</h3>
                  <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900 dark:text-white">{item.problem}</h2>
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white rounded-full py-6 px-8">
                    Book Free Consultation
                  </Button>
                </motion.div>
              </div>
              
              <div className="flex-1 flex items-center p-6 md:p-16">
                {/* Solution Card */}
                <motion.div 
                  ref={(el) => (cardRefs.current[index] = el)}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  viewport={{ once: true, amount: 0.3 }}
                  className={`w-full max-w-xl mx-auto bg-gradient-to-br ${item.color} rounded-2xl shadow-lg p-8 md:p-12 relative overflow-hidden transition-all duration-500 hover:shadow-xl`}
                  style={{ transformStyle: 'preserve-3d' }}
                  whileHover={{ 
                    scale: 1.02, 
                    transition: { duration: 0.2 } 
                  }}
                >
                  <h3 className="text-xl font-medium text-blue-600 dark:text-blue-400 mb-2">Solution</h3>
                  <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900 dark:text-white relative z-10">
                    {item.solution}
                  </h2>
                  
                  {/* Solution Image/Graphic */}
                  <div className="absolute right-0 bottom-0 w-64 h-64 opacity-70">
                    <img 
                      src={item.solutionImageUrl} 
                      alt={`Solution for ${item.problem}`} 
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-contain"
                    />
                  </div>
                </motion.div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Final CTA Section */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.3 }}
          className="w-full bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-900 dark:to-blue-700 rounded-2xl shadow-xl p-12 md:p-16 my-16 mx-auto max-w-6xl text-white"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center text-white">
            Ready to solve all your marketing challenges?
          </h2>
          <p className="text-xl text-center text-blue-100 mb-8">
            Our AI-powered platform combines data intelligence with human expertise to revolutionize your marketing strategy.
          </p>
          <div className="flex justify-center">
            <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50 rounded-full py-6 px-8 text-lg">
              Get Started Today
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
