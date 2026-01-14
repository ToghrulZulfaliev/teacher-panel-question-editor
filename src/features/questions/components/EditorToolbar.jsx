export default function EditorToolbar({ editor, onAddImage, onAddFormula }) {
  if (!editor) return null;

  const btn = (active) =>
    `rounded-lg px-3 py-1 text-sm border ${
      active ? "bg-gray-900 text-white border-gray-900" : "bg-white border-gray-200"
    }`;

  return (
    <div className="flex flex-wrap gap-2 rounded-xl border border-gray-200 bg-white p-3">
      <button className={btn(editor.isActive("bold"))} onClick={() => editor.chain().focus().toggleBold().run()}>
        B
      </button>

      <button className={btn(editor.isActive("italic"))} onClick={() => editor.chain().focus().toggleItalic().run()}>
        I
      </button>

      <button className={btn(editor.isActive("underline"))} onClick={() => editor.chain().focus().toggleUnderline().run()}>
        U
      </button>

      <button className={btn(editor.isActive("bulletList"))} onClick={() => editor.chain().focus().toggleBulletList().run()}>
        • List
      </button>

      <button className={btn(editor.isActive("orderedList"))} onClick={() => editor.chain().focus().toggleOrderedList().run()}>
        1. List
      </button>

      <button className={btn(editor.isActive("heading", { level: 2 }))} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
        H2
      </button>

      <button className={btn(false)} onClick={() => editor.chain().focus().setParagraph().run()}>
        P
      </button>

      <div className="mx-2 h-6 w-px bg-gray-200" />

      <button className={btn(false)} onClick={onAddFormula}>
        + Formula
      </button>

      <button className={btn(false)} onClick={onAddImage}>
        + Image
      </button>
    </div>
  );
}
