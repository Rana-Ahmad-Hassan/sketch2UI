import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { useAuth } from './hooks/useAuth'
import { useAuthStore } from './store/authStore'
import WelcomeScreen from './components/auth/WelcomeScreen'
import AuthForm from './components/auth/AuthForm'
import Dashboard from './pages/Dashboard'
import SketchScreen from './pages/SketchScreen'
import PreviewScreen from './pages/PreviewScreen'
import Settings from './pages/Settings'
import GeneratedScreens from './components/dashboard/preview'
import DesignPanel from './components/dashboard/DesignPannel'
import ProductLandingPage from './components/auth/WelcomeScreen'

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

function AppContent() {
  // ✅ Now `useAuth()` runs inside Router context
  useAuth()
  const { loading } = useAuthStore()

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-gray-400 text-sm">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<ProductLandingPage />} />
        <Route path="/login" element={<AuthForm mode="login" />} />
        <Route path="/signup" element={<AuthForm mode="signup" />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/sketch/:projectId" element={<SketchScreen />} />
        <Route path="/preview/:projectId" element={<PreviewScreen />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/preview" element={<GeneratedScreens />} />
        <Route path="/design-pannel" element={<DesignPanel />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#111827',
            color: '#f9fafb',
            border: '1px solid #374151',
          },
        }}
      />
    </>
  )
}

export default App
