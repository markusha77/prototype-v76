import React from 'react'

interface WelcomeStepProps {
  onNext: () => void
  onCancel: () => void
}

export const WelcomeStep: React.FC<WelcomeStepProps> = ({ onNext, onCancel }) => {
  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Welcome to Community Spaces</h2>
      
      <div className="max-w-lg mx-auto">
        <p className="text-lg text-gray-600 mb-8">
          We're excited to have you join our community! Let's set up your profile so you can start connecting with other builders and sharing your projects.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-indigo-50 p-6 rounded-lg">
            <div className="text-indigo-600 font-bold text-xl mb-2">1</div>
            <h3 className="font-semibold text-gray-900 mb-2">Create Profile</h3>
            <p className="text-gray-600 text-sm">Set up your personal profile with your information and interests</p>
          </div>
          
          <div className="bg-indigo-50 p-6 rounded-lg">
            <div className="text-indigo-600 font-bold text-xl mb-2">2</div>
            <h3 className="font-semibold text-gray-900 mb-2">Join Spaces</h3>
            <p className="text-gray-600 text-sm">Connect with communities that match your interests</p>
          </div>
          
          <div className="bg-indigo-50 p-6 rounded-lg">
            <div className="text-indigo-600 font-bold text-xl mb-2">3</div>
            <h3 className="font-semibold text-gray-900 mb-2">Share Projects</h3>
            <p className="text-gray-600 text-sm">Showcase your work and get feedback from peers</p>
          </div>
        </div>
        
        <div className="flex justify-center">
          <button
            onClick={onNext}
            className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors shadow-sm hover:shadow"
          >
            Let's Get Started
          </button>
        </div>
      </div>
    </div>
  )
}
