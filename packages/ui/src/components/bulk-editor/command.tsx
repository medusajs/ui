interface Command {
  execute(): void
  undo(): void
  redo(): void
}

class EditCommand implements Command {
  execute(): void {}

  undo(): void {}

  redo(): void {
    this.execute()
  }
}

class PasteCommand implements Command {
  execute(): void {}

  undo(): void {}

  redo(): void {
    this.execute()
  }
}

class CopyCommand implements Command {
  execute(): void {}

  undo(): void {
    // no-op
  }

  redo(): void {
    this.execute()
  }
}

class FillCommand implements Command {
  execute(): void {}

  undo(): void {}

  redo(): void {
    this.execute()
  }
}

class CommandHistory {
  private commands: Command[] = []
  private index: number = -1

  execute(command: Command) {
    this.commands.push(command)
    this.index += 1
    command.execute()
  }

  undo() {
    if (this.index < 0) {
      return
    }

    const command = this.commands[this.index]
    this.index -= 1
    command.undo()
  }

  redo() {
    if (this.index >= this.commands.length - 1) {
      return
    }

    this.index += 1
    const command = this.commands[this.index]
    command.redo()
  }
}

export { CommandHistory, CopyCommand, EditCommand, FillCommand, PasteCommand }
