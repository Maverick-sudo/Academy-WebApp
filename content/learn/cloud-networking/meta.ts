import type { CourseMeta } from '@/lib/learn'

const meta: CourseMeta = {
  title: 'Cloud Networking (AWS & Azure)',
  description: 'VPC/VNet design, routing, gateways, private connectivity, load balancing, and DNS across AWS and Azure.',
  chapters: [
    '01-foundations-and-global-infrastructure',
    '02-vpc-vnet-core-concepts',
    '03-routing-nat-and-route-servers',
    '04-network-security-controls',
    '05-gateways-and-vpn-connectivity',
    '06-expressroute-and-direct-connect',
    '07-advanced-networking-transit-and-virtual-wan',
    '08-load-balancing-and-traffic-management',
    '09-dns-and-cdn-services',
  ],
  duration: '8h 30m',
  difficulty: 'Intermediate',
}

export default meta

