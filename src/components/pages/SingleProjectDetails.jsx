import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './SingleProjectDetails.css';
import { motion } from 'framer-motion';
import { FaGithub, FaCode } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

// Mock project data
const MOCK_PROJECT = {
    id: '123',
    name: 'React Dashboard App',
    description: 'A modern React dashboard application with analytics and reporting features',
    gitUrl: 'https://github.com/username/react-dashboard',
    framework: 'react',
    createdAt: '2023-05-10T08:30:00Z',
    updatedAt: '2023-06-15T14:20:00Z'
};

// Mock deployments data
const MOCK_DEPLOYMENTS = [
    {
        _id: 'deploy-001',
        status: 'success',
        timestamp: '2023-06-15T14:30:00Z',
        url: 'https://app-001.example.com'
    },
    {
        _id: 'deploy-002',
        status: 'failed',
        timestamp: '2023-06-10T09:15:00Z',
        error: 'Build failed due to missing dependencies'
    },
    {
        _id: 'deploy-003',
        status: 'success',
        timestamp: '2023-05-28T11:45:00Z',
        url: 'https://app-002.example.com'
    }
];

const SingleProjectDetails = () => {
    const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
    const { id } = useParams();
    const navigate = useNavigate();
    const [project, setProject] = useState(null);
    const [deployments, setDeployments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Load mock data with a simulated delay
    useEffect(() => {
        const loadMockData = async () => {
            setIsLoading(true);
            
            try {
                // Simulate API delay
                await new Promise(resolve => setTimeout(resolve, 800));
                setProject(MOCK_PROJECT);
                setDeployments(MOCK_DEPLOYMENTS);
            } catch (error) {
                console.error("Error loading mock data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        loadMockData();
    }, [id]);

    const handleViewCode = () => {
        navigate(`/editor/${id}`);
    };

    const handleDeploy = () => {
        navigate(`/service/${id}`);
    };

    if (isLoading) {
        return (
            <div className="loading-container">
                <div className="loader"></div>
                <p>Loading project details...</p>
            </div>
        );
    }

    if (!project) {
        return null;
    }

    return (
        <div className="project-details-page">
            <motion.header
                className="page-header"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <h1 className="page-title">{project.name}</h1>
                <p className="page-subtitle">Project Overview and Deployments</p>
            </motion.header>

            {/* Action Buttons */}
            <div className="action-buttons">
                <Button 
                    onClick={handleViewCode} 
                    className="code-editor-button"
                    variant="default"
                >
                    <FaCode className="mr-2" /> View Code Editor
                </Button>
                <Button 
                    onClick={handleDeploy} 
                    className="deploy-button"
                    variant="outline"
                >
                    Deploy Project
                </Button>
            </div>

            {/* Project Details Section */}
            <div className="project-details">
                <p className="detail-label">Description:</p>
                <p className="detail-value">{project.description}</p>
                <p className="detail-label">Git URL:</p>
                <a href={project.gitUrl} target="_blank" rel="noopener noreferrer" className="detail-value link">
                    {project.gitUrl} <FaGithub />
                </a>
                <p className="detail-label">Framework:</p>
                <p className="detail-value">{project.framework}</p>
                <p className="detail-label">Last Updated:</p>
                <p className="detail-value">{new Date(project.updatedAt).toLocaleString()}</p>
            </div>

            {/* Deployments Table */}
            <div className="deployments-table-wrapper">
                <Table className="deployments-table">
                    <TableCaption>Deployment History</TableCaption>
                    <TableHead>
                        <TableRow>
                            <TableHeader>Deployment ID</TableHeader>
                            <TableHeader>Status</TableHeader>
                            <TableHeader>Timestamp</TableHeader>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {deployments.length > 0 ? (
                            deployments.map((deployment) => (
                                <TableRow key={deployment._id}>
                                    <TableCell>{deployment._id}</TableCell>
                                    <TableCell className={`status-${deployment.status}`}>{deployment.status}</TableCell>
                                    <TableCell>{new Date(deployment.timestamp).toLocaleString()}</TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={3} className="text-center">No deployments found</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default SingleProjectDetails;