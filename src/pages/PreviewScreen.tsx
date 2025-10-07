import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Code, Eye, RefreshCw, Download } from 'lucide-react'
import { toast } from 'react-hot-toast'
import { Project } from '../lib/mockData'
import { useAuthStore } from '../store/authStore'
import { useProjectStore } from '../store/projectStore'
import Button from '../components/ui/Button'

interface GeneratedComponent {
  name: string
  code: string
  preview: React.ComponentType
}

const PreviewScreen: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>()
  const navigate = useNavigate()
  const { isAuthenticated } = useAuthStore()
  const { projects } = useProjectStore()
  const [project, setProject] = useState<Project | null>(null)
  const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview')
  const [components, setComponents] = useState<GeneratedComponent[]>([])
  const [activeScreen, setActiveScreen] = useState(0)
  const [generating, setGenerating] = useState(false)

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login')
      return
    }

    if (projectId) {
      fetchProject()
    }
  }, [isAuthenticated, projectId, navigate])

  const fetchProject = async () => {
    if (!projectId) return

    const foundProject = projects.find(p => p.id === projectId)
    if (foundProject) {
      setProject(foundProject)
      await generateComponents(foundProject)
    } else {
      navigate('/dashboard')
    }
  }

  const generateComponents = async (projectData: Project) => {
    setGenerating(true)
    try {
      const mockComponents: GeneratedComponent[] = [
        {
          name: 'Login',
          code: `import React, { useState } from 'react';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="max-w-sm w-full space-y-6 p-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Sign in
          </h2>
        </div>
        <form className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/20"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/20"
          />
          <button
            type="submit"
            className="w-full py-2 px-4 bg-white text-black rounded-lg font-semibold hover:bg-gray-100 transition-all duration-200"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;`,
          preview: () => (
            <div className="min-h-full flex items-center justify-center bg-black">
              <div className="max-w-sm w-full space-y-6 p-6">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-white tracking-tight">
                    Sign in
                  </h2>
                </div>
                <form className="space-y-4">
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full px-3 py-2 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/20"
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    className="w-full px-3 py-2 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/20"
                  />
                  <button
                    type="button"
                    className="w-full py-2 px-4 bg-white text-black rounded-lg font-semibold hover:bg-gray-100 transition-all duration-200"
                  >
                    Sign in
                  </button>
                </form>
              </div>
            </div>
          )
        },
        {
          name: 'Dashboard',
          code: `import React from 'react';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-black">
      <nav className="bg-gray-950 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-lg font-semibold text-white tracking-tight">Dashboard</h1>
            </div>
          </div>
        </div>
      </nav>
      
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl">
            <h3 className="text-sm font-medium text-gray-300 mb-2">Users</h3>
            <p className="text-2xl font-bold text-white">1,234</p>
          </div>
          <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl">
            <h3 className="text-sm font-medium text-gray-300 mb-2">Revenue</h3>
            <p className="text-2xl font-bold text-white">$12,345</p>
          </div>
          <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl">
            <h3 className="text-sm font-medium text-gray-300 mb-2">Orders</h3>
            <p className="text-2xl font-bold text-white">567</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;`,
          preview: () => (
            <div className="min-h-full bg-black">
              <nav className="bg-gray-950 border-b border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="flex justify-between h-16">
                    <div className="flex items-center">
                      <h1 className="text-lg font-semibold text-white tracking-tight">Dashboard</h1>
                    </div>
                  </div>
                </div>
              </nav>
              
              <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl">
                    <h3 className="text-sm font-medium text-gray-300 mb-2">Users</h3>
                    <p className="text-2xl font-bold text-white">1,234</p>
                  </div>
                  <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl">
                    <h3 className="text-sm font-medium text-gray-300 mb-2">Revenue</h3>
                    <p className="text-2xl font-bold text-white">$12,345</p>
                  </div>
                  <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl">
                    <h3 className="text-sm font-medium text-gray-300 mb-2">Orders</h3>
                    <p className="text-2xl font-bold text-white">567</p>
                  </div>
                </div>
              </main>
            </div>
          )
        }
      ]

      setComponents(mockComponents)
      toast.success('UI generated successfully')

    } catch (error: any) {
      toast.error('Failed to generate UI')
    } finally {
      setGenerating(false)
    }
  }

  const handleExport = () => {
    if (!components[activeScreen]) return

    const element = document.createElement('a')
    const file = new Blob([components[activeScreen].code], { type: 'text/plain' })
    element.href = URL.createObjectURL(file)
    element.download = `${components[activeScreen].name}.jsx`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
    toast.success('Code exported successfully')
  }

  const handleRegenerate = async () => {
    if (!project) return
    await generateComponents(project)
    toast.success('UI regenerated successfully')
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-gray-400 text-sm">Loading preview...</p>
        </div>
      </div>
    )
  }

  const PreviewComponent = components[activeScreen]?.preview

  return (
    <div className="h-screen flex flex-col bg-black">
      {/* Top Bar */}
      <header className="h-16 bg-gray-950 border-b border-gray-800 flex items-center justify-between px-6">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            onClick={() => navigate(`/sketch/${projectId}`)}
            size="sm"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-lg font-semibold text-white tracking-tight">
              {project.name}
            </h1>
            <p className="text-xs text-gray-400">AI Generated Preview</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Button variant="ghost" onClick={handleRegenerate} loading={generating} size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Regenerate
          </Button>
          <Button variant="secondary" onClick={handleExport} size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Code
          </Button>
        </div>
      </header>

      {/* Screen Tabs */}
      {components.length > 1 && (
        <div className="bg-gray-950 border-b border-gray-800">
          <div className="flex space-x-1 px-6">
            {components.map((component, index) => (
              <button
                key={index}
                onClick={() => setActiveScreen(index)}
                className={`px-4 py-3 text-sm font-medium rounded-t-lg transition-colors ${
                  activeScreen === index
                    ? 'bg-black text-white border-t border-l border-r border-gray-800'
                    : 'text-gray-400 hover:text-gray-200 hover:bg-gray-900'
                }`}
              >
                {component.name}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex-1 flex">
        {/* Preview Panel */}
        <div className="flex-1 flex flex-col">
          {/* Preview/Code Toggle */}
          <div className="flex border-b border-gray-800">
            <button
              onClick={() => setActiveTab('preview')}
              className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors flex items-center ${
                activeTab === 'preview'
                  ? 'border-white text-white'
                  : 'border-transparent text-gray-400 hover:text-gray-200'
              }`}
            >
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </button>
            <button
              onClick={() => setActiveTab('code')}
              className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors flex items-center ${
                activeTab === 'code'
                  ? 'border-white text-white'
                  : 'border-transparent text-gray-400 hover:text-gray-200'
              }`}
            >
              <Code className="w-4 h-4 mr-2" />
              Code
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-auto">
            {activeTab === 'preview' ? (
              <div className="h-full">
                {PreviewComponent && <PreviewComponent />}
              </div>
            ) : (
              <pre className="p-6 text-sm bg-gray-950 text-gray-300 h-full overflow-auto font-mono">
                <code>{components[activeScreen]?.code}</code>
              </pre>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PreviewScreen