const fs = require('fs');
const path = require('path');

const chapters = [
  { file: '01-cloud-compute-basics.mdx', title: 'Cloud Compute Basics', description: 'Understand EC2, VMs, instance types, pricing models, and compute fundamentals.' },
  { file: '02-serverless-and-containers.mdx', title: 'Serverless and Containers', description: 'Explore Lambda, ECS, Kubernetes, and container orchestration patterns.' },
  { file: '03-storage-fundamentals.mdx', title: 'Storage Fundamentals', description: 'Master S3, EBS, EFS, and cloud storage strategies for different workloads.' },
  { file: '04-database-services.mdx', title: 'Database Services', description: 'Compare RDS, DynamoDB, Aurora, and managed database options.' },
  { file: '05-migration-and-data-transfer.mdx', title: 'Migration and Data Transfer', description: 'Plan and execute workload migrations with AWS/Azure transfer services.' },
  { file: '06-cloud-management-and-automation.mdx', title: 'Cloud Management and Automation', description: 'Automate infrastructure with CloudFormation, Terraform, and IaC tools.' },
  { file: '07-monitoring-and-logging.mdx', title: 'Monitoring and Logging', description: 'Implement CloudWatch, Log Analytics, and observability best practices.' },
  { file: '08-security-and-identity.mdx', title: 'Security and Identity', description: 'Secure cloud resources with IAM, RBAC, and zero-trust principles.' },
  { file: '09-governance-and-billing.mdx', title: 'Governance and Billing', description: 'Manage costs, set budgets, and enforce organizational policies.' },
];

const dir = '/Users/encryptedkvng/recovery/GitHub/Academy/content/learn/cloud-administration';

chapters.forEach(({ file, title, description }) => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Remove the placeholder comment if it exists
  content = content.replace(/^\{\/\*\s*frontmatter removed for clean UI\s*\*\/\}\s*/m, '');
  
  // Add proper frontmatter
  const frontmatter = `---
title: "${title}"
description: ${description}
---

`;
  
  content = frontmatter + content.trim() + '\n';
  
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`✓ Added frontmatter to ${file}`);
});

console.log('\nPhase 3a complete: All cloud-administration chapters have proper frontmatter!');
