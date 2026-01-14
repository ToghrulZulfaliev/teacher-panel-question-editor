import { useEffect, useRef, useState } from "react";
import Modal from "../components/shared/ui/Modal";
import "mathlive";

export default function FormulaModal({ open, onClose, onInsert }) {
  const containerRef = useRef(null);
  const fieldRef = useRef(null);
  const [latex, setLatex] = useState("\\frac{a}{b}");

  useEffect(() => {
    if (!open) return;

    
    if (containerRef.current && !fieldRef.current) {
      const mf = document.createElement("math-field");
      mf.setAttribute("style", "width:100%; font-size: 20px; padding: 12px;");
      mf.value = latex;

      mf.addEventListener("input", () => {
        setLatex(mf.value || "");
      });

      containerRef.current.appendChild(mf);
      fieldRef.current = mf;
    }

    
    if (fieldRef.current) {
      fieldRef.current.value = latex;
      fieldRef.current.focus();
    }
  }, [open]);

  const insert = () => {
    const v = (fieldRef.current?.value || latex || "").trim();
    if (!v) return;
   
    onInsert(`$$ ${v} $$`);
    onClose();
  };

  return (
    <Modal
      open={open}
      title="Insert Formula (Visual Editor)"
      onClose={onClose}
      footer={
        <div className="flex items-center justify-end gap-2">
          <button className="rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm" onClick={onClose}>
            Cancel
          </button>
          <button className="rounded-xl bg-gray-900 px-4 py-2 text-sm text-white" onClick={insert}>
            Insert
          </button>
        </div>
      }
    >
      <p className="mb-3 text-xs text-gray-600">
        Fraction / power / integral və s. üçün editorun içində yaz və ya klaviatura ilə daxil et.
        (LaTeX çıxış verəcək.)
      </p>

      <div className="rounded-xl border border-gray-200 bg-white p-2" ref={containerRef} />

      <div className="mt-4">
        <div className="text-xs font-medium text-gray-600 mb-1">LaTeX output</div>
        <pre className="whitespace-pre-wrap rounded-xl border border-gray-200 bg-gray-50 p-3 text-xs">
{latex || ""}
        </pre>
      </div>
    </Modal>
  );
}
