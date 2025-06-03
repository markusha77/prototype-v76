import React from 'react';
import { ArrowLeft, Clock, Users, Code, Laptop, Rocket, Terminal, Lightbulb, Github, Play, BookOpen, Star, Trophy, Zap, Database, Globe, Shield, AlertTriangle, Upload, GitBranch, HelpCircle } from 'lucide-react';
import { Navbar } from '../community/Navbar';
import VideoPlayer from './VideoPlayer';
import { Link } from 'react-router-dom';

const Tutorials = () => {
  const handleTutorialClick = (videoId: string, title: string) => {
    // Convert Google Drive share link to direct view URL and open in new tab
    const getDirectUrl = (id: string) => {
      return `https://drive.google.com/file/d/${id}/view`;
    };
    
    // Open video in new tab
    window.open(getDirectUrl(videoId), '_blank');
  };

  // Tutorial data with thumbnail URLs - USE DIRECT IMAGE URLS ONLY
  const tutorialData = [
    {
      id: "1I55_FA-7TQmBQhg0a3fQFNlfbeZ2hNid",
      title: "Getting Started - Sign in",
      description: "Learn how to sign in to ChatAndBuild and ensure browser compatibility for the best experience.",
      duration: "30 sec",
      difficulty: "Beginner" as const,
      views: "3.1k",
      icon: <Code className="h-6 w-6" />,
      thumbnail: "src/assets/tut-tn/get_started.png" // Login/signin themed
    },
    {
      id: "1B4VJPf7OvQfM9z2T4UhjDl564Cq1rcld",
      title: "Connect Github account",
      description: "Learn how to connect your GitHub account to ChatAndBuild.",
      duration: "27 sec",
      difficulty: "Beginner" as const,
      views: "2.8k",
      icon: <Github className="h-6 w-6" />,
      thumbnail: "src/assets/tut-tn/connect_git.png" // GitHub themed
    },
    {
      id: "1hbPBlq4Tf6LacMZdS2uctTUz4hk2xAYq",
      title: "Build your first project",
      description: "Create your first project using ChatAndBuild.",
      duration: "41 sec",
      difficulty: "Beginner" as const,
      views: "4.2k",
      icon: <Rocket className="h-6 w-6" />,
      thumbnail: "src/assets/tut-tn/first_project.png" // Project building themed
    },
    {
      id: "1AtLVc6kb9rC3vkTQZEaCFnF3h8JWbkHn",
      title: "Error Handling",
      description: "Learn how to handle and debug errors in ChatAndBuild.",
      duration: "40 sec",
      difficulty: "Beginner" as const,
      views: "1.9k",
      icon: <AlertTriangle className="h-6 w-6" />,
      thumbnail: "src/assets/tut-tn/error.png" // Error/debugging themed
    },
    {
      id: "14Mu5-exfarp0l4IVwkDFmDmUvMlEqhPQ",
      title: "Push to Github & Export Chat - Why this is important",
      description: "Learn how to push your projects to GitHub and export chat history.",
      duration: "39 sec",
      difficulty: "Beginner" as const,
      views: "2.3k",
      icon: <Upload className="h-6 w-6" />,
      thumbnail: "src/assets/tut-tn/push_git.png" // Upload/export themed
    },
    {
      id: "14bBfJChUxv2H2dKJOYdVIIYv7nQLm4b3",
      title: "Clone Github & Import Chat function",
      description: "Learn how to clone GitHub repositories and import chat functions.",
      duration: "31 sec",
      difficulty: "Beginner" as const,
      views: "1.7k",
      icon: <GitBranch className="h-6 w-6" />,
      thumbnail: "src/assets/tut-tn/import_git.png" // Git clone themed
    },
    {
      id: "1-tMbQGy1zlsyzxP744nrDIFnCcH8E7bG",
      title: "Support Center",
      description: "Learn how to access and use the support center for help and resources.",
      duration: "39 sec",
      difficulty: "Beginner" as const,
      views: "1.5k",
      icon: <HelpCircle className="h-6 w-6" />,
      thumbnail: "src/assets/tut-tn/issues.png" // Support/help themed
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <div className="flex-grow container mx-auto px-4 py-12 max-w-7xl">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center text-indigo-600 hover:text-indigo-700 font-medium transition-colors duration-200">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Home
          </Link>
        </div>
        
        {/* Hero Section */}
        <div className="mb-16 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Video Tutorials
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Learn ChatAndBuild through comprehensive video tutorials. From basic concepts to advanced techniques, master the art of conversational development.
          </p>
        </div>

        {/* Featured Tutorial */}
        <div className="mb-16">
          <div 
            className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            onClick={() => handleTutorialClick("1bZgauhXlEP2fOnS0VXZewqi71rv1JkN_", "Complete ChatAndBuild Tutorial")}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
              <div>
                <div className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-indigo-50 to-blue-50 text-indigo-700 text-sm font-medium rounded-full mb-4">
                  <Star className="h-4 w-4 mr-1" />
                  Featured Tutorial
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Complete ChatAndBuild Tutorial
                </h2>
                <p className="text-gray-600 mb-6 text-lg">
                  A comprehensive guide covering all features and capabilities of ChatAndBuild. Perfect for getting started and understanding the full potential of conversational development.
                </p>
                <div className="flex items-center gap-6 text-sm text-gray-500 mb-6">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>3:23 minutes</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    <span>All levels</span>
                  </div>
                </div>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></div>
                    <span>Complete overview of ChatAndBuild features</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></div>
                    <span>Essential tips for effective development</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></div>
                    <span>Best practices and workflow optimization</span>
                  </div>
                </div>
              </div>
              <div>
                <VideoPlayer
                  videoId="1bZgauhXlEP2fOnS0VXZewqi71rv1JkN_"
                  title="Complete ChatAndBuild Tutorial"
                  duration="3:23"
                  difficulty="Beginner"
                  views="8.5k"
                  className="h-full"
                  thumbnail="src/assets/tut-tn/main.png" // Featured tutorial thumbnail
                />
              </div>
            </div>
          </div>
        </div>

        {/* Tutorial Categories */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Browse by Category</h2>
          
          {/* Beginner Tutorials */}
          <div className="mb-12">
            <div className="flex items-center mb-6">
              <div className="inline-flex items-center px-4 py-2 bg-green-50 text-green-700 rounded-lg mr-4">
                <span className="font-medium">Beginner</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Getting Started</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tutorialData.map((tutorial) => (
                <TutorialVideoCard
                  key={tutorial.id}
                  icon={tutorial.icon}
                  title={tutorial.title}
                  description={tutorial.description}
                  duration={tutorial.duration}
                  difficulty={tutorial.difficulty}
                  videoId={tutorial.id}
                  views={tutorial.views}
                  thumbnail={tutorial.thumbnail}
                  onClick={handleTutorialClick}
                />
              ))}
            </div>
          </div>
        </div>

        {/* How to Use Videos Section */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">How to Use These Videos</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 text-blue-600 rounded-lg mb-4">
                <Play className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Watch & Learn</h3>
              <p className="text-sm text-gray-600">Follow along with the video tutorials at your own pace</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 text-green-600 rounded-lg mb-4">
                <Code className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Practice</h3>
              <p className="text-sm text-gray-600">Apply what you learn by building your own projects</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 text-purple-600 rounded-lg mb-4">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Share</h3>
              <p className="text-sm text-gray-600">Join our community to share your progress and get help</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-2xl p-12 text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Learning?</h2>
            <p className="text-xl mb-8 opacity-90">
              Begin your ChatAndBuild journey with our comprehensive video tutorials
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="px-8 py-3 bg-white text-indigo-600 hover:bg-gray-100 rounded-lg font-medium transition-all duration-200 flex items-center justify-center">
                <Play className="mr-2 h-5 w-5" /> Start with Basics
              </button>
              <button className="px-8 py-3 bg-indigo-700 hover:bg-indigo-800 text-white rounded-lg font-medium transition-all duration-200 flex items-center justify-center">
                <BookOpen className="mr-2 h-5 w-5" /> Browse All Tutorials
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Tutorial Video Card Component
interface TutorialVideoCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  videoId: string;
  views?: string;
  thumbnail?: string;
  onClick: (videoId: string, title: string) => void;
}

function TutorialVideoCard({ icon, title, description, duration, difficulty, videoId, views, thumbnail, onClick }: TutorialVideoCardProps) {
  const difficultyColor = {
    'Beginner': 'bg-green-50 text-green-700',
    'Intermediate': 'bg-blue-50 text-blue-700',
    'Advanced': 'bg-purple-50 text-purple-700'
  }[difficulty];

  const handleCardClick = () => {
    onClick(videoId, title);
  };

  return (
    <div 
      className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden group cursor-pointer transform hover:-translate-y-1"
      onClick={handleCardClick}
    >
      {/* Enhanced Video Player with custom thumbnail */}
      <div>
        <VideoPlayer
          videoId={videoId}
          title={title}
          duration={duration}
          difficulty={difficulty}
          views={views}
          thumbnail={thumbnail}
        />
      </div>
      
      {/* Content */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <div className="text-indigo-600 p-2 bg-indigo-50 rounded-lg group-hover:bg-indigo-100 transition-colors duration-200">{icon}</div>
          <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${difficultyColor}`}>
            {difficulty}
          </span>
        </div>
        
        <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors duration-200">
          {title}
        </h3>
        
        <p className="text-gray-600 text-sm mb-4">
          {description}
        </p>
        
        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
          <div className="flex items-center text-gray-500 text-sm">
            <Clock className="h-4 w-4 mr-1" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center text-indigo-600 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <Play className="h-4 w-4 mr-1" />
            <span>Watch Now</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tutorials;
