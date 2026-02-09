"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import { TextStyle } from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import TextAlign from "@tiptap/extension-text-align";
import FontSize from "tiptap-extension-font-size";
import Heading from "@tiptap/extension-heading";
import Blockquote from "@tiptap/extension-blockquote";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import Link from "@tiptap/extension-link";
// import History from "@tiptap/extension-history";

import { useCallback } from "react";

// Lucide icons
import { 
  Bold, Italic, Underline as UnderlineIcon, AlignLeft, AlignCenter, AlignRight, Type, 
  List, ListOrdered, Link as LinkIcon, Undo, Redo, Hash, Quote 
} from "lucide-react";

function MenuButton({ onClick, isActive, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`p-2 rounded-md transition ${
        isActive
          ? "bg-blue-500 text-white shadow"
          : "bg-white text-gray-700 hover:bg-gray-100"
      }`}
    >
      {children}
    </button>
  );
}

export default function BlogEditor({ value, onChange }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextStyle.configure({ types: ["textStyle"] }),
      Color.configure({ types: ["textStyle"] }),
      FontSize.configure({ types: ["textStyle"] }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      // Heading.configure({ levels: [1, 2, 3] }),
      // Blockquote,
      // BulletList,
      // OrderedList,
      // ListItem,
      Link.configure({ openOnClick: true }),
      // History,
    ],
    content: value,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  const setFontSize = useCallback(
    (size) => {
      editor.chain().focus().setFontSize(size).run();
    },
    [editor]
  );

  const addLink = () => {
    const url = prompt("Enter the URL");
    if (url) {
      editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
    }
  };

  if (!editor) return null;

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-2 mb-4 border border-gray-300 p-2 rounded-lg bg-white shadow-sm sticky top-0 z-10">
        {/* Bold, Italic, Underline */}
        <MenuButton onClick={() => editor.chain().focus().toggleBold().run()} isActive={editor.isActive("bold")}>
          <Bold className="w-4 h-4" />
        </MenuButton>
        <MenuButton onClick={() => editor.chain().focus().toggleItalic().run()} isActive={editor.isActive("italic")}>
          <Italic className="w-4 h-4" />
        </MenuButton>
        <MenuButton onClick={() => editor.chain().focus().toggleUnderline().run()} isActive={editor.isActive("underline")}>
          <UnderlineIcon className="w-4 h-4" />
        </MenuButton>

        {/* Font size */}
        <div className="flex items-center gap-1">
          <Type className="w-4 h-4 text-gray-600" />
          <select
            onChange={(e) => setFontSize(e.target.value)}
            className="border rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            defaultValue="16px"
          >
            <option value="12px">12</option>
            <option value="14px">14</option>
            <option value="16px">16</option>
            <option value="20px">20</option>
            <option value="24px">24</option>
          </select>
        </div>

        {/* Headings & Blockquote */}
        <MenuButton onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} isActive={editor.isActive("heading", { level: 1 })}>
          H1
        </MenuButton>
        <MenuButton onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} isActive={editor.isActive("heading", { level: 2 })}>
          H2
        </MenuButton>
        <MenuButton onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} isActive={editor.isActive("heading", { level: 3 })}>
          H3
        </MenuButton>
        <MenuButton onClick={() => editor.chain().focus().toggleBlockquote().run()} isActive={editor.isActive("blockquote")}>
          <Quote className="w-4 h-4" />
        </MenuButton>

        {/* Lists */}
        <MenuButton onClick={() => editor.chain().focus().toggleBulletList().run()} isActive={editor.isActive("bulletList")}>
          <List className="w-4 h-4" />
        </MenuButton>
        <MenuButton onClick={() => editor.chain().focus().toggleOrderedList().run()} isActive={editor.isActive("orderedList")}>
          <ListOrdered className="w-4 h-4" />
        </MenuButton>

        {/* Links */}
        <MenuButton onClick={addLink} isActive={editor.isActive("link")}>
          <LinkIcon className="w-4 h-4" />
        </MenuButton>

        {/* Undo/Redo */}
        <MenuButton onClick={() => editor.chain().focus().undo().run()}>
          <Undo className="w-4 h-4" />
        </MenuButton>
        <MenuButton onClick={() => editor.chain().focus().redo().run()}>
          <Redo className="w-4 h-4" />
        </MenuButton>

        {/* Alignment */}
        <MenuButton onClick={() => editor.chain().focus().setTextAlign("left").run()} isActive={editor.isActive({ textAlign: "left" })}>
          <AlignLeft className="w-4 h-4" />
        </MenuButton>
        <MenuButton onClick={() => editor.chain().focus().setTextAlign("center").run()} isActive={editor.isActive({ textAlign: "center" })}>
          <AlignCenter className="w-4 h-4" />
        </MenuButton>
        <MenuButton onClick={() => editor.chain().focus().setTextAlign("right").run()} isActive={editor.isActive({ textAlign: "right" })}>
          <AlignRight className="w-4 h-4" />
        </MenuButton>

        {/* Color picker */}
        <input
          type="color"
          onChange={(e) => editor.chain().focus().setColor(e.target.value).run()}
          className="ml-2 w-8 h-8 border rounded cursor-pointer"
        />
      </div>

      {/* Editor */}
      <div className="border border-gray-300 rounded-lg bg-white shadow-md min-h-[300px] p-4 prose max-w-none focus:outline-none">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
