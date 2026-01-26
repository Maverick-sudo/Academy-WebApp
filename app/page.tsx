import Link from 'next/link'
import Profile from '@/components/Profile'

export default function HomePage() {
  return (
    <div className="w-full">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl py-8 lg:py-16">
        <div className="space-y-8">
          <div>
          <h1 className="text-5xl font-bold mb-4">
            Academy Documentation Hub
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Technical documentation and project repository for cybersecurity, networking, and software development
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          <Link 
            href="/docs/study-notes"
            className="block p-6 border border-gray-200 dark:border-gray-800 rounded-lg hover:border-blue-500 dark:hover:border-blue-500 transition-colors"
          >
            <h2 className="text-2xl font-semibold mb-2">📚 Study Notes</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Comprehensive notes on networking (CCNA/CCNP), security (ethical hacking, web security), and programming
            </p>
          </Link>

          <Link 
            href="/docs/automation"
            className="block p-6 border border-gray-200 dark:border-gray-800 rounded-lg hover:border-blue-500 dark:hover:border-blue-500 transition-colors"
          >
            <h2 className="text-2xl font-semibold mb-2">🤖 Automation</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Ansible-based automation for Cisco OSPF routing configurations in lab environments
            </p>
          </Link>

          <Link 
            href="/docs/CCNA-Labs"
            className="block p-6 border border-gray-200 dark:border-gray-800 rounded-lg hover:border-blue-500 dark:hover:border-blue-500 transition-colors"
          >
            <h2 className="text-2xl font-semibold mb-2">🌐 CCNA Labs</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Cisco Packet Tracer labs covering campus networks, enterprise designs, and complete CCNA scenarios
            </p>
          </Link>

          <Link 
            href="/docs/Python-Projects"
            className="block p-6 border border-gray-200 dark:border-gray-800 rounded-lg hover:border-blue-500 dark:hover:border-blue-500 transition-colors"
          >
            <h2 className="text-2xl font-semibold mb-2">🐍 Python Projects</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Security tools: network analyzers, backdoors, vulnerability scanners, ARP spoofers, and more
            </p>
          </Link>
        </div>

        <section className="mt-12">
          <Profile />
        </section>

        <div className="mt-12 p-6 bg-gray-50 dark:bg-gray-900 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">About This Hub</h3>
          <p className="text-gray-700 dark:text-gray-300">
            This documentation hub serves as a centralized knowledge base for technical projects, 
            study materials, and practical implementations across cybersecurity, networking infrastructure, 
            and software development domains.
          </p>
        </div>
        </div>
      </div>
    </div>
  )
}
