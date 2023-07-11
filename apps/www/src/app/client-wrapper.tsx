"use client"

import { Badge, Button, useAlertDialog } from "@medusajs/ui"
import { useState } from "react"

const ClientWrapper = () => {
  const [state, setState] = useState(false)
  const alert = useAlertDialog()

  const handleClick = async () => {
    const result = await alert({
      title: "Are you sure?",
      description: "Are you sure you want to delete this item?",
      cancelText: "Cancel",
      confirmText: "Delete",
      verificationText: "delete",
    })

    setState(result)
  }

  return (
    <div className="flex items-center gap-x-2">
      <Button variant={"danger"} onClick={handleClick}>
        Danger
      </Button>
      <Badge>{state ? "OK" : "Not OK"}</Badge>
    </div>
  )
}

export default ClientWrapper
