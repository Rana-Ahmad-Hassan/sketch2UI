import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useAuthStore } from "../../store/authStore";
import { useProjectStore } from "../../store/projectStore";
import Modal from "../ui/Modal";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { createProject } from "../../services/project/create";

interface NewProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProjectCreated: (projectId: string) => void;
}

const PROJECT_TYPES = [
  "Web App",
  "Mobile App",
  "Dashboard",
  "Landing Page",
  "E-commerce",
  "Blog",
  "Portfolio",
  "Other",
];

const NewProjectModal: React.FC<NewProjectModalProps> = ({
  isOpen,
  onClose,
  onProjectCreated,
}) => {
  const [name, setName] = useState("");
  const [type, setType] = useState("Web App");
  const [loading, setLoading] = useState(false);
  const { user } = useAuthStore();
  const { addProject } = useProjectStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !name.trim()) return;

    setLoading(true);
    try {
      const id = user.id;
      const data = await createProject({ name, type, id });
      toast.success("Project created successfully");
      addProject(data.project);
      onProjectCreated(data.project.id);
      onClose();
      setName("");
      setType("Web App");
    } catch (error: any) {
      toast.error("Failed to create project");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create New Project">
      <form onSubmit={handleSubmit} className="space-y-5">
        <Input
          label="Project Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter project name"
          required
        />

        <div>
          <label className="block text-sm font-medium text-gray-200 mb-2">
            Project Type
          </label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="flex h-10 w-full rounded-lg border border-gray-700 bg-gray-900/50 px-3 py-2 text-sm text-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20 focus-visible:border-gray-600 transition-all duration-200"
          >
            {PROJECT_TYPES.map((projectType) => (
              <option
                key={projectType}
                value={projectType}
                className="bg-gray-900"
              >
                {projectType}
              </option>
            ))}
          </select>
        </div>

        <div className="flex space-x-3 pt-4">
          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button type="submit" loading={loading} className="flex-1">
            Create Project
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default NewProjectModal;
