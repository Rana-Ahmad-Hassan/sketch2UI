import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Project } from "../lib/mockData";
import { useAuthStore } from "../store/authStore";
import { useProjectStore } from "../store/projectStore";
import Sidebar from "../components/layout/Sidebar";
import ProjectGrid from "../components/dashboard/ProjectGrid";
import NewProjectModal from "../components/dashboard/NewProjectModal";
import { deleteProject } from "../services/project/delete";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuthStore();
  const { projects, setProjects, loadProjects, addProject } = useProjectStore();
  const [loading, setLoading] = useState(true);
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    try {
      setLoading(true);
      loadProjects(user?.id);
    } catch (error) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated, navigate, loadProjects]);

  const handleOpenProject = (project: any) => {
    navigate(`/sketch/${project._id}`);
  };

  const handleDeleteProject = async (id: any) => {
    await deleteProject(id);
    setProjects(projects.filter((p) => p._id !== id));
    toast.success("Project deleted");
  };

  const handleProjectCreated = (projectId: any) => {
    navigate(`/sketch/${projectId}`);
  };

  return (
    <div className="min-h-screen bg-black flex">
      <Sidebar onNewProject={() => setShowNewProjectModal(true)} />

      <main className="flex-1 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6">
            <h1 className="text-lg font-semibold text-white mb-1">Projects</h1>
            <p className="text-xs text-gray-500">
              {projects.length} project{projects.length !== 1 ? "s" : ""} •
              Welcome back, {user?.name || "User"}
            </p>
          </div>

          <ProjectGrid
            projects={projects}
            onNewProject={() => setShowNewProjectModal(true)}
            onOpenProject={handleOpenProject}
            onDeleteProject={handleDeleteProject}
            loading={loading}
          />
        </div>
      </main>

      <NewProjectModal
        isOpen={showNewProjectModal}
        onClose={() => setShowNewProjectModal(false)}
        onProjectCreated={handleProjectCreated}
      />
    </div>
  );
};

export default Dashboard;
