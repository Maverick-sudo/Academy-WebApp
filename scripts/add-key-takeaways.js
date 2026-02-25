const fs = require('fs');
const path = require('path');

const keyTakeaways = {
  '01-cloud-compute-basics.mdx': [
    'EC2 instances and VMs provide IaaS compute with full OS control',
    'Choose pricing models (On-Demand, Spot, Reserved) based on workload patterns',
    'Auto Scaling ensures availability while optimizing costs',
    'Instance types must match workload requirements (compute, memory, storage)',
  ],
  '02-serverless-and-containers.mdx': [
    'Serverless (Lambda, Azure Functions) eliminates infrastructure management',
    'Containers (ECS, Kubernetes) provide portability and consistent deployments',
    'Choose serverless for event-driven workloads, containers for microservices',
    'Both patterns enable automatic scaling and pay-per-use billing',
  ],
  '03-storage-fundamentals.mdx': [
    'S3/Blob Storage for object storage; EBS for block storage',
    'Match storage tier (hot, cool, archive) to access frequency',
    'Implement lifecycle policies for automated tiering and cost optimization',
    'Use encryption at rest and in transit for sensitive data',
  ],
  '04-database-services.mdx': [
    'Managed databases (RDS, Aurora, Cosmos DB) reduce operational overhead',
    'Choose relational vs. NoSQL based on data structure and query patterns',
    'Enable automated backups and multi-AZ/region replication for resilience',
    'Monitor performance metrics to right-size instances and optimize queries',
  ],
  '05-migration-and-data-transfer.mdx': [
    'Assess workloads before migration (dependencies, performance, compatibility)',
    'Use AWS Migration Hub/Azure Migrate for discovery and planning',
    'Choose transfer methods based on data size (online, offline, hybrid)',
    'Test thoroughly in target environment before cutover',
  ],
  '06-cloud-management-and-automation.mdx': [
    'Infrastructure as Code (Terraform, CloudFormation) ensures reproducibility',
    'Version control IaC templates for audit trails and rollback capability',
    'Automate deployments with CI/CD pipelines',
    'Use tagging strategies for cost allocation and resource organization',
  ],
  '07-monitoring-and-logging.mdx': [
    'Implement centralized logging (CloudWatch, Log Analytics) for all resources',
    'Set actionable alerts on key metrics (CPU, memory, error rates)',
    'Retain logs long enough for compliance and incident investigation',
    'Use dashboards for real-time visibility into system health',
  ],
  '08-security-and-identity.mdx': [
    'Apply least privilege with IAM roles and policies',
    'Enable MFA for privileged accounts',
    'Use Security Groups and Network ACLs for defense in depth',
    'Audit permissions regularly and remove unused access',
  ],
  '09-governance-and-billing.mdx': [
    'Set budget alerts to prevent cost overruns',
    'Use Cost Explorer/Azure Cost Management to identify optimization opportunities',
    'Implement organizational policies (SCPs, Azure Policy) for compliance',
    'Tag resources consistently for accurate cost allocation',
  ],
};

const dir = '/Users/encryptedkvng/recovery/GitHub/Academy/content/learn/cloud-administration';

Object.keys(keyTakeaways).forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Check if Key Takeaways already exists
  if (content.includes('## Key Takeaways')) {
    console.log(`⊘ Skipped ${file} (already has Key Takeaways)`);
    return;
  }
  
  // Add Key Takeaways section
  const takeaways = keyTakeaways[file].map(item => `- ${item}`).join('\n');
  const keyTakeawaysSection = `\n## Key Takeaways\n\n${takeaways}\n`;
  
  content = content.trim() + keyTakeawaysSection;
  
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`✓ Added Key Takeaways to ${file}`);
});

console.log('\nPhase 3b complete: All cloud-administration chapters have Key Takeaways!');
