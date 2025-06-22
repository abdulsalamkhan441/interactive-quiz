import React, { useState} from 'react';
import Home from './components/Home';
import Quiz from './components/Quiz';
import Result from './components/Result';

function App() {
  const [start, setStart] = useState(false);
  const [quizData, setQuizData] = useState([]);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  return (
    <div className="min-h-screen bg-light dark:bg-dark text-dark dark:text-light transition-colors duration-500">
      {!start && <Home setStart={setStart} setQuizData={setQuizData} />}
      {start && !showResult && <Quiz quizData={quizData} setScore={setScore} setShowResult={setShowResult} />}
      {showResult && <Result score={score} total={quizData.length} setStart={setStart} />}
    </div>
  );
}

export default App;