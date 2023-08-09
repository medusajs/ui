"use client"

import { type Doc } from "contentlayer/generated"

const DocsRenderer = ({ docs }: { docs: Doc[] }) => {
    return (
        <div>
            {docs.map((doc) => {
                return (
                    <div key={doc._id}>
                        <h1>{doc.title}</h1>
                        <pre>{JSON.stringify(doc, null, 2)}</pre>
                    </div>
                )
            })}
        </div>
    )
}

export default DocsRenderer