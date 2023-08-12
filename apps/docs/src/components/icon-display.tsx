import * as Icons from "@medusajs/icons"
import { Label } from "@medusajs/ui"
import * as React from "react"

const IconDisplay = React.memo(() => {
  return (
    <div className="mt-8 flex flex-col gap-y-6">
      <Section title="Core">
        <CopyButton Icon={Icons.EllipsisHorizontal} name="EllipsisHorizontal" />
        <CopyButton Icon={Icons.Hashtag} name="Hashtag" />
        <CopyButton Icon={Icons.MapPin} name="MapPin" />
        <CopyButton Icon={Icons.Component} name="Component" />
        <CopyButton Icon={Icons.EllipsisVertical} name="EllipsisVertical" />
        <CopyButton Icon={Icons.AtSymbol} name="AtSymbol" />
        <CopyButton Icon={Icons.ArrowUturnLeft} name="ArrowUturnLeft" />
        <CopyButton Icon={Icons.ComponentSolid} name="ComponentSolid" />
        <CopyButton Icon={Icons.Key} name="Key" />
        <CopyButton Icon={Icons.PaperClip} name="PaperClip" />
        <CopyButton Icon={Icons.XMark} name="XMark" />
      </Section>
      <Section title="Status">
        <CopyButton Icon={Icons.CircleDottedLine} name="CircleDottedLine" />
      </Section>
    </div>
  )
})

const Section = ({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) => {
  return (
    <div>
      <h2 className="h2-docs mb-4">{title}</h2>
      <div className="grid grid-cols-3 gap-4">{children}</div>
    </div>
  )
}

type CopyButtonProps = {
  Icon: React.ComponentType
  name: string
}

const CopyButton = ({ Icon, name }: CopyButtonProps) => {
  const importCopy = `import { ${name} } from "@medusajs/icons"`
  const id = `copy-${name}-icon`

  return (
    <div className="flex items-center gap-x-4">
      <button
        className="text-ui-fg-base border-ui-border-base flex h-10 w-10 items-center justify-center rounded-lg border"
        id={id}
      >
        <div className="bg-ui-bg-component flex h-8 w-8 items-center justify-center rounded-[4px]">
          <Icon />
        </div>
      </button>
      <Label className="mt-2" htmlFor={id}>
        {name}
      </Label>
    </div>
  )
}

export { IconDisplay as AllIcons }
