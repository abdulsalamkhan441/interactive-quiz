import React, { useState, useEffect } from 'react';

const Home = ({ setStart, setQuizData }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    fetch('https://opentdb.com/api_category.php')
      .then(res => res.json())
      .then(data => setCategories(data.trivia_categories))
      .catch(() => setCategories([]));
  }, []);

  const fetchQuestions = async () => {
    setLoading(true);
    setError(null);
    try {
      let url = 'https://opentdb.com/api.php?amount=10&category=9&difficulty=medium';
      if (selectedCategory) {
        url += `&category=${selectedCategory}`;
      }
      const res = await fetch(url);
      const data = await res.json();
      const formattedData = data.results.map((q, idx) => ({
        id: idx,
        question: q.question,
        correct_answer: q.correct_answer,
        answers: shuffle([...q.incorrect_answers, q.correct_answer]),
      }));
      setQuizData(formattedData);
      setStart(true);
    } catch {
      setError('Failed to fetch quiz questions.');
    } finally {
      setLoading(false);
    }
  };

  const shuffle = (array) => array.sort(() => Math.random() - 0.5);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-neutral-900 text-white">
      <div className="bg-[#1e202c] shadow-lg rounded-2xl p-10 max-w-md w-full mx-4 text-center space-y-6">
        <h1 className="text-4xl font-extrabold text-[#60519b]">Interactive Quiz</h1>
        <p className="text-slate-300 text-md">
          Test your knowledge with 10 fun trivia questions. Choose a category and click below to begin!
        </p>

        <select
          className="w-full p-3 rounded-xl bg-gray-800 text-white mb-4"
          value={selectedCategory}
          onChange={e => setSelectedCategory(e.target.value)}
        >
          <option value="">Any Category</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>

        <button
          onClick={fetchQuestions}
          disabled={loading}
          className="w-full bg-[#60519b] hover:bg-[#31323e] text-white py-3 rounded-xl text-lg font-medium transition duration-300"
        >
          {loading ? 'Loading...' : 'Start Quiz'}
        </button>

        {error && <p className="text-red-400 mt-2">{error}</p>}
      </div>
    </div>
  );
};

export default Home;
