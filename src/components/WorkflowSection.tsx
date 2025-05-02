
import React, { useRef, useState, useLayoutEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  User,
  FileEdit,
  Users,
  ArrowRight,
  CircleArrowRight,
} from "lucide-react";

const steps = [
  {
    number: "1",
    title: "Submit Your Idea",
    description:
      "Enter your app concept and requirements in our prompt bar—AI kicks off the planning immediately.",
    icon: User,
  },
  {
    number: "2",
    title: "Blueprint & Team Assembly",
    description:
      "AI generates page mockups, feature lists, timeline and cost. A vetted human team is automatically assigned.",
    icon: FileEdit,
  },
  {
    number: "3",
    title: "Interactive Design & Planning",
    description:
      "Refine mockups and functionality via AI chat or on-demand meetings with designers and CTO.",
    icon: Users,
  },
  {
    number: "4",
    title: "Development & Collaboration",
    description:
      "Track progress, chat with developers, and adjust tasks in real time until your app is ready.",
    icon: ArrowRight,
  },
  {
    number: "5",
    title: "Launch & Ongoing Optimization",
    description:
      "Go live with hosting, domain setup, mobile bundling, and continue to improve with AI-driven insights.",
    icon: CircleArrowRight,
  },
];

export function WorkflowSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const circleRefs = useRef<HTMLDivElement[]>([]);
  const [pathD, setPathD] = useState<string>("");
  const [dims, setDims] = useState({ width: 0, height: 0 });

  // Build one continuous H-V-H path (no breaks)
  useLayoutEffect(() => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setDims({ width: rect.width, height: rect.height });

    const radius = 32; // half of 64px circle
    const points = circleRefs.current.map((el) => {
      if (!el) return { x: 0, y: 0 };
      const r = el.getBoundingClientRect();
      return {
        x: r.left - rect.left + radius,
        y: r.top - rect.top + radius,
      };
    });

    const spineX = rect.width / 2;
    // start at first point
    let d = `M ${points[0].x} ${points[0].y}`;
    // for each next point, go H→V→H
    for (let i = 1; i < points.length; i++) {
      const curr = points[i];
      d += ` H ${spineX}`;
      d += ` V ${curr.y}`;
      d += ` H ${curr.x}`;
    }

    setPathD(d);
  }, []);

  // Animate path drawing on scroll
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section className="bg-black text-white py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl sm:text-5xl font-bold mb-16">
          How does an
          <br />
          AI TaaS Team Work?
        </h2>

        <div className="relative" ref={containerRef}>
          {/* Continuous SVG connector */}
          <svg
            width={dims.width}
            height={dims.height}
            viewBox={`0 0 ${dims.width} ${dims.height}`}
            className="absolute inset-0 hidden lg:block"
            fill="none"
            pointerEvents="none"
          >
            <defs>
              <marker
                id="arrowhead"
                markerWidth="6"
                markerHeight="6"
                refX="6"
                refY="3"
                orient="auto"
                markerUnits="strokeWidth"
              >
                <path d="M0,0 L0,6 L6,3 z" fill="#FF0080" />
              </marker>
            </defs>

            <motion.path
              d={pathD}
              stroke="#FF0080"
              strokeWidth="4"
              strokeDasharray="10,10"
              strokeLinecap="round"
              markerEnd="url(#arrowhead)"
              style={{ pathLength }}
            />
          </svg>

          {/* Steps with reduced vertical gap */}
          <div className="grid gap-y-20 relative z-10">
            {steps.map((step, idx) => (
              <div
                key={step.number}
                ref={(el) => {
                  if (el) circleRefs.current[idx] = el;
                }}
                className={`flex items-start gap-6 ${
                  idx % 2 === 0 ? "lg:ml-0" : "lg:ml-[50%]"
                }`}
              >
                <div className="w-16 h-16 bg-[#FF0080] rounded-full flex items-center justify-center font-bold text-2xl flex-shrink-0">
                  {step.number}
                </div>
                <div className="max-w-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-2xl font-semibold">{step.title}</h3>
                    <step.icon className="w-6 h-6" />
                  </div>
                  <p className="text-gray-400">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
