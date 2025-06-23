import React, { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { Loader2, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';

const CodeEditor = ({ fileContent, fileName, isLoading, error }) => {
  const [language, setLanguage] = useState('javascript');
  const [theme, setTheme] = useState('vs-dark');
  
  // Determine language based on file extension
  useEffect(() => {
    if (!fileName) return;
    
    const extension = fileName.split('.').pop()?.toLowerCase();
    
    switch(extension) {
      case 'js':
        setLanguage('javascript');
        break;
      case 'jsx':
        setLanguage('javascript');
        break;
      case 'ts':
        setLanguage('typescript');
        break;
      case 'tsx':
        setLanguage('typescript');
        break;
      case 'html':
        setLanguage('html');
        break;
      case 'css':
        setLanguage('css');
        break;
      case 'scss':
        setLanguage('scss');
        break;
      case 'json':
        setLanguage('json');
        break;
      case 'md':
        setLanguage('markdown');
        break;
      case 'py':
        setLanguage('python');
        break;
      case 'go':
        setLanguage('go');
        break;
      case 'java':
        setLanguage('java');
        break;
      case 'php':
        setLanguage('php');
        break;
      case 'c':
        setLanguage('c');
        break;
      case 'cpp':
      case 'cc':
        setLanguage('cpp');
        break;
      case 'rb':
        setLanguage('ruby');
        break;
      case 'rs':
        setLanguage('rust');
        break;
      case 'sh':
      case 'bash':
        setLanguage('shell');
        break;
      case 'yml':
      case 'yaml':
        setLanguage('yaml');
        break;
      default:
        setLanguage('plaintext');
    }
  }, [fileName]);

  // Handle editor options
  const editorOptions = {
    minimap: { enabled: true },
    scrollBeyondLastLine: false,
    automaticLayout: true,
    scrollbar: {
      vertical: 'auto',
      horizontal: 'auto',
    },
    readOnly: true, // Set to false if you want to enable editing
    fontSize: 14,
    fontFamily: 'Menlo, Monaco, "Courier New", monospace',
    lineNumbers: 'on',
    wordWrap: 'on',
    renderLineHighlight: 'all',
    formatOnPaste: true,
    tabSize: 2,
  };

  // Handle editor mounting
  const handleEditorDidMount = (editor, monaco) => {
    // You can add any additional configuration here
    editor.focus();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full p-4">
        <Alert variant="destructive" className="max-w-md">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="h-full w-full flex flex-col">
      <div className="border-b border-border px-4 py-2 bg-muted/30 flex items-center">
        <span className="text-sm font-medium">{fileName}</span>
      </div>
      <div className="flex-1">
        <Editor
          height="100%"
          width="100%"
          language={language}
          theme={theme}
          value={fileContent}
          options={editorOptions}
          onMount={handleEditorDidMount}
          loading={
            <div className="flex items-center justify-center h-full">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
            </div>
          }
        />
      </div>
    </div>
  );
};

export default CodeEditor; 