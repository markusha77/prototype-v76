import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link, useLocation } from 'react-router-dom';
import { useProfile } from '../../hooks/useProfile';
import Input from './ui/Input';
import TextArea from './ui/TextArea';
import MultiSelect from './ui/MultiSelect';
import Button from './ui/Button';
import FileUpload from './ui/FileUpload';
import { CATEGORIES, TECHNOLOGIES } from '../../types';
import { Link as LinkIcon, Tag, Code, ArrowLeft, Users, Globe } from 'lucide-react';
import logo from '../../assets/logo.svg';

// Define Project type to match the context expectations
interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  demoUrl?: string;
  repoUrl?: string;
  categories: string[];
  technologies: string[];
  additionalImages?: string[];
  selectedCommunities?: string[];
  selectedOpenSpaces?: string[];
  createdAt: string;
}

interface ProjectImage {
  url: string;
  file: File;
  isMain: boolean;
}

// Available communities
const COMMUNITIES = [
  'EcoTech Innovators',
  'AI Creators Collective',
  'Design Systems Guild'
];

// Available open spaces - empty array since user is not part of any
const OPEN_SPACES: string[] = [];

const ProjectForm: React.FC = () => {
  const { profile, addProject, updateProject } = useProfile();
  const navigate = useNavigate();
  const location = useLocation();
  const { projectId } = useParams();
  
  // Check if we came from the Welcome page
  const fromWelcome = location.state?.from === '/builder' || document.referrer.includes('/builder');
  
  const emptyProject: Project = {
    id: crypto.randomUUID(),
    title: '',
    description: '',
    image: '',
    demoUrl: '',
    repoUrl: '',
    categories: [],
    technologies: [],
    selectedCommunities: [],
    selectedOpenSpaces: [],
    createdAt: new Date().toISOString()
  };
  
  const existingProject = projectId && profile?.projects 
    ? profile.projects.find(p => p.id === projectId) 
    : null;
  
  const [formData, setFormData] = useState<Project>(existingProject || emptyProject);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [projectImages, setProjectImages] = useState<ProjectImage[]>([]);

  useEffect(() => {
    if (projectId && !existingProject) {
      navigate('/projects');
    }
    
    // Initialize project images if editing an existing project
    if (existingProject && existingProject.image) {
      setProjectImages([
        { url: existingProject.image, file: new File([], 'main-image'), isMain: true }
      ]);
      
      // If the project has additional images, add them too
      if (existingProject.additionalImages && existingProject.additionalImages.length > 0) {
        const additionalImageObjects = existingProject.additionalImages.map(url => ({
          url,
          file: new File([], `additional-image-${Math.random()}`),
          isMain: false
        }));
        
        setProjectImages(prev => [...prev, ...additionalImageObjects]);
      }
    }
  }, [projectId, existingProject, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCategoriesChange = (categories: string[]) => {
    setFormData(prev => ({ ...prev, categories }));
  };

  const handleTechnologiesChange = (technologies: string[]) => {
    setFormData(prev => ({ ...prev, technologies }));
  };

  const handleCommunitiesChange = (communities: string[]) => {
    setFormData(prev => ({ ...prev, selectedCommunities: communities }));
  };

  const handleOpenSpacesChange = (openSpaces: string[]) => {
    setFormData(prev => ({ ...prev, selectedOpenSpaces: openSpaces }));
  };

  const handleImageSelect = (file: File, isMain: boolean = false) => {
    // Create a temporary URL for the image
    const imageUrl = URL.createObjectURL(file);
    
    // Modified logic: If there's no main image yet, set this as main
    // Otherwise, add to additional images
    if (isMain && !formData.image) {
      // Only set as main if there's no main image yet
      setFormData(prev => ({ ...prev, image: imageUrl }));
      
      setProjectImages(prev => [
        ...prev,
        { url: imageUrl, file, isMain: true }
      ]);
    } else {
      // Add to additional images
      setProjectImages(prev => [
        ...prev,
        { url: imageUrl, file, isMain: false }
      ]);
    }
  };

  const handleMultipleFilesSelect = (files: File[]) => {
    // Process each file
    files.forEach((file) => {
      const imageUrl = URL.createObjectURL(file);
      
      // Modified logic: If there's no main image yet, set the first one as main
      // Otherwise, add all to additional images
      if (!formData.image && projectImages.length === 0) {
        // Set the first image as main only if there's no main image yet
        setFormData(prev => ({ ...prev, image: imageUrl }));
        setProjectImages(prev => [
          ...prev,
          { url: imageUrl, file, isMain: true }
        ]);
      } else {
        // Add to additional images
        setProjectImages(prev => [
          ...prev,
          { url: imageUrl, file, isMain: false }
        ]);
      }
    });
  };

  const handleClearImage = (imageUrl?: string) => {
    if (!imageUrl) {
      // Clear main image
      const mainImage = projectImages.find(img => img.isMain);
      if (mainImage) {
        // Remove the main image
        setProjectImages(prev => prev.filter(img => !img.isMain));
        
        // Set a new main image if there are other images
        const remainingImages = projectImages.filter(img => !img.isMain);
        if (remainingImages.length > 0) {
          const newMainImage = remainingImages[0];
          setFormData(prev => ({ ...prev, image: newMainImage.url }));
          
          setProjectImages(prev => 
            prev.map(img => 
              img.url === newMainImage.url 
                ? { ...img, isMain: true } 
                : img
            )
          );
        } else {
          setFormData(prev => ({ ...prev, image: '' }));
        }
      }
    } else {
      // Clear a specific image
      setProjectImages(prev => prev.filter(img => img.url !== imageUrl));
    }
  };

  const handleSetMainImage = (imageUrl: string) => {
    // Update form data with new main image
    setFormData(prev => ({ ...prev, image: imageUrl }));
    
    // Update project images to reflect the new main image
    setProjectImages(prev => 
      prev.map(img => ({
        ...img,
        isMain: img.url === imageUrl
      }))
    );
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (formData.categories.length === 0) newErrors.categories = 'Select at least one category';
    if (formData.technologies.length === 0) newErrors.technologies = 'Select at least one technology';
    if (!formData.image) newErrors.image = 'At least one image is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    // In a real app, you would upload the image files to a server here
    // and get back permanent URLs to store in the project data
    
    // Get additional images (non-main images)
    const additionalImages = projectImages
      .filter(img => !img.isMain)
      .map(img => img.url);
    
    // Update the project data with all images
    const updatedProject = {
      ...formData,
      additionalImages
    };
    
    if (existingProject) {
      updateProject(updatedProject);
    } else {
      addProject(updatedProject);
    }
    
    // Navigate based on where user came from
    if (fromWelcome) {
      navigate('/builder');
    } else {
      navigate('/projects');
    }
  };

  const handleBackClick = () => {
    // Navigate based on where user came from
    if (fromWelcome) {
      navigate('/builder');
    } else {
      navigate('/profile');
    }
  };

  const handleCancelClick = () => {
    // Navigate based on where user came from
    if (fromWelcome) {
      navigate('/builder');
    } else {
      navigate('/profile');
    }
  };

  // Get main image URL and additional image URLs for the FileUpload component
  const mainImageUrl = formData.image || '';
  const additionalImageUrls = projectImages
    .filter(img => !img.isMain)
    .map(img => img.url);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/community" className="flex items-center">
                <img src={logo} alt="ChatAndBuild Logo" className="h-8 w-8 mr-2" />
                <span className="text-xl font-bold text-indigo-600">ChatAndBuild</span>
              </Link>
              
              <nav className="hidden md:ml-10 md:flex md:space-x-8">
                {/* <Link to="/community" className="text-gray-500 hover:text-indigo-600 px-3 py-2 rounded-md">
                  Community
                </Link> */}
               
              </nav>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-3xl mx-auto mt-8">
        {/* Back button positioned 5px lower than the card top edge */}
        <div className="flex items-start gap-4">
          <button 
            onClick={handleBackClick}
            className="p-4 rounded-full bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-600 hover:from-blue-600 hover:via-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 mt-1"
            aria-label="Back to profile"
          >
            <ArrowLeft size={24} className="text-white" />
          </button>

          <div className="flex-1 bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 py-6 px-8">
              <h2 className="text-2xl font-bold text-white">
                {existingProject ? 'Edit Project' : 'Add New Project'}
              </h2>
            </div>
            
            <form onSubmit={handleSubmit} className="p-8">
              <div className="space-y-8">
                <div className="space-y-6">
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                      Project Title <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      placeholder="e.g. E-commerce Platform"
                      required
                      className={`w-full px-3 py-2 border ${
                        errors.title
                          ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500'
                          : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'
                      } rounded-md shadow-sm focus:outline-none sm:text-sm`}
                    />
                    {errors.title && <p className="mt-1.5 text-sm text-red-600">{errors.title}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                      Project Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Describe your project, its features, and what problem it solves"
                      required
                      rows={5}
                      className={`w-full px-3 py-2 border ${
                        errors.description
                          ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500'
                          : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'
                      } rounded-md shadow-sm focus:outline-none sm:text-sm`}
                    />
                    {errors.description && <p className="mt-1.5 text-sm text-red-600">{errors.description}</p>}
                  </div>
                  
                  <FileUpload 
                    onFileSelect={handleImageSelect}
                    onMultipleFilesSelect={handleMultipleFilesSelect}
                    currentImageUrl={mainImageUrl}
                    additionalImages={additionalImageUrls}
                    onClearImage={handleClearImage}
                    onSetMainImage={handleSetMainImage}
                    multiple={true}
                  />
                  {errors.image && <p className="mt-1.5 text-sm text-red-600">{errors.image}</p>}
                </div>
                
                <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                  <h3 className="text-lg font-medium text-gray-800 mb-4">Project Links</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <div className="flex items-center space-x-2">
                        <div className="p-2 rounded-full bg-indigo-50">
                          <LinkIcon size={18} className="text-indigo-600" />
                        </div>
                        <div className="w-full">
                          <label htmlFor="demoUrl" className="block text-sm font-medium text-gray-700 mb-1">
                            Demo URL
                          </label>
                          <input
                            type="text"
                            id="demoUrl"
                            name="demoUrl"
                            value={formData.demoUrl || ''}
                            onChange={handleChange}
                            placeholder="https://yourdemo.com"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex items-center space-x-2">
                        <div className="p-2 rounded-full bg-indigo-50">
                          <Code size={18} className="text-indigo-600" />
                        </div>
                        <div className="w-full">
                          <label htmlFor="repoUrl" className="block text-sm font-medium text-gray-700 mb-1">
                            Repository URL
                          </label>
                          <input
                            type="text"
                            id="repoUrl"
                            name="repoUrl"
                            value={formData.repoUrl || ''}
                            onChange={handleChange}
                            placeholder="https://github.com/yourusername/project"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                  <h3 className="text-lg font-medium text-gray-800 mb-4">Project Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <div className="p-2 rounded-full bg-indigo-50">
                          <Tag size={18} className="text-indigo-600" />
                        </div>
                        <label className="block text-sm font-medium text-gray-700">
                          Categories <span className="text-red-500">*</span>
                        </label>
                      </div>
                      <MultiSelect
                        options={CATEGORIES}
                        selectedValues={formData.categories}
                        onChange={handleCategoriesChange}
                        placeholder="Select categories"
                        error={errors.categories}
                      />
                      {errors.categories && <p className="mt-1.5 text-sm text-red-600">{errors.categories}</p>}
                    </div>
                    
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <div className="p-2 rounded-full bg-indigo-50">
                          <Code size={18} className="text-indigo-600" />
                        </div>
                        <label className="block text-sm font-medium text-gray-700">
                          Technologies Used <span className="text-red-500">*</span>
                        </label>
                      </div>
                      <MultiSelect
                        options={TECHNOLOGIES}
                        selectedValues={formData.technologies}
                        onChange={handleTechnologiesChange}
                        placeholder="Select technologies"
                        error={errors.technologies}
                      />
                      {errors.technologies && <p className="mt-1.5 text-sm text-red-600">{errors.technologies}</p>}
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-100">
                  <h3 className="text-lg font-medium text-gray-800 mb-2">Share with Communities & Open Spaces</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Choose communities and open spaces where you'd like to share this project
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <div className="p-2 rounded-full bg-blue-50">
                          <Users size={18} className="text-blue-600" />
                        </div>
                        <label className="block text-sm font-medium text-gray-700">
                          Communities
                        </label>
                      </div>
                      <MultiSelect
                        options={COMMUNITIES}
                        selectedValues={formData.selectedCommunities || []}
                        onChange={handleCommunitiesChange}
                        placeholder="Select communities"
                      />
                      <p className="mt-1 text-xs text-gray-500">
                        Share with specific communities you're part of
                      </p>
                    </div>
                    
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <div className="p-2 rounded-full bg-purple-50">
                          <Globe size={18} className="text-purple-600" />
                        </div>
                        <label className="block text-sm font-medium text-gray-700">
                          Open Spaces
                        </label>
                      </div>
                      <MultiSelect
                        options={OPEN_SPACES}
                        selectedValues={formData.selectedOpenSpaces || []}
                        onChange={handleOpenSpacesChange}
                        placeholder="Select open spaces"
                        defaultOption="You are not part of any Open Space yet"
                      />
                      <p className="mt-1 text-xs text-gray-500">
                        Share in relevant topic-based open spaces
                      </p>
                    </div>
                  </div>
                  
                  {(formData.selectedCommunities?.length || 0) + (formData.selectedOpenSpaces?.length || 0) > 0 && (
                    <div className="mt-4 p-3 bg-white rounded-lg border border-blue-200">
                      <div className="flex items-center gap-2 text-sm text-blue-700">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="font-medium">
                          Your project will be shared with {(formData.selectedCommunities?.length || 0) + (formData.selectedOpenSpaces?.length || 0)} location(s)
                        </span>
                      </div>
                      <div className="mt-2 flex flex-wrap gap-1">
                        {formData.selectedCommunities?.map(community => (
                          <span key={community} className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                            <Users size={12} className="mr-1" />
                            {community}
                          </span>
                        ))}
                        {formData.selectedOpenSpaces?.map(space => (
                          <span key={space} className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-purple-100 text-purple-800">
                            <Globe size={12} className="mr-1" />
                            {space}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="mt-10 pt-6 border-t border-gray-100 flex justify-end space-x-4">
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={handleCancelClick}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  {existingProject ? 'Update Project' : 'Add Project'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectForm;
