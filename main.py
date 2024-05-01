import typer
import platform

from utilities.command_with_bye import CommandWithBye


app = typer.Typer()

@app.command()
def hello(name: str):
    print(f"Hello {name}")

@app.command()
def show_wd(model:str ="llama3"):

    commandWithBye = CommandWithBye()

    commandWithBye.exect(modelName=model)


@app.command()
def goodbye(name: str, formal: bool = False):
    if formal:
        print(f"Goodbye Ms. {name}. Have a good day.")
    else:
        print(f"Bye {name}!")


if __name__ == "__main__":
    app()