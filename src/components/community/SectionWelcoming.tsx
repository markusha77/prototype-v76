import React from 'react'
import { Link } from 'react-router-dom'
import {Play} from 'lucide-react'

export const HeroSection: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-white sm:text-4xl">
            <span className="block">Discover Amazing Projects</span>
            <span className="block">Built with ChatAndBuild</span>
          </h1>
          
          <p className="mt-4 text-xl text-indigo-100 max-w-2xl mx-auto">
            Explore a community of innovative projects created by developers like you.
            Get inspired, learn new techniques, and share your own creations.
          </p>
          
          <div className="mt-8 flex justify-center space-x-4">
            <Link
              to="https://www.chatandbuild.com/"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-white hover:bg-indigo-50 shadow-md"
            >
              Start Building
            </Link>
             <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-md text-purple-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-purple-600 focus:ring-white transition-all duration-200 hover:shadow-lg">
              <Play className="mr-2 h-4 w-4" />
              Take A Tour
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
