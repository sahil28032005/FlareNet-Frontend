import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import "./projectLister.css";
import { useUser } from "../../context/userContext";

const ProjectLister = () => {
    const [projects, setProjects] = useState([]);
    const navigate = useNavigate();
    const { user } = useUser();  // Access user from context

    // Fetch user's projects
    useEffect(() => {
        if (!user?.id) {
            console.log("No user is logged in!");
            navigate("/login");
            return;
        }
        const fetchProjects = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/projects/${user.id}`);
                if (response.data.success) {
                    setProjects(response.data.data);
                }
            } catch (e) {
                console.error("Error fetching projects:", e.message);
            }
        };
        fetchProjects();
    }, [user, navigate]);

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-grid-pattern opacity-[0.07]" />
                <div className="absolute top-1/4 left-1/4 w-[40rem] h-[40rem] bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full filter blur-3xl animate-orb-float" />
                <div className="absolute bottom-1/4 right-1/4 w-[35rem] h-[35rem] bg-gradient-to-r from-indigo-500/10 to-blue-500/10 rounded-full filter blur-3xl animate-orb-float-delayed" />
            </div>

            <div className="relative z-10 container mx-auto px-4 py-16">
                <motion.header
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                        Your Projects
                    </h1>
                    <p className="text-lg md:text-xl text-gray-400">
                        Manage and explore your projects with ease
                    </p>
                </motion.header>

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    initial="hidden"
                    animate="visible"
                    variants={{
                        hidden: { opacity: 0 },
                        visible: {
                            opacity: 1,
                            transition: { staggerChildren: 0.2 },
                        },
                    }}
                >
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            className="group relative rounded-2xl backdrop-blur-md bg-slate-800/30 border border-blue-500/10 
                                     hover:border-blue-500/30 transition-all duration-500 overflow-hidden"
                            whileHover={{ scale: 1.02 }}
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                visible: { opacity: 1, y: 0 },
                            }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 opacity-0 
                                          group-hover:opacity-100 transition-opacity duration-500" />
                            
                            <div className="p-6 space-y-4 relative z-10">
                                <h3 className="text-xl font-semibold bg-gradient-to-r from-blue-400 to-cyan-400 
                                             bg-clip-text text-transparent">{project.name}</h3>
                                <p className="text-gray-300 line-clamp-3">{project.description}</p>
                                
                                <div className="flex items-center gap-4 pt-4">
                                    <button
                                        onClick={() => navigate(`/projectDetails/${project.id}`)}
                                        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800/80 
                                                 border border-blue-500/20 text-gray-200 hover:border-blue-500/40 
                                                 hover:bg-slate-800/90 transition-all duration-300"
                                    >
                                        <FaGithub className="text-xl" />
                                        <span>View</span>
                                    </button>
                                    <button
                                        onClick={() => navigate(`/service/${project.id}`)}
                                        className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 
                                                 text-white font-medium hover:from-blue-500 hover:to-blue-400 
                                                 transform hover:scale-[1.02] transition-all duration-300
                                                 shadow-lg shadow-blue-500/20"
                                    >
                                        Deploy
                                    </button>
                                </div>
                            </div>
                            
                            {/* Glow Effects */}
                            <div className="absolute -inset-px bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl 
                                          opacity-0 group-hover:opacity-15 blur-sm transition-opacity duration-500" />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default ProjectLister;
