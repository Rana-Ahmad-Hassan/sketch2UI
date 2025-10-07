import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { User, LogOut, Moon, Sun } from 'lucide-react'
import { toast } from 'react-hot-toast'
import { useAuthStore } from '../store/authStore'
import { useThemeStore } from '../store/themeStore'
import Sidebar from '../components/layout/Sidebar'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'

const Settings: React.FC = () => {
  const navigate = useNavigate()
  const { user, logout } = useAuthStore()
  // const { isDark, toggleTheme } = useThemeStore()
  const [loading, setLoading] = useState(false)

  const handleSignOut = async () => {
    logout()
    toast.success('Signed out successfully')
    navigate('/')
  }

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      await new Promise(resolve => setTimeout(resolve, 800))
      toast.success('Profile updated successfully')
    } catch (error: any) {
      toast.error('Failed to update profile')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black flex">
      <Sidebar onNewProject={() => navigate('/dashboard')} />
      
      <main className="flex-1 p-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-white mb-2 tracking-tight">
              Settings
            </h1>
            <p className="text-gray-400 text-sm">
              Manage your account preferences and settings
            </p>
          </div>

          <div className="space-y-6">
            {/* Profile Settings */}
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <div className="flex items-center space-x-3 mb-6">
                <User className="w-5 h-5 text-gray-400" />
                <h2 className="text-lg font-semibold text-white">
                  Profile Settings
                </h2>
              </div>

              <form onSubmit={handleUpdateProfile} className="space-y-5 max-w-sm">
                <Input
                  label="Email Address"
                  type="email"
                  value={user?.email || ''}
                  disabled
                  className="bg-gray-800/50"
                />
                
                <Input
                  label="Display Name"
                  placeholder="Enter your display name"
                  defaultValue={user?.name || ''}
                />

                <Button type="submit" loading={loading} size="sm">
                  Update Profile
                </Button>
              </form>
            </div>

            {/* Theme Settings */}
            {/* <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <div className="flex items-center space-x-3 mb-6">
                {isDark ? <Moon className="w-5 h-5 text-gray-400" /> : <Sun className="w-5 h-5 text-gray-400" />}
                <h2 className="text-lg font-semibold text-white">
                  Appearance
                </h2>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-medium text-white mb-1">
                    Dark Mode
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Toggle between light and dark themes
                  </p>
                </div>
                <button
                  onClick={toggleTheme}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    isDark ? 'bg-white' : 'bg-gray-700'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-black transition-transform ${
                      isDark ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div> */}

            {/* Danger Zone */}
            <div className="bg-gray-900 border border-red-900/50 rounded-xl p-6">
              <h2 className="text-lg font-semibold text-red-400 mb-6">
                Danger Zone
              </h2>

              <div>
                <h3 className="text-base font-medium text-white mb-2">
                  Sign Out
                </h3>
                <p className="text-gray-400 text-sm mb-4">
                  Sign out of your account on this device
                </p>
                <Button variant="destructive" onClick={handleSignOut} size="sm">
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Settings