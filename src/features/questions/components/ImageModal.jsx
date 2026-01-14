import { useMemo, useState } from "react";
import Modal from "../components/shared/ui/Modal";
import { compressToDataUrl } from "../components/utils/imageUpload";

export default function ImageModal({ open, onClose, onInsert }) {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const meta = useMemo(() => {
    if (!file) return null;
    return { name: file.name, sizeKB: Math.round(file.size / 1024) };
  }, [file]);

  const pick = async (f) => {
    if (!f) return;

    if (!f.type.startsWith("image/")) {
      alert("Zəhmət olmasa şəkil seç.");
      return;
    }

    if (f.size > 8 * 1024 * 1024) {
      alert("Şəkil çox böyükdür (max 8MB).");
      return;
    }

    setFile(f);
    setLoading(true);

    try {
      
      const { dataUrl } = await compressToDataUrl(f);
      setPreviewUrl(dataUrl);
    } finally {
      setLoading(false);
    }
  };

  const insert = () => {
    if (!previewUrl) return;
    onInsert(previewUrl);
    onClose();
    setFile(null);
    setPreviewUrl("");
  };

  const close = () => {
    onClose();
    setFile(null);
    setPreviewUrl("");
  };

  return (
    <Modal
      open={open}
      title="Insert Image (Preview before saving)"
      onClose={close}
      footer={
        <div className="flex items-center justify-end gap-2">
          <button className="rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm" onClick={close}>
            Cancel
          </button>
          <button
            className="rounded-xl bg-gray-900 px-4 py-2 text-sm text-white disabled:opacity-50"
            onClick={insert}
            disabled={!previewUrl || loading}
          >
            Insert
          </button>
        </div>
      }
    >
      <div className="space-y-3">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => pick(e.target.files?.[0])}
        />

        {loading ? (
          <div className="text-sm text-gray-600">Compressing...</div>
        ) : null}

        {meta ? (
          <div className="text-xs text-gray-600">
            <div><span className="font-medium">File:</span> {meta.name}</div>
            <div><span className="font-medium">Size:</span> {meta.sizeKB} KB</div>
          </div>
        ) : null}

        {previewUrl ? (
          <div className="rounded-xl border border-gray-200 bg-white p-3">
            <div className="mb-2 text-xs font-medium text-gray-600">Preview</div>
            <img src={previewUrl} alt="preview" className="max-h-[320px] w-full object-contain rounded-xl" />
          </div>
        ) : (
          <div className="text-xs text-gray-500">Şəkil seç – preview burada görünəcək.</div>
        )}
      </div>
    </Modal>
  );
}
