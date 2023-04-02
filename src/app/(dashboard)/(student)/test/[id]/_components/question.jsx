export default function Question({ question, setAnswers, index }) {
  const { id, questionText, options, type, difficulty } = question;

  const handleOpenEnded = (e) => {
    const { value } = e.target;

    setAnswers((prev) =>
      prev.map((answer) => {
        if (answer.questionId === id) {
          return {
            ...answer,
            openEndedAnswer: value,
          };
        } else {
          return answer;
        }
      })
    );
  };

  const handleSingleChoice = (e) => {
    const { value } = e.target;

    setAnswers((prev) =>
      prev.map((answer) => {
        if (answer.questionId === id) {
          return {
            ...answer,
            answers: [value],
          };
        } else {
          return answer;
        }
      })
    );
  };

  const handleMultiChoice = (e) => {
    const { value } = e.target;

    setAnswers((prev) =>
      prev.map((answer) => {
        if (answer.questionId === id) {
          return {
            ...answer,
            answers: answer.answers.includes(value) ? [...answer.answers.filter((element) => element !== value)] : [...answer.answers, value],
          };
        } else {
          return answer;
        }
      })
    );
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

        <div className="flex flex-col gap-y-2">
          <p>
            <strong>{type === 2 ? 'Your answer:' : 'Answers:'}</strong>
          </p>

          {type === 2 ? (
            <textarea
              rows={5}
              onChange={handleOpenEnded}
              className="w-full lg:w-1/2 py-2 px-3 rounded-lg text-sm border duration-300 bg-transparent border-neutral-300 hover:border-neutral-500 focus:border-orange-500"
            />
          ) : (
            <>
              {options.map(({ id: optionId, optionText }) => (
                <label key={optionId} className="flex gap-x-2 w-fit">
                  <input type={type === 0 ? 'radio' : type === 1 ? 'checkbox' : ''} name={id} value={optionId} onChange={type === 0 ? handleSingleChoice : type === 1 ? handleMultiChoice : null} />
                  <p>{optionText}</p>
                  <p>{optionId}</p>
                </label>
              ))}
            </>
          )}
        </div>
      </div>
    </li>
  );
}
