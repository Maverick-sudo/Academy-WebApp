# Academy Documentation Hub

A modern, GitBook-style documentation hub built with Next.js, deployed on Vercel.

## Features

- 📚 **Multi-Repository Documentation**: Centralized hub for study-notes, automation, CCNA-Labs, and Python-Projects
- 🎨 **Clean UI**: GitBook/GitLab-inspired design with sidebar navigation
- 🌓 **Dark Mode**: Toggle between light and dark themes
- 📱 **Responsive**: Mobile-friendly with collapsible sidebar
- 🔍 **Table of Contents**: Auto-generated TOC for easy navigation
- ⚡ **Fast**: Static generation with Next.js 14
- 🚀 **Vercel-Ready**: Optimized for Vercel deployment

## Developer Tooling

- 🔧 **Markitdown MCP (Global Only)**: Install and run the Markitdown MCP server outside this repo (e.g., via `pipx install markitdown[all]`). Do not vendor it into `package.json` or project dependencies.
- 🐍 **Python Version Requirement**: Run Markitdown under a Python version that already has published `onnxruntime` wheels (≤3.13 as of now). Python 3.14 (`cp314`) lacks compatible wheels, so the server will fail to start there.
- 📎 **Docs Link**: Follow the official Markitdown and Magika release notes for updates; update this section if/when `onnxruntime` publishes cp314 wheels.

## Mermaid Diagram Rendering

Mermaid diagrams are pre-rendered to static SVGs by GitHub Actions and committed to the repository. This keeps Vercel builds fast and reliable while serving diagrams as static assets.

If you need to regenerate diagrams locally (e.g., before testing a change), run:

- `npm run mermaid:render`

## Project Structure

`content/
├── study-notes/
│   ├── README.md ✨ (updated)
│   ├── .archive/
│   │   ├── NetworkingProtcols.md (836 KB)
│   │   └── CyberSecurity.md (556 KB)
│   ├── databases/ ✨ (new)
│   │   ├── README.md
│   │   └── SQL/
│   │       └── SQL.md
│   ├── networking-ccna-ccnp/
│   │   ├── fundamentals/ ✨ (new)
│   │   │   ├── README.md
│   │   │   ├── Fundamentals_and_Protocol_Layers.md
│   │   │   ├── Application_Layer_Protocols.md
│   │   │   └── IP_Addressing_and_Subnetting.md
│   │   ├── infrastructure/ ✨ (new)
│   │   │   ├── README.md
│   │   │   └── Physical_Infrastructure.md
│   │   ├── operations/ ✨ (new)
│   │   │   ├── README.md
│   │   │   └── Network_Devices_and_Operations.md
│   │   ├── advanced/ ✨ (new)
│   │   │   ├── README.md
│   │   │   └── Advanced_Topics.md
│   │   └── PacketTracer_EveNG_GNS3.md
│   ├── security/
│   │   ├── foundations/ ✨ (new)
│   │   │   ├── README.md
│   │   │   └── Security_Foundations_and_Frameworks.md
│   │   ├── offensive-security/ ✨ (new)
│   │   │   ├── README.md
│   │   │   ├── Threat_Intelligence_and_Assessment.md
│   │   │   └── Penetration_Testing_and_Attack_Techniques.md
│   │   ├── defensive-security/ ✨ (new)
│   │   │   ├── README.md
│   │   │   └── Defense_Implementation_and_Operations.md
│   │   ├── ethical-hacking/
│   │   │   ├── ActiveDirectoryPentest.md
│   │   │   └── EthicalHacking.md
│   │   └── web-security/
│   │       └── Owasp_Top10.md
│   ├── programming-languages/
│   │   ├── Javascript/Javascript_Intro.md
│   │   ├── PHP/PHP_Docs.md
│   │   └── python/Python_intro.md
│   ├── low-level-languages/
│   │   ├── README.md
│   │   ├── assembly-language/assembly-notes.md
│   │   └── c-cpp/c-cpp-notes.md
│   ├── web-development/
│   │   └── frontend/
│   │       ├── css/Cascading_Style_Sheet.md
│   │       ├── react/React_JSFramework.md
│   │       └── (SQL moved to databases/)
│   └── system-architecture/
│       ├── reverse-engineering/Reverse_Engineering_System_Architecture.md
│       └── system-administration/Azure_AWS.md
├── automation/
│   ├── README.md
│   └── Ansible Cisco Lab/
│       ├── 3-Router OSPF Design/ospf-lab/README.md
│       ├── 6-Router OSPF Design/README.md
│       ├── Cisco Zero Day Template/README.md
│       └── multi-site-ospf/README.md
├── CCNA-Labs/
│   ├── Packet-Tracer.md
│   ├── *.pkt
│   └── Download .pkt files: https://github.com/Maverick-sudo/network-engineering
└── Python-Projects/
    ├── README.md
    ├── Network Analyzer/README.md
    ├── Vulnerability_Scanner/README.md
    └── ...