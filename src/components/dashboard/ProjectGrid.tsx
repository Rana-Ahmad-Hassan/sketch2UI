import React, { useState } from "react";
import { Plus, Calendar, MoreHorizontal, X } from "lucide-react";
import { Project } from "../../lib/mockData";
import ProjectCardSkeleton from "../loaders/projects-skeleton";

interface ProjectGridProps {
  projects: any[];
  onNewProject: () => void;
  onOpenProject: (project: any) => void;
  onDeleteProject: (id: string) => void;
  loading: boolean;
}

const ProjectGrid: React.FC<ProjectGridProps> = ({
  projects,
  onNewProject,
  onOpenProject,
  onDeleteProject,
  loading,
}) => {
  const [selectedProject, setSelectedProject] = useState<any | null>(null);
  const [showModal, setShowModal] = useState(false);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const handleDeleteClick = (project: Project, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedProject(project);
    setShowModal(true);
  };

  const confirmDelete = () => {
    if (selectedProject) {
      onDeleteProject(selectedProject._id);
    }
    setShowModal(false);
    setSelectedProject(null);
  };

  if (loading || (!projects || projects.length === 0)) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <ProjectCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {/* New Project Card */}
        <div
          onClick={onNewProject}
          className="bg-gray-950 border border-gray-700 border-dashed rounded-lg p-4 cursor-pointer hover:bg-gray-900/50 hover:border-gray-700 transition-all group"
        >
          <div className="flex items-center justify-center h-24 mb-3">
            <div className="w-8 h-8 bg-gray-800 rounded-md flex items-center justify-center group-hover:bg-gray-700 transition-colors">
              <Plus className="w-4 h-4 text-gray-500 group-hover:text-gray-400" />
            </div>
          </div>
          <h3 className="text-center text-xs font-medium text-gray-400 group-hover:text-gray-300 transition-colors">
            New Project
          </h3>
        </div>

        {/* Project Cards */}
        {projects?.map((project, i) => (
          <div
            key={i}
            onClick={() => onOpenProject(project)}
            className="bg-gray-950 border border-gray-700 rounded-lg overflow-hidden cursor-pointer hover:bg-gray-900/50 hover:border-gray-700 transition-all group"
          >
            {/* Thumbnail */}
            <div className="flex items-center justify-center border-b border-gray-700">
              <div className="bg-gray-700 rounded-md group-hover:bg-gray-600 transition-colors">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCLJ74huBPkOFbUx0qrfqdOizfxYPHzml6tUHS8q7OrJgdm-tBRYmLjEIVy9ZoP-RQSwLNyq7vIv53MGuuQGfgky1FqixX-oxO6s0DQg6NUoXT4MfQXB0izDRqsiqMG7ToTtofB81jOGBM8f62nCD7aYeeDZm7MdYuMauiTSj8NRNB7TMJO1B0FNCmhCh7i1I5ibZGQsA6wTEqbEqGHZx053fc_2oVEyzXudjtHTYvgE2xXnDd73IA7UfKLu6LP_xhqGp4VnHw_DVc"
                  alt="img.."
                  width={100}
                  height={100}
                />
              </div>
            </div>

            {/* Content */}
            <div className="p-3">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-medium text-white text-xs truncate group-hover:text-gray-100 transition-colors">
                  {project.name}
                </h3>
                <button
                  onClick={(e) => handleDeleteClick(project, e)}
                  className="p-1 rounded-md hover:bg-gray-800 transition-colors opacity-0 group-hover:opacity-100"
                >
                  <MoreHorizontal className="w-3 h-3 text-gray-500 hover:text-gray-300" />
                </button>
              </div>

              <div className="flex items-center text-xs text-gray-500 mb-2">
                <Calendar className="w-3 h-3 mr-1" />
                Last Update at {formatDate(project.updatedAt)}
              </div>

              <div>
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-800 text-gray-400 border border-gray-700">
                  {project.type}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="bg-gray-950 border border-gray-800 rounded-xl shadow-2xl w-full max-w-md p-6 relative animate-in fade-in-0 zoom-in-95">
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-300"
              onClick={() => setShowModal(false)}
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-lg font-semibold text-white mb-2">
              Delete Project
            </h2>
            <p className="text-sm text-gray-400 mb-6">
              Are you sure you want to delete{" "}
              <span className="font-medium text-white">
                {selectedProject?.name}
              </span>
              ? This action cannot be undone.
            </p>

            <div className="flex justify-end space-x-3">
              <button
                className="px-4 py-2 rounded-md bg-gray-800 text-gray-300 hover:bg-gray-700 transition-colors"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition-colors"
                onClick={confirmDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectGrid;
