import { useCallback, useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import EditorToolbar from "./EditorToolbar";
import FormulaModal from "./FormulaModal";
import ImageModal from "./ImageModal";

export default function RichQuestionEditor({ valueHtml, onChangeHtml }) {
  const [formulaOpen, setFormulaOpen] = useState(false);
  const [imageOpen, setImageOpen] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({ openOnClick: false }),
      Image.configure({ inline: true, allowBase64: true }),
    ],
    content: valueHtml || "<p>Sualı buraya yaz...</p>",
    onUpdate: ({ editor }) => onChangeHtml(editor.getHTML()),
    editorProps: {
      attributes: {
        class:
          "prose max-w-none min-h-[220px] rounded-xl border border-gray-200 bg-white p-4 outline-none",
      },
    },
  });

  const onAddFormula = useCallback(() => setFormulaOpen(true), []);
  const onAddImage = useCallback(() => setImageOpen(true), []);

  const insertFormula = (latexBlockText) => {
    if (!editor) return;
    
    editor.chain().focus().insertContent(`<p>${escapeHtml(latexBlockText)}</p>`).run();
  };

  const insertImage = (src) => {
    if (!editor) return;
    editor.chain().focus().setImage({ src }).run();
  };

  return (
    <div className="space-y-3">
      <EditorToolbar editor={editor} onAddImage={onAddImage} onAddFormula={onAddFormula} />

      <EditorContent editor={editor} />

      <FormulaModal
        open={formulaOpen}
        onClose={() => setFormulaOpen(false)}
        onInsert={insertFormula}
      />

      <ImageModal
        open={imageOpen}
        onClose={() => setImageOpen(false)}
        onInsert={insertImage}
      />

      <p className="text-xs text-gray-500">
        Formula: visual editor (MathLive) → LaTeX → preview/student view KaTeX.
        Şəkil: seç → preview → insert (compression ilə).
      </p>
    </div>
  );
}

function escapeHtml(str) {
  return str
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
