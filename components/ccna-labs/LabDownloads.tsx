import DownloadButton from '../DownloadButton'
import { AlertCircle, ExternalLink } from 'lucide-react'
import Link from 'next/link'

const labs = [
  {
    fileName: 'CCNA_Complete_Lab.pkt',
    fileSize: '~2.3 MB',
    fileUrl: 'https://github.com/Maverick-sudo/network-engineering/raw/main/CCNA-LAB/CCNA_Complete_Lab.pkt',
    labType: 'complete' as const,
    description: 'Comprehensive CCNA lab covering all major topics including routing protocols, switching, VLANs, ACLs, NAT, and WAN technologies. Perfect for exam preparation.'
  },
  {
    fileName: 'Campus Network Design.pkt',
    fileSize: '~1.8 MB',
    fileUrl: 'https://github.com/Maverick-sudo/network-engineering/raw/main/CCNA-LAB/Campus%20Network%20Design.pkt',
    labType: 'scenario' as const,
    description: 'Real-world campus network design featuring hierarchical network architecture, redundancy, VLANs, inter-VLAN routing, and network services implementation.'
  },
  {
    fileName: 'Enterprise Networking Project.pkt',
    fileSize: '~2.1 MB',
    fileUrl: 'https://github.com/Maverick-sudo/network-engineering/raw/main/CCNA-LAB/Enterprise%20Networking%20Project.pkt',
    labType: 'scenario' as const,
    description: 'Enterprise-grade network with multiple sites, WAN connectivity, advanced routing (OSPF/EIGRP), security policies, and network services (DHCP, DNS, NTP).'
  },
  {
    fileName: 'Financial Enterprise Networking Project.pkt',
    fileSize: '~1.9 MB',
    fileUrl: 'https://github.com/Maverick-sudo/network-engineering/raw/main/CCNA-LAB/Financial%20Enterprise%20Networking%20Project.pkt',
    labType: 'scenario' as const,
    description: 'Financial sector network emphasizing security, segmentation, redundancy, and compliance. Includes DMZ, firewalls, VPNs, and secure network zones.'
  },
  {
    fileName: 'Modern Hotel Network.pkt',
    fileSize: '~1.7 MB',
    fileUrl: 'https://github.com/Maverick-sudo/network-engineering/raw/main/CCNA-LAB/Modern%20Hotel%20Network.pkt',
    labType: 'scenario' as const,
    description: 'Hospitality network design with guest Wi-Fi, IoT devices, POS systems, property management integration, and segmented network for security and performance.'
  }
]

export default function LabDownloads() {
  return (
    <div className="my-8 space-y-8">
      {/* Alert Banner */}
      <div className="flex items-start gap-3 p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
        <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="text-sm font-medium text-blue-900 dark:text-blue-100">
            Cisco Packet Tracer Required
          </p>
          <p className="text-sm text-blue-700 dark:text-blue-300">
            These lab files require Cisco Packet Tracer to open. Download the latest version from{' '}
            <Link 
              href="https://www.netacad.com/courses/packet-tracer" 
              target="_blank" 
              rel="noopener noreferrer"
              className="underline hover:text-blue-800 dark:hover:text-blue-200 font-medium inline-flex items-center gap-1"
            >
              Cisco NetAcad
              <ExternalLink className="w-3 h-3" />
            </Link>
          </p>
        </div>
      </div>

      {/* Download Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {labs.map((lab) => (
          <DownloadButton
            key={lab.fileName}
            fileName={lab.fileName}
            fileSize={lab.fileSize}
            fileUrl={lab.fileUrl}
            labType={lab.labType}
            description={lab.description}
          />
        ))}
      </div>

      {/* Additional Info */}
      <div className="mt-8 p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
          📋 Lab Requirements
        </h3>
        <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
          <li className="flex items-start gap-2">
            <span className="text-blue-500 dark:text-blue-400 font-bold">•</span>
            <span>Cisco Packet Tracer 8.0 or higher (recommended: latest version)</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-500 dark:text-blue-400 font-bold">•</span>
            <span>Basic understanding of networking concepts (TCP/IP, subnetting, routing)</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-500 dark:text-blue-400 font-bold">•</span>
            <span>Familiarity with Cisco IOS commands (or willingness to learn)</span>
          </li>
        </ul>

        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4 mt-6">
          🚀 Getting Started
        </h3>
        <ol className="space-y-2 text-sm text-slate-600 dark:text-slate-400 list-decimal list-inside">
          <li>Download and install Cisco Packet Tracer from Cisco NetAcad</li>
          <li>Click the download button for your desired lab file</li>
          <li>Open the .pkt file in Packet Tracer</li>
          <li>Explore the network topology and device configurations</li>
          <li>Follow any included instructions or documentation within the lab</li>
        </ol>

        <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-800">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            💡 <strong>Tip:</strong> Start with the "CCNA Complete Lab" for comprehensive practice, or choose specific scenarios based on your learning goals.
          </p>
        </div>

        <div className="mt-4">
          <Link
            href="https://github.com/Maverick-sudo/network-engineering/tree/main/CCNA-LAB"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
          >
            View all labs on GitHub
            <ExternalLink className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}
