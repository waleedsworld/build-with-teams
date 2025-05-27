export type JobListing = {
  id: string;
  title: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  taasDescription: string;
  note: string;
};

export const jobListings: JobListing[] = [
  {
    id: "video-model-reels-host",
    title: "Entry-Level Video Model & Reels Host (On-Camera Content)",
    taasDescription: "We're looking for an On-Camera Host & Video Model to create engaging, fashion-and-beauty-focused Reels and short-form videos from your own home studio. While we welcome applicants of all backgrounds, we especially encourage women and non-binary individuals with a strong affinity for beauty and fashion products to apply.",
    note: "Remote, freelance / part-time contract. Flexible schedule aligned to video-delivery milestones. Compensation: 80–100 hours/month → ₱150–₱250 per hour. Optimum for university students. Entry-level; no prior skill required.",
    requirements: [
      "On-camera confidence and charisma (professional or influencer-style experience)",
      "Deep understanding of female-focused beauty and fashion products",
      "Proven ability to shoot and perform basic video editing using a smartphone and apps like CapCut or InShot",
      "Access to a well-lit, visually appealing indoor space (home studio) ready for filming",
      "Strong communication skills; responsive to direction and feedback"
    ],
    responsibilities: [
      "Film and style fashion-and-beauty-driven short-form video content (Instagram Reels, TikTok-style)",
      "Model, style, and showcase products clearly, authentically, and with flair",
      "Host on-camera segments with energy, warmth, and a strong screen presence",
      "Maintain a cohesive, visually appealing aesthetic in every clip",
      "Coordinate with our marketing team to ensure content aligns with brand voice and campaign goals",
      "Stay on top of emerging video trends and integrate fresh ideas",
      "Deliver polished content on schedule, maintaining consistent quality"
    ],
    description: "🎬 Role Overview: We're looking for an On-Camera Host & Video Model to create engaging, fashion-and-beauty-focused Reels and short-form videos from your own home studio. While we welcome applicants of all backgrounds, we especially encourage women and non-binary individuals with a strong affinity for beauty and fashion products to apply.\n\n💡 Preferred / Bonus:\n- Active presence on social platforms (Instagram, TikTok, YouTube Shorts) with a style-oriented following\n- Portfolio of past on-camera or influencer-style work\n- Basic graphic or video-editing chops (e.g., CapCut, VN)\n\n🌍 Work Type & Compensation:\n- Remote, freelance / part-time contract\n- Flexible schedule aligned to video-delivery milestones\n- Compensation: 80–100 hours/month → ₱150–₱250 per hour\n- Optimum for university students\n- Entry-level; no prior skill required"
  },
  {
    id: "ai-ml-engineer",
    title: "AI/ML Engineer / LLM Engineer (Senior/Lead)",
    taasDescription: "TaaS (Team-as-a-Service) is an AI-powered platform that lets anyone build a real app with a real team — for under $100. We instantly assign a pre-vetted team of 300+ developers, designers, and PMs to projects using AI-based matching. You dream it. We build it.",
    note: "This is not an immediate hire position. Selected applicants may be publicly featured and matched with client projects as demand arises.",
    requirements: [
      "3+ years in AI/ML or NLP with demonstrated work in LLMs or Transformer-based architectures",
      "Strong experience with Python, PyTorch/TensorFlow, and ML pipelines",
      "Understanding of model training, fine-tuning, and deployment on cloud infrastructure",
      "Published research or open-source contributions are a plus"
    ],
    responsibilities: [
      "Collaborate with cross-functional teams to build AI/LLM-based solutions",
      "Lead experimentation, training, and performance evaluation",
      "Integrate models into client applications",
      "Document workflows and results clearly for client demos"
    ],
    description: ""
  },
  {
    id: "cybersecurity-expert",
    title: "Cybersecurity Expert / InfoSec Officer",
    taasDescription: "TaaS is where vetted human talent and AI come together to build production-grade apps at lightning speed. We work with early-stage startups and scale with demand.",
    note: "This is a pre-hiring listing. Immediate compensation is not guaranteed.",
    requirements: [
      "3+ years in cybersecurity, with hands-on experience in penetration testing and incident response",
      "Deep knowledge of OWASP, NIST, and ISO security frameworks",
      "Ability to advise teams on secure design and cloud hardening"
    ],
    responsibilities: [
      "Perform security assessments for client builds",
      "Develop and enforce security protocols",
      "Provide training and documentation for development teams",
      "Contribute to compliance strategies (GDPR, HIPAA, etc.)"
    ],
    description: ""
  },
  {
    id: "devops-architect",
    title: "Cloud / DevOps / Platform Architect",
    taasDescription: "TaaS enables clients to build and launch products fast by using a hybrid of AI and a pre-vetted expert team.",
    note: "This is a talent onboarding listing; projects will be matched based on demand.",
    requirements: [
      "4+ years in DevOps, Platform Engineering, or Cloud Architecture",
      "Mastery in AWS/GCP/Azure + Infrastructure-as-Code (Terraform, Pulumi)",
      "CI/CD, observability, and microservices deployment skills"
    ],
    responsibilities: [
      "Architect scalable platforms for client apps",
      "Set up automated CI/CD pipelines",
      "Ensure observability and uptime monitoring",
      "Optimize cost, speed, and reliability"
    ],
    description: ""
  },
  {
    id: "product-manager-ai",
    title: "Product Manager (AI, Data, Scraping Tools)",
    taasDescription: "We are redefining software development by combining AI-driven product planning with expert human execution, all in one collaborative workspace.",
    note: "This is not an immediate job placement. Your application may be used to match future opportunities.",
    requirements: [
      "3+ years of product management experience in data/AI tooling",
      "Technical understanding of web scraping, APIs, and data workflows",
      "Strong documentation and client-facing communication"
    ],
    responsibilities: [
      "Define product specs with founders and clients",
      "Coordinate developers, data engineers, and QA",
      "Ship MVPs and iterate using agile cycles",
      "Own client delivery and satisfaction"
    ],
    description: ""
  },
  {
    id: "product-manager-saas",
    title: "Product Manager (General Tech / SaaS)",
    taasDescription: "TaaS combines real teams and AI to build client products end-to-end in a remote, asynchronous workspace. Faster than freelancers, cheaper than agencies.",
    note: "This is a scouting listing. Immediate hiring is not guaranteed.",
    requirements: [
      "3+ years in product leadership roles for SaaS or digital platforms",
      "Experience with wireframes, user stories, and agile tools like Jira/ClickUp"
    ],
    responsibilities: [
      "Oversee full project lifecycles from planning to release",
      "Act as the bridge between client and build teams",
      "Monitor sprints, update stakeholders, and ensure timely delivery"
    ],
    description: ""
  },
  {
    id: "fullstack-developer",
    title: "Full Stack Developer (Senior)",
    taasDescription: "Build any app with AI and vetted teams. TaaS is building the future of remote dev collaboration.",
    note: "This is a waitlist position. Assignments depend on project availability.",
    requirements: [
      "4+ years full stack experience with React + Node or Django + Vue",
      "Ability to lead technical discussions and structure repos"
    ],
    responsibilities: [
      "Build and maintain full-stack client solutions",
      "Integrate APIs, databases, and cloud functions",
      "Collaborate with PMs and QA for quality builds"
    ],
    description: ""
  },
  {
    id: "frontend-developer",
    title: "Front End Developer (React/Vue/Next.js)",
    taasDescription: "We bring software ideas to life through smart planning, vetted talent, and AI-based execution.",
    note: "This listing is for matching with future projects.",
    requirements: [
      "Proficiency in React.js, Vue.js, or Next.js",
      "Strong sense of UI/UX and responsiveness"
    ],
    responsibilities: [
      "Translate design mockups into functional components",
      "Optimize performance and cross-browser compatibility"
    ],
    description: ""
  },
  {
    id: "backend-developer",
    title: "Backend Developer (Node/Python/Go)",
    taasDescription: "TaaS connects talented developers to global projects with transparent pricing and AI-managed workflows.",
    note: "This is a non-immediate position for future projects.",
    requirements: [
      "Strong backend skills in either Node.js, Python (Django/Flask), or Go",
      "REST API and database design expertise"
    ],
    responsibilities: [
      "Build scalable backend services",
      "Implement integrations and ensure security standards"
    ],
    description: ""
  },
  {
    id: "solutions-architect",
    title: "Solutions Architect (Client-Facing / SaaS)",
    taasDescription: "A smarter way to build software — AI handles the busywork, experts handle the logic.",
    note: "Role activation depends on project demand.",
    requirements: [
      "5+ years in client delivery or technical architecture",
      "Strong communication and software planning skills"
    ],
    responsibilities: [
      "Interface with clients to translate needs into architecture plans",
      "Guide development team implementation"
    ],
    description: ""
  },
  {
    id: "ui-ux-designer",
    title: "UI/UX Designer (Product-focused)",
    taasDescription: "TaaS makes app creation accessible and fast through a hybrid of AI planning and top-tier design/dev talent.",
    note: "This is not an active offer but a portfolio-based evaluation.",
    requirements: [
      "2+ years designing for SaaS/web apps",
      "Figma, Adobe XD, prototyping and responsiveness"
    ],
    responsibilities: [
      "Create product design flows and screens",
      "Collaborate with frontend developers"
    ],
    description: ""
  },
  {
    id: "graphic-designer",
    title: "Graphic Designer (Branding/UI-heavy)",
    taasDescription: "We believe good design is what brings software to life. TaaS builds world-class apps with a global designer network.",
    note: "This is a talent pool listing.",
    requirements: [
      "Branding and UI asset creation",
      "Proficiency in Adobe Suite/Figma"
    ],
    responsibilities: [
      "Deliver logos, banners, UI icons, and branding kits",
      "Work with PMs and clients on visual storytelling"
    ],
    description: ""
  },
  {
    id: "video-editor",
    title: "Video Editor (Tech Ads, Content Creators)",
    taasDescription: "TaaS powers content-driven growth by producing software and assets quickly for creators and startups.",
    note: "This listing is for project-based collaborations.",
    requirements: [
      "2+ years editing reels, explainer videos, or tech ads",
      "Adobe Premiere, After Effects, or similar"
    ],
    responsibilities: [
      "Edit engaging tech-focused videos",
      "Collaborate with marketing to produce conversion-driven content"
    ],
    description: ""
  }
];

// Helper function to get a job by its ID
export function getJobById(id: string): JobListing | undefined {
  return jobListings.find(job => job.id === id);
}
