import React from 'react'
import { Link } from 'react-router-dom'

export const AuthButtons: React.FC = () => {
  return (
    <div className="flex items-center space-x-3">
      <Link 
        to="/signin" 
        className="text-gray-700 font-medium hover:text-indigo-600 px-4 py-2 rounded-md"
      >
        Sign In
      </Link>
      
      <Link 
        to="/landing" 
        className="bg-indigo-600 text-white font-medium px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
      >
        Get Started
      </Link>
    </div>
  )
}
