import QuestionForm from "../features/questions/components/QuestionForm";

export default function TeacherPanel() {
  return (
    <div className="mx-auto max-w-6xl p-6">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold">Teacher Panel • Question Builder</h1>
        <p className="text-sm text-gray-600">
          Rich text, formula, şəkil, scoring və preview.
        </p>
      </header>

      <QuestionForm />
    </div>
  );
}
