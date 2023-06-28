import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import Tooltip from "./tooltip"

test("renders tooltip on hover", async () => {
  render(
    <Tooltip content="Tooltip text" data-testid="tooltip">
      <div>Hover me</div>
    </Tooltip>
  )
  const hoverableArea = screen.getByText("Hover me")

  expect(hoverableArea).toBeInTheDocument()

  fireEvent.mouseOver(hoverableArea)

  await waitFor(() => screen.getByTestId("tooltip"))
  expect(screen.getByText("Tooltip text")).toBeInTheDocument()
})
