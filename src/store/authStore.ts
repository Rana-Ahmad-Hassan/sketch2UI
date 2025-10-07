import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { registerUser } from '../services/auth/register'
import { loginUser } from '../services/auth/login'

interface User {
  id?: string
  email: string
  name?: string
  token?: string
}

interface AuthState {
  user: User | null
  loading: boolean
  isAuthenticated: boolean
  setUser: (user: User | null) => void
  setLoading: (loading: boolean) => void
  login: (email: string, password: string) => Promise<void>
  signup: (email: string, password: string) => Promise<void>
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      loading: false,
      isAuthenticated: false,
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      setLoading: (loading) => set({ loading }),
      login: async (email: string, password: string) => {
        set({ loading: true })
        const data = await loginUser({ email, password })
        const id = data.id
        const token = data.token
        const mockUser = { id, email, name: email.split('@')[0], token }
        set({ user: mockUser, loading: false, isAuthenticated: true })
      },
      signup: async (email: string, password: string) => {
        set({ loading: true })
        const data = await registerUser({ email, password })
        const mockUser = { email, name: email.split('@')[0] }
        set({ user: mockUser, loading: false, isAuthenticated: true })
      },
      logout: () => {
        set({ user: null, isAuthenticated: false })
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated
      }),
    }
  )
)