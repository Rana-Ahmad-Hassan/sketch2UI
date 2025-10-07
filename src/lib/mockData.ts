export interface Project {
  id: string
  name: string
  type: string
  sketch_data: any
  generated_ui: any
  thumbnail: string | null
  created_at: string
  updated_at: string
}

export const mockProjects: Project[] = [
  {
    id: '1',
    name: 'E-commerce Dashboard',
    type: 'Dashboard',
    sketch_data: {},
    generated_ui: null,
    thumbnail: null,
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-01-15T14:30:00Z'
  },
  {
    id: '2',
    name: 'Mobile Banking App',
    type: 'Mobile App',
    sketch_data: {},
    generated_ui: null,
    thumbnail: null,
    created_at: '2024-01-14T09:00:00Z',
    updated_at: '2024-01-14T16:45:00Z'
  },
  {
    id: '3',
    name: 'Portfolio Website',
    type: 'Portfolio',
    sketch_data: {},
    generated_ui: null,
    thumbnail: null,
    created_at: '2024-01-13T11:00:00Z',
    updated_at: '2024-01-13T18:20:00Z'
  }
]

export const mockUser = {
  id: '1',
  email: 'user@example.com',
  name: 'John Doe'
}