import React, { useState, useEffect } from 'react';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '../ui/resizable';
import FileExplorer from './FileExplorer';
import Editor from './Editor';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Loader2, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';

// Mock data for files
const MOCK_FILES = [
  { id: '1', name: 'index.js', path: 'src/index.js', type: 'file' },
  { id: '2', name: 'App.jsx', path: 'src/App.jsx', type: 'file' },
  { id: '3', name: 'components', path: 'src/components', type: 'directory' },
  { id: '4', name: 'Button.jsx', path: 'src/components/Button.jsx', type: 'file' },
  { id: '5', name: 'Card.jsx', path: 'src/components/Card.jsx', type: 'file' },
  { id: '6', name: 'utils', path: 'src/utils', type: 'directory' },
  { id: '7', name: 'helpers.js', path: 'src/utils/helpers.js', type: 'file' },
  { id: '8', name: 'constants.js', path: 'src/utils/constants.js', type: 'file' },
  { id: '9', name: 'package.json', path: 'package.json', type: 'file' },
  { id: '10', name: 'README.md', path: 'README.md', type: 'file' },
];

// Mock file content
const MOCK_FILE_CONTENTS = {
  '1': `import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);`,
  '2': `import React from 'react';
import { Button } from './components/Button';
import { Card } from './components/Card';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to My React App</h1>
        <Card title="Getting Started">
          <p>Edit <code>src/App.js</code> and save to reload.</p>
          <Button>Learn React</Button>
        </Card>
      </header>
    </div>
  );
}

export default App;`,
  '4': `import React from 'react';
import './Button.css';

export const Button = ({ children, onClick, variant = 'primary' }) => {
  return (
    <button 
      className={\`button \${variant}\`} 
      onClick={onClick}
    >
      {children}
    </button>
  );
};`,
  '5': `import React from 'react';
import './Card.css';

export const Card = ({ title, children }) => {
  return (
    <div className="card">
      {title && <h2 className="card-title">{title}</h2>}
      <div className="card-content">
        {children}
      </div>
    </div>
  );
};`,
  '7': `// Helper functions

/**
 * Format a date to a readable string
 * @param {Date} date - The date to format
 * @returns {string} Formatted date string
 */
export const formatDate = (date) => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
};

/**
 * Truncate a string if it's longer than maxLength
 * @param {string} str - The string to truncate
 * @param {number} maxLength - Maximum length before truncating
 * @returns {string} Truncated string
 */
export const truncate = (str, maxLength = 100) => {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength) + '...';
};`,
  '8': `// Application constants

export const API_BASE_URL = process.env.NODE_ENV === 'production'
  ? 'https://api.example.com'
  : 'http://localhost:5000';

export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system'
};

export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB in bytes`,
  '9': `{
  "name": "my-react-app",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "@testing-library/jest-dom": "^5.16.5",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^13.5.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-scripts": "5.0.1",
    "web-vitals": "^2.1.4"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ]
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}`,
  '10': `# My React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### \`npm start\`

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### \`npm test\`

Launches the test runner in the interactive watch mode.

### \`npm run build\`

Builds the app for production to the \`build\` folder.`
};

const CodeEditorLayout = ({ projectId }) => {
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileContent, setFileContent] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('explorer');

  // Load mock files with a simulated delay
  useEffect(() => {
    const loadMockFiles = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));
        setFiles(MOCK_FILES);
      } catch (err) {
        console.error('Error loading files:', err);
        setError('Failed to load files. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };
    
    loadMockFiles();
  }, []);

  // Handle file selection
  const handleFileSelect = async (file) => {
    if (file.type === 'directory') return;
    
    setSelectedFile(file);
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 400));
      
      const content = MOCK_FILE_CONTENTS[file.id];
      if (content) {
        setFileContent(content);
      } else {
        setFileContent(`// No content available for ${file.name}`);
      }
    } catch (err) {
      console.error('Error fetching file content:', err);
      setError('Failed to load file content. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      <div className="flex-1 overflow-hidden">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel defaultSize={20} minSize={15} maxSize={30} className="bg-muted/10">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="w-full grid grid-cols-2">
                <TabsTrigger value="explorer">Explorer</TabsTrigger>
                <TabsTrigger value="search">Search</TabsTrigger>
              </TabsList>
              
              <TabsContent value="explorer" className="p-0 border-none">
                {isLoading && !files.length ? (
                  <div className="flex items-center justify-center h-32">
                    <Loader2 className="h-6 w-6 animate-spin text-primary" />
                  </div>
                ) : error && !files.length ? (
                  <Alert variant="destructive" className="m-2">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                ) : (
                  <FileExplorer 
                    files={files} 
                    onSelectFile={handleFileSelect} 
                    selectedFile={selectedFile}
                  />
                )}
              </TabsContent>
              
              <TabsContent value="search" className="border-none p-2">
                <div className="text-sm text-muted-foreground">
                  Search functionality will be implemented here
                </div>
              </TabsContent>
            </Tabs>
          </ResizablePanel>
          
          <ResizableHandle />
          
          <ResizablePanel defaultSize={80}>
            {selectedFile ? (
              <Editor 
                fileContent={fileContent} 
                fileName={selectedFile?.name || ''} 
                isLoading={isLoading} 
                error={error}
              />
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                Select a file to view its content
              </div>
            )}
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
};

export default CodeEditorLayout; 