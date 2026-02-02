# Python-Projects Repository

A curated collection of Python tools and scripts for cybersecurity, networking, encryption, and vulnerability analysis. This repository is organized into specialized folders, each targeting a distinct area of security research and practical application.

## Table of Contents
- [Overview](#overview)
- [Folder Structure](#folder-structure)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Overview
This repository brings together multiple Python projects designed for:
- Network analysis and scanning
- Backdoor connection and listener setup
- Packet inspection and traffic manipulation
- Malware simulation and reporting
- Vulnerability assessment

Each folder contains scripts and modules focused on a specific domain, making it easy to explore, learn, and extend security-related Python programming.

## Folder Structure

### BackDoor
- [backdoor_connect.py](BackDoor/backdoor_connect.py): TCP client that receives commands, executes them locally, and returns output.
- [listener.py](BackDoor/listener.py): TCP listener that accepts a connection and sends commands to the client.
- [README.md](BackDoor/README.md)

### Network Analyzer
- [Network_Analyzer.py](Network%20Analyzer/Network_Analyzer.py): Network traffic monitor and alerting logic.
- [README.md](Network%20Analyzer/README.md)

### PythonHacks
- [arp_spoof.py](PythonHacks/arp_spoof.py): Builds ARP responses to spoof address mappings.
- [code_injector.py](PythonHacks/code_injector.py): Modifies HTTP payloads via packet inspection and rewriting.
- [dns_spoof.py](PythonHacks/dns_spoof.py): Rewrites DNS answers for a target query name.
- [file_interceptor.py](PythonHacks/file_interceptor.py): Redirects downloads based on file extensions.
- [network_scanner.py](PythonHacks/network_scanner.py): Sends ARP requests to enumerate IP/MAC pairs.
- [packet_sniffer.py](PythonHacks/packet_sniffer.py): Sniffs HTTP requests and searches for credential keywords.
- [Socket_conn.py](PythonHacks/Socket_conn.py): Basic TCP server that responds to client requests.
- [README.md](PythonHacks/README.md)

### PythonMalware
- [download_evil_files.py](PythonMalware/download_evil_files.py): Downloads a file from a URL to disk.
- [download_execute_report.py](PythonMalware/download_execute_report.py): Downloads a file, runs a command, emails results, and cleans up.
- [execute_and_report.py](PythonMalware/execute_and_report.py): Collects Wi‑Fi profile data and emails a report.
- [keylogger.py](PythonMalware/keylogger.py): Captures keystrokes and emails reports on an interval.
- [queue_Usage.py](PythonMalware/queue_Usage.py): Demonstrates queue usage with worker threads.
- [threadingExample.py](PythonMalware/threadingExample.py): Compares single-threaded vs multi-threaded task execution.
- [README.md](PythonMalware/README.md)

### Vulnerability_Scanner
- [Network_Vuln_Scanner.py](Vulnerability_Scanner/Network_Vuln_Scanner.py): Uses `nmap` to scan targets for open ports and findings.
- [README.md](Vulnerability_Scanner/README.md)

## Usage
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/Python-Projects.git
   ```
2. Navigate to the desired folder and review the README or script comments for usage instructions.
3. Ensure you have Python 3.x installed and required dependencies (see individual script requirements).
4. Run scripts from the command line:
   ```bash
   python script_name.py
   ```

## Contributing
Contributions are welcome! Please fork the repository, create a feature branch, and submit a pull request with a clear description of your changes.

## License
This repository is licensed under the MIT License. See the LICENSE file for details.
