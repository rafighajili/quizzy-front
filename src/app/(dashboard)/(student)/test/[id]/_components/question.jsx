export default function Question({ question, setAnswers, index }) {
  const { id, questionText, options, type, difficulty } = question;

  return (
    <li className="p-4 flex gap-x-4 text-sm">
      <span className="h-6 w-6 rounded-full bg-orange-100 text-orange-500 font-bold grid place-items-center order-last">{index + 1}</span>

      <div className="flex-1 space-y-2">
        <p>
          <strong>Question: </strong>
          {questionText}
        </p>

        <p>
          <strong>Type: </strong> {type === 0 ? 'single-choice' : type === 1 ? 'multi-choice' : type === 2 ? 'open-ended' : ''}
        </p>

        <p>
          <strong>Difficulty: </strong> {difficulty === 0 ? 'easy' : difficulty === 1 ? 'medium' : difficulty === 2 ? 'hard' : ''}
        </p>

        <div className="flex flex-col gap-y-2">
          <p>
            <strong>{type === 2 ? 'Your answer:' : 'Answers:'}</strong>
          </p>
        </div>
      </div>
    </li>
  );
}
