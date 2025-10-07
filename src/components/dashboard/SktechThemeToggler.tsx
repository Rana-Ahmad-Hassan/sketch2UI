import { Sun, Moon } from "lucide-react";
import { useCallback, useState, useEffect } from "react";
import { useEditor } from "@tldraw/tldraw";

export const DarkModeButton = () => {
  const editor: any = useEditor?.(); // keep using your hook; if not available set to undefined
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return document.documentElement.classList.contains("dark");
  });

  // If editor provides initial preference, sync it once on mount
  useEffect(() => {
    if (!editor) return;
    try {
      const editorPref =
        typeof editor.user?.getIsDarkMode === "function"
          ? Boolean(editor.user.getIsDarkMode())
          : undefined;
      if (typeof editorPref !== "undefined") setIsDark(editorPref);
    } catch (err) {
      // ignore and fallback to DOM state
      // console.warn("Could not read editor preference", err);
    }
  }, [editor]);

  // Apply/remove `dark` class on <html> whenever isDark changes
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (isDark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [isDark]);

  // Toggle function: optimistic update + persist to editor if available
  const toggle = useCallback(async () => {
    const next = !isDark;
    setIsDark(next); // optimistic UI update

    if (editor?.user?.updateUserPreferences) {
      try {
        // await if the API returns a promise
        await editor.user.updateUserPreferences({
          colorScheme: next ? "dark" : "light",
        });
      } catch (err) {
        // If persisting fails, we keep UI state but log
        // console.warn("Failed to persist editor preference", err);
      }
    }
  }, [isDark, editor]);

  return (
    <>
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={toggle}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              toggle();
            }
          }}
          aria-pressed={isDark}
          aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
          className="relative flex items-center w-20 h-10 bg-gray-900 border border-gray-700 rounded-full cursor-pointer px-1 "
          style={{ pointerEvents: "all" }}
        >
          {/* sliding knob under icons */}
          <span
            className={`absolute top-1  w-8 h-8 bg-gray-700 rounded-full transition-transform duration-300 transform z-10 ${
              isDark ? "translate-x-9 scale-105" : "translate-x-0 scale-100"
            }`}
          />

          {/* icons layer above knob */}
          <span className="relative z-20 flex items-center justify-between w-full px-2">
            <Sun
              className={`w-4 h-4 transition-colors ${
                !isDark ? "text-white" : "text-gray-300"
              }`}
            />
            <Moon
              className={`w-4 h-4 transition-colors ${
                isDark ? "text-white" : "text-gray-300"
              }`}
            />
          </span>
        </button>
      </div>
    </>
  );
};
