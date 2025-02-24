import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './SingleProjectDetails.css';
import { motion } from 'framer-motion';
import { FaGithub } from 'react-icons/fa';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

const SingleProjectDetails = () => {
    const { id } = useParams();
    const navigate = navigate();
    const [project, setProject] = useState(null);
    const [deployments, setDeployments] = useState([]);
    //add validator useEffect for validation projectId come  in quey param

    //fetch project details with deployments states
    useEffect(() => {
        const fetchProjectDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/project/${id}`);
                if (response.data) {
                    setProject(response.data);
                } else {
                    console.error("Failed to fetch project details");
                    navigate("/projects"); // Redirect if project not found
                }
            } catch (error) {
                console.error("Error fetching project details:", error);
                navigate("/projects"); // Redirect on error
            }
        };


        const fetchDeployments = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/deployments/${id}`);
                if (response.data.success) {
                    setDeployments(response.data.deployments);
                }
            } catch (error) {
                console.error("Error fetching deployments:", error);
            }
        }

        if (id) {
            fetchProjectDetails();
            fetchDeployments();
        }
    }, [id, navigate]); //considering these will find project details and its deployments as one project has multiple deployments


    return (
        //add here all ui render with api endpoints hits and received data
        <>
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

                {/* Project Details Section */}
                <div className="project-details">
                    <p className="detail-label">Description:</p>
                    <p className="detail-value">{project.description}</p>
                    <p className="detail-label">Git URL:</p>
                    <a href={project.gitUrl} target="_blank" rel="noopener noreferrer" className="detail-value link">
                        {project.gitUrl} <FaGithub />
                    </a>
                    {/* Add more project details as needed */}
                </div>

                {/* Deployments Table */}
                <div className="deployments-table-wrapper"> {/* Wrapper for better styling */}
                    <Table className="deployments-table">
                        <TableCaption>Deployment History</TableCaption>
                        <TableHead>
                            <TableRow>
                                <TableHeader>Deployment ID</TableHeader>
                                <TableHeader>Status</TableHeader>
                                <TableHeader>Timestamp</TableHeader>
                                {/* Add more columns as needed */}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {deployments.map((deployment) => (
                                <TableRow key={deployment._id}>
                                    <TableCell>{deployment._id}</TableCell>
                                    <TableCell>{deployment.status}</TableCell>
                                    <TableCell>{new Date(deployment.timestamp).toLocaleString()}</TableCell>
                                    {/* Add more cells/data as needed */}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                </div>

            </div>

        </>
    )
}

export default SingleProjectDetails;