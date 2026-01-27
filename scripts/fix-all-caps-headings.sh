#!/bin/bash
# Script to convert ALL-CAPS headings to Title Case in markdown files
# Usage: ./fix-all-caps-headings.sh <file_path>

FILE="$1"

if [ -z "$FILE" ]; then
    echo "Usage: $0 <markdown_file>"
    exit 1
fi

if [ ! -f "$FILE" ]; then
    echo "Error: File not found: $FILE"
    exit 1
fi

# Create backup
BACKUP="${FILE}.backup-$(date +%Y%m%d_%H%M%S)"
cp "$FILE" "$BACKUP"
echo "Created backup: $BACKUP"

# Function to convert to Title Case
to_title_case() {
    echo "$1" | awk '{
        for (i=1; i<=NF; i++) {
            word = tolower($i)
            # Preserve acronyms and special words
            if (word ~ /^(infosec|nist|csf|cia|pki|pfs|rat|ai|ml|iac|dhcp|dns|http|https|ssh|ftp|smtp|pop|imap|tcp|ip|udp|icmp|arp|nat|pam|vlan|vpn|acl|ids|ips|siem|api|url|uri|sql|xss|csrf|dos|ddos|owasp|ssl|tls|aes|rsa|sha|md5|pii|hipaa|gdpr|iso|cis|aka|etc|dhs|dod|cia|fbi|apt|ot|iot|scada|ldap|smb|ad|dc|ou|gpo|ntlm|kerberos)$/) {
                $i = toupper(word)
            }
            # Keep roman numerals uppercase  
            else if (word ~ /^(i|ii|iii|iv|v|vi|vii|viii|ix|x)$/) {
                $i = toupper(word)
            }
            # Handle hyphenated words and parentheses
            else if (word ~ /[-()]/) {
                split(word, parts, /[-()]/)
                result = ""
                for (j in parts) {
                    if (length(parts[j]) > 0) {
                        parts[j] = toupper(substr(parts[j], 1, 1)) tolower(substr(parts[j], 2))
                    }
                }
                # Reconstruct with original separators
                gsub(/-/, "-", word)
                gsub(/\(/, "(", word)
                gsub(/\)/, ")", word)
            }
            # Standard title case
            else if (i == 1 || length(word) > 3 || !(word ~ /^(a|an|and|as|at|but|by|for|in|of|on|or|the|to|up|via|vs)$/)) {
                $i = toupper(substr($i, 1, 1)) tolower(substr($i, 2))
            } else {
                $i = tolower($i)
            }
        }
        print
    }'
}

echo "Converting ALL-CAPS headings to Title Case..."

# Process the file
perl -i -pe '
    # Match H2 headings that are mostly uppercase
    if (/^## ([A-Z][A-Z\s\(\)\/&,:-]+[A-Z])$/) {
        $heading = $1;
        # Skip if already proper case
        unless ($heading =~ /[a-z]/ && $heading =~ /[A-Z]/) {
            # Convert to title case preserving acronyms
            $heading =~ s/\b(INFOSEC|NIST|CSF|CIA|PKI|PFS|RAT|AI|ML|IAC|DHCP|DNS|HTTP|HTTPS|SSH|FTP|SMTP|POP|IMAP|TCP|IP|UDP|ICMP|ARP|NAT|PAM|VLAN|VPN|ACL|IDS|IPS|SIEM|API|URL|URI|SQL|XSS|CSRF|DOS|DDOS|OWASP|SSL|TLS|AES|RSA|SHA|MD5|PII|HIPAA|GDPR|ISO|CIS|DHS|DOD|FBI|APT|OT|IOT|SCADA|LDAP|SMB|AD|DC|OU|GPO|NTLM|KERBEROS)\b/$1/g;
            $heading = lc($heading);
            $heading =~ s/\b(\w)/\U$1/g;
            # Restore acronyms
            $heading =~ s/\bInfosec\b/InfoSec/g;
            $heading =~ s/\bNist\b/NIST/g;
            $heading =~ s/\bCsf\b/CSF/g;
            $heading =~ s/\bCia\b/CIA/g;
            $heading =~ s/\bPki\b/PKI/g;
            $heading =~ s/\bPfs\b/PFS/g;
            $heading =~ s/\bRat\b/RAT/g;
            $heading =~ s/\bAi\b/AI/g;
            $heading =~ s/\bMl\b/ML/g;
            $heading =~ s/\bIac\b/IaC/g;
            $heading =~ s/\bApi\b/API/g;
            $heading =~ s/\bIot\b/IoT/g;
            $heading =~ s/\bIps\b/IPS/g;
            $heading =~ s/\bIds\b/IDS/g;
            $heading =~ s/\bAcl\b/ACL/g;
            $heading =~ s/\bUrl\b/URL/g;
            $heading =~ s/\bUri\b/URI/g;
            $heading =~ s/\bSiem\b/SIEM/g;
            $heading =~ s/\b(And|Or|Of|In|The|For|With|To)\b/\L$1/g unless $heading =~ /^\U$1/;
            $_ = "## $heading\n";
        }
    }
    
    # Match H1 CHAPTER headings
    if (/^# CHAPTER (\d+): (.+)$/) {
        $num = $1;
        $title = $2;
        $title = lc($title);
        $title =~ s/\b(\w)/\U$1/g;
        $title =~ s/\bAnd\b/and/g;
        $title =~ s/&&/and/g;
        $title =~ s/\bIac\b/IaC/g;
        $_ = "## Chapter $num: $title\n";
    }
' "$FILE"

echo "✓ Conversion complete!"
echo "Review changes with: diff $BACKUP $FILE"
echo "If satisfied, delete backup: rm $BACKUP"
