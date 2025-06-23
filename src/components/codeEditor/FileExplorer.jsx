import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { ScrollArea } from '../ui/scroll-area';
import { ChevronDown, ChevronRight, File, Folder } from 'lucide-react';

const FileExplorer = ({ files, onSelectFile, selectedFile }) => {
  // Transform flat file list into a tree structure
  const buildFileTree = (fileList) => {
    const root = { children: {} };
    
    fileList.forEach(file => {
      const pathParts = file.path.split('/').filter(Boolean);
      let currentLevel = root;
      
      // Navigate through path parts to build tree
      pathParts.forEach((part, index) => {
        if (!currentLevel.children[part]) {
          const isLastPart = index === pathParts.length - 1;
          currentLevel.children[part] = {
            ...file,
            name: part,
            children: {},
            isDirectory: !isLastPart || file.type === 'directory'
          };
        }
        currentLevel = currentLevel.children[part];
      });
    });
    
    return root;
  };

  const fileTree = buildFileTree(files);
  
  return (
    <ScrollArea className="h-[calc(100vh-10rem)]">
      <div className="p-2">
        <FileTreeNode 
          node={fileTree} 
          onSelectFile={onSelectFile}
          selectedFile={selectedFile}
          level={0}
          isRoot={true}
        />
      </div>
    </ScrollArea>
  );
};

const FileTreeNode = ({ node, onSelectFile, selectedFile, level = 0, isRoot = false }) => {
  const [expanded, setExpanded] = useState(true);
  
  // Skip rendering for root node
  if (isRoot) {
    return (
      <div className="space-y-1">
        {Object.values(node.children).map((childNode, index) => (
          <FileTreeNode
            key={childNode.id || `dir-${index}`}
            node={childNode}
            onSelectFile={onSelectFile}
            selectedFile={selectedFile}
            level={level}
          />
        ))}
      </div>
    );
  }

  const hasChildren = Object.keys(node.children || {}).length > 0;
  const isDirectory = node.isDirectory;
  const isSelected = selectedFile && selectedFile.id === node.id;

  const handleClick = () => {
    if (isDirectory) {
      setExpanded(!expanded);
    } else {
      onSelectFile(node);
    }
  };

  const getFileIcon = () => {
    if (isDirectory) {
      return expanded ? <Folder className="h-4 w-4 text-blue-400" /> : <Folder className="h-4 w-4 text-blue-300" />;
    }
    
    // Determine file icon based on extension
    const extension = node.name.split('.').pop()?.toLowerCase();
    
    switch(extension) {
      case 'js':
      case 'jsx':
        return <File className="h-4 w-4 text-yellow-400" />;
      case 'ts':
      case 'tsx':
        return <File className="h-4 w-4 text-blue-500" />;
      case 'css':
      case 'scss':
        return <File className="h-4 w-4 text-purple-400" />;
      case 'html':
        return <File className="h-4 w-4 text-orange-400" />;
      case 'json':
        return <File className="h-4 w-4 text-green-400" />;
      case 'md':
        return <File className="h-4 w-4 text-gray-400" />;
      default:
        return <File className="h-4 w-4 text-gray-300" />;
    }
  };

  return (
    <div>
      <div
        className={cn(
          "flex items-center py-1 px-2 rounded-md text-sm cursor-pointer hover:bg-accent/50",
          isSelected && "bg-accent text-accent-foreground"
        )}
        style={{ paddingLeft: `${(level * 12) + 4}px` }}
        onClick={handleClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            handleClick();
            e.preventDefault();
          }
        }}
      >
        <div className="mr-1">
          {isDirectory && (expanded ? 
            <ChevronDown className="h-4 w-4 text-muted-foreground" /> : 
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          )}
        </div>
        <div className="mr-2">
          {getFileIcon()}
        </div>
        <span className="truncate">{node.name}</span>
      </div>
      
      {isDirectory && expanded && (
        <div>
          {Object.values(node.children).map((childNode, index) => (
            <FileTreeNode
              key={childNode.id || `child-${index}`}
              node={childNode}
              onSelectFile={onSelectFile}
              selectedFile={selectedFile}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FileExplorer; 