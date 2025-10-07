import React from 'react'
import { Loader2 } from 'lucide-react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'secondary' | 'ghost' | 'destructive'
  size?: 'sm' | 'default' | 'lg'
  loading?: boolean
  children: React.ReactNode
}

const Button: React.FC<ButtonProps> = ({
  variant = 'default',
  size = 'default',
  loading = false,
  children,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black disabled:opacity-50 disabled:cursor-not-allowed'
  
  const variants = {
    default: 'bg-white text-black hover:bg-gray-100 focus:ring-white/20 shadow-sm',
    secondary: 'bg-gray-800 text-gray-200 hover:bg-gray-700 border border-gray-700 focus:ring-gray-500/20',
    ghost: 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/50 focus:ring-gray-500/20',
    destructive: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500/20'
  }
  
  const sizes = {
    sm: 'h-8 px-3 text-xs rounded-md',
    default: 'h-9 px-4 text-sm rounded-md',
    lg: 'h-10 px-6 text-sm rounded-md'
  }

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <Loader2 className="mr-2 h-3 w-3 animate-spin" />}
      {children}
    </button>
  )
}

export default Button