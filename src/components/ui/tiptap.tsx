"use client";

import * as React from "react";
import { useFormContext } from "react-hook-form";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

// Extensions
import TextAlign from "@tiptap/extension-text-align";

import { Toolbar } from "./toolbar";

interface TiptapProps {
  val: string;
}

const Tiptap = React.forwardRef<HTMLDivElement, TiptapProps>(({ val }, ref) => {
  const { setValue } = useFormContext();

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        orderedList: {
          HTMLAttributes: {
            class: "list-decimal pl-4",
          },
        },

        bulletList: {
          HTMLAttributes: {
            class: "list-disc pl-4",
          },
        },

        heading: {
          HTMLAttributes: {
            class: "text-xl font-bold text-primary",
          },
          levels: [2],
        },

        blockquote: {
          HTMLAttributes: {
            class: "border-l-2 border-primary-violet pl-3 text-gray-700",
          },
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],

    onUpdate: ({ editor }) => {
      const content = editor.getHTML();

      setValue("description", content, {
        shouldValidate: true,
        shouldDirty: true,
      });
    },
    editorProps: {
      attributes: {
        class:
          "min-h-[100px] w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus:border-primary-violet focus-visible:ring-1 focus-visible:ring-primary-violet focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50",
      },
    },
    content: val,
  });

  React.useEffect(() => {
    if (editor?.isEmpty) editor.commands.setContent(val);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [val]);

  return (
    <div className="flex flex-col gap-2">
      <Toolbar editor={editor} />
      <EditorContent
        ref={ref}
        className="whitespace-pre-line"
        editor={editor}
      />
    </div>
  );
});

Tiptap.displayName = "Tiptap";

export { Tiptap };
