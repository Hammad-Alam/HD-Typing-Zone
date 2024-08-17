import React from "react";

function QuestionAnswer({ question, answer }) {
  return (
    <div className="bg-white p-5 rounded-lg shadow-md">
      <p className="text-2xl font-semibold">{question}</p>
      <span className="text-slate-500">{answer}</span>
    </div>
  );
}

export default QuestionAnswer;
