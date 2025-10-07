import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, X } from "lucide-react";
import Button from "../ui/Button";

type Element = {
  type: string;
  label: string;
};

type Screen = {
  name: string;
  layout: string;
  description: string;
  elements: Element[];
};

interface SidebarProps {
  rawAnalysis: any; // backend sends stringified JSON
  onGenerate: () => void;
  loading: boolean;
  setIsAnalyzeSiderBarOpen: (open: boolean) => void; // <- fix typing
}

const AnalysisSidebar: React.FC<SidebarProps> = ({
  rawAnalysis,
  onGenerate,
  loading,
  setIsAnalyzeSiderBarOpen,
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

let screens: Screen[] = [];

try {
  if (typeof rawAnalysis === "string") {
    // Case: backend sends plain string
    const cleaned = rawAnalysis
      .replace(/^```json\s*/i, "")
      .replace(/```$/i, "");
    const parsed = JSON.parse(cleaned);
    screens = parsed.screens || [];
  } else if (rawAnalysis && typeof rawAnalysis === "object") {
    if (typeof rawAnalysis.analysis === "string") {
      // Case: backend wraps JSON inside `analysis` string
      const cleaned = rawAnalysis.analysis
        .replace(/^```json\s*/i, "")
        .replace(/```$/i, "");
      const parsed = JSON.parse(cleaned);
      screens = parsed.screens || [];
    } else if (Array.isArray(rawAnalysis)) {
      // Case: it's already an array
      screens = rawAnalysis;
    } else if (rawAnalysis.screens) {
      // Case: clean object with screens
      screens = rawAnalysis.screens;
    }
  }
} catch (err) {
  console.error("Failed to parse rawAnalysis:", err);
}

console.log("✅ Screens:", screens);



  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed top-12 shadow-lg right-0 w-72 bg-gray-950 rounded-lg border border-gray-500 shadow-lg flex flex-col"
      style={{ zIndex: 1200 }}
    >
      {/* Close Button */}
      <div>
        <button
          className="p-2 rounded-full hover:bg-gray-700 transition"
          aria-label="Close"
          onClick={() => setIsAnalyzeSiderBarOpen(false)}
        >
          <X className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-800">
        <h2 className="text-sm font-semibold text-white">
          We detected these screens
        </h2>
        <p className="text-xs text-gray-400">Based on your drawn shapes</p>
      </div>

      {/* Screens List */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2">
        {screens.map((screen, index) => (
          <div
            key={index}
            className="border border-gray-800 rounded-lg bg-gray-900"
          >
            <button
              onClick={() => toggleAccordion(index)}
              className="flex justify-between text-sm items-center w-full px-3 py-2 text-left text-white font-medium hover:bg-gray-800 transition"
            >
              {screen.name}
              {openIndex === index ? (
                <ChevronUp className="w-4 h-4 text-gray-400" />
              ) : (
                <ChevronDown className="w-4 h-4 text-gray-400" />
              )}
            </button>

            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="px-3 pb-3 text-sm text-gray-300 space-y-2"
                >
                  <p>
                    <span className="font-semibold text-gray-200">Layout:</span>{" "}
                    {screen.layout}
                  </p>
                  <p>{screen.description}</p>
                  <div>
                    <p className="font-semibold text-gray-200 mb-1">
                      Elements:
                    </p>
                    <ul className="list-disc pl-5 space-y-1">
                      {screen.elements.map((el, i) => (
                        <li key={i}>
                          <span className="text-blue-400">{el.type}</span> —{" "}
                          {el.label}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-800">
        <Button
          variant="secondary"
          onClick={onGenerate}
          loading={loading}
          size="sm"
        >
          Generate UI
        </Button>
      </div>
    </motion.div>
  );
};

export default AnalysisSidebar;
