import React, { useState, useEffect } from "react";
import { ArrowRight, Sparkles, Check } from "lucide-react";
import { NavLink } from "react-router-dom";

const ProductLandingPage: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Header */}
      <nav
        className="px-6 py-6 border-b border-zinc-900/30 backdrop-blur-sm bg-black/80"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0)" : "translateY(-20px)",
          transition: "all 0.8s ease-out",
        }}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-1">
            <svg
              className="h-8 w-8 text-primary"
              fill="none"
              viewBox="0 0 48 48"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clip-rule="evenodd"
                d="M39.475 21.6262C40.358 21.4363 40.6863 21.5589 40.7581 21.5934C40.7876 21.655 40.8547 21.857 40.8082 22.3336C40.7408 23.0255 40.4502 24.0046 39.8572 25.2301C38.6799 27.6631 36.5085 30.6631 33.5858 33.5858C30.6631 36.5085 27.6632 38.6799 25.2301 39.8572C24.0046 40.4502 23.0255 40.7407 22.3336 40.8082C21.8571 40.8547 21.6551 40.7875 21.5934 40.7581C21.5589 40.6863 21.4363 40.358 21.6262 39.475C21.8562 38.4054 22.4689 36.9657 23.5038 35.2817C24.7575 33.2417 26.5497 30.9744 28.7621 28.762C30.9744 26.5497 33.2417 24.7574 35.2817 23.5037C36.9657 22.4689 38.4054 21.8562 39.475 21.6262ZM4.41189 29.2403L18.7597 43.5881C19.8813 44.7097 21.4027 44.9179 22.7217 44.7893C24.0585 44.659 25.5148 44.1631 26.9723 43.4579C29.9052 42.0387 33.2618 39.5667 36.4142 36.4142C39.5667 33.2618 42.0387 29.9052 43.4579 26.9723C44.1631 25.5148 44.659 24.0585 44.7893 22.7217C44.9179 21.4027 44.7097 19.8813 43.5881 18.7597L29.2403 4.41187C27.8527 3.02428 25.8765 3.02573 24.2861 3.36776C22.6081 3.72863 20.7334 4.58419 18.8396 5.74801C16.4978 7.18716 13.9881 9.18353 11.5858 11.5858C9.18354 13.988 7.18717 16.4978 5.74802 18.8396C4.58421 20.7334 3.72865 22.6081 3.36778 24.2861C3.02574 25.8765 3.02429 27.8527 4.41189 29.2403Z"
                fill="currentColor"
                fill-rule="evenodd"
              ></path>
            </svg>
            <span className="text-xl tracking-wide">Sketch2UI</span>
          </div>
          <div className="flex items-center space-x-8">
            <NavLink to={"/login"}>
              <button className="text-sm text-zinc-300 hover:text-white transition-all duration-300 font-light hover:scale-105">
                Sign in
              </button>
            </NavLink>
            <NavLink to={"/login"}>
              <button className="bg-white text-black px-6 py-2.5 rounded-full text-sm font-medium hover:bg-zinc-50 transition-all duration-300 hover:shadow-lg hover:scale-105">
                Get Started
              </button>
            </NavLink>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="px-6 pt-32 pb-24 relative">
        {/* Enhanced Gray Spotlight effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Primary spotlight on main text */}
          <div
            className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full bg-gradient-radial from-zinc-800/40 via-zinc-900/20 to-transparent blur-3xl"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: `translate(-50%, -50%) scale(${isVisible ? 1 : 0.3})`,
              transition: "all 2s cubic-bezier(0.25, 0.4, 0.25, 1)",
            }}
          ></div>

          {/* Secondary ambient glow */}
          <div
            className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-white/[0.02] blur-2xl"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: `translate(-50%, -50%) scale(${isVisible ? 1 : 0.5})`,
              transition: "all 2.5s cubic-bezier(0.25, 0.4, 0.25, 1) 0.3s",
            }}
          ></div>

          {/* Floating particles */}
          <div className="absolute inset-0">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-zinc-600 rounded-full opacity-40"
                style={{
                  left: `${20 + Math.random() * 60}%`,
                  top: `${20 + Math.random() * 60}%`,
                  animation: isVisible
                    ? `float ${3 + Math.random() * 2}s ease-in-out infinite ${
                        Math.random() * 2
                      }s`
                    : "none",
                }}
              />
            ))}
          </div>
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(40px)",
              transition: "all 1.2s cubic-bezier(0.25, 0.4, 0.25, 1)",
            }}
          >
            <h1
              className="text-6xl md:text-8xl  tracking-tight mb-8 leading-tight relative"
              style={{
                background:
                  "linear-gradient(135deg, #ffffff 0%, #e4e4e7 50%, #a1a1aa 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                opacity: isVisible ? 1 : 0,
                transform: isVisible
                  ? "translateY(0) scale(1)"
                  : "translateY(60px) scale(0.9)",
                transition: "all 1.5s cubic-bezier(0.25, 0.4, 0.25, 1) 0.3s",
              }}
            >
              From sketch to code
              <span
                className="block"
                style={{
                  background:
                    "linear-gradient(135deg, #71717a 0%, #52525b 100%)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "translateY(0)" : "translateY(30px)",
                  transition: "all 1.2s cubic-bezier(0.25, 0.4, 0.25, 1) 0.6s",
                }}
              >
                in seconds
              </span>
            </h1>

            <p
              className="text-lg text-zinc-300 mb-10 max-w-2xl mx-auto leading-relaxed"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(30px)",
                transition: "all 1s cubic-bezier(0.25, 0.4, 0.25, 1) 0.9s",
              }}
            >
              Transform wireframes into production-ready React components with
              AI. Clean, efficient, and ready to deploy.
            </p>

            <NavLink to={"/login"}>
              <button
                className="bg-white text-black px-10 py-4 rounded-full font-medium hover:bg-zinc-50 transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] inline-flex items-center group relative overflow-hidden"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "translateY(0)" : "translateY(30px)",
                  transition: "all 1s cubic-bezier(0.25, 0.4, 0.25, 1) 1.2s",
                }}
              >
                <span className="relative z-10">Start building free</span>
                <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform duration-300 relative z-10" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out" />
              </button>
            </NavLink>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section
        className="px-6 py-20"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0)" : "translateY(50px)",
          transition: "all 1s cubic-bezier(0.25, 0.4, 0.25, 1) 1.5s",
        }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-medium mb-4">
              Simple pricing
            </h2>
            <p className="text-xl text-zinc-400">
              Start free, upgrade when you're ready
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Free */}
            <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-8 hover:border-zinc-700 transition-all duration-500 hover:transform hover:scale-[1.02] hover:shadow-xl">
              <h3 className="text-xl font-medium mb-2">Starter</h3>
              <div className="text-3xl font-medium mb-1">Free</div>
              <p className="text-zinc-400 text-sm mb-8">
                Perfect for trying out
              </p>

              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-sm">
                  <Check className="w-4 h-4 text-green-500 mr-3" />5 projects
                  per month
                </li>
                <li className="flex items-center text-sm">
                  <Check className="w-4 h-4 text-green-500 mr-3" />
                  Basic components
                </li>
                <li className="flex items-center text-sm">
                  <Check className="w-4 h-4 text-green-500 mr-3" />
                  HTML/CSS export
                </li>
              </ul>

              <button className="w-full py-3 border border-zinc-700 rounded-lg hover:border-zinc-600 transition-all duration-300 hover:bg-zinc-900/50">
                Get started
              </button>
            </div>

            {/* Pro */}
            <div className="bg-white text-black rounded-2xl p-8 relative transform scale-105 hover:scale-110 transition-all duration-500 hover:shadow-2xl">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-black text-white px-3 py-1 rounded-full text-xs">
                Most popular
              </div>
              <h3 className="text-xl font-medium mb-2">Professional</h3>
              <div className="text-3xl font-medium mb-1">
                $29<span className="text-base text-zinc-600">/month</span>
              </div>
              <p className="text-zinc-600 text-sm mb-8">For serious builders</p>

              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-sm">
                  <Check className="w-4 h-4 text-green-600 mr-3" />
                  Unlimited projects
                </li>
                <li className="flex items-center text-sm">
                  <Check className="w-4 h-4 text-green-600 mr-3" />
                  Advanced components
                </li>
                <li className="flex items-center text-sm">
                  <Check className="w-4 h-4 text-green-600 mr-3" />
                  React/Vue export
                </li>
                <li className="flex items-center text-sm">
                  <Check className="w-4 h-4 text-green-600 mr-3" />
                  Priority support
                </li>
              </ul>

              <button className="w-full py-3 bg-black text-white rounded-lg hover:bg-zinc-800 transition-all duration-300 hover:scale-[1.02]">
                Start free trial
              </button>
            </div>

            {/* Enterprise */}
            <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-8 hover:border-zinc-700 transition-all duration-500 hover:transform hover:scale-[1.02] hover:shadow-xl relative overflow-hidden">

  {/* Coming Soon Badge */}
  <div className="absolute top-3 right-3 bg-yellow-500/10 text-yellow-400 text-xs px-2 py-1 rounded-full border border-yellow-500/20">
    Coming Soon
  </div>

  <h3 className="text-xl font-medium mb-2">Enterprise</h3>
  <div className="text-3xl font-medium mb-1">Custom</div>
  <p className="text-zinc-400 text-sm mb-8">For large teams</p>

  <ul className="space-y-3 mb-8 opacity-60 select-none">
    <li className="flex items-center text-sm">
      <Check className="w-4 h-4 text-green-500 mr-3" />
      Custom integrations
    </li>
    <li className="flex items-center text-sm">
      <Check className="w-4 h-4 text-green-500 mr-3" />
      On-premise deployment
    </li>
    <li className="flex items-center text-sm">
      <Check className="w-4 h-4 text-green-500 mr-3" />
      Dedicated support
    </li>
  </ul>

  <button
    disabled
    className="w-full py-3 border border-zinc-700 rounded-lg bg-zinc-900/50 text-zinc-500 cursor-not-allowed"
  >
    Coming Soon
  </button>
</div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="px-6 py-12 border-t border-zinc-800/50"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0)" : "translateY(30px)",
          transition: "all 1s cubic-bezier(0.25, 0.4, 0.25, 1) 1.8s",
        }}
      >
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <div className="w-5 h-5 bg-white rounded-sm flex items-center justify-center">
              <Sparkles className="w-3 h-3 text-black" />
            </div>
            <span className="text-sm text-zinc-400">© 2025 Sketch2UI</span>
          </div>
          <div className="flex items-center space-x-6 text-sm text-zinc-400">
            <a
              href="#"
              className="hover:text-white transition-all duration-300 hover:scale-105"
            >
              Privacy
            </a>
            <a
              href="#"
              className="hover:text-white transition-all duration-300 hover:scale-105"
            >
              Terms
            </a>
            <a
              href="#"
              className="hover:text-white transition-all duration-300 hover:scale-105"
            >
              Support
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ProductLandingPage;
