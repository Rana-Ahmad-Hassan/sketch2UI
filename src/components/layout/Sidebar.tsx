import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Plus, Folder, Settings } from 'lucide-react'

interface SidebarProps {
  onNewProject: () => void
}

const Sidebar: React.FC<SidebarProps> = ({ onNewProject }) => {
  const navigate = useNavigate()
  const location = useLocation()

  const menuItems = [
    { icon: Plus, label: 'New Project', action: onNewProject },
    { icon: Folder, label: 'Projects', path: '/dashboard' },
    { icon: Settings, label: 'Settings', path: '/settings' }
  ]

  return (
    <div className="w-56 bg-gray-950 border-r border-gray-500 flex flex-col">
      <div className="p-4 border-b border-gray-500">
        <h1 className="text-sm font-semibold text-white">Sketch2UI</h1>
        <p className="text-xs text-gray-500 mt-0.5">Draw it. See it. Ship it.</p>
      </div>
      
      <nav className="flex-1 p-3">
        <ul className="space-y-1">
          {menuItems.map((item, index) => {
            const isActive = item.path && location.pathname === item.path
            return (
              <li key={index}>
                <button
                  onClick={item.action || (() => item.path && navigate(item.path))}
                  className={`w-full flex items-center space-x-2.5 px-2.5 py-2 rounded-md text-xs font-medium transition-colors ${
                    isActive
                      ? 'bg-gray-800 text-white'
                      : 'text-gray-400 hover:bg-gray-900 hover:text-gray-200'
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </button>
              </li>
            )
          })}
        </ul>
      </nav>
    </div>
  )
}

export default Sidebar