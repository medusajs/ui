"use client"

import { ArrowDownTray, XMarkMini } from "@medusajs/icons"
import * as React from "react"
import { clx } from "../../utils/clx"
import { IconButton } from "../icon-button"
import { Text } from "../text"

type FileUploadContextValue = {
  disabled?: boolean
  required?: boolean
  files?: File[]
  onDeleteFile: (file: File) => void
}

const FileUploadContext = React.createContext<FileUploadContextValue | null>(
  null
)

const useFileUploadContext = (consumerName: string) => {
  const context = React.useContext(FileUploadContext)
  if (!context) {
    throw new Error(
      `\`${consumerName}\` must be used within a \`FileUpload\` component`
    )
  }
  return context
}

interface RootProps extends React.ComponentPropsWithoutRef<"div"> {
  disabled?: boolean
  children?: React.ReactNode
}

const Root = ({ children, ...props }: RootProps) => {
  const [files, setFiles] = React.useState<File[] | undefined>(undefined)

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) {
      return
    }

    const files = Array.from(event.target.files)
    setFiles(files)
  }

  const onDeleteFile = (file: File) => {
    setFiles((files) => {
      if (!files) {
        return undefined
      }

      return files.filter((f) => f !== file)
    })
  }

  return (
    <FileUploadContext.Provider value={{ onDeleteFile, files, ...props }}>
      <div>
        <div>{children}</div>
        <input type="file" onChange={onChange} multiple />
      </div>
    </FileUploadContext.Provider>
  )
}

const DROPZONE_NAME = "FileUpload.Dropzone"

const Dropzone = () => {
  const { disabled } = useFileUploadContext(DROPZONE_NAME)

  return (
    <div
      className={clx(
        "bg-ui-bg-subtle border-ui-border-base transition-fg text-ui-fg-subtle flex flex-col items-center rounded-lg border border-dashed p-8 outline-none",
        "hover:border-ui-border-strong",
        "focus:border-ui-border-interactive focus:shadow-borders-focus focus:border-solid",
        {
          "border-ui-border-base text-ui-fg-disabled": disabled,
        }
      )}
      tabIndex={disabled ? undefined : 0}
    >
      <div className="flex items-center gap-x-2">
        <ArrowDownTray />
        <Text size="small">Import Files</Text>
      </div>
      <Text
        size="small"
        className={clx({
          "text-ui-fg-disabled": disabled,
          "text-ui-fg-muted": !disabled,
        })}
      >
        Drag and drop files here or click to upload
      </Text>
    </div>
  )
}

type FileProps = {
  file: File
}

const FILE_NAME = "FileUpload.File"

function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes"

  const sizes = ["Bytes", "KB", "MB", "GB", "TB"]
  const i = Math.floor(Math.log(bytes) / Math.log(1024))
  const formattedSize = parseFloat((bytes / Math.pow(1024, i)).toFixed(2))

  return `${formattedSize}${sizes[i]}`
}

const File = ({ file }: FileProps) => {
  const { onDeleteFile } = useFileUploadContext(FILE_NAME)

  return (
    <div className="bg-ui-bg-subtle border-ui-border-base text-ui-fg-base flex items-center justify-between rounded-lg border px-3 py-2">
      <div>
        <Text size="small">{file.name}</Text>
        <Text size="small" className="text-ui-fg-subtle">
          {formatFileSize(file.size)}
        </Text>
      </div>
      <IconButton variant="transparent" onClick={() => onDeleteFile(file)}>
        <XMarkMini className="text-ui-fg-subtle" />
      </IconButton>
    </div>
  )
}

const FILES_NAME = "FileUpload.Files"

const Files = () => {
  const { files } = useFileUploadContext(FILES_NAME)

  if (!files) {
    return null
  }

  return (
    <div className="flex flex-col gap-y-2">
      {files.map((file) => (
        <File key={file.name} file={file} />
      ))}
    </div>
  )
}

const FileUpload = Object.assign(Root, {
  Dropzone,
  Files,
})

export { FileUpload }
