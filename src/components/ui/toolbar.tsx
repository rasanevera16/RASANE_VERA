"use client";

import { type Editor } from "@tiptap/react";
import {
  Bold,
  Strikethrough,
  Italic,
  List,
  ListOrdered,
  Heading2,
  Quote,
  Undo,
  Redo,
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  AArrowDown,
} from "lucide-react";

import { Toggle } from "./toggle";
import { Loader } from "./loader";
import { cn } from "@/lib/utils";

interface ToolbarProps {
  editor: Editor | null;
}

export const Toolbar = ({ editor }: ToolbarProps) => {
  if (!editor) {
    return (
      <div className="flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-2 divide-x divide-border rounded-md border border-input p-1">
      <div className="space-x-1">
        <Toggle
          pressed={editor.isActive("heading", { level: 2 })}
          onPressedChange={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          size={"sm"}
          className={cn(
            "h-7",
            editor.isActive("heading", { level: 2 }) &&
              "data-[state=on]:text-secondary-green",
          )}
        >
          <Heading2 className="h-4 w-4" />
        </Toggle>
        <Toggle
          pressed={editor.isActive("bold")}
          onPressedChange={() => editor.chain().focus().toggleBold().run()}
          size={"sm"}
          className={cn(
            "h-7",
            editor.isActive("bold") && "data-[state=on]:text-secondary-green",
          )}
        >
          <Bold className="h-4 w-4" />
        </Toggle>
        <Toggle
          pressed={editor.isActive("italic")}
          onPressedChange={() => editor.chain().focus().toggleItalic().run()}
          size={"sm"}
          className={cn(
            "h-7",
            editor.isActive("italic") && "data-[state=on]:text-secondary-green",
          )}
        >
          <Italic className="h-4 w-4" />
        </Toggle>
        <Toggle
          pressed={editor.isActive("strike")}
          onPressedChange={() => editor.chain().focus().toggleStrike().run()}
          size={"sm"}
          className={cn(
            "h-7",
            editor.isActive("strike") && "data-[state=on]:text-secondary-green",
          )}
        >
          <Strikethrough className="h-4 w-4" />
        </Toggle>
        <Toggle
          onPressedChange={() => editor.chain().focus().setHardBreak().run()}
          size={"sm"}
          className="h-7"
        >
          <AArrowDown className="h-4 w-4" />
        </Toggle>
      </div>
      <div className="space-x-1 pl-2">
        <Toggle
          pressed={editor.isActive("bulletList")}
          onPressedChange={() =>
            editor.chain().focus().toggleBulletList().run()
          }
          size={"sm"}
          className={cn(
            "h-7",
            editor.isActive("bulletList") &&
              "data-[state=on]:text-secondary-green",
          )}
        >
          <List className="h-4 w-4" />
        </Toggle>
        <Toggle
          pressed={editor.isActive("orderedList")}
          onPressedChange={() =>
            editor.chain().focus().toggleOrderedList().run()
          }
          size={"sm"}
          className={cn(
            "h-7",
            editor.isActive("orderedList") &&
              "data-[state=on]:text-secondary-green",
          )}
        >
          <ListOrdered className="h-4 w-4" />
        </Toggle>
        <Toggle
          pressed={editor.isActive("blockquote")}
          onPressedChange={() =>
            editor.chain().focus().toggleBlockquote().run()
          }
          size={"sm"}
          className={cn(
            "h-7",
            editor.isActive("blockquote") &&
              "data-[state=on]:text-secondary-green",
          )}
        >
          <Quote className="h-4 w-4" />
        </Toggle>
      </div>
      <div className="space-x-1 pl-2">
        <Toggle
          pressed={editor.isActive({ textAlign: "left" })}
          onPressedChange={() =>
            editor.chain().focus().setTextAlign("left").run()
          }
          size={"sm"}
          className={cn(
            "h-7",
            editor.isActive({ textAlign: "left" }) &&
              "data-[state=on]:text-secondary-green",
          )}
        >
          <AlignLeft className="h-4 w-4" />
        </Toggle>
        <Toggle
          pressed={editor.isActive({ textAlign: "center" })}
          onPressedChange={() =>
            editor.chain().focus().setTextAlign("center").run()
          }
          size={"sm"}
          className={cn(
            "h-7",
            editor.isActive({ textAlign: "center" }) &&
              "data-[state=on]:text-secondary-green",
          )}
        >
          <AlignCenter className="h-4 w-4" />
        </Toggle>
        <Toggle
          pressed={editor.isActive({ textAlign: "right" })}
          onPressedChange={() =>
            editor.chain().focus().setTextAlign("right").run()
          }
          size={"sm"}
          className={cn(
            "h-7",
            editor.isActive({ textAlign: "right" }) &&
              "data-[state=on]:text-secondary-green",
          )}
        >
          <AlignRight className="h-4 w-4" />
        </Toggle>
        <Toggle
          pressed={editor.isActive({ textAlign: "justify" })}
          onPressedChange={() =>
            editor.chain().focus().setTextAlign("justify").run()
          }
          size={"sm"}
          className={cn(
            "h-7",
            editor.isActive({ textAlign: "justify" }) &&
              "data-[state=on]:text-secondary-green",
          )}
        >
          <AlignJustify className="h-4 w-4" />
        </Toggle>
      </div>
      <div className="space-x-1 pl-2">
        <Toggle
          pressed={editor.isActive("undo")}
          onPressedChange={() => editor.chain().focus().undo().run()}
          size={"sm"}
          className="h-7"
          disabled={!editor.can().undo()}
        >
          <Undo className="h-4 w-4" />
        </Toggle>
        <Toggle
          pressed={editor.isActive("redo")}
          onPressedChange={() => editor.chain().focus().redo().run()}
          size={"sm"}
          className="h-7"
          disabled={!editor.can().redo()}
        >
          <Redo className="h-4 w-4" />
        </Toggle>
      </div>
    </div>
  );
};
