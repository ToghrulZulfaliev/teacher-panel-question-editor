import { renderLatexInHtml } from "../components/utils/katexRender";

export default function QuestionPreview({ html }) {
  const rendered = renderLatexInHtml(html);

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5">
      <div className="mb-3 text-sm font-semibold text-gray-700">Preview (Teacher/Student View)</div>

      <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: rendered }} />

      <style>{`
        .prose img { max-width: 100%; height: auto; border-radius: 12px; }
      `}</style>
    </div>
  );
}
