# PythonHacks

## Overview
This folder contains networking and packet‑level scripts that use Scapy and NetfilterQueue to inspect and modify traffic.

## How It Works
- **arp_spoof.py** builds ARP packets to spoof address mappings and includes a restore routine to reset ARP tables.
- **code_injector.py** inspects HTTP packets, removes `Accept-Encoding`, and injects content into HTML responses while adjusting headers.
- **dns_spoof.py** intercepts DNS replies and rewrites answers for a specific query name.
- **file_interceptor.py** detects requests for certain file extensions and rewrites responses to redirect downloads.
- **network_scanner.py** sends ARP requests to enumerate live hosts and prints IP/MAC pairs.
- **packet_sniffer.py** sniffs HTTP requests and checks payloads for credential keywords.
- **Socket_conn.py** runs a basic TCP server and responds to incoming requests.

## Files
- **arp_spoof.py**
- **code_injector.py**
- **dns_spoof.py**
- **file_interceptor.py**
- **network_scanner.py**
- **packet_sniffer.py**
- **Socket_conn.py**

## Notes
- Several scripts contain placeholders (e.g., `target_ip`, `gateway_ip`, `Hacker_URL`, `attacker_ip`) that must be replaced for local testing.
- Use only in authorized, controlled environments.
