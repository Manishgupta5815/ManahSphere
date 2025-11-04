import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";
import {
  Brain,
  Lock,
  MessageSquareHeart,
  Sparkles,
  Users,
  Star,
  Clock,
} from "lucide-react";
import heroImg from "../assets/mindease-hero.png";

// Reusable Scroll Animation Wrapper
const ScrollFadeIn = ({ children, delay = 0 }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.15, triggerOnce: true });

  if (inView) controls.start("visible");

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 60 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.8, delay }}
    >
      {children}
    </motion.div>
  );
};

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fdfdff] via-[#f9fbff] to-white font-['Inter'] text-gray-800 overflow-hidden">
      {/* === HERO SECTION (UPDATED CTA to Chat Page) === */}
      <section
        id="home"
        className="flex flex-col md:flex-row items-center justify-between px-8 md:px-20 py-28 max-w-7xl mx-auto gap-10"
      >
        <ScrollFadeIn>
          <div className="max-w-xl">
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6 tracking-tight">
              Find{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                Peace
              </span>{" "}
              with
              <br /> AI-Powered Clarity
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              MindScape helps you understand your emotions, track your mood, and feel
              supported — combining empathy with AI to make mental wellness simple,
              private, and empowering.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/journal"
                className="px-8 py-4 text-lg font-semibold rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:shadow-2xl transition-transform hover:scale-105"
              >
                Start Your Journey
              </Link>
              <a
                href="#how"
                className="px-8 py-4 text-lg font-semibold rounded-full border-2 border-blue-600 text-blue-600 hover:bg-blue-50 transition-all cursor-pointer"
              >
                Learn How It Works
              </a>
            </div>
          </div>
        </ScrollFadeIn>

        {/* RIGHT SIDE HERO IMAGE */}
        <ScrollFadeIn delay={0.2}>
          <div className="flex-1 flex justify-center md:justify-end">
            <img
              src={heroImg}
              alt="MindScape AI Illustration"
              className="w-[420px] md:w-[480px] drop-shadow-2xl"
            />
          </div>
        </ScrollFadeIn>
      </section>

      {/* === FEATURES SECTION (6 CARDS) === */}
      <section id="features" className="px-8 md:px-20 py-20 bg-white">
        <ScrollFadeIn>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Why{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              MindScape?
            </span>
          </h2>
        </ScrollFadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {[
            {
              icon: <Brain className="w-12 h-12 text-blue-600 mx-auto mb-4" />,
              title: "AI-Powered Intelligence",
              desc: "Gain emotional insights through advanced AI trained in therapeutic reflection.",
            },
            {
              icon: <Lock className="w-12 h-12 text-purple-600 mx-auto mb-4" />,
              title: "Private & Secure",
              desc: "Your thoughts stay yours — fully encrypted and protected within MindScape.",
            },
            {
              icon: <MessageSquareHeart className="w-12 h-12 text-pink-600 mx-auto mb-4" />,
              title: "Empathetic Chat",
              desc: "Converse with an AI that listens with empathy, not judgment, offering personalized care.",
            },
            {
              icon: <Clock className="w-12 h-12 text-cyan-600 mx-auto mb-4" />,
              title: "24/7 Availability",
              desc: "Access your personal wellness space any time — no waiting, no restrictions.",
            },
            {
              icon: <MessageSquareHeart className="w-12 h-12 text-green-600 mx-auto mb-4" />,
              title: "Personalized Support",
              desc: "Your journaling experience adapts to your emotional tone and mental health needs.",
            },
            {
              icon: <Lock className="w-12 h-12 text-orange-500 mx-auto mb-4" />,
              title: "Evidence-Based",
              desc: "Built on proven psychological models to promote healthy coping and self-awareness.",
            },
          ].map(({ icon, title, desc }, i) => (
            <ScrollFadeIn delay={i * 0.1} key={title}>
              <motion.div
                whileHover={{ y: -6 }}
                className="p-8 bg-gradient-to-br from-blue-50 to-white rounded-2xl shadow-lg hover:shadow-2xl transition-all border border-gray-100 text-center"
              >
                {icon}
                <h3 className="text-xl font-semibold mb-2 text-gray-800">{title}</h3>
                <p className="text-gray-600">{desc}</p>
              </motion.div>
            </ScrollFadeIn>
          ))}
        </div>
      </section>

      {/* === HOW IT WORKS === */}
      <section
        id="how"
        className="px-8 md:px-20 py-20 bg-gradient-to-b from-blue-50 via-purple-50 to-white text-center"
      >
        <ScrollFadeIn>
          <h2 className="text-3xl md:text-4xl font-bold mb-14">How It Works</h2>
        </ScrollFadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {[
            {
              icon: <Sparkles className="w-10 h-10 text-blue-600 mx-auto mb-4" />,
              title: "Step 1: Reflect",
              desc: "Write how you're feeling — be honest and expressive.",
            },
            {
              icon: <Brain className="w-10 h-10 text-purple-600 mx-auto mb-4" />,
              title: "Step 2: Analyze",
              desc: "Our AI detects your emotional tone and suggests healthy coping actions.",
            },
            {
              icon: (
                <MessageSquareHeart className="w-10 h-10 text-pink-600 mx-auto mb-4" />
              ),
              title: "Step 3: Grow",
              desc: "View your emotional trends over time and feel more self-aware.",
            },
          ].map(({ icon, title, desc }, i) => (
            <ScrollFadeIn delay={i * 0.2} key={title}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white/80 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all border border-gray-200"
              >
                {icon}
                <h3 className="text-lg font-semibold mb-2">{title}</h3>
                <p className="text-gray-600">{desc}</p>
              </motion.div>
            </ScrollFadeIn>
          ))}
        </div>
      </section>

      {/* === TESTIMONIALS === */}
      <section id="testimonials" className="px-8 md:px-20 py-20 bg-white text-center">
        <ScrollFadeIn>
          <h2 className="text-3xl md:text-4xl font-bold mb-14">What Users Say</h2>
        </ScrollFadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {[
            {
              name: "Riya Sharma",
              text: "MindScape helped me identify stress patterns and take control of my emotions. It's like having a therapist in my pocket.",
              stars: 5,
            },
            {
              name: "Arjun Patel",
              text: "The journaling interface is calming and beautiful. I love how the AI gently suggests mindfulness exercises.",
              stars: 5,
            },
            {
              name: "Sneha Verma",
              text: "Finally an app that respects privacy and genuinely helps. I feel lighter after using it daily.",
              stars: 5,
            },
          ].map(({ name, text, stars }, i) => (
            <ScrollFadeIn delay={i * 0.2} key={name}>
              <motion.div
                whileHover={{ y: -4 }}
                className="p-8 bg-gradient-to-br from-blue-50 to-white rounded-2xl shadow-md hover:shadow-xl border border-gray-100 transition-all"
              >
                <Users className="w-10 h-10 text-blue-600 mx-auto mb-4" />
                <p className="text-gray-600 italic mb-4">“{text}”</p>
                <div className="flex justify-center mb-2">
                  {[...Array(stars)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-yellow-400"
                      fill="currentColor"
                    />
                  ))}
                </div>
                <h4 className="font-semibold text-gray-800">{name}</h4>
              </motion.div>
            </ScrollFadeIn>
          ))}
        </div>
      </section>

      {/* === FINAL CTA SECTION === */}
      <section
        id="cta"
        className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center py-20"
      >
        <ScrollFadeIn>
          <div className="max-w-2xl mx-auto px-6">
            <h2 className="text-4xl font-bold mb-6">
              Start Your MindScape Journey Today
            </h2>
            <p className="text-lg mb-8 text-blue-100">
              Take the first step towards emotional clarity and balanced living.
              Your mind deserves care.
            </p>
            <Link
              to="/signup"
              className="px-10 py-4 text-lg font-semibold rounded-full bg-white text-blue-700 shadow-lg hover:shadow-2xl transition-transform hover:scale-105"
            >
              Join for Free
            </Link>
          </div>
        </ScrollFadeIn>
      </section>

      {/* === FOOTER === */}
      <footer
        id="footer"
        className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-10 text-center"
      >
        <h4 className="font-semibold text-lg mb-2">
          MindScape — Where Tech Meets Empathy 💙
        </h4>
        <p className="text-sm opacity-90 mb-1">
          ⚠ MindScape provides emotional insights, not medical diagnosis.
        </p>
        <p className="text-sm opacity-90">
          In distress? Contact AASRA Helpline (India): 91-9820466726 | Global:
          findahelpline.com
        </p>
      </footer>
    </div>
  );
};

export default Home;
