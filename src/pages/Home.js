import React from "react";
import heroimage from "../assets/hero-img.gif";
import { faqData } from "../helpers/FAQList";
import QuestionAnswer from "../components/QuestionAnswer";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const getStarted = () => {
    navigate("/typing-world/basic");
  };

  return (
    <div>
      <div className="slider flex flex-col-reverse lg:flex-row ">
        <div className="px-5 left xxl:pl-28 flex flex-col justify-center items-center md:items-baseline py-10 xsm:bg-white lg:bg-[#C2E1FE]">
          <h1 className="text-3xl font-semibold">
            Learn Touch Typing for Free! 💻
          </h1>
          <p className="msm:mx-auto xsm:ml-0 mt-4 mb-2 text-slate-500 text-sm">
            What is HD Typing Zone?
          </p>
          <p className="mb-4 text-2xl">
            HD Typing Zone is the most effective way to learn how to type.
          </p>
          <span className="text-slate-500 text-sm mb-4">
            Unlock efficient typing skills with HD Typing Zone, a complimentary
            online resource. This innovative platform empowers individuals to
            master typing. Enjoy limitless access to interactive exercises,
            absolutely free!
          </span>
          <button
            onClick={getStarted}
            className="border-transparent bg-[#DC2620] hover:bg-red-800 text-white p-2 font-semibold"
          >
            Get Started
          </button>
        </div>
        <div className="right">
          <img
            className="md:w-[100%] lg:w-[800px] h-96"
            src={heroimage}
            alt=""
          />
        </div>
      </div>

      <div className="bg-slate-100 my-10 py-10 px-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {faqData.map((item, index) => (
          <QuestionAnswer
            key={index}
            question={item.question}
            answer={item.answer}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
