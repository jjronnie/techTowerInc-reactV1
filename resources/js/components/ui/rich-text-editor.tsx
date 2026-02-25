import * as React from "react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

type RichTextEditorProps = {
  id?: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
  invalid?: boolean
}

const isEditorEmpty = (html: string) => {
  if (!html) {
    return true
  }

  const text = html.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ").trim()
  return text.length === 0
}

function RichTextEditor({
  id,
  value,
  onChange,
  placeholder = "Write your post content here...",
  className,
  invalid = false,
}: RichTextEditorProps) {
  const editorRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (!editorRef.current) {
      return
    }

    if (editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value || ""
    }
  }, [value])

  const ensureLinkTargets = React.useCallback(() => {
    const editor = editorRef.current

    if (!editor) {
      return
    }

    editor.querySelectorAll("a").forEach((anchor) => {
      const href = anchor.getAttribute("href") || ""
      if (!/^(https?:\/\/|mailto:|tel:)/i.test(href)) {
        anchor.removeAttribute("href")
        return
      }

      anchor.setAttribute("target", "_blank")
      anchor.setAttribute("rel", "noopener noreferrer")
    })
  }, [])

  const handleInput = React.useCallback(() => {
    const html = editorRef.current?.innerHTML ?? ""
    ensureLinkTargets()
    onChange(html)
  }, [ensureLinkTargets, onChange])

  const applyCommand = (command: string, commandValue?: string) => {
    editorRef.current?.focus()
    document.execCommand(command, false, commandValue)
    handleInput()
  }

  const applyLink = () => {
    const href = window.prompt("Enter a link URL (https://...)")

    if (!href) {
      return
    }

    applyCommand("createLink", href.trim())
  }

  const empty = isEditorEmpty(value)

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2">
        <Button type="button" variant="outline" size="sm" onClick={() => applyCommand("formatBlock", "p")}>
          P
        </Button>
        <Button type="button" variant="outline" size="sm" onClick={() => applyCommand("formatBlock", "h2")}>
          H2
        </Button>
        <Button type="button" variant="outline" size="sm" onClick={() => applyCommand("formatBlock", "h3")}>
          H3
        </Button>
        <Button type="button" variant="outline" size="sm" onClick={() => applyCommand("bold")}>
          Bold
        </Button>
        <Button type="button" variant="outline" size="sm" onClick={() => applyCommand("italic")}>
          Italic
        </Button>
        <Button type="button" variant="outline" size="sm" onClick={() => applyCommand("underline")}>
          Underline
        </Button>
        <Button type="button" variant="outline" size="sm" onClick={() => applyCommand("insertUnorderedList")}>
          Bullets
        </Button>
        <Button type="button" variant="outline" size="sm" onClick={() => applyCommand("insertOrderedList")}>
          Numbered
        </Button>
        <Button type="button" variant="outline" size="sm" onClick={() => applyCommand("formatBlock", "blockquote")}>
          Quote
        </Button>
        <Button type="button" variant="outline" size="sm" onClick={applyLink}>
          Link
        </Button>
      </div>

      <div className="relative">
        {empty && (
          <div className="pointer-events-none absolute left-3 top-3 text-sm text-muted-foreground">
            {placeholder}
          </div>
        )}
        <div
          ref={editorRef}
          id={id}
          role="textbox"
          aria-multiline="true"
          aria-label="Post content"
          aria-invalid={invalid || undefined}
          contentEditable
          onInput={handleInput}
          onBlur={handleInput}
          className={cn(
            "min-h-[220px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs outline-none transition-[color,box-shadow]",
            "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
            "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
            className
          )}
        />
      </div>
    </div>
  )
}

export { RichTextEditor }
