import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Brain, TrendingUp, Heart, Lightbulb } from "lucide-react";

/**
 * Updated CheckupResults
 *
 * Expects location.state (from the checkup flow) to include:
 * {
 *   phqScore,      // number 0..27
 *   gadScore,      // number 0..21
 *   whoPercent,    // number 0..100
 *   phq9Q9,        // number 0..3 (PHQ-9 item 9)
 *   phqAnswers,    // optional array
 *   gadAnswers,    // optional array
 *   whoAnswers     // optional array
 * }
 *
 * Notes:
 * - This component is screening-only (not a diagnosis).
 * - If phq9Q9 > 0, we surface an urgent alert and advise immediate help.
 * - If location.state is missing, safe defaults are used and the UI prompts re-taking the checkup.
 */

const CheckupResults = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    phqScore = null,
    gadScore = null,
    whoPercent = null,
    phq9Q9 = 0,
    phqAnswers = [],
    gadAnswers = [],
    whoAnswers = [],
  } = (location && location.state) || {};

  // helper: safe numeric defaults
  const phq = typeof phqScore === "number" ? phqScore : 0;
  const gad = typeof gadScore === "number" ? gadScore : 0;
  const who = typeof whoPercent === "number" ? whoPercent : 100;
  const phq9 = typeof phq9Q9 === "number" ? phq9Q9 : 0;

  // PHQ-9 severity mapping
  const getPhqSeverity = (score) => {
    if (score >= 20) return { label: "Severe", color: "text-red-600", bg: "bg-red-100" };
    if (score >= 15) return { label: "Moderately severe", color: "text-orange-600", bg: "bg-orange-100" };
    if (score >= 10) return { label: "Moderate", color: "text-yellow-700", bg: "bg-yellow-100" };
    if (score >= 5) return { label: "Mild", color: "text-blue-600", bg: "bg-blue-100" };
    return { label: "Minimal", color: "text-green-600", bg: "bg-green-100" };
  };

  // GAD-7 severity mapping
  const getGadSeverity = (score) => {
    if (score >= 15) return { label: "Severe", color: "text-red-600", bg: "bg-red-100" };
    if (score >= 10) return { label: "Moderate", color: "text-yellow-700", bg: "bg-yellow-100" };
    if (score >= 5) return { label: "Mild", color: "text-blue-600", bg: "bg-blue-100" };
    return { label: "Minimal", color: "text-green-600", bg: "bg-green-100" };
  };

  // WHO-5 wellbeing mapping
  const getWhoWellbeing = (percent) => {
    if (percent <= 50) return { label: "Low wellbeing", color: "text-red-600", bg: "bg-red-100" };
    if (percent <= 70) return { label: "Moderate wellbeing", color: "text-yellow-700", bg: "bg-yellow-100" };
    return { label: "Good wellbeing", color: "text-green-600", bg: "bg-green-100" };
  };

  const phqSeverity = getPhqSeverity(phq);
  const gadSeverity = getGadSeverity(gad);
  const whoSeverity = getWhoWellbeing(who);

  // Combined severity metric (PHQ-ADS)
  const phqAds = phq + gad; // range 0..48

  // Build tailored recommendations (simple rule-based)
  const recommendations = [];

  if (phq >= 15 || gad >= 15 || phqAds >= 30) {
    recommendations.push({
      title: "Seek professional support",
      description:
        "Your scores are in a high/severe range for symptoms. Please consider contacting a mental health professional for assessment and treatment options (therapy, medication evaluation).",
    });
  } else if (phq >= 10 || gad >= 10 || phqAds >= 20) {
    recommendations.push({
      title: "Consider brief interventions",
      description:
        "Your scores indicate moderate symptoms. Low-intensity interventions (structured self-help, guided CBT apps) and a clinical check-in may be beneficial.",
    });
  } else {
    recommendations.push({
      title: "Maintain and strengthen healthy habits",
      description:
        "Your screening shows minimal/mild symptoms. Maintain regular sleep, physical activity, social connection and mindful practices to support wellbeing.",
    });
  }

  // Always include wellbeing + connection recommendation
  recommendations.push({
    title: "Build wellbeing",
    description:
      who <= 50
        ? "Your WHO-5 score suggests low wellbeing. Increase activities that bring pleasure and meaning, and consider scheduling small achievable goals each day."
        : "Keep up activities that support wellbeing — maintain routines, social contact, and enjoyable/hobby time.",
  });

  // Suicide / self-harm risk alert if PHQ-9 item 9 > 0
  const suicideAlert = phq9 > 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fdfdff] via-[#f9fbff] to-white">
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* If no meaningful state was passed, show a prompt */}
        {location == null || location.state == null ? (
          <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6 mb-6 text-yellow-800">
            <strong>No checkup data found.</strong>{" "}
            It looks like you arrived at this page without completing the checkup. Please take the checkup to get a personalized report.
            <div className="mt-4 flex gap-3">
              <button
                onClick={() => navigate("/mental-checkup")}
                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg"
              >
                Take Check-up
              </button>
              <button
                onClick={() => navigate("/feed")}
                className="px-4 py-2 border border-gray-200 rounded-lg"
              >
                Return to Feed
              </button>
            </div>
          </div>
        ) : null}

        {/* Urgent alert for suicidal ideation */}
        {suicideAlert && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-800">
            <strong>Immediate attention recommended:</strong>{" "}
            Your responses show some level of suicidal thoughts. If you are in danger or may act on these thoughts, contact emergency services or a crisis line immediately. If you're able, reach out to someone you trust now.
            <div className="mt-3 flex gap-3">
              <button
                onClick={() => {
                  /* If you'd like, wire this to open a crisis modal or provide local numbers on your deployment. */
                  navigate("/help");
                }}
                className="px-3 py-2 bg-red-600 text-white rounded-lg"
              >
                Get support options
              </button>
              <button
                onClick={() => navigate("/mental-checkup")}
                className="px-3 py-2 border border-red-200 rounded-lg"
              >
                Re-take checkup
              </button>
            </div>
          </div>
        )}

        {/* Summary cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm text-center">
            <div className={`${phqSeverity.bg} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3`}>
              <Brain size={28} className={phqSeverity.color} />
            </div>
            <h3 className="font-semibold text-gray-800">Depression (PHQ-9)</h3>
            <div className="text-2xl font-bold text-gray-800 mt-2">
              {typeof phqScore === "number" ? `${phq} / 27` : "—"}
            </div>
            <div className={`mt-2 ${phqSeverity.color}`}>{phqSeverity.label}</div>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm text-center">
            <div className={`${gadSeverity.bg} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3`}>
              <TrendingUp size={28} className={gadSeverity.color} />
            </div>
            <h3 className="font-semibold text-gray-800">Anxiety (GAD-7)</h3>
            <div className="text-2xl font-bold text-gray-800 mt-2">
              {typeof gadScore === "number" ? `${gad} / 21` : "—"}
            </div>
            <div className={`mt-2 ${gadSeverity.color}`}>{gadSeverity.label}</div>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm text-center">
            <div className={`${whoSeverity.bg} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3`}>
              <Heart size={28} className={whoSeverity.color} />
            </div>
            <h3 className="font-semibold text-gray-800">Wellbeing (WHO-5)</h3>
            <div className="text-2xl font-bold text-gray-800 mt-2">
              {typeof whoPercent === "number" ? `${who}%` : "—"}
            </div>
            <div className={`mt-2 ${whoSeverity.color}`}>{whoSeverity.label}</div>
          </div>
        </div>

        {/* Detailed interpretation & recommendations */}
        <div className="bg-white border border-gray-200 rounded-2xl p-8 mb-6 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-800 mb-3">What this means</h2>

          <p className="text-gray-600 mb-4">
            The screening tools used (PHQ-9, GAD-7, WHO-5) are validated instruments commonly used to screen for depressive symptoms, anxiety symptoms and overall wellbeing. These are screening tools only and not a substitute for a clinical assessment.
          </p>

          <div className="grid gap-4">
            {recommendations.map((rec, i) => (
              <div key={i} className="bg-gray-50 rounded-xl p-5">
                <div className="flex items-start gap-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 mb-1">{rec.title}</h3>
                    <p className="text-gray-600 text-sm">{rec.description}</p>
                  </div>
                </div>
              </div>
            ))}

            {/* Practical next steps */}
            <div className="bg-gray-50 rounded-xl p-5">
              <h3 className="font-semibold text-gray-800 mb-2">Practical next steps</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-1 text-sm">
                <li>If you have severe symptoms or are in crisis, contact emergency services immediately.</li>
                <li>Consider scheduling an appointment with a mental health professional for a full assessment.</li>
                <li>Try short evidence-based activities: 10 minutes of daily mindfulness, gentle exercise, sleep routine and small pleasurable activities.</li>
                <li>Share results with a trusted person if you feel comfortable — social support helps.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white text-center shadow-md">
          <h2 className="text-2xl font-bold mb-3">Next steps</h2>
          <p className="mb-4 opacity-90">
            Use this report to inform a conversation with a clinician. If you feel unsafe or are in crisis, contact emergency services now.
          </p>

          <div className="flex gap-4 justify-center flex-wrap">
            <button
              onClick={() => navigate("/feed")}
              className="px-6 py-3 bg-white text-blue-700 rounded-lg font-medium hover:bg-opacity-90 transition"
            >
              Return to Feed
            </button>
            <button
              onClick={() => navigate("/mental-checkup")}
              className="px-6 py-3 bg-white/10 backdrop-blur-sm text-white border border-white/20 rounded-lg font-medium hover:bg-white/20 transition"
            >
              Take Again
            </button>
            <button
              onClick={() => navigate("/help")}
              className="px-6 py-3 bg-white/20 text-white border border-white/30 rounded-lg font-medium hover:bg-white/25 transition"
            >
              Find Support
            </button>
          </div>
        </div>

        {/* Small references */}
        <div className="text-xs text-gray-500 mt-4">
          Screening tools used: PHQ-9, GAD-7, WHO-5. These are screening instruments only and are not a substitute for clinical assessment.
        </div>
      </div>
    </div>
  );
};

export default CheckupResults;
