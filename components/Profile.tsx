import { Code2, Briefcase, GraduationCap, Award, Wrench } from 'lucide-react'

export default function Profile() {
  return (
    <div className="rounded-lg border border-slate-200 dark:border-[var(--border)] bg-[var(--card)] overflow-hidden">
      {/* Header Section */}
      <div className="bg-[var(--card)] px-8 py-5 border-b border-slate-200 dark:border-[var(--border)] text-center">
        <h2 className="text-xl sm:text-2xl font-semibold tracking-tight bg-gradient-to-r from-blue-500 via-blue-400 to-blue-500 bg-clip-text text-transparent after:content-[''] after:block after:mx-auto after:mt-2 after:h-0.5 after:w-14 after:rounded-full after:bg-blue-500/70">
          Professional Summary
        </h2>
      </div>

      <div className="p-8 space-y-6">
        {/* Summary */}
        <div className="space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed">
          <p>
            I&apos;m a multi-disciplinary <strong>Full-Stack Software Engineer</strong> with 7+ years of hands-on experience building scalable, secure, and reliable systems. My journey started in network engineering and cybersecurity, which gave me something most developers don&apos;t have: an instinct for thinking like an attacker while building like a defender. That foundation taught me to design systems that are secure-by-design, not as an afterthought.
          </p>
          <p>
            Over the years, I&apos;ve worked across the entire software development lifecycle, translating ambiguous business requirements into well-architected APIs, cloud-native applications, and high-performance backend systems. Whether it&apos;s architecting microservices with Node.js and Python, building responsive frontends with React and Next.js, or orchestrating cloud infrastructure on AWS and Azure, I approach every challenge as a problem-solver first and a technologist second.
          </p>
          <p>
            I&apos;m known for combining deep technical rigor with practical execution. What sets me apart is my belief in the power of <strong>&apos;Engineering Excellence.&apos;</strong> By leveraging AI-assisted development (Cursor, Claude, Copilot)—not as a crutch, but as a force multiplier. I&apos;ve accelerated development cycles by 40% while maintaining code quality, because I understand that velocity without reliability is just technical debt in motion.
          </p>
          <p className="text-lg font-semibold text-slate-900 dark:text-slate-100 italic border-l-4 border-blue-600 pl-4">
            Bottom line: I don&apos;t just build applications; I engineer resilient digital ecosystems. I build software that solves real problems, scales with your growth, and doesn&apos;t wake you up at night.
          </p>
        </div>

        {/* Experience Highlights */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <Briefcase className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 relative inline-block after:absolute after:left-0 after:-bottom-2 after:h-0.5 after:w-full after:bg-blue-600/60 dark:after:bg-blue-400/50">
              Experience Highlights
            </h3>
          </div>
          <div className="grid gap-3">
            {[
              "Develop and maintain full-stack MERN applications",
              "Build reusable frontend components and robust backend services",
              "Design and Implement RESTful APIs and microservices architectures",
              "Optimize applications for performance and scalability under high load",
              "Implement CI/CD pipelines and DevOps best practices",
              "Leverage AI-powered development tools (Cursor, Claude Code, Copilot)",
              "Write comprehensive unit and integration tests (Pytest, Jest, React Testing Library)",
              "Collaborate with cross-functional teams using Agile methodologies",
              "Mentor junior developers and conduct code reviews",
              "Architect cloud-native solutions on AWS and Azure"
            ].map((item, idx) => (
              <div key={idx} className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors">
                <span className="text-blue-600 dark:text-blue-400 mt-1 flex-shrink-0">▸</span>
                <span className="text-slate-700 dark:text-slate-300">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Technical Skills */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <Wrench className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 relative inline-block after:absolute after:left-0 after:-bottom-2 after:h-0.5 after:w-full after:bg-blue-600/60 dark:after:bg-blue-400/50">
              Technical Skills
            </h3>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <SkillCategory 
              title="Programming Languages" 
              skills={["JavaScript", "TypeScript", "Python", "SQL", "HTML5", "CSS3"]}
            />
            <SkillCategory 
              title="Frontend Technologies" 
              skills={["React", "Vue.js", "Next.js", "Angular", "Redux", "TanStack Query", "Webpack"]}
            />
            <SkillCategory 
              title="Backend Frameworks" 
              skills={["Node.js", "Express.js", "Django", "FastAPI", ".NET Core"]}
            />
            <SkillCategory 
              title="Databases" 
              skills={["PostgreSQL", "MongoDB", "MySQL", "Redis", "ClickHouse", "SQL Server"]}
            />
            <SkillCategory 
              title="Cloud & DevOps" 
              skills={["AWS (EC2, S3, Lambda)", "Azure", "Docker", "Kubernetes", "Terraform", "CI/CD"]}
            />
            <SkillCategory 
              title="Development Practices" 
              skills={["RESTful APIs", "Microservices", "Agile/Scrum", "SOLID", "DDD", "Event-Driven"]}
            />
          </div>
        </div>

        {/* Professional Experience */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <Code2 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 relative inline-block after:absolute after:left-0 after:-bottom-2 after:h-0.5 after:w-full after:bg-blue-600/60 dark:after:bg-blue-400/50">
              Professional Experience
            </h3>
          </div>
          <div className="space-y-6">
            <ExperienceCard
              title="Full-Stack Developer"
              company="Wayadata"
              period="January 2025 - Present"
              achievements={[
                "Architecting cloud-native applications with React, Node.js, and Azure — improved scalability by 40%",
                "Leading development of RESTful APIs serving 50K+ daily active users with 99.8% uptime",
                "Implemented CI/CD pipelines reducing deployment time by 65%",
                "Drove AI-powered development adoption, increasing code velocity by 35%",
                "Mentored 3 junior developers in TypeScript, React patterns, and cloud architecture",
                "Reduced technical debt by 30% through SOLID principles and DDD patterns"
              ]}
            />
            <ExperienceCard
              title="DevOps Engineer"
              company="FlaxBot AI"
              period="2022 - 2024"
              achievements={[
                "Designed CI/CD infrastructure using GitLab, Jenkins, and Kubernetes — automated 85% of deployments",
                "Managed containerized environments supporting 15+ microservices with 99.5% reliability",
                "Optimized database performance reducing query response times by 55%",
                "Implemented monitoring solutions decreasing incident detection time by 70%",
                "Reduced infrastructure costs by 28% through resource optimization"
              ]}
            />
            <ExperienceCard
              title="Backend Developer"
              company="Vagary Travels"
              period="2019 - 2022"
              achievements={[
                "Developed scalable backend services handling 100K+ monthly transactions",
                "Built RESTful APIs with 200ms average response time",
                "Architected real-time pipelines processing 500K+ daily background jobs",
                "Improved query performance by 45% through database optimization",
                "Increased booking conversion rates by 25% via third-party integrations",
                "Achieved 85% code coverage through comprehensive testing strategies"
              ]}
            />
          </div>
        </div>

        {/* Education & Certifications */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <GraduationCap className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 relative inline-block after:absolute after:left-0 after:-bottom-2 after:h-0.5 after:w-full after:bg-blue-600/50 dark:after:bg-blue-400/40">
                Education
              </h3>
            </div>
            <div className="p-4 rounded-lg bg-slate-100 dark:bg-slate-800/50">
              <p className="font-semibold text-slate-900 dark:text-slate-100">Bachelor of Science in Computer Science</p>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">2017</p>
              <p className="text-sm text-slate-700 dark:text-slate-300 mt-2">
                Focus: Data Structures, Algorithms, Network Security, and Distributed Systems
              </p>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-3 mb-4">
              <Award className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 relative inline-block after:absolute after:left-0 after:-bottom-2 after:h-0.5 after:w-full after:bg-blue-600/50 dark:after:bg-blue-400/40">
                Key Achievements
              </h3>
            </div>
            <div className="space-y-3">
              <AchievementBadge text="Migrated monolithic apps to microservices — 10x deployment frequency" />
              <AchievementBadge text="Led cloud migration to Azure — 35% cost reduction" />
              <AchievementBadge text="AI-powered development expert with Cursor, Claude Code & Copilot" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Utility Components
function SkillCategory({ title, skills }: { title: string; skills: string[] }) {
  return (
    <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700">
      <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-3 text-sm uppercase tracking-wide">
        {title}
      </h4>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, idx) => (
          <span
            key={idx}
            className="px-3 py-1 text-xs font-medium rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  )
}

function ExperienceCard({ 
  title, 
  company, 
  period, 
  achievements 
}: { 
  title: string
  company: string
  period: string
  achievements: string[]
}) {
  return (
    <div className="p-5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/30 hover:border-blue-600 dark:hover:border-blue-500 transition-colors">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
        <div>
          <h4 className="text-lg font-bold text-slate-900 dark:text-slate-100">{title}</h4>
          <p className="text-blue-600 dark:text-blue-400 font-medium">{company}</p>
        </div>
        <span className="text-sm text-slate-600 dark:text-slate-400 mt-1 md:mt-0">{period}</span>
      </div>
      <ul className="space-y-2 mt-3">
        {achievements.map((achievement, idx) => (
          <li key={idx} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
            <span className="text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0">●</span>
            <span>{achievement}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function AchievementBadge({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-2 p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
      <span className="text-blue-600 dark:text-blue-400 text-lg flex-shrink-0">✓</span>
      <span className="text-sm text-slate-700 dark:text-slate-300">{text}</span>
    </div>
  )
}
