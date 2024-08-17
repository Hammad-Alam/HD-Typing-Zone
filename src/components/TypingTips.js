import React from "react";
import { Tips } from "../helpers/Tips";

function TypingTips() {
  return (
    <div className="bg-[#C2E1FE] my-10 py-10 px-5 gap-10 space-y-10">
      <p className="font-bold text-3xl text-gray-800 mb-4">
        Improve Your Typing Skills with Our Expert Tips!
      </p>
      <span className="text-justify text-lg text-gray-600 leading-relaxed">
        In today's digital age, typing is an essential skill that can greatly
        impact your productivity, efficiency, and overall computer experience.
        Whether you're a student, professional, or simply looking to improve
        your typing skills, we've got you covered.
      </span>
      <p className="mt-8 pb-4 font-bold text-3xl text-gray-800">
        Mastering typing takes practice, but with the right techniques and
        strategies, you can become a typing pro in no time!
      </p>
      <span className="text-lg text-gray-600 leading-relaxed">
        Below, we've compiled a list of expert-approved typing tips to help you:
      </span>
      {Tips.map((item, index) => (
        <div
          key={index}
          className="bg-white rounded-lg shadow-lg my-8 space-y-4 p-5 flex flex-col md:flex-row "
        >
          <img
            src={item.image}
            alt={item.title}
            className="w-full md:w-1/2 rounded-lg shadow-md p-4"
          />
          <div className="mx-5 flex-1">
            <p className="text-2xl font-bold text-gray-800">{item.title}</p>
            <span className="text-slate-500 leading-relaxed">{item.tip}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TypingTips;
