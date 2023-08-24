import { ArrowUpRightOnBox } from "@medusajs/icons"
import FigmaIcon from "../assets/figma-logo.png"

const FigmaLink = () => {
  return (
    <a
      className="bg-ui-bg-subtle shadow-elevation-card-rest hover:shadow-elevation-card-hover hover:bg-ui-bg-subtle-hover focus:bg-ui-bg-subtle-pressed my-4 flex cursor-pointer items-center rounded-lg p-4 transition-all"
      href="https://www.figma.com/file/TW0kRpjhpsi3sR1u4a4wF8/Medusa-UI"
      target="_blank"
      role="button"
      aria-label="Open Medusa UI Figma File"
    >
      <div className="bg-ui-bg-base border-ui-border-base mr-4 flex h-[40px] w-[40px] items-center justify-center overflow-hidden rounded-lg border">
        <div className="h-[32px] w-[32px] overflow-hidden rounded-md">
          <img src={FigmaIcon.src} />
        </div>
      </div>
      <div>
        <p className="txt-compact-medium-plus text-ui-fg-base">Medusa UI</p>
        <p className="txt-compact-medium text-ui-fg-subtle">
          Colors, type, icons and components
        </p>
      </div>
      <div className="ml-auto">
        <ArrowUpRightOnBox className="text-ui-fg-subtle text-xl" />
      </div>
    </a>
  )
}

export { FigmaLink }
