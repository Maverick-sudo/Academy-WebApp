import Link from 'next/link'
import Profile from '@/components/Profile'
import Button from '@/components/ui/Button'
import { ArrowRight, BookOpen, Shield, Network } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="w-full">
      <div className="container mx-0 px-4 sm:px-6 lg:px-6 max-w-6xl py-8 lg:py-12">
        <div className="space-y-12">
          {/* Hero Section */}
          <section className="space-y-6 text-center max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold leading-tight bg-gradient-to-r from-blue-600 to-slate-600 dark:from-blue-400 dark:to-slate-300 bg-clip-text text-transparent">
              Technical Documentation
            </h1>
            <p className="text-lg leading-relaxed text-slate-700 dark:text-[var(--muted-foreground)]">
              Comprehensive knowledge base covering cybersecurity operations, network infrastructure automation, 
              and full-stack development. Built from hands-on experience securing systems, architecting networks, 
              and developing production applications.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link href="/docs/study-notes">
                <Button size="lg" className="gap-2">
                  Explore Documentation
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="#profile">
                <Button variant="secondary" size="lg">
                  View Professional Summary
                </Button>
              </Link>
            </div>
            
            {/* Value Indicators */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8">
              <div className="flex flex-col items-center space-y-2">
                <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                  <Shield className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-sm font-semibold text-slate-900 dark:text-[var(--card-foreground)]">Security-First</h3>
                <p className="text-sm text-slate-600 dark:text-[var(--muted-foreground)]">Penetration testing & secure development</p>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                  <Network className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-sm font-semibold text-slate-900 dark:text-[var(--card-foreground)]">Infrastructure</h3>
                <p className="text-sm text-slate-600 dark:text-[var(--muted-foreground)]">Network automation & cloud architecture</p>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-sm font-semibold text-slate-900 dark:text-[var(--card-foreground)]">Documented</h3>
                <p className="text-sm text-slate-600 dark:text-[var(--muted-foreground)]">Real-world projects & study materials</p>
              </div>
            </div>
          </section>

          {/* Content Navigation */}
          <section className="pt-12 border-t border-slate-200 dark:border-[var(--border)] text-center">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-[var(--foreground)] mb-6 relative inline-block after:absolute after:left-0 after:-bottom-2 after:h-0.5 after:w-full after:bg-blue-600/70 dark:after:bg-blue-400/60">
              Documentation & Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Link 
                href="/docs/study-notes"
                className="block p-6 border border-slate-200 dark:border-[var(--border)] rounded-lg hover:border-blue-600 dark:hover:border-blue-500 transition-colors bg-[var(--card)]"
              >
                <h3 className="text-xl font-semibold mb-2 text-slate-900 dark:text-[var(--card-foreground)]">📚 Study Notes</h3>
                <p className="text-slate-600 dark:text-[var(--muted-foreground)] leading-relaxed">
                  Comprehensive notes on networking (CCNA/CCNP), security (ethical hacking, web security), and programming
                </p>
              </Link>

              <Link 
                href="/docs/automation"
                className="block p-6 border border-slate-200 dark:border-[var(--border)] rounded-lg hover:border-blue-600 dark:hover:border-blue-500 transition-colors bg-[var(--card)]"
              >
                <h3 className="text-xl font-semibold mb-2 text-slate-900 dark:text-[var(--card-foreground)]">🤖 Automation</h3>
                <p className="text-slate-600 dark:text-[var(--muted-foreground)] leading-relaxed">
                  Ansible-based automation for Cisco OSPF routing configurations in lab environments
                </p>
              </Link>

              <Link 
                href="/docs/CCNA-Labs"
                className="block p-6 border border-slate-200 dark:border-[var(--border)] rounded-lg hover:border-blue-600 dark:hover:border-blue-500 transition-colors bg-[var(--card)]"
              >
                <h3 className="text-xl font-semibold mb-2 text-slate-900 dark:text-[var(--card-foreground)]">🌐 CCNA Labs</h3>
                <p className="text-slate-600 dark:text-[var(--muted-foreground)] leading-relaxed">
                  Cisco Packet Tracer labs covering campus networks, enterprise designs, and complete CCNA scenarios
                </p>
              </Link>

              <Link 
                href="/docs/Python-Projects"
                className="block p-6 border border-slate-200 dark:border-[var(--border)] rounded-lg hover:border-blue-600 dark:hover:border-blue-500 transition-colors bg-[var(--card)]"
              >
                <h3 className="text-xl font-semibold mb-2 text-slate-900 dark:text-[var(--card-foreground)]">🐍 Python Projects</h3>
                <p className="text-slate-600 dark:text-[var(--muted-foreground)] leading-relaxed">
                  Security tools: network analyzers, backdoors, vulnerability scanners, ARP spoofers, and more
                </p>
              </Link>
            </div>
          </section>

          <section id="profile" className="pt-12 border-t border-slate-200 dark:border-[var(--border)]">
            <Profile />
          </section>

          <section className="pt-12 border-t border-slate-200 dark:border-[var(--border)]">
            <h3 className="text-lg font-semibold mb-4 text-slate-900 dark:text-[var(--card-foreground)] relative inline-block after:absolute after:left-0 after:-bottom-2 after:h-0.5 after:w-full after:bg-blue-600/60 dark:after:bg-blue-400/50">
              About This Hub
            </h3>
            <div className="p-6 bg-[var(--muted)] rounded-lg">
              <p className="text-slate-700 dark:text-[var(--muted-foreground)] leading-relaxed">
                This documentation hub serves as a centralized knowledge base for technical projects, 
                study materials, and practical implementations across cybersecurity, networking infrastructure, 
                and software development domains.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
