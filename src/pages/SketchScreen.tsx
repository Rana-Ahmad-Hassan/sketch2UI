import React, { useEffect, useState } from "react";
import { useParams, useNavigate, NavLink } from "react-router-dom";
import { Tldraw, useEditor } from "@tldraw/tldraw";
import "@tldraw/tldraw/tldraw.css";
import { toast } from "react-hot-toast";
import { useAuthStore } from "../store/authStore";
import { useProjectStore } from "../store/projectStore";
import { Save, Sparkles, ArrowLeft, Palette } from "lucide-react";
import Button from "../components/ui/Button";
import { analyzeWireFrames } from "../services/ai-workflow/analyze";
import AnalysisSidebar from "../components/dashboard/analyzeSidebar";
import { generateScreens } from "../services/ai-workflow/generate";
import { DarkModeButton } from "../components/dashboard/SktechThemeToggler";
import { saveWireFrames } from "../services/ai-workflow/save";
import DesignPanel from "../components/dashboard/DesignPannel";
import { motion, AnimatePresence } from "framer-motion";

const SketchScreen: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuthStore();
  const {
    currentProject,
    setCurrentProject,
    projects,
    colorPallete,
    typography,
    updateProject,
  } = useProjectStore();

  const [shapes, setShapes] = useState<any[]>([]);
  const [analyzedShapes, setAnalyzedShapes] = useState<any>({ screens: [] });
  const [isAnalyzeSiderBarOpen, setIsAnalyzeSiderBarOpen] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [saving, setSaving] = useState(false);
  const [generatingLoading, setGeneratingLoading] = useState(false);
  const [currentState, setCurrentState] = useState(false);


  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    if (projectId) {
      fetchProject();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, projectId]);

  const fetchProject = () => {
    if (!projectId) return;
    const project = projects?.find((p) => p._id === projectId);
    if (project) {
      setCurrentProject(project);
    } else {
      navigate("/dashboard");
    }
  };

  const handleAnalyzeWireFrames = async () => {
    if (!currentProject || !projectId) return;
    setGenerating(true);
    try {
      const data = await analyzeWireFrames(
        shapes,
        currentProject._id,
        user?.id
      );
      const normalized = Array.isArray(data) ? { screens: data } : data;
      setAnalyzedShapes(normalized);
      setIsAnalyzeSiderBarOpen(true);
    } catch (error: any) {
      console.error(error);
      toast.error("Generation failed");
    } finally {
      setGenerating(false);
    }
  };

  const handleSaveWireFrames = async () => {
    if (!currentProject || !projectId) return;
    setSaving(true);
    try {
      // save to backend
      await saveWireFrames(shapes, currentProject._id, user?.id);
      // updateProject(currentProject._id, shapes);
      // after successful save, update localStorage to reflect saved state
      const key = `project-shapes-${projectId}`;
      try {
        localStorage.setItem(key, JSON.stringify(shapes));
      } catch (e) {
        console.warn("localStorage set failed", e);
      }
      toast.success("Project is saved");
    } catch (error: any) {
      console.error(error);
      toast.error("Error in saving project");
    } finally {
      setSaving(false);
    }
  };

  const handleGenerateUI = async () => {
    if (!currentProject || !projectId) return;
    setGeneratingLoading(true);
    try {
      const data = await generateScreens(
        analyzedShapes,
        colorPallete,
        typography
      );
      if (data?.screens) {
        navigate(`/preview`, { state: { screens: data.screens } });
      } else {
        toast.error("No screens generated");
      }
    } catch (error: any) {
      console.error(error);
      toast.error("Generation failed");
    } finally {
      setGeneratingLoading(false);
    }
  };

  if (!currentProject) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mx-auto mb-3" />
          <p className="text-gray-500 text-xs">Loading project...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-black">
      {isAnalyzeSiderBarOpen && (
        <AnalysisSidebar
          rawAnalysis={analyzedShapes}
          onGenerate={handleGenerateUI}
          loading={generatingLoading}
          setIsAnalyzeSiderBarOpen={setIsAnalyzeSiderBarOpen}
        />
      )}
      {/* Top Bar */}
      <header className="py-2 sticky bg-gray-950 border-b mb-0.5 border-gray-300 flex items-center justify-between px-4">
        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            onClick={() => navigate("/dashboard")}
            size="sm"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-sm font-medium text-white">
              {currentProject.name}
            </h1>
            <p className="text-xs text-gray-500">{currentProject.type}</p>
          </div>
        </div>

        <div className="flex items-center space-x-2 text-sm">
          <button
            className="text-white"
            onClick={() => setCurrentState(!currentState)}
          >
            {currentState ? "Switch to editor" : "Switch to design pannel"}
          </button>
          {/* <NavLink
            to="/design-pannel"
            className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-900 border border-gray-700 hover:bg-gray-800 transition-colors cursor-pointer"
          >
            <Palette className="w-5 h-5 text-gray-200" />
          </NavLink> */}
          <Button
            variant="secondary"
            onClick={handleSaveWireFrames}
            loading={saving}
            size="sm"
          >
            <Save className="h-4 w-4 mr-1.5" />
            Save
          </Button>
          <Button
            onClick={handleAnalyzeWireFrames}
            loading={generating}
            size="sm"
          >
            <Sparkles className="h-4 w-4 mr-1.5" />
            Analyze
          </Button>
        </div>
      </header>
      {/* Canvas Area */}
      <div className="flex-1 relative bg-gray-950">
        <AnimatePresence mode="wait">
          {!currentState ? (
            <motion.div
              key="editor"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{
                duration: 0.5,
                ease: [0.4, 0, 0.2, 1], // smooth, premium easing
              }}
              className="h-full rounded-2xl shadow-2xl overflow-hidden bg-gray-950"
            >
              <Tldraw components={{ TopPanel: DarkModeButton }}>
                <CanvasTools
                  setShapes={setShapes}
                  projectId={projectId!}
                  backendShapes={currentProject?.shapes || []}
                />
              </Tldraw>
            </motion.div>
          ) : (
            <motion.div
              key="design"
              initial={{ opacity: 0, y: -40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{
                duration: 0.5,
                ease: [0.4, 0, 0.2, 1],
              }}
              className=" rounded-2xl shadow-2xl bg-gray-950"
            >
              <DesignPanel />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

type CanvasToolsProps = {
  setShapes: (s: any[]) => void;
  projectId: string;
  backendShapes?: any[];
};

function CanvasTools({
  setShapes,
  projectId,
  backendShapes = [],
}: CanvasToolsProps) {
  const editor = useEditor();

  useEffect(() => {
    if (!editor || !projectId) return;
    const KEY = `project-shapes-${projectId}`;

    const safeParse = (raw: string | null) => {
      if (!raw) return null;
      try {
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? parsed : null;
      } catch {
        return null;
      }
    };

    const clearEditor = () => {
      try {
        const curr = editor.getCurrentPageShapes();
        if (curr && curr.length > 0) {
          const ids = curr.map((s: any) => s.id);
          if (ids.length) editor.deleteShapes(ids);
        }
      } catch (e) {
        console.warn("Failed to clear editor", e);
      }
    };

    const loadShapesToEditor = (shapesToLoad: any[]) => {
      if (!shapesToLoad || shapesToLoad.length === 0) return;
      try {
        clearEditor();
        // createShapes expects valid shape objects
        editor.createShapes(shapesToLoad);
        setShapes(shapesToLoad);
        // persist locally
        try {
          localStorage.setItem(KEY, JSON.stringify(shapesToLoad));
        } catch (e) {
          console.warn("localStorage set failed", e);
        }
      } catch (e) {
        console.error("Failed to create shapes", e);
      }
    };

    // Priority: localStorage > backendShapes
    const localRaw = localStorage.getItem(KEY);
    const localParsed = safeParse(localRaw);

    if (localParsed && localParsed.length > 0) {
      loadShapesToEditor(localParsed);
    } else if (backendShapes && backendShapes.length > 0) {
      // backendShapes might be stored as objects — ensure array
      loadShapesToEditor(backendShapes);
    } else {
      // nothing to load; clear editor
      clearEditor();
      setShapes([]);
    }

    // subscribe to editor changes and persist to localStorage
    const onChange = () => {
      try {
        const allShapes = editor.getCurrentPageShapes() || [];
        setShapes(allShapes);
        localStorage.setItem(KEY, JSON.stringify(allShapes));
      } catch (e) {
        // ignore quota errors or other issues
      }
    };

    editor.on("change", onChange);

    return () => {
      try {
        editor.off("change", onChange);
      } catch (e) {
        // ignore
      }
    };
    // re-run when editor, projectId or backendShapes change
  }, [editor, projectId, JSON.stringify(backendShapes), setShapes]);

  return null;
}

export default SketchScreen;

// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate, NavLink } from "react-router-dom";
// import { Tldraw, useEditor } from "@tldraw/tldraw";
// import "@tldraw/tldraw/tldraw.css";
// import { toast } from "react-hot-toast";
// import { useAuthStore } from "../store/authStore";
// import { useProjectStore } from "../store/projectStore";
// import { Save, Sparkles, ArrowLeft, Palette } from "lucide-react";
// import Button from "../components/ui/Button";
// import { analyzeWireFrames } from "../services/ai-workflow/analyze";
// import AnalysisSidebar from "../components/dashboard/analyzeSidebar";
// import { generateScreens } from "../services/ai-workflow/generate";
// import { DarkModeButton } from "../components/dashboard/SktechThemeToggler";
// import { saveWireFrames } from "../services/ai-workflow/save";

// const SketchScreen: React.FC = () => {
//   const { projectId } = useParams<{ projectId: string }>();
//   const navigate = useNavigate();
//   const { isAuthenticated, user } = useAuthStore();
//   const { currentProject, setCurrentProject, projects } = useProjectStore();
//   const [saving, _] = useState(false);
//   const [generating, setGenerating] = useState(false);
//   const [shapes, setShapes] = React.useState<any[]>([]);
//   const [analyzedShapes, setAnalyzedShapes] = React.useState([]);
//   const [isAnalyzeSiderBarOpen, setIsAnalyzeSiderBarOpen] =
//     React.useState(false);
//   const [, setGeneratedScreens] = useState([]);
//   const [generatingLoading, setGeneratingLoading] = useState(false);
//   const [existingShapes, setExistingShapes] = useState([]);
//   const { colorPallete, typography } = useProjectStore();

//   useEffect(() => {
//     if (!isAuthenticated) {
//       navigate("/login");
//       return;
//     }

//     if (projectId) {
//       fetchProject();
//     }
//   }, [isAuthenticated, projectId, navigate]);

//   const fetchProject = async () => {
//     if (!projectId) return;

//     const project = projects?.find((p) => p._id === projectId);
//     if (project) {
//       setCurrentProject(project);
//       setExistingShapes(project.shapes);
//     } else {
//       navigate("/dashboard");
//     }
//   };

//   const handleAnalyzeWireFrames = async () => {
//     if (!currentProject || !projectId) return;

//     setGenerating(true);
//     try {
//       const data = await analyzeWireFrames(
//         shapes,
//         currentProject._id,
//         user?.id
//       );

//       // Normalize: wrap raw array into { screens: [...] }
//       const normalized = Array.isArray(data) ? { screens: data } : data;

//       setAnalyzedShapes(normalized);
//       setIsAnalyzeSiderBarOpen(true);
//     } catch (error: any) {
//       toast.error("Generation failed");
//     } finally {
//       setGenerating(false);
//     }
//   };

//   const handleSaveWireFrames = async () => {
//     if (!currentProject || !projectId) return;

//     setGenerating(true);
//     try {
//       await saveWireFrames(shapes, currentProject._id, user?.id);
//       toast.success("Project is saved");
//     } catch (error: any) {
//       toast.error("Error in saving project");
//     } finally {
//       setGenerating(false);
//     }
//   };

//   if (!currentProject) {
//     return (
//       <div className="min-h-screen bg-black flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mx-auto mb-3"></div>
//           <p className="text-gray-500 text-xs">Loading...</p>
//         </div>
//       </div>
//     );
//   }

//   const handleGenerateUI = async () => {
//     if (!currentProject || !projectId) return;

//     setGeneratingLoading(true);
//     try {
//       const data = await generateScreens(
//         analyzedShapes,
//         colorPallete,
//         typography
//       );

//       if (data?.screens) {
//         navigate(`/preview`, { state: { screens: data.screens } });
//         setGeneratedScreens(data.screens);
//       } else {
//         setGeneratedScreens([]);
//         toast.error("No screens generated");
//       }
//     } catch (error: any) {
//       toast.error("Generation failed");
//     } finally {
//       setGeneratingLoading(false);
//     }
//   };

//   return (
//     <div className="h-screen flex flex-col bg-black">
//       {isAnalyzeSiderBarOpen ? (
//         <AnalysisSidebar
//           rawAnalysis={analyzedShapes}
//           onGenerate={handleGenerateUI}
//           loading={generatingLoading}
//           setIsAnalyzeSiderBarOpen={setIsAnalyzeSiderBarOpen}
//         />
//       ) : (
//         ""
//       )}

//       {/* {generatedScreens.length > 0 && (
//         <GeneratedScreens screens={generatedScreens} />
//       )} */}
//       {/* Top Bar */}
//       <header className="h-12 bg-gray-950 border-b mb-0.5 border-gray-300 flex items-center justify-between px-4">
//         <div className="flex items-center space-x-3">
//           <Button
//             variant="ghost"
//             onClick={() => navigate("/dashboard")}
//             size="sm"
//           >
//             <ArrowLeft className="h-4 w-4" />
//           </Button>
//           <div>
//             <h1 className="text-sm font-medium text-white">
//               {currentProject.name}
//             </h1>
//             <p className="text-xs text-gray-500">{currentProject.type}</p>
//           </div>
//         </div>

//         <div className="flex items-center space-x-2">
//           <NavLink
//             to="/design-pannel"
//             className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-900 border border-gray-700 hover:bg-gray-800 transition-colors cursor-pointer"
//           >
//             <Palette className="w-5 h-5 text-gray-200" />
//           </NavLink>
//           <Button
//             variant="secondary"
//             onClick={handleSaveWireFrames}
//             loading={saving}
//             size="sm"
//           >
//             <Save className="h-4 w-4 mr-1.5" />
//             Save
//           </Button>
//           <Button
//             onClick={handleAnalyzeWireFrames}
//             loading={generating}
//             size="sm"
//           >
//             <Sparkles className="h-4 w-4 mr-1.5" />
//             Analyze
//           </Button>
//         </div>
//       </header>

//       {/* Canvas Area */}
//       <div className="flex-1 relative">
//         <Tldraw components={{ TopPanel: DarkModeButton }}>
//           <CanvasTools setShapes={setShapes} existingShapes={existingShapes} />
//         </Tldraw>
//       </div>
//     </div>
//   );
// };

// // A child component to access the editor
// function CanvasTools({ setShapes, existingShapes }: any) {
//   const editor = useEditor();

//   useEffect(() => {
//     // Initial load
//     setShapes(editor.getCurrentPageShapes());
//     editor.createShapes(existingShapes);

//     // Subscribe to editor changes
//     editor.on("change", () => {
//       const allShapes = editor.getCurrentPageShapes();
//       setShapes(allShapes);
//     });

//     return () => {
//       editor.off("change");
//     };
//   }, [editor]);

//   // const handleReset = () => {
//   //   const ids = editor.getCurrentPageShapes().map((s) => s.id);
//   //   editor.deleteShapes(ids);
//   // };

//   return <></>;
// }

// export default SketchScreen;
