import { allDocs } from "contentlayer/generated"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
       <div>
            {allDocs.map((doc) => {
                return (
                    <div key={doc._id}>
                        <h1>{doc.title}</h1>
                        <p>{doc.description}</p>
                    </div>
                )
            })}
        </div>
    </main>
  )
}
