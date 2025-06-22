import React, { useEffect } from 'react';

const Result = ({ score, total, setStart }) => {
  useEffect(() => {
    const prevScores = JSON.parse(localStorage.getItem('quiz_scores')) || [];
    const newScore = {
      date: new Date().toLocaleString(),
      score,
      total
    };
    localStorage.setItem('quiz_scores', JSON.stringify([newScore, ...prevScores]));
  }, [score, total]);

  const scores = JSON.parse(localStorage.getItem('quiz_scores')) || [];

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-neutral-900 text-white px-4 py-10">
      <div className="max-w-xl w-full bg-[#1e202c] rounded-2xl shadow-lg p-8 text-center space-y-6">
        <h2 className="text-4xl font-bold text-[#60519b]">🎉 Quiz Complete!</h2>
        <p className="text-xl text-slate-300">
          You scored <span className="font-bold text-green-400">{score}</span> out of <span className="font-bold">{total}</span>
        </p>

        <div className="bg-[#2c2f3f] p-5 rounded-xl text-left shadow-inner">
          <h3 className="text-lg font-semibold text-[#60519b] mb-3">🗂 Previous Scores</h3>
          <ul className="space-y-2 text-sm text-slate-300">
            {scores.slice(0, 5).map((entry, idx) => (
              <li key={idx} className="flex justify-between">
                <span>{entry.date}</span>
                <span className="font-medium text-green-400">
                  {entry.score}/{entry.total}
                </span>
              </li>
            ))}
            {scores.length === 0 && (
              <li className="text-slate-500 italic">No scores available.</li>
            )}
          </ul>
        </div>

        <button
          onClick={() => setStart(false)}
          className="bg-[#60519b] hover:bg-[#31323e] transition-all text-white px-6 py-3 rounded-xl mt-4"
        >
          🔁 Restart Quiz
        </button>
      </div>
    </div>
  );
};

export default Result;
