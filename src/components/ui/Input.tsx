import React from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

const Input: React.FC<InputProps> = ({ label, error, className = '', ...props }) => {
  return (
    <div className="space-y-1.5">
      {label && (
        <label className="text-xs font-medium text-gray-300 block">
          {label}
        </label>
      )}
      <input
        className={`flex h-9 w-full rounded-md border border-gray-800 bg-gray-950 px-3 py-1 text-sm text-gray-100 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-white/10 focus:border-gray-700 transition-all ${className} ${
          error ? 'border-red-500 focus:ring-red-500/20' : ''
        }`}
        {...props}
      />
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  )
}

export default Input