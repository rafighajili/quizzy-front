import { deleteQuestion, questionKey } from '#/api/quiz';
import { useSWRConfig } from 'swr';

export default function Question({ question, quizId, setIsQuestionModalOpen, setQuestionModalOptions, index }) {
  const { id, questionText, difficulty, type, options } = question;

  const { mutate } = useSWRConfig();

  const onDelete = async () => {
    await deleteQuestion(quizId, id);
    mutate(questionKey(quizId));
  };

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

        {type !== 2 && (
          <div className="flex gap-x-2 flex-wrap">
            <p>
              <strong>Options:</strong>
            </p>

            <div>
              {options.map(({ id: optionId, optionText, isCorrect }, index) => (
                <p key={optionId} className={isCorrect ? 'text-green-500' : 'text-red-500'}>{`${index + 1}. ${optionText} - ${isCorrect ? 'correct' : 'wrong'}`}</p>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-col items-start gap-y-2 !mt-8">
          <button
            onClick={() => {
              setQuestionModalOptions({ mode: 'edit', initialValues: { questionText, difficulty, type, options }, questionId: id });
              setIsQuestionModalOpen(true);
            }}
            className="text-sm bg-blue-500 hover:bg-blue-400 active:bg-blue-600 rounded-lg h-8 px-3 text-white "
          >
            Edit question
          </button>

          <button onClick={onDelete} className="text-sm bg-red-500 hover:bg-red-400 active:bg-red-600 rounded-lg h-8 px-3 text-white">
            Delete question
          </button>
        </div>
      </div>
    </li>
  );
}
