import { generateIcons } from "@/commands/icons/command"
import { Command } from "commander"

import pkg from "../package.json"

export async function createCli() {
  const program = new Command()

  program.name("toolbox").version(pkg.version)

  const generateIconsCommand = program.command("icons")
  generateIconsCommand.description("Generate icons from Figma")

  generateIconsCommand.option("-o, --output <path>", "Output directory")

  generateIconsCommand.action(generateIcons)

  return program
}
