# From Packet Tracer to Multi-Vendor Labs: Understanding Virtual Images and Device Roles

Many networking learners begin with Cisco Packet Tracer, which is excellent for CCNA-level switching and routing. But once you step into more advanced labs — using EVE-NG or GNS3 or PNETLABs (virtualization platforms based on QEMU/KVM running on Ubuntu/Debian, technically Type 2 hypervisors that run on top of a Linux OS) — you’re suddenly faced with dozens of mysterious file names like:

- i86bi-linux-l2-adventerprisek9-15.1.201.bin
- asav981.qcow2
- fortios6.2.ova
- PA-VM-10.1.8.ova

It can be confusing at first, especially when you're unsure which is a router, which is a switch, or how ASA differs from Fortinet or Palo Alto.

This blog is your step-by-step map to understanding these appliances — especially how to recognize and classify them — using real images

## The Missing Link: "The Client Side Pack"

Regardless of which app you choose, clicking a router in EVE-NG won't open it automatically unless you install the "Client Side Pack." This bridges the browser telnet:// link to your terminal app.

How to set it up:

1. Download: Go to the EVE-NG Download Page and look for "Apple OSX Client Side".
2. Install: Run the installer. It includes a wrapper script.
3. Select: During installation (or in the Default Apps settings on your Mac), select SecureCRT or iTerm2 as the default handler for telnet and ssh.

This is a very common and frustrating problem for Mac users running EVE-NG! The message about "stability" you're seeing before the connection closes short is likely a generic network or operating system failure due to the older nature of the Telnet client itself on macOS.
The root cause is that since newer versions of macOS, the built-in Telnet utility has been deprecated and sometimes removed entirely. When the EVE-NG Client Pack tries to use the default telnet command on your Mac, it either uses a broken version or can't find the tool at the expected location, causing the session to fail immediately after connecting.
Here are the two steps you need to take to fix this instability issue, prioritizing the use of a more modern Telnet client:

### 1. Install/Verify a Stable Telnet Client (Homebrew)

The best fix is to install a known, stable, modern Telnet client using a package manager like Homebrew.

1. Check if Homebrew is installed: Open iTerm2 and type:

```bash
brew --version
```

2. If you get a version number, proceed. If you get a "command not found" error, install it first using the command provided on the Homebrew website.
3. Install Telnet: Run the following command in iTerm2 to install the required utility:

```bash
brew install telnet
```

4. Find the new path: Once installed, find the exact path to the new Telnet utility (it's often in /opt/homebrew/bin/telnet on newer Macs):

```bash
which telnet
```

5. Save the output of this command. You will need it in the next step.

### 2. Reconfigure iTerm2's Telnet Profile
The EVE-NG client pack relies on a custom URL scheme that tells iTerm2 (or other apps) to run a specific command. You need to ensure iTerm2 is running the correct, stable Telnet client you just installed.
1. Open iTerm2 Settings: Press Command + ,.
2. Go to the Profiles section.
3. Duplicate your Default profile and rename the new one to EVE-NG Telnet.
4. Select the EVE-NG Telnet profile and navigate to the General tab.
5. Under the Command section, you need to change the command that runs when this profile is activated.
6. Change the option from "Command" to "Custom Shell" or ensure the "Command" field has the following format (substituting the path you found in Step 1):

Your Custom Command:

```bash
/opt/homebrew/bin/telnet $$HOST$$ $$PORT$$
```

Example Path:
Replace /opt/homebrew/bin/telnet with the output you got from which telnet.

Magic Variables:
$$HOST$$ and $$PORT$$ are special iTerm2 variables that grab the IP and port from the telnet:// link.

7. Set the URL Scheme: In the same profile settings, find the URL Schemes section and ensure telnet is checked.

Reboot your Mac. This is essential to ensure the EVE-NG Client Pack's link-handling configuration updates with your new iTerm2 profile and the correct Telnet path.

By using the Homebrew version of Telnet and explicitly telling iTerm2 where to find it, you bypass the unstable system version and should resolve the disconnect issue.

This video provides troubleshooting tips for various connection issues in EVE-NG, which may offer further insight into your intermittent stability problem:

Using the public DNS resolver (8.8.8.8) is a classic trick to bypass slow DNS resolution on shared virtual NAT services, which makes package installs feel much faster.

## Understanding Cisco Image Naming & Evolution

### Cisco IOU/IOU-L2 (e.g., i86bi-linux-l2-)

- i86 = Intel x86 architecture
- bi = Built-in
- linux = Runs on Linux
- L3 Image (i86bi_Linux-L3...): This is the Router version (Layer 3).
- L2 Image (i86bi_Linux-L2...): This is the Switch version (Layer 2).
- Based on IOS on Unix (IOU): A lightweight Cisco virtual image used internally by Cisco for testing, later leaked and adopted for GNS3/EVE-NG

Use Cases: Great for VLAN, STP, OSPF, BGP labs without needing full hardware emulation.

### Cisco Images Breakdown

| Image Name | Category | Notes |
|---|---|---|
| c1700-c7200 series | IOS Routers | Legacy ISR platforms |
| IOU/i86bi-linux-l3-* | L3 Routers | Virtual routers (OSPF, BGP, EIGRP capable) |
| IOU/i86bi-linux-l2-* | L2 Switches | Emulated Catalyst-style switches |
| asav* (e.g. asav981.qcow2, asav991.qcow2) | ASA Firewall | Modern ASAv virtual firewalls |
| asa842-initrd.gz | ASA Firewall | Legacy ASA 8.x |
| FTD (if included) | NGFW | Firepower Threat Defense (optional) |

### Cisco Router Evolution: c1700 → c7200

| Image | Era | Description |
|---|---|---|
| c1700 | Early | Entry-level ISR, basic routing only |
| c2600 | Legacy | Adds modularity and more services |
| c3725 | Mid-tier | Better for EIGRP/BGP labs, still old |
| c7200 | High-end | Supports complex routing, VPN, multiple NICs |

These are router images—physical router platforms that run IOS for routing functionalities:

- c1700-adventerprisek9-mz.124-25d
- c2600-adventerprisek9-mz.124-15.T14
- c2691-adventerprisek9-mz.124-15.T14
- c3620-a3jk8s-mz.122-26c
- c3640-a3js-mz.124-25d
- c3660-a3jk9s-mz.124-15.T14
- c3725-adventerprisek9-mz.124-15.T14
- c3745-adventerprisek9-mz.124-25d
- c7200-adventerprisek9-mz.153-3.XB12
- c7200-adventerprisek9-mz.152-4.S6
- c7200-adventerprisek9-mz.124-24.T5

### Abbreviations

| Abbreviation | Full Meaning | Explanation / Usage |
|---|---|---|
| CSR1000v | Cloud Services Router 1000 Virtual | A virtualized IOS XE router used in cloud and enterprise labs; supports advanced features like VPN, MPLS, BGP |
| IOSv | Internetwork Operating System Virtual | A virtual router running IOS inside a virtual machine (QEMU); good for general routing labs |
| IOSvL2 | Internetwork Operating System Virtual Layer 2 | A virtual switch running IOS; simulates L2 switching features (basic STP, VLANs) |
| IOL | IOS on Linux | Lightweight IOS used internally by Cisco; often used in labs via .bin files (e.g., i86bi) |
| IOL-L2 | IOS on Linux Layer 2 | L2 switch simulation (VLANs, STP, EtherChannel); often more feature-rich than IOSvL2 |
| IOL-L3 | IOS on Linux Layer 3 | L3 routing simulation; lighter than CSR but still powerful for labs |
| XRv | IOS XR Virtual Router | Runs Cisco IOS XR (used in service provider gear); useful for MPLS, BGP SP simulations |
| NX-OSv | Nexus Operating System Virtual | Nexus 9000/7000 simulator; used for data center labs |
| ASA | Adaptive Security Appliance | Cisco firewall; asav is the virtual version for security labs |
| vWLC | Virtual Wireless LAN Controller | Manages wireless networks; used in wireless architecture labs |
| vNAM | Virtual Network Analysis Module | For network traffic analysis; not commonly used in most labs |
| vFMC | Virtual Firepower Management Center | Manages Firepower security devices (e.g., NGFW) |
| vFTD | Virtual Firepower Threat Defense | Unified threat firewall platform by Cisco |

### Platform Comparison

| Platform | OS Type | Target Use Case | CLI Style | Resource Usage | Best For |
|---|---|---|---|---|---|
| CSR1000v | IOS XE | Cloud/virtual branch routers | Traditional IOS-like | Medium (1-2GB RAM) | Routing, BGP, EIGRP, NAT, VPN |
| IOS XRv / XRv9000 | IOS XR | Service provider core routers | XR CLI (different flow) | High (2-3GB+) | MPLS, IS-IS, SP Labs |
| Catalyst 8000v | IOS XE | SD-WAN / advanced enterprise routing | IOS XE | Medium-High | CCNP Enterprise Core, SD-WAN concepts |
| Catalyst 9000v | IOS XE | Modern campus switches (Access/Core) | IOS XE with DNA/SD-Access | High (2-4GB RAM) | Switching + SD-Access (Advanced Labs) |
| ISRv (ISR 1000v) | IOS XE | Software-based ISR router | IOS XE | Medium | HQ/Branch routing, full IOS feature set |

## Cisco IOU Images for GNS3
These are IOU (IOS on UNIX) images used in simulation and split into Layer 2 (switching) and Layer 3 (routing) roles:

| Image Name | Role |
|---|---|
| i86bi-linux-l2-adventerprise-15.1b / …-ipbasek9-15.1g | Layer 2 switch |
| i86bi-linux-l2-upk9-12.2 / …-15.0b | Layer 2 switch |
| i86bi-linux-l3-jk9s-15.0.1 / …l3-p-15.0a / …l3-p-15.0b | Layer 3 router |
| i86bi-linux-l3-tpgen-adventerprisek9-12.4 | Layer 3 router |

## Cisco ASA Firewall Images for GNS3
ASA stands for Adaptive Security Appliance — it replaced Cisco PIX in the 2000s and became the standard Cisco firewall platform. These are firewall virtual images (ASAv or classic ASA): 

| ASA Image | Notes |
|---|---|
| asa842 | Legacy ASA (8.4.2), limited memory.<br>* asa842-initrd.gz - classic ASA 8.4.2 |
| asav981+ | Virtual ASA (ASAv), supports ASDM GUI.<br>asav981.qcow2 - ASAv 9.8.3 (also duplicate listed version 9.8.1)<br>asav991.qcow2 - ASAv 9.9.1<br>asav992-32.qcow2 - ASAv 9.9.2 |
| FTD (optional) | Firepower Threat Defense (NGFW) |

Let’s Compare on-premises Cisco ASAv (Adaptive Security Virtual Appliance) with a cloud-based Network Virtual Appliance (NVA) helps clarify how security solutions differ between traditional data centers and modern cloud environments.

## Key Differences: Cisco ASAv vs Cloud NVA

| Feature | Cisco ASAv (On-Premises) | Cloud NVA (e.g., Azure/AWS) |
|---|---|---|
| Deployment Location | Deployed on physical/virtual servers in on-prem or private cloud environments (e.g., VMware, Hyper-V, KVM) | Deployed in public cloud (Azure, AWS, GCP) within virtual networks (VNets/VPCs) |
| Purpose | Acts as a virtual firewall, VPN concentrator, IPS/IDS | Acts as a cloud firewall, router, IDS/IPS, load balancer, etc. depending on vendor |
| Control Plane | Full control over OS, updates, patches | Shared responsibility with cloud provider; some abstraction in management |
| Networking Integration | Connects to VLANs, physical interfaces, subnets in data centers | Integrates with cloud-native constructs (e.g., Azure VNet, AWS VPC) using cloud routing tables, NICs, and UDRs |
| Scalability | Manual scaling (CPU/RAM/storage) or via orchestration tools | Often scalable using cloud autoscaling groups, availability zones |
| Licensing | BYOL (Bring Your Own License) or Smart Licensing | PAYG (Pay-as-you-go) or BYOL; cloud marketplace-based licensing |
| Use Cases | Secure on-prem apps, remote access VPN, inter-DC security | Secure traffic between cloud subnets, hybrid VPN, cloud perimeter defense |
| Performance Tuning | Hardware-dependent, tuned based on hypervisor resources | Cloud resource-based (VM size/SKU), optimized for IOPS and throughput |
| High Availability (HA) | Manual configuration via clustering or failover pairs | Cloud-native HA (e.g., Azure Availability Zones, AWS Auto Recovery) or via cloud load balancers |

### Example Use Cases

Cisco ASAv (On-Prem)

- Internal network segmentation in a private data center.
- IPSec VPN termination for remote workers.
- East-west firewall inside a private VMware environment.

Cloud NVA (e.g., Cisco ASAv in Azure/AWS or native FortiGate/Checkpoint VM)

- Secure ingress/egress traffic in Azure/AWS.
- Cloud VPN gateway in a hub-and-spoke VNet topology.
- IDS/IPS filtering between workloads in different subnets.

### ASAv Can Be Both!

You can actually deploy Cisco ASAv as a Cloud NVA too. Cisco offers ASAv images in AWS and Azure marketplaces that act as cloud NVAs. In that case:

- It's still ASAv software, but running inside the cloud.
- Integrates with cloud-native routing (UDRs, NSGs, route tables).
- Useful for companies wanting to extend their Cisco-based security policies into the cloud.

## What is Catalyst Edge 8000v/9000v?

These are modern Cisco virtual routers, not switches, despite the "Catalyst" branding. These support modern features like SD-Access, high-throughput routing, and full IOS-XE support — ideal for enterprise WAN simulation, but not suitable as L2 switches. You can use IOU-L2 or Juniper vQFX when you need actual Layer 2 switch behavior.

Though labeled “Catalyst,” these vIOS-XE Catalyst images act as routers, not true L2 switching platforms. Real Catalyst switch simulation (e.g., Cat3650/3850) is typically only available via IOU images or hardware. The virtual Catalyst 8K/9K primarily supports routing, policy, QoS, security, and other network services—akin to routers

| Model | Function | Real Hardware Equivalent |
|---|---|---|
| C8000v * c8000v-17.06.03, catalyst8000v-17.04.01, catalyst8000v-17.06.01a These are software-based router appliances built on the IOS-XE platform (designed for edge/branch WAN routing). | Edge router, SD-WAN, IOS-XE | Catalyst 8000 Edge Platforms |
| CAT9Kv * cat9kv-17.10.01-prd7 This is a virtualized Catalyst 9000 series router, also IOS-XE, suited for enterprise routing and policy enforcement in virtual/cloud environments. | Core routing, policy-aware | Catalyst 9300/9400 (routing mode) |

| Image Type | Device Type | Primary Function |
|---|---|---|
| Catalyst 8000V Edge | Virtual Router | Branch/edge WAN routing (SD-WAN, secure connectivity, advanced services) |
| Catalyst 9000V | Virtual Router | Enterprise/core routing, policy management, SD-Access, virtualization use-cases |

## Notes per Vendor
Here's a comparison table between Cisco images (IOS, IOU/IOL, ASA) and equivalent images or virtual platforms from other popular network/security vendors. This covers routers, switches, and firewalls — focusing on virtual images commonly used in GNS3, EVE-NG, or labs.
### Cross-Vendor Comparison Table

| Function | Cisco (IOS/IOU/ASA) | Fortinet (FortiGate) | Palo Alto (PA-VM) | MikroTik (RouterOS) | Sophos (XG/UTM) | Juniper (vSRX/vMX) |
|---|---|---|---|---|---|---|
| Router | IOS (c1700-c7200) Great for routing protocols (OSPF, BGP, etc.) IOU L3 (i86bi-linux-l3) Lightweight, fast for GNS3/EVE labs. Limited real switching functions. | Routing + UTM | Some static/DHCP + NAT | Full router (BGP, OSPF) | Limited (mainly gateway) | vMX (full routing stack) |
| Switch | - IOU L2 (i86bi-linux-l2)- Limited L2 in vIOS | Not a switch | Not a switch | Router with bridging |  | vQFX (for switching) |
| Firewall | - ASA 8.x/9.x- ASAv (9.x series)- FTD (optional) Classic firewall, supports NAT, VPN, ACLs. ASAv adds NGFW-like features (with FirePOWER). | FortiGate VM (NGFW, UTM) *support full NGFW functionality. | PA-VM NGFW (AppID, Threats)* Requires more CPU/RAM. | Basic NAT/firewall only | Sophos XG/UTM firewall | vSRX (Juniper NGFW/IPS) |
| NGFW Features | Partial (with FirePOWER/FTD) | App control, SSL, IPS, AV | App-ID, WildFire, Threat | Basic filtering | AV, IPS, App Ctrl | Unified security + routing |
| GUI | ASA: ASDMIOS: CLI/HTTP (limited) | FortiOS Web GUI | Panorama / WebUI | WinBox + WebUI | WebAdmin | J-Web or CLI |
| License-Free Lab Use | IOU (limited), IOS (older) | FortiGate 6.2.x free eval | PA-VM trial (1 device) | RouterOS free (CHR trial) | 30-day XG Home Trial | vSRX/vMX trial |
### Device Role Breakdown with Image Options

| Role | Function | Cisco Image(s) | Other Vendor Image(s) |
|---|---|---|---|
| Edge Firewall | NGFW, NAT, VPN, ACL | asav9xx.qcow2, ASA 842, FTD (optional) | fortios.qcow2, PA-VM.ova, sophosXG.qcow2, vSRX |
| Core Router | OSPF, BGP, static routes | c7200, IOU-L3, c8000v, cat9kv | RouterOS, vMX, FortiGate (routing), PA-VM (basic) |
| L2 Switch | VLANs, trunking, STP | IOU-L2, limited L2 in cat9kv | vQFX (Juniper), MikroTik (limited bridging only) |
| PCs/Hosts | Traffic generation/testing | VPCS, TinyCore, Alpine, Windows.qcow2 | — |
| Server | Web, DNS, DHCP, AD | Alpine, Ubuntu, Windows Server | — |

## Using a Mac with EVE-NG (VMware Fusion Player)

Using a Mac with EVE-NG (running in VMware Fusion Player) is fully supported, and the process is similar to Windows. Here's how to do everything the Mac way, including the equivalent SCP/SFTP method and correct image directory paths.

### 1. Transfer Images from macOS to EVE-NG using SCP or SFTP

#### Method 1: Using Terminal (SCP)

You can use your Mac’s built-in Terminal to copy files into EVE-NG over SSH:

```bash
scp your-image-file.qcow2 root@<eve-ng-ip>:/opt/unetlab/addons/qemu/<image-folder>/
```

- Replace <eve-ng-ip> with your EVE-NG VM’s IP (e.g. 192.168.56.101)
- <image-folder> should follow naming rules like:
  - asav-981
  - iosv-152
  - fortinet-6.2.3
- Example:

```bash
scp asav981.qcow2 root@192.168.56.101:/opt/unetlab/addons/qemu/asav-981/
```

You’ll be prompted for the root password (default: eve)

#### Method 2: Using Cyberduck (GUI Alternative to FileZilla)

1. Download Cyberduck for macOS
2. Connect using:
   - Protocol: SFTP (SSH File Transfer Protocol)
   - Server: eve-ng-ip
   - Username: root
   - Password: eve
3. Navigate to: /opt/unetlab/addons/qemu/
4. Create a new folder (e.g. asav-981)
5. Upload your .qcow2 or .vmdk image inside.

### 2. Correct File Path for Router/Switch/Firewall Images

All image files go into:

/opt/unetlab/addons/qemu/<image-folder-name>/

Examples:

| Device | Folder Name | Path |
|---|---|---|
| Cisco IOSv | iosv-152 | /opt/unetlab/addons/qemu/iosv-152/ |
| Cisco IOU (L2) | i86bi-linux-l2 | /opt/unetlab/addons/iol/bin/ (different) |
| ASA Firewall | asav-981 | /opt/unetlab/addons/qemu/asav-981/ |
| Fortinet FW | fortinet-6.2 | /opt/unetlab/addons/qemu/fortinet-6.2/ |
| Palo Alto | pa-10.1.8 | /opt/unetlab/addons/qemu/pa-10.1.8/ |

### 3. After Uploading — Fix Permissions & Reload

Run these commands via SSH to fix permissions and parse the image:

```bash
/opt/unetlab/wrappers/unl_wrapper -a fixpermissions
```

Then refresh your EVE-NG web UI and the new image should appear when adding a node.

| Vendor | Device Type | OSI Layer | Examples from Repo | Notes |
|---|---|---|---|---|
| Cisco | Router | Layer 3 | iosv, iosv-l3, c7200, c3725 | Virtual and emulated routers |
| Cisco | Switch | Layer 2 | i86bi-linux-l2, iosvl2 | IOU-based and IOSv-L2 |
| Cisco | Firewall | Layer 3/4 | asav, asa842 | Cisco ASA Virtual (ASAv) |
| Juniper | Router/Switch | L2/L3 | vSRX, vMX, vQFX | vSRX = firewall, vMX = router |
| Fortinet | Firewall | Layer 3/4 | fortinet-6.x | FortiGate NGFW virtual appliances |
| Palo Alto | Firewall | Layer 3/4 | pa-vm, PA-10.1.8 | Full-featured NGFW |
| Checkpoint | Firewall | Layer 3/4 | checkpoint-R80.30 | GAiA OS-based firewall |
| Arista | Switch | Layer 2 | vEOS-lab | Used as virtual switch |
| VyOS | Router/Firewall | Layer 3 | vyos-1.1.7 | Open-source routing and firewall |
| MikroTik | Router | Layer 3 | chr-6.40.3 | Cloud Hosted Router |
| F5 | Load Balancer | Layer 4-7 | BIG-IP | Application delivery controller |
| Huawei | Router/Switch | Layer 2/3 | eNSP, AR-series, CE12800 | If supported, rare in repo |

| Device Vendor | Device Type | Folder Name | Path |
|---|---|---|---|
| Cisco | Router | iosv-152 | /opt/unetlab/addons/qemu/iosv-152/ |
| Cisco | Switch | i86bi-linux-l2 | /opt/unetlab/addons/iol/bin/ (IOU specific) |
| Cisco | Firewall | asav-981 | /opt/unetlab/addons/qemu/asav-981/ |
| Cisco | Legacy RTR | c7200 | /opt/unetlab/addons/dynamips/ (Dynamips) |
| Juniper | Firewall | vsrx-20.3R1.8 | /opt/unetlab/addons/qemu/vsrx-20.3R1.8/ |
| Juniper | Switch | vqfx-re | /opt/unetlab/addons/qemu/vqfx-re/ |
| Fortinet | Firewall | fortinet-6.2 | /opt/unetlab/addons/qemu/fortinet-6.2/ |
| Palo Alto | Firewall | pa-10.1.8 | /opt/unetlab/addons/qemu/pa-10.1.8/ |
| Checkpoint | Firewall | checkpoint-R80 | /opt/unetlab/addons/qemu/checkpoint-R80/ |
| Arista | Switch | veos-lab | /opt/unetlab/addons/qemu/veos-lab/ |
| VyOS | Router | vyos-1.1.7 | /opt/unetlab/addons/qemu/vyos-1.1.7/ |
| MikroTik | Router | chr-6.40.3 | /opt/unetlab/addons/qemu/chr-6.40.3/ |
| F5 | Load Balancer | bigip-ve | /opt/unetlab/addons/qemu/bigip-ve/ |

All legacy Cisco router platforms like c1700, c2600, c2691, c3725, and c7200 use Dynamips

Important:

- Dynamips is CPU-intensive and doesn’t scale well, making it mostly useful for small lab scenarios or legacy certification studies.
- Modern labs should use IOSv, IOSv-L3, or cat8000v where possible, especially when simulating modern features like OSPFv3, EIGRP for IPv6, or Layer 3 switching.
- IOSv/IOSv-L3/L2: Best for CCNA/CCNP route/switch training in EVE-NG — easy to set up.
- C8000v: Emulates real-world enterprise routers with full IOS XE — great for advanced WAN/SD-WAN scenarios.
- Cat9Kv: The most realistic Layer 2/3 Catalyst switch you can run virtually — excellent for enterprise switching labs.

| Platform | Model | Folder Path | Type | Notes |
|---|---|---|---|---|
| c1700 | 1710/1720 | /opt/unetlab/addons/dynamips/ | Router | Very old ISR platform, minimal features |
| c2600 | 2610/2620 | /opt/unetlab/addons/dynamips/ | Router | Better interface support, still legacy |
| c2691 | 2691 | /opt/unetlab/addons/dynamips/ | Router | Higher throughput, limited by software image |
| c3725 | 3725 | /opt/unetlab/addons/dynamips/ | Router | Supported in many CCNA/CCNP books for basic labs |
| c7200 | 7200 series | /opt/unetlab/addons/dynamips/ | Router | Highest capacity in Dynamips, supports PA interfaces |

### Calculating IDLE-PC
First time it is recommended to check Dynamips image IDLE PC usage. The Idle-PC value is a Dynamips-specific optimization setting used to reduce CPU usage when emulating Cisco routers like c7200, c3725, c1700, etc. It only applies to Dynamips images, not to modern IOSv, C8000v, or Cat9Kv platforms.

#### Why Is Idle-PC Important?
Without setting an Idle-PC value, Dynamips emulation will peg your CPU at 100% — even if the router is doing nothing. This makes the lab sluggish and can overheat or drain system resources. Idle-PC tells Dynamips which CPU instruction pattern to treat as "idle," so it can pause CPU execution when the router is idle.

#### When and How to Set Idle-PC (Mac-compatible Steps)

When?

- Only for Dynamips images: c1700, c2600, c2691, c3725, c7200
- You need to set it once per image version, and EVE-NG will reuse it

How to Set Idle-PC in EVE-NG
You'll do this through the EVE-NG web GUI after dragging a Dynamips router into your lab.

1. Start the router node (e.g., c7200) in the lab.
2. Right-click the node → choose "Idle-PC Finder"
3. EVE-NG will pause and show you a list of values (e.g., 0x6047c1f4, 0x607478cc, etc.)
4. Pick the one marked with a * (best recommended).
5. If none have a *, try the first one. Restart the node and check CPU usage.
6. If CPU usage is still high, repeat and try another value from the list.

Tip: How to Monitor CPU Usage (Mac)
Use Activity Monitor or run in Terminal:

```bash
top -o cpu
```

Look for qemu-system-x86_64 or Dynamips processes. After applying a good Idle-PC value, CPU should drop significantly.

Summary Table

| Item | Applies To | Required? | Purpose |
|---|---|---|---|
| Idle-PC Value | c1700-c7200 (Dynamips) | Yes | Prevent 100% CPU usage |
| Set From GUI | Yes (Right-click) | Yes | EVE-NG finds optimal values |
| Modern IOSv Images |  | No | Use virtualization, not emu |

IOL images must end with the “.bin” extension and must be executable. EVE-NG Pro has not required to generate iourc license. License must be stored under the same path. IOU/IOL license is bound to the hostname and domain name of the server. A test should be made to check if IOU/IOL images can run properly. Google for how to create iourc license file. Bellow is an EXAMPLE how it should look like: cat /opt/unetlab/addons/iol/bin/iourc [license] [license] Eve-ng = 972f30267ef51616; If the IOL/IOU instance doesn’t start, then you won’t be able to use IOL/IOU nodes inside EVE. This is critical knowledge for anyone using Cisco IOU/IOL images in EVE-NG Community Edition (non-Pro). Understand the licensing mechanism and setup steps for IOU/IOL images. The iourc license file belongs in the /opt/unetlab/addons/iol/ directory. Purpose: This folder holds Cisco IOL (IOS on Linux) images. iourc file: Required here to authorize and enable IOL images to run in EVE-NG.

### Additional Notes

- Make sure the iourc file is owned by root and has the correct permissions:

```bash
chown root:root /opt/unetlab/addons/iol/iourc
chmod 644 /opt/unetlab/addons/iol/iourc
```

- After placing it:

```bash
/opt/unetlab/wrappers/unl_wrapper -a fixpermissions
```

### Where exactly does the iourc file go?
Within the iol image directory (/opt/unetlab/addons/iol/), you may see two subdirectories:
- /opt/unetlab/addons/iol/bin/ - holds the actual .bin IOL images.
- /opt/unetlab/addons/iol/lib/ - rarely used unless the image depends on external libraries.
👉 The **iourc** license file does not go into bin/ or lib/. It should be placed directly in the root of the iol directory:


## Cisco IOU/IOL Image Setup in EVE-NG (Community)
IOL (IOS on Linux) or IOU (IOS on Unix) are lightweight Cisco images primarily used internally at Cisco. They’re also supported in EVE-NG, but require a license file to run in the Community Edition.

### Key Rules for IOU/IOL Setup

| Requirement | Details |
|---|---|
| File Extension | Must end with .bin (e.g., i86bi-linux-l2-ipbasek9-15.1g.bin) |
| Permissions | Must be executable (chmod +x) |
| License File | Required in Community Edition (not needed in Pro) |
| License Path | /opt/unetlab/addons/iol/bin/iourc |
| License Format | Must match the EVE-NG hostname (e.g., unl01) |
| Image Folder Location | /opt/unetlab/addons/iol/bin/ |
| Image Testing | Required to verify it runs (drag IOL into a lab and start it) |
### License File Example

Create the file at: /opt/unetlab/addons/iol/bin/iourc

With this content (example):

```text
[license]
"Hostname" = 0123456789abcdef;
```

- Replace the license key with a valid 16-character hex string (you can find generators online or in forum discussions — typically for lab use only)

### Set Executable Permissions

Make sure your IOL images are executable:

```bash
chmod +x /opt/unetlab/addons/iol/bin/*.bin
```

Also apply correct ownership (for EVE-NG compatibility):

```bash
/opt/unetlab/wrappers/unl_wrapper -a fixpermissions
```

### Verifying IOL Functionality

- After importing an IOL image and setting the license file, drag the device into a topology
- Power it on
- If it fails to boot, it likely means:
  - The license file is incorrect
  - The hostname mismatch
  - The .bin file is not executable

## Understanding QEMU Image Naming and Folder Structure in EVE-NG (Beginner Friendly Guide)
If you're new to EVE-NG and coming from tools like Cisco Packet Tracer, the transition to working with real virtual network appliances can feel overwhelming. One common issue for beginners is incorrect QEMU image folder names or filenames, which prevents appliances from showing up in the EVE-NG web UI.
In this post, you’ll learn how to correctly organize QEMU images, using reliable references from:

- EVE-NG Documentation - QEMU Image Naming

### Why Image Folder Name Matters
EVE-NG scans for specific folder names inside the directory:
/opt/unetlab/addons/qemu/
Each folder name must match EVE’s expected naming convention (usually lowercase, no spaces), or the image won’t appear in the EVE-NG UI when adding nodes to your topology.

### General Folder + File Structure
When uploading .qcow2 images to EVE-NG:
/opt/unetlab/addons/qemu/<folder_name>/<correct_image_name>.qcow2
Then run:
/opt/unetlab/wrappers/unl_wrapper -a fixpermissions
This corrects ownership and permission errors (root:root, 755).

### Folder Name and Image File Naming Table (Top QEMU Appliances)

| Device/Platform | Folder Name | Required Filename | Notes |
|---|---|---|---|
| Cisco IOSv (Router) | vios | vios.qcow2 | Lightweight IOS virtual router |
| Cisco IOSvL2 (Switch) | iol-switch | virtioa.qcow2 | L2 features, not full Cat9K |
| Cisco IOS-XRv | xrv | xrv.qcow2 | IOS-XR based image |
| Cisco CSR1000v | csr1000v | csr1000v-universalk9.qcow2 | High-end virtual router |
| Cisco ASAv | asav | asav.qcow2 | Cisco ASA virtual firewall |
| Cisco NX-OSv | nxosv | nxosv.qcow2 | Nexus platform |
| Cisco Catalyst 8000v | c8000v | c8000v-universalk9.qcow2 | Modern high-performance router |
| Cisco Catalyst 9000v | cat9kv | cat9kv.qcow2 | Enterprise-grade L2/L3 switching |
| Arista vEOS | veos | veos.qcow2 | Arista switch OS |
| Fortinet FortiGate | fortinet | fortios.qcow2 | NGFW, UTM appliance |
| Juniper vSRX | vsrx | vsrx.qcow2 | Juniper firewall platform |
| Palo Alto PAN-OS | pa | virtioa.qcow2 (rename if needed) | May require multiple interfaces |
| VyOS | vyos | virtioa.qcow2 | Open-source router |
| Checkpoint Gaia | checkpoint | virtioa.qcow2 | Used for firewall testing |

### How to Rename and Move Your Image Correctly

1. SSH into your EVE-NG VM (use Terminal or Cyberduck SCP):

```bash
ssh root@<your-EVE-IP>
```

2. Create the correct folder:

```bash
mkdir -p /opt/unetlab/addons/qemu/csr1000v
```

3. Upload and rename image:

```bash
mv csr1000v-universalk9.16.12.01.qcow2 /opt/unetlab/addons/qemu/csr1000v/csr1000v-universalk9.qcow2
```

4. Fix permissions:

```bash
/opt/unetlab/wrappers/unl_wrapper -a fixpermissions
```

### Naming Rules (Important!)

- Folder names must be exactly as listed above — case-sensitive and no spaces.
- Image files must end in .qcow2
- Do not place multiple .qcow2 files in the same folder.
- If your image still doesn’t show, double-check:
  - File extension
  - Folder spelling
  - Permissions (chmod +x is not needed for .qcow2, only .bin in IOL)

### Verify in EVE-NG UI

- Refresh your browser
- Click Add Node
- Look under the correct vendor (e.g., Cisco, Fortinet)
- Your image should appear, ready to drag into your topology!

### Bonus: Check What’s Already Installed

To list all QEMU images installed in your EVE-NG:

```bash
ls /opt/unetlab/addons/qemu/
```

### Summary for Beginners

| Key Step | What to Do |
|---|---|
| Use the right folder name | Match EVE-NG official naming convention |
| Rename .qcow2 file correctly | Use proper filename (e.g., vios.qcow2) |
| Run fixpermissions after upload | To avoid permission issues |
| Refresh EVE Web UI | Newly added images will now show up |
Here’s the updated section of your blog in Markdown format, integrating your new discovery about extracting QEMU-compatible Cisco images (ASAv, IOL-XE, IOLV2-XE) from CML’s reference platform ISO — and how to correctly rename and integrate them into EVE-NG without hitting the 5-node limit of CML.

## How I Extracted Cisco Images from CML Without the 5-Node Limit
If you’ve used Cisco Modeling Labs (CML) Free Community Edition, you’re probably aware of the 5-node restriction. But here’s a little-known hack:

The refplat.iso (Reference Platform ISO) provided with CML contains prebuilt QEMU-compatible images that work flawlessly on EVE-NG — without the CML licensing restrictions!

### Images Extracted from CML refplat.iso That Work on EVE-NG

| Image Type | Folder Name in EVE-NG | Final QEMU File Name | Notes |
|---|---|---|---|
| IOL-XE | iol-xe | virtioa.qcow2 | XE-based IOS, useful for routers |
| IOLV2-XE | iolv2-xe | virtioa.qcow2 | L2/L3 XE image, more feature-rich |
| ASAv | asav | asav.qcow2 | Virtualized ASA firewall |

### Steps to Add CML .qcow2 Images to EVE-NG Properly
These steps assume you’ve already extracted the .qcow2 files from refplat.iso.

1. SSH into Your EVE-NG VM

```bash
ssh root@<your-eve-ip>
```

2. Create the Right Folder Structure
Each image goes into a separate directory inside EVE’s QEMU structure:

```bash
mkdir -p /opt/unetlab/addons/qemu/asav
mkdir -p /opt/unetlab/addons/qemu/iol-xe
mkdir -p /opt/unetlab/addons/qemu/iolv2-xe
```

3. Move and Rename the Image
Move your .qcow2 files into the appropriate directory and rename accordingly:

```bash
mv ~/Downloads/asav-9.12.qcow2 /opt/unetlab/addons/qemu/asav/asav.qcow2
mv ~/Downloads/iol-xe-17.3.1.qcow2 /opt/unetlab/addons/qemu/iol-xe/virtioa.qcow2
mv ~/Downloads/iolv2-xe-17.3.1.qcow2 /opt/unetlab/addons/qemu/iolv2-xe/virtioa.qcow2
```

Make sure only one image per folder, and the filenames match EVE’s expectations (asav.qcow2 or virtioa.qcow2).

4. Fix Permissions

```bash
/opt/unetlab/wrappers/unl_wrapper -a fixpermissions
```

### How to Verify the Images in EVE-NG UI

1. Open the EVE-NG Web UI
2. Go to your lab topology
3. Click Add New Node
4. Select Cisco or use the search bar:
   - Search IOL-XE, IOLV2-XE, or ASAv
5. Drag them into your topology and start your lab!

These will run without CML’s 5-node restriction, giving you greater flexibility for larger simulations and practice labs.

### Bonus: Where to Find refplat.iso
This ISO is bundled with CML releases. Once downloaded, you can mount it and extract:

```bash
hdiutil mount refplat.iso  # On macOS
cp /Volumes/REFPLAT/images/*.qcow2 ~/Downloads/
```

### Summary Table of CML to EVE-NG Integration

| Source File (CML ISO) | Target Folder in EVE-NG | New Filename | Device Type |
|---|---|---|---|
| asav-9.12.qcow2 | /asav/ | asav.qcow2 | Firewall |
| iol-xe-17.3.1.qcow2 | /iol-xe/ | virtioa.qcow2 | Router |
| iolv2-xe-17.3.1.qcow2 | /iolv2-xe/ | virtioa.qcow2 | L2 Switch |
By combining these high-quality .qcow2 images from CML and correctly adapting them into your EVE-NG environment, you unlock a premium-grade lab experience — without licensing or node limits.

How are EVE-NG and PNetLab manage and share labs, both platforms are very similar (PNetLab is essentially a fork of EVE-NG, so there's a lot of shared structure under the hood).

## How EVE-NG and PNetLab Manage and Share Labs

### 1. What are .CFG files in EVE-NG?
These are the saved configurations of individual nodes (routers, switches, etc.) in your lab.

**Details:**

- When you export or save a node's config from EVE-NG, it creates a .CFG file. These are essentially device startup-configs (like show running-config).
- They’re stored in:
  - /opt/unetlab/tmp/0/<lab-ID>/<node-ID>/configs/
  - or in saved states: /opt/unetlab/labs/<your-lab-folder>/<your-node>.cfg

**Example:**
If your lab is called ccna-lab.unl, configs may be saved as:
`/opt/unetlab/labs/ccna-lab/node1.cfg`

**Use:**

- When you reboot or reopen the lab, EVE-NG uses the .cfg files to restore node states.
- You can manually edit or replace these configs to preload labs with desired router configs.

### 2. What is a .UNL file?
A .unl file is a lab topology file, written in JSON/XML-like structure but with a .unl extension. 🧠 Think of it as: “Blueprint” of the lab topology — but not the actual configs.

**Contains:**

- Node definitions (device types, image used, console port, etc.)
- Network links (how nodes are connected)
- Position info (where the icons are on the map)
- Node startup configs can be linked, but not stored directly in .unl

**Location:**

`/opt/unetlab/labs/<lab-folder>/<lab-name>.unl`

### 3. How do .UNL files relate to .CFG files?

| .UNL file | .CFG files |
|---|---|
| Describes what the lab is | Contains saved config per node |
| Includes nodes, links, images | Stores each node’s CLI state |
| Can be shared/reused easily | Must be copied to match node IDs |

If you import a .unl file, and don’t have the matching .cfg files, your nodes will start with a default (blank) config unless the .unl also specifies saved states (like snapshots or configs in the same folder).

### 4. Can you use PNetLab .UNL files in EVE-NG?
Yes, with minor tweaks. Both use the same core engine (UNetLab), and .unl file structure is nearly identical.

### Step-by-Step: Importing a PNetLab Lab into EVE-NG

Here's a simple, clean step-by-step guide to import a full PNetLab lab into EVE-NG — including .unl topology and config files — so it works correctly.

#### 1. Get the PNetLab Lab Files
Make sure you have:
- A .unl topology file (e.g. ccna-lab.unl)
- Optional configs/ folder or .cfg files (node configurations)
- A list of required image names
Example PNetLab lab folder:

```text
ccna-lab/
├── ccna-lab.unl
├── configs/          ← optional
│   ├── node1.cfg
│   └── node2.cfg
```

#### 2. Transfer the Lab to EVE-NG

1. Use SCP or WinSCP or CyberDuck(MACOS) to copy the lab folder to your EVE-NG server: /opt/unetlab/labs/
2. Navigate to /opt/unetlab/labs/
3. Drag and drop the ccna-lab/ folder

#### 3. Fix Permissions
Run the EVE-NG permission fixer:

```bash
/opt/unetlab/wrappers/unl_wrapper -a fixpermissions
```

#### 4. Match Image Names (If Needed)

Open the .unl file:

```bash
nano /opt/unetlab/labs/ccna-lab/ccna-lab.unl
```

Find lines like:

```text
<type>iou</type>
<image>i86bi-linux-l2-adventerprisek9-15.1g.bin</image>
```

Make sure the image name matches what you actually have in:
`/opt/unetlab/addons/<type>/`

You can either:

- Rename your image to match the .unl
- OR update the .unl to use your image name

#### 5. Open the Lab in EVE-NG

1. Log in to EVE-NG web UI
2. Navigate to: /Labs/ccna-lab/ccna-lab.unl
3. Open it — you should see the nodes and connections.
4. Start the nodes and check if they load configurations (from .cfg files if available)

### Optional: Verify Node Configs
If the lab included saved configs:
- Right-click a node > Start
- Open the console
- Verify the router/switch has config loaded
- If it boots to blank config, the .cfg files may be missing or mismatched


### Troubleshooting Tips

| Issue | Fix |
|---|---|
| Node shows "missing image" | Fix the image name in .unl or rename your image |
| No configs loaded | Make sure .cfg or configs/ folder exists and matches nodes |
| File not showing in GUI | Run fixpermissions and check folder structure |

### Summary

| Task | Command/Action |
|---|---|
| Upload lab | scp or WinSCP to /opt/unetlab/labs/ |
| Fix permissions | /opt/unetlab/wrappers/unl_wrapper -a fixpermissions |
| Match image names | Edit .unl or rename image files |
| Open in EVE-NG UI | Browse to the .unl in the Labs menu |
| Confirm saved configs | Ensure .cfg or configs/ matches node names/IDs |

ishare2-cli, is a powerful CLI tool designed specifically for managing EVE-NG image deployments using a shared cloud-based image repo. It's an open-source initiative from the iShare2 community, which maintains a massive repo of prepackaged, ready-to-use EVE-NG images.

### What ishare2-cli Does

| Feature | Description |
|---|---|
| 🚀 Pull images easily | Download EVE-NG images (Cisco, Palo, Fortinet, etc.) via a CLI. |
| 📦 Handles import/convert | Automatically places them in /opt/unetlab/addons/, fixes permissions, and converts images. |
| ☁️ Works great on cloud | Ideal for cloud-based EVE-NG setups (e.g., GCP, Azure, Oracle, Hetzner). |
| 📁 Search & list images | Find what’s available, filter by vendor/type, and pull only what you need. |

### Ideal Use Case for You
Since you're building labs using .unl files from PNetLab and want full control on a cloud-hosted EVE-NG server, ishare2-cli helps with:
- Instantly downloading the correct image a .unl topology needs (e.g. vios-adventerprisek9-15.9-3)
- Auto-patching EVE-NG image folders with correct naming
- Speeding up the whole import process (no more hunting for compatible .qcow2 files manually)


### Basic Setup & Usage (Simplified)

1. Install ishare2-cli:

```bash
curl -fsSL https://raw.githubusercontent.com/ishare2-org/ishare2-cli/main/install.sh | bash
```

2. Use it:

```bash
ishare2 list             # List all available images
ishare2 search cisco     # Search for Cisco images
ishare2 pull vios-l3     # Download and install the vIOS L3 image
```

Example to fix permissions (done automatically, but just in case):

```bash
/opt/unetlab/wrappers/unl_wrapper -a fixpermissions
```

### Combine with Your .UNL Labs
	0.	Import .unl lab as discussed earlier.
	0.	See what images are required.
	0.	Use ishare2-cli pull <image-name> to grab them quickly.
	0.	Start lab in EVE-NG — all nodes should be recognized.


### Is it safe to use?
- ✅ Open-source, community-maintained
- ✅ No login required
- ✅ Pulls directly from a hosted repo (like GitHub Releases/CDN)
- ✅ Used widely by the EVE-NG & PNetLab community
- 🧪 You can inspect the source if concerned about security


### Resources
- GitHub: ishare2-org/ishare2-cli
- List of supported images: ishare2 list or browse iShare2 CDN

Part 1: VPS Providers with Nested Virtualization (KVM Support)
Here is a table of cloud providers that support KVM with nested virtualization, critical for running EVE-NG and virtual router images:

| Provider | Nested Virtualization | KVM Support | Notes |
|---|---|---|---|
| Hetzner | ✅ Yes | ✅ Yes | Best value VPS in EU. Ideal for labs. |
| Vultr | ✅ Yes | ✅ Yes | Enable nested virtualization in dashboard. |
| Linode | ✅ Yes (by request) | ✅ Yes | Easy to use; support may need to enable nested VT. |
| UpCloud | ✅ Yes | ✅ Yes | High performance with custom kernel support. |
| OVHcloud | ✅ Yes | ✅ Yes | Supports nested VT via control panel. |
| Netcup | ✅ Yes | ✅ Yes | Excellent for budget labs in Europe. |
| Contabo | ✅ Yes | ✅ Yes | Massive specs for low cost; slower disks. |
| Oracle Cloud | ✅ Yes | ✅ Yes | Free tier supports nested VT (Ampere or AMD). |
| Scaleway | ✅ Yes | ✅ Yes | France-based, developer-friendly. |

| Cloud Provider | Hypervisor Used | Notes |
|---|---|---|
| Amazon AWS | Nitro Hypervisor (custom KVM) | AWS moved from Xen to Nitro, a lightweight KVM-based hypervisor with near bare-metal performance. |
| Microsoft Azure | Hyper-V + custom extensions | Azure’s base hypervisor is Hyper-V, used across VMs and AKS nodes. |
| Google Cloud | KVM (QEMU-based) | GCP uses KVM, supports nested virtualization in some VM types. |
| Oracle Cloud | Xen + KVM (for some offerings) | Xen for traditional compute; some newer offerings support KVM and bare metal. |
| IBM Cloud | KVM, PowerVM (for Power-based VMs) | IBM supports both Intel and Power architectures. |
| Alibaba Cloud | KVM | Same as GCP. Efficient for Linux-heavy workloads. |
| DigitalOcean | KVM | Lightweight and developer-friendly cloud. |

| Platform | Type | Details |
| --- | --- | --- |
| VMware Fusion | Type 2 | macOS desktop virtualization. |
| VMware Workstation | Type 2 | Windows/Linux desktop virtualization. |
| VirtualBox | Type 2 | Popular open-source hypervisor. |
| KVM/QEMU on Linux | Type 1 | Linux-native, used for EVE-NG, GNS3, lab setups. |
| Proxmox VE | Type 1 | KVM-based, runs directly on hardware. |
| ESXi | Type 1 | Direct hardware control, VMware's enterprise hypervisor. |

Direct hardware control, VMware’s enterprise hypervisor.
	Part 2: Step-by-Step Guide to Deploy EVE-NG on a Cloud VPS
Requirements:
- A VPS with: 4 vCPU, 8GB+ RAM, 40GB+ SSD, KVM + nested VT
- EVE-NG ISO: Download from eve-ng.net

### Step 1: Deploy Your VPS

- Choose a KVM VPS from any provider above.
- Enable nested virtualization if not enabled by default.

### Step 2: Upload and Mount EVE-NG ISO

- Access VPS via noVNC/console or SSH.

```bash
# Set hostname (optional)
sudo hostnamectl set-hostname eve-ng

# Install EVE-NG prerequisites
apt-get install -y wget nano

# Download and run EVE-NG installer script
wget https://www.eve-ng.net/repo/install-eve.sh
chmod +x install-eve.sh
./install-eve.sh
```

OR Upload ISO using SCP or cloud provider dashboard.

```bash
scp eve-ng.iso root@your-vps-ip:/root/
```

### Step 3: Install EVE-NG

- Boot from ISO.
- Follow installation prompts (use full disk).
- After installation, reboot and log in as root (default password: eve).

### Step 4: Basic Post-Install Config

```bash
apt update && apt upgrade -y
```

- Set static IP if needed.
- Ensure qemu-kvm, bridge-utils, virt-manager are installed.

## Part 3: Automate Image Downloads Using iShare2-CLI
iShare2-CLI GitHub

Step 1: Install Dependencies

```bash
apt install python3 python3-pip git -y
pip3 install rich requests
```

Step 2: Clone and Run

```bash
git clone https://github.com/ishare2-org/ishare2-cli.git
cd ishare2-cli
python3 ishare.py
```

Step 3: Download Images
- Run the tool and follow the terminal UI.
- It fetches router/firewall images (e.g., Cisco vIOS, FortiGate) from their open repository.
- Images are automatically placed in the correct EVE-NG folder.Part 4: Using iShare + EVE-NG Together
	0.	Create a lab in EVE-NG Web UI.
	0.	Use nodes from imported images.
	0.	Upload .unl lab files (from PNetLab if needed).
	0.	Boot and test.Optional: Upload PNetLab Topologies to EVE-NG
	0.	Copy .unl and configs/ folder into /opt/unetlab/labs/
	0.	Run fix permissions: /opt/unetlab/wrappers/unl_wrapper -a fixpermissions
	0.	Refresh EVE-NG GUI. Lab will show in the list.

Deploying EVE-NG on the cloud unlocks professional-grade labbing anywhere. Combined with tools like iShare2-CLI, you can instantly populate your lab with ready-to-use images — no need to hunt for them manually.
Whether you're migrating from Packet Tracer or scaling up from GNS3, this approach gives you a real-world simulation environment ready for CCNA/CCNP, security, and cloud hybrid labs.


## Why Automate Image Downloads?

- No more wasting hours looking for Cisco, Juniper, Fortinet, or Palo Alto images.
- Easy to integrate with your local or cloud-deployed EVE-NG instance.
- One-click download and install with proper permissions set.
- Saves time when working with prebuilt topologies (like .unl files) from PNETLab or the community.

## Prerequisites
- EVE-NG is already installed (locally via VMware or on a cloud VPS).
- SSH or terminal access to your EVE-NG shell.
- Internet access from within the EVE-NG VM.

✅ Yes, you can absolutely use ishare2-cli on your local EVE-NG VM running in VMware Fusion. In fact, this is a great way to:
- Test the setup and understand how ishare2 works.
- Download and organize images before deploying on a cloud server.
- Avoid wasting cloud resources (and cost) during your learning phase.

## Image Automation for EVE-NG with ishare2-cli
As part of my journey from Packet Tracer to EVE-NG and beyond, I quickly realized that one of the most frustrating bottlenecks was hunting for reliable and compatible device images online. Forums were inconsistent, links expired, and half the time I was unsure if the image would even work.
That all changed when I discovered ishare2-cli — an open-source CLI tool built to integrate with the iShare2 image repo. It acts like a package manager for EVE-NG device images.

### Here's How to Use ishare2-cli on Your Local VMware EVE-NG

**Prerequisites:**
- Your EVE-NG VM is running on VMware Fusion, fully installed and updated.
- You have SSH access or console access into the EVE-NG shell.
- Your EVE-NG VM has internet access (NAT or bridged network works fine).


### Step-by-Step: Installing ishare2-cli Inside Your EVE-NG VM

```bash
# Step 1: SSH into your EVE-NG VM or open terminal in console
ssh root@<eve-ip-address>

# Step 2: Download and install ishare2-cli (official repo)
apt update
apt install -y python3-pip git
git clone https://github.com/ishare2-org/ishare2-cli.git
cd ishare2-cli
chmod +x ./install.sh
./install.sh
pip3 install -r requirements.txt
Ishare2 [action]
```

📁 This tool will now be ready to download .image files directly into your /opt/unetlab/addons directory.

### Search & Pull Workflow

```bash
# Search for available images (e.g., iosv, iol, asav)
ishare2.py search iosv

# Pull a specific image from the results
ishare2.py pull dynamips | iol | qemu <ReferenceNumber>
```

### What Happens During Image Pull?
When you run pull, ishare2-cli does the following:

1. Searches for the requested image by name.
2. Downloads the .image file to the appropriate folder:
   - qemu images → /opt/unetlab/addons/qemu/
   - iol images → /opt/unetlab/addons/iol/
   - dynamips → /opt/unetlab/addons/dynamips/
3. The image is not automatically renamed or moved into a subfolder.
4. Manual step: Rename .image to virtioa.qcow2 (or required filename).
5. Create a directory for the image and move it inside:

```bash
mkdir /opt/unetlab/addons/qemu/iosv-15.6-2T
mv iosv-15.6-2T.image /opt/unetlab/addons/qemu/iosv-15.6-2T/virtioa.qcow2
```

### Final Step: Fix Permissions

```bash
/opt/unetlab/wrappers/unl_wrapper -a fixpermissions
```

This ensures the web UI can detect and launch the image.

Pro Tip — Beware of vios_l2-adventerprisek9-M
This image often hangs during boot, responds slowly, and has known limitations with EtherChannel/LACP. If you need a reliable switch lab, consider IOL L2, or newer vIOS-L2 builds instead.
⚠️ Some images like Arista vEOS use the same base image for both router and switch roles. In such cases, the folder name determines how the node appears in EVE-NG. You may need to manually rename the folder to veos or veos-router depending on your use case.
The difference between the vEOS Router and the vEOS Switch in EVE-NG lies in:

| Type | Directory Name | Role in Lab |
|---|---|---|
| Router | /opt/unetlab/addons/qemu/veos-router | L3 functionalities |
| Switch | /opt/unetlab/addons/qemu/veos | L2 switching |
🔎 Common Causes of IOL L2 Crashes - a known issue with some IOL L2 images, particularly ones like i86bi_Linux-L2-Adventerprisek9-ms.SSA.high_iron_20190423. These are often buggy or unstable in EVE-NG

| Cause | Explanation | Fix/Workaround |
|---|---|---|
| ❌ Corrupt image | Image might be partially broken during transfer or download | Try redownloading from a known stable source |
| ⚠️ Wrong platform/emulation | EVE-NG expects IOL images with specific naming & behavior | Rename correctly and ensure .bin not .qcow2 |
| ⚙️ Missing license (iourc) | IOL requires a valid iourc license file | Make sure /opt/unetlab/addons/iol/bin/iourc is present and valid |
| 🐞 Faulty build | Some images like high_iron are known to crash | Try using a more stable version like i86bi-linux-l2-adventerprisek9-15.1g.bin |
| 🚫 Wrong permissions | EVE can’t access or boot properly | Run unl_wrapper -a fixpermissions after any image work |

⚙️ Why Test Locally?
- You avoid cloud billing while learning.
- You can verify images are working (console boots up, etc).
- Once happy, you can migrate this .qcow2 library to a cloud server later.
🔢 Estimate: Number of Nodes You Can Run
Here’s a quick estimate of the types of images you can run and how many, assuming 12GB RAM assigned to EVE-NG and efficient CPU usage.

| Image Type | RAM per Node | vCPU per Node | Est. Max Nodes | Use Case |
|---|---|---|---|---|
| Cisco IOL (Layer 2/3) | 128MB-256MB | ~5-10% | 15-25 nodes | CCNA/CCNP switching/routing |
| Cisco vIOS-L2/L3 | 512MB-768MB | ~10-20% | 6-10 nodes | More realistic IOS XR labs |
| MikroTik CHR | 256MB | Low | 10-15 nodes | Routing/Firewall labs |
| FortiGate (low mem) | ~1024MB+ | Moderate | 4-6 nodes | Security labs |
| Windows 7/10 | 1.5GB-2GB | Moderate/High | 2-3 max | Heavy, only for AD/domain labs |
| Ubuntu CLI only | 512MB | Low | 6-10 nodes | Kali, OpenVPN, Auth, etc. |

No—you shouldn’t need to resort to guestfish or manually mount the QCOW2 to tweak it, as long as you’re using ishare2-cli to pull your images.
ishare2-cli already:
	0.	Downloads the image in a ready-to-use format
	0.	Places it in the correct /opt/unetlab/addons/<type>/<imagename>/ folder
	0.	Renames it to virtioa.qcow2 (or the appropriate default filename)
	0.	Leaves it fully configured for EVE-NG’s defaults
The only time you’d need to mount and edit with guestfish (or qemu-nbd, etc.) is if you want to:
- Inject custom files (license files, scripts, certificates) into the image before first boot
- Change default credentials or other OS-level settings baked into the image
- Strip out unwanted services to slim it further
But for standard lab use—especially following the EVE-NG “HowTo” docs—you can skip all that. After your ishare2 pull <image> and /opt/unetlab/wrappers/unl_wrapper -a fixpermissions, just add the node in the GUI and boot it.
If you do need to make small OS-level tweaks (e.g. adding SSH keys, custom banners), I’d recommend:

```bash
# 1. Load the image locally for editing
apt install libguestfs-tools
guestfish --ro -a virtioa.qcow2
```

```text
# 2. At the guestfish prompt:
> run
> mount /dev/sda1 /
> edit /etc/ssh/sshd_config   # or copy-in files
> exit
```
But again—not required for any ishare2-managed image that’s otherwise unmodified.

You can do all of this inside your EVE-NG VM—no need to jump back to your desktop. Here’s how:

1. Install the GuestFS Tools

```bash
# SSH into your EVE-NG VM (or open its console)
ssh root@<eve-ip>

# Install the guestfish package (it provides guestfish, virt-cat, etc.)
apt update && apt install -y libguestfs-tools
```

2. Locate Your Image File
By default, an image you pulled with ishare2-cli lives under:
/opt/unetlab/addons/<type>/<image-folder>/virtioa.qcow2
For example:
/opt/unetlab/addons/qemu/iosv-15.6-2T/virtioa.qcow2

3. Mount (Read-Write) with Guestfish
Warning: Always work on a copy of the QCOW2 if you care about the original!

```bash
# Make a copy to play safe
cd /opt/unetlab/addons/qemu/iosv-15.6-2T/
cp virtioa.qcow2 virtioa-edit.qcow2

# Launch guestfish in read-write mode
guestfish --rw -a virtioa-edit.qcow2
```

```text
# At the guestfish> prompt, run:
run                      # discover the partitions
list-filesystems         # see which device has / (e.g. /dev/sda1)
```
	0.	mount /dev/sda1 /        # mount root partition
	0.	Edit or copy files. You can use guestfish’s built-in editor or copy files in/out:

```text
edit /etc/hostname       # built-in editor
copy-in /root/mykey /root/.ssh/authorized_keys  # inject your SSH key
```

	0.	Unmount and quit:

```text
umount /
exit
```

4. Replace the Original (Optional)
Once you’ve validated your changes:

```bash
mv virtioa-edit.qcow2 virtioa.qcow2
/opt/unetlab/wrappers/unl_wrapper -a fixpermissions
```

Then boot the node in EVE-NG; it will use your edited image.

Alternative: QEMU-NBD
If you prefer, you can also use QEMU’s network block device:

```bash
modprobe nbd max_part=8
qemu-nbd --connect=/dev/nbd0 virtioa.qcow2
mount /dev/nbd0p1 /mnt
# make edits under /mnt
umount /mnt
qemu-nbd --disconnect /dev/nbd0
```

Both methods achieve the same result—pick whichever you find more comfortable.

```bash
-machine type=pc,accel=kvm \
-cpu host \
-smp cores=2,threads=1,sockets=1 \
-device virtio-scsi-pci,id=scsi0 \
-drive file=disk1.qcow2,if=none,id=hd0,cache=none,format=qcow2 \
-device scsi-hd,drive=hd0 \
-netdev type=tap,id=net0,script=/etc/qemu-ifup \
-device virtio-net-pci,netdev=net0 \
-nographic \
-serial mon:stdio \
-nodefaults \
-rtc base=utc
```

## Catalyst 8000v Version Recommendation
In EVE-NG labs you want a balance between up-to-date features and resource usage. Here’s a quick pick:

Recommendation:
- For resource-constrained setups, start with c8000v-17.04.01 (1.3 GiB).
- For production-like CCNP Enterprise labs, use c8000v-17.09.01a (1.6 GiB) as a sweet spot.
- If you need the latest enhancements, go with c8000v-17.16.01a (1.7 GiB).

## Custom QEMU Template for CSR1000v
If you’re using a custom QEMU template (shown below) and seeing CSR1000v boot failures:

```bash
-machine type=pc,accel=kvm \
-cpu host \
-serial mon:stdio \
-nographic \
-no-user-config \
-nodefaults \
-rtc base=utc
```

Recommended Template Settings
Use EVE-NG’s built-in CSR1000v template or adjust your custom stanza to include the virtio devices and proper flags:

```bash
-machine type=pc,accel=kvm \
-cpu host \
-smp cores=2,threads=1,sockets=1 \
-m 2048 \
-device virtio-scsi-pci,id=scsi0 \
-drive file=disk1.qcow2,if=none,id=hd0,cache=none,format=qcow2 \
-device scsi-hd,drive=hd0 \
-netdev type=tap,id=net0,script=/etc/qemu-ifup \
-device virtio-net-pci,netdev=net0 \
-nographic \
-serial mon:stdio \
-nodefaults \
-rtc base=utc
```
Key differences:
- -smp cores=2,threads=1,sockets=1 binds 2 vCPUs in one socket.
- -device virtio-scsi-pci and -device scsi-hd for disk bus.
- -device virtio-net-pci for network.
- -m 2048 allocates 2 GB RAM.
With these settings, CSR1000v will find its packages, start critical services (nesd, etc.), and boot cleanly.

## CSR1000v User Access Verification
On first boot, CSR1000v prompts for user access. Common credential pairs include:
Username: cisco    Password: cisco
# or sometimes
Username: admin    Password: admin
If neither pair works:
	0.	Use the VM console (right-click node > Console) to log in if possible.
	0.	At the firepower-bash prompt, enter configuration mode to reset or create a local user:

```bash
enable
configure terminal
username myuser privilege 15 secret MySecretPassword
end
write memory
```

	0.	Reconnect with your new credentials.
If you cannot reach an enable prompt, ensure your template uses the builtin CSR1000v startup configuration, or reload the node and watch for the initial banner that shows the correct default credentials.

## Recommended IOS XRv-9000 (XRv9k) Lab Images
When choosing an XRv9k build for CCNP/MPLS or service-provider labs, you want enough features to practice routing protocols (OSPF, BGP, MPLS) but not so heavy it crashes your host. Below are the disk size (for reference) and the approximate RAM you should allocate:

| Image | Disk Size | Approx. RAM Required | Feature Notes | Recommendation |
|---|---:|---:|---|---|
| iosxrv9000-7-7-1 | 1.5 GiB | 2 GiB | Early 7.x feature set; stable | ✅ Good balance of features and resources |
| iosxrv9000-7-11-1 | 1.7 GiB | 2.5 GiB | More recent bug fixes and updates | ✅ Recommended if you have extra headroom |
| xrv9k-fullk9-24.3.1 | 1.6 GiB | 3 GiB | Newest 24.x train; advanced features | ✔️ Use for feature-complete labs (if RAM allows) |
| xrv9k-fullk9-6.4.1 | 1.2 GiB | 1.5 GiB | Lightweight 6.x build | ⚡ Fast boot and minimal resources |
| xrv-k9-demo-6.3.1 | 431 MiB | 512 MiB | Demo mode (limited features) | ⚠️ Only use for very basic connectivity tests |
Recommendation:
- For CCNP/SP routing labs, start with iosxrv9000-7-7-1 (allocate 2 GiB RAM) or xrv9k-fullk9-6.4.1 (allocate 1.5 GiB RAM) for best stability.
- If you need the latest enterprise features, pick iosxrv9000-7-11-1 (2.5 GiB RAM) or xrv9k-fullk9-24.3.1 (3 GiB RAM).
- The demo build (xrv-k9-demo-6.3.1) is too limited and only requires ~512 MiB but lacks full features—avoid unless you’re only testing basic L2/L3 connectivity.

## Infra Server Images for EVE-NG
To round out your CCNA/CCNP infrastructure labs, you’ll need lightweight server images for DNS, DHCP, syslog, and Active Directory. Here are the recommended images and their pull commands:

| Server Type | Image Name | Approx. RAM | ishare2 Pull Command |
|---|---|---:|---|
| Alpine Linux | alpine-3.18-x86_64.qcow2 | 128 MiB | python3 ishare.py --pull alpine-3.18.image |
| Ubuntu Server | ubuntu-22.04-server-cloudimg | 512 MiB | python3 ishare.py --pull ubuntu-22.04.image |
| Windows Server 2019 | windows-server-2019-standard.qcow2 | 2 GiB | Manual download (Microsoft Eval ISO) |

Notes:
- Alpine is perfect for lightweight services (DNS, DHCP, syslog).
- Ubuntu Server offers richer distro support (RADIUS, NTP).
- Windows Server requires a valid ISO; upload to /opt/unetlab/addons/qemu/windows/, then convert to QCOW2.

## Converting a Windows Server ISO to QCOW2 for EVE-NG
If you already have the Windows Server ISO on your host, follow these steps inside your EVE-NG VM to create a usable QCOW2 disk image:

1. Create the target folder

```bash
mkdir -p /opt/unetlab/addons/qemu/windows/windows-server-2019-standard
```

2. Change into the folder

```bash
cd /opt/unetlab/addons/qemu/windows/windows-server-2019-standard
```

3. Copy the ISO into place

```bash
cp /path/to/windows-server-2019.iso .
```

4. Create a blank QCOW2 disk (e.g., 60 GiB)

```bash
qemu-img create -f qcow2 disk0.qcow2 60G
```

5. Install Windows via virt-install

```bash
virt-install \
  --name win2019 \
  --ram 2048 \
  --vcpus 2 \
  --disk path=disk0.qcow2,format=qcow2 \
  --cdrom windows-server-2019.iso \
  --os-type windows \
  --os-variant win2k19 \
  --network network=default,model=virtio \
  --graphics none \
  --boot cdrom,hd
```

6. Complete the Windows GUI install via VNC or serial console.

7. Fix permissions and rename for EVE-NG

```bash
/opt/unetlab/wrappers/unl_wrapper -a fixpermissions
```

8. Add the node in the EVE-NG GUI
- Choose QEMU > Windows > Windows Server 2019
- Assign disk0.qcow2 as the image
Your Windows Server VM will now boot from the installed QCOW2 disk. This approach avoids manual conversion pitfalls and ensures a fully installed, persistent OS in EVE-NG.

This series of commands sets up a virtualized Ubuntu 16.04 desktop environment inside EVE-NG, using QEMU for virtualization. Here's what each step does, with an explanation of how it relates to virtualization concepts like VMDK in VMware Fusion:

## Ubuntu 16.04 Desktop in EVE-NG (QEMU) — Step-by-Step Breakdown

1. Rename ISO image

```bash
mv ubuntu-16.04.2-desktop-amd64.iso cdrom.iso
```

- This renames the Ubuntu ISO file to cdrom.iso.
- EVE-NG expects a file named cdrom.iso when booting a VM from an ISO during the first boot.
- The ISO acts like a virtual DVD drive.

2. Navigate to QEMU image directory for the VM template

```bash
cd /opt/unetlab/addons/qemu/linux-ubuntu-desktop-16.04.02/
```

- This is the path where EVE-NG stores its QEMU-based VM images (one folder per node/template).
- You're entering the directory specific to your custom Ubuntu Desktop node.

3. Create a virtual hard drive

```bash
/opt/qemu/bin/qemu-img create -f qcow2 virtioa.qcow2 30G
```

- This is the key step: you're creating a virtual hard disk for your Ubuntu node.
- qcow2 is QEMU’s advanced disk format (similar to .vmdk in VMware).
- It supports compression, snapshots, and dynamic sizing.
- virtioa.qcow2 is the name of the disk. "Virtio" refers to a high-performance virtualized driver used in KVM/QEMU VMs.
- 30G specifies a max disk size of 30 GB (like allocating a 30 GB VMDK in VMware Fusion).
- This is what Ubuntu will install onto during the first boot from the ISO.

### Comparison to VMware Fusion
Think of this as creating a new .vmdk for a VMware VM before installing an OS. You're defining how much space the VM can use, but actual disk usage grows as needed.

4. Create a lab and add the node
- You now go into EVE-NG's web interface and create a lab.
- Add a node that uses the linux-ubuntu-desktop-16.04.02 QEMU template.
- When this node boots, it will load the cdrom.iso to install Ubuntu onto virtioa.qcow2.

5. Remove the ISO after installation

```bash
rm -f cdrom.iso
```

- After the OS has been installed onto the virtual hard disk, the ISO is no longer needed.
- Removing it simulates "ejecting the installation disc."
- Ensures the VM boots from the disk next time instead of looping back to the ISO.

This summary is conceptually identical to:
- Creating a new virtual disk (VMDK) in VMware,
- Mounting an ISO to boot and install the OS, and
- Removing the ISO after installation to boot normally from the virtual hard disk.
But here you're doing it manually with QEMU inside EVE-NG, which runs as a nested virtualization environment (on top of VMware, Proxmox, etc.).


Absolutely! Here's a unified, clean, custom guide for installing your own Linux or Windows Server host in EVE-NG, abstracted from the official EVE-NG documentation. It works for both platforms and is structured for reuse with minimal manual steps.

## EVE-NG Custom Image Installation Guide (Linux or Windows Host)

✅ Applies to: Linux Desktops, Linux Servers, Windows Desktop, Windows Server
🖥 Tested with: Ubuntu, Kali, TinyCore, Windows 10/11, Server 2016/2019/2022

### Step 1: Prepare Environment & ISO

```bash
# Upload the ISO to EVE via SCP (e.g., using FileZilla or scp)
scp your-image.iso root@<eve-ng-ip>:/opt/unetlab/addons/qemu/

# Rename ISO to cdrom.iso
mv your-image.iso cdrom.iso
```

### Step 2: Create the Image Folder
Use naming convention: linux-[name]-version or windows-[name]-version.

```bash
mkdir /opt/unetlab/addons/qemu/<custom-folder-name>
mv cdrom.iso /opt/unetlab/addons/qemu/<custom-folder-name>/
cd /opt/unetlab/addons/qemu/<custom-folder-name>
```

✅ Example:

```bash
mkdir /opt/unetlab/addons/qemu/linux-kali-2022.1
mv kali-linux-2022.1-installer-amd64.iso /opt/unetlab/addons/qemu/linux-kali-2022.1/cdrom.iso
```


### Step 3: Create HDD (qcow2 format)
Choose desired size (e.g., 40 GB for Windows, 15-30 GB for Linux).

```bash
/opt/qemu/bin/qemu-img create -f qcow2 virtioa.qcow2 30G
```

### Step 4: Boot and Install OS
	0.	Open EVE Web UI
	0.	Create a new Lab
	0.	Add Node using the name of the folder you created
	0.	Start the VM — it will boot from the ISO
	0.	Install the OS manually
- For Linux: Install to /dev/vda
- For Windows: Use the VirtIO drivers if required

### Step 5: Post-Install Cleanup (Commit)
After the OS is installed:
	0.	Power off the VM
	0.	SSH back into EVE and run:

```bash
cd /opt/unetlab/addons/qemu/<your-image-folder>
rm -f cdrom.iso
/opt/unetlab/wrappers/unl_wrapper -a fixpermissions
```
✅ This finalizes the image so it can be cloned as a reusable node.
Boot Kali VM in your EVE-NG lab with the cdrom.iso attached
Install Kali to the virtioa.qcow2 hard disk
- This is the key step — ensure Kali is fully installed onto the virtual HDD
Reboot Kali
- During reboot, Kali should boot from virtioa.qcow2, not the ISO
- If it boots correctly and logs you into the installed OS, the ISO is no longer needed
✅ At this point, you can safely delete cdrom.iso


### Optional Enhancements

#### For Windows

- Use VirtIO drivers during install: Download Red Hat VirtIO ISO
- Place the ISO alongside your main one:

```bash
mv virtio-win.iso /opt/unetlab/addons/qemu/<your-image-folder>/
```

- Load it during Windows install for disk/network drivers.

#### For Cloud-Like Linux

- Pre-install qemu-guest-agent
- Configure SSH access or cloud-init (advanced)

### Final Test
	0.	Add the node to a new lab
	0.	Boot it — confirm it loads from disk (virtioa.qcow2)
	0.	Save it as part of your personal reusable image library


### Naming Convention (Recommended)

| OS Type | Example Folder Name |
|---|---|
| Linux | linux-ubuntu-server-22.04 |
| Linux | linux-kali-rolling-2024 |
| Windows | windows-server-2022 |
| Windows | windows10-enterprise-21h2 |

### Script Template (Advanced Automation)
You can turn this into a shell script:

```bash
#!/bin/bash
# Custom EVE-NG image initializer

read -p "Enter image folder name (e.g., linux-ubuntu-server-22.04): " IMGDIR
read -p "Enter HDD size (e.g., 30G): " SIZE

mkdir -p /opt/unetlab/addons/qemu/$IMGDIR
mv cdrom.iso /opt/unetlab/addons/qemu/$IMGDIR/
cd /opt/unetlab/addons/qemu/$IMGDIR
/opt/qemu/bin/qemu-img create -f qcow2 virtioa.qcow2 $SIZE
/opt/unetlab/wrappers/unl_wrapper -a fixpermissions

echo "✅ Folder $IMGDIR is ready. Add to a lab and install OS."
```


Quick summary of what that means:
- When you boot into emergency mode (via GRUB or a recovery environment), you’re actually running a minimal Linux shell on your real system, but without starting all the usual services.
- You have direct access to your files (like /etc/network/interfaces) and can edit them to fix problems blocking normal boot.
- So yes, you are “in” your Linux filesystem, but it’s a minimal environment designed for troubleshooting.

How to ask an AI to get the recovery steps again:
Try asking something like:
- “How do I recover a Linux system that won’t boot because of a bad network config?”
- “Steps to boot into emergency mode on Ubuntu/EVE-NG and fix /etc/network/interfaces”
- “How to fix networking errors causing systemd networking service failure on Linux?”
- “How to repair broken network config in Linux when system won’t start networking?”

Explanation:
- eth0 and eth1 are the physical NICs on your EVE-NG host.
- pnet0 and pnet1 are Linux bridge interfaces connected to eth0 and eth1 respectively.
- Both bridges are set to get IP via DHCP from your home LAN/network (or wherever your EVE-NG host is connected).
- This allows your VMs or nodes attached to these clouds (pnet0, pnet1) to get IPs from your DHCP server and access the internet.
- bridge_fd 0 disables forwarding delay (good for faster bridge startup).

Troubleshooting tips:
- Make sure eth0 and eth1 are physical interfaces actually present on your host (ip link show).
- Make sure your DHCP server is active on the physical network your EVE-NG host is connected to.
- If you want to use only one interface, configure only pnet0 as above.
- Don’t mix manual and dhcp on the same interface in confusing ways; keep physical interfaces manual, bridges dhcp.

A clear explanation of how macOS turns bridge101 into a NAT gateway and what it means for your EVE-NG lab:

Think of a server—the hardware—as one computer. It can be one of the blades, a powerful computer you can buy at the local computer store... whatever. Traditionally, when you think of one server, that one server runs one OS. Inside, the hardware includes a CPU, some RAM, some kind of permanent storage (like disk drives), and one or more NICs. And that one OS can use all the hardware inside the server and then run one or more applications.
With the physical server model shown in Figure 15-2, each physical server runs one OS, and that OS uses allthe hardware in that one server. That was true of servers in the days before server virtualization. Today, most companies instead create a virtualized data center. That means the company purchases server hardware, installs it in racks, and then treats all the CPU, RAM, and so on as capacity in the data center. Then, each OS instance is decoupled from the hardware and is therefore virtual (in contrast to physical). Each piece of hardware that we would formerly have thought of as a server runs multiple instances of an OS at the same time, with each virtual OS instance called a virtual machine, or VM.
A single physical host (server) often has more processing power than you need for one OS. Thinking about processors for a moment, modern server CPUs have multiple cores (processors) in a single CPU chip. Each core may also be able to run multiple threads with a feature called multithreading. So, when you read about a particular Intel processor with 8 cores and multithreading (typically two threads per core), that one CPU chip can execute 16 different programs concurrently. The hypervisor (introduced shortly) can then treat each available thread as a virtual CPU (vCPU) and give each VM a number of vCPUs, with 16 available in this example.
A VM—that is, an OS instance that is decoupled from the server hardware—still must execute on hardware. Each VM has configuration as to the minimum number of vCPUs it needs, minimum RAM, and so on. The virtualization system then starts each VM on some physical server so that enough physical server hardware capacity exists to support all the VMs running on that host. So, at any one point in time, each VM is running on a physical server, using a subset of the CPU, RAM, storage, and NICs on that server. To make server virtualization work, each physical server (called a host in the server virtualization world) uses a hypervisor. The hypervisor manages and allocates the host hardware (CPU, RAM, etc.) to each VM based on the settings for the VM. Each VM runs as if it is running on a self-contained physical server, with a specific number of virtual CPUs and NICs and a set amount of RAM and storage. For instance, if one VM happens to be configured to use four CPUs, with 8 GB of RAM, the hypervisor allocates the specific parts of the CPU and RAM that the VM actually uses. Server virtualization tools provide a wide variety of options for how to connect VMs to networks. Normally, an OS has one NIC, maybe more. To make the OS work as normal, each VM has (at least) one NIC, but for a VM, it is a virtual NIC. (For instance, in VMware’s virtualization systems, the VM’s virtual NIC goes by the name vNIC.)
Finally, the server must combine the ideas of the physical NICs with the vNICs used by the VMs into some kind of a network. Most often, each server uses some kind of an internal Ethernet switch concept, often called (you guessed it) a virtual switch, or vSwitch. Interestingly, the vSwitch can be supplied by the hypervisor vendor or by Cisco. For instance, Cisco offers the Nexus 1000VE virtual switch (which replaces the older and popular Nexus 1000V virtual switch). The Nexus 1000VE runs the NX-OS operating system found in some of the Cisco Nexus data center switch product line.
The vSwitch shown in Figure 15-4 uses the same networking features you now know from your CCNA studies; in fact, one big motivation to use a vSwitch from Cisco is to use the same networking features, with the same configuration, as in the rest of the network. In particular:
Ports connected to VMs: The vSwitch can configure a port so that the VM will be in its own VLAN, or share the same VLAN with other VMs, or even use VLAN trunking to the VM itself.
Ports connected to physical NICs: The vSwitch uses the physical NICs in the server hardware so that the switch is adjacent to the external physical LAN switch. The vSwitch can (and likely does) use VLAN trunking.
Automated configuration: The configuration can be easily done from within the same virtualization software that controls the VMs. That programmability allows the virtualization software to move VMs between hosts (servers) and reprogram the vSwitches so that the VM has the same networking capabilities no matter where the VM is running.


## VMware Fusion Network Adapters: Complete Technical Guide

### Core Concept: Physical vs Virtual Networks

**The Foundation:**

- Physical adapters = Hardware on your Mac (WiFi, Ethernet, USB-C)
- Virtual networks = Software-created networks by VMware (vmnet1, vmnet8, etc.)
- Bridge interfaces = Connect VMs to networks (pnet0, pnet1, pnet2 in EVE-NG)

### The Three Network Adapter Types

#### 1. NAT (Network Address Translation)

**What it is:**

- VMware creates a private virtual network with its own DHCP server
- A virtual NAT router translates VM traffic to your Mac's IP
- VMs share your Mac's internet connection (hidden behind NAT)

**Network topology:**

```text
Internet → Mac (172.20.10.3) → NAT Router (192.168.33.2) → vmnet8 (192.168.33.1) → VM
```

**Characteristics:**

- VMs get internet access
- VMs are hidden from external network (security)
- Independent of Mac's physical network
- VMs don't appear on your home/office network
- External devices cannot initiate connections to VMs

**Example (your Mac):**

- Network: 192.168.33.0/24
- Your Mac interface: 192.168.33.1
- NAT gateway: 192.168.33.2
- DHCP range: 192.168.33.128-254
- EVE-NG gets: 192.168.33.130 (DHCP)

#### 2. Host-Only

**What it is:**

- VMware creates an isolated private network
- Only your Mac and VMs can communicate
- Completely cut off from internet and external networks

**Network topology:**

```text
        ISOLATED BUBBLE
    +-------------------+
    | Mac ↔ VM          |
    | No internet       |
    | No home network   |
    +-------------------+
```

**Characteristics:**

- Complete isolation (security for dangerous tests)
- VMs can talk to each other and Mac
- Stable IPs under your control
- No internet access
- No access to home/office network

**Example (your Mac):**

- Network: 172.16.47.0/24
- Your Mac interface: 172.16.47.1
- DHCP range: 172.16.47.128-254
- No NAT, no gateway to outside

#### 3. Bridged

**What it is:**

- VM adapter connects DIRECTLY to one of your Mac's physical adapters
- VM appears as a real device on that physical network
- Acts like plugging a physical cable into your network

**Network topology:**

```text
Home Router → Mac's WiFi adapter → VM (gets IP from home router)
```

**Characteristics:**

- VMs appear on real network (same as your Mac)
- Direct internet access (no NAT)
- External devices can reach VMs
- Depends on Mac having active physical connection
- Exposed to network (less secure)

**Critical constraint:**

- Can only bridge to physical adapters that are ACTIVE
- Multiple bridged adapters share the SAME physical connection unless Mac has multiple active connections

### How Devices "See" Each Other

**Same Cloud/Network**

```text
pnet0 (192.168.33.0/24) acts as Layer 2 switch
	|
	+--- R1 (192.168.33.201)
	+--- R2 (192.168.33.202)
```

Result: R1 and R2 CAN communicate (same broadcast domain)
Why: pnet0 is a bridge - all connected devices are on the same "virtual wire"

**Different Clouds/Networks**

```text
pnet0 (192.168.33.0/24)     pnet2 (10.200.200.0/24)
	|                            |
   R1                           R2
```

Result: R1 and R2 CANNOT communicate (separate Layer 2 domains)
Why: The two bridges are completely separate - no connection between them

To enable communication, you need:
- Routing enabled on EVE-NG host (iptables forwarding), OR
- A router device with interfaces in both networks

### Your MacBook's Current Network Configuration

**Physical Reality**

```text
SmartPhone Hotspot: 172.20.10.0/28
	└── Your Mac: 172.20.10.3 (ONLY active internet connection)

WiFi (en0): INACTIVE
Ethernet (en1): INACTIVE
```

**VMware Virtual Networks**

```text
vmnet8 (NAT):
- Network: 192.168.33.0/24
- Mac interface: 192.168.33.1
- NAT gateway: 192.168.33.2
- DHCP: 192.168.33.128-254
- Purpose: Management + Internet

vmnet1 (Host-only):
- Network: 172.16.47.0/24
- Mac interface: 172.16.47.1
- DHCP: 172.16.47.128-254
- Purpose: Isolated lab environment
```

**EVE-NG Mapping**

```text
pnet0 (eth0) → vmnet8 → 192.168.33.130 (has internet)
pnet1 (eth1) → vmnet1 → Not configured yet
pnet2 (eth2) → Not assigned → Not configured yet
```

### The Physical Adapter Constraint (Key Insight)

Question that caused confusion: "If I have 2 bridged adapters, do they get separate networks?"
Answer depends on physical reality:

**Scenario A: Only SmartPhone Hotspot Active (Your Current State)**

Mac has ONE active connection: SmartPhone Hotspot (172.20.10.0/28)

```text
Bridged Adapter 1 → SmartPhone Hotspot (172.20.10.x)
Bridged Adapter 2 → SmartPhone Hotspot (172.20.10.x)  SAME NETWORK!
```

Result: Both on 172.20.10.0/28 - they CAN communicate
Limitation: Only 14 usable IPs (.1 to .14) - very small!

**Scenario B: WiFi + SmartPhone Hotspot Both Active**

Mac has TWO active connections:

```text
├── WiFi: 192.168.1.0/24
└── SmartPhone: 172.20.10.0/28

Bridged Adapter 1 → WiFi (192.168.1.x)
Bridged Adapter 2 → SmartPhone (172.20.10.x)  DIFFERENT NETWORKS!
```

Result: Separate networks - they CANNOT communicate directly
Key principle: Bridged mode is limited by physical adapters. NAT and Host-only are not.

### Doubling Network Adapters: Consequences & Advantages

#### Adding 2 NAT Adapters

Default behavior:

- Both connect to same vmnet8 (192.168.33.0/24)
- Get different IPs from same DHCP pool
- Devices on both CAN communicate (same subnet)

To separate them: Create vmnet9 in /Library/Preferences/VMware Fusion/networking:

```text
answer VNET_9_DHCP yes
answer VNET_9_HOSTONLY_NETMASK 255.255.255.0
answer VNET_9_HOSTONLY_SUBNET 10.10.10.0
answer VNET_9_NAT yes
answer VNET_9_VIRTUAL_ADAPTER yes
```

Result:

- vmnet8: 192.168.33.0/24 (internet via NAT)
- vmnet9: 10.10.10.0/24 (separate internet via NAT)
- Devices on different networks CANNOT communicate

Use case: Simulate different ISPs, separate internet connections

#### Adding 2 Host-Only Adapters

Default behavior:

- Both connect to same vmnet1 (172.16.47.0/24)
- Get IPs from same DHCP pool or static
- Devices on both CAN communicate (same subnet)

To separate them: Create vmnet2:

```text
answer VNET_2_DHCP no
answer VNET_2_HOSTONLY_NETMASK 255.255.255.0
answer VNET_2_HOSTONLY_SUBNET 10.100.100.0
answer VNET_2_VIRTUAL_ADAPTER yes
```
Result:

- vmnet1: 172.16.47.0/24 (isolated Site A)
- vmnet2: 10.100.100.0/24 (isolated Site B)
- Complete separation - perfect for multi-site labs

Use case: Separate headquarters and branch networks, multi-tenant simulations

#### Adding 2 Bridged Adapters

Behavior depends on Mac's physical connections:
One physical connection: Both share same network Two physical connections: Can be on different networks

VMware allows:

- 1 Host-Only DHCP
- 1 NAT DHCP

Not 2 Host-Only DHCPs or 2 NAT DHCPs
Because on macOS VMware, only one Host-Only network is allowed to run a DHCP service reliably.
Rule to remember (important): Cloud with DHCP → dynamic nodes, Cloud without DHCP → static only

Routers on cloudX->pnetX must be STATIC, if PnetX is without DHCPs

**Summary (straight to the point):**

For an Ansible node on a management network (NAT or host-only) to reach devices on isolated host-only networks in an EVE lab:

1. Enable IP forwarding on the EVE VM.
2. Do not rely on DHCP on isolated host-only networks; assign static IPs.
3. The no ip address dhcp command must come BEFORE your static IP!
4. Add explicit routes on the Ansible node pointing each isolated network to the EVE VM’s IP on the management0 network.
5. Ensure return paths exist by adding routes on lab nodes back to the EVE VM, add “ip route xxx xxx“ to Export.cfg.
6. Isolation between lab networks remains intact; EVE acts as the management-plane router only.

This allows full Ansible access without breaking host-only isolation or VMware NAT constraints.

**Summary:**

| Mac's Active Connections | Bridged Adapter 1 | Bridged Adapter 2 | Can Separate? |
| --- | --- | --- | --- |
| SmartPhone only | 172.20.10.x | 172.20.10.x | No |
| SmartPhone + WiFi | 172.20.10.x | 192.168.1.x | Yes |
| WiFi + Ethernet | 192.168.1.x | 10.0.0.x | Yes |


### Switch Management: The SVI Confusion

Question that caused confusion: "How do I configure switches via Ansible if they don't get IPs from Cloud0 like routers do?"

The difference:

**Routers**

```text
interface GigabitEthernet0/0
 ip address 192.168.33.201 255.255.255.0   ← IP on physical port
```

**Switches**

```text
interface GigabitEthernet0/0
 switchport mode access                     ← NO IP (Layer 2 only)
 switchport access vlan 1

interface Vlan1                             ← IP on SVI (virtual interface)
 ip address 192.168.33.221 255.255.255.0
```

Why:
- Physical switch ports operate at Layer 2 (MAC addresses)
- Management IP goes on SVI (Switch Virtual Interface)
- SVI is tied to a VLAN, not a physical port
Traffic flow for switch management:
Ansible (192.168.33.10)
    → Cloud0
    → Switch Gi0/0 (switchport, no IP)
    → VLAN 1 (default VLAN)
    → SVI Vlan1 (192.168.33.221)
    → Switch CPU responds to SSH

### Network Type Comparison Table

| Feature | NAT | Host-Only | Bridged |
| --- | --- | --- | --- |
| Internet access | Yes (via NAT) | No | Yes (direct) |
| Mac can reach VM | Yes | Yes | Yes |
| VM appears on home network | No | No | Yes |
| Isolation from external | High | Complete | None |
| Depends on physical adapter | No | No | Yes |
| Can create multiples easily | Yes | Yes | Only if multiple physical |
| DHCP included | Yes | Yes | From external router |
| IP assignment | VMware DHCP | VMware DHCP | External DHCP/Static |
### Practical Lab Recommendations

#### For Your Current Setup (SmartPhone Hotspot Only)

Recommended configuration:

**Adapter 1 (pnet0): NAT (vmnet8)**

- Network: 192.168.33.0/24
- Purpose: Management + Internet access for updates

**Adapter 2 (pnet1): Host-only (vmnet1)**

- Network: 172.16.47.0/24
- Purpose: Isolated lab Site A (HQ)

**Adapter 3 (pnet2): Host-only (vmnet2) - CREATE THIS**

- Network: 10.200.200.0/24
- Purpose: Isolated lab Site B (Branches) or WAN simulation

**pnet2 — Host-Only (vmnet2 / 10.200.200.0)**

- Can ping itself
- Cannot reach pnet0 or pnet1
- No bridge interface on macOS

This is the key problem.

The root cause (important)
On macOS, VMware does NOT automatically create a macOS bridge for every Host-Only network.
No bridge on the host = no Layer-2 path = no traffic leaves that segment
So:
- vmnet1 → backed by bridge100
- vmnet8 → backed by bridge101
- vmnet2 → exists in VMware config only, not on macOS networking stack
That’s why:
- pnet2 can talk to itself
- but cannot talk to anything else
This is not a Linux config issue inside EVE.It is a host-side virtual switching issue. 
To enable pnet2 (10.200.200.0/24) to be reachable from pnet0 and pnet1 you need Layer-3 routing or Layer-2 bridging.
Solution 1 — Bridge vmnet2 to macOS (hacky, fragile)
Solution 2 — Add Internal EVE routing (recommended, clean, realistic

Enable IP forwarding inside the EVE VM:

```bash
sysctl -w net.ipv4.ip_forward=1
```

Persist it:

```bash
echo "net.ipv4.ip_forward=1" >> /etc/sysctl.conf
```

Then add routes:

```bash
ip route add 10.200.200.0/24 dev pnet2
```

And ensure iptables is not blocking forwarding:

```bash
iptables -P FORWARD ACCEPT
```
For a More Realistic LAB, Here’s What you want
- pnet0 (192.168.33.0/24) → Ansible management → pnet1 + pnet2
- pnet1 ↔ pnet2 ❌ (must remain isolated)
- Routing between pnet1 and pnet2 later via a router inside EVE topology

On EVE VM only:

1. Enable IP forwarding:

```bash
sysctl -w net.ipv4.ip_forward=1
```

2. Allow forwarding ONLY between pnet0 and pnet2

```bash
iptables -A FORWARD -i pnet0 -o pnet2 -j ACCEPT
iptables -A FORWARD -i pnet2 -o pnet0 -j ACCEPT
```

3. Explicitly block pnet1 ↔ pnet2

```bash
iptables -A FORWARD -i pnet1 -o pnet2 -j DROP
iptables -A FORWARD -i pnet2 -o pnet1 -j DROP
```

- Ansible control node on pnet0 (192.168.33.0/24)
- Devices(Routers/Switches) on pnet1 (172.16.47.0/24)
- Devices(Routers/Switches) on pnet2 (10.200.200.0/24)
- EVE VM does the management routing only
- pnet1 ↔ pnet2 remain isolated
- Later, you add a router inside the EVE topology to handle pnet1↔pnet2 like a real network
Because:
- Normal kernel routing works
- You are not forcing source interfaces
- SSH behaves exactly like ping without -I
- Ansible will follow the same routing logic
This is a proper, professional lab design:
- Management-plane routing via EVE
- Data-plane routing via lab routers
- Clear separation of concerns
- No VMware hacks
- Fully reproducible

Advantages:

- Three separate networks
- One with internet for management
- Two completely isolated for safe testing
- No dependency on physical adapters
- Simulates real multi-site architecture

Avoid Bridged mode because:
- Limited to SmartPhone hotspot's tiny /28 network (14 IPs)
- Exposes lab devices to mobile data network
- No benefit over NAT for your use case

### Key Configuration Locations

**On Your Mac**

VMware network config:

```text
/Library/Preferences/VMware Fusion/networking
```

DHCP configs:

```text
/Library/Preferences/VMware Fusion/vmnet1/dhcpd.conf
/Library/Preferences/VMware Fusion/vmnet8/dhcpd.conf
```

NAT config:

```text
/Library/Preferences/VMware Fusion/vmnet8/nat.conf
```

**In EVE-NG**

Network interfaces:

```text
/etc/network/interfaces
```

Format:

```text
iface pnetX inet dhcp    → Get IP from VMware DHCP
iface pnetX inet static  → Set static IP manually
iface pnetX inet manual  → No IP configuration
```

### Critical Takeaways

1. Physical adapters are the foundation - Bridged mode can only use what your Mac physically has connected
2. NAT and Host-only are virtual - You can create as many as you want, independent of physical hardware
3. Doubling adapters of same type - By default they share the same network unless you create new vmnet interfaces
4. Layer 2 vs Layer 3 - Bridges connect at Layer 2 (same broadcast domain), routing needed for Layer 3 (different subnets)
5. Switch management requires SVI - Physical switch ports don't have IPs, management IPs go on VLAN interfaces
6. SmartPhone hotspot limitation - /28 network (14 IPs) makes bridged mode impractical for labs
7. Isolation levels:

- NAT: Isolated from home network, has internet
- Host-only: Completely isolated, no internet
- Bridged: No isolation, on real network

### End Notes

This document explains VMware Fusion network adapters using a MacBook Pro running EVE-NG as the reference platform. The concepts apply to all hypervisors (VirtualBox, Hyper-V, KVM) with different naming conventions:

- VMware: vmnet1, vmnet8, pnet0
- VirtualBox: vboxnet0, vboxnet1
- Linux KVM: virbr0, virbr1
- Hyper-V: Virtual Switch names

The fundamental principles of NAT, Host-only, and Bridged networking remain consistent across all platforms.

### VMware Adapter → EVE-NG Interface → Cloud Object Mapping

#### The Translation Chain

```text
Mac (VMware)  →  EVE-NG VM  →  EVE-NG Network Objects
   vmnetX     →   ethX/pnetX  →      CloudX
```

#### Step 1: VMware VM Settings → EVE-NG eth Interfaces

The order of network adapters in VMware settings determines the eth number in EVE-NG.

In VMware Fusion

When you open EVE-NG VM settings → Network Adapter, you'll see:

```text
Network Adapter:     Connected to: vmnet8 (NAT)        ← This becomes eth0
Network Adapter 2:   Connected to: vmnet1 (Host-only)  ← This becomes eth1
Network Adapter 3:   Not connected                     ← This becomes eth2
```

Translation:
- First adapter (Network Adapter) = eth0
- Second adapter (Network Adapter 2) = eth1
- Third adapter (Network Adapter 3) = eth2
- And so on...
The numbering is based on the ORDER in VMware settings, not the vmnet number!

#### Step 2: EVE-NG eth Interfaces → pnet Bridges

In EVE-NG's /etc/network/interfaces, the eth interfaces are bridged to pnet interfaces:

```text
# eth0 is bridged to pnet0
iface eth0 inet manual
auto pnet0
iface pnet0 inet dhcp
    bridge_ports eth0      ← eth0 traffic goes through pnet0
    
# eth1 is bridged to pnet1
iface eth1 inet manual
auto pnet1
iface pnet1 inet manual
    bridge_ports eth1      ← eth1 traffic goes through pnet1
    
# eth2 is bridged to pnet2
iface eth2 inet manual
auto pnet2
iface pnet2 inet manual
    bridge_ports eth2      ← eth2 traffic goes through pnet2
```

Translation:
- eth0 → bridged to → pnet0
- eth1 → bridged to → pnet1
- eth2 → bridged to → pnet2
The pnet number always matches the eth number!

#### Step 3: pnet Interfaces → EVE-NG Cloud Objects

In EVE-NG GUI, the Cloud objects map directly to pnet interfaces:

- Cloud0 → pnet0
- Cloud1 → pnet1
- Cloud2 → pnet2
- Cloud3 → pnet3
- ...and so on

The Cloud number always matches the pnet number!

#### Complete Translation Example

Your Current Setup

VMware Fusion Settings:

```text
Network Adapter:    NAT (vmnet8)         ← Position 1
Network Adapter 2:  Bridged (vmnet1)     ← Position 2
Network Adapter 3:  Host-only (vmnet1)   ← Position 3
```

Inside EVE-NG Linux:

```text
eth0 → Connected to vmnet8 (first adapter)
eth1 → Connected to vmnet1 (second adapter, even though it says bridged)
eth2 → Connected to vmnet1 (third adapter)
```

In /etc/network/interfaces:

```text
eth0 → bridged to → pnet0 (192.168.33.130)
eth1 → bridged to → pnet1 (no IP configured yet)
eth2 → bridged to → pnet2 (no IP configured yet)
```

In EVE-NG GUI:

```text
Cloud0 → Uses pnet0 → Goes to eth0 → Exits via vmnet8 (NAT) → Internet
Cloud1 → Uses pnet1 → Goes to eth1 → Exits via vmnet1 (Bridged? or Host-only?)
Cloud2 → Uses pnet2 → Goes to eth2 → Exits via vmnet1 (Host-only)
```

### How to Verify the Mapping

#### Method 1: Check from EVE-NG Console

```bash
# SSH to EVE-NG
ssh root@192.168.33.130

# Show all network interfaces
ip link show
```

Output:

```text
1: lo: <LOOPBACK,UP,LOWER_UP>
2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP>
3: eth1: <BROADCAST,MULTICAST,UP,LOWER_UP>
4: eth2: <BROADCAST,MULTICAST,UP,LOWER_UP>
5: pnet0: <BROADCAST,MULTICAST,UP,LOWER_UP>
	bridge_ports eth0     ← See which eth is connected
6: pnet1: <BROADCAST,MULTICAST,UP,LOWER_UP>
	bridge_ports eth1
7: pnet2: <BROADCAST,MULTICAST,UP,LOWER_UP>
	bridge_ports eth2
```

Look for the bridge_ports line to see eth → pnet mapping

#### Method 2: Check Bridge Configuration

```bash
# Show bridge details
brctl show
```

Output:

```text
bridge name     bridge id               STP enabled     interfaces
pnet0          8000.000c290f4dc6       no              eth0
pnet1          8000.000c290f4dd0       no              eth1
pnet2          8000.000c290f4dda       no              eth2
```

The "interfaces" column shows which eth is part of which pnet bridge

#### Method 3: Check IP Addresses

```bash
ip addr show
```

Look for which pnet has an IP:

```text
5: pnet0: <BROADCAST,MULTICAST,UP,LOWER_UP>
	inet 192.168.33.130/24   ← This is connected to vmnet8 (NAT)
    
6: pnet1: <BROADCAST,MULTICAST,UP,LOWER_UP>
	inet6 fe80::...          ← No IPv4, only link-local IPv6
    
7: pnet2: <BROADCAST,MULTICAST,UP,LOWER_UP>
	inet6 fe80::...          ← No IPv4, only link-local IPv6
```

### How to Determine Cloud Mapping in EVE-NG Lab

When Building Topology in EVE-NG:

#### Step 1: Identify Cloud objects

Right-click → Add Node → Network → You'll see:

```text
Cloud0 (pnet0)
Cloud1 (pnet1)
Cloud2 (pnet2)
Cloud3 (pnet3)
...
```

#### Step 2: Check which pnet has what network

```bash
# On EVE-NG
ip addr show | grep "inet "
```

# Output shows:
```text
pnet0: 192.168.33.130 → This is management (NAT, has internet)
pnet1: 172.16.47.X    → This is host-only (isolated Site A)
pnet2: 10.200.200.1   → This is host-only (isolated Site B)
```

#### Step 3: Connect your devices accordingly

```text
Need internet for management?     → Connect to Cloud0
Need isolated lab Site A?          → Connect to Cloud1
Need isolated lab Site B/WAN sim?  → Connect to Cloud2
```

### Quick Reference Table

| VMware Adapter Position | EVE-NG eth | EVE-NG pnet | EVE-NG Cloud | Your Current Network |
| --- | --- | --- | --- | --- |
| Network Adapter (1st) | eth0 | pnet0 | Cloud0 | 192.168.33.0/24 (NAT) |
| Network Adapter 2 (2nd) | eth1 | pnet1 | Cloud1 | 172.16.47.0/24 (Host-only) |
| Network Adapter 3 (3rd) | eth2 | pnet2 | Cloud2 | Not configured yet |
| Network Adapter 4 (4th) | eth3 | pnet3 | Cloud3 | Not configured yet |

### Important Notes

**The Numbers ALWAYS Match**

```text
Cloud0 = pnet0 = eth0 (always!)
Cloud1 = pnet1 = eth1 (always!)
Cloud2 = pnet2 = eth2 (always!)
```

But the vmnet number does NOT have to match!

Example:

- Cloud0 might connect to vmnet8
- Cloud1 might connect to vmnet1
- Cloud2 might connect to vmnet9

It depends on the ORDER you added adapters in VMware settings, not the vmnet number.

**Adapter Order Matters**

If you change the order of network adapters in VMware settings, the eth numbers will change!
Example:
Before:
Adapter 1: NAT (vmnet8)      → eth0 → Cloud0
Adapter 2: Host-only (vmnet1) → eth1 → Cloud1
After removing Adapter 1 and keeping only Adapter 2:
Adapter 1: Host-only (vmnet1) → eth0 → Cloud0  (shifted!)
The first adapter always becomes eth0/pnet0/Cloud0, regardless of vmnet!

### Practical Lab Setup Guide

When Starting a New Lab:

1. Check your Cloud mappings:

```bash
# On EVE-NG
ip addr show | grep -E "pnet|inet "
```

2. Document your network mapping:

```text
Cloud0 (pnet0) = Management network (192.168.33.0/24) - Has internet
Cloud1 (pnet1) = Site A network (172.16.47.0/24) - Isolated
Cloud2 (pnet2) = Site B/WAN network (10.200.200.0/24) - Isolated
```

3. In EVE-NG topology:

- Management interfaces (e0/0) → Connect to Cloud0
- Site A routers → Connect data interfaces to Cloud1
- Site B routers → Connect data interfaces to Cloud2

4. Configure devices with IPs from correct subnet:

- Cloud0 devices: 192.168.33.X
- Cloud1 devices: 172.16.47.X
- Cloud2 devices: 10.200.200.X

### Final Translation Summary

The chain always goes:

```text
VMware VM Settings                    Inside EVE-NG Linux             EVE-NG GUI
(Order matters!)                      (Fixed mapping)                 (Fixed mapping)

Adapter Position 1  →  eth0  →  pnet0  →  Cloud0
Adapter Position 2  →  eth1  →  pnet1  →  Cloud1
Adapter Position 3  →  eth2  →  pnet2  →  Cloud2
Adapter Position 4  →  eth3  →  pnet3  →  Cloud3
```

Key insight:

- The position in VMware determines eth number
- eth number determines pnet number (always same)
- pnet number determines Cloud number (always same)
- The vmnet type (NAT/Host-only/Bridged) determines what network the Cloud connects to

To know which Cloud to use: Check ip addr show on EVE-NG to see which pnet has which network, then use the corresponding Cloud number!

### All VMware Networking Commands for macOS

#### Viewing Current Configuration

Check Mac's Network Interfaces

```bash
ifconfig

# Show only IP addresses
ifconfig | grep "inet "

# Show specific interface
ifconfig en0
ifconfig vmnet8
```

View VMware Networking Configuration

```bash
# View main networking config file
cat /Library/Preferences/VMware\ Fusion/networking

# List networking directory contents
ls -la /Library/Preferences/VMware\ Fusion/

# View vmnet directories
ls -la /Library/Preferences/VMware\ Fusion/vmnet1
ls -la /Library/Preferences/VMware\ Fusion/vmnet8
```

View DHCP Configuration

```bash
# vmnet1 DHCP config
cat /Library/Preferences/VMware\ Fusion/vmnet1/dhcpd.conf

# vmnet8 DHCP config
cat /Library/Preferences/VMware\ Fusion/vmnet8/dhcpd.conf
```

View NAT Configuration

```bash
# vmnet8 NAT config (only NAT networks have this)
cat /Library/Preferences/VMware\ Fusion/vmnet8/nat.conf

# View NAT MAC address
cat /Library/Preferences/VMware\ Fusion/vmnet8/nat.mac
```

#### Stopping and Starting VMware Networking

```bash
# Stop VMware Networking
sudo /Applications/VMware\ Fusion.app/Contents/Library/vmnet-cli --stop

# Start VMware Networking
sudo /Applications/VMware\ Fusion.app/Contents/Library/vmnet-cli --start

# Restart VMware Networking
sudo /Applications/VMware\ Fusion.app/Contents/Library/vmnet-cli --stop
sudo /Applications/VMware\ Fusion.app/Contents/Library/vmnet-cli --start
```
#### Configure/Reload VMware Networking

```bash
sudo /Applications/VMware\ Fusion.app/Contents/Library/vmnet-cli --configure
```

#### Creating New Virtual Networks

Backup Current Configuration

```bash
sudo cp /Library/Preferences/VMware\ Fusion/networking /Library/Preferences/VMware\ Fusion/networking.backup
```

Edit Networking Configuration

```bash
sudo nano /Library/Preferences/VMware\ Fusion/networking
```

Create New NAT Network (vmnet9)

```bash
# Stop networking first
sudo /Applications/VMware\ Fusion.app/Contents/Library/vmnet-cli --stop

# Edit the file
sudo nano /Library/Preferences/VMware\ Fusion/networking
```

Add these lines:

```text
answer VNET_9_DHCP yes
answer VNET_9_DHCP_CFG_HASH <generate_hash_or_leave_blank>
answer VNET_9_HOSTONLY_NETMASK 255.255.255.0
answer VNET_9_HOSTONLY_SUBNET 10.10.10.0
answer VNET_9_HOSTONLY_UUID <generate_uuid_or_leave_blank>
answer VNET_9_NAT yes
answer VNET_9_VIRTUAL_ADAPTER yes
```

Save and restart networking:

```bash
sudo /Applications/VMware\ Fusion.app/Contents/Library/vmnet-cli --start
```

Create New Host-Only Network (vmnet2)

```bash
# Stop networking first
sudo /Applications/VMware\ Fusion.app/Contents/Library/vmnet-cli --stop

# Edit the file
sudo nano /Library/Preferences/VMware\ Fusion/networking
```

Add these lines:

```text
answer VNET_2_DHCP no
answer VNET_2_HOSTONLY_NETMASK 255.255.255.0
answer VNET_2_HOSTONLY_SUBNET 10.100.100.0
answer VNET_2_HOSTONLY_UUID <generate_uuid_or_leave_blank>
answer VNET_2_VIRTUAL_ADAPTER yes
```

Save and restart networking:

```bash
sudo /Applications/VMware\ Fusion.app/Contents/Library/vmnet-cli --start
```

Create New Host-Only Network with DHCP (vmnet3)

```bash
# Stop networking first
sudo /Applications/VMware\ Fusion.app/Contents/Library/vmnet-cli --stop

# Edit the file
sudo nano /Library/Preferences/VMware\ Fusion/networking
```

Add these lines:

```text
answer VNET_3_DHCP yes
answer VNET_3_DHCP_CFG_HASH <optional>
answer VNET_3_HOSTONLY_NETMASK 255.255.255.0
answer VNET_3_HOSTONLY_SUBNET 10.200.200.0
answer VNET_3_HOSTONLY_UUID <optional>
answer VNET_3_VIRTUAL_ADAPTER yes
```

Save and restart networking:

```bash
sudo /Applications/VMware\ Fusion.app/Contents/Library/vmnet-cli --start
```

#### Verifying Changes

```bash
# List all vmnet directories
ls -la /Library/Preferences/VMware\ Fusion/ | grep vmnet

# Check if new interface exists
ifconfig | grep vmnet

# Check if vmnet9 exists
ifconfig vmnet9

# Check if vmnet2 exists
ifconfig vmnet2
```

#### Complete Example: Adding vmnet2 (Host-Only)

```bash
# 1. Backup current config
sudo cp /Library/Preferences/VMware\ Fusion/networking /Library/Preferences/VMware\ Fusion/networking.backup

# 2. Stop VMware networking
sudo /Applications/VMware\ Fusion.app/Contents/Library/vmnet-cli --stop

# 3. Edit networking file
sudo nano /Library/Preferences/VMware\ Fusion/networking

# 4. Add these lines at the end:
answer VNET_2_DHCP no
answer VNET_2_HOSTONLY_NETMASK 255.255.255.0
answer VNET_2_HOSTONLY_SUBNET 10.200.200.0
answer VNET_2_VIRTUAL_ADAPTER yes

# 5. Save file (Ctrl+O, Enter, Ctrl+X)

# 6. Start VMware networking
sudo /Applications/VMware\ Fusion.app/Contents/Library/vmnet-cli --start

# 7. Verify it was created
ifconfig vmnet2

# 8. Check the directory was created
ls -la /Library/Preferences/VMware\ Fusion/vmnet2
```

#### Troubleshooting Commands

```bash
# List all VMware processes
ps aux | grep vmnet

# Check if vmnet services are running
sudo launchctl list | grep vmware

# System logs
tail -f /var/log/system.log | grep vmware

# VMware Fusion logs
tail -f ~/Library/Logs/VMware\ Fusion/vmware.log
```

Reset VMware Networking (Nuclear Option)

```bash
# Stop everything
sudo /Applications/VMware\ Fusion.app/Contents/Library/vmnet-cli --stop

# Remove all network configurations
sudo rm -rf /Library/Preferences/VMware\ Fusion/networking
sudo rm -rf /Library/Preferences/VMware\ Fusion/vmnet*
```

Restart VMware Fusion (it will recreate defaults)
Then reconfigure as needed

#### Permissions Issues

```bash
# Fix ownership
sudo chown -R root:wheel /Library/Preferences/VMware\ Fusion/

# Fix permissions on networking file
sudo chmod 644 /Library/Preferences/VMware\ Fusion/networking

# Fix permissions on vmnet directories
sudo chmod 755 /Library/Preferences/VMware\ Fusion/vmnet*
```

#### Quick Reference: File Locations

```text
# Main config
/Library/Preferences/VMware Fusion/networking

# DHCP configs
/Library/Preferences/VMware Fusion/vmnet1/dhcpd.conf
/Library/Preferences/VMware Fusion/vmnet8/dhcpd.conf

# NAT config (vmnet8 only)
/Library/Preferences/VMware Fusion/vmnet8/nat.conf

# VMware CLI tool
/Applications/VMware Fusion.app/Contents/Library/vmnet-cli
```

#### Summary of Most Used Commands

```bash
# View current networks
ifconfig | grep vmnet
cat /Library/Preferences/VMware\ Fusion/networking

# Stop networking
sudo /Applications/VMware\ Fusion.app/Contents/Library/vmnet-cli --stop

# Edit config
sudo nano /Library/Preferences/VMware\ Fusion/networking

# Start networking
sudo /Applications/VMware\ Fusion.app/Contents/Library/vmnet-cli --start

# Verify changes
ifconfig vmnetX
```

Note: Always backup the networking file before making changes. If something breaks, you can restore from backup:

```bash
sudo cp /Library/Preferences/VMware\ Fusion/networking /Library/Preferences/VMware\ Fusion/networking.backup
sudo /Applications/VMware\ Fusion.app/Contents/Library/vmnet-cli --configure
```

**answer VNET_3_DHCP yes**

- VMware runs a DHCP server on this network
- VMs automatically get IP addresses (like 10.200.200.128, .129, .130, etc.)
- You don't need to manually configure IPs on each VM

**answer VNET_3_DHCP no**

- No DHCP server
- You MUST manually configure static IPs on every VM
- More control, but more work

With DHCP = yes

```text
# On EVE-NG
iface pnet2 inet dhcp    ← Gets IP automatically (e.g., 10.200.200.150)
```

With DHCP = no

```text
# On EVE-NG
iface pnet2 inet static   ← Must specify manually
    address 10.200.200.1
    netmask 255.255.255.0
```

## Docker Engine, Networking & Volumes Explained Like a Network Engineer

(with Hypervisor-Level Analogies)

### Containers (Docker)

Containers (Docker): Run in containers and provide fully isolated virtual environments solely for running a single application stack or framework, leveraging OS-level virtualization features (like namespaces and cgroups) rather than full hardware virtualization.

Docker uses a client-server architecture. The Docker client talks to the Docker daemon, which does the heavy lifting of building, running, and distributing your Docker containers. The Docker client and daemon can run on the same system, or you can connect a Docker client to a remote Docker daemon. The Docker client and daemon communicate using a REST API, over UNIX sockets or a network interface. Another Docker client is Docker Compose, that lets you work with applications consisting of a set of containers. The Docker daemon (dockerd) listens for Docker API requests and manages Docker objects such as images, containers, networks, and volumes. A daemon can also communicate with other daemons to manage Docker services.

The Docker client (docker) is the primary way that many Docker users interact with Docker. When you use commands such as docker run, the client sends these commands to dockerd, which carries them out. The docker command uses the Docker API. The Docker client can communicate with more than one daemon.

Docker uses a technology called namespaces to provide the isolated workspace called the container. When you run a container, Docker creates a set of namespaces for that container. These namespaces provide a layer of isolation. Each aspect of a container runs in a separate namespace and its access is limited to that namespace.

Volumes are persistent storage mechanisms managed by the Docker daemon. They retain data even after the containers using them are removed. Volume data is stored on the filesystem on the host, but in order to interact with the data in the volume, you must mount the volume to a container. Directly accessing or interacting with the volume data is unsupported, undefined behavior, and may result in the volume or its data breaking in unexpected ways.

Volumes are ideal for performance-critical data processing and long-term storage needs. Since the storage location is managed on the daemon host, volumes provide the same raw file performance as accessing the host filesystem directly.

1. Bind mounts create a direct link between a host system path and a container, allowing access to files or directories stored anywhere on the host. Since they aren't isolated by Docker, both non-Docker processes on the host and container processes can modify the mounted files simultaneously.

Use bind mounts when you need to be able to access files from both the container and the host.

2. A tmpfs mount stores files directly in the host machine's memory, ensuring the data is not written to disk. This storage is ephemeral: the data is lost when the container is stopped or restarted, or when the host is rebooted. tmpfs mounts do not persist data either on the Docker host or within the container's filesystem.

These mounts are suitable for scenarios requiring temporary, in-memory storage, such as caching intermediate data, handling sensitive information like credentials, or reducing disk I/O. Use tmpfs mounts only when the data does not need to persist beyond the current container session.

3. Named Pipes can be used for communication between the Docker host and a container. Common use case is to run a third-party tool inside of a container and connect to the Docker Engine API using a named pipe.

Multiple containers can mount a file or directory containing the shared information, using a Docker volume.
Multiple containers can be started together using docker-compose and the compose file can define the shared variables.

### Docker Networking Modes/Drivers

Docker has 7 major networking modes/drivers. Think of each as a different virtual switch or NIC attachment type — exactly like hypervisors do.

Below is the mapping:

#### 1. Docker default bridge NAT behavior

- Outbound NAT (iptables MASQUERADE)
- Port forwarding for inbound connections
- Internal DNS for container names
- Per-bridge isolation enforced by filtering rules
- Containers attach to a Linux bridge (docker0).
- They get private RFC1918 addresses.
- Docker NATs outbound traffic with iptables.

Hypervisor equivalent:

- VM attached to a vSwitch + NAT (VMware NAT / VirtualBox NAT adapter)
- Container → vNIC → Linux bridge → NAT → Host NIC → Outside
- No inbound connections unless port-forwarded.
- On the default bridge network, containers can't resolve (DNS) each other by name.

General development, isolated labs.

#### 2. user-defined bridge

Docker Concept

Bridge networks apply to containers running on the same Docker daemon host. For communication among containers running on different Docker daemon hosts, you can either manage routing at the OS level, or you can use an overlay network.

Similar to the default bridge but fully customizable:

- your own subnets
- better DNS
- container isolation
- predictable IPAM

Hypervisor equivalent:

- A custom vSwitch you create (not the default).

Same as default-bridge mode, but you architect the network. On user-defined networks, containers can resolve each other by name.
Automatic service discovery only resolves custom container names, not default automatically generated names. Containers connected to the same user-defined bridge network effectively expose all ports to each other

Multi-container apps needing segmentation.

#### 3. host network mode

Docker Concept

- Container shares the host’s network stack.
- No NAT, no bridge.
- Container = same IP as host.
- No veth pair
- No virtual switch
- No NAT
- The container is the host from a networking perspective

Hypervisor equivalent:

- VM set to "Host Network" / "Shared with Host" mode
- Process running natively on the hypervisor with no vSwitch

Container bypasses virtual switching. Listening on port 80 inside container = host listens on port 80.
High-performance apps or network daemons.

#### 4. none

Docker Concept

- Container has no network.
- No interfaces except loopback.
- Container gets a network namespace but no interfaces except loopback.

Hypervisor equivalent:

- VM with its vNIC disconnected from any switch (equivalent to “cable unplugged”).

Self-contained. No outbound or inbound.
Security, debugging, Strict sandbox isolation or sidecar workloads.

#### 5. macvlan

Some applications, especially legacy applications or applications which monitor network traffic, expect to be directly connected to the physical network. In this type of situation, you can use the macvlannetwork driver to assign a MAC address to each container's virtual network interface, making it appear to be a physical network interface directly connected to the physical network. In this case, you need to designate a physical interface on your Docker host to use for the Macvlan, as well as the subnet and gateway of the network. You can even isolate your Macvlan networks using different physical network interfaces.

- Docker gives the container its own MAC address on the host NIC.
- Looks like a physical device on the LAN.
- No NAT

Hypervisor equivalent:

- VM connected directly to a physical NIC using Promiscuous Mode (similar to: ESXi "bridged" mode with unique MACs per VM)
- Container → Host NIC (with separate MAC) → Physical Switch → LAN
- Packets bypass Linux bridge.

Use Case
When containers must appear as real devices on the subnet.

```bash
docker network create -d macvlan \
  --subnet=172.16.86.0/24 \
  --gateway=172.16.86.1 \
  -o parent=eth0 pub_net
```

#### 6. ipvlan

Two high level advantages of these approaches are, the positive performance implications of bypassing the Linux bridge and the simplicity of having fewer moving parts. Removing the bridge that traditionally resides in between the Docker host NIC and container interface leaves a simple setup consisting of container interfaces, attached directly to the Docker host interface. This result is easy to access for external facing services as there is no need for port mappings in these scenarios.

- Similar to macvlan but only IP addresses differ, not MACs.
- Parent interface keeps a single MAC.

Hypervisor Equivalent

- SR-IOV-like behavior or a VM NIC with multiple IPs but one MAC
- Host NIC (one MAC) routes traffic internally using L3 logic.

Use Case
High-density networks where MAC flooding is a concern(e.g., 1000+ containers on one host).

```bash
docker network create -d ipvlan \
  --subnet=172.16.86.0/24 \
  --gateway=172.16.86.1 \
  -o parent=eth0 pub_net
```

#### 7. overlay

Docker Concept

The overlay network driver creates a distributed network among multiple Docker daemon hosts. This network sits on top of (overlays) the host-specific networks, allowing containers connected to it to communicate securely when encryption is enabled. Docker transparently handles routing of each packet to and from the correct Docker daemon host and the correct destination container. Distributed microservices across many hosts.

- Multi-host networking across a Swarm or clustered environment.
- VXLAN-based encapsulation.

Hypervisor equivalent:

- NSX / VMware VXLAN, GENEVE, GRE tunnels for inter-host VM networks

Adding containers to an overlay network gives them the ability to communicate with other containers without having to set up routing on the individual Docker daemon hosts. A prerequisite for doing this is that the hosts have joined the same Swarm.

Docker default bridge NAT behavior

- Outbound NAT (iptables MASQUERADE)
- Port forwarding for inbound connections
- Internal DNS for container names
- Per-bridge isolation enforced by filtering rules

### Summary Cheat Table

| Docker Network | Hypervisor Analogy | Routing/NAT Behavior | Best Use |
| --- | --- | --- | --- |
| bridge | NAT vSwitch | NAT outbound | Dev, default use |
| user-defined bridge | Custom vSwitch | NAT outbound | Multi-tier apps |
| host | No vNIC (uses host stack) | No NAT | High performance |
| none | vNIC disconnected | None | Security, isolation |
| macvlan | VM with unique MAC on LAN | No NAT | Appliances, L2 presence |
| ipvlan | Single MAC + multiple IPs | No NAT | Dense container hosts |
| overlay | VXLAN/NSX | Encapsulation | Multi-host clusters |

## Ansible Overview

- Purpose: Automation of device support and configuration. Ideal for recurring tasks.
- Architecture: Agent-less solution for network automation.
- Model: Uses a Push model (sends configs to nodes), unlike Pull models (e.g., Puppet) which use agents to pull from a master server.

### How Ansible Works

Control Host:

- Connects to devices via SSH or APIs.
- Executes Python code (modules).
- Returns a JSON object per task.

Process:

- Ansible sends modules to managed nodes.
- Modules take care of the work (e.g., ios_command).
- Can manage Windows, AWS, Azure, network devices (NXOS, IOS-XE), etc.

### The Principle: "Separation of Concerns"

Rule of thumb:

- Is it about WHAT devices to manage? → inventory/
- Is it about HOW to connect to devices? → group_vars/
- Is it about HOW Ansible behaves? → ansible.cfg

| File | Purpose | What It Contains |
| --- | --- | --- |
| inventory/hosts.ini | Pure inventory | Host names, IPs, groups - NOTHING else |
| group_vars/all.yml | Device-specific vars | Credentials, network_os, connection type |
| ansible.cfg | Ansible engine settings | Host key checking, Python interpreter, timeouts |


### Ansible Inventory
Defines the device list and details. Can be in INI or YAML format.

- Details included: Device type, IP/FQDN, Ansible Playbook reference name, Connection type, Username/Password (use Vault for production), Variables (device specific or groups).

Example (ansible inventory.ini) (INI):

```ini
[ioxse]
csr1 ansible_host=10.10.20.48 ansible_network_os=ios

[all:vars]
ansible_user=developer
ansible_ssh_pass=C1sco12345
ansible_connection=network_cli
```

### Ansible Playbooks
A YAML file using indentation to indicate logical nesting/hierarchy.

- Function: A list of tasks to execute upon a device/group from the inventory.
- Execution: Sequentially executes each task in threads for each device. Execution is defined by module inputs (one module per task).

Example (pb-configure-snmp.yaml) (YAML):

```yaml
- name: PLAY 1 - DEPLOYING SNMP CONFIGURATIONS ON IOS
  hosts: "csr1"
  connection: network_cli
  gather_facts: no
  tasks:
    - name: "TASK 1 in PLAY 1 CONFIGURE SNMP LINES"
      cisco.ios.ios_config:
        lines:
          - snmp-server community belk-demo RO
          - snmp-server location VEGAS
          - snmp-server contact JASON_BELK
    - name: "TASK 2 in PLAY 1 - VERIFY SNMP LINES PRESENT"
      cisco.ios.ios_command:
        commands:
          - "show run | include snmp-server"
```

### Ansible Modules

- Scope: Over 750 modules available.
- Uses: Configuring network devices, gathering network state, updating ServiceNow, sending chat messages (Slack/WebEx).
- Structure: Modules have structured required/optional inputs and predefined output structures.

### Ansible Application Config (ansible.cfg)
Controls application settings and turns features on/off (e.g., SSH host key checking, timeouts).

- Location: Looks in the current working directory or /etc/ansible.
- Maintenance: Rarely changed; set up once and forget.

Example (ansible.cfg) (INI):

```ini
[defaults]
deprecation_warnings = False
gather_facts = False
host_key_checking = False
```

### Ansible Templates & Variables

- Jinja2: Used to define config templates. Includes features like looping and conditionals.
- YAML: Used to define input variables.
- Workflow: Ansible loads variables per device -> feeds them into templates -> sends config to device.
- Idempotency: If configuration is already present, Ansible checks running-config first and does not send it again.

### Jinja2 Templating in Ansible
Jinja2 is a popular templating language for Python. Ansible uses Jinja2 to handle any variable substitution, logic, and dynamic content generation within its files, most notably in configuration files (.j2 templates) and playbooks.
- Variables: Jinja2 is what allows you to use double curly braces ({{ variable_name }}) to insert dynamic data (like IP addresses, hostnames, or credentials) into templates or playbook tasks.
- Logic: It also allows for control structures like loops ({% for item in list %}) and conditionals ({% if condition %}) directly within your templates to generate configurations that vary based on host facts or defined variables.

#### jinja2_extensions
The jinja2_extensions setting allows you to enable optional features that are not part of the standard Jinja2 language set.
- jinja2_extensions = jinja2.ext.do,jinja2.ext.i18n
- jinja2.ext.do: This is the most common extension used in Ansible. It allows you to use the {% do ... %} tag in templates. This tag lets you execute statements (like adding an item to a list or calling a function) that do not return any output. This is useful for manipulating variables within a template.
- jinja2.ext.i18n: This extension adds support for Internationalization (i18n), typically used for translating content in web application templates, though less common in network automation.

#### Related Jinja2 Configuration Options
These settings also control how Ansible interacts with the Jinja2 engine and variable rendering:

| Setting | Purpose |
| --- | --- |
| ansible_managed | Defines the text placed at the top of configuration files generated from templates. It's a comment indicating the file was created and is managed by Ansible. By default, it's a static string to aid in idempotence (ensuring the task doesn't re-run unnecessarily). |
| error_on_undefined_vars | By default (True), Ansible raises an error and stops the playbook if it encounters a Jinja2 variable (e.g., {{ undefined_var }}) that hasn't been defined. If you set this to False, Ansible will quietly substitute the undefined variable with an empty string, which can hide errors. |
| private_key_file | While not a Jinja2 setting, this is a crucial configuration for authentication. It specifies the file path for the default SSH private key Ansible should use when connecting to managed hosts. |
| vault_password_file | Another authentication setting. It points to a file containing the password used to decrypt Ansible Vault files, which store sensitive data like credentials. |

Template Example (interface-template.j2):

```text
{% for iname, idata in interfaces.items() %}
interface {{ iname }}
 description {{ idata.description }}
 ip address {{ idata.ipv4addr }} {{ idata.subnet }}
{% endfor %}
```

Variables Example (ansible-vars.json):

```yaml
interfaces:
  Loopback100:
    description: "This is a loopback configured by ansible"
    ipv4addr: "10.123.123.100"
    subnet: "255.255.255.255"
```

### Ansible Facts
When Ansible connects, it gathers and parses useful facts (OS Version, Hostname, Interface status, etc.).
- Usage: Stored to disk for reference or used as runtime variables for conditional logic (e.g., only configure devices with "SJC" in the hostname).

Example Output:

```yaml
ansible_net_hostname: CSR-1000V
ansible_net_version: 16.09.03
ansible_net_serialnum: 926V75BDNRJ
```
