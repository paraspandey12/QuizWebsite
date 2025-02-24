import React, { useState } from "react";

const QuizList = ({ data, onAnswerChange }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionChange = (option) => {
    setSelectedOption(option);
    onAnswerChange(data._id, option); 
  };

  return (
    <div className="bg-[#5260B6] shadow-md rounded-lg p-4 mb-4 border border-gray-200">
      <p className="text-medium text-black">{data.difficulty}</p>
      <h2 className="text-xl font-semibold text-gray-800 mt-1">{data.question}</h2>

      <ul className="mt-2">
        {data.options?.map((option, index) => (
          <li key={index} className="flex items-center space-x-2 p-2 rounded-md cursor-pointer transition-all duration-200 bg-gray-100 hover:bg-gray-200">
            <input
              type="radio"
              name={`question-${data._id}`} 
              value={option}
              checked={selectedOption === option}
              onChange={() => handleOptionChange(option)}
              className="mr-2"
            />
            <span>{option}</span>
          </li>
        ))}
      </ul>

      {selectedOption && (
        <p className={`mt-3 text-sm font-bold ${selectedOption === data.correctAnswer ? "text-green-600" : "text-red-600"}`}>
          {selectedOption === data.correctAnswer ? "✅ Correct!" : `❌ Incorrect. Correct Answer: ${data.correctAnswer}`}
        </p>
      )}
    </div>
  );
};

export default QuizList;
