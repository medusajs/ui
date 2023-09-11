import { Tabs, Text } from "@medusajs/ui"

export default function TabsDemo() {
  return (
    <div className="h-full w-full p-4">
      <Tabs defaultValue="description">
        <Tabs.List>
          <Tabs.Trigger value="description">Description</Tabs.Trigger>
          <Tabs.Trigger value="sustainability">Sustainability </Tabs.Trigger>
          <Tabs.Trigger value="shipping">Shipping</Tabs.Trigger>
        </Tabs.List>
        <div className="txt-compact-medium text-ui-fg-base mt-4 p-3">
          <Tabs.Content value="description">
            <Text>
              Ultra soft and comfortable, this basic tee is a wardrobe staple.
            </Text>
          </Tabs.Content>
          <Tabs.Content value="sustainability">
            <Text>
              All our products are made with love and care in our factory in the
              Netherlands. We only use the best materials and fabrics. We do not
              use any harmful chemicals in our production process.
            </Text>
          </Tabs.Content>
          <Tabs.Content value="shipping">
            <Text>
              Products are usually shipped from our warehouse within 1-2 days.
            </Text>
          </Tabs.Content>
        </div>
      </Tabs>
    </div>
  )
}
