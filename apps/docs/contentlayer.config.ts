import { defineDocumentType, makeSource } from "contentlayer/source-files"

export const Doc = defineDocumentType(() => ({
  name: "Doc",
  filePathPattern: `docs/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    description: { type: "string", required: true },
    component: { type: "boolean", required: false, default: false },
  },
  computedFields:{
    slug: {
        type: "string",
        resolve: (doc) => `/${doc._raw.flattenedPath}`,
    },
     slugAsParams: {
        type: "string",
        resolve: (doc) => doc._raw.flattenedPath.split("/").slice(1).join("/"),
    },
  },
}))

export default makeSource({ contentDirPath: "./src/content", documentTypes: [Doc] })
