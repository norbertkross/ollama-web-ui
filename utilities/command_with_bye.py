import subprocess
import shlex
import platform

from save_to_files.save_to_json import SaveToJson
from utilities.open_default_browser import OpenBrowser



class CommandWithBye:
    def __init__(self):
        pass

    def exect(self,modelName):



        cmd = f"ollama run {modelName}"
        # Install Ollama3
        self.run_command_with_bye(command=cmd,input_text="/bye")

    def run_command_with_bye(self,command, input_text):
        """
        Run a command and provide input text followed by an Enter key press.

        Args:
            command (str): The command to execute.
            input_text (str): The text to input.
        """
        # Open a subprocess and create a pipe to communicate with it
        proc = subprocess.Popen(shlex.split(command), stdin=subprocess.PIPE)

        # Send input text followed by an Enter key press
        proc.communicate(input_text.encode() + b"\n")

        system_name = platform.system()

        if system_name == "Linux":
            print("Running on Linux")
        elif system_name == "Darwin":
            print("Running on macOS")
        else:
            print("Running on an unknown operating system")

        saveToJson = SaveToJson()
        openBrowser = OpenBrowser()

        commands = [
            # f"ollama run {model}",
            "ls -a",
            "pwd",
            "cd .. && pwd",  # Combining commands using '&&'
            # "python3 -m SimpleHTTPServer 9000",
            "python3 -m http.server 9000"
        ]

        openBrowser.open_browser("http://www.localhost:9000")

        for command in commands:
            try:
                subprocess.run(command, shell=True, check=True)  # Execute command
            except subprocess.CalledProcessError:  # Catch error if command fails
                print(f"Command '{command}' failed. Exiting.")
                break  # Exit loop if a command fails
        else:
            print("All commands executed successfully.")

        print("Listed directory")


    # Example usage:
    # command = "python my_script.py"  # Example command that requires user input
    # input_text = "/bye"  # Text to input
    #
    # run_command_with_input(command, input_text)
