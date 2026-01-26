# Reverse Engineering & System Architecture

## Fundamentals

Assembly language is a class of languages, not one single language. Every compiler platform has its own assembly language. It is a low-level language that is a human-readable representation of machine code. If a software performs an operation, it must be visible in the assembly language code.

### Machine Code / Binary Code / Object Code
Machine Code / Binary code or Object code are not the same thing. They are two different representations of low-level program instructions.
 * Machine Code: CPU reads Machine Code Op Codes, a sequence of bits that contains a list of instructions for the processor to execute.
 * Assembly Language: A textual representation of those bits that is more easily understood by humans.
Each assembly language command is represented by a number called an Operation Code (Opcode)
Object code is a sequence of Op Codes used to perform an Operation.
The CPU reads Object Code from memory, decodes it, and acts based on the instructions embedded in it.
* Software developers write in Assembly Language (or a high-level language).
* Assembler: A program to translate the textual Assembly Language into Binary Code which can be decoded by a CPU.
* Disassembler: Does the opposite; it reads Object Code / Binary Code and generates a textual representation (mapping of each OpCode to an Assembly Instruction).
* Compilers are programs that take a Source File containing instructions that describe the program in a high-level language and generates a corresponding Machine Code. Depending on the high-level language, the machine code can either be: 1. A standard, platform-specific Object Code that is decoded directly by the CPU, or 2. Encoded in a special, platform-independent format called BYTE CODE.
Compilers employ a variety of techniques that minimize code size and improve execution performance. The problem is that the resulting optimized code is often counter-intuitive and difficult to read.

Byte Code: Byte codes are similar to Object Codes, except that they are usually decoded by a program instead of a CPU. The idea is to have a Compiler generate the bytecode, and to then use a program called a Virtual Machine (VM) to decode the bytecode for the CPU and perform operations described in it.
Of course, at some point, the VM converts the bytecode into standard Object Code that is compatible with the underlying CPU. Platform independence is the most significant advantage of using byte-code based languages.

### Operating System
Is a program that manages the computer, including the hardware and software applications.
 * System-Level Reversing helps determine the general structure of the program and sometimes even locate an area of interest within it.
 * Code-Level Reversing techniques provide detailed information on a selected code chunk.

System-Monitoring Tools: Reverse engineering requires various tools that sniff, monitor, explore, and otherwise expose the program being reversed.
 * Disassemblers: Disassembly is a processor-specific process, but some support multiple CPU Architectures. A high-quality disassembler is a key component to a Reverser's Toolkit.
 * Decompilers: A step up from Disassemblers. A Decompiler takes an executable binary file and attempts to produce readable high-level language code from it. The idea is to try to reverse the compilation process to obtain the original source file or something similar to it.
 * Interpreter: A program that directly executes instructions written in a programming or scripting language, without requiring them to have been pre-compiled into machine code.

The Registry is a system database containing information required to boot and configure the system. It contains:
 1.  Information required for system-wide software settings.
 2. Information regarding per-user configuration settings.
 3. A window into in-memory volatile data and the current hardware state of the system, including what drivers are loaded.

 * Performance Monitor: Used to view performance counter logs and set alerts via Data Collector Sets.
 * Resource Monitor Utility: Shows a monitor of CPU, Disk, Network, and Memory usage.

### Debugger
Debugger: Is a program that allows developers (and reversers) to observe their program while it is running. Most basic features of a debugger are the ability to set breakpoints and trace through code.
 * A Breakpoint allows users to select a certain function or address and instruct the debugger to pause program execution once that location is reached.
 * Most debuggers also allow you to trace through a program while it's running, called Single Stepping.
Reversers use debuggers in disassembly mode (using a built-in disassembler to disassemble code on the fly). Reversers can step through the disassembled code, essentially watching the CPU as it executes the program one instruction at a time. Reversers can install breakpoints in locations of interest in the disassembled code and then examine the state of the program. 
Kernel Debugging means examining internal kernel data structures and stepping through functions in the kernel.
 * Symbol Files: Contain names of functions and variables and the layout of data structures. They are generated by the linker and used by debuggers to reference and display these names.
   | Tool | Kernel Mode | User Mode | Console/GUI |
   | :--- | :--- | :--- | :--- |
   | KD | \checkmark | | Console |
   | WinDbg | \checkmark | \checkmark | GUI Interface |
   | CDB | | \checkmark | Console |
   | NTSD | | \checkmark | Console (Default) |
   | Windbgl (WinDbg -I) | | \checkmark | Console (GUI, uses -W switch for WinDbg) |

 * Invasive Debugging: (DebugActiveProcess() API) Establishes a connection between the debugger and an active process (User mode).
 * Non-Invasive Debugging: (OpenProcess() API) Doesn't attach to the active process; simply opens the process (User mode).
 * Crash Dump File: A snapshot of the system's memory and state at the time a system crash (Blue Screen) occurred, used for post-mortem analysis.
 * Connecting to a Live, Running System: Such an operation requires the use of two computers. The Target System must be booted in Debugging Mode (configured using bcdedit.exe or msconfig.exe). You may have to disable Secure Boot in the UEFI BIOS settings.
 * Connecting to a Local System (Local Kernel Debugging): Examining the state of the kernel on the same machine. To initiate, ensure the system is set to debug mode. Some debugger commands don't work when used in local kernel debugging.
 * LiveKd (Sysinternals): Provides a simulated Crash Dump File to the debugger and performs any operations supported on a Crash Dump. Because it depends on physical memory (disk) to back the simulated dump, it could run into inconsistent state issues with Windows.

### Shims (AppCompat)
A SHIM is a small layer of code that intercepts, modifies, or redirects the behavior of another program — without changing the program’s code itself. It’s like a transparent adapter that sits between an application and the Windows APIs it calls.
In Windows, shims are part of the Application Compatibility (AppCompat) Framework.
They allow old or poorly behaved applications (written for older Windows versions) to still run properly on newer versions of Windows. The shim doesn’t modify the application binary on disk.

## Program Constructs

### Common Code Constructs
Procedural-Based Design: A procedure is the most fundamental building block of a program. A piece of code with a well-defined purpose that can be called from anywhere in the program. They optionally receive input data from the caller and return data to the caller. This is the most commonly used form of encapsulation in any programming language.
Object-Oriented Design (OOD): The OOD methodology defines an object as a program component that has both data and code associated with it. The code can be a set of procedures that is related to the object and can manipulate its data. The data is part of the object, usually private, and can be accessed only by the object's code but not from the outside world. Developers are forced to treat objects as completely isolated entities that can only be accessed through well-defined interfaces.

### Data Management
To view a program and understand what is happening, you must understand how data is managed by the program.
 * Variables: The key to managing and storing data is usually named variables.
 * User-Defined Data Structures: Are simple constructs that represent a group of data fields, each with its own type.
 * Lists: Programs routinely use a variety of generic data structures for organizing their data:
   * Arrays  * Linked Lists  * Trees

### Control Flow
Control Flow: Are statements that affect the flow of execution of the program based on certain values and conditions:
 * Conditional Blocks: if, if-else statements.
 * Switch Blocks: Also known as multi-way conditions.
 * Loops.

## Architecture and Memory
 * x86 32-bit: 4 BYTES ADDRESSING SPACE (2^{32} bytes or 4 GB).
 * x64 64-bit: 8 BYTES ADDRESSING SPACE (2^{64} bytes or 16 Exabytes).
 * Byte: 8 bits.
 * Logical Processors: A logical processor is one of the available processing units that an operating system can schedule threads onto (e.g., a core, or a hardware thread from hyper-threading).

### Virtual Memory (VM)
Virtual Memory is an abstract address space that includes all the memory address space a program can use. It is a complete list of all possible memory locations available to the process.  Instead of letting software directly access the Physical Memory(RAM), a combination of the processor and the operating system creates a more flexible layer between software and the physical memory (RAM). Processors divide memory into pages (fixed size chunks) of memory (RAM). Each page of Virtual Memory is tagged by the system to indicate what access mode the processor must be in to read and/or write the page.
 * Pages in System Space can be accessed only from Kernel Mode.
 * Pages in the User Address Space are accessible from User Mode.
 * PAGING is a process whereby memory regions are temporarily flushed to the hard drive when they are not in use. This flushed data is stored in the system's page file or swap file
 * WORKING SET: Is a per-process data structure that lists the current physical pages that are in use in the process's address space/Virtual Memory
Process Initialization Sequence Memory Areas
 * Pages (Number of Read-only pages in memory/RAM). Memory	management	is	done	in	distinct	chunks	called	pages.	This	is	because	the	hardware	memory management	unit	translates	virtual	to	physical	addresses	at	the	granularity	of	a	page.	Hence,	a	page	is	the smallest	unit	of	protection	at	the	hardware	level

 * Kernel Memory: Includes the PAGED and NON-PAGED Pools, HEAPS, SYSTEM CACHE, STACKS, PAGE TABLES, and HYPERSPACE.
 * Executables
 * SYSTEM WORKING SET
 * PRIVATE ALLOCATIONS
 * SYSTEM PAGE-TABLE ENTRIES
 * MAPPED VIEWS
Memory Storage and Paging
 * Private Memory: Memory locations exclusive to a process, not to be shared with another process.
 * Shared Memory: Memory locations that are mapped into multiple processes' address spaces to allow resource sharing or Inter-Process Communication (IPC).
   * File Mapping Objects: A mechanism for creating shared memory by mapping a file (or part of one) into the virtual address space of one or more processes.
 * Working Set: A subset of the Virtual Memory that is currently used by the process and resides in physical RAM.
 * Page File / Swap File: A file on the hard drive (disk) that allows Virtual Memory to extend the limits of physical RAM. It stores less-used data and static data that has been paged out from RAM.
 * Page Fault: Occurs when a process needs to access a part of its virtual memory that's not in its Working Set (RAM). The Memory Manager therefore finds the page on the Hard Drive (Disk) and retrieves it.
VM Management Components
 * Memory Management Unit (MMU): Hardware unit on the CPU that aids in translating a Virtual Address to a Physical Address.
 * Memory Manager: Software component (part of the OS kernel) that uses data structures like the VAD to manage the process's virtual address space.
 * VAD (Virtual Address Descriptor): Data structures that the Memory Manager uses to keep track of the Virtual Address Ranges the process is using.

Memory Manager: has two primary tasks:
Translating, or mapping, a process’s virtual address space into physical memory so that when a thread running in the context of that process reads or writes to the virtual address space, the correct physical address is referenced. (The subset of a process’s virtual address space that is physically resident is called the working set. W orking sets are described in more detail in the section “W orking sets” later in this chapter.)
Paging some of the contents of memory to disk when it becomes overcommitted—that is, when
running threads try to use more physical memory than is currently available—and bringing the
contents back into physical memory when needed.

Execution and Process Isolation
Kernel and User Mode
 * Kernel Mode: The mode of execution in a processor that grants access to all system memory and CPU instructions.
 * User Mode: The restricted mode of execution where application code runs.
   * User Application Code runs in User Mode, whereas OS Code (i.e., system services and device drivers) runs in Kernel Mode.
 * User Applications switch from User Mode \rightarrow Kernel Mode when they make a System Service Call. This is a Mode Transition and is not a Context Switch.
   * When a user-mode program calls a system service, the processor executes a special instruction that switches the calling thread to Kernel Mode. When the system service completes, the O.S. switches the thread context back to User Mode.


Resource Sharing and Security
 * Each process has a security context (the Access Token).
 * A process has a list of Open Handles to Kernel Objects (Files, Shared Memory Sections, Sync Objects).
 * Although threads have their own security context, every thread within a process shares the process's Virtual Address Space and all resources belonging to the process. This means that all the threads in a process have full read-write access to the process's Virtual Address Space.
 * Threads cannot accidentally reference the address space of another process, unless the other process makes available part of its private address space as a shared memory section (File Mapping Object).

SECTION OBJECT: A special chunk of memory managed by the O.S. 
Mapping a section object means that a virtual address range is allocated for the object and its content can become accessible through that range.
 * MAPPED ALLOCATIONS: Section Object also known as Memory-Mapped Files/Modules that are mapped into the process's address space.
 * PRIVATE ALLOCATIONS: : Are allocations that are process private and were allocated locally, typically from HEAPS and STACKS.

KERNEL OBJECTS:
The Windows KERNEL manages its objects using a centralized OBJECT MANAGER(The Object Manager is a core executive component that lives inside the kernel mode part of Windows, specifically within the Executive layer of the Windows kernel) responsible for all Kernel Objects such as SECTIONS, Handles and Modules, Files, Device Objects(Named & Unnamed), Synchronization Objects, Processes, and Threads. 
The O.S. tags each page of Virtual memory with the access mode the processor must be in to read or write the page. Pages in the system space can be accessed by the Kernel Mode, meanwhile, pages in the user address space are accessible from the user mode.
The Windows Kernel manages Objects using a centralized Object Manager component. 

The Object Manager (in ntoskrnl.exe) is like the central directory service for all kernel-mode resources. It:
- Manages all named and unnamed kernel objects (files, events, semaphores, processes, threads, drivers, etc.).
- Provides a unified namespace (\ObjectTypes, \Device, \Sessions, etc.).
- Handles reference counting, handles, and security descriptors.
- Ensures isolation between user-mode and kernel-mode resources.
- Implemented inside ntoskrnl.exe (the main kernel image).
- Its public APIs are exposed through ntdll.dll (in user mode) via the Native API — for example, NtCreateFile or NtOpenProcess eventually call the Object Manager’s internal routines.

The Executive is responsible for all kernel objects. Kernel code accesses objects using direct pointers. The Handle Entry also stores the current access rights the process was granted at the time it opened the object, which enables the system to make sure it doesn't allow the process to perform an operation on the object for which it didn't ask permission.
 * Handles: They are Operating System resources that a process has opened or is currently using, such as a file or Registry key. Object handles are what programs use to manipulate system objects managed by kernel-mode code, such as files, registry keys, synchronization objects, memory sections, window stations, and desktops. 
 * Modules: Are simply binary files that contain isolated areas of a program's executable code.
NAMED OBJECTS:
 * Some kernel objects can be named, which provides a way of uniquely identifying them throughout the system. 
 * Some Kernel Objects are unnamed and are only identified by their handle or Kernel Object Pointer.


Processes and Threads

Program and Process
 * Program: Static set of instructions. An executable program is basically low-level code/data on disk.
 * Process: A container for sets of resources used in executing an instance of a program (Thread).
   * Process Resources Include: A Private Virtual Address Space, a list of open handles to system/kernel resource objects (e.g., Semaphores, Sync Objects, Files), and a list of DLL/Memory-Mapped Files.
 * Threads: An entity within a process that the O.S. schedules for execution.
   * Thread Context: Contents of sets of CPU registers representing the processor state, two stacks (one each for the thread to run in Kernel/User mode), Thread ID, Volatile Registers, and private storage known as Thread Local Storage (TLS). 
Internally, a thread is nothing but a data
structure that has a CONTEXT telling the system the state of the processor when the thread last ran, combined with one or two memory blocks
that are used for stack space. When you think about it, a thread is like a little virtual processor that has its own context and its own stack. The real physical processor switches(CONTEXT) between multiple virtual processors and always starts execution from the thread’s current context information and using the thread’s
stack. The components that manage threads in Windows are the scheduler and the dispatcher, which are together responsible for deciding which thread gets to run for how long, and for performing the actual context switch when its time to change the currently running thread.
An interesting aspect of the Windows architecture is that the kernel is pre-emptive and interruptible, meaning that a thread can usually be interrupted
while running in kernel mode just as it can be interrupted while running in user mode. Preemptive scheduling, which means that threads are given a limited amount of time to run before they are interrupted.
Every thread is assigned a quantum, which is the maximum amount of time the thread is allowed to run continuously. While a thread is running, the operating system uses a low-level hardware timer interrupt to monitor how long it’s been running. Once the thread’s quantum is up, it is temporarily interrupted, and the system allows other threads to run. If no other threads need the CPU, the thread is immediately resumed. The process of suspending and resuming the thread is completely transparent to the thread—the kernel stores the state of all CPU registers before suspending the thread and restores that
state when the thread is resumed. This way the thread has no idea that is was
ever interrupted


 A PROCESS is predominantly an isolated memory space. An address space is created for every program in order to ensure each program runs in its private address space. Inside a process's address space, the system can load Code Modules (Binary files that contain isolated areas of a program's executable).
 * But in order to actually run a program, a process must have at least one THREAD running. The purpose of a thread is to load a Context—enforcing the correct memory address space and initialize the values of all CPU registers.
A THREAD is a primitive code execution unit.
 * Threads are interruptible. This is at the very heart of Windows' capability to achieve CONCURRENCY.
 * At any given moment, each processor in the system is running one thread, running a piece of code.
 * CONTEXT STRUCTURE: The data of a thread's state that is saved when the thread is not running and combined with memory block (1 or 2) used for stack space.
 The reason a thread can have two stacks is that in Windows threads alternate between running user-mode code and kernel-mode code within a program. Separating the stacks is a basic security and robustness requirement. If the user-mode code had access to kernel stacks, the system would be vulnerable to a variety of malicious attacks.
   * The components that manage threads in Windows are the "Scheduler" and "Dispatcher".
   * The "Scheduler" decides which thread gets to run and for how long. The Dispatcher dispatches running or interrupted threads to wait or continue running.
   * The Dispatcher performs the context switching when it's time to change the currently running thread.

HOW & WHY A THREAD CONTEXT-SWITCHES?
The truth is that threads frequently just give up the CPU on their own volition. This happens whenever a program is waiting for something external to finish (e.g., I/O).
 * Take for instance, when a program calls the Win32 GetMessage API. It's how applications ask the system if a user has generated any new input events. GetMessage accesses a message queue and just pulls out the next event. But in cases where the message queue is empty, GetMessage enters a waiting mode.
 * In cases where a thread runs complex algorithms involving billions of calculations that could take hours, to avoid congestion, Windows uses Preemptive Scheduling, which means the threads are given a limited amount of time to run before being interrupted by the Kernel.
 * Threads that are Blocked are put in a Wait State by the Kernel and are not Dispatched until the wait state is satisfied. The scheduler must be aware of them in order to know when a wait state has been satisfied and a specific thread can continue execution.

Synchronization Objects
Windows supports several built-in Sync Objects, each related to a specific type of data structure that needs to be protected. All Synchronization Objects (except Critical Section) are managed by the Kernel Object Manager and are implemented in Kernel Mode, which means that the system must switch into the Kernel Mode for any operation that needs to be performed on them.
 * EVENT: A simple Boolean Sync Object that can be set to TRUE or FALSE.
 * MUTEX (from the word Mutually Exclusive): An object that can only be acquired by one thread at any given moment.
 * Semaphores: Is like a Mutex with a user-defined counter that defines how many simultaneous owners are allowed on it.
 * Critical Section: An optimized implementation of a Mutex, logically identical to a Mutex, but with the difference that it is process private and that most of it is implemented in User-Mode.
The basic design of all synchronization objects is that they allow two or more threads to compete for a single resource, and they help ensure that only a controlled number of threads actually access the resource at any given moment. Blocked threads are put in a special Wait State. Sync Objects are implemented by the O.S. The Scheduler must be aware of their existence in order to know when a wait state is satisfied and a specific thread can continue execution.


Application Programming Interfaces (APIs)
API's are a set of functions that the Operating System makes available to application programs for communicating with the Operating System.
 * NTDLL: NT Layer DLL in Windows (System32). The NATIVE API is the actual interface to the Windows NT System and the most direct interface into the Windows kernel, providing interfaces for direct interfacing with the memory manager, I/O System, Object Manager, Process, and Thread management, and so on.
The Native API functions are a set of functions exported from the NTDLL.DLL (for user-mode callers) and from NTOSKRNL.EXE (for kernel-mode callers). They start with the prefix Nt or Zw.

In their user-mode implementation in NTDLL.DLL, the two groups of APIs are identical and actually point to the same code. In kernel mode, they are different: the Nt versions are the actual implementations of the APIs, while the Zw
versions are stubs that go through the system-call mechanism. The reason you would want to go through the system-call mechanism when calling an API from kernel mode is to “prove” to the API being called that you’re actually calling it from kernel mode. If you don’t do that, the API might think it is being called from user-mode code and will verify that all parameters only contain
user-mode addresses. This is a safety mechanism employed by the system to make sure user mode calls don’t corrupt the system by passing kernel-memory pointers. For kernel-mode code, calling the Zw APIs is a way to simplify the process of calling functions because you can pass regular kernel-mode pointers.

WINDOWS 32 API: 
Is a very large set of functions that make up the official low-level programming interface for Windows applications.
Recently, Microsoft introduced some higher-level interfaces (e.g., .NET Framework, C++ objects) that exposed most of the features offered by the Win32 API. The .NET Framework uses System Classes for accessing O.S. services, which is again an interface into the Win32 API. No matter the high-level interface an application employs, it's eventually going to use the Win32 API for communicating with the O.S. The Win32 API  (kernel32, user32, gdi32, advapi32)  is therefore a wrapper layer over the Native API and acts as the public interface to the subsystem that CSRSS helps manage. CSRSS works alongside the win32k.sys (in kernel mode) and the Win32 DLLs (in user mode). Together they form the Windows subsystem that gives user processes their GUI and environment.

User App → kernel32.dll (Win32 API)
    → ntdll.dll (Native API)
        → syscalls into ntoskrnl.exe (Kernel) 

These APIs are divided into two categories: User and Kernel API Layers
| Component | Description | Layer |
| Kernel32.DLL | Base API Client Component (Non-GUI related services) | User Mode |
| User32.DLL | Hosts the USER API Client Component (GUI-related services) | User Mode |
| GDI32.DLL | GDI API Client Component (Low-level graphics services) | User Mode |
| NTDLL.DLL | NATIVE API Interface Client Component | User Mode |
| NTOSKRNL.EXE | NATIVE OS KERNEL Executable, Kernel Implementation of the User API, and NATIVE API | Kernel Mode |
| Win32k.SYS | The Windows Kernel implementation of the Win32 Kernel (Graphics and User Interface implementation) | Kernel Mode |

The Win32 subsystem is the component responsible for every aspect of the Windows user interface. This starts with the low-level graphics engine, the graphics device interface (GDI), and ends with the USER component, which is
responsible for higher-level GUI constructs such as windows and menus, and for processing user input. First of all, it’s important to realize that the components considered the Win32 subsystem are not responsible for the entire Win32 API, only for the USER and GDI portions of it. As described earlier, the BASE API exported from
KERNEL32.DLL is implemented using direct calls into the native API, and has really nothing to do with the Win32 subsystem.
The Win32 subsystem is implemented inside the WIN32K.SYS kernel component and is controlled by the USER32.DLL and GDI32.DLL user components. Communications between the user-mode DLLs and the kernel component is performed using conventional system calls (the same mechanism used throughout the system for calling into the kernel)


Process and Thread Security
 * LSA (Local Security Authority)
 * Users have a Full Token and a Filtered Token.
 * User Account Control (UAC) Elevation is required for programs that need administrative privileges. It can be triggered in multiple ways: Silent, Prompt for Consent, or Prompt for Credentials. If the parent process is already running with an Admin token, the child process implicitly inherits this token, and the UAC Elevation sequence is not required or needed.
Core Definitions
 * A Program is an executable sequence of instructions.
 * A Process is a container for a set of resources belonging to the program.
 * Every thread in a process has full access to all the resources represented by the process.
 * A Process has:
   * A separate Virtual Address Space to store and reference data and code.
   * A security context called an Access Token that identifies the User, Security Groups, LSA Logon Session ID, and Remote Desktop Services Session ID. Each process has a record of the privileges granted to it, its UAC Virtualization State, and its Integrity Level.
Job Object
 * A Job allows groups of processes to be managed and manipulated as a single unit.
 * A Job Object also allows control of certain attributes and provides limits for the processes within it.
Thread Details
 * A Thread is the entity within a process that Windows schedules for execution.
 * The Contents of a set of CPU Registers represents the state of the processor (CONTEXT).
 * Two Stacks: One for use when the thread is executing in Kernel Mode or User Mode.
 * A separate storage area called TLS (Thread Local Storage).
 * A unique identifier called TID (Thread ID).
Every thread within a process shares the process's Virtual Address Space.
 * Image on Disk: The executable file on the filesystem, representing the program's static state.
 * Process's Primary Storage: Physical RAM (Random Access Memory).
 * Process's Secondary Storage: Disk storage (where the Page File resides).
 * Symbols: Debugging symbols are a map of memory addresses to source code line numbers, function names, and variable names, essential for human-readable debugging. http://msdl.microsoft.com/download/symbols is the official Microsoft symbol server URL.


System Calling Mechanism
A System Call takes place when user-mode code needs to call a kernel-mode function, which frequently happens when an application calls an Operating System API. The user-mode side of the API usually performs basic parameter validation checks and calls down into the Kernel to actually perform the requested operation. It's not possible to directly call a kernel function from user-mode, as this would be a serious vulnerability.
The O.S. has a special mechanism for switching from User-Mode to Kernel Mode. The idea is that the user-mode code invokes a special CPU instruction that tells the processor to switch to its privileged mode and call a special dispatch routine. The dispatch routine then calls the specific system function requested from the user-mode.
 * Privileged Mode: CPU terminology for kernel-mode execution.

Anatomy of a Windows System Call
Executable(Library)!<Prefix><Operation><Object> + Offset, aligns perfectly with how analysts view function calls and addresses in a debugger:
 * Executable/Library! (The Module): This is the DLL or EXE where the function is located.
   * Example: NTDLL.DLL! (The primary user-mode interface to the kernel).
 * <Prefix> (The Internal Component): This identifies the Executive Component or subsystem responsible for the routine.
   * Examples: Mm (Memory Manager), Ps (Process Structure), Io (I/O Manager), or Zw/Nt (Native API stubs).
 * <Operation> (The Action): This is the verb describing the intended action.
   * Examples: Create, Open, Query, Allocate, Write.
 * <Object> (The Resource): This is the noun identifying the Kernel Object or resource being acted upon.
   * Examples: Process, Thread, File, Event, Token.
The combination of <Prefix><Operation><Object> forms the full function name (e.g., NtCreateFile, PsTerminateSystemThread).
 * + Offset (The Address): This is the relative address of the function's entry point inside the module's memory space, crucial for finding the exact instruction in a debugger.
Example in a Debugger:
NTDLL.DLL!NtAllocateVirtualMemory+0x14
This tells the analyst: "A call was made from NTDLL.DLL to the Memory Manager (Nt/Mm) to Allocate Virtual Memory, and the instruction is located 14 bytes past the start of the function."

 
Prefixes
| Prefix | Component | Notes |
|---|---|---|
| Alpc | Asynchronous Local Procedure Call | Communication mechanism. |
| Cm | Configuration Manager | Registry handling. |
| Dbg | Debug | Debugging support routines. |
| Etw | Event Tracing for Windows | Logging and tracing. |
| Ex | Executive Support | General-purpose support routines (e.g., ExAllocatePoolWithTag / ExInitializeResource). |
| Io | I/O Manager | I/O request packet handling. |
| Kd | Kernel Debugger | Debugger communication. |
| Ke | Kernel | Low-level kernel primitives. |
| Kse | Kernel Security Engine | Security enforcement. |
| Lsa | Local Security Authority | Security functions. |
| Mm | Memory Manager | Virtual memory and page file management. |
| Ob | Object Manager | Object creation, deletion, and reference counting. |
| Pp | Plug and Play Manager | Device and driver management. |
| Ps | Process Structure | Process and thread management. |
| Rtl | Run-Time Library | General utility functions (accessible from User Mode via System Call). |
| Se | Security | Core security operations. |
| Sm | Session Manager | Session creation and management. |
| Woi | Windows OS Isolation | Isolation features. |
| Wmi | Windows Management Instrumentation | Management/monitoring framework. |
| Zw / Nt | Native System Services | Interface called from User Mode to Kernel Mode (NTDLL.DLL exports these). |

Libraries(Modules) & Executables
Static Libraries: Represent a certain component of a program, a feature, or area of functionality in the program. Static Libraries are added to a program while it's being built, adding certain functionality to it.
Dynamic Link Libraries (DLLs) in Windows: Similar to static libraries, except that they are not embedded into the program. They remain in a separate file, even when the program is shipped to the end user. DLLs allow for upgrading individual components in a program without updating the entire program. The idea is that a program can be broken into more than one executable file where each is responsible for one feature or area of program functionality. The benefit is that overall memory consumption is reduced as executables are not loaded until the features they implement are required.
DLLs are different from build-time Static Libraries (.lib). The latter are permanently embedded in an executable. The code in .lib files is statically linked into an executable while it's built, just as if the code in .lib files was part of the original program source code. Windows programs use two methods of loading and attaching to DLLs at runtime:
 * Static Linking: Is a process implemented where each executable module lists the modules it uses and functions it calls within each module, like a reference (called the Import Table). When the loader loads such an executable, it also loads all modules that are used by the current module and resolves all external references so that the executable holds valid pointers to all external functions it plans on calling.
 * Runtime Linking: Refers to a different process implementation where an application can decide to load another DLL in runtime or call a function from that executable. The difference between the two methods is that in Dynamic Linking (Runtime), the program must manually load the right module at runtime and find the right functions to call by searching the target executable's headers. Runtime linking is more flexible, but is also more difficult to implement from the programmer’s perspective. From a reversing standpoint, static
linking is easier to deal with because it openly exposes which functions are called from which modules.


### How DLLs Reduce Memory Usage in Windows
When a Dynamic Link Library (DLL) such as user32.dll or kernel32.dll is loaded by multiple processes, Windows optimizes memory usage through shared memory mapping rather than duplicating the DLL in physical memory for each process.

1. Shared Code Sections
The code section of a DLL (which contains compiled machine instructions) is read-only and identical across all processes.
When a process loads a DLL, the operating system checks whether that DLL is already loaded in physical memory.

- If it is, Windows maps the existing pages of the DLL into the new process’s virtual address space.
- No new copy is created in physical RAM; only a new virtual mapping is added.

This allows multiple processes to execute the same DLL code while consuming memory for only one physical copy.

2. Private Data Sections
While code sections are shared, data sections (which include writable areas such as global variables) are not shared.
Each process receives its own copy of the DLL’s writable data region, ensuring process isolation and preventing data corruption.

3. Efficiency and Performance
By sharing read-only sections:

- System memory consumption is significantly reduced.
- Page cache efficiency is improved, as the same pages are reused across processes.
- Application startup times decrease because DLLs already resident in memory do not need to be reloaded from disk.

4. Example
If three processes use kernel32.dll, only one 10 MB copy of the code section resides in RAM.
Each process maps that same 10 MB region into its virtual address space, while maintaining separate data regions.


Program's Executables (PE) are Relocatable. This simply means that they could be loaded at different Virtual Addresses each time they are loaded (but cannot be relocated after they have been loaded). Relocation happens because an executable doesn't exist in isolation—it must co-exist with other executables that are loaded in the same address space. Other than the main executable (the .exe file you launch when you run a program), every program has a number of additional executables loaded into its address space, regardless of whether it has DLLs of its own or not. The O.S. loads quite a few DLLs. Because multiple executables are loaded into each address space, we have a mixed collection of executables in each address space that wasn't necessarily planned for.
 * RVA (Relative Virtual Address): An offset from the module's base address.
 * Base Address: Each module (low-level binary code) is assigned a Base Address while being created. The linker assumes that the executable is going to be loaded at the base address. If it is, no relocation will take place. Else, the module is relocated if the module's base address space is already taken.
 * Relocations are important and are the reason why there are never ABSOLUTE addresses in executable headers, only in code. Whenever you have a pointer inside the executable header, it'll always be in the form of an RVA, which is just an offset(+0x00aabb) into that file. When the file is loaded (.exe) and assigned a Virtual Address, the loader calculates the real virtual addresses out of RVAs by adding the module's base address (where it was loaded) to an RVA.
* The executable stores RVA — “offsets” instead of absolute addresses. When Windows loads the module, it adds the actual base address to the RVA to find the true memory address.


* Image Sections are needed because different areas of the module image are treated differently by the memory manager when a module is loaded. A common division is to have a Code Section (e.g., the .text section), containing the executable code, and a Data Section, containing the initialized and uninitialized data. They contain the contents of any initialized variable anywhere in the program.
 
* Section Alignment: The memory manager sets the access rights on memory pages in the different sections based on the memory settings in the section headers. Section alignment shows how sections are aligned when the executable is loaded in memory, and file alignment is how sections are aligned inside the PE file on disk (from memory).

Imports and Exports: These are the mechanisms that enable the dynamic linking process of executables described above.
Consider an executable that references functions in other executables while it's being compiled and linked. The compiler and linker have no idea of the actual address of the imported functions. Only in runtime will this address be known. To solve this problem, the linker creates a special Import Table that lists all the functions imported by the current module by their names. The Import Table contains a list of modules that the module uses and the list of functions called within each of those modules.
When the module is loaded, the loader loads every module listed in the Import Table and goes to find the address of the functions listed in each module. The addresses are found by going over the exporting module's Export Table, which contains the names and RVAs of every exported function.
When the importing module needs to call into an imported function, the calling code typically looks like this: Call [Some Address], where Some Address is a pointer into the executable's Import Address Table (IAT).
When the module is linked, the IAT is nothing but a list of empty values. But when the module is loaded, the linker resolves each entry in the IAT to point to the actual function in the exporting module. This way, when the calling code is executed, Some Address will point to the actual address of the imported function.

PROGRAM EXECUTABLE Directories
PE Executables contain a list of special optional directories, which are essentially data structures that describe their contents.
| Name | Associated Data Structure |
| Export Directory | IMAGE_EXPORT_DIRECTORY |
| Import Table | Image_Import_Descriptor |
| Import Address Table (IAT) | A list of 32-bit pointers |
| Resource Table | Image_Resource_Directory |
| Base Relocation Table | Image_Base_Relocation |
| Debugging Information | Image_Debug_Directory |
| Thread Local Storage (TLS) Directory | Image_TLS_Directory |
| Load Configuration Table | Image_Load_Config_Directory |
| Bound Import Table | Image_Bound_Import_Descriptor |
| Delay Import Descriptor | Image_Delay_Load_Descriptor |

Exception Handling
An Exception is a special condition in a program that initializes a special function called an Exception Handler. The exception handler either deals with the exception, corrects the problem, or terminates the program if the exception cannot be resolved.
 * Hardware Exceptions: Are generated by the processor.
 * Software Exceptions: Is generated when a program explicitly generates an exception in order to report an error/problem. In C++, we can use the throw keyword. However, in Windows, the throw keyword is implemented using the RaiseException API, which goes down into the kernel but follows a similar code path as a hardware exception, eventually returning to user mode to notify the program of the exception.

Structured Exception Handling (SEH)
The O.S. provides a mechanism for distributing exceptions to applications in an organized manner, where each thread is assigned an Exception-Handler list (that deals with exceptions). This list is stored in the Thread Information Block (TIB) data structure, which is available from user mode. The TIB is stored in a regular, private-allocation, user-mode memory.


Virtualization and Security
Hypervisor and Virtual Machines
 * Virtualization Technologies (Hyper-V, XEN, KVM, VMWARE, VirtualBox, QEMU): Employ a Hypervisor, which is a specialized, highly privileged component that allows for the virtualization and isolation of all resources on the machine, from physical memory to virtual memory, device drivers, etc.


Virtualization-Based Security (VBS)
VBS is a security architecture that enhances the processor's natural privilege-based separation (User/Kernel) via the introduction of Virtual Trust Levels (VTLs), isolating access to memory, hardware, and the processor.
 * VTL 0/VTL 1: VBS capabilities introduce a new VTL 1 layer, which contains its own Secure Kernel (SecureKernel.exe) running in privileged processor mode. VTL 0 is the regular Windows OS.
 * Secure Kernel / Proxy Kernel: The VTL 1 Secure Kernel is its own secure binary.
 * Isolated User Mode (IUM): An environment that restricts the allowed system calls that regular User-Mode DLLs can make. It's a framework that adds special secure system calls that can execute only under VTL 1. These calls are exposed through internal system libraries like Jumapal.dll and Jumplibrary.dll.
 * SLAT (Second Level Address Translation): Hardware I/O MMU (Input/Output Memory Management Unit). The Secure Kernel uses SLAT to intercept and control execution of memory locations. It's the basis for security features like Credential Guard and Device Guard.
 * I/O MMU: Effectively virtualizes memory access for devices; this can be used to prevent device drivers from using Direct Memory Access (DMA) to directly access the Hypervisor's or Secure Kernel's physical regions of memory.
 * Trustlets: Specially signed binaries with a unique ID and signature allowed to run/execute in VTL 1 by the Secure Kernel. The Secure Kernel has hard-coded knowledge of which Trustlets have been created, so it's impossible to create new Trustlets without access to the Secure Kernel. Executing Trustlets cannot be patched.
 * HyperGuard: Protects Kernel-related data structures and code using Hyper-V virtualization.
 * Credential Guard: Prevents unauthorized access to domain credentials and related application data structures.
 * Device Guard: Provides a stronger security baseline for applications.
 * Host Guardian Service (HGS): Employs Virtual TPM (Trusted Platform Module) to protect the SHIELD Fabric VM from the infrastructure or host.
 * UEFI (Unified Extensible Firmware Interface): A secure boot implementation guaranteeing strong requirements around the signature quality of the boot-related software (firmware) must be present. This process guarantees that Windows Components (Operating System) loads securely from the beginning of boot.


Terminal Services
 * Terminal Services (Remote Desktop, mstsc.exe, Microsoft Terminal Services / Fast User Switching) refers to the support in Windows for multiple interactive sessions on a single system. A remote user can establish a connection/session on another machine, \log in, and run apps on the server. The server transmits audio, video, and clipboard data and the client transmits user input back to the server.
Kernel Objects
 * A Kernel Object is a single, run-time instance of a statically defined object type.
 * An Object Type comprises a system-defined data type, functions that operate on instances of the data type, and a set of object attributes.
 * An Object Attribute is a field of data in an object that partially defines its state.
   * An object of Type: PROCESS would have attributes like Process ID, Scheduling Priority, and a pointer to an Access Token.
 * Object Methods: Means for manipulating objects, usually to read or change Object Attributes.
 * Object Manager: (Kernel Component) accomplishes the following OS tasks: Reference Counting (Allows system to recognize when an object is no longer in use \rightarrow memory space is automatically deallocated), Sharing Resources, and Protecting Resources from unauthorized access.
 * Not all data structures in Windows are objects (e.g., many internal data structures are not exposed to the Object Manager).
Security and Access Control
Core Security Capabilities
 * Privileged Access Control: Allows administrator access to protected objects.
 * Discretionary / Mandatory Access Control (DAC/MAC): Protection for all shareable system objects in DLLs, files, threads, processes, etc.
 * Need-to-Know: A method by which owners or creators of objects grant/deny access to others.
 * Security Context: Access Token on the subject (the thread/process) is combined with the Access Control List (ACL) on the object (the resource) to determine permission to perform the requested operation.
 * Attribute-Based / Dynamic Access Control (ABAC/DAC): (Introduced in Windows Server 2012 and Windows 8) Infuses access control using more than just groups. It identifies required attributes/claims that grant access to a resource.



Windows Architecture -> Executive and Kernel

￼
Windows achieves portability across hardware architectures by using a Layered Design and by using the C Language. Windows is a Symmetric Multi-Processing (SMP) O.S.
 * SMP has no master processor. The O.S./Kernel threads as well as User threads can be scheduled to run on any processor. All the processors share just one memory space. This model contrasts the Asymmetric Multi-Processing (ASMP), in which the O.S. typically selects one processor to execute O.S./Kernel-wide code, while others run only in User Mode.
Multi-Processing Features
 * The ability to run O.S. Code on any available processor and on multiple processors at the same time.
 * Multiple threads of execution within a single process, each of which can execute simultaneously on different processors.
 * Fine-grained synchronization within the kernel, device drivers, and server processes, which allows more components to run concurrently on multiple processors.
 * Mechanisms that facilitate the efficient implementation of multi-threaded server processes that can scale well on multiprocessor systems.

Executive Components
The Executive is the upper layer of NTOSKRNL.EXE. The Kernel is the lower layer. 
The Executive contains Base OS Services and is the internal component that exports the documented OS API to the Object Manager.
| Executive Component | Role |
|---|---|
| Configuration Manager | Responsible for implementing and managing the system registry. |
| Process Manager | Creates and terminates processes and threads. |
| Security Reference Monitor (SRM) | Enforces security policies on the local computer. |
| I/O Manager | Implements device-dependent I/O and is responsible for dispatching to the appropriate device drivers. |
| Memory Manager | Implements Virtual Memory, a scheme providing a large private address space for each process. |
| Power Manager | Coordinates power events and generates power management I/O notifications to device drivers. |
| Cache Manager | Improves performance of file-based I/O by causing recently referenced disk data to reside in memory. |
| Plug & Play Manager | Determines what drivers are required to support a particular device and loads those, retaining the hardware resource requirements for each device during enumeration. |

Executive Support Functions: The Executive contains four main groups of support functions that are used by the Executive Components: Object Manager, Run Time Library Functions, Executive Support Routines, and Asynchronous Local Procedure Call (ALPC).
 * ALPC: Used as a transport for Remote Procedure Call (RPC). Windows implements an industry-standard communication facility for client and server processes across a network.

Kernel Components
The Kernel provides fundamental mechanisms used by the Executive components and low-level hardware architecture.

Kernel Objects : Help the kernel control CPU processing and support the creation of Executive objects. Most Executive-level Objects encapsulate one or more kernel objects, incorporating their defined attributes. Control Objects, Async Procedural Call (APC) Object, Deferred Procedure Call (DPC) Object, Interrupt Object, Dispatcher Object.

Kernel Processor Control Region (KPCR) : A data structure used to store processor-specific data (e.g., the processor's Interrupt Dispatch Table, Task State Segment, and Global Descriptor Table).

Kernel Process Control Block (KPRCB) : An embedded data structure inside the KPCR containing: Scheduling Info, Dispatcher Database, DPC Queue, Time Accounting Info, Cache Size, and Processor Stats.

I/O Manager : Manages device-independent I/O operations and is responsible for dispatching I/O requests to the appropriate device drivers.

Device Drivers : Includes hardware device drivers, translating user I/O function calls into specific hardware requests. 
HAL (Hardware Abstraction Layer) : Abstracts and isolates the kernel, drivers, and Executive from platform-specific hardware differences (e.g., differences in motherboards). 


HARDWARE ABSTRACTION LAYER (HAL)
The HAL is a loadable kernel-mode module that provides a low-level interface to the hardware platform on which Windows is running. It hides hardware-dependent details, multi-processor mechanisms, and any functions that are both architecture-specific and machine-dependent.
 * Rather than accessing hardware directly, Windows Internal components and user-written device drivers maintain portability by calling the HAL.DLL Routines whenever they need platform-dependent information.
 * All x64 and ARM machines have the same motherboard configuration; their processors require ACPI's and APIC support.
 * Windows supports modules known as HAL Extensions (additional DLLs on disk) that the boot loader may load if specific hardware requiring them is needed (usually through ACPI and Registry-based configuration).

Input & Output (I/O)
I/O channels implemented with Windows can be divided into two groups: kernel-level and high-level.
 * The low-level layer is the I/O system responsible for communicating with the hardware, and so on.
 * The higher-level layer is the Win32 Subsystem responsible for implementing the GUI and for processing User Input.

I/O System and Device Drivers
The I/O system is a combination of kernel components that manage the device drivers running in the system and the communication between applications and device drivers. Device drivers register with the I/O System, which enables applications to communicate with them and make generic or device-specific requests to or from the device. The I/O System is responsible for relaying such requests from the application to the device drivers that are responsible for performing the operation.
The I/O system is layered, which means that for each device, there can be multiple device drivers stacked on top of each other.


DEVICE DRIVERS
Device Drivers are loadable kernel-mode modules that interface between the I/O Manager and the relevant hardware. Drivers enable Windows to interact with various types of hardware, including displays, storage, smartcard readers, and human input devices. They are also used to monitor network traffic and file I/O by antivirus software (and by Sysinternals
utilities such as Procmon and Procexp!). And, of course, they are also used by malware, particularly rootkits.
They run in Kernel Mode in one of three contexts:
 * As a result of an Interrupt, in the context of whatever thread is current.
 * In the context of the User Thread that initiated an I/O function.
 * In the context of a kernel-mode system thread.
 * Device drivers in Windows don't manipulate Hardware directly. Rather, they call functions in the HAL.DLL to interface.
 * Drivers written in C/C++ use HAL routines, are source-code portable across the CPU architectures supported by Windows.

Types of Drivers
 * Hardware Device Drivers: These use the HAL to manipulate hardware to write output/retrieve input from a device/network.
 * File System Drivers (FSDs): These accept file-oriented I/O requests and translate them into I/O Requests bound for a device.
 * File System Filter Drivers: These include drivers that perform Disk Mirroring / Encryption / Scans and intercept I/O Requests and perform some value-added processing before passing the I/O Request to the next layer.
 * Network Redirectors & Servers: These are file system drivers that transmit/receive file system I/O Requests to a device on a Network.
 * Protocol Drivers: These implement a networking protocol (e.g., TCP/IP, NetBIOS, IPX/SPX).
 * Kernel Streaming Filter Drivers: These are chained together to perform signal processing on data streams.
 * Software Drivers: These are kernel modules that perform operations that can only be done in kernel mode on behalf of a user-mode application.

WDK (Windows Driver Kit): Aimed at developers of device drivers.
WSDK (Windows Software Development Kit): Aimed at developers of Windows-supported software/applications.

Windows Driver Model (WDM) Perspective
According to the Windows Driver Model (WDM) perspective, there are three kinds of drivers:
 * Bus Driver: Services a Bus Controller, adapter, bridge, or any device that has child devices.
 * Function Driver: Is the main driver that provides the operational interface for its device.
 * Filter Driver: Is used to add functionality to a device or existing driver, or to also modify I/O Requests/Responses.
   * It's often used to fix hardware that provides incorrect information about its resource requirements.
 * A Bus Driver is concerned with reporting the devices on its bus to the PnP Manager (an Executive Component that determines which drivers are required to support a particular device—Function Drivers—and loads those drivers).
 * Lower-level filter drivers modify the behavior of device hardware, while upper-level filter drivers usually provide added-value features for a device (e.g., enforce additional security checks on a file).

Windows Driver Foundation (WDF)
The Windows Driver Foundation (WDF) simplifies Windows driver development by providing two frameworks:
 * KERNEL-MODE DRIVER FRAMEWORK (KMDF)
 * USER-MODE DRIVER FRAMEWORK (UMDF)
 * KMDF provides a simple interface to WDM and hides its complexity from the Driver Writer/Engineer.
 * UMDF runs each user-mode driver in what is essentially a user-mode service, and uses ALPC to communicate to a kernel-mode wrapper driver that provides actual access to the hardware.
Universal Windows Drivers (UWD)
 * UWD refers to the ability to write device drivers once that share APIs and Device Driver Interfaces (DDIs) provided by Windows to a common core.
 * They are binary compatible for a specific CPU architecture (x86, x64, ARM) and can be used as-is on a variety of form factors.
 * UWD can use KMDF, UMDF 2.0, or WinRT as their driver model.
 * Examine installed system drivers using the System Information Tool (Msinfo32.exe) and expanding the Software Environment \rightarrow System Drivers node.
 * Device Drivers and Windows Service processes are both defined in \rightarrow HKLM\SYSTEM\CurrentControlSet\Services.
 * Looking at the list of functions in NTDLL/HAL/NTOSKRNL gives you a list of all the system services that Windows provides to user-mode subsystem DLLs versus the subset that each subsystem exposes.


System Processes and Boot Structure

| Process Name | Process ID (PID) | Notes |
| Idle Process | 0 | (1 thread per CPU) to account for idle CPU time. |
| System Process | 4 | Contains the majority of kernel-mode system threads and handles core Executive services. |
| Secure System Process | N/A | Contains the address space of the Secure Kernel (VTL 1), if running. |
| Memory Compression Process | N/A | Contains the compressed working set of user-mode processes. |
| Session Manager (smss.exe) | N/A | Process that creates sessions and the initial processes for service hosts. |
| Logon Process (winlogon.exe) | N/A | Handles interactive user logon/logoff. |
| Local Security Auth Server (lsass.exe) | N/A | Local Security Authority Server (LSA). |
| Local Security Auth Server (lsaiso.exe) | N/A | Isolated LSA Trustlet (if Credential Guard is enabled). |

To understand how these processes are related, it's helpful to view the process tree (parent/child relationship between processes). Viewing which process created which helps understand where each process is from. To understand this correctly, perform a BOOT TRACE, by enabling boot logging in Process Monitor. Using Process Monitor enables you to see processes that have since terminated.

Non-Standard System Processes
 * Secure System Process: The Secure System process and the Memory Compression process aren't running a real user-mode Image from disk. It is technically home to VTL 1 Secure Kernel address space, handles & threads. Because scheduling, Object, Process & Memory management are owned by the VTL 0 kernel, no actual entities are associated with this process. Its only real use is to provide a visual indicator to users that VBS is active.
 * Memory Compression Process: Its primary job is to host the threads responsible for compressing & decompressing memory pages. It efficiently manages the working set and reduces the need to page data out to Disk. It uses its user-mode address space to store the compressed pages of memory that correspond to Standby Memory extracted from other processes.

System Process (PID 4)
 * The System process is the home for a special kind of thread that runs only in kernel-mode—a "System Thread".
 * System threads don't have a user-process address space and hence must allocate any dynamic storage from OS Memory heaps, such as the Paged/Non-Paged pool.
 * They are created by the PsCreateSystemThread function.
 * Windows, as well as wrapper device drivers, create system threads during system initialization (WinInit) to perform operations that require thread creation attributes (e.g., priority, synchronization objects, issuing and waiting for I/O, or other objects, or polling a device (polling is more efficient than Interrupt-driven I/O)).
 * By default, system threads are owned by the System process, but a device driver can create a system thread in any process (e.g., the WMDs subsystem device driver (Win32k.sys) creates a thread (system thread) inside the Canonical Display Driver part of the WMDs Subsystem process so that it can easily access data in the user-mode address space of that process).
 * During troubleshooting, it's advisable to map the execution of individual system threads back to the driver or even to the subroutine that contains the code executed.

MiniMAL Processes (Memory Compression / Secure System Process)

The Minimal Flag is set on certain system processes (like the Memory Compression Process and the Secure System Process if VBS is enabled).
* No User-Address Space will be set up, therefore no Process Environment Block ($\text{PEB}$) or related structure will exist.
* No executable Image is associated with their execution, as they aren't running a real User-Mode Image from disk.
* No $\text{NTDLL}$ will be mapped into the process; no Section Objects will be tied to the process.
* This flag is set in the $\text{EPROCESS}$ Flags, causing all threads to become minimal threads, and as such, no $\text{TEB}$ (Thread Environment Block) will be created.

Pico Processes

Pico Provider Control allows the emulation of the behavior of a completely different Operating System kernel.
To support the existence of Pico Processes on the system, a provider must be present and registered with the kernel. On Windows systems with the optional WSL (Windows Subsystem for Linux) component enabled, a core driver called Lxss.sys serves as a stub driver (provider) until another driver, Lxcore.sys, loads a bit later and takes over the pico provider responsibilities.
When a Pico Provider calls the registration API, it receives a set of function pointers to create and manage pico processes. The provider can now create fully custom processes and threads for which it controls the critical starting state, segment registers, and associated data. This alone would not allow the ability to emulate another Operating System. A second set of function pointers is, therefore, transmitted from the provider to the kernel, which serves as callbacks whenever certain activities or interactions will be performed by a pico thread or process. These include:
* When the Pico Thread makes a call using a syscall function.
* Whenever an exception is raised from a pico thread.
* Page Faults.
* When Event Tracing for Windows is requesting the User-Mode stack trace of a pico process.
* Request for pico process termination.
It now becomes clear that with such unparalleled access to any possible user-kernel transition and interactions between a Pico Process/Thread and the O.S., can be fully encapsulated by a Pico Provider to wrap a completely different kernel implementation than that of Windows. Pico Providers are custom-written Kernel Modules that implement callbacks to respond to the list of possible events that a pico process can cause. This is how WSL is capable of running unmodified Linux $\text{ELF}$ binaries in User-Mode.

TRUSTLETS (Secure System Process)

Trustlets are regular Windows Portable Executables ($\text{PE}$) files that contain some IUM-specific properties and can import only a limited set of Windows System DLLs due to the restricted number of system calls that are available to them. The IUM-specific system DLL is jumbase.dll, which provides the base IUM system API. This library ends up calling into jumaal.dll (the VTL 1 version of NTDLL.DLL).
They are signed with a certificate that contains the Isolated User Mode EKU ($\text{1.3.6.1.4.1.311.10.3.37}$).
Trustlet Policy Metadata includes various options for configuring how "accessible" the Trustlet will be from VTL 0. This is described by a structure present at the _JumPolicyMetadata export and contains a Version Number. This serves as metadata for the Secure Kernel to implement policy settings around permitting $\text{VTL 0}$ (Kernel) access to the Trustlet (e.g., allowing debugging, crash dumps, Event Tracing, and other capability support).
Trustlet Attributes are used to authenticate that the caller truly wants to create a Trustlet, as well as to verify that the Trustlet the caller thinks is executing is actually the Trustlet being executed. This is done by embedding a Trustlet Identifier in the attribute, which must match the Trustlet ID contained in the metadata.
The benefits of running as a Trustlet include access to privileged and protected Secure System Calls offered by the Secure Kernel. As the Secure Kernel attempts to minimize its attack surface and exposure, it provides only a subset of all of the System Calls that a normal kernel ($\text{VTL 0}$) application can use. These system calls are the strict minimum necessary for compatibility with the system calls that Trustlets can use, as well as the specific services required to support the RPC Runtime Library ($\text{Rpcrt.dll}$) and ETW Tracing, including the following groups:
* Thread API
* Process Info API
* Synchronization Object API
* Advanced Local Procedure Call (ALPC) API
* System Information API
* Virtual Memory Allocation API
* Section API
* Trace Control API
* Exception API
Secure processes can be identified in the kernel debugger by their names, Secure PID, and


Session Manager (SMSS.EXE)
The Session Manager (smss.exe) is the first user-mode process created in the system, launched by the kernel-mode system thread that performs the final phase of initialization of the Executive & KERNEL.
 * When started, smss.exe checks whether it's the first instance or an instance of itself launched to create a session. If command-line arguments are present, it was therefore not the first instance. This permits creating concurrent sessions, enhancing logon performance on Terminal Server Systems where multiple users can log on at the same time.
 * Once a session finalizes initialization, the copy of smss.exe terminates.
 * The Master smss.exe marks the Initialization Process (by its initial thread) as critical (an exit for any reason leads to a crash).
 * It initializes a thread pool to handle ALPC Commands and creates an ALPC port named LsaAlpcPort to receive commands.
 * It initializes a local copy of the NUMA topology of the system and creates the initial process environment block based off various values in the HKLM\System\CurrentControlSet\Control\Session Manager key, which it loads from the registry. It creates system-wide environment variables and initializes the rest of the Registry.
 * It creates an Unnamed Section Object that is shared by child processes (like Csrss.exe) for info exchanged with smss. The handles to this Section are passed to child processes via Handle Inheritance.
 * It opens Known DLL maps and maps them as Permanent Sections.
 * It creates the smss.exe instance to initialize Session 0 (non-interactive).
 * It creates the smss.exe instance to initialize Session 1 (interactive), if configured in the Registry (it can create additional smss.exe instances for extra interactive sessions to prepare itself in advance for future logons).
 * It creates the subsystem processes for the session and an instance of Winlogon (interactive session).
 * The master smss.exe then waits forever on the handle to the Session 0 instance of Csrss, which is marked "Critical". Therefore, if Csrss terminates, the system crashes.
 * The intermediate smss.exe process then exits, leaving the subsystem & Winlogon with the master smss.exe as their parent/owner.


Windows Initialization Process (WININIT.EXE)
The Windows Initialization Process (wininit.exe) also marks itself and its main thread as Critical, thereby treating certain errors as fatal.
 * It creates an event named GLOBAL\FIRST LOGON CHECK for use by Winlogon processes to detect if a logon is the first one.
 * It creates a Winlogon Log Off event in the Based Named Objects object manager's directory to be used by Winlogon. This event is signaled (set) when a logoff operation starts.
 * It increases its own base Priority to High.
 * Unless configured otherwise with a NoDebugThread Registry Value, it creates a periodic timer queue which will break into any user-mode process at a time specified by the kernel debugger, thus enabling Remote Kernel Debugging for user-mode applications.
 * It sets the machine name in the environment variable ComputerName and updates related info.
 * It sets the default profile environment variables (UserProfile, AllUsersProfile, Public, ProgramData).
 * It creates the Temp directory by expanding to %SystemRoot%\Temp.
 * It sets up font loading and the Desktop Window Manager (DWM) for Session 0 (if it's an interactive session).
 * It creates the Initial Terminal, composed of a Window Station (WinSta0) and two Desktops (Winlogon's and Default).
 * It initializes the LSA machine encryption key.
 * It creates the Service Control Manager (SCM / services.exe) and starts the LSA Subsystem Service (lsass.exe).
 * If Credential Guard is enabled, it launches the Isolated LSA Trustlet (lsaiso.exe), which requires querying the VBS provisioning key from UEFI.
 * If setup is pending (the first boot during a fresh install or an update to a new build), it launches the setup program and waits forever for a request for system shutdown.

Service Control Manager (SERVICES.EXE)
Windows services run in noninteractive, user-mode processes that can be configured to start independently of any user logging on, and that are controlled through a standard interface with the Service Control Manager. Multiple services can be configured to share a single process. A common example of this can be seen in Svchost.exe (Host Process for Windows Services), which is specifically
designed to host multiple services implemented in separate DLLs. Services are configured in the subkeys of HKLM\System\CurrentControlSet\Services. 
 * Services can refer to a server process or a device driver.
 * Services are like UNIX Daemon processes in that they can be configured to start automatically at system boot time without requiring an interactive logon. They can also be started manually by running the Service Administrator Tool (SC.EXE) or by calling the Windows StartService function.
 * Services do not interact with the logged-on user. Most services run in special service accounts (e.g., System or Local Service), while others run with the same security context as the logged-in user account.
 * The SCM is a special system process that is responsible for starting, stopping, and interacting with service processes and programs.
 * Service programs are Windows images that call special Windows functions to interact with the SCM, registering the service's successful startup, responding to state change requests, pausing/shutting down the service, etc.
 * Services are defined in the registry under HKLM\System\CurrentControlSet\Services.
 * A service has three names: the process name you see running, the internal name in the Registry, and the Display name in the Services Admin tool, plus a description field that further details what the service does.
 * There isn't a 1-to-1 mapping between service processes running services, as some services share processes (using svchost.exe). In the registry, the Type value under the service's key indicates whether the service runs in its own process or with others.

Logon Process (WINLOGON.EXE)
The Winlogon tab displays entries that hook into Winlogon.exe, which manages the Windows interactive-logon user interface. Introduced in Windows Vista, the Credential Provider interface manages the user authentication interface. Today, Windows includes many credential providers that handle password, PIN, picture-password, smartcard, and biometric logon.
The Winlogon process handles interactive user logons & logoffs. It is notified that a User Logon is required when the user enters the Secure Attention Sequence (SAS) keystroke combination: \text{Ctrl}+\text{Alt}+\text{Delete}.
 * The Identification & Authentication aspects of the logon process are implemented through DLLs called CREDENTIAL PROVIDERS, which implement authentication interfaces (e.g., password, smartcard, or biometrics).
 * Because Winlogon is also a critical system process on which the system depends, the Credential Providers and the User Interface to display logon dialog boxes run inside a child process of Winlogon—LogonUI.exe (Child).
 * When Winlogon detects the SAS, it launches this child process, which initializes the Credential Providers.
 * Winlogon can also load additional Network Providers DLLs that are required to perform secondary authentication.
 * After the username/password (or biometric info) has been captured, they are sent to the Local Security Authority Services process \rightarrow LSASS.EXE, which then calls the appropriate authentication package (implemented as a DLL) to perform the actual verification (e.g., checking whether a password matches what is stored in the Active Directory or the SAM).
 * If Credential Guard is enabled and this is a domain logon, LSASS.EXE will communicate with the Isolated LSA Trustlet (LSAISO.EXE) to obtain the machine key required to verify the legitimacy of the authentication request.
 * Upon successful authentication, LSASS.EXE calls a function in the SRM (NtCreateToken) to generate an Access Token Object that contains the user's security profile.
 * This Access Token is used by Winlogon to create the initial process(es) in the user's session.
 * The initial process(es) are stored in the Userinit registry value under the HKLM\Software\Microsoft\Windows NT\CurrentVersion\Windows Registry key.
 * Userinit.exe performs some initialization of the user environment (e.g., loading samples, network connections). It looks in the registry at the Shell value and creates a process for running the system-defined shell, Explorer.exe, then Userinit.exe exits. This is why Explorer.exe is often shown with no parent; it is technically the grandchild of Winlogon.exe.

(Client/Server Runtime Subsystem Services - CSRSS.exe)


Windows Boot Sequence and Process Hierarchy
The Windows boot sequence transitions from low-level firmware and boot loaders to the complex world of the Operating System's process structure.

The System process starts an instance of Smss.exe (the Session Manager), which remains running until system shutdown. That Smss.exe launches two new instances of Smss.exe, one in session 0 and one in session 1, which create processes in their respective sessions. Both of these instances end up exiting before a user logs on, so the initial Smss.exe always appears not to have child processes. The instance of Smss.exe in session 0 starts an instance of Csrss.exe (the “client-server runtime” Windows subsystem) in session 0 and Wininit.exe. Wininit.exe starts Services.exe (the Service Control Manager process) and Lsass.exe (the Local Security Authority subsystem). In session 1, Smss.exe starts a new instance of Csrss.exe and Winlogon.exe. Winlogon starts LogonUI.exe to prompt the interactive user for credentials, and then it starts Userinit.exe (which starts Explorer) after the user has authenticated. Both LogonUI and Userinit typically exit before the shell initializes and theuser can start Procexp. Most services are descendants of Services.exe; Services.exe does not host any services itself.

1. The Kernel and Initial System Processes (The Foundation)
When the kernel (NTOSKRNL.EXE) is loaded and initialized by the boot loader, it creates the absolute minimum processes needed to manage the system.
 * System and Idle Processes: The very first two "processes" are created by the kernel itself:
   * Idle Process (PID 0): This is not a true process; it's the accounting structure used to track unused CPU time on each core.
   * System Process (PID 4): This is the host for all kernel-mode system threads. It operates exclusively in Kernel Mode and handles fundamental OS services.
 * Memory Compression Process: You are correct; this process is visible very early on. Its primary job is to host the threads responsible for compressing and decompressing memory pages, efficiently managing the Working Set and reducing the need to page data out to disk.
 * Registry Initialization (The "System" Process Role): The System Process (specifically, kernel threads running inside it) is responsible for loading and initializing the Configuration Manager. The Configuration Manager then reads the critical Registry Hives (like the SYSTEM hive) from disk into memory, making the system configuration available to the rest of the OS.

2. Session Manager and Subsystem Initialization
The System Process then launches the first user-mode process, the Session Manager Subsystem (smss.exe), which is the orchestrator for the entire User Session environment.
 * SMSS (Session Manager Subsystem - The Orchestrator): smss.exe is responsible for creating subsequent user sessions and launching the initial processes within them.
   * It performs initial setup: including creating the Paged and Non-Paged memory pools and loading the KnownDLLs list.
   * It launches the critical subsystem processes:
     * CSRSS.EXE (Client-Server Runtime Subsystem): This is the User-Mode part of the Win32 subsystem. It manages critical functions like window and thread creation, but its role has diminished over time (e.g., console windows are now handled by conhost.exe).
     * WININIT.EXE (Windows Initialization): This process is essential for the non-interactive side of the system, primarily launching core services.
 * WINLOGON.EXE: You are correct that the Session Manager starts winlogon.exe. This process is responsible for the secure attention sequence (\text{Ctrl}+\text{Alt}+\text{Delete}) and handling user logon/logoff events, making it the gateway to the user interface.

3. Services and User Environment Setup
The boot trace correctly moves to wininit.exe, which focuses on getting the system services online.
 * WININIT (The Service Starter): wininit.exe does two crucial things:
   * It launches SERVICES.EXE (The Services Control Manager - SCM): The SCM is the central authority for managing all Windows services (starting, stopping, pausing, etc.). The SCM then reads the registry to determine which services should be started and launches them.
   * It launches LSASS.EXE (Local Security Authority Subsystem Service): lsass.exe is fundamental for enforcing the local security policy, handling user logons, creating access tokens, and managing Active Directory interactions.
The Services Host and User Apps
 * SERVICES.EXE launches the first instance of SVCHOST.EXE (Service Host): Since DLLs are more memory-efficient than creating a new .exe process for every service, Microsoft groups multiple related services into a single svchost.exe process. This is why you see many svchost.exe instances running, each hosting a bundle of different services.
 * User Apps and the Final Chain: After the SCM launches necessary services (many hosted within svchost.exe), the final pieces of the UI environment are set up.
   * The SCM starts the Explorer Process (explorer.exe), which manages the desktop, taskbar, and shell.
   * SVCHOST.EXE commands and CONHOST.EXE: The command line for a svchost.exe process typically lists the service groups it's hosting (e.g., -k netsvcs). You may see it starting a wide range of services.
   * CONHOST.EXE (Console Window Host): This is launched whenever a console application (like cmd.exe or PowerShell) is started. As you observed, it is often launched from a User-Mode service context to correctly manage the console window input/output for the user.

4. User Process Creation

Process Initialization Sequence
A description of the steps taken by the system in an average process creation sequence.
 * The creation of the process object and new address space is the first step. When a process calls the Win32 API CreateProcess, the API creates a process object and allocates a memory address space for the process.
 * CreateProcess maps NTDLL.DLL and the program executable (.exe file) into the newly created address space.
 * CreateProcess creates the process's first thread and allocates Stack Space for it.
 * The process's first thread is resumed and starts running in the LDRpInitialize function inside NTDLL.
 * LDRpInitialize recursively traverses the primary executable's import tables and maps into memory every module that is required for running the primary executable.
 * At this point, control is passed to LDRP_Initialize_TLS_Routines, which is an internal NTDLL.DLL routine responsible for initializing all statically linked DLLs currently loaded into the address space.
 * Once all DLLs are initialized, LDRpInitialize calls the thread's Real Initialization Routine, which is the BaseProcessStart function from Kernel32.DLL. This function in turn calls the executable's WinMain entry point, at which point the process has completed its initialization sequence.

Native Component
NTDLL.DLL contains two function types:
 * System Service Dispatch Stubs to the Windows Executive System Services. These functions are exposed to the User Mode. Each of these functions contains the architecture-specific instruction that can cause a transition into Kernel Mode to invoke the system service dispatcher, which then calls the actual kernel-mode system service that contains the real code inside NTOSKRNL.EXE.
 * Internal Support Functions used by subsystems, subsystem DLLs, and other native images.
   * Support functions include: The Image Loader (functions that start with Ldr), Heap Manager functions, and common general Runtime Library Routines (functions that start with Rtl), support for User-Mode Asynchronous Procedure Calls (APC), and a subset of Client Runtime (CRT) Routines.
Native in this context refers to images that are not tied to any particular subsystem. Some images (executables) don't belong to any subsystem. They don't link against a set of subsystem DLLs. Instead, they are exposed via NTDLL.

The Environment Subsystem's Role

The role of an Environment Subsystem is to expose a subset of the bare Windows Executive system services to application programs. Each Executable Image ($\text{.exe}$) is bound to one and only one subsystem, indicated in the $\text{PE}$ Image header. When an Image is run, the process creation routine examines the subsystem type and notifies the proper subsystem of the new process.
The libraries that programs link to do not call Windows kernel services directly. Instead, their high-level function calls are routed through one or more Subsystem DLLs (the API libraries), which then make the documented native system calls (e.g., through $\text{ntdll.dll}$). Subsystems are started by the Session Manager ($\text{smss.exe}$).

The Win32 API and Subsystem DLLs

The $\text{Win32}$ Subsystem Image is the crucial primary environment for most applications. Its functionality is exposed to user processes via a set of core DLLs often referred to as $\text{Win32}$ Subsystem Libraries. These are loaded into virtually every $\text{Win32}$ user-mode process:
DLL Name	Primary Role in the Win32 API
kernel32.dll	Core APIs. Fundamental library for most $\text{Win32}$ functions, including those for process creation and memory management.
advapi32.dll	Advanced APIs. Functions related to security (like access control, tokens) and Service Management.
user32.dll	User Interface. Manages high-level GUI constructs like windows, menus, and user input, and communicates with the kernel component $\text{Win32k.sys}$.
gdi32.dll	Graphics. Provides the GDI (Graphics Device Interface) functions for drawing graphics, text, and managing fonts, also communicating with $\text{Win32k.sys}$.

The Win32 Subsystem Implementation (Kernel and User Components)

The $\text{Win32}$ Subsystem is the component responsible for every aspect of the Windows User Interface. It is composed of both kernel and user components:
* Kernel Component: The low-level graphics engine and user management is implemented inside the Win32k.sys kernel component.
* User Components: The user-mode DLLs User32.dll and GDI32.dll control the functionality inside $\text{Win32k.sys}$.
Important: The components considered the Win32 Subsystem are not responsible for the entire $\text{Win32}$ API; they are only responsible for the User and GDI portions. Core process functions rely on $\text{NTDLL}$ and the $\text{Executive}$ via libraries like $\text{Kernel32.dll}$.

The Client/Server Runtime Subsystem ($\text{CSRSS.EXE}$)

The Client/Server Runtime Subsystem Process ($\text{CSRSS.EXE}$) is a persistent server process that provides shared services to $\text{Win32}$ client applications.
* The $\text{CSRSS}$ process was originally responsible for managing Console Windows.
* Since Windows 7, console applications (cmd.exe) communicate with a separate process, the Console Host ($\text{conhost.exe}$), which is spawned from the console-based process rather than $\text{CSRSS.EXE}$. $\text{conhost.exe}$ is designated as a server, and the console-using process is the client.
* Console Creation is initiated by the Image Loader for console subsystem Images or on demand if a $\text{GUI}$ Subsystem Image calls the AllocConsole Windows API.
The role of $\text{CSRSS.exe}$ and certain DLLs, as well as the use of $\text{RtlCreateUserProcess}$ from $\text{Ntdll.dll}$ for creating processes with the Native Subsystem image type, highlight the complexity of the OS architecture. Understanding the base APIs offered by the Operating System can be helpful in deciphering programs. An application making a sequence of system API calls is essentially talking to the O.S., and the API is the language. If you understand the basics, you can tune into that conversation.

The main confusion stems from three related but distinct layers:
1. The Environment Subsystem (Concept): The $\text{Win32}$ Subsystem is the primary environment $^$* that runs most Windows applications. The $\text{NT}$ Executive doesn't care what an $\text{EXE}$ does; the Subsystem provides the necessary API language for the $\text{EXE}$ to run (e.g., $\text{Win32}$ vs. $\text{POSIX}$).
2. Subsystem DLLs (API Implementation): Libraries like kernel32.dll, advapi32.dll, gdi32.dll, and user32.dll are the USER-MODE IMPLEMENTATION of the $\text{Win32}$ API. They translate high-level calls (like CreateProcess) into low-level native system calls (like NtCreateUserProcess in $\text{ntdll.dll}$).
3. $\text{CSRSS.EXE}$ (Server Process): The Client/Server Runtime Subsystem is a SERVER PROCESS that runs in the background. It provides essential services that cannot be run in the user's process for security/isolation reasons, primarily:
    * Legacy Console management.
    * State management for $\text{Win32}$ processes.

Standard Windows applications using the CreateProcess (or its internal CreateProcessInternal) API cannot directly create processes that use the native subsystem image type (which typically includes system processes like the initial boot process or certain driver-loading processes). The high-level Windows API is designed to create standard Win32 user-mode processes, To bypass this restriction and allow certain system-level components to create a native process, the native library, Ntdll.dll, provides the RtlCreateUserProcess helper function. This function is essentially a user-mode wrapper that calls the lower-level, non-public kernel-mode function NtCreateUserProcess to successfully create a process with the native subsystem type. As its name suggests, NtCreateUserProcess is used for the creation of user-mode processes [there is a function with the same name (NtCreateUserProcess), part of the Executive; Kernel Mode]


PROCESSES & JOBS

The Windows API provides several functions for creating a process:
* CreateProcess - which attempts to create a process with the same access token as the creating process.
* CreateProcessAsUser - accepts an extra argument, a handle to a Token Object, often obtained by calling LogonUser and using the resulting token.
* CreateProcessWithTokenW / CreateProcessWithLogonW - the latter is a handy shortcut to log on with a given user's credentials and create a process.
    * Both calls ultimately route the request to the Secondary Logon Service (seclogon.dll—hosted in an svchost.exe instance) via a Remote Procedure Call (RPC) to the system to do the actual process creation.
    * seclogon.exe executes the call and, if all goes well, eventually calls the same underlying functions.
All these functions expect a proper Portable Executable (PE), batch file, or 16-bit COM Application. Ultimately, all these functions lead to a common internal function CreateProcessInternal, which starts the actual work of creating a Windows process. CreateProcessInternal calls NtCreateUserProcess in NTDLL.DLL to make the transition to Kernel Mode and initiate the kernel-mode part of process creation in the Executive function with the same name, NtCreateUserProcess, which is part of the Executive.
Each Windows process is represented by an Executive Process Structure ($\text{EPROCESS}$). Besides containing many attributes relating to a process, an $\text{EPROCESS}$ contains pointers to a number of other related data structures. For example, each process has one or more threads, each represented by an Executive Thread Structure ($\text{ETHREAD}$).
For each process that is executing a Windows Program, the Windows Subsystem Process ($\text{CSRSS.EXE}$) maintains a parallel structure called the CSR_PROCESS. The kernel-mode part of the Windows Subsystem (Win32k.sys) maintains a per-process data structure—W32_PROCESS—created the first time a thread calls a Window, GDI (Graphics Device Interface), or USER function that is implemented in Kernel Mode. This also happens as soon as the User32.dll library is loaded. Many other drivers and System Components, by registering process creation notifications, can choose to create their own data structures to track info they store on a per-process basis.
The first member of the Executive Process Structure ($\text{EPROCESS}$) is called the Process Control Block (PCB). It is a structure of type $\text{KPROCESS}$ (for Kernel Process). Although routines in the Executive store info on $\text{EPROCESS}$, the Dispatcher, the Scheduler, and Interrupt/Time Accounting routines—being part of the Kernel—use $\text{KPROCESS}$ structures internally. This allows a layer of abstraction to exist between the Executive's high-level functionality and its underlying low-level implementation of context functions, and helps prevent unwanted dependencies between the layers.
In the kernel debugger, these data structures can be inspected by typing the command dt (Display Type) followed by the structure name. For example, dt nt!_eprocess UniqueProcessId displays the process ID. To display the PCB, use dt nt!_eprocess pcb. You can recurse the view by adding more field names. Use the -r switch of the dt command to recursively display all the substructures. Adding a number after the switch controls the depth of recursion the command will follow. Note that the dt command shows the format of the selected structure, not the contents of any particular instance of that structure type.
To show an instance of an actual process, specify the address of an $\text{EPROCESS}$ structure as an argument to the dt command. To get the addresses of almost all the $\text{EPROCESS}$ structures in the system, you can use the command !process 0 0. Because the $\text{KPROCESS}$ is the first thing in the $\text{EPROCESS}$ (it occupies the starting address), the address of an $\text{EPROCESS}$ will work as the address of a $\text{KPROCESS}$ with the command dt nt!_kprocess address.
The kernel debugger !process command displays a subset of info on a process object and its associated structures. If a process ID or address isn't specified, !process lists info for the process owning the thread currently running on CPU 0, which will be WinDbg or LiveKd itself on a single-processor system.
The $\text{PEB}$ (Process Environment Block) resides in the user-mode address space of the process it describes. It contains information needed by the Image Loader, Heap Manager, and other Windows Components that need to access it from User Mode. It would be too expensive to expose all that info through system calls. The $\text{KPROCESS}$ and $\text{EPROCESS}$ structures are in Kernel Mode.
The CSR_PROCESS structure contains info about processes that is specific to the Windows Subsystem ($\text{CSRSS}$). As such, only Windows applications have a CSR_PROCESS structure associated with them (for example, smss.exe does not). Because each session has its own instance of the subsystem, the CSR_PROCESS structures are maintained by the $\text{CSRSS}$ process within each individual session. The W32_PROCESS structure contains all the info that the Windows Graphics & Management code in the Kernel ($\text{Win32k.sys}$) needs to maintain state information about all processes that use at least one USER/GDI system call.

PROTECTED PROCESSES

Protected Processes add significant access limitations to the access rights that other processes on the system can request, even when the process is running as a system privileged user. The Operating System will allow a process to be protected only if the Image file has been digitally signed with a special Windows Media Certificate. The Audio, Video, Graphics Processes, Windows Error Reporting ($\text{WER}$), and the System process itself are protected to preserve integrity. $\text{wmplayer.exe}$ is a protected process because protected music content can be decoded through it.
At the kernel level, support for protected processes is twofold. The bulk of process creation occurs in Kernel Mode to avoid Injection Attacks. Protected processes have special bits set in their $\text{EPROCESS}$ structure—"Protection Locks"—that modify the behavior of security-related routines in the Process Manager to deny certain access rights that would normally be granted to Administrators. The only access rights that are granted for protected processes are PROCESS_QUERY_INFORMATION, PROCESS_TERMINATE, and PROCESS_SUSPEND_RESUME.
An extension to the protected process model was introduced, called Protected Process Light ($\text{PPL}$), which adds an additional layer to the quality of being protected: ATTRIBUTE VALUES. The different Signers have different Trust Levels, which in turn results in certain $\text{PPL}$ processes being more or less protected than others. Standard protected processes are now also differentiated based on the Signer Value. The various recognized Signers also define which access rights are denied to lesser protected processes.
Protection Levels are defined by the Signer Value. The $\text{WinTcb}$ (Windows Trusted Computing Base Signer), used for the System process, is leveraged to protect critical processes that the kernel has intimate knowledge of. The power of a process is measured by its Protection Level: $\text{Protected Processes}$ $>$ $\text{PPLs}$ $>$ $\text{Standard Processes}$. Higher-value signer processes have access to lower-level protected processes.
The protection level of a process also impacts which DLLs it will be allowed to load, effectively preventing a legitimate protected process from being coerced into loading a malicious third-party library, which would then execute with the same protection level as the process. A check is implemented by granting each process a "Signature Level," which is stored in the SignatureLevel field of the $\text{EPROCESS}$ structure. Through an internal lookup table, it finds a corresponding "DLL Signature Level," stored as SECTION_SIGNATURE_LEVEL in $\text{EPROCESS}$. Any DLL loading into the process will be checked by the Code Integrity Component in the same way the main executable is verified. Therefore, a process with "WinTcb" as its executable signer will only load "Windows" or higher signed DLLs.
If you run Process Explorer and select the Protection check box in the Process Image Tab to view the Protection Column: if you select a protected process to look at the lower part to view DLLs, you will see nothing. This is because Process Explorer uses a User Mode API to query the loaded modules, which requires access that's not granted for protected processes. Exception: $\text{Process Explorer}$ will show the list of loaded kernel modules (drivers) since these are not DLLs within the process address space.
One possible way malware can attack a system is by injecting code inside a process, or better, injecting code specifically inside an Anti-Malware Service and thus tamper with or disable its functions. If, however, the AM service could run as a Protected Process Light ($\text{PPL}$), no code injection or process termination would be allowed, meaning that the AM software would be protected from attack. To enable this, the AM kernel driver needs Early-Launch Anti-Malware ($\text{ELAM}$), which is granted by Microsoft (after proper verification of the software's publisher). ELAM CERTIFICATE INFO is a custom resource section in the AM executable file, loaded once the ELAM is installed and loaded. Once the Code Integrity System recognizes any file signed with such a special certificate, it permits the process to request a $\text{PPL}$ of PS_PROTECTED_ANTIMALWARE_LIGHT ($\text{0x31}$).




FLOW OF CREATE Process

Creating a Windows process consists of several stages carried out in three parts of the Operating System:
1. Validate parameters and Subsystem flags, converting them to their native counterparts.
2. Open the process Executable Image file (.exe) to be executed inside the process.
3. Create the Windows Executive Process Object.
4. Create Initial Thread Object.
5. Perform Windows Subsystem specific process Initialization (e.g., setup for the new process in $\text{CSRSS}$).
6. Start Execution of the Initial thread.
7. Complete the Initialization of the address space (e.g., load system DLLs).
CreateProcessInternalW performs the initial call to NtCreateUserProcess to attempt creation of the process.
The user-specified attribute list is converted from the Windows Subsystem format ($\text{Win32}$) to native format. Most of the gathered info is converted to a single large structure of type RTL_USER_PROCESS_PARAMETERS.
NtCreateUserProcess first validates arguments and builds an internal structure to hold all process creation information. Argument validation is managed to make sure the call to the Executive didn't originate from a hack that managed to simulate the way $\text{NTDLL}$ makes the transition to the kernel with bogus or malicious arguments.
NtCreateUserProcess attempts to find the appropriate Windows Image that will be the executable file specified by the caller and to create a Section Object to later map it into the address space of the new process.
* If a process needs to be created Protected, it checks the signing policy.
* If created as a modern application, a Trustlet, the Section Object must be created with a special flag that allows the Secure Kernel to control it.
If NtCreateUserProcess finds a valid Windows Executable Image, it looks in the registry under $\text{IFEO}$ (Image File Execution Options) at HKLM\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Image File Execution Options to see whether a debugger is set for the filename extension of the executable image. On the other hand, if the image isn't a Windows Executable (e.g., MS-DOS/Win16 app), CreateProcessInternalW goes through a series of steps to find a Windows Support Image to run it. This process is necessary because non-Windows apps aren't run directly; Windows instead uses one of a few special support images (e.g., NTVDM.exe) that are responsible for actually running the non-native application.
After NtCreateUserProcess opens a valid executable and creates a Section Object to map it into the new process address space, it creates a Windows Executive Process Object to run the Image by calling the internal system function PspAllocateProcess. Creating the Executive Process Object involves the following sub-stages:
* A list of Performance Options exists under the Registry $\text{IFEO}$ key called PerfOptions, which may consist of any number of fields (e.g., IoPriority, PagePriority, CpuPriorityClass, WorkingSetLimitInKB). This work is done by the KeInitializeProcess routine.
* The next stage of PspAllocateProcess is the Initialization of the $\text{KPROCESS}$ Structure (the PCB member of $\text{EPROCESS}$).
The routine that does the most work in setting up the process address space is MmInitializeProcessAddressSpace.
* The Virtual Memory Manager initializes the process Working Set List.
* The Section Object is now mapped into the new process's address space, and the Process Section Base Address is set to the base address of the Image.
* The Process Environment Block ($\text{PEB}$) is created and initialized.
* $\text{NTDLL}$ is mapped into the process.
* A new Session will be created for the process, if requested—implemented for the benefit of the Session Manager ($\text{smss.exe}$).
NtCreateUserProcess calls MmCreatePeb, which maps system-wide National Language Support tables into the new process's address space. It calls MiCreatePebOrTeb to allocate a page for the $\text{PEB}$/$\text{TEB}$ and then initializes a number of fields, most of them based on internal values that were configured through the registry (e.g., $\text{MmHeap}$ values, $\text{MmInitialSectionName}$ values, $\text{MmMinimum}$ and $\text{StackCommit}$ values). Some of them can be overridden by settings in the linked executable Image, such as the Windows Version in the PE Header.
The PspCreateThread routine is responsible for all aspects of thread creation and is called by NtCreateThread when a new thread is being created. Because the initial thread is created internally by the kernel without User-Mode input, two helper functions/routines that PspCreateThread relies on are used instead:
1. PspAllocateThread handles the actual creation and initialization of the Executive Thread Object itself.
2. PspInsertThread handles the creation of the thread handle and security attributes, and also calls KeStartThread to turn the Executive Thread Object ($\text{ETHREAD}$) into a schedulable thread.

Process Completion, Termination, and Image Loader

Once NtCreateUserProcess returns a success code, the necessary Executive process and thread objects have been created, and CreateProcessInternalW then performs subsequent operations related to Windows Subsystem-specific initialization to finish initializing the process.
Among many of these operations:
* The Windows Subsystem duplicates a handle.
* The CSRSS process structure CSR_PROCESS is allocated and initialized.
* The CSRSS thread structure CSR_THREAD is allocated and initialized.
* CsrCreateProcess and CsrCreateThread insert the process and thread into the list of threads for the process.
* Thence, the count of processes in this session is incremented.
* The new CSR_PROCESS structure is inserted into the list of Windows Subsystem-wide processes.
At this point, the process has been allocated, the process has a thread, and the Windows Subsystem knows about the new process.
The new thread begins life running the kernel-mode thread startup routine KeStartUserThread, which lowers the thread's IRQL (Interrupt Request Level) from DPC (Deferred Procedure Call) level to an APC (Asynchronous Procedure Call) level and then calls the system initial thread routine PspUserThreadStart. The user-specified thread start address is passed as a parameter to the routine. PspUserThreadStart uses the address of the actual image entry point and start parameter and calls the application's entry point. These two parameters have also already been pushed onto the stack by the kernel.

Terminating a Process

A process can exit gracefully by calling the ExitProcess function. The process startup code for the first thread calls ExitProcess on the process's behalf when the thread returns from its main function. Graceful Termination means that DLLs loaded into the process get a chance to do some work by getting notified of the process exit using a call to their DllMain function with the DLL_PROCESS_DETACH reason.
* ExitProcess can be called only by the process itself asking to exit.
Ungraceful Termination of a process is possible using the TerminateProcess function, which can be called from outside the process. TerminateProcess requires a handle to the process that is opened with the PROCESS_TERMINATE access mask, which may or may not be granted. That's why it's not easy (or impossible) to terminate some processes (e.g., csrss.exe) because the handle with the required access mask cannot be obtained by the requesting user. "Ungraceful" means DLLs don't get a chance to execute code ($\text{DLL_PROCESS_DETACH}$ is not sent) and all threads are terminated abruptly. This can lead to data loss in some cases.
In whatever way a process ceases to exist, there can never be memory leaks because all the process's private memory is freed automatically by the kernel, the address space is destroyed, and all handles to kernel objects are closed. If open handles to the process still exist, then other processes can still get access to some process-related info (e.g., GetExitCodeProcess). Once these handles are closed, the $\text{EPROCESS}$ structure is properly killed.

Image Loader (LDR)

Most of the actual initialization work is done outside the kernel by the Image Loader, internally referred to as LDR, which lives in the User-Mode system DLL ($\text{NTDLL.DLL}$). What makes it special is the guarantee that it will always be present in the running process (i.e., $\text{NTDLL}$ is always loaded). LDR is the first piece of code to run in user mode as part of a new process. Although the loader runs before the actual application code, its initialization tasks are hidden. A program typically does interact with its interfaces during the runtime of a program via loading/unloading of DLLs.
The tasks performed by LDR are critical:
* Initializes the User Mode state for the application.
* Creating the Initial Heap and setting up Thread Local Storage ($\text{TLS}$).
* Parsing the Import Table ($\text{IAT}$) of the application to look for all DLLs that it requires, followed by parsing the Export Table of the DLLs to make sure the function is actually present.
* Loading and Unloading DLLs at Run Time, maintaining a list of all loaded modules (the Modules Data Structures).
* Handling Manifest Files needed for Windows Side-by-Side ($\text{SxS}$) support and Multiple Language User Interface ($\text{MUI}$).
* Reading the App Compatibility database for any shims and loading the Shim Engine DLL if required.
* Enabling Dynamic Runtime Compatibility Mitigations and the Switchback Mechanisms.
* Enabling support for API Sets Redirection that allows creating Universal Windows Platform ($\text{UWP}$) Apps.
Most of these tasks are critical to enabling an application to actually run its code.


Binary Planting & DLL Preload Attack $\rightarrow$ Safe Search Mode

To prevent security risks associated with DLL Preload Attacks (or Binary Planting), Windows checks directories in a specific order to find the DLL file it needs.
The traditional "DLL Name Resolution & Redirection Search Path" is a list of locations that is searched sequentially for a file with a matching name. To mitigate the security risks associated with this behavior, Safe Search Mode was introduced to the path search component.
Under Safe Search Mode, the current directory is moved behind the three primary system directories, resulting in the following search order:
1. The directory from which the application was launched.
2. The native Windows system directory $\rightarrow$ \System32\
3. The 16-bit Windows System directory $\rightarrow$ \System\
4. The Windows root directory $\rightarrow$ C:\Windows or %SystemRoot%
5. The current working directory at application launch time.
6. Any directories specified by the %PATH% Environment Variable.
The application can change specific path elements by editing the %PATH% variable using the SetEnvironmentVariable API, or by changing the current directory using the SetCurrentDirectory API. When the latter is used, the directory replaces the current directory in the search path.
A process can also use the SetDllDirectory API to specify a DLL Directory for the process. When a DLL Directory is specified, the loader ignores the Safe Search mode and inserts this directory into the search path.
Callers can also modify the DLL Search path for specific load operations by supplying various Search Path Flags to the LoadLibraryEx API. If the DLL name supplied to the API specifies a full path string, the path containing the DLL file is used in place of the application directory when computing the search path for the operation. All these flags modify the search order to only search the specific directory(ies) that the flag references, or the flags can be combined as desired to search multiple locations.
These flags can be set globally using the SetDefaultDllDirectories API, which will affect all library loads from that point on globally.
The search-path order can also be affected if the application is a packaged application ($\text{UWP}$). In this case, the LoadPackagedLibrary API is used. The package-based search graph is computed based on the <packageDependency> entries in the UWP App Manifest file's <Dependencies> section, guaranteeing that no arbitrary DLL can accidentally load in the package before doing the normal search.

DLL Name Redirection

DLL Name Redirection is Windows' way of intercepting or re-routing loading to a different file or location.
1. WinAPI Set Redirection: This mechanism allowed different versions/editions of Windows to change the binary exports for a given API in a manner that is transparent to applications, by introducing the concept of "contracts" (e.g., modern apps target specific API contracts).
2. Local Redirection: This allows apps to redirect all loads of a specific DLL base name to a local copy of the DLL in the application directory. This is done either by creating a copy of the DLL with the same base name followed by .local or by creating a file folder with the name local under the App directory and placing a copy of the DLL inside.
3. Fusion ($\text{SxS}$) Redirection: This allows components to express more detailed binary dependency information (versioning info) by embedding binary resources known as manifests. Since multiple versions of the same DLL often exist, Fusion lets each app specify which version it needs using a manifest (a small $\text{XML}$ file embedded inside the $\text{EXE}$). Windows then loads the exact version from the Win SxS (Side-by-Side) Store.
4. Known DLL Redirection: This is a mechanism that maps specific DLL base names to files in the system directory, preventing the DLL from being replaced with an alternate version in a different location.

Loader Module Database

The loader maintains a list of all modules that have been loaded by a process—the "Loaded Modules Database".
This information is stored in the $\text{PEB}$ (Process Environment Block) in a substructure identified by LDR and called PEB_LDR_DATA. The routine maintains three doubly linked lists containing structures called Loader Data Table Entries ($\text{LDR_DATA_TABLE_ENTRY}$) that store information about each module.
The kernel also employs its own loader for drivers and dependent DLLs, with a similar loader entry structure called KLDR_DATA_TABLE_ENTRY instead. The kernel-mode loader has its own database of such entries, which is directly accessible through the PsActiveModuleList global data variable.
To dump the kernel's module database, you can use the kernel debugger command: dt nt!_KLDR_DATA_TABLE_ENTRY nt!PsActiveModuleList.


Import Parsing

The Image Loader (LDR), which is the first piece of User-Mode code to run, performs critical steps to get the application ready:
1. Load each DLL referenced in the Import Table of the process's executable Image.
2. Module Parsing/Checking: Check whether the DLL has already been loaded by examining the Module Database (PEB_LDR_DATA). If it doesn't find it in the list, the loader opens the DLL and maps it into memory.
3. Name Resolution/Redirection: During the mapping operation, the loader first looks at the various paths where it should attempt to find this DLL ("Name Resolution Redirection Search Path").
4. Once a DLL has been found and mapped, the loader checks whether the kernel has loaded it somewhere else.
5. Relocation: If the loader detects relocation (necessary due to ASLR—Address Space Layout Randomization), it parses the relocation info in the DLL and performs the operations to fix up internal pointers.
6. Database Update: The loader then creates a Loader Data Table Entry for this DLL and inserts it into the database (PEB_LDR_DATA).
7. Recursing Imports: After a DLL has been mapped, the process is repeated for the DLL to parse its Import Table for all its dependencies.
8. Import Address Table (IAT) Filling: After each DLL is loaded, the loader parses the Import Address Table to look for specific functions being imported. The Import Table of an $\text{EXE}$ Image can be bound (i.e., at link time, developers assign static addresses/pointers to imported functions in external DLLs), removing the need for lookup, but assumes that the DLLs the application will use will always be located at the same address. Windows, however, uses ASLR, so this is usually not the case for system applications and libraries.
9. Forwarder Check: The Export Table of an imported DLL can use a forwarder entry, meaning that the actual function is implemented in another DLL. This must essentially be treated like an import or dependency, so after parsing the Export Table, each DLL referenced by a forwarder is also loaded by the loader.
The complete recursive process flow for the LDR is:
1. Load each DLL in the Import Table $\rightarrow$ 2. Check if the DLL is already loaded $\rightarrow$ 3. Find the DLL (Search path/Known DLLs) $\rightarrow$ 4. Relocation $\rightarrow$ 5. Add to loader's database $\rightarrow$ 6. Recursing Imports $\rightarrow$ 7. Fill in $\text{IAT}$ $\rightarrow$ 8. Bound Imports $\rightarrow$ 9. Forwarders.

Post-Import Process Initialization

Once all imports are loaded ($\text{LdrInitState} \rightarrow 2$), the process proceeds through final initialization steps ($\text{LdrInitState} \rightarrow 3, 4$):
1. Debugger Breakpoint triggered (if present).
2. Subsystem setup (Console/GUI).
3. DllMain is called for each DLL loaded with the DLL_PROCESS_ATTACH reason.
4. $\text{TLS}$ (Thread Local Storage) Initializers run.
5. Shim Engine Callback (if any compatibility shims were loaded).
6. Subsystem port initialization.
7. $\text{ETW}$ event logged.
8. Stack Memory Committed.

Switchback and API Sets

SWITCHBACK: A Compatibility Time Machine

Switchback is a Compatibility Time Machine for old apps. When Microsoft improves or fixes APIs, those changes might accidentally break old programs that relied on the old or buggy behavior.
* Each Windows DLL may contain several branch points—places where the API code changes based on version behavior.
* The loader reads your app's manifest to store its chosen GUID in the $\text{PEB}$.
* When your app calls a system API, the entry point first calls the Switchback Engine (a switch procedure).
* This engine checks: "What Windows version does this app think it's running under?" and "Which version of this API matches the code contract?".
* Then it calls the correct code pointer. This lets two apps on the same PC call the same API but get different results, depending on their declared Compatibility Mode, where both versions of the API exist in the same system. Each process gets the version-correct API functions.
Therefore, Switchback uses API Redirection for specific application compatibility scenarios.

API Sets: Modularity for Windows

There is a much more pervasive redirection mechanism used in Windows for all applications called API Sets. Its purpose is to enable fine-grained API categorization of Windows APIs into Sub-DLLs instead of having large multi-purpose DLLs that span nearly thousands of APIs that might not be needed on all types of Windows systems today and in the future.
API Sets are about Modularity. Instead of one huge toolbox for every job (Kernel32.dll), Windows split it into smaller boxes labeled api-ms-win-core-file-l1-1-0.dll or api-ms-win-core-registry-l1-1-0.dll such that embedded systems can remove parts not required. This helps Windows refactor internal DLLs without breaking compatibility.
The mapping of these Virtual "API Set" DLLs to their real ones (like Kernelbase.dll) is defined in ApiSetSchema.dll, which is loaded at process startup. If an app says it imports api-ms-win-core-file-l1-1-0.dll, Windows checks the schema and redirects it to the real DLL (Kernel32.dll or Kernelbase.dll).
* The ApiSetSchema.dll contains no executable code, but it has a section called .apiset that contains API Set Mapping Data that maps Virtual API Set DLLs to Logical DLLs that implement the API itself.
* Whenever a new process starts, the Process Manager maps this section object into the process's address space and sets the ApiSetMap field in the process $\text{PEB}$ to point to the base address where the section object was mapped.


Jobs, Nested Jobs, & Windows Containers

Jobs

A Job is a nameable, securable, shareable kernel object that allows control of one or more processes as a group, allowing groups of processes to be managed and manipulated as a unit. A process's association with a Job object can't be broken, and all processes created by the process (its descendants) are associated with the same Job object. The Job object records basic accounting information for all processes associated with the Job.
The following are some of the CPU, memory, Disk, and I/O-related limits you can specify for a Job:
* Maximum Number of Active Processes (processes that have not yet terminated).
* Job-Wide and Per-Process User-Mode CPU Time limits.
* Job Processor Affinity.
* Job Process Priority Class.
* Process and Job Committed Virtual Memory limits.
* Job Group Affinity.
* Default Working Set Min/Max.
* CPU Rate Control (enables throttling).
* Network Bandwidth Rate Control (enabling setting DSCP tags for Quality of Service ($\text{QoS}$) purposes for network packets).
* User-Interface Limits (e.g., restricts processes from opening handles to Windows owned by threads outside the Job). These limits are managed by the Windows Subsystem GDI/USER driver ($\text{Win32k.sys}$).
* Disk I/O Bandwidth Rate Control (enables setting number of I/O Operations Per Second ($\text{IOPS}$)).
A Job Object is created using the CreateJobObject API; it's initially created empty of any processes. To add processes to a Job, call the AssignProcessToJobObject API, which can be called multiple times to add multiple processes to the Job.
The SetInformationJobObject API allows setting of the limits and contains internal Information Classes used for management. These values can be read back with QueryInformationJobObject, which provides interested parties with the limits set on a Job. TerminateJobObject terminates all processes in the Job, similar to calling TerminateProcess on each process.

Nested Jobs

Starting with Windows 8 and Server 2012, a process can be associated with multiple Jobs, effectively creating a hierarchy known as Nested Jobs, where a child Job holds a subset of processes of its parent Job. Once a process is added to more than one Job, the system tries to form a hierarchy, if possible.
A current restriction is that Jobs cannot form a hierarchy if any of them set User-Interface limits.
Job limits for a child Job cannot be more permissive than its parent, but they can be more restrictive.

Job Notifications

Jobs can be associated with an I/O Completion Port Object, which other threads might be waiting for. This allows interested parties (typically the Job creator) to monitor for limit violations and events that would affect the Job's security (e.g., a new process being created or abnormally exiting).
Any notification that targets the I/O Completion Port of a Job will be sent to the Job and all its ancestors (the Job itself does not have to have the I/O Completion Port for the notification to be sent to its ancestors).
You can view unnamed Jobs with the kernel debugger command $\rightarrow$ !job or dt nt!_ejob.

Windows Containers (Server Silos)

Windows Containers (Server Silos)—unlike Hyper-V Containers, which leverage a full virtualized environment—provide a second "instance" of all User-Mode components while running on top of the same kernel and drivers. At the cost of some security, this provides a much more lightweight container environment which Microsoft Windows uses to implement containerization at the OS level, similarly to Linux namespaces and cgroups but adapted for the NT Kernel.
For simplicity, this is a Docker-like container environment on Windows, but instead of full virtualization, it uses a deep isolation layer built into the Windows Kernel. Therefore, Windows Containers fill the same role as Docker but for Windows-based apps (e.g., $\text{IIS}$ server, .NET, COM+ server, $\text{WCF}$).
Containers share the same kernel but have an isolated User-Mode Environment. When you create a Silo (Sandboxed OS Session), inside that Silo, processes think they're in their own kernel, even though they share the same host kernel. This isolation is handled by new kernel features, including:
* Namespace Virtualization
* Container Manager (Host Compute Service)
* Silo Objects (Kernel Isolation Primitives)

Silos, Nested Jobs, & Windows Containers

Silo: The Isolation Boundary

A Silo represents an isolation boundary in the Windows Kernel where each container gets its own logical OS environment (processes, registry, $\text{LSA}$, networking, file system). Silos are a feature of Job Objects; in practice, a Silo is a hybrid Job Object.
This results in the Silo Flag being set inside the $\text{EJOB}$ object, and the allocation of the SLS (Silo Local Storage) slots are triggered by the Job creation. The CreateJobObject API, specifically the SetInformationJobObject API, is used with the JobObjectCreateSiloInformation class to initiate the creation of a Silo.
A Silo can actually host two types of silos: App Silos and Server Silos.

Server Silo Components

The first element that defines a Server Silo is the existence of a custom Object Manager Namespace. All application-visible named objects (files, registry keys, events, mutexes, $\text{RPC}$ ports, and more) reside in a Root Namespace, which allows applications to create, locate, and share these objects among themselves.
The ability for a Server Silo to have its own Root Namespace means that all access to any named object can be controlled in three ways:
1. By creating a new copy of an existing object to provide an alternate view of it from within a Silo.
2. By creating a brand-new object that only exists within that Silo (e.g., a containerized application creating an event).
3. By creating a Symbolic Link to an existing object to provide direct access to it.
This ability is then combined with the Virtual Machine Compute Service, which interacts with additional components to provide a full isolation layer.
The User-Mode isolation environment is provided by several key components:
1. A base Windows Image file ($\text{WIM}$) called Base OS.
2. The $\text{NTDLL}$ library of the host OS.
3. A sandboxed Virtual File System provided by the $\text{WCIFS.sys}$ filter driver.
4. A sandboxed Virtual Registry provided by the $\text{VReg}$ Kernel component.
It's important to create additional isolation boundaries, which the kernel provides to differentiate one silo from another:
1. Micro-shared User data structures.
2. Object Directory Namespace.
3. API Set mapping based on ApiSetSchema.dll of the Base OS $\text{WIM}$.
4. Logon Session.
5. $\text{ETW}$ Tracing and logger context.

Silo Context Mechanism

Each Server Silo gets its own copy of certain Kernel State which is stored and tracked using the Silo Context Mechanism.
A Silo Context refers to a storage slot inside the kernel that holds data specific to that container. When a new Server Silo (container) is created:
* The kernel allocates a structure that holds all its per-silo data.
* This structure contains a Silo Local Storage ($\text{SLS}$) array, similar to how processes create Thread Local Storage ($\text{TLS}$).
* Each slot index is assigned to a subsystem or driver, and this is the same index across silos but points to different data pointers. Therefore, if a Network driver owns slot index 5, it always accesses slot index 5 in the $\text{SLS}$ array.
The kernel API PsCreateSiloContext lets a component register or attach a silo-specific data pointer: $\text{NTSTATUS PsCreateSiloContext}(\text{ULONG SiloIndex}, \text{PVOID ContextData})$.
Silo Contexts make kernel-level multi-tenancy possible, acting as an internal data partitioning system.

Root Host Silo

What happens with the Network driver that runs on the Host itself? Windows defines a "Root Host Silo". Even though the host system ($\text{Session 0}$) isn't a container, it pretends to be one and will be represented internally by the global structure PspHostSiloGlobals. Every time the kernel asks, "What's the current Silo context?" and finds a NULL, it just defaults to the Host's Silo context. This ensures all code paths—both for containers and the Host—can use the same logic.

Silo Monitors

Silo Monitors is a notification or registration mechanism built into the Windows kernel that lets drivers "subscribe" to Silo lifecycle events. Drivers can register as silo monitors using the following APIs: PsRegisterSiloMonitor, PsStartSiloMonitor, and PsUnregisterSiloMonitor. When you register, the kernel immediately informs you of:
* All existing Silos.
* Any new silos created afterward.
The driver can associate each silo's data with each Container through the Silo Context API.
* PsGetSiloMonitorContextSlot
* PsInsertSiloContext
* PsReplaceSiloContext
* PsAllocSiloContextSlot
These APIs provide full lifecycle management and accessibility for third-party internal drivers to integrate cleanly into the Windows Silo Container model.

### Threads and Birth of a Thread

The Simplest Creation function in user-mode is CreateThread.
This function creates a thread in the current process, accepting the following arguments:
* Optional Argument: Optional flags.
* Optional Security attributes structure.
* Optional stack size.
* A function pointer - Serves as an entry point for new thread execution.
* [Argument 5: A pointer to the parameter to be passed to the thread function]
An extended Thread Creation function is CreateRemoteThread,
which accepts an extra argument: which is a "Handle" to a "target process" where the thread is to be created. This function is used to inject a thread into another process, such as when a debugger forces a break in a debugged process. The debugger injects a thread, which immediately causes a breakpoint by calling DebugBreak function. This is done for a process to obtain internal information about another process, which is easier when running in the target process context (the entire address space is accessible). To make CreateRemoteThread work:

The target process handle must be obtained with enough access rights to allow such an operation. Protected processes cannot be injected in this way, as handles to such processes are obtained with limited rights.

Note: The implementation of CreateThread & CreateRemoteThread simply calls CreateRemoteThreadEx with the appropriate defaults. CreateRemoteThreadEx adds the capability to provide an attribute list (such as security or extended parameters).
If all goes well, CreateRemoteThreadEx eventually calls NtCreateThreadEx in NTdll, thus making the usual transition to kernel mode, where execution continues in the executive routine NtCreateThreadEx.
From there the kernel-mode part of thread creation occurs, which calls PspCreateThread to create a thread object.
PsCreateSystemThread is useful for drivers that need independent work to be processed within the system process – not associated with any particular user process.
It creates a thread in Kernel mode directly.
A Windows thread is represented by an Executive Thread Object which encapsulates the ETHREAD structure. It contains a KTHREAD structure as its first member (Thread Control Block - TCB).
The ETHREAD structure and other structures point to addresses in the system address space, except the Thread Environment Block (TEB), which exists in the User process address space (similar to Process Environment Block - PEB) because user-mode components need access to it.
The Windows Subsystem process (CSRSS) maintains a parallel structure for each thread created by a Windows System application called "CSR_THREAD" for threads that have called a Windows Subsystem user/GDI function. The kernel-mode layer (Win32k.sys) maintains a per-Thread data structure (W32THREAD) that is pointed to by the KTHREAD structure. This points to a layer violation in standard kernel's abstraction architecture.
The executive, higher level, graphics related Win32k thread structure is pointed to by KTHREAD’s Tcb.Win32Thread field, not ETHREAD, this is in opposite to the Win32k process structure pointed to by the EPROCESS not KPROCESS.
You can use kernel debugger dt command to display the internal structure of ETHREAD and KTHREAD.
Such as dt nt!_ETHREAD and dt nt!_KTHREAD, where dt nt!_ETHREAD Tcb = dt nt!_KTHREAD.
The dt (dump type) command interprets memory at the given address according to the type definition (EPROCESS, KPROCESS, ETHREAD, KTHREAD, etc.) loaded from the process's database symbols. It's purely symbolic memory interpretation and inspecting raw fields manually.
Meanwhile, the kernel debugger !thread or !process command is a debugger extension command that reads, formats, and interprets internal kernel structures by using Debugger Engine (DbgEng) API calls to inspect kernel memory. It performs higher-level logic. Some key elements of the information the kernel debugger displays can't be displayed by any other utility.
These include: internal structure addresses, priority details, stack info, Pending I/O Request List, List of objects the thread is waiting for. To display process/thread information, use either the !process or !thread with the address of a thread object to display a specific process or thread.
The threads shown using the !process command. Each thread shows its address (ETHREAD) which can be passed to the !thread command to get more information regarding a specific thread.
The TEB can be viewed using the !TEB. The command can be used on its own to dump the TEB for the current thread examined using !thread thread_addr of the debugger, or with a TEB address of a thread to get it for an arbitrary thread. In the case of a kernel debugger, the current process must be set before issuing the command with a TEB address so that the correct process/thread context is used.

### Birth of a Thread: User-Mode to Kernel-Mode Transition

The prefix like Nt!, Win32k!, Csrss! doesn't mean a call is made to that module. Instead, it tells WinDbg or kernel debugger which symbol module the type or symbol belongs to, where Nt! refers to symbols from NTOSKRNL.exe. Therefore, dt nt!_EPROCESS means "Interpret memory at this address as an EPROCESS structure defined in ntoskrnl". Here, the nt! points WinDbg's symbol engine to the module that defines _EPROCESS, also dt csrss!_CSR_THREAD means "Interpret the memory address as a CSR_THREAD structure defined in CSRSS". They are just symbol module qualifiers.
Only !process / !thread address is interpreted by WinDbg as dt nt!_EPROCESS / dt nt!_ETHREAD internally, as it knows that processes / threads in kernel space are represented by the _EPROCESS / _ETHREAD structure.
A thread's life cycle starts when a process creates a new thread in one of the following ways:
* CreateRemoteThreadEx or CreateThread (Kernel32.dll) $\rightarrow$ This function is a User-mode API Wrapper.
* It prepares parameters (start address, stack, flags, Create Suspended) and converts the Windows API (Win32) parameters to Native flags and builds a Native structure describing object parameters and attributes.
* It builds an attribute list in user-mode (Client ID and TEB addr) $\rightarrow$ Used by NtCreateThreadEx.
* It determines whether the thread is created in the calling process or another process indicated by the handle passed in. If handle = pseudo (-1) handle returned from GetCurrentProcess, then it's the same process.
* If handle is different, a call is made to NtQueryInformationProcess (NTdll) to verify whether it is indeed the target process.
* Call to NtCreateThreadEx (NTdll) to make the transition down to executing in kernel mode with some arguments.
* NtCreateThreadEx (NTOSKRNL) creates user-mode context and calls PspCreateThread (Executive).
* PspCreateThread allocates ETHREAD (Executive structure) which embeds _KTHREAD (Dispatcher structure).
* It sets up kernel thread fields, initial suspend state, creation time, Client ID.
* The function returns back to User-mode: CreateRemoteThreadEx continues.
* It allocates Activation Context if required, writes Activation Context pointer to TEB.
* TEB is created/initialized.
* If not Create Suspended, ResumeThread is called.
* The kernel enqueues the ETHREAD on the ready queue. The scheduler dispatches it.
* When scheduled, the kernel performs process initialization steps, then jumps to the user start address.
* A thread handle and thread ID are returned to the caller (user-mode).
The thread start address is displayed in the form Module!Function + Offset , where Module is the name of the executable. The function name relies on access to symbol files for the module.
All Windows threads start at a common thread startup wrapper function (RtlUserThreadStart in NTdll) except for threads created by CreateThread function. Process Explorer (ProcExp) displays the function passed to CreateThread as the start address, not the actual thread start function. The thread start address displayed might not be enough info to pinpoint what the thread is doing & which component within the process is responsible for the CPU consumed by the thread. This is especially true if the start address is a generic wrapper function. In that case, the Thread Stack might be the answer.

User-mode debuggers allow you to attach to a process and display the user stack for a thread. Process Explorer, however, shows both the user's and kernel stack in one click of a button.
You can view the kernel thread stacks using WinDbg in local kernel debugging mode.
To view the stack of another thread, use ~n s command. To switch the debugger to another thread, use the ~n command, where n is the thread number.

Protected processes have several limitations in terms of which access rights will be granted, even to the user with the highest privileges on the system.
These limitations also apply to threads inside such a process.
Only four permissions are granted to prevent hijacking of a protected process: QueryLimitedInformation, SetLimitedInformation, Suspend, Resume.
Even Process Explorer doesn't show the Win32 thread start address. Instead of displaying the standard thread client wrapper, you get an error while trying to view the stack because Process Explorer needs to read the virtual memory inside the protected process, which it can't do.
Although the dynamic properties, the I/O & memory properties are not shown for protected processes.

### Windows Scheduling

Windows implements a priority-driven Preemptive Scheduling System.
Certain high priority threads ready to run might be restricted by the processors on which they might be allowed/preferred to run on.
Processor Affinity: By default, threads can run only on processors within the processor group associated with the process. Developers can alter processor affinity by using the appropriate API or by setting an affinity mask in the PE Image headers. You can also use tools to change affinity at run time.
After a thread is selected to run, it runs for an amount of time called Quantum.
A Quantum is the length of time a thread is allowed to run before another thread at the same priority level is given a turn to run.
The Quantum value can vary due to:
* System Config Settings.
* Foreground/Background status of the process.
* Use of Job Objects to alter Quantum.
Windows implements preemptive scheduling , hence a thread might not get to complete its quantum.
The Windows Scheduling work is implemented in the kernel. The routines that perform these duties are collectively called the Kernel Dispatcher. The following events might require thread dispatching:
* A Thread becomes ready to execute.
* Any event that requires saving or changing of state (PCB/TEB).
* A thread's priority changes, either because of a system boost, it terminates, it quits execution, it enters a wait state.
* A thread's processor affinity changes so that it will no longer run on the processor it was running on.
At this point: Windows determines which thread should run next on the logical processor that was running the thread, if applicable, or on which logical processor the thread should now run.
After a logical processor has selected a thread to run, it eventually performs a Context Switch. This is a procedure of saving the volatile processor state associated with the running thread and loading another thread's volatile state and starting the new thread's execution.

Priority Levels & Base Priority

* 16 Real-Time Priority levels (16-31).
* 15 Variable/Dynamic Priority levels (1-15).
* Zero Reserved (Level 0) - Zero Page Thread.

Each Process is assigned a Base Priority Class, that defines its base scheduling priority. This is set during process creation or adjusted dynamically through SetPriorityClass() API OR Task Manager / Process Explorer.
Each THREAD within a process has Relative Priority Deltas – an adjustment to the process's Base Level.
A Thread's effective base priority = Process Base Priority + Thread Relative Priority Delta.
When Relative priorities reach extremes (+15/-15) they are saturated, not offset.
* Positive Saturation $\rightarrow$ maximum possible priority within the process class.
* Negative Saturation $\rightarrow$ minimum possible priority.
Once saturated, further changes to the process's base priority do not affect the thread. The Windows kernel translates the API-level priorities into numerical kernel priorities via PspPriorityTable. The Kernel Scheduler uses these levels to decide thread dispatch order.
Each thread maintains 2 priority values: Base Priority (Process Base + Thread Relative Priority), and the Current Priority. The Current Priority may be temporarily boosted (when a thread wakes up after waiting for I/O). This keeps the process responsive. However, such boosts only apply to Variable Range priorities (1-15). Real-time threads (16-31) always retain a fixed priority.
A new process inherits the Base Priority of its creator process by default. This can be overridden using CreateProcess() or adjusted post-creation via SetPriorityClass() – known as Priority Inheritance.
Four critical Windows system processes start with slightly elevated Base priorities. This ensures system operation is not stalled by user applications.
Regardless of how a thread's priority comes to be, from the point of the Scheduler, only the final result matters (Final numeric priority level value) , such that:
* A Thread at priority 10 can result from: Normal (8) + Highest (+2) OR Above Normal (10) + Normal (0).

PROCESS PRIORITY CLASS (PspPriorityTable) $\times$ THREAD RELATIVE PRIORITY DELTAS

| Process Class | Priority Base | Thread Relative Deltas |
|---|---:|---|
| Real Time (4) | 24 | Highest (+2) |
| High (3) | 13 | Above Normal (+1) |
| Above Normal (6) | 10 | Normal (0) |
| Normal (2) | 8 | Below Normal (-1) |
| Below Normal (5) | 6 | Lowest (-2) |
| Idle Time (1) | 4 | Idle (-15) |
| Critical (8) | 6 |  |
You can raise (or lower) thread priorities within the dynamic range. However, you must have the Increase Scheduling Priority privilege (SeIncreaseBasePriorityPrivilege) to enter Real-Time.
Once a process has entered the Real-Time range, all its Threads (+ Idle) must run at one of the Real-Time priority levels. It's impossible to run Real-Time threads with the same process at one of the dynamic priority levels.

### Dispatcher Database & Ready Summary

Processor Cycles / Clock cycles $\rightarrow$ Clock Intervals / Clock ticks per second.
To make scheduling decisions, the kernel maintains a set of data structures collectively known as the Dispatcher Database, which is found in the Kernel Processor Control Block (KPCR). This database keeps track of which threads are ready to run.
Thread Dispatcher Concurrency: A multiprocessor system has per-processor dispatcher queues and shared processor group queues. Each CPU can check its non-shared ready queue for the next thread to run without having to lock the system-wide ready queues.
Use dt nt!_KPRCB to view its fields.
The Dispatcher Ready Queues (ReadListHead in KSHARED_READY_QUEUE) contain threads in the ready state awaiting execution. There is one queue for each of the 32 priority levels.
To speed up the selection of which thread to run / preempt , Windows maintains a 32-bit Bitmask (also called Bitmask) called the Ready Summary. Each bit is set to indicate one or more threads in the ready queue for that priority level.
Instead of scanning each ready list to see whether it is empty or not , a single bit scan is performed to find the highest priority bit set. Regardless of the number of threads in the ready queue, this operation takes a constant time.

### Quantum and Scheduling Decisions
A QUANTUM is the amount of time a thread is permitted to run before Windows checks to see if another thread at the same priority level is waiting to run. A thread may run for another quantum if there are no other threads at its priority level or higher waiting to run on completion of its first Quantum.
It represents an estimate of what the number of CPU clock cycles the thread has consumed should be to determine when its turn would be given up. It equals an equivalent number of clock intervals (clock ticks).
Each process has a quantum reset value in the PCB used when creating new threads inside the process & duplicated in the TCB , which is then used when giving a thread a new quantum target. As a thread runs, clock cycles are charged at different times/events, e.g. context switches, interrupts, and certain scheduling decisions.
If at a clock interval timer interrupt, the number of clock cycles charged has reached (or passed) the quantum target, a quantum end processing is triggered. A context switch occurs to the next (same or higher priority level thread) in the Ready Queue.
To change the thread quantum for all processes, you can choose only one of two settings (Quantum Configuration):
1. Short (6 clock ticks), default for Client Machines $\rightarrow$ Programs option (Foreground).
2. Long (12 clock ticks), default for Server Systems $\rightarrow$ Background Services option.

(In Performance Options)

Variable Quantum: Windows sets the maximum possible priority level to foreground threads. The Priority Separation Value determines the priority boost that the scheduler will apply to foreground threads , which is thus paired with an appropriate extension of Quantum. For each extra priority level, another quantum is given to the thread.
Thus, when a window is brought into the foreground (FG) on a client system , all the threads in the process containing the thread that owns a FG Window have their quantum tripled. Threads in the FG process run with a quantum of "18 clock ticks" , whereas threads in other processes have a default client quantum of "6 clock ticks".
In this way, when you switch away from a CPU-intensive process , the FG process will get proportionally more of the CPU cycles. Assuming the thread priorities are the same in both Background & Foreground processes.
The Win32 Priority Separation Registry Key ($\text{HKLM}\backslash\text{SYSTEM}\backslash\text{CurrentControlSet}\backslash\text{Control}\backslash\text{PriorityControl}$) controls quantum settings which specify relative length of thread quantum (short/long), Variable/Fixed & priority separation. This determines the quantum index used when variable quantums are enabled. It consists of 6 bits divided into flags.

### Priority Boosts and Inversion
Date: [Date: Insert Current Date]

PRIORITY BOOSTS: The Windows Scheduler periodically adjusts the current (dynamic/variable) priority of threads. It does so to decrease various latencies & increase responsiveness – to respond faster to events threads are waiting on. Also to prevent starvation and priority inversion scenarios. Here are some of the boosted scenarios:
| Event Type | Short Quantum Index (Client) | Long Quantum Index (Server) |
|---|---|---|
| I/O Completion | Variable: 1, 2, 4, 6 | Variable: 1, 2, 4, 6 |
| Scheduler Dispatcher Events | 1, 2 | 1, 2 |
| User Interface (UI) Interaction / Input | 2 | 2 |
| Waiting on an ERESOURCE | 12 | 12 |
| Ready to run but not run for some time (Starvation) | 15 | 15 |
Windows gives a temporary priority boost upon completion of certain I/O Operations to that threads that were waiting for an I/O have more of a chance to run right away & process whatever was being waited on.
Recommended boost values can be found in the Windows Driver kit header files. The actual value for the boost is up to the Driver. It's the device driver that specifies the boost when it completes an I/O Request on its call to the kernel function IoCompleteRequest. I/O Requests to devices warranting better responsiveness have higher boost values.
Unwait Boosts attempt to decrease the latency between a thread waking up due to an object being signaled and the thread actually beginning its execution to process the Unwait. It's desirable that a thread that wakes up from a waiting state would be able to run as soon as possible.
Some Dispatcher objects don't have boosts associated with them. For example, when a timer is set on an EXPRESS timer, or when a process is signaled, no boost is applied.
Priority Inversion

When a thread attempts to acquire an Executive Resource (ERESOURCE) that's already owned "exclusively" by another thread, it must enter a wait state until the other thread has released the resource. To limit deadlocks, the executive performs the wait in 500ms intervals. At the end of these 500ms, if the resource is still owned, the executive attempts to implement priority elevation by acquiring the dispatcher lock, boosting the owning thread(s) to 15, resetting its Quantum, and performing another wait. Because ERESOURCE can be either "shared/exclusive", the kernel first boosts the exclusive owner & then checks for shared owners & boosts all of them.
When the waiting thread enters the wait state again, the hope is that the scheduler will schedule one of the ERESOURCE owner threads, which will have enough time to complete its work & release the resource. It's not perfect as this would cause a surge of high-priority threads on the system, all with full Quantum.
Whenever a thread in the FG process completes a wait operation on a kernel object, the kernel boosts its Current Priority Level (PL) by the current value of PspPrioritySeparation. This reflects the quantum-table index used to select quantums for the threads in the FG apps. It's also used as a priority boost value to improve responsiveness of interactive apps.
Threads that own Windows receive an additional boost of 2 when they wake up because of Windowing activity, e.g. arrival of Windows messages. The Windowing system (Win32k.sys) applies this boost when it calls KeSetEvent to set an event used to wake up a GUI Thread. You can see the system apply its boost of 2 for GUI threads that wake up to process window messages by monitoring the current priority of a GUI App & moving the mouse across the window.

PRIORITY INVERSION: A scenario where a low-priority thread (PL 7) running prevents a high-priority thread (PL 14) from accessing a resource (Resource A), because the low-priority thread owns the resource. The low-priority thread never runs enough to free Resource A.
AutoBoost resolves such a scenario by tracking locks and owners and boosting the appropriate thread so that some forward progress can be made.

### Priority Decrement & Starvation Relief
Windows includes a generic CPU Starvation-relief mechanism called the 'Balance-Set Manager'. This is a system thread that scans the ready queues for any thread that has been in the Ready state for approx 4 secs. It then boosts such a thread's priority to 15 & sets the quantum target to an equivalent CPU clock cycle count of 3 quantum units. After the quantum expires, the thread's priority decays immediately to its original base priority. If the thread hasn't finished & a high PL Thread is ready to run, it decays & returns to Ready.
To disable boosting, call SetThreadPriorityBoost (FALSE). This sets the Disable Boost flag in the KTHREAD. Boosting is also disabled if the kernel realizes that the thread has actually exhausted its quantum (but the clock interrupt didn't fire to confirm it) and it has come out of a wait that lasted less than 2 clock ticks.

Priority Recomputation (Removing Boosts) happens on non-Real-time threads (not 16-30). This is done by taking the thread's current priority, subtracting its foreground boost, subtracting its unwait boost (The combination of these last 2 subtraction items is the Priority Decrement), and finally subtracting 1. This new priority is then compared with the base priority of the thread. The new priority is capped at the base priority, and any existing priority decrement is zeroed out.
The AutoBoost idea is to track lock owners & lock waiters in such a way that would allow boosting the appropriate thread's priority to allow threads to make forward progress. The lock info is stored in a status array of KLOCK_ENTRY objects inside the KTHREAD structure. Each KLOCK_ENTRY maintains 2 binary trees:
* One for locks owned by the thread.
* The other for locks waited on by the thread.
These trees are keyed by priority so that constant time is required to determine the highest priority to which boosting should be applied. If a boost is required, the owner's priority is set to the waiter's priority & may also boost the owner's priority by 3 if issued with a lock.

### Context Switching and Termination
Date: [Date: Insert Current Date]
A thread's context is its volatile state. A typical context switch requires saving & reloading of the following parts:
* A pointer to the address space in which the thread runs (The process's page table directory - cached in TLB).
* Kernel/User stack pointers.
* Its Instruction Pointer & stack pointer are all saved in the KTHREAD.
The kernel stack pointer is then set to the new thread's kernel stack & the old thread's context is pushed to the new thread's context and loaded.
If the new thread is in a different process, the kernel loads the address (KVA) of its page table directory into a special processor register so that its address space is available. Control is then passed to the new thread's restored instruction pointer and the new thread resumes operation.
An Optimization strategy called Direct Switch is implemented to allow an old thread to donate its Quantum and priority Boost to another thread , which is immediately scheduled on the same processor. The mechanism is called by passing a flag (2, 1 indicating Direct Switch, 2 indicating Priority Donation) to the KiExitDispatcher. However, the KiSwitchThread function performs the actual switch.
Direct Switch is useful in scenarios like Asynchronous Procedure Calls (APCs), Synchronous Remote Procedure Calls (RPCs), and WaitForSingleObject scheduling scenarios.
Scheduling Scenarios illustrate just how priority-driven preemptive multitasking works on a thread level:
* Voluntary Switch: A Thread might voluntarily relinquish the processor by entering a wait state on some kernel object by calling one of the wait functions like WaitForSingleObject or WaitForMultipleObjects.
* PREEMPTION: A lower-priority thread is preempted when a higher-priority thread becomes READY to RUN. This situation may occur if a thread's priority is increased (or decreased) , or if a high-priority thread has its wait complete. Thread running in User-mode can preempt Kernel-mode Threads. The mode doesn't matter. The main factor is a thread's priority.
* Quantum End: When the running thread exhausts its CPU Quantum, Windows will determine whether the thread's PL should be decremented. If the thread's PL is reduced, it looks for a more appropriate thread to schedule, such as one in a Ready Queue with a Higher PL. If the thread's PL isn't reduced and there are other threads in the Ready Queue at the same PL, it selects the next thread in the Ready Queue at the same PL. It then moves the previously running thread to the tail of that Queue, giving it a new Quantum Value and changing its state from Running $\rightarrow$ Ready. If no other thread of the same priority or higher priority is ready to run, the current thread gets to run for another Quantum.
Instead of simply relying on a clock interval Timer-based Quantum to schedule threads, Windows uses an accurate CPU clock cycle count to maintain Quantum targets. This is also to determine whether Quantum end is currently appropriate for the thread. This is because using a scheduling model that relies only on Clock Interval Timer interrupts may unfairly penalize threads. Interrupts are handled in the context of whichever thread was running at that time and charged to its Quantum. Threads may be unfairly penalized for the time the system was idling inside its clock interval before it was actually scheduled. Windows keeps an accurate count of the exact number of CPU clock cycles spent doing work that the thread was scheduled to do (which means excluding interrupts). The way it works is: The Scheduler looks at the number of CPU clock cycles charged to the Thread by comparing them to the expected CPU clock cycle count that should have been charged at quantum end. If less, the quantum is increased by another clock interval duration and the quantum target for the thread is recalculated.

TERMINATION: A Thread finishes running/execution by returning from its main routine, or it's killed by TerminateThread. It moves from Running to Terminated state. If no open handles on the process/thread object, the thread is removed from the process's thread list. The ETHREAD & associated data structures are deallocated & released to the pool.

IDLE THREADS: Each CPU/processor has its own dedicated idle thread. On a multi-processor system, one CPU can be executing a thread while another CPU might have no threads to execute. When no runnable threads are available to run on a CPU, Windows dispatches that CPU's idle thread. The Idle thread & process are special because they are represented by EPROCESS/KPROCESS & ETHREAD/KTHREAD structures , but they are not executive manager processes & thread objects. Nor is the idle process on the system process list.
The !pcr (processor control region) command , displays a subset of info from the KPRCB. It takes a simple numeric argument which is the number of the CPU whose PCR is to be displayed. The boot processor is processor 0. !pcr 0. The Current Thread & Idle Thread Next Thread are different pointers and exist differently for each CPU/KPRCB. The Process ID, Thread ID, Client ID, PEB & TEB pointers are 0. The Idle Process has no user-mode address space. Its threads execute no user-mode code. They have no need of various data required to manage the user-mode environment.

### Thread Suspension and Selection

Every Thread has a Suspend Count, which is incremented by suspension and decremented by resuming. If a thread's Suspend Count is 0, it is free to execute, otherwise it will not execute.
Freezing is a mechanism by which processes enter a suspended state that can't be changed by calling ResumeThread on threads in the process. This happens when a windowed App goes to the background. A flag in the KTHREAD structure indicates a thread is frozen. For a thread to be able to execute, its Suspend Count must be 0 and the frozen flag must be clear (not set). Deep freeze adds another constraint : Newly created threads in the process can't execute as well. For example, if a call to CreateRemoteThreadEx is used to create a new thread in a deep frozen process, the thread will be frozen before actually starting.

THREAD SELECTION: Picking the next thread to run.
The Scheduler calls KiSelectSchedulableThread to find a Ready state thread to run when:
* A Wait Operation has finished.
* Quantum End on the Running thread.
* A priority change causes the current standby/running thread to no longer be the highest PL ready thread on a CPU.
* The thread has explicitly yielded execution.
* A thread has lost its priority boost.
* The idle scheduler is running.

KiSelectReadyThreadEx checks for ready threads. If a ready thread is not found, the Idle Scheduler is selected for execution. The logical processor may also be interested in immediately running the next ready thread or performing another action if one isn't available, such as when a context switch to the foreground process occurs.
Whenever the idle thread runs, it checks whether idle scheduling has been enabled. If so, it begins scanning other processors' ready queues for threads it can run by calling KiSearchForNewThread. The run-time cost associated with this operation is not charged as idle thread time, but instead charged as Interrupt DPC time charged to the processor. So the Idle Scheduling time is considered as system time.
Windows attempts to schedule the highest PL runnable threads on all available CPUs, guaranteeing running one of the available highest PL Threads somewhere. With shared Ready Queues $\rightarrow$ Threads with no affinity restrictions , the guarantee is stronger. Each shared group of processors is running at least one of the highest priority threads.
There is a per-CPU list of threads in the Deferred Ready state. These threads represent threads that are ready to run but have not yet been readied for execution. The actual ready operation has been deferred to a more appropriate time.
The Deferred Ready Thread list is processed by KiProcessDeferredReady. It does this by calling KiDeferredReadyThread for each thread on the list to perform modifications to process/thread Affinity, Priority (Including Boost), or Quantum values. These could all cause the thread to run immediately , to be put on the ready list of the processor , or if the processor is unavailable, to be potentially put on a different processor's defined ready list, in a standby state, or immediately executed.

### Affinity and Processor Groups

AFFINITY: Each thread has an affinity mask that specifies the processors on which the thread is allowed to run. The thread affinity mask is inherited from the process affinity mask. By default, all processes begin with an affinity mask that is equal to the set of all active processors on their assigned Group Affinity. The system is free to schedule all threads on any available processor within the group assigned to the process.
To optimize throughput, or partition workloads to a specific set of processors , applications can choose the affinity by calling SetThreadAffinityMask or SetProcessAffinityMask or using Task Manager or ProcExp's Set Affinity. Also, the PE executable provides a command-line interface to these functions, by specifying an affinity mask in the Image header.
Windows won't move a running thread that could run on a different processor from one processor to a second processor to then permit a thread with an affinity mask for the first processor to run on the first processor. Therefore, changing affinity masks for a thread/process can result in them getting less CPU time than they normally would, because Windows is restricted from running the thread on certain processors due to Affinity settings.
CPU Sets is a form of Affinity that you can set for use by the system as a whole (Including system thread activity), processes, and even individual threads. System threads are protected from external affinity changes.

### Group-Based Scheduling (DFSS)
Introduced in Windows 8 and Server 2012.

Soft AFFINITY: Managed by an algorithm that tracks processor usage, the IDEAL PROCESSOR.
Each thread has three CPU numbers stored in the kernel thread control block : Ideal Processor, Last Processor, Next Processor.
The ideal processor for a thread is chosen when a thread is created using a seed in the process control block. The seed is incremented each time a thread is created so that the Ideal Processor for each new thread in the process rotates through the available processors on the system. The "next" ideal processor is selected from the hyperthreading set, such that threads are spread evenly across the Physical Processors.
The above explanation is for a Simultaneous Multi-threading Multi-processor system. Meanwhile, on NUMA systems where processors are grouped into Nodes , when a process is created, an ideal node for that process is selected. The first process is assigned to node 0, the second process to node 1, and so on. Then the ideal processors for the threads in the process are chosen from the process's ideal node. The ideal processor for the first thread in a process is assigned to the first processor in the node. As more threads are created in processes with the same ideal node , the next processor is used for the next thread's ideal processor and so on within the same node.
Regardless of the underlying scenario and various possibilities, threads are mostly put on their Ideal Processor's Per-processor ready queues , guaranteeing the consistency of the Algorithms that determine how a logical processor picks a thread to run when there are idle processors versus when there are no idle processors.

Thread Based Scheduling attempts to fairly share the processor(s) amongst competing threads of the same priority only. It doesn't account for higher-level concerns such as the distribution of threads to users. This is problematic in Terminal-Services Environments , where dozens of users compete for CPU time such that a single high-priority thread from a given user has the potential to starve threads from other users on the system.
Group-Based Scheduling is built around the concept of a Kernel Scheduling Group , which maintains a policy, its scheduling parameters, and a list of Kernel Scheduling Control Blocks (KSCBs), one per-processor.
* Generation: The amount of time over which to track CPU usage.
* Quota: The amount of CPU usage allowed to a group per Generation (Over Quota vs Under Quota).
* Fair-Share Scheduling: Idle cycles are given to threads that are Over Quota if no Under-Quota threads want to run.
* Weight (RANK): The relative importance of a group, between 1-9 (5 is default, 0 is the highest).
An important parameter maintained by a scheduling group is called RANK $\rightarrow$ Scheduling Priority of the Group of threads. A Rank with a value closer to 0 is the highest. A higher rank means the group has used more CPU time and so it is less likely to get more CPU time. "Rank Trumps Priority". Equal-Rank threads are compared based on priority.
The rank is adjusted periodically as Cycle Usage Increases. Rank 0 can designate any of the following:
* The thread is not in any scheduling group (1).
* Within a kernel critical or guarded region, Ready.
* Under-Quota Threads.
* Real-Time Priority (16-31) Threads.
* Threads executing at IRQL APC.
The decision of which thread to schedule next accounts for the Scheduling Group of the current or Ready thread. If a Scheduling Group exists, the lowest value rank wins out, followed by Priority. If quantum ends, the next thread is the first arriving thread in the Queue (if priorities are equal; Round-Robin at quantum end).

DFSS (Dynamic Fair-Share Scheduling) is a mechanism that can be used to fairly distribute CPU time amongst sessions running on a machine , preventing one session from monopolizing the CPU if some threads running under that session have a relatively high priority and run a lot. It's enabled by default on a Windows Server system that has the Remote Desktop role. It can be configured on Client systems too. The last phase of System Init $\rightarrow$ Registry Hive Initialized by Smss $\rightarrow$ PsBootPhaseComplete calls PspIsDFSSEnabled (either DFSS/LEGACY). For DFSS to be enabled: EnableCpuQuota must be Non-Zero in both:
* $\text{HKLM}\backslash\text{Software}\backslash\text{Policies}\backslash\text{Microsoft}\backslash\text{Windows}\backslash\text{Session Manager}\backslash\text{Quota System}$.
* $\text{HKLM}\backslash\text{System}\backslash\text{CurrentControlSet}\backslash\text{Control}\backslash\text{Session Manager}\backslash\text{Quota System}$.
If DFSS is enabled, the PspPerfShareEnabled global variable is set $\rightarrow$ TRUE , which makes all threads belong to a Scheduling Group (except Session 0 processes). After DFSS is enabled, any new session created , MmSessionObjectCreate allocates a scheduling group associated with the new session (default Rank 5). A Scheduling group manages either DFSS/CPU-Rate Control info based on a KSCHEDULING_GROUP_POLICY that is part of a scheduling group.
DFSS is not good enough as a general mechanism to limit the CPU time of threads or processes.

### Worker Factories and Dynamic Processors

WORKER FACTORIES (User-Thread Pool).
The Scheduling-Group Infrastructure can be used in a more granular fashion by using a CPU Rate Limit on a Job Object. One of the limitations you can place on a Job is a CPU Rate Control, which is done by calling SetInformationJobObject with JobObjectCpuRateControlInformation as the job info class and a structure type of JOBOBJECT_CPU_RATE_CONTROL_INFORMATION containing the actual data. The structure contains a set of flags that enable you to apply one of the three settings to limit CPU Time:
1. CPU Rate (1-10,000 $\rightarrow$ Represents 1% - 100%).
2. Min & Max Cpu Rates.
3. Weight Based (1-9) ($\rightarrow$ DFSS is config with this) .
The net result of setting these limits is to place all threads from all processes that are part of a Job in a new scheduling group and configuring the group as specified. Use !cpulimit or CPUSTRES to test.


DYNAMIC PROCESSOR ADDITION: Desktop machines require shutting down the PC to make any sort of hardware changes to the process or core count. Today, some server systems cannot afford the downtime that CPU replacement/addition normally requires. To address this requirement, the latest generation of some system motherboards support the addition of processors while the machine is running. The ACPI BIOS and related hardware on the machine have been built to be aware of this need , but Operating System participation is required for full support. To support the features $\rightarrow$ the Hardware Abstraction Layer (HAL) is involved in the process , which notifies the kernel of a new processor on the system via the KeStartDynamicProcessor function. This routine does similar work to that performed when the system detects more than 1 processor at startup & needs to initialize the structures related to them. However, other Executive parts of the kernel are also called. The processor features need to be updated for the new processor to match the rest of the system (e.g. Hyper-V). The initialization sequence completes with the notification of the Windows Hardware Error Architecture (WHEA) component that a new processor is online. Device Drivers are also notified via a default executive callback object. Once drivers are notified, the final kernel component called is the Plug and Play Manager , which adds the processor to the system's device node and rebalances Interrupts so that the new processor can handle Interrupts that were already registered for other processors.
Applications should not take advantage of a dynamically added processor by default (they must request it). Why? A sudden change of affinity can have potentially breaking changes for an running App, especially going from a single-processor $\rightarrow$ multi-processor environment. As part of KeStartDynamicProcessor, a new step has been added after Interrupts are rebalanced : calling the Process Manager to perform affinity updates through PspUpdateActiveProcessAffinity.


WORKER FACTORIES are the internal mechanism used to implement User Thread Pools (previously NT thread pool API). One issue with the old implementation was that only one thread pool could be created in a process and also the implementation itself was in user mode (in Ntdll.dll). However, now NTdll merely provides the interfaces / high-level APIs required for interacting with the worker factory kernel code. The kernel thread pool functionality in Windows is managed by an Object Manager type called ExWorkerFactory , as well as 4 native (NT) system calls for managing the factory and its workers and 2 Query/Set native calls & a Wait call. These calls provide user-mode code with a handle to the ExWorkerFactory Object, which contains information.
The Worker Factory Implementation is responsible for allocating worker threads (or calling the given user-mode worker thread entry point) , maintaining a Min/Max thread count (allowing for permanent/dynamic worker pools) , as well as other accounting info. A worker factory will create a new thread if all conditions below are met:
1. Dynamic thread creation is enabled.
2. Number of available workers is less than the Max number of workers configured.
3. The Worker Factory has bound objects or a thread has been actuated into the pool.
4. There are pending I/O Request Packets (IRPs) associated with a worker thread.

I/O Completion Ports (KQUEUE): When creating a worker factory, an I/O Completion Port must have already been created by user mode and the handle needs to be passed in. It is through this I/O Completion Port that the user-mode implementation will queue and wait for work. The ReleaseWorkerFactory call (which queues work) is a wrapper around IoSetCompletionEx, which increases pending work , while the wait call is a wrapper around IoRemoveIoCompletion. Both routines call into the kernel Queue.
The job of the worker factory code is to manage either a persistent, static, or dynamic thread pool , wrap the I/O Completion Port model into interfaces that try to prevent stalled worker threads by auto creating dynamic threads , simplify global cleanup/termination operations during a factory shutdown request & block new requests.


### 1. The Kernel Base: _EPROCESS and _ETHREAD

Every process and thread starts here — the NT executive level (in ntoskrnl.exe).

- _EPROCESS → Represents a process in the kernel.
It stores core attributes like address space, handle table, access tokens, and thread lists.

- _ETHREAD → Represents a thread in the kernel.
It links to its parent _EPROCESS, its TEB (Thread Environment Block) in user mode, and scheduling information.


- _EPROCESS and _ETHREAD are the canonical representations.

These are managed by the NT kernel itself (the “nt!” world).

- The kernel scheduler, memory manager, I/O manager, and security subsystems all operate on these.
- These objects live entirely in kernel space and exist for every process — even console-only or service processes.

### 2. The User-Mode Subsystem Layer: csrss.exe and _CSR_*

Now, when a process starts, CSRSS (Client/Server Runtime Subsystem) — the Windows user-mode subsystem manager — is notified.
CSRSS maintains its own bookkeeping of processes and threads that are part of the Windows Subsystem.

- _CSR_PROCESS → Mirrors _EPROCESS from the kernel’s perspective but in user mode inside csrss.exe.
It holds info like console handles, process flags, API port handles, etc.

- _CSR_THREAD → Mirrors _ETHREAD in user mode.
It tracks per-thread state, such as Win32 API message handling and communication with csrss.exe.


- It creates _CSR_PROCESS and _CSR_THREAD objects only for processes that register with the Windows subsystem, i.e., Win32 processes.
- These are user-mode mirror records of kernel processes/threads.
They’re not copies of the same memory — just bookkeeping that lets CSRSS handle:

- Console I/O
- Thread creation notifications
- Exception dispatching
- Exit handling
- Window message loops before GUI initialization.

These are not duplicates, but parallel tracking structures — the subsystem’s shadow copies of process/thread metadata.

Every GUI-capable or Win32 process has a corresponding CSR_PROCESS and CSR_THREAD maintained by csrss.exe.

### 3. The GUI and Graphics Layer: win32k.sys and _W32PROCESS / _W32THREAD

When a process loads the Win32 API DLLs (user32.dll, gdi32.dll), it becomes a GUI process.
That triggers win32k.sys (the kernel graphics and window manager) to attach graphical context.


- Win32k allocates _W32PROCESS and _W32THREAD structures in kernel space and links them via pointers in _EPROCESS / _ETHREAD.
- _W32PROCESS → The kernel-mode structure in win32k.sys representing the process’s GUI state.
Contains info like window station, desktop handles, GDI handle tables, etc.

- _W32THREAD → Represents a thread’s GUI state: message queue, input focus, window handles, etc.
- Those structures carry:
  - Window station / desktop handles
  - Message queues
  - GDI handle tables
  - Input focus and cursor state
  - Synchronization with CSRSS’s message ports.

These structures live in kernel space (win32k.sys) but are logically associated with their _EPROCESS / _ETHREAD counterparts.

So the _EPROCESS is always there.
Then:

- CSRSS attaches its _CSR_* objects when the process is managed by the Win32 subsystem.
- win32k.sys attaches its _W32* objects when GUI capability is initialized.


The executive adds user-visible and subsystem logic; the kernel manages scheduling and synchronization.

The _KPROCESS is the Process Control Block (PCB) embedded within _EPROCESS,
and the _KTHREAD is the Thread Control Block (TCB) embedded within _ETHREAD.

They’re the “kernel dispatcher objects” nested inside the “executive objects.”

### The “K” in KPROCESS and KTHREAD

The prefix K means Kernel Dispatcher Object — it’s the minimal, scheduler-visible part of a process or thread.

So:

- _KPROCESS = the kernel’s process control block (PCB) — what the scheduler and dispatcher care about.
- _KTHREAD = the kernel’s thread control block (TCB) — what represents a runnable entity on a CPU.

### Relationship Between EPROCESS/ETHREAD and KPROCESS/KTHREAD

Windows uses a layered object model where executive objects “wrap” kernel dispatcher objects.


➤ _EPROCESS (Executive-level process)
- High-level OS abstraction for a process: address space, handle tables, security token, object table, etc.
- Contains:

```text
+0x098 Pcb : _KPROCESS

(offset varies by version)
```

- The Pcb field is literally a nested _KPROCESS struct — not a pointer but a full embedded structure.

That means every process is built around a KPROCESS.


➤ _ETHREAD (Executive-level thread)
- High-level abstraction for a thread: start address, exit status, impersonation token, APC queues, etc.
- Contains:

```text
+0x000 Tcb : _KTHREAD

(often the first field!)
```

- Same deal — the _KTHREAD is embedded in the _ETHREAD.

### Why This Exists — “Layered Object” Design

NT was designed as a layered kernel:

- Kernel layer → responsible for low-level primitives like scheduling, context switching, synchronization (KPROCESS/KTHREAD, KSEMAPHORE, KEVENT, etc.)
- Executive layer → builds higher abstractions (EPROCESS/ETHREAD, HANDLE tables, Object Manager support, I/O management).

So:

_KPROCESS and _KTHREAD are what the kernel dispatcher and scheduler see.
_EPROCESS and _ETHREAD are what the executive and object manager see.

The executive layer extends the kernel layer.


### Control Flow Summary

When a thread is scheduled:

1. The dispatcher works purely with _KTHREAD structures — it knows how to queue, prioritize, and context switch them.
2. The _KTHREAD contains:
   - Stack pointers (Kernel/User)
   - Processor affinity
   - Quantum, priority
   - Scheduling state
   - Wait lists, synchronization info
3. The _EPROCESS (via _KPROCESS) holds process-wide scheduler parameters:
   - Process base priority
   - Default quantum
   - Affinity mask
   - Ready queues
   - Pointer to the directory table base (CR3 / page directory)

The rest of _EPROCESS — handles, tokens, image info — are managed by the executive, not the scheduler.

### Each Structure = A Contiguous Memory “Region” (Like a Page in a Book)

When Windows creates an executive object like _EPROCESS or _ETHREAD, it allocates a single contiguous memory block large enough to hold the entire structure, including its embedded substructures (like _KPROCESS and _KTHREAD).

That’s why, when you dump the memory around the address of _EPROCESS, you’ll see field offsets that increase linearly, e.g.:

```text
nt!_EPROCESS
    +0x000 Pcb : _KPROCESS
    +0x2d0 ProcessLock : _EX_PUSH_LOCK
    +0x2d8 UniqueProcessId : Ptr64 Void
    +0x2e0 ActiveProcessLinks : _LIST_ENTRY
    ...
```

So if _EPROCESS begins at (say) 0xFFFFA20A34C3B080,
then:

- The embedded _KPROCESS lives starting at that same base (+0x000).
- The other fields follow sequentially in memory.

It’s literally like a book chapter:
each substructure occupies its own segment within the continuous memory page for that object.

### Embedded vs. Pointer Fields

Here’s the key distinction that explains what you’re seeing:

| Field Type | Example | Memory Layout | Description |
|---|---|---|---|
| Embedded Structure | _EPROCESS.Pcb : _KPROCESS | Occupies part of the same contiguous memory | No pointer indirection — data lives directly inside the parent object. |
| Pointer to Another Structure | _EPROCESS.ThreadListHead → _ETHREAD list | Stores only the pointer (address) | The actual target is elsewhere in memory. |
So:

- _KPROCESS and _KTHREAD are embedded → contiguous in the parent’s memory.
- Most other objects (handle tables, tokens, etc.) are referenced by pointer → non-contiguous.

### Memory Spacing Example (Approximate Layout)
Let’s visualize this for a single process object:

```text
EPROCESS @ 0xFFFFA20A34C3B080
│
├── KPROCESS (PCB)
│   [0x0000 - 0x02CF]
│
├── ProcessLock
│   [0x02D0 - 0x02D7]
│
├── UniqueProcessId
│   [0x02D8 - 0x02DF]
│
├── ActiveProcessLinks
│   [0x02E0 - 0x02EF]
│
├── Token
│   [0x0350 - 0x0357]
│
└── ...
    [continues up to ~0x065AB depending on version]
```

Within that space:

- _KPROCESS is the first “chapter”.
- Each subsequent field or substructure occupies the next offsets.
- This is why you see them aligned like “pages” when viewing memory addresses.

### The Same Applies to _ETHREAD

```text
ETHREAD @ 0xFFFFA20A36A2A080
│
├── KTHREAD (TCB)
│   [0x0000 - 0x01FF]
│
├── CreateTime
│   [0x0200 - 0x0207]
│
├── ExitTime
│   [0x0208 - 0x020F]
│
├── Cid (Client ID)
│   [0x0210 - 0x0217]
│
└── ...
```

So when you dump memory in WinDbg:
0: kd> dt nt!_ETHREAD <address>
…the offsets you see correspond directly to byte ranges in that contiguous allocation.

### Think of It Like a Nested Struct in C
If you wrote this in C, it would literally look like:

```c
typedef struct _EPROCESS {
    KPROCESS Pcb;             // occupies first bytes
    EX_PUSH_LOCK ProcessLock; // follows directly in memory
    PVOID UniqueProcessId;
    LIST_ENTRY ActiveProcessLinks;
    // ...
} EPROCESS;
```

When this struct is allocated:

- The Pcb fields occupy the first region.
- Everything after it follows linearly.

That’s why the debugger output appears like “book pages” — it’s the raw in-memory layout of that composite structure. These structures live in non-paged pool or paged pool memory (depending on type). When the kernel creates a process/thread:

- EPROCESS / ETHREAD → Allocated from non-paged pool (since kernel must access them at IRQL > PASSIVE_LEVEL).
- Internally, Windows uses ExAllocatePoolWithTag to allocate a block of memory large enough to hold the structure.

So it’s one block (like a “book”), not one page.

When you dump the memory region (e.g., !pool, !poolfind, or memory window view), you might see the structure’s members at offset-like addresses:

_EPROCESS
    +0x000 Pcb              : _KPROCESS
    +0x160 ProcessLock      : _EX_PUSH_LOCK
    +0x168 UniqueProcessId  : Ptr64 Void
    ...

These offsets make it look like EPROCESS “contains” a _KPROCESS at +0x0.
That’s correct — _EPROCESS literally embeds _KPROCESS as its first field.
But these offsets don’t correspond to virtual pages. They are just field offsets within the same allocated block.


The Sysinternals web site was created in 1996 by Mark Russinovich to host his advanced system utilities and technical information. Whether you’re an IT Pro or a developer, you’ll find Sysinternals utilities to help you manage, troubleshoot and diagnose your Windows systems and applications. https://docs.microsoft.com/en-us/sysinternals/

Unlike Task Manager and all other process/processor monitoring tools, Process Explorer uses the clock cycle counter designed for thread run-time accounting (described later in this chapter) instead of the clock interval timer, so you will see a significantly different view of CPU consumption using Process Explorer. This is because many threads run for such a short time that they are seldom (if ever) the currently running thread when the clock interval timer interrupt occurs. As a result, they are not charged for much of their CPU time, leading clock-based tools to perceive a CPU usage of 0 percent. On the other hand, the total number of clock cycles represents the actual number of processor cycles that each thread in the process accrued. It is independent of the clock interval timer’s resolution because the count is maintained internally by the processor at each cycle and updated by Windows at each interrupt entry . (A final accumulation is done before a context switch. Think of clock-based tools as a security camera taking one photo every second — if a thief runs in and out between photos, you’ll miss them. Process Explorer is like a motion sensor that tracks every little movement — it knows exactly when and how much activity happened.

AUTOSTARTS is the term I use to refer to software that runs automatically without being intentionally started by a user. This type of software includes drivers and services that start when the computer is booted; applications, utilities, and shell extensions that start when a user logs on; and browser extensions that load when Internet Explorer is started. Over 200 locations in the file system and registry allow autostarts to be configured on x64 versions of Windows. These locations are often referred to as Autostart Extensibility Points, or ASEPs. As malware has become more sophisticated and difficult to identify, its use of ASEPs
has become more sophisticated as well, malware often leverages rootkits, which subvert the integrity of the operating system. Rootkits intercept and modify system calls, lying to software that uses documented system interfaces about the state of the system. Rootkits can hide the presence of registry keys and values, files and directories, processes, sockets, user accounts, and more, or they can make software believe something exists when it doesn’t. Some telltale signs that can point to malware:
■ Entries with a well-known publisher such as Microsoft that fail signature verification. (Unfortunately, not all software published by Microsoft is signed.)
■ Entries with an image path pointing to a DLL or EXE file that is missing Description or Publisher information (unless the target file is not found).
■ A common Windows component that is launched from an unusual or nonstandard location—for example, svchost.exe or another service launching from C:\Windows or C:\Windows\SysWOW64 (instead of from System32) or from C:\System Volume Information.
■ Entries with names that can be mistaken for common Windows components, such as those with slight misspellings—for example,“Isass.exe” with a capital “I” instead of a lower-case “L”, “scvhost.exe” instead of “svchost.exe,” or “iexplorer.exe” with the extra “r” at the end.
■ Entries for which the file date and time of the launched program correspond to when problems were first noticed or a breach is discovered to have occurred.
■ Disabling or deleting an entry, pressing F5 to refresh the display, and finding the entry still present and enabled. Malware will often monitor its ASEPs and put them back if they get removed.

AUTORUNS utility to expose as many autostarts as we could identify, and to make it easy to disable or remove those autostarts. The information that Autoruns exposes can be discovered manually if you know where to look in the registry and file system. Autoruns automates that task, scanning a large number of ASEPs in a few seconds, verifying entries, and making it easier to identify entries with suspicious characteristics, such as the lack of a digital signature, or that are flagged as suspicious by VirusTotal. Windows tracks the last write time for registry keys but not for individual registry values, the “last modified” time for a registry ASEP location will be for the key and might not reflect when a specific entry was changed. AutorunsC is a console-mode version of Autoruns that outputs results to its standard output. It is designed primarily for use in scripts. Its purpose is data collection only: it cannot disable or delete any autostart entries. The command-line options are listed below.  They let you capture all autostarts or just specific categories, verify digital signatures, query VirusTotal, omit Microsoft entries, specify a user account for which to capture autostarts or capture all user accounts’ autostarts, and output results as comma-separated or tab-separated values (CSV) or as XML. If you don’t specify any options, AutorunsC outputs just the Logon entries without signature verification and in an indented list format designed for human reading. To capture other ASEPs, add the –a option followed by one or more letters indicating the ASEP categories of interest, or * to capture all ASEP categories.

The Boot Execute are Windows native-mode executables that are started by the Session Manager (Smss.exe) during system boot. BootExecute typically includes tasks, such as hard-drive verification and repair (Autochk.exe), that cannot be performed while Windows is running

AppInit
The idea behind AppInit DLLs surely seemed like a good idea to the software engineers who incorporated it into Windows NT 3.1. Specify one or more DLLs in the Appinit_Dlls registry key, and those DLLs will be loaded into every process that loads User32.dll (that is, virtually all user-mode Windows processes). Well, what could go wrong with that?
■ The AppInit DLLs are loaded into the process during User32’s initialization—that is, while its DllMain function is executing. Developers are explicitly told not to load other DLLs within a DllMain. It can lead to deadlocks and out-of-order loads, which can lead to application crashes. And yet here, the AppInit DLL “feature” does exactly that. And yes, that has led to deadlock and application crashes.5
■ A DLL that automatically gets loaded into every process on the computer sounds like a winner if you are writing malware. Although AppInit has been used in legitimate (but misguided) software, it is frequently used by malware. Because of these problems, AppInit DLLs are deprecated and disabled by default in Windows Vista and newer. For purposes of backward compatibility, it is possible to re-enable AppInit DLL functionality, but doing so is strongly discouraged. To ensure that AppInit DLLs have not been re-enabled, verify that the LoadAppInit_DLLs DWORD value is 0 in HKLM\Software\Microsoft\Windows NT\ CurrentVersion\Windows and in HKLM\Software\Wow6432Node\Microsoft\Windows NT\ CurrentVersion\Windows.

KnownDLLs
KnownDLLs helps improve system performance by ensuring that all Windows processes use the same version of certain DLLs, rather than choose their own from various file locations. During startup, the Session Manager maps the DLLs listed in HKLM\System\CurrentControlSet\Control\Session Manager\KnownDlls into memory as named section objects. When a new process is loaded and needs to map these DLLs, it uses the existing sections rather than searching the file system for another version of the DLL. The Autoruns KnownDLLs tab should contain only verifiable Windows DLLs. On 64-bit versions of Windows, the KnownDLLs tab lists one ASEP, but file entries are duplicated for both 32-bit and 64-bit versions of the DLLs, in directories specified by the DllDirectory and DllDirectory32 values in the registry key. Note that the Windows-On-Windows-64 (WOW64) support DLLs are present only in the System32 directory and Autoruns will report “file not found” for the corresponding SysWOW64 directory entries. This is normal.

Image hijacks
Image hijacks is the term I use for ASEPs that run a different program from the one you specify and expect to be running. The Image Hijacks tab displays four types of these redirections:
■ exefile Changes to the association of the .exe or .cmd file types with an executable command. The file-association user interfaces in Windows have never exposed a way to change the association of the .exe or .cmd file types, but they can be changed in the registry. Note that there are per-user and systemwide versions of these ASEPs.
■ htmlfile Changes to the association of the .htm or .html file types with an executable command. Some malware that hijacks these ASEPs can come into play when you open an HTML file. Verify that the executable command is a legitimate browser.
■ Command Processor\Autorun A command line that is executed whenever a new Cmd.exe instance is launched. The command runs within the context of the new Cmd.exe in- stance. There is a per-user and systemwide variant, as well as a separate version for the 32-bit Cmd.exe on 64-bit Windows.
■ Image File Execution Options (IFEO) Subkeys of this registry location (and its echo in the 64-bit versions of Windows) are used for a number of internal and undocumented purposes. One purpose for IFEO subkeys that has been documented is the ability to specify an alternate program to start whenever a particular application is launched. By creating a subkey named
for the file name of the original program and a “Debugger” value within that key that specifies an executable path to an alternate program, the alternate program is started instead and receives the original program path and command line on its command line. The original purpose of this mechanism was for the alternate program to be a debugger and for the new process to be started by that debugger, rather than having a debugger attach to the process later, after its startup code had already run. However, there is no requirement that the alternate program actually be a debugger, nor that it even look at the command line passed to it. In fact, this mechanism is how Process Explorer replaces Task Manager. 

The following lists the Logon ASEP locations that Autoruns inspects on a particular instance of an x64 version of Windows 10. The Startup directory in the “all users” Start menu %ALLUSERSPROFILE%\Microsoft\Windows\Start Menu\Programs\Startup
The Startup directory in the user’s Start menu
%APPDATA%\Microsoft\Windows\Start Menu\Programs\Startup
Per-user ASEPs under HKCU\Software
HKCU\Software\Microsoft\Windows\CurrentVersion\Run
HKCU\Software\Microsoft\Windows\CurrentVersion\RunOnce
HKCU\Software\Microsoft\Windows NT\CurrentVersion\Terminal Server\Install\Software\Microsoft\Windows\
CurrentVersion\Run
HKCU\Software\Microsoft\Windows NT\CurrentVersion\Terminal Server\Install\Software\Microsoft\Windows\
CurrentVersion\Runonce
HKCU\Software\Microsoft\Windows NT\CurrentVersion\Terminal Server\Install\Software\Microsoft\Windows\
CurrentVersion\RunonceEx
HKCU\Software\Microsoft\Windows NT\CurrentVersion\Windows\Load
HKCU\Software\Microsoft\Windows NT\CurrentVersion\Windows\Run
HKCU\Software\Microsoft\Windows NT\CurrentVersion\Winlogon\Shell
Per-user ASEPs under HKCU\Software—64-bit only
HKCU\Software\Wow6432Node\Microsoft\Windows\CurrentVersion\Run
HKCU\Software\Wow6432Node\Microsoft\Windows\CurrentVersion\RunOnce

Per-user ASEPs under HKCU\Software intended to be controlled through Group Policy
HKCU\Software\Microsoft\Windows\CurrentVersion\Policies\Explorer\Run
HKCU\Software\Microsoft\Windows\CurrentVersion\Policies\System\Shell
HKCU\Software\Policies\Microsoft\Windows\System\Scripts\Logon
HKCU\Software\Policies\Microsoft\Windows\System\Scripts\Logoff
Systemwide ASEPs in the registry
HKLM\Software\Microsoft\Windows\CurrentVersion\Run
HKLM\Software\Microsoft\Windows\CurrentVersion\RunOnce
HKLM\Software\Microsoft\Windows\CurrentVersion\RunOnceEx
HKLM\Software\Microsoft\Active Setup\Installed Components
HKLM\Software\Microsoft\Windows NT\CurrentVersion\Terminal Server\Install\Software\Microsoft\Windows\
CurrentVersion\Run
HKLM\Software\Microsoft\Windows NT\CurrentVersion\Terminal Server\Install\Software\Microsoft\Windows\
CurrentVersion\Runonce
HKLM\Software\Microsoft\Windows NT\CurrentVersion\Terminal Server\Install\Software\Microsoft\Windows\
CurrentVersion\RunonceEx
HKLM\Software\Microsoft\Windows NT\CurrentVersion\Winlogon\IconServiceLib
HKLM\Software\Microsoft\Windows NT\CurrentVersion\Winlogon\AlternateShells\AvailableShells
HKLM\Software\Microsoft\Windows NT\CurrentVersion\Winlogon\AppSetup
HKLM\Software\Microsoft\Windows NT\CurrentVersion\Winlogon\Shell
HKLM\Software\Microsoft\Windows NT\CurrentVersion\Winlogon\Taskman
HKLM\Software\Microsoft\Windows NT\CurrentVersion\Winlogon\Userinit
HKLM\Software\Microsoft\Windows NT\CurrentVersion\Winlogon\VmApplet
HKLM\System\CurrentControlSet\Control\SafeBoot\AlternateShell
HKLM\System\CurrentControlSet\Control\Terminal Server\Wds\rdpwd\StartupPrograms
HKLM\System\CurrentControlSet\Control\Terminal Server\WinStations\RDP-Tcp\InitialProgram
Systemwide ASEPs in the registry, intended to be controlled through Group Policy
HKLM\Software\Microsoft\Windows\CurrentVersion\Policies\Explorer\Run
HKLM\Software\Microsoft\Windows\CurrentVersion\Policies\System\Shell
HKLM\Software\Policies\Microsoft\Windows\System\Scripts\Logon
HKLM\Software\Policies\Microsoft\Windows\System\Scripts\Logoff
HKLM\Software\Policies\Microsoft\Windows\System\Scripts\Startup
HKLM\Software\Policies\Microsoft\Windows\System\Scripts\Shutdown
HKLM\Software\Microsoft\Windows\CurrentVersion\Group Policy\Scripts\Startup
HKLM\Software\Microsoft\Windows\CurrentVersion\Group Policy\Scripts\Shutdown
Systemwide ASEPs in the registry—64-bit only
HKLM\Software\Wow6432Node\Microsoft\Windows\CurrentVersion\Run
HKLM\Software\Wow6432Node\Microsoft\Windows\CurrentVersion\RunOnce
HKLM\Software\Wow6432Node\Microsoft\Windows\CurrentVersion\RunOnceEx
HKLM\Software\Wow6432Node\Microsoft\Active Setup\Installed Components
Systemwide ActiveSync ASEPs in the registry
HKLM\Software\Microsoft\Windows CE Services\AutoStartOnConnect
HKLM\Software\Microsoft\Windows CE Services\AutoStartOnDisconnect
Systemwide ActiveSync ASEPs in the registry—64-bit only
HKLM\Software\Wow6432Node\Microsoft\Windows CE Services\AutoStartOnConnect
HKLM\Software\Wow6432Node\Microsoft\Windows CE Services\AutoStartOnDisconnect

Per-user ASEPs under HKCU\Software
HKCU\Software\Classes\*\ShellEx\ContextMenuHandlers
HKCU\Software\Classes\*\ShellEx\PropertySheetHandlers
HKCU\Software\Classes\AllFileSystemObjects\ShellEx\ContextMenuHandlers
HKCU\Software\Classes\AllFileSystemObjects\ShellEx\DragDropHandlers
HKCU\Software\Classes\AllFileSystemObjects\ShellEx\PropertySheetHandlers
HKCU\Software\Classes\Clsid\{AB8902B4-09CA-4bb6-B78D-A8F59079A8D5}\Inprocserver32
HKCU\Software\Classes\Directory\Background\ShellEx\ContextMenuHandlers
HKCU\Software\Classes\Directory\ShellEx\ContextMenuHandlers
HKCU\Software\Classes\Directory\Shellex\CopyHookHandlers
HKCU\Software\Classes\Directory\Shellex\DragDropHandlers
HKCU\Software\Classes\Directory\Shellex\PropertySheetHandlers
HKCU\Software\Classes\Drive\ShellEx\ContextMenuHandlers
HKCU\Software\Classes\Folder\Shellex\ColumnHandlers
HKCU\Software\Classes\Folder\ShellEx\ContextMenuHandlers
HKCU\Software\Classes\Folder\ShellEx\DragDropHandlers
HKCU\Software\Classes\Folder\ShellEx\ExtShellFolderViews
HKCU\Software\Classes\Folder\ShellEx\PropertySheetHandlers
HKCU\Software\Classes\Protocols\Filter
HKCU\Software\Classes\Protocols\Handler
HKCU\Software\Microsoft\Ctf\LangBarAddin
HKCU\Software\Microsoft\Internet Explorer\Desktop\Components
HKCU\Software\Microsoft\Windows\CurrentVersion\Explorer\ShellIconOverlayIdentifiers
HKCU\Software\Microsoft\Windows\CurrentVersion\Explorer\ShellServiceObjects
HKCU\Software\Microsoft\Windows\CurrentVersion\ShellServiceObjectDelayLoad
HKLM\Software\Classes\*\ShellEx\ContextMenuHandlers
HKLM\Software\Classes\*\ShellEx\PropertySheetHandlers
HKLM\Software\Classes\AllFileSystemObjects\ShellEx\ContextMenuHandlers
HKLM\Software\Classes\AllFileSystemObjects\ShellEx\DragDropHandlers
HKLM\Software\Classes\AllFileSystemObjects\ShellEx\PropertySheetHandlers
HKLM\Software\Classes\Directory\Background\ShellEx\ContextMenuHandlers
HKLM\Software\Classes\Directory\ShellEx\ContextMenuHandlers
HKLM\Software\Classes\Directory\Shellex\CopyHookHandlers
HKLM\Software\Classes\Directory\Shellex\DragDropHandlers
HKLM\Software\Classes\Directory\Shellex\PropertySheetHandlers
HKLM\Software\Classes\Drive\ShellEx\ContextMenuHandlers
HKLM\Software\Classes\Folder\Shellex\ColumnHandlers
HKLM\Software\Classes\Folder\ShellEx\ContextMenuHandlers
HKLM\Software\Classes\Folder\ShellEx\DragDropHandlers
HKLM\Software\Classes\Folder\ShellEx\ExtShellFolderViews
HKLM\Software\Classes\Folder\ShellEx\PropertySheetHandlers
HKLM\Software\Classes\Protocols\Filter
HKLM\Software\Classes\Protocols\Handler
HKLM\Software\Microsoft\Ctf\LangBarAddin
HKLM\Software\Microsoft\Windows\CurrentVersion\Explorer\SharedTaskScheduler
HKLM\Software\Microsoft\Windows\CurrentVersion\Explorer\ShellExecuteHooks
HKLM\Software\Microsoft\Windows\CurrentVersion\Explorer\ShellIconOverlayIdentifiers
HKLM\Software\Microsoft\Windows\CurrentVersion\Explorer\ShellServiceObjects
HKLM\Software\Microsoft\Windows\CurrentVersion\ShellServiceObjectDelayLoad
Systemwide ASEPs in the registry—64-bit only
HKLM\Software\Wow6432Node\Classes\*\ShellEx\ContextMenuHandlers
HKLM\Software\Wow6432Node\Classes\*\ShellEx\PropertySheetHandlers
HKLM\Software\Wow6432Node\Classes\AllFileSystemObjects\ShellEx\ContextMenuHandlers
HKLM\Software\Wow6432Node\Classes\AllFileSystemObjects\ShellEx\DragDropHandlers
HKLM\Software\Wow6432Node\Classes\AllFileSystemObjects\ShellEx\PropertySheetHandlers
HKLM\Software\Wow6432Node\Classes\Directory\Background\ShellEx\ContextMenuHandlers
HKLM\Software\Wow6432Node\Classes\Directory\ShellEx\ContextMenuHandlers
HKLM\Software\Wow6432Node\Classes\Directory\Shellex\CopyHookHandlers
HKLM\Software\Wow6432Node\Classes\Directory\Shellex\DragDropHandlers
HKLM\Software\Wow6432Node\Classes\Directory\Shellex\PropertySheetHandlers
HKLM\Software\Wow6432Node\Classes\Drive\ShellEx\ContextMenuHandlers
HKLM\Software\Wow6432Node\Classes\Folder\Shellex\ColumnHandlers
HKLM\Software\Wow6432Node\Classes\Folder\ShellEx\ContextMenuHandlers
HKLM\Software\Wow6432Node\Classes\Folder\ShellEx\DragDropHandlers
HKLM\Software\Wow6432Node\Classes\Folder\ShellEx\ExtShellFolderViews
HKLM\Software\Wow6432Node\Classes\Folder\ShellEx\PropertySheetHandlers
HKLM\Software\Wow6432Node\Microsoft\Windows\CurrentVersion\Explorer\SharedTaskScheduler
HKLM\Software\Wow6432Node\Microsoft\Windows\CurrentVersion\Explorer\ShellExecuteHooks
HKLM\Software\Wow6432Node\Microsoft\Windows\CurrentVersion\Explorer\ShellIconOverlayIdentifiers
HKLM\Software\Wow6432Node\Microsoft\Windows\CurrentVersion\Explorer\ShellServiceObjects
HKLM\Software\Wow6432Node\Microsoft\Windows\CurrentVersion\ShellServiceObjectDelayLoad
instance of an x64 version of Windows 10.
Per-user ASEPs under HKCU\Software
HKCU\Software\Microsoft\Internet Explorer\Explorer Bars
HKCU\Software\Microsoft\Internet Explorer\Extensions
HKCU\Software\Microsoft\Internet Explorer\UrlSearchHooks
Systemwide ASEPs in the registry
HKLM\Software\Microsoft\Internet Explorer\Explorer Bars
HKLM\Software\Microsoft\Internet Explorer\Extensions
HKLM\Software\Microsoft\Internet Explorer\Toolbar
HKLM\Software\Microsoft\Windows\CurrentVersion\Explorer\Browser Helper Objects
Per-user and systemwide ASEPs in the registry—64-bit only
HKCU\Software\Wow6432Node\Microsoft\Internet Explorer\Explorer Bars
HKCU\Software\Wow6432Node\Microsoft\Internet Explorer\Extensions
HKLM\Software\Wow6432Node\Microsoft\Internet Explorer\Explorer Bars
HKLM\Software\Wow6432Node\Microsoft\Internet Explorer\Extensions
HKLM\Software\Wow6432Node\Microsoft\Internet Explorer\Toolbar
HKLM\Software\Wow6432Node\Microsoft\Windows\CurrentVersion\Explorer\Browser Helper Objects

The following list specifies the registry keys that are shown on the Winlogon tab.
Per-user specification of the screen saver
HKCU\Control Panel\Desktop\Scrnsave.exe
Per-user specification of the screen saver, controlled by Group Policy
HKCU\Software\Policies\Microsoft\Windows\Control Panel\Desktop\Scrnsave.exe
Group Policy Client-Side Extensions (CSEs)
HKLM\Software\Microsoft\Windows NT\CurrentVersion\Winlogon\GPExtensions
HKLM\Software\Wow6432Node\Microsoft\Windows NT\CurrentVersion\Winlogon\GPExtensions
Credential provider ASEPs
HKLM\Software\Microsoft\Windows\CurrentVersion\Authentication\Credential Provider Filters
HKLM\Software\Microsoft\Windows\CurrentVersion\Authentication\Credential Providers
HKLM\Software\Microsoft\Windows\CurrentVersion\Authentication\PLAP Providers
Systemwide identification of a program to verify successful boot
HKLM\System\CurrentControlSet\Control\BootVerificationProgram\ImagePath
ASEP for custom setup and deployment tasks
HKLM\System\Setup\CmdLine

 (This ASEP isn’t truly related to the LSA, except that,
like the LSA, it represents security-related functionality.)
Keys inspected for Authentication Providers
HKLM\System\CurrentControlSet\Control\Lsa\Authentication Packages
HKLM\System\CurrentControlSet\Control\Lsa\Notification Packages
HKLM\System\CurrentControlSet\Control\Lsa\Security Packages
HKLM\System\CurrentControlSet\Control\Lsa\OSConfig\Security Packages
Keys inspected for Registered Cryptographic Providers
HKLM\System\CurrentControlSet\Control\SecurityProviders\SecurityProviders

The Office tab lists add-ins and plug-ins registered to hook into documented interfaces for Access, Excel, Outlook, PowerPoint, and Word. On 64-bit Windows, Office add-ins can be registered to run in 32-bit or 64-bit Office versions. 32-bit add-ins are registered in Wow6432Node subkeys on 64-bit Windows.
Keys inspected under both HKLM and HKCU
\Software\Microsoft\Office\Access\Addins
\Software\Microsoft\Office\Excel\Addins
\Software\Microsoft\Office\Outlook\Addins
\Software\Microsoft\Office\PowerPoint\Addins
\Software\Microsoft\Office\Word\Addins
Keys inspected under both HKLM and HKCU on 64-bit Windows
\Software\Wow6432Node\Microsoft\Office\Access\Addins
\Software\Wow6432Node\Microsoft\Office\Excel\Addins
\Software\Wow6432Node\Microsoft\Office\Outlook\Addins
\Software\Wow6432Node\Microsoft\Office\PowerPoint\Addins
\Software\Wow6432Node\Microsoft\Office\Word\Addins
Registry locations inspected for EXE file hijacks
HKCU\Software\Classes\Exefile\Shell\Open\Command\(Default)
HKCU\Software\Classes\.exe
HKCU\Software\Classes\.cmd
HKLM\Software\Classes\Exefile\Shell\Open\Command\(Default)
HKLM\Software\Classes\.exe
HKLM\Software\Classes\.cmd
Registry locations inspected for htmlfile hijacks
HKCU\Software\Classes\Htmlfile\Shell\Open\Command\(Default)
HKLM\Software\Classes\Htmlfile\Shell\Open\Command\(Default)
Command processor autorun keys
HKCU\Software\Microsoft\Command Processor\Autorun
HKLM\Software\Microsoft\Command Processor\Autorun
HKLM\Software\Wow6432Node\Microsoft\Command Processor\Autorun
Keys inspected for Image File Execution Options hijacks
HKLM\Software\Microsoft\Windows NT\CurrentVersion\Image File Execution Options
HKLM\Software\Wow6432Node\Microsoft\Windows NT\CurrentVersion\Image File Execution Options

%SystemDrive%/hiberfil.sys
hiberfil.sys, better known as the Windows hibernation file contains a compressed memory image from the previous boot. Microsoft Windows systems use this in order to provide faster boot-up times, however, we can use this file in our case for some memory forensics

On Windows, the password hash is normally stored in the SAM file at %SystemRoot%\System32\config.  C:\Windows\System32\config

The web directories sit at C:\xampp\htdocs, which is common for an XAMPP deployment on Windows.
There is an inetpub directory at the root of C:\. That’s the directory IIS typically runs from

powershell -ep bypass -> load a powershell shell with execution policy bypassed

DLLs are shared system libraries utilized in system processes. These are commonly subjected to hijacking and other side-loading attacks, making them a key target for forensics.

The file system used in modern versions of Windows is the New Technology File System or simply NTFS. Before NTFS, there was FAT16/FAT32 (File Allocation Table) and HPFS (High Performance File System). 
NTFS is known as a journaling file system. In case of a failure, the file system can automatically repair the folders/files on disk using information stored in a log file. This function is not possible with FAT. 

"Trusted Platform Module (TPM) technology is designed to provide hardware-based, security-related functions. A TPM chip is a secure crypto-processor that is designed to carry out cryptographic operations. The chip includes multiple physical security mechanisms to make it tamper-resistant, and malicious software is unable to tamper with the security functions of the TPM".

BitLocker Drive Encryption is a data protection feature that integrates with the operating system and addresses the threats of data theft or exposure from lost, stolen, or inappropriately decommissioned computers".

On devices with TPM installed, BitLocker offers the best protection.

Per Microsoft, "BitLocker provides the most protection when used with a Trusted Platform Module (TPM) version 1.2 or later. The TPM is a hardware component installed in many newer computers by the computer manufacturers. It works with BitLocker to help protect user data and to ensure that a computer has not been tampered with while the system was offline"

### Alternate Data Streams (ADS)

Alternate Data Streams (ADS) is a file attribute specific to Windows NTFS (New Technology File System).
Every file has at least one data stream ($DATA), and ADS allows files to contain more than one stream of data. Natively Window Explorer doesn't display ADS to the user. There are 3rd party executables that can be used to view this data, but Powershell gives you the ability to view ADS for files.
In this system a file is built up from a couple of attributes, one of them is $Data, aka the data attribute. Looking at the regular data stream of a text file there is no mystery. It simply contains the text inside the text file. But that is only the primary data stream which is sometimes referred to as the unnamed data stream since the name string of this attribute is empty ( “” ) . So any data stream that has a name is considered alternate.

Syntax for using powershell to read ADS streams >>
Get-Item -path {path to file} -stream {name of stream}
Syntax for using powershell to add streams to a file >>
Set-Item -path {path to file} -stream {name of stream}
Syntax for using powershell to remove ADS from a file >>
Remove-Item -path {path to file} -stream {name of stream}

If you want to search a directory or drive for ADS you can use this command in the root of the target:
gci -recurse | % { gi $_.FullName -stream * } | where stream -ne ':$Data'

Local User and Group Management >> Right-click on the Start Menu and click Run. Type lusrmgr.msc
User Account Control (UAC) is a fundamental component of Microsoft's overall security vision. UAC helps mitigate the impact of malware.

### System Configuration (MSConfig)

The System Configuration utility/panel (MSConfig) is for advanced troubleshooting, and its main purpose is to help diagnose startup issues.  https://docs.microsoft.com/en-us/troubleshoot/windows-client/performance/system-configuration-utility-troubleshoot-configuration-errors
The normal startup option is the Windows default. This option enables Windows to start in normal mode together with all programs, services, and device drivers loaded.
The diagnostic startup option enables Windows to determine which basic device drivers and software to load when you start Windows. When you use this option, the system temporarily disables some Microsoft services.
The selective startup option enables you to select the programs and services that you want the computer to load when you restart the computer. You can select from the following options:
Load system services, Load startup items, Use original boot configuration
Below are tools available through the System Configuration 

The Computer Management (compmgmt) utility has three primary sections: System Tools, Storage, and Services and Applications.

WMI Control configures and controls the Windows Management Instrumentation (WMI) service.
"WMI allows scripting languages (such as VBScript or Windows PowerShell) to manage Microsoft Windows personal computers and servers, both locally and remotely. Microsoft also provides a command-line interface to WMI called Windows Management Instrumentation Command-line (WMIC)."
Note: The WMIC tool is deprecated in Windows 10, version 21H1. Windows PowerShell supersedes this tool for WMI. 

System Information (msinfo32) tool "Windows includes a tool called Microsoft System Information (Msinfo32.exe).  This tool gathers information about your computer and displays a comprehensive view of your hardware, system components, and software environment, which you can use to diagnose computer issues."

Environment variables store information about the operating system environment. This information includes details such as the operating system path, the number of processors used by the operating system, and the location of temporary folders.
The environment variables store data that is used by the operating system and other programs. For example, the WINDIR environment variable contains the location of the Windows installation directory. Programs can query the value of this variable to determine where Windows operating system files are located"

Resource Monitor (resmon) "Resource Monitor displays per-process and aggregate CPU, memory, disk, and network usage information, in addition to providing details about which processes are using individual file handles and modules. Advanced filtering allows users to isolate the data related to one or more processes (either applications or services), start, stop, pause, and resume services, and close unresponsive applications from the user interface. It also includes a process analysis feature that can help identify deadlocked processes and file locking conflicts so that the user can attempt to resolve the conflict instead of closing an application and potentially losing data."

Windows Command Prompt (cmd.exe)
Unlike Unix Based Systems, the man page for Windows CMD commands can be accessed using {cmd} /? Or {cmd} help
An A-Z Index of Windows CMD commands https://ss64.com/nt/

The Windows Registry (regedit) or reg /? at the Command Prompt more at >> https://docs.microsoft.com/en-us/troubleshoot/windows-server/performance/windows-registry-advanced-users
is a central hierarchical database used to store information necessary to configure the system for one or more users, applications, and hardware devices.
The registry contains information that Windows continually references during operation, such as:
Profiles for each user, Applications installed on the computer and the types of documents that each can create, Property sheet settings for folders and application icons, What hardware exists on the system, The ports that are being used.
There are various ways to view/edit the registry. One way is to use the Registry Editor (regedit). A registry hive is a group of keys, subkeys, and values in the registry that has a set of supporting files that contain backups of its data. 

https://microsoft.fandom.com/wiki/Windows_Registry

List of Main Windows Registry Hives and Their Abbreviations:
HKLM - HKEY_LOCAL_MACHINE
Stores settings that are specific to the local computer. This hive contains information about the hardware, software, and preferences on the system. It affects all users on the computer.
HKCU - HKEY_CURRENT_USER
Contains configuration information for Windows and software settings specific to the currently logged-in user. Each user on the system has their own HKCU hive.
HKCR - HKEY_CLASSES_ROOT
A subset of HKLM\Software and HKCU\Software combined. It includes information about registered applications, such as file associations and OLE Object Class IDs. This helps Windows determine which programs to run when a specific type of file is accessed.
HKU - HKEY_USERS
Contains all the user profiles loaded on the machine. HKCU is actually a subkey of HKU, representing the current user profile in use.
HKCC - HKEY_CURRENT_CONFIG
Contains information gathered at runtime; data stored here is not permanently stored on disk, but rather generated at boot time. It relates to the configuration of the PC's hardware.



# Unix Fundamentals

## Command Line Interface (CLI)

A command line interface (CLI) is a command screen or text interface called a shell that allows users to interact with a program. A useful tool for understanding commands is [explainshell.com](https://explainshell.com/).

On BSD-based Unix systems, you may encounter different types of terminals:

-   **Real TTY (`/dev/ttyX`)**: An actual virtual keyboard/screen pair.
-   **PTY (`/dev/pts/X`)**: A software-made fake TTY that pretends to be a keyboard/screen.
-   **tmux**: Multiplexes shells inside your session without creating new keyboards, running within a TTY or PTY.

## Fixing GPG Key Errors

If you encounter an error indicating that a GPG key has expired or is invalid, you may need to update the key for the repository.

1.  **Download the updated key**:
    ```bash
    wget -q -O - https://archive.kali.org/archive-key.asc | sudo apt-key add -
    ```

2.  **Update and upgrade again**:
    ```bash
    sudo apt update
    sudo apt full-upgrade -y
    ```

## Executable Python Scripts

Python scripts can be made directly executable, similar to shell scripts.

To do this, add a "shebang" line at the very beginning of the script and give the file executable permissions. The `#!` must be the first two characters of the file.

```bash
#!/usr/bin/env python3
```

This line tells the system to use the `python3` interpreter, assuming it is in the user's `PATH`. On some platforms, this first line must end with a Unix-style line ending (`\n`), not a Windows (`\r\n`) line ending. The hash character (`#`) is used to start a comment in Python.

Give the script executable permissions using the `chmod` command:

```bash
chmod +x myscript.py
```

On Windows, there is no "executable mode." The Python installer automatically associates `.py` files with `python.exe`, so double-clicking a file will run it as a script. If the extension is `.pyw`, the console window that normally appears is suppressed.

## Listing Sudo Permissions

You can list the allowed (and forbidden) commands for a user.

```bash
sudo -l
```

If no command is specified, the `-l` (list) option will list the allowed commands for the invoking user on the current host. If a command is specified and permitted, the fully-qualified path to the command is displayed along with any command line arguments. If a command is specified but not allowed, `sudo` will exit with a status value of 1. If the `-l` option is specified with an `l` argument (`-ll`), or if `-l` is specified multiple times, a longer list format is used.

## Shebang

A shebang (`#!`) is a character sequence at the beginning of a script that specifies the path to the interpreter for executing it. It does not signify a binary file. For example: `#!/bin/sh`, `#!/bin/zsh`, or `#!/bin/bash`.

## Bash Scripting

Bash is a scripting language that runs within the terminal on most Linux distros, as well as macOS. Shell scripts are a sequence of Bash commands within a file, combined to achieve more complex tasks than simple one-liners. They are especially useful for automating system administration tasks such as backups.

### Bash Variables

> Please note that for variables to work, you cannot leave a space between the variable name, the `=` sign, and the value. Variable names also cannot have spaces. You must add a `$` to the front of a variable name to use it, similar to JavaScript template literals `${variableName}` but without the curly braces.

### Debugging Bash Scripts

Debugging is an important part of programming. Bash has built-in features to simplify this process. To debug the syntax of a script, you can run it with `bash -x`:

```bash
bash -x ./fileName.sh
```

This command outputs each command before it is executed, prefixed with a `+` sign, followed by the command's output. This makes it easy to spot where you have gone wrong. You can also debug a specific section of a script by inserting `set -x` before the section and `set +x` after it.

---

## Interacting with Amazon S3

The following is a process for interacting with an Amazon S3 bucket using the AWS CLI, uploading a PHP shell to execute remote commands, and setting up a reverse shell. The files stored in an S3 bucket are called S3 objects.

You can interact with an S3 bucket using the `awscli` utility. It can be installed and configured on Linux using the following command:

```bash
apt install awscli && aws configure
```

### S3 Commands

-   **Listing S3 Buckets:**
    ```bash
    aws --endpoint=http://s3.Server.AWS s3 ls
    ```
    This lists all S3 buckets available at the specified endpoint.

-   **Listing Objects in a Bucket:**
    ```bash
    aws --endpoint=http://s3.Server.AWS s3 ls s3://Server.AWS
    ```

## Security Concepts

### Unrestricted File Upload Vulnerabilities

Unrestricted file upload vulnerabilities occur when a web server allows users to upload files without sufficient validation. If an attacker can upload an executable script (like a `.php` file) and then browse to it, the server may execute that script.

-   **Risk**: Remote Code Execution (RCE).
-   **Mitigation**:
    -   Validate file types and extensions (allowlisting).
    -   Store uploaded files outside the web root.
    -   Rename uploaded files to randomized identifiers.
    -   Disable script execution in upload directories.

### Reverse vs. Bind Shells

-   **Bind Shell**: The attacker connects *to* the target (Target listens on a port). This is often blocked by firewalls (ingress filtering).
-   **Reverse Shell**: The target connects *back* to the attacker (Attacker listens). This often bypasses firewalls because outbound traffic (egress) is frequently less restricted than inbound.

### Defensive Monitoring

System administrators should monitor for:

-   Unusual outbound connections (e.g., servers connecting to external IPs on arbitrary ports).
-   Processes spawned by web server users (e.g., `www-data` spawning `bash` or `sh`).
-   Unexpected open ports or listening services (checking with `netstat` or `ss`).

## Common Commands

### Netcat (nc)

Netcat is a networking utility for reading from and writing to network connections using TCP or UDP. It is often used for debugging network issues.

-   **Listen Mode**: `nc -lvnp [port]`
    -   `-l`: Listen
    -   `-v`: Verbose
    -   `-n`: No DNS lookup (IPs only)
    -   `-p`: Port

### grep

The `grep` command searches for patterns in text.

#### Recursive Search

This command searches for the pattern "passw" in all files and directories recursively, starting from the current directory.

```bash
grep -ri 'passw' *
```

-   `-r`: Recursively searches subdirectories.
-   `-i`: Ignores case (case-insensitive search).

#### Piped Search

This command concatenates all files in the current directory into a single stream and then searches that stream for the pattern "passw".

```bash
cat * | grep -i passw*
```

The `grep -ri 'passw' *` command is generally more efficient and reliable for searching through files and directories, as it inherently handles directories and binary files without issue. In contrast, `cat * | grep ...` can generate errors if `cat` tries to read directories or non-text files.

### find

The `find` command is useful for searching the target system for important information.

#### Basic Usage

-   `find . -name flag1.txt`: Find the file named `flag1.txt` in the current directory.
-   `find /home -name flag1.txt`: Find the file named `flag1.txt` in the `/home` directory.
-   `find / -type d -name config`: Find the directory named `config` under `/`.
-   `find /home -user frank`: Find all files for user `frank` under `/home`.

#### Searching by Permissions

-   `find / -type f -perm 0777`: Find files with `777` permissions.
-   `find / -perm a=x`: Find executable files.

#### Searching by Time

-   `find / -mtime 10`: Find files that were modified in the last 10 days.
-   `find / -atime 10`: Find files that were accessed in the last 10 days.
-   `find / -cmin -60`: Find files changed within the last hour (60 minutes).
-   `find / -amin -60`: Find files accessed within the last hour (60 minutes).

#### Searching by Size

-   `find / -size 50M`: Find files with a 50MB size. This can also be used with `+` (larger than) and `-` (smaller than).

#### Suppressing Errors

The `find` command can generate errors that make the output hard to read. You can redirect errors to `/dev/null` for a cleaner output.

-   For files: `find . -type f -name "search" 2>/dev/null`
-   For directories: `find . -type d -name "search" 2>/dev/null`

#### Finding Writable/Executable Locations

-   `find / -writable -type d 2>/dev/null`: Find world-writable folders.
-   `find / -perm -222 -type d 2>/dev/null`: Find world-writable folders.
-   `find / -perm -o w -type d 2>/dev/null`: Find world-writable folders.
-   `find / -perm -o x -type d 2>/dev/null`: Find world-executable folders.
-   `find / -perm -o r -type d 2>/dev/null`: Find world-readable folders.

#### SUID Files

Commonly noted as SUID (Set owner User ID), this special permission allows a file to execute as the user who owns it, regardless of the user running the command. This can be used to escalate privileges.

-   `find / -perm -u=s -type f 2>/dev/null`: Find files with the SUID bit set.

#### File Types

The `-type` flag filters by file type:

-   `b`: block special
-   `c`: character special
-   `d`: directory
-   `f`: regular file
-   `l`: symbolic link
-   `p`: FIFO
-   `s`: socket

### strings

The `strings` command makes it possible to view the human-readable characters within any file. Its main purpose is to help determine the file type, but it can also be used to extract text.

### chmod

The `chmod` (change file mode) utility modifies the file mode bits (permissions) of files and directories. It can also be used to modify Access Control Lists (ACLs).

Permissions are grouped into user, group, and other.

-   `r`: readable
-   `w`: writable
-   `x`: executable
-   `-`: empty permission
-   `d`: directory

Permissions can also be represented numerically:

-   `4`: read
-   `2`: write
-   `1`: execute

### chown

The `chown` (change owner) utility modifies the user and/or group ownership of a file.

### whatis

Displays one-line manual page descriptions.

### apropos

Searches the manual page names and descriptions.

### man

Formats and displays the on-line reference manual pages.

### which

Locates a command.

### pushd / popd

Puts the current working directory onto a stack and allows you to return to it later.

### updatedb

Updates the database used by the `locate` command.

### nano

A command-line text editor that can interpret and compile many programming languages. It takes an optional filename argument.

### file

A standard program for recognizing the type of data contained in a computer file.

### readlink

Displays the value of a symbolic link.

### stat

Displays information about a file, such as size, permissions, and modification times. Read, write, or execute permissions are not required, but all directories in the path must be searchable.

### wget

Allows you to download files from the web via HTTP. You provide the address of the resource you wish to download.

### ps

The `ps` utility displays information about running processes.

```bash
ps -ax | grep <application_name>
```

This command reveals the processes associated with a running application.

### ping

The `ping` command is used to test whether a connection to a remote resource is possible by sending ICMP ECHO_REQUEST packets. It can also be used to determine the IP address of a server. Packets are transmitted via ICMP (type 8 for request, type 0 for response). Pinging `localhost` or `127.0.0.1` can help diagnose network card failures, while pinging a domain name can help resolve DNS issues.

### netstat

Resolves and displays network statistics such as current network connections and port activities.

-   `netstat -a`: Shows all listening ports and established connections.
-   `netstat -at` or `netstat -au`: Lists TCP or UDP protocols respectively.
-   `netstat -l`: Lists ports in "listening" mode.
-   `netstat -s`: Lists network usage statistics by protocol.
-   `netstat -tp`: Lists connections with the service name and PID information.
-   `netstat -i`: Shows interface statistics.
-   `netstat -ano`: A common usage that displays all sockets, does not resolve names, and displays timers.

## Networking

### Network Configuration

Commands used to view and manage network interface information.

-   `ipconfig` (Windows)
-   `ifconfig` (older Linux/macOS)
-   `ip a` / `ip addr` (modern Linux)
-   `arp -a` (displays the ARP table)

### Time-to-Live (TTL)

Time-to-live (TTL) is a value for the period of time that a packet should exist on a network before being discarded. It is a counter or timestamp embedded in each packet. When the predefined timespan or event count expires, the packet is either discarded or revalidated. In networking, TTL prevents data packets from circulating indefinitely and helps determine how long a packet has been in circulation.

### tcpdump

You can start a `tcpdump` listener to capture packets. The following command listens for ICMP traffic, which is used by `ping`.

```bash
sudo tcpdump ip proto \\icmp -i <interfaceName>
```

### traceroute

The `traceroute` command resolves the route that data packets take from a local network to an internet destination, providing more information than `ping`. It works by sending packets with a low TTL to elicit ICMP `Time Exceeded` messages from intermediate hops.

-   **Linux**: `traceroute <destination>` (operates over UDP by default)
-   **Windows**: `tracert <destination>` (operates over ICMP by default)

### whois

The `whois` utility looks up registration records for domain names and IP addresses from databases maintained by Network Information Centers (NICs).

> **Note**: You may need to install `whois` before using it. On Debian-based systems, this can be done with `sudo apt update && sudo apt-get install whois`.

### nslookup

`nslookup` (Name Server Look Up) finds the IP address of a domain name.

The syntax is `nslookup [-type=RECORD] [DOMAIN_NAME] [SERVER]`.

-   `type`: The record type to query (e.g., `A` for IPv4, `AAAA` for IPv6).
-   `DOMAIN_NAME`: The domain to look up.
-   `SERVER`: The DNS server to query (e.g., Cloudflare `1.1.1.1`, Google `8.8.8.8`, Quad9 `9.9.9.9`).

### dig

`dig` (Domain Information Groper) is a flexible tool for interrogating DNS name servers. It's useful for viewing the TTL (Time To Live) of a DNS record, which indicates how long the record should be cached.

The syntax is `dig @server name type`.

-   `@server`: The name or IP address of the name server to query.
-   `name`: The name of the resource record to look up.
-   `type`: The type of query (e.g., `ANY`, `A`, `MX`, `SIG`). If omitted, `dig` performs a lookup for an `A` record.

### host

The `host` utility is a simple tool for performing DNS lookups, converting names to IP addresses and vice versa.

The syntax is `host {name} [server]`.

-   `name`: The domain name or IP address to look up.
-   `server`: (Optional) The name or IP address of a specific name server to query instead of the system default.

## File Permissions

The process of converting source code into an executable involves compilers (like GNU) turning text-based scripts into binary scripts.

### chmod

The `chmod` command changes file modes or permissions.

-   **Syntax**: `chmod +perm fileName` or `chmod -perm fileName`
-   `+` adds a permission, `-` removes it.
-   Permissions can be `r` (read), `w` (write), and `x` (execute).

### chown

The `chown` command changes the user and/or group ownership of a file.

## Process Management

### Daemons and Namespaces

A system daemon like `systemd` (or `launchd` on macOS) is one of the first processes started at boot. Other programs are started as child processes of the daemon. The OS uses namespaces to isolate processes from each other, splitting up system resources like CPU and RAM for security.

### systemctl

The `systemctl` command allows you to interact with the `systemd` process. The equivalent on macOS is `launchctl`.

-   **Syntax**: `systemctl [option] [service]`
-   **Options**: `start`, `stop`, `enable` (start at boot), `disable`.

### ps

The `ps` utility displays information about your active processes. Processes are the programs running on your machine, managed by the kernel. Each process has a Process ID (PID).

### top

The `top` command provides a real-time, sorted list of system processes and their statistics, which refreshes automatically.

## Privilege Escalation

### LXD

LXD is a management API for LXC containers. A user in the local `lxd` group can instantly escalate their privileges to root on the host OS, regardless of `sudo` rights. This vulnerability can be exploited by using a custom image to mount the host's root filesystem. The exploit involves building a custom Alpine image, transferring it to the target, and using it to spawn a privileged container.

For more details, see:

-   [HackTricks: LXD Privilege Escalation](https://book.hacktricks.wiki/en/linux-hardening/privilege-escalation/interesting-groups-linux-pe/lxd-privilege-escalation.html#lxdlxc-group---privilege-escalation)
-   [Hacking-Articles: LXD Privilege Escalation](https://www.hackingarticles.in/lxd-privilege-escalation/)

The simplified steps are:

1.  **On the attacker machine:**
    -   Download a pre-built Alpine image from the official LXC repository.
2.  **On the host machine:**
    -   Import the downloaded image for LXD.
    -   Initialize the image inside a new container.
    -   Mount the host filesystem inside the container (e.g., at `/mnt/root`).

## Shell Operators and Redirection

### Job Control

-   **`&`**: The ampersand operator allows you to run a command in the background of your terminal. You can also use `Ctrl + Z` to send a running process to the background.
-   **`fg`**: The foreground command brings a backgrounded process back to the foreground.

### Shell Operators

-   **`&&`**: Combines multiple commands, executing the next command only if the previous one succeeds.
-   **`>`**: Redirects the output of a command to a file, overwriting the file's contents.
-   **`>>`**: Appends the output of a command to a file.
-   **`;`**: Separates commands to be run in sequence, regardless of whether the previous command succeeds or fails.
-   **`|` (pipe)**: Allows separate processes to communicate. The output of the command on the left is used as the input for the command on the right.
    -   An **unnamed pipe** exists only within the kernel and cannot be accessed by the processes that created it.
    -   A **named pipe** (FIFO) is a file on the filesystem that allows processes to communicate. FIFO stands for "First In, First Out," meaning the order of bytes is preserved.

### I/O Redirection

Redirection operators are used to control where a command's output is sent (stdout and stderr) and where it gets its input from (stdin).

#### Standard File Descriptors

-   **`0`**: `stdin` (standard input)
-   **`1`**: `stdout` (standard output)
-   **`2`**: `stderr` (standard error)

#### Redirection Operators

The `n>&m` syntax redirects file descriptor `n` to the same location as file descriptor `m`. If `n` is omitted, it defaults to `1` (stdout).

-   `>&`: Redirects both `stdout` and `stderr` to a file.
-   `>&2`: Redirects `stdout` to `stderr`.
-   `2>&1`: Redirects `stderr` to wherever `stdout` is currently going.
-   `2>`: Redirects `stderr` to a file.
-   `&>`: Redirects both `stdout` and `stderr` to a file (a common shorthand).
-   `0>&1`: Redirects `stdin` to wherever `stdout` is currently directed.
-   `<>`: Opens a file for both reading and writing on `stdin`.

## System Administration

### Automated Job Execution (Cron)

`crontab` is used to schedule and manage cron jobs (automated tasks). A crontab is a special file with formatting that the `cron` process recognizes to execute each line.

| Value | Description           |
| :---- | :-------------------- |
| MIN   | Minute (0-59)         |
| HOUR  | Hour (0-23)           |
| DOM   | Day of the month (1-31) |
| MON   | Month (1-12)          |
| DOW   | Day of the week (0-6) |
| CMD   | Command to be executed|

The crontab file is structured as follows:

```bash
# ┌───────────── minute (0 - 59)
# │ ┌───────────── hour (0 - 23)
# │ │ ┌───────────── day of the month (1 - 31)
# │ │ │ ┌───────────── month (1 - 12)
# │ │ │ │ ┌───────────── day of the week (0 - 6) (Sunday to Saturday)
# │ │ │ │ │
# * * * * * <command to execute>

# Use @reboot to run a command once at boot.
@reboot /path/to/script.sh
```

You can edit the crontab file with `crontab -e`.

#### Cron Permissions

-   `/etc/cron.allow`: If this file exists, a user must be listed in it to use cron jobs.
-   `/etc/cron.deny`: If `cron.allow` does not exist, a user must *not* be listed in this file to use cron jobs.

### Linux Filesystem Hierarchy

-   `/`: The root directory of the entire file system hierarchy.
-   `/bin`: Essential command binaries for all users.
-   `/sbin`: System binaries, typically used by the system administrator.
-   `/boot`: Contains all files needed for the OS to boot.
-   `/dev`: Device files, including terminals and hardware.
-   `/etc`: Host-specific, system-wide configuration files. The `/etc/hosts` file is used to resolve a hostname to an IP address before querying DNS. You can add an entry like this:
    ```bash
    sudo echo "IP_ADDRESS FQDN" | sudo tee -a /etc/hosts
    ```
-   `/home`: Users' home directories.
-   `/lib`: System libraries required by binaries in `/bin` and `/sbin`.
-   `/media` & `/mnt`: Mount points for removable media and temporary filesystems.
-   `/opt`: Optional application software packages.
-   `/proc`: A virtual filesystem providing process and kernel information as files.
-   `/root`: The home directory for the root user.
-   `/run`: A temporary filesystem that stores volatile runtime data.
-   `/srv`: Site-specific data served by the system (e.g., for web or FTP servers).
-   `/sys`: A virtual filesystem for interacting with the kernel.
-   `/tmp`: Temporary files that are often not preserved between reboots.
-   `/usr`: User utilities and applications.
-   `/var`: Variable data, such as logs (`/var/log`), that changes as the system runs.
-   `.conf` or `.config`: Files that often contain application configurations and sensitive information.

### User and Password Files

#### /etc/passwd

The `/etc/passwd` file stores essential user account information required during login. It is a plain text file that contains a list of the system’s accounts. It should have general read permission, but write access must be limited to the root account.

#### /etc/passwd format

The file contains one entry per line for each user, with seven fields separated by a colon (`:`):
`TestUser:x:0:0:root:/root:/bin/bash`

-   **Username**: The login name (1-32 characters).
-   **Password**: `x` indicates the encrypted password is stored in `/etc/shadow`.
-   **User ID (UID)**: A unique ID for each user. UID `0` is for root.
-   **Group ID (GID)**: The primary group ID for the user.
-   **User ID Info**: A comment field for extra information (e.g., full name).
-   **Home directory**: The absolute path to the user's home directory upon login.
-   **Command/shell**: The absolute path to the user's default shell (e.g., `/bin/bash`).

### PATH Environment Variable

`PATH` is an environmental variable that specifies the directories containing executable programs. When a user runs a command, the shell searches these directories to find the corresponding executable.

To view the current `PATH`:

```bash
echo $PATH
```

To add a directory (like `/bin` or the current directory `.`) to the `PATH`:

```bash
export PATH=/bin:$PATH
export PATH=.:$PATH
```

### GTFOBins

GTFOBins is a curated list of Unix binaries that can be used to bypass local security restrictions in misconfigured systems. The project collects legitimate functions of Unix binaries that can be abused for tasks like breaking out of restricted shells, escalating privileges, transferring files, and spawning shells.

### Landscape Server

A Landscape Server is a systems management tool by Canonical for managing fleets of Ubuntu computers from a centralized web interface or API.

-   **Core Functionality**: Centralized management, inventory tracking, software and patch management, monitoring, automation, user management, compliance, and reporting.
-   **Key Features**: Web UI, REST API, scalability, custom dashboards, alerting, and Role-Based Access Control (RBAC).
-   **Deployment**: Can be self-hosted or managed by Canonical.

### Kali Undercover Mode

To prevent unnecessary attention in public, Kali Undercover mode changes the look and feel of your Kali desktop to resemble Windows 10.

```bash
kali-undercover
```

## Package Management

The `apt` command is part of the APT suite of tools for managing software packages and sources.

-   `apt update`: Fetches the latest information about available packages.
-   `apt-get upgrade`: Upgrades installed packages.
-   `apt-get dist-upgrade` or `apt full-upgrade`: Upgrades the core operating system as well as packages.
-   `apt-get clean`: Cleans the local repository of retrieved package files.
-   `apt-get install -f`: Fixes broken dependencies.
-   `dpkg --configure -a`: Configures all unpackaged packages.
-   `dpkg -i <software.deb>`: Installs a Debian package.
-   `git clone <url>`: Clones a repository from a version control system like GitHub.

## Python Tools

### bpython

A fancy interface for the Python interpreter with features like in-line syntax highlighting, autocomplete, and auto-indentation.

### Simple HTTP Server

Python provides a simple `http.server` module that turns your computer into a web server to serve files from the directory you run it in.

```bash
python3 -m http.server
```

## Security and Encryption

### OpenSSL

OpenSSL is a cryptography toolkit for SSL/TLS. It can be used for creating keys, certificates, digests, and for encryption/decryption.

### scp

`scp` (secure copy) allows you to securely transfer files between two computers using the SSH protocol for authentication and encryption.

### sftp

`sftp` is a file transfer client with an FTP-like command interface that also uses SSH.

### sshd

`sshd` is the SSH daemon that runs on the server, listening for client connections.

-   **Linux**: `service ssh start`, `service ssh stop`, `service ssh restart`
-   **macOS**: `sudo launchctl load -w /System/Library/LaunchDaemons/ssh.plist`
-   **Windows**: `Start-Service sshd`

## Firmware

### Legacy BIOS vs. UEFI

-   **Legacy BIOS**: A 16-bit firmware that uses a Master Boot Record (MBR), limiting disk sizes to 2TB. It has a text-only interface.
-   **UEFI**: A modern 32-bit or 64-bit firmware that uses a GUID Partition Table (GPT), supporting much larger disks. It features a graphical interface and security features like Secure Boot.

### Redirection Output Table

| Syntax      | Visible in Terminal (stdout/stderr) | Visible in File (stdout/stderr) | Existing File |
| :---------- | :---------------------------------- | :------------------------------ | :------------ |
| `>`         | no / yes                            | yes / no                        | overwrite     |
| `>>`        | no / yes                            | yes / no                        | append        |
| `2>`        | yes / no                            | no / yes                        | overwrite     |
| `2>>`       | yes / no                            | no / yes                        | append        |
| `&>`        | no / no                             | yes / yes                       | overwrite     |
| `&>>`       | no / no                             | yes / yes                       | append        |
| `| tee`     | yes / yes                           | yes / no                        | overwrite     |
| `| tee -a`  | yes / yes                           | yes / no                        | append        |
| `|& tee`    | yes / yes                           | yes / yes                       | overwrite     |
| `|& tee -a` | yes / yes                           | yes / yes                       | append        |

## Other Topics

### QEMU

QEMU is an emulator and virtualizer. For example, it can be used to virtualize Windows on an M1 Mac. See [this MacRumors thread](https://forums.macrumors.com/threads/success-virtualize-windows-10-for-arm-on-m1-with-alexander-grafs-qemu-hypervisor-patch.2272354/) for details.

### Network Controllers

Network Controllers provide a centralized GUI to monitor and configure multiple network devices. However, they can be vulnerable to attacks like MAC address spoofing, which can poison switch forwarding tables or ARP tables.

### Scapy for ARP Poisoning

Scapy is a powerful packet manipulation tool. In the context of ARP poisoning:

-   `hwsrc`: Sender hardware address (SHA)
-   `psrc`: Sender protocol address (SPA)
-   `hwdst`: Target hardware address (THA)
-   `pdst`: Target protocol address (TPA)

Broadcasting to `FF:FF:FF:FF:FF:FF` delivers a packet to all stations on the local network.

### Scapy Commands

```
sr               : Send and receive packets at layer 3
sr1              : Send packets at layer 3 and return only the first answer
srp              : Send and receive packets at layer 2
srp1             : Send and receive packets at layer 2 and return only the first answer
arpcachepoison   : Poison target's cache with (your MAC,victim's IP) couple
```

### NetfilterQueue

To use `netfilterqueue` with Python, you need to install it:

```bash
apt-get install build-essential python-dev libnetfilter-queue-dev
pip3 install -U git+https://github.com/kti/python-netfilterqueue
```

To send packets to the queue, use `iptables`:

```bash
iptables -I INPUT -d 192.168.0.0/24 -j NFQUEUE --queue-num 1
```

### Chisel

Chisel is a fast TCP/UDP tunnel, transported over HTTP, secured via SSH.

-   **Server**:
    ```bash
    chisel server -p 8000 --reverse
    ```
-   **Client**:
    ```bash
    ./chisel client 10.10.14.55:8000 R:8001:127.0.0.1:8000
    ```

## Mobile Security Tools

1.  **Needle**
    -   **Use**: iOS app security testing on jailbroken devices.
    -   **Features**: Checks for insecure data storage, weak encryption, and reverse engineering risks.
2.  **APKX**
    -   **Use**: Android APK decompilation.
    -   **Features**: Decompiles APKs into readable source code (Java or Smali) for analysis.
3.  **Drozer**
    -   **Use**: Android app vulnerability assessment.
    -   **Features**: Interacts with app internals to find and exploit exposed components.