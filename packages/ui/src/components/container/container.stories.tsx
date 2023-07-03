import type { Meta, StoryObj } from "@storybook/react"
import { Container } from "./container"
import { Header } from "../header"
import { Text } from "../text"

const meta: Meta<typeof Container> = {
  title: "Components/Container",
  component: Container,
  parameters: {
    backgrounds: {
      default: "medusa-admin",
      values: [
        {
          name: "medusa-admin",
          value: "#F9FAFB",
        },
        {
          name: "default",
          value: "#FFF",
        },
      ],
    },
    controls: {
      hideNoControlsWarning: true,
    },
  },
  argTypes: {
    children: {
      table: {
        disable: true,
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof Container>

export const Default: Story = {
  args: {
    children: (
      <>
        <Header>A content area</Header>
        <Text>And some content</Text>
      </>
    ),
  },
}
