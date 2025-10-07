import { create } from 'zustand'
import { Project } from '../lib/mockData'
import { fetchProjects } from '../services/project/get-project'

type Pallete = {
  name: string,
  colors: string[]
}

interface ProjectState {
  projects: any[]
  currentProject: any | null
  setProjects: (projects: Project[]) => void
  setCurrentProject: (project: any | null) => void
  addProject: (project: Project) => void
  updateProject: (id: string, updates: Partial<Project>) => void
  deleteProject: (id: string) => void
  loadProjects: (id: any) => void
  colorPallete: Pallete
  typography: any
  setColorPalette: (palette: Pallete) => void
  setTypography: (font: any) => void
}

export const useProjectStore = create<ProjectState>((set) => ({
  projects: [],
  currentProject: null,
  colorPallete: {
    name: "",
    colors: []
  },
  typography: null,
  setColorPalette: (palette: Pallete) => {
    set({ colorPallete: palette })
  },
  setTypography: (font) => set({ typography: font }),
  setProjects: (projects) => set({ projects }),
  setCurrentProject: (project) => set({ currentProject: project }),
  addProject: (project) => set((state) => ({ projects: [...state.projects, project] })),
  updateProject: (id, updates: any) =>
    set((state) => ({
      projects: state.projects.map((p) => (p._id === id ? { ...p, ...updates } : p)),
    })),
  deleteProject: (id) =>
    set((state) => ({ projects: state.projects.filter((p) => p.id !== id) })),
  loadProjects: async (id) => {
    const data = await fetchProjects({ id })
    set({ projects: data.projects })
  }
}))