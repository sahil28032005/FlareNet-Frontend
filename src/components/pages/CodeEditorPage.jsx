import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CodeEditorLayout from '../codeEditor/CodeEditorLayout';

// Mock project data
const MOCK_PROJECT = {
  id: '123',
  name: 'Sample React Project',
  description: 'A sample React project for demonstration',
  gitUrl: 'https://github.com/username/sample-project',
  createdAt: '2023-06-15T10:30:00Z',
  updatedAt: '2023-06-20T14:45:00Z',
};

const CodeEditorPage = () => {
  const { projectId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [project, setProject] = useState(null);

  useEffect(() => {
    const loadMockProject = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 600));
        setProject(MOCK_PROJECT);
      } catch (err) {
        console.error('Error loading project:', err);
        setError('Failed to load project details. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };
    
    loadMockProject();
  }, [projectId]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-background">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-muted-foreground">Loading project...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-background">
        <div className="bg-destructive/15 text-destructive p-6 rounded-lg border border-destructive/30 max-w-md">
          <h2 className="text-xl font-semibold mb-2">Error</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-background">
      <CodeEditorLayout projectId={projectId} />
    </div>
  );
};

export default CodeEditorPage; 