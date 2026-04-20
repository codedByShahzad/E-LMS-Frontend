"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

// NEW EXTENSIONS
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import {TextStyle} from "@tiptap/extension-text-style";

import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Heading2,
  Heading3,
  Quote,
  Code,
  Undo,
  Redo,
  Strikethrough,
  Minus,
  Image as ImageIcon,
  Link as LinkIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Type,
  Highlighter,
  Underline as UnderlineIcon,
} from "lucide-react";

/* ---------------- FONT SIZE EXTENSION ---------------- */
const FontSize = TextStyle.extend({
  addAttributes() {
    return {
      fontSize: {
        default: null,
        parseHTML: (el) => el.style.fontSize,
        renderHTML: (attrs) => {
          if (!attrs.fontSize) return {};
          return { style: `font-size: ${attrs.fontSize}` };
        },
      },
    };
  },
});

export default function Page() {
  const params = useParams();
  const id = params.slug as string;

  const [formData, setFormData] = useState({
    title: "Mastering Docker: From Beginner to Pro",
    subtitle:
      "Learn How to Build, Deploy, and Manage Containerized Applications with Docker",
    description: `<p>Unlock the power of Docker and take your development skills to the next level!</p>
    <ul>
      <li>Understand Docker fundamentals</li>
      <li>Build and manage containers</li>
      <li>Use Docker Compose</li>
    </ul>`,
    category: "",
    level: "",
    price: 499,
    thumbnail: null as File | null,
    preview: "/docker.png",
  });

  // EDITOR
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({ openOnClick: false }),
      Image,
      Highlight,
      FontSize,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content: formData.description,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl focus:outline-none max-w-none min-h-[200px] px-4 py-3",
      },
    },
    onUpdate: ({ editor }) => {
      setFormData((prev) => ({
        ...prev,
        description: editor.getHTML(),
      }));
    },
  });

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({
        ...formData,
        thumbnail: file,
        preview: URL.createObjectURL(file),
      });
    }
  };

  const handleSubmit = () => {
    console.log("Update Course ID:", id);
    console.log(formData);
  };

  if (!editor) return null;

  // ACTIONS
  const addLink = () => {
    const url = prompt("Enter URL");
    if (url) editor.chain().focus().setLink({ href: url }).run();
  };

  const addImage = () => {
    const url = prompt("Image URL");
    if (url) editor.chain().focus().setImage({ src: url }).run();
  };

  const setFontSize = (size: string) => {
    editor.chain().focus().setMark("textStyle", { fontSize: size }).run();
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen font-sans">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">
          Add detail information regarding course
        </h1>
        <button className="text-sm text-gray-600 hover:text-gray-900 hover:underline">
          Go to lectures page
        </button>
      </div>

      {/* CARD */}
      <div className="bg-white rounded-xl border p-6 shadow-sm">

        {/* TOP */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-lg font-semibold">Basic Information</h2>
            <p className="text-sm text-gray-500">
              Make changes to your courses here. Click save when you're done.
            </p>
          </div>

          <div className="flex gap-3">
            <button className="px-4 py-2 border rounded-lg">
              Unpublish
            </button>
            <button className="px-4 py-2 bg-red-600 text-white rounded-lg">
              Remove Course
            </button>
          </div>
        </div>

        {/* FORM */}
        <div className="space-y-5">

          {/* TITLE */}
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2.5"
            />
          </div>

          {/* SUBTITLE */}
          <div>
            <label className="block text-sm font-medium mb-1">Subtitle</label>
            <input
              name="subtitle"
              value={formData.subtitle}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2.5"
            />
          </div>

          {/* EDITOR (ONLY SECTION UPDATED) */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Description
            </label>

            <div className="border rounded-xl overflow-hidden">

              {/* TOOLBAR */}
              <div className="flex flex-wrap gap-2 p-2 border-b bg-gray-50">

                <button onClick={() => editor.chain().focus().toggleBold().run()}><Bold size={16} /></button>
                <button onClick={() => editor.chain().focus().toggleItalic().run()}><Italic size={16} /></button>
                <button onClick={() => editor.chain().focus().toggleUnderline().run()}><UnderlineIcon size={16} /></button>
                <button onClick={() => editor.chain().focus().toggleStrike().run()}><Strikethrough size={16} /></button>
                <button onClick={() => editor.chain().focus().toggleHighlight().run()}><Highlighter size={16} /></button>

                <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}><Heading2 size={16} /></button>
                <button onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}><Heading3 size={16} /></button>

                <button onClick={() => editor.chain().focus().toggleBulletList().run()}><List size={16} /></button>
                <button onClick={() => editor.chain().focus().toggleOrderedList().run()}><ListOrdered size={16} /></button>
                <button onClick={() => editor.chain().focus().toggleBlockquote().run()}><Quote size={16} /></button>
                <button onClick={() => editor.chain().focus().toggleCode().run()}><Code size={16} /></button>

                <button onClick={addLink}><LinkIcon size={16} /></button>
                <button onClick={addImage}><ImageIcon size={16} /></button>

                <button onClick={() => editor.chain().focus().setTextAlign("left").run()}><AlignLeft size={16} /></button>
                <button onClick={() => editor.chain().focus().setTextAlign("center").run()}><AlignCenter size={16} /></button>
                <button onClick={() => editor.chain().focus().setTextAlign("right").run()}><AlignRight size={16} /></button>

                <button onClick={() => setFontSize("12px")}>S</button>
                <button onClick={() => setFontSize("18px")}>M</button>
                <button onClick={() => setFontSize("26px")}>L</button>

                <button onClick={() => editor.chain().focus().undo().run()}><Undo size={16} /></button>
                <button onClick={() => editor.chain().focus().redo().run()}><Redo size={16} /></button>

              </div>

              {/* EDITOR */}
              <div className="p-3 min-h-[200px]">
                <EditorContent editor={editor} />
              </div>

            </div>
          </div>

          {/* CATEGORY */}
          <div>
            <label>Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
            >
              <option value="">Select</option>
              <option>Development</option>
              <option>Design</option>
            </select>
          </div>

          {/* LEVEL */}
          <div>
            <label>Level</label>
            <select
              name="level"
              value={formData.level}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
            >
              <option value="">Select</option>
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
          </div>

          {/* PRICE */}
          <div>
            <label>Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          {/* THUMBNAIL */}
          <div>
            <input type="file" onChange={handleFileChange} />
            {formData.preview && (
              <img src={formData.preview} className="w-40 mt-3 rounded" />
            )}
          </div>

          {/* BUTTONS */}
          <div className="flex justify-end gap-3">
            <button>Cancel</button>
            <button onClick={handleSubmit} className="bg-black text-white px-4 py-2 rounded">
              Save
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}