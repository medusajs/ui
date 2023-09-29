import type { Meta, StoryObj } from "@storybook/react"
import * as React from "react"

import { FileUpload } from "./file-upload"

const meta: Meta<typeof FileUpload> = {
  title: "Components/FileUpload",
  component: FileUpload,
  parameters: {
    layout: "centered",
  },
}

export default meta

type Story = StoryObj<typeof FileUpload>

export const Default: Story = {
  render: () => {
    return (
      <FileUpload>
        <FileUpload.Dropzone />
        <FileUpload.Files />
      </FileUpload>
    )
  },
}

export const Disabled: Story = {
  render: () => {
    return (
      <FileUpload disabled>
        <FileUpload.Dropzone />
      </FileUpload>
    )
  },
}
