import React, { useState, useEffect } from 'react';

const Quiz = ({ quizData, setScore, setShowResult }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [timeLeft, setTimeLeft] = useState(15);
  const [progress, setProgress] = useState(0);

  const currentQuestion = quizData[currentIndex];

  useEffect(() => {
    if (timeLeft === 0) handleNext();
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  useEffect(() => {
    setTimeLeft(15);
    setSelected(null);
    setProgress(((currentIndex + 1) / quizData.length) * 100);
  }, [currentIndex]);

  const handleSelect = (answer) => {
    setSelected(answer);
    if (answer === currentQuestion.correct_answer) setScore((prev) => prev + 1);
  };

  const handleNext = () => {
    if (currentIndex + 1 < quizData.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setShowResult(true);
    }
  };

  return (
    <div className="min-h-screen w-full bg-neutral-900 text-white px-4 py-10 flex justify-center">
      <div className="bg-[#1e202c] rounded-2xl shadow-xl p-6 max-w-3xl w-full space-y-6">
        <div className="w-full bg-gray-700 h-3 rounded-full overflow-hidden">
          <div
            className="bg-[#60519b] h-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-[#60519b]">
            Question {currentIndex + 1} of {quizData.length}
          </h2>
          <span className="text-sm bg-gray-800 px-3 py-1 rounded-full">
            ⏱ {timeLeft}s
          </span>
        </div>

        <p
          className="text-lg font-medium text-slate-200"
          dangerouslySetInnerHTML={{ __html: currentQuestion.question }}
        />

        <div className="grid gap-4">
          {currentQuestion.answers.map((ans, idx) => {
            const isCorrect = ans === currentQuestion.correct_answer;
            const isWrong = selected && ans === selected && !isCorrect;

            let btnClass = 'bg-gray-800 hover:bg-[#31323e] text-white';

            if (selected) {
              if (isCorrect) btnClass = 'bg-green-500 text-white';
              else if (isWrong) btnClass = 'bg-red-500 text-white';
              else btnClass = 'bg-gray-700 text-white opacity-60';
            }

            return (
              <button
                key={idx}
                disabled={!!selected}
                onClick={() => handleSelect(ans)}
                className={`w-full px-4 py-3 rounded-xl transition-all text-left ${btnClass}`}
                dangerouslySetInnerHTML={{ __html: ans }}
              />
            );
          })}
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleNext}
            disabled={!selected && timeLeft > 0}
            className="mt-4 bg-[#60519b] hover:bg-[#31323e] px-6 py-2 rounded-xl text-white transition-all"
          >
            {currentIndex + 1 === quizData.length ? 'Finish' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
