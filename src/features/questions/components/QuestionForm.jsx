import { useMemo, useState } from "react";
import Input from "../components/shared/ui/Input";
import Select from "../components/shared/ui/Select";
import QuestionPreview from "./QuestionPreview";
import RichQuestionEditor from "./RichQuestionEditor";

export default function QuestionForm() {
  const [draft, setDraft] = useState({
    title: "",
    points: 10,
    difficulty: "medium",
    subject: "Math",
    tags: [],
    contentHtml: "<p>Sualı buraya yaz...</p>",
  });

  const tagsText = useMemo(() => draft.tags.join(", "), [draft.tags]);

  const onSave = () => {
    console.log("SAVE QUESTION:", draft);
    alert("Demo: console-a yazıldı (backend qoşanda DB-yə gedəcək).");
  };

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <div className="space-y-4">
        <div className="rounded-2xl border border-gray-200 bg-white p-5">
          <h2 className="mb-4 text-lg font-semibold">Question Details</h2>

          <div className="space-y-3">
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600">Title (optional)</label>
              <Input
                placeholder="Məs: Integral sualı"
                value={draft.title}
                onChange={(e) => setDraft((p) => ({ ...p, title: e.target.value }))}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="mb-1 block text-xs font-medium text-gray-600">Points</label>
                <Input
                  type="number"
                  min={0}
                  value={draft.points}
                  onChange={(e) => setDraft((p) => ({ ...p, points: Number(e.target.value) }))}
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-gray-600">Difficulty</label>
                <Select
                  value={draft.difficulty}
                  onChange={(e) => setDraft((p) => ({ ...p, difficulty: e.target.value }))}
                >
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="mb-1 block text-xs font-medium text-gray-600">Subject</label>
                <Input
                  placeholder="Math / Physics / Chemistry"
                  value={draft.subject}
                  onChange={(e) => setDraft((p) => ({ ...p, subject: e.target.value }))}
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-gray-600">Tags (comma)</label>
                <Input
                  placeholder="algebra, integral, limits"
                  value={tagsText}
                  onChange={(e) =>
                    setDraft((p) => ({
                      ...p,
                      tags: e.target.value
                        .split(",")
                        .map((x) => x.trim())
                        .filter(Boolean),
                    }))
                  }
                />
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-5">
          <h2 className="mb-4 text-lg font-semibold">Question Content</h2>

          <RichQuestionEditor
            valueHtml={draft.contentHtml}
            onChangeHtml={(html) => setDraft((p) => ({ ...p, contentHtml: html }))}
          />

          <div className="mt-4 flex gap-2">
            <button
              onClick={onSave}
              className="rounded-xl bg-gray-900 px-4 py-2 text-sm font-medium text-white"
            >
              Save Question
            </button>

            <button
              onClick={() => setDraft((p) => ({ ...p, contentHtml: "<p>Sualı buraya yaz...</p>" }))}
              className="rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium"
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="rounded-2xl border border-gray-200 bg-white p-5">
          <h2 className="mb-2 text-lg font-semibold">Scoring Summary</h2>

          <div className="text-sm text-gray-700 space-y-1">
            <div><span className="font-medium">Points:</span> {draft.points}</div>
            <div><span className="font-medium">Difficulty:</span> {draft.difficulty}</div>
            <div><span className="font-medium">Subject:</span> {draft.subject}</div>
            <div><span className="font-medium">Tags:</span> {draft.tags.join(", ") || "-"}</div>
          </div>
        </div>

        <QuestionPreview html={draft.contentHtml} />
      </div>
    </div>
  );
}
