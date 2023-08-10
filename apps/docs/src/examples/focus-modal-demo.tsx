import { Button, FocusModal } from "@medusajs/ui"

export default function FocusModalDemo() {
  return (
    <FocusModal.Root>
      <FocusModal.Trigger asChild>
        <Button>Edit Variant</Button>
      </FocusModal.Trigger>
      <FocusModal.Content>
        <FocusModal.Header>
          <Button>Save</Button>
        </FocusModal.Header>
        <FocusModal.Body></FocusModal.Body>
      </FocusModal.Content>
    </FocusModal.Root>
  )
}
