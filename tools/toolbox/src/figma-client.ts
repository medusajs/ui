import Figma from "@medusajs/figma-api"
import dotenv from "dotenv"
import { resolve } from "path"

dotenv.config({ path: resolve(process.cwd(), ".env") })

const accessToken = process.env.FIGMA_TOKEN || ""

if (!accessToken) {
  throw new Error("FIGMA_TOKEN is not defined")
}

export const client = new Figma({
  accessToken: accessToken,
  maxRetries: 3,
})
