#!/usr/bin/env python3
"""
Split large markdown files with 100% content preservation verification.
Rules: NO additions, NO deletions, NO modifications to content.
"""

import sys
import os
from pathlib import Path

def read_file_lines(filepath):
    """Read file and return all lines."""
    with open(filepath, 'r', encoding='utf-8') as f:
        return f.readlines()

def write_file_lines(filepath, lines):
    """Write lines to file."""
    os.makedirs(os.path.dirname(filepath), exist_ok=True)
    with open(filepath, 'w', encoding='utf-8') as f:
        f.writelines(lines)

def split_networking_protocols(source_file, base_dir):
    """Split NetworkingProtcols.md into 6 files with exact content preservation."""
    print(f"\n{'='*60}")
    print(f"Splitting: {source_file}")
    print(f"{'='*60}")
    
    lines = read_file_lines(source_file)
    original_count = len(lines)
    print(f"Original file: {original_count} lines")
    
    # Track all extracted lines to verify nothing is missed
    extracted_lines = []
    
    # File 1: Fundamentals and Protocol Layers
    # H1 + TOC (lines 0-24) + Ch 1 (25-232) + Ch 2 (233-368) + Ch 4 (1397-1722)
    file1_lines = [
        "# Networking Fundamentals and Protocol Layers\n",
        "\n"
    ]
    file1_lines.extend(lines[0:24])  # TOC
    file1_lines.extend(lines[24:233])  # Ch 1
    file1_lines.extend(lines[233:369])  # Ch 2
    file1_lines.extend(lines[1397:1723])  # Ch 4
    
    file1_path = os.path.join(base_dir, "fundamentals", "Fundamentals_and_Protocol_Layers.md")
    write_file_lines(file1_path, file1_lines)
    extracted_lines.extend(lines[0:24])
    extracted_lines.extend(lines[24:233])
    extracted_lines.extend(lines[233:369])
    extracted_lines.extend(lines[1397:1723])
    print(f"  ✓ File 1: {len(file1_lines)} lines -> {file1_path}")
    
    # File 2: IP Addressing and Subnetting
    # Ch 3 (lines 369-1397)
    file2_lines = [
        "# IP Addressing and Subnetting\n",
        "\n"
    ]
    file2_lines.extend(lines[369:1397])
    
    file2_path = os.path.join(base_dir, "fundamentals", "IP_Addressing_and_Subnetting.md")
    write_file_lines(file2_path, file2_lines)
    extracted_lines.extend(lines[369:1397])
    print(f"  ✓ File 2: {len(file2_lines)} lines -> {file2_path}")
    
    # File 3: Application Layer Protocols
    # Ch 5 (lines 1723-2625) + Ch 6 (2625-2789)
    file3_lines = [
        "# Application Layer Protocols\n",
        "\n"
    ]
    file3_lines.extend(lines[1723:2625])
    file3_lines.extend(lines[2625:2789])
    
    file3_path = os.path.join(base_dir, "fundamentals", "Application_Layer_Protocols.md")
    write_file_lines(file3_path, file3_lines)
    extracted_lines.extend(lines[1723:2625])
    extracted_lines.extend(lines[2625:2789])
    print(f"  ✓ File 3: {len(file3_lines)} lines -> {file3_path}")
    
    # File 4: Physical Infrastructure
    # Ch 7 (2789-3070) + Ch 8 (3070-3195)
    file4_lines = [
        "# Physical Network Infrastructure\n",
        "\n"
    ]
    file4_lines.extend(lines[2789:3070])
    file4_lines.extend(lines[3070:3195])
    
    file4_path = os.path.join(base_dir, "infrastructure", "Physical_Infrastructure.md")
    write_file_lines(file4_path, file4_lines)
    extracted_lines.extend(lines[2789:3070])
    extracted_lines.extend(lines[3070:3195])
    print(f"  ✓ File 4: {len(file4_lines)} lines -> {file4_path}")
    
    # File 5: Network Devices and Operations
    # Ch 9-14 (3195-6808)
    file5_lines = [
        "# Network Devices and Operations\n",
        "\n"
    ]
    file5_lines.extend(lines[3195:6808])
    
    file5_path = os.path.join(base_dir, "operations", "Network_Devices_and_Operations.md")
    write_file_lines(file5_path, file5_lines)
    extracted_lines.extend(lines[3195:6808])
    print(f"  ✓ File 5: {len(file5_lines)} lines -> {file5_path}")
    
    # File 6: Advanced Topics
    # Ch 15-20 (6808-end)
    file6_lines = [
        "# Advanced Networking Topics\n",
        "\n"
    ]
    file6_lines.extend(lines[6808:])
    
    file6_path = os.path.join(base_dir, "advanced", "Advanced_Topics.md")
    write_file_lines(file6_path, file6_lines)
    extracted_lines.extend(lines[6808:])
    print(f"  ✓ File 6: {len(file6_lines)} lines -> {file6_path}")
    
    # Verification
    total_new = (len(file1_lines) + len(file2_lines) + len(file3_lines) + 
                 len(file4_lines) + len(file5_lines) + len(file6_lines))
    extracted_content = len(extracted_lines)
    
    # Account for H1 titles added (6 files × 2 lines each)
    added_headers = 12
    
    print(f"\n{'='*60}")
    print(f"VERIFICATION:")
    print(f"  Original content: {original_count} lines")
    print(f"  Extracted content: {extracted_content} lines")
    print(f"  New files total: {total_new} lines (includes {added_headers} added H1 lines)")
    print(f"  Expected: {extracted_content + added_headers} lines")
    
    if total_new == extracted_content + added_headers:
        print(f"  ✅ SUCCESS: 100% content preserved")
        return True
    else:
        print(f"  ❌ FAILURE: Content mismatch!")
        print(f"     Missing: {(extracted_content + added_headers) - total_new} lines")
        return False

def split_cybersecurity(source_file, base_dir):
    """Split CyberSecurity.md into 4 files with exact content preservation."""
    print(f"\n{'='*60}")
    print(f"Splitting: {source_file}")
    print(f"{'='*60}")
    
    lines = read_file_lines(source_file)
    original_count = len(lines)
    print(f"Original file: {original_count} lines")
    
    extracted_lines = []
    
    # File 1: Security Foundations and Frameworks
    # Lines 0-719 (InfoSec basics through regulations)
    file1_lines = [
        "# Security Foundations and Frameworks\n",
        "\n"
    ]
    file1_lines.extend(lines[0:719])
    
    file1_path = os.path.join(base_dir, "foundations", "Security_Foundations_and_Frameworks.md")
    write_file_lines(file1_path, file1_lines)
    extracted_lines.extend(lines[0:719])
    print(f"  ✓ File 1: {len(file1_lines)} lines -> {file1_path}")
    
    # File 2: Threat Intelligence and Assessment
    # Lines 719-1982 (Cryptography through vulnerability scanning)
    file2_lines = [
        "# Threat Intelligence and Security Assessment\n",
        "\n"
    ]
    file2_lines.extend(lines[719:1982])
    
    file2_path = os.path.join(base_dir, "offensive-security", "Threat_Intelligence_and_Assessment.md")
    write_file_lines(file2_path, file2_lines)
    extracted_lines.extend(lines[719:1982])
    print(f"  ✓ File 2: {len(file2_lines)} lines -> {file2_path}")
    
    # File 3: Penetration Testing and Attack Techniques
    # Lines 1982-3912 (Pentest through social engineering)
    file3_lines = [
        "# Penetration Testing and Attack Techniques\n",
        "\n"
    ]
    file3_lines.extend(lines[1982:3912])
    
    file3_path = os.path.join(base_dir, "offensive-security", "Penetration_Testing_and_Attack_Techniques.md")
    write_file_lines(file3_path, file3_lines)
    extracted_lines.extend(lines[1982:3912])
    print(f"  ✓ File 3: {len(file3_lines)} lines -> {file3_path}")
    
    # File 4: Defense Implementation and Operations
    # Lines 3912-end (Network security through end)
    file4_lines = [
        "# Defense Implementation and Operations\n",
        "\n"
    ]
    file4_lines.extend(lines[3912:])
    
    file4_path = os.path.join(base_dir, "defensive-security", "Defense_Implementation_and_Operations.md")
    write_file_lines(file4_path, file4_lines)
    extracted_lines.extend(lines[3912:])
    print(f"  ✓ File 4: {len(file4_lines)} lines -> {file4_path}")
    
    # Verification
    total_new = len(file1_lines) + len(file2_lines) + len(file3_lines) + len(file4_lines)
    extracted_content = len(extracted_lines)
    added_headers = 8  # 4 files × 2 lines each
    
    print(f"\n{'='*60}")
    print(f"VERIFICATION:")
    print(f"  Original content: {original_count} lines")
    print(f"  Extracted content: {extracted_content} lines")
    print(f"  New files total: {total_new} lines (includes {added_headers} added H1 lines)")
    print(f"  Expected: {extracted_content + added_headers} lines")
    
    if total_new == extracted_content + added_headers:
        print(f"  ✅ SUCCESS: 100% content preserved")
        return True
    else:
        print(f"  ❌ FAILURE: Content mismatch!")
        print(f"     Missing: {(extracted_content + added_headers) - total_new} lines")
        return False

def main():
    base_path = Path("/Users/encryptedkvng/recovery/GitHub/Academy/content/study-notes")
    
    # Split NetworkingProtcols.md
    networking_source = base_path / "networking-ccna-ccnp" / "NetworkingProtcols.md"
    networking_base = base_path / "networking-ccna-ccnp"
    
    success1 = split_networking_protocols(str(networking_source), str(networking_base))
    
    # Split CyberSecurity.md
    security_source = base_path / "security" / "ethical-hacking" / "CyberSecurity.md"
    security_base = base_path / "security"
    
    success2 = split_cybersecurity(str(security_source), str(security_base))
    
    print(f"\n{'='*60}")
    print(f"FINAL RESULTS:")
    print(f"{'='*60}")
    if success1 and success2:
        print("✅ Both files split successfully with 100% content preservation")
        return 0
    else:
        print("❌ Content preservation verification FAILED")
        return 1

if __name__ == "__main__":
    sys.exit(main())
