import { Heading, Text } from "@medusajs/ui"
import { allDocs } from "contentlayer/generated"
import { notFound } from "next/navigation"

import { Mdx } from "@/components/mdx-components"

interface DocPageProps {
  params: {
    slug: string[]
  }
}

async function getDocFromParams({ params }: DocPageProps) {
  const slug = params.slug.join("/") || ""

  const doc = allDocs.find((doc) => doc.slugAsParams === slug)

  if (!doc) {
    return null
  }

  return doc
}

export async function generateStaticParams(): Promise<
  DocPageProps["params"][]
> {
  return allDocs.map((doc) => ({
    slug: doc.slug.split("/"),
  }))
}

export default async function DocPage({ params }: DocPageProps) {
  const doc = await getDocFromParams({ params })

  if (!doc) {
    notFound()
  }

  return (
    <div className="flex flex-col">
      <Heading level={"h1"}>{doc.title}</Heading>
      <Text>{doc.description}</Text>
      <div>
        <Mdx code={doc.body.code} />
      </div>
    </div>
  )
}
