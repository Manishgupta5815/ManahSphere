import React, { useState } from "react";
import { Brain, ChevronRight, Check, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const phq9 = [
  "Little interest or pleasure in doing things",
  "Feeling down, depressed, or hopeless",
  "Trouble falling or staying asleep, or sleeping too much",
  "Feeling tired or having little energy",
  "Poor appetite or overeating",
  "Feeling bad about yourself — or that you are a failure or have let yourself or your family down",
  "Trouble concentrating on things, such as reading or watching television",
  "Moving or speaking slowly—or being so restless that others noticed",
  "Thoughts that you would be better off dead or of hurting yourself in some way",
];

const gad7 = [
  "Feeling nervous, anxious or on edge",
  "Not being able to stop or control worrying",
  "Worrying too much about different things",
  "Trouble relaxing",
  "Being so restless that it's hard to sit still",
  "Becoming easily annoyed or irritable",
  "Feeling afraid as if something awful might happen",
];

const who5 = [
  "I have felt cheerful and in good spirits",
  "I have felt calm and relaxed",
  "I have felt active and vigorous",
  "I woke up feeling fresh and rested",
  "My daily life has been filled with things that interest me",
];

const phqOptions = ["Not at all", "Several days", "More than half the days", "Nearly every day"];
const whoOptions = [
  "At no time",
  "Some of the time",
  "Less than half the time",
  "More than half the time",
  "Most of the time",
  "All of the time",
];

const MentalCheckup = () => {
  const navigate = useNavigate();
  const [stage, setStage] = useState("intro");
  const [phqAnswers, setPhqAnswers] = useState(Array(phq9.length).fill(null));
  const [gadAnswers, setGadAnswers] = useState(Array(gad7.length).fill(null));
  const [whoAnswers, setWhoAnswers] = useState(Array(who5.length).fill(null));
  const [currentIndex, setCurrentIndex] = useState(0);

  const setAnswer = (setFn, arr, idx, val) => {
    const updated = [...arr];
    updated[idx] = val;
    setFn(updated);
  };

  const startPHQ = () => {
    setStage("phq9");
    setCurrentIndex(0);
  };
  const openGAD = () => {
    setStage("gad7");
    setCurrentIndex(0);
  };
  const openWHO = () => {
    setStage("who5");
    setCurrentIndex(0);
  };

  const complete = () => {
    const phqScore = phqAnswers.reduce((a, b) => a + (b ?? 0), 0);
    const gadScore = gadAnswers.reduce((a, b) => a + (b ?? 0), 0);
    const whoRaw = whoAnswers.reduce((a, b) => a + (b ?? 0), 0);
    const whoPercent = Math.round((whoRaw / 25) * 100);
    const phq9Q9 = phqAnswers[8] ?? 0;

    navigate("/checkup-results", {
      state: { phqScore, gadScore, whoPercent, phq9Q9 },
    });
  };

  const handleBack = () => {
    // back behavior for each stage
    if (stage === "intro") {
      navigate(-1);
    } else if (stage === "phq9") {
      if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
      else setStage("intro");
    } else if (stage === "gad7") {
      if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
      else setStage("phq9");
    } else if (stage === "who5") {
      if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
      else setStage("gad7");
    }
  };

  const QuestionCard = ({ title, items, answers, options, setAnswers }) => (
    <div className="min-h-screen bg-gradient-to-b from-[#fdfdff] via-[#f9fbff] to-white relative">
      {/* Back Button */}
      <button
        onClick={handleBack}
        className="absolute top-6 left-6 flex items-center gap-2 px-4 py-2 text-gray-500 hover:text-gray-800 transition-colors"
      >
        <ArrowLeft size={20} />
        <span className="font-medium">Back</span>
      </button>

      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-800 mb-8">{title}</h2>

          <p className="text-lg text-gray-700 mb-4">{items[currentIndex]}</p>

          <div className="space-y-3">
            {options.map((opt, i) => (
              <button
                key={i}
                onClick={() => {
                  setAnswer(setAnswers, answers, currentIndex, i);
                  if (currentIndex < items.length - 1) {
                    setCurrentIndex(currentIndex + 1);
                  } else {
                    if (stage === "phq9") openGAD();
                    else if (stage === "gad7") openWHO();
                    else if (stage === "who5") complete();
                  }
                }}
                className="w-full text-left px-6 py-4 rounded-xl border-2 border-gray-200 hover:border-blue-600 hover:bg-blue-50 transition-all group"
              >
                <span className="text-lg text-gray-700 group-hover:text-blue-600 transition-colors">
                  {opt}
                </span>
              </button>
            ))}
          </div>

          <div className="flex justify-between mt-6">
            <span className="text-sm text-gray-500">
              Question {currentIndex + 1} of {items.length}
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  // === RENDER STAGES ===
  if (stage === "intro") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#fdfdff] via-[#f9fbff] to-white flex items-center justify-center relative">
        {/* Back Button */}
        <button
          onClick={handleBack}
          className="absolute top-6 left-6 flex items-center gap-2 px-4 py-2 text-gray-500 hover:text-gray-800 transition-colors"
        >
          <ArrowLeft size={20} />
          <span className="font-medium">Back</span>
        </button>

        <div className="max-w-2xl mx-auto px-6">
          <div className="bg-white border border-gray-200 rounded-2xl p-8 text-center shadow-sm">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Brain size={40} className="text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              Mental Wellness Check-up
            </h1>
            <p className="text-gray-500 text-lg mb-8">
              This short, research-based check-up uses PHQ-9, GAD-7, and WHO-5 questionnaires to assess mood, anxiety, and overall wellbeing.
            </p>

            <div className="bg-gray-50 rounded-xl p-6 mb-8 text-left border border-gray-100">
              <h3 className="font-semibold text-gray-800 mb-3">
                What to expect:
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <Check size={20} className="text-green-600 mt-0.5" />
                  <span>15–20 quick questions about your recent feelings</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check size={20} className="text-green-600 mt-0.5" />
                  <span>Takes 5–10 minutes to complete</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check size={20} className="text-green-600 mt-0.5" />
                  <span>Completely private and secure</span>
                </li>
              </ul>
            </div>

            <button
              onClick={startPHQ}
              className="w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold text-lg hover:opacity-90 transition flex items-center justify-center gap-2"
            >
              Start Check-up <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (stage === "phq9") {
    return (
      <QuestionCard
        title="PHQ-9 — Over the last 2 weeks, how often have you been bothered by the following?"
        items={phq9}
        answers={phqAnswers}
        options={phqOptions}
        setAnswers={setPhqAnswers}
      />
    );
  }

  if (stage === "gad7") {
    return (
      <QuestionCard
        title="GAD-7 — Over the last 2 weeks, how often have you been bothered by the following?"
        items={gad7}
        answers={gadAnswers}
        options={phqOptions}
        setAnswers={setGadAnswers}
      />
    );
  }

  if (stage === "who5") {
    return (
      <QuestionCard
        title="WHO-5 — How well have you felt over the last 2 weeks?"
        items={who5}
        answers={whoAnswers}
        options={whoOptions}
        setAnswers={setWhoAnswers}
      />
    );
  }

  return null;
};

export default MentalCheckup;
