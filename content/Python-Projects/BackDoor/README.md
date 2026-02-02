# BackDoor

## Overview
This folder contains a minimal TCP client/server pair used to demonstrate a basic command channel.

## How It Works
- **backdoor_connect.py** creates a TCP connection to a configured host/port, waits for command bytes, executes them with `subprocess.check_output`, and sends the command output back over the socket.
- **listener.py** binds a TCP socket, accepts an incoming connection, and sends commands entered at the prompt, printing the results returned by the client.

## Files
- **backdoor_connect.py** — TCP client that receives commands, executes them locally, and returns output.
- **listener.py** — TCP listener that accepts a connection and sends commands.

## Notes
- The listener uses placeholder values (`attackerIP`, `attackerPort`) and `raw_input`, which is Python 2–style input.
- Use only in authorized, controlled environments for learning or testing.
