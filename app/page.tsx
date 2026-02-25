import Link from 'next/link'
import Profile from '@/components/Profile'
import Button from '@/components/ui/Button'
import { ArrowRight, BookOpen, Shield, Network, Code, Zap, FileText, Rocket } from 'lucide-react'

export const dynamic = 'force-static'
export const revalidate = 3600

export default function HomePage() {
  return (
    <div className="w-full">
      {/* Hero Section with Gradient */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-cyan-50 to-slate-50 dark:from-slate-950 dark:via-blue-950/20 dark:to-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="absolute inset-0 bg-grid-slate-100 dark:bg-grid-slate-800/20 [mask-image:linear-gradient(0deg,transparent,black)] pointer-events-none" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl py-20 lg:py-28 relative">
          <div className="text-center max-w-4xl mx-auto space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-sm font-medium">
              <Zap className="w-4 h-4" />
              Professional Documentation Hub
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-700 dark:from-blue-400 dark:via-cyan-400 dark:to-blue-500 bg-clip-text text-transparent">
                Technical Knowledge
              </span>
              <br />
              <span className="text-slate-900 dark:text-slate-100">Base & Projects</span>
            </h1>

            {/* Description */}
            <p className="text-xl leading-relaxed text-slate-700 dark:text-slate-300 max-w-3xl mx-auto">
              Comprehensive documentation covering cybersecurity operations, network infrastructure automation, 
              and full-stack development. Built from hands-on experience securing systems, architecting networks, 
              and developing production applications.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link href="/docs/study-notes">
                <Button size="lg" className="gap-2 shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30">
                  <BookOpen className="w-5 h-5" />
                  Explore Documentation
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/learn">
                <Button variant="secondary" size="lg" className="gap-2">
                  <Rocket className="w-5 h-5" />
                  Interactive Learning
                </Button>
              </Link>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-12">
              <div className="space-y-2">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">20+</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Study Notes</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-cyan-600 dark:text-cyan-400">50+</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Lab Scenarios</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">10+</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Python Tools</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">5+</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Automation Playbooks</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-6 max-w-6xl py-12 lg:py-16">
        <div className="space-y-16">
          {/* Features Section */}
          <section>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
                What You'll Find Here
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                Curated resources built from real-world projects and hands-on learning
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="group p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:shadow-lg hover:shadow-blue-500/10 dark:hover:shadow-blue-500/5 transition-all duration-300">
                <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Shield className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2">Security-First</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  Penetration testing methodologies, vulnerability assessments, and secure development practices
                </p>
              </div>

              <div className="group p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:shadow-lg hover:shadow-cyan-500/10 dark:hover:shadow-cyan-500/5 transition-all duration-300">
                <div className="w-12 h-12 rounded-lg bg-cyan-100 dark:bg-cyan-900/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Network className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2">Infrastructure</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  Network automation with Ansible, enterprise designs, CCNA/CCNP labs, and cloud architecture
                </p>
              </div>

              <div className="group p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:shadow-lg hover:shadow-purple-500/10 dark:hover:shadow-purple-500/5 transition-all duration-300">
                <div className="w-12 h-12 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Code className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2">Development</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  Full-stack projects, security tools in Python, automation scripts, and development best practices
                </p>
              </div>
            </div>
          </section>

          {/* Content Navigation */}
          <section>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
                Documentation & Projects
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400">
                Browse through organized collections of study materials and project implementations
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Link 
                href="/docs/study-notes"
                className="group block p-8 border-2 border-slate-200 dark:border-slate-800 rounded-xl hover:border-blue-500 dark:hover:border-blue-500 transition-all duration-300 bg-white dark:bg-slate-900 hover:shadow-xl hover:shadow-blue-500/10"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      📚 Study Notes
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                      Comprehensive notes on networking (CCNA/CCNP), security (ethical hacking, web security), and programming
                    </p>
                    <div className="mt-3 text-sm font-medium text-blue-600 dark:text-blue-400 flex items-center gap-2">
                      View all notes
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>

              <Link 
                href="/docs/automation"
                className="group block p-8 border-2 border-slate-200 dark:border-slate-800 rounded-xl hover:border-cyan-500 dark:hover:border-cyan-500 transition-all duration-300 bg-white dark:bg-slate-900 hover:shadow-xl hover:shadow-cyan-500/10"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-cyan-100 dark:bg-cyan-900/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Zap className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-slate-900 dark:text-slate-100 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                      🤖 Automation
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                      Ansible-based automation for Cisco OSPF routing configurations in lab environments
                    </p>
                    <div className="mt-3 text-sm font-medium text-cyan-600 dark:text-cyan-400 flex items-center gap-2">
                      View playbooks
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>

              <Link 
                href="/docs/CCNA-Labs/Packet-Tracer"
                className="group block p-8 border-2 border-slate-200 dark:border-slate-800 rounded-xl hover:border-purple-500 dark:hover:border-purple-500 transition-all duration-300 bg-white dark:bg-slate-900 hover:shadow-xl hover:shadow-purple-500/10"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Network className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-slate-900 dark:text-slate-100 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                      🌐 CCNA Labs
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                      Cisco Packet Tracer labs covering campus networks, enterprise designs, and complete CCNA scenarios
                    </p>
                    <div className="mt-3 text-sm font-medium text-purple-600 dark:text-purple-400 flex items-center gap-2">
                      Download labs
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>

              <Link 
                href="/docs/Python-Projects"
                className="group block p-8 border-2 border-slate-200 dark:border-slate-800 rounded-xl hover:border-emerald-500 dark:hover:border-emerald-500 transition-all duration-300 bg-white dark:bg-slate-900 hover:shadow-xl hover:shadow-emerald-500/10"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Code className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-slate-900 dark:text-slate-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                      🐍 Python Projects
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                      Security tools: network analyzers, backdoors, vulnerability scanners, ARP spoofers, and more
                    </p>
                    <div className="mt-3 text-sm font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
                      View projects
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </section>

          {/* Profile Section */}
          <section id="profile" className="pt-8 border-t border-slate-200 dark:border-slate-800">
            <Profile />
          </section>
        </div>
      </div>
    </div>
  )
}
