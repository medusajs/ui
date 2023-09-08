import { getInputValues, setInputValues } from "./helpers"
import { Command } from "./types"

/** Command Pattern Models */

class EditCommand implements Command {
  execute(): void {}

  undo(): void {}

  redo(): void {
    this.execute()
  }
}

type PasteCommandArgs = {
  cells: NodeListOf<HTMLInputElement>
  data: string
}

class PasteCommand implements Command {
  private _cells: NodeListOf<HTMLInputElement>
  private _original: string
  private _new: string

  constructor({ cells, data }: PasteCommandArgs) {
    this._cells = cells

    this._original = getInputValues(cells)
    this._new = data
  }

  execute(): void {
    setInputValues(this._new, this._cells)
  }

  undo(): void {
    setInputValues(this._original, this._cells)
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

/** Sorted Set Model */

/**
 * A sorted set implementation that uses binary search to find the insertion index.
 */
class SortedSet<T> {
  private items: T[] = []

  constructor(initialItems?: T[]) {
    if (initialItems) {
      this.insertMultiple(initialItems)
    }
  }

  insert(value: T): void {
    const insertionIndex = this.findInsertionIndex(value)

    if (this.items[insertionIndex] !== value) {
      this.items.splice(insertionIndex, 0, value)
    }
  }

  getPrev(value: T): T | null {
    const index = this.findInsertionIndex(value)
    if (index === 0) {
      return null
    }

    return this.items[index - 1]
  }

  getNext(value: T): T | null {
    const index = this.findInsertionIndex(value)
    if (index === this.items.length - 1) {
      return null
    }

    return this.items[index + 1]
  }

  getFirst(): T | null {
    if (this.items.length === 0) {
      return null
    }

    return this.items[0]
  }

  getLast(): T | null {
    if (this.items.length === 0) {
      return null
    }

    return this.items[this.items.length - 1]
  }

  toArray(): T[] {
    return [...this.items]
  }

  private insertMultiple(values: T[]): void {
    values.forEach((value) => this.insert(value))
  }

  private findInsertionIndex(value: T): number {
    let left = 0
    let right = this.items.length - 1
    while (left <= right) {
      const mid = Math.floor((left + right) / 2)
      if (this.items[mid] === value) {
        return mid
      } else if (this.items[mid] < value) {
        left = mid + 1
      } else {
        right = mid - 1
      }
    }
    return left
  }
}

export { CommandHistory, EditCommand, FillCommand, PasteCommand, SortedSet }
