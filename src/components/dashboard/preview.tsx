import React, { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Code, Monitor, Copy, Check, FileCode, Eye, Atom } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../ui/Button";
import { convertToReact } from "../../services/code-workflow/convert";
import toast from "react-hot-toast";

// Framer Motion components (using CSS animations as fallback)
const motion = {
  div: ({
    children,
    className,
    initial,
    animate,
    transition,
    layout,
    layoutId,
    ...props
  }: any) => (
    <div className={`${className} transition-all duration-300`} {...props}>
      {children}
    </div>
  ),
  button: ({ children, className, whileHover, whileTap, ...props }: any) => (
    <button
      className={`${className} transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]`}
      {...props}
    >
      {children}
    </button>
  ),
};

interface Screen {
  name: string;
  description: string;
  code: string;
}

export default function GeneratedScreens() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [copied, setCopied] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"preview" | "code">("preview");
  const [reactCode, setReactCode] = useState("");
  const [loading, setLoading] = useState(false);

  const copyToClipboard = async (code: string, name: string) => {
    await navigator.clipboard.writeText(code);
    setCopied(name);
    setTimeout(() => setCopied(null), 2000);
  };

  const location = useLocation();
  const navigate = useNavigate();
  const screens: Screen[] = location.state?.screens || [];

  if (!screens?.length) {
    return (
      <motion.div className="flex flex-col items-center justify-center min-h-[500px] bg-slate-950 p-8">
        <motion.div className="text-center space-y-4 max-w-md">
          <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center mb-4">
            <FileCode className="h-8 w-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-semibold text-slate-200">
            No Screens Available
          </h3>
          <p className="text-sm text-slate-400 leading-relaxed">
            Generated component screens will appear here once you create them.
            Start building to see your designs come to life.
          </p>
        </motion.div>
      </motion.div>
    );
  }

  const activeScreen = screens[activeIndex];

  const iframeCode = `
<html>
  <head>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@3.3.2/dist/tailwind.min.css" rel="stylesheet">
    <style>
      body { margin: 0; padding: 0; }
    </style>
  </head>
  <body>
    ${activeScreen.code}
  </body>
</html>
`;

  const convertCodeToReact = async (code: any) => {
    try {
      setLoading(true);
      const data = await convertToReact(code);
      setReactCode(data);
      toast.success("Code converted to react");
    } catch (error: any) {
      throw new Error(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      {/* Header with gradient background */}
      <div className="sticky top-0 z-50 px-10 backdrop-blur-xl bg-slate-950/80 border-b border-slate-800/50">
        <div className="flex items-center justify-between p-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center">
              <Code className="h-4 w-4 text-slate-300" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-slate-100">
                Component Screens
              </h1>
              <p className="text-xs text-slate-400">
                {screens.length} screen{screens.length !== 1 ? "s" : ""}{" "}
                generated
              </p>
            </div>
          </div>

          {/* View Mode Toggle */}
          <motion.div className="inline-flex items-center rounded-lg border border-slate-700/50 bg-slate-900/50 backdrop-blur-sm p-1 shadow-lg">
            <motion.button
              onClick={() => setViewMode("preview")}
              className={`
                inline-flex items-center gap-2 px-4 py-2 text-sm font-medium transition-all duration-300 rounded-md relative overflow-hidden
                ${
                  viewMode === "preview"
                    ? "bg-gradient-to-r from-slate-700 to-slate-600 text-slate-100 shadow-md"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                }
              `}
            >
              <Eye className="h-4 w-4" />
              Preview
              {viewMode === "preview" && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-gradient-to-r from-slate-700 to-slate-600 rounded-md -z-10"
                />
              )}
            </motion.button>
            <motion.button
              onClick={() => setViewMode("code")}
              className={`
                inline-flex items-center gap-2 px-4 py-2 text-sm font-medium transition-all duration-300 rounded-md relative overflow-hidden
                ${
                  viewMode === "code"
                    ? "bg-gradient-to-r from-slate-700 to-slate-600 text-slate-100 shadow-md"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                }
              `}
            >
              <Code className="h-4 w-4" />
              Code
              {viewMode === "code" && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-gradient-to-r from-slate-700 to-slate-600 rounded-md -z-10"
                />
              )}
            </motion.button>
          </motion.div>
        </div>

        {/* Navigation Tabs */}
        <div className="border-t border-slate-800/30">
          <div className="flex overflow-x-auto scrollbar-hide">
            {screens.map((screen, i) => (
              <motion.button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`
                  relative px-6 py-4 text-sm font-medium transition-all duration-300 whitespace-nowrap group
                  hover:text-slate-200 hover:bg-slate-800/30
                  ${
                    activeIndex === i
                      ? "text-slate-100 bg-gradient-to-b from-slate-800/50 to-transparent"
                      : "text-slate-400"
                  }
                `}
              >
                <span className="relative z-10">{screen.name}</span>
                {activeIndex === i && (
                  <motion.div
                    layoutId="activeScreenTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-slate-400 to-slate-300"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-800/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6 space-y-6">
        {/* Content Display */}
        <motion.div
          key={activeIndex + viewMode}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl border border-slate-700/50 bg-gradient-to-br from-slate-900/50 to-slate-800/30 backdrop-blur-sm shadow-2xl overflow-hidden"
        >
          {viewMode === "preview" ? (
            <motion.div className="p-2">
              <div className="rounded-lg overflow-hidden bg-white shadow-inner">
                <iframe
                  srcDoc={iframeCode}
                  title="Component Preview"
                  className="w-full h-[800px] bg-white"
                  style={{ border: "none" }}
                />
              </div>
            </motion.div>
          ) : (
            <motion.div className="mb-10">
              <div className="absolute right-4 top-4 z-10 flex items-center gap-x-3">
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={() => convertCodeToReact(activeScreen.code)}
                  disabled={reactCode ? true : false}
                  loading={loading}
                >
                  <Atom />
                </Button>
                <motion.button
                  onClick={() => {
                    // Prefer converted React code when available. Handle both forms:
                    // - reactCode might be a string (raw code)
                    // - or an object { code: string }
                    const converted =
                      reactCode && typeof reactCode === "string"
                        ? reactCode
                        : reactCode && (reactCode as any).code
                        ? (reactCode as any).code
                        : null;

                    const codeToCopy = converted ?? activeScreen.code;
                    copyToClipboard(codeToCopy, activeScreen.name);
                  }}
                  className="
    inline-flex items-center gap-2 px-4 py-2 text-sm font-medium
    bg-gradient-to-r from-slate-800 to-slate-700 border border-slate-600/50 rounded-lg shadow-lg text-slate-200
    hover:from-slate-700 hover:to-slate-600 hover:border-slate-500 hover:shadow-xl
    transition-all duration-300 backdrop-blur-sm
  "
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {copied === activeScreen.name ? (
                    <>
                      <Check className="h-4 w-4 text-green-400" />
                      <span className="text-green-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" />
                      Copy Code
                    </>
                  )}
                </motion.button>
              </div>
              <SyntaxHighlighter
                language="tsx"
                style={oneDark}
                wrapLongLines
                className="!m-0 rounded-xl"
                customStyle={{
                  padding: "2rem",
                  background:
                    "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
                  fontSize: "14px",
                  lineHeight: "1.6",
                }}
              >
                {reactCode ? reactCode?.code : activeScreen.code}
              </SyntaxHighlighter>
            </motion.div>
          )}
        </motion.div>

        {/* Screen Information Card */}
        {activeScreen.description && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-xl border border-slate-700/50 bg-gradient-to-br from-slate-900/30 to-slate-800/20 backdrop-blur-sm p-6 shadow-xl"
          >
            <div className="flex items-start gap-4">
              <div className="mt-1 flex-shrink-0">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center">
                  <FileCode className="h-5 w-5 text-slate-300" />
                </div>
              </div>
              <div className="space-y-2 flex-1">
                <h3 className="text-lg font-semibold text-slate-200 flex items-center gap-2">
                  {activeScreen.name}
                  <span className="px-2 py-1 text-xs font-medium bg-slate-800/50 text-slate-400 rounded-md border border-slate-700/50">
                    Component
                  </span>
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {activeScreen.description}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
