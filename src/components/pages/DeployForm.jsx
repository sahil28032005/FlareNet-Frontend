import React, { useState, useEffect } from "react";
import {
    Select,
    SelectTrigger,
    SelectContent,
    SelectItem,
    SelectValue,
} from "../ui/select";
import { useNavigate, useParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { motion } from "framer-motion";
import { FiCheckCircle, FiXCircle, FiTerminal, FiGitBranch } from "react-icons/fi";

const DeployForm = () => {
    const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
    const navigate = useNavigate();
    let { id } = useParams();
    const [gitUrl, setGitUrl] = useState("");
    const [projectName, setProjectName] = useState("");
    const [envVariables, setEnvVariables] = useState([{ key: "", value: "" }]);
    const [framework, setFramework] = useState("");
    const [autoDeploy, setAutoDeploy] = useState(false);
    const [isReactProject, setIsReactProject] = useState(false);
    const [validationError, setValidationError] = useState("");
    const [detectedFramework, setDetectedFramework] = useState("");
    const [customBuildCommand, setCustomBuildCommand] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (detectedFramework.buildCommand) {
            setCustomBuildCommand(detectedFramework.buildCommand);
        }
    }, [detectedFramework]);

    const handleAddEnvVariable = () => {
        setEnvVariables([...envVariables, { key: "", value: "" }]);
    };

    const handleEnvVariableChange = (index, field, value) => {
        const updatedEnvVariables = [...envVariables];
        updatedEnvVariables[index][field] = value;
        setEnvVariables(updatedEnvVariables);
    };

    const handleFrameworkChange = (value) => {
        setFramework(value);
    };

    const handleAutoDeployChange = () => {
        setAutoDeploy(!autoDeploy);
    };

    const fetchProjectDetails = async () => {
        try {
            if (!gitUrl) return;

            const match = gitUrl.match(/github\.com\/([^/]+)\/([^/.]+)(?:\.git)?/);
            const owner = match ? match[1] : null;
            const repo = match ? match[2] : null;

            const githubToken = localStorage.getItem('github_token');
            if (!githubToken) {
                throw new Error('GitHub token not found in localStorage');
            }

            const response = await axios.get(`${API_URL}/api/validdeployment/validate-react`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${githubToken}`
                },
                params: { owner, repo }
            });

            if (response.data.message === "Valid React project") {
                setIsReactProject(true);
                setDetectedFramework(response.data.framework);
                setValidationError("");
            } else {
                setIsReactProject(false);
                setValidationError(response.data.message);
            }
        }
        catch (error) {
            console.error("Error validating project:", error);
            setValidationError("Error validating project. Please check the Git URL and token.");
        }
    };

    useEffect(() => {
        fetchProjectDetails();
    }, [gitUrl]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!id) {
            alert("Project ID is missing. Cannot deploy.");
            return;
        }

        setIsSubmitting(true);
        try {
            const response = await fetch(`${API_URL}/deploy`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    projectId: id,
                    gitUrl,
                    framework,
                    autoDeploy,
                    envVariables,
                    buildCommand: customBuildCommand,
                }),
            });

            if (response.ok) {
                const responseData = await response.json();
                navigate(`/progress/${responseData.data.deploymentId}`, {
                    state: { autoDeploy, gitUrl },
                });
            } else {
                const errorData = await response.json();
                alert(`Deployment failed: ${errorData.message || "Unknown error"}`);
            }
        } catch (error) {
            alert("An error occurred while deploying the project. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const response = await fetch(`${API_URL}/api/project/${id}`);
                const project = await response.json();
                if (response.ok) {
                    setGitUrl(project.gitUrl || "");
                    setProjectName(project.name || "");
                    setEnvVariables(project.envVariables || [{ key: "", value: "" }]);
                    setFramework(project.framework || "");
                }
            } catch (error) {
                console.error("Error fetching project:", error);
            }
        };

        if (id) fetchProject();
    }, [id]);

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-grid-pattern opacity-[0.07]" />
                <div className="absolute top-1/4 left-1/4 w-[40rem] h-[40rem] bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full filter blur-3xl animate-orb-float" />
                <div className="absolute bottom-1/4 right-1/4 w-[35rem] h-[35rem] bg-gradient-to-r from-indigo-500/10 to-blue-500/10 rounded-full filter blur-3xl animate-orb-float-delayed" />
            </div>
            <div className="relative z-10 container mx-auto px-4 py-12 flex items-center justify-center min-h-screen">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-2xl backdrop-blur-xl bg-slate-900/50 rounded-2xl border border-blue-500/10 
                              hover:border-blue-500/20 transition-all duration-500 p-8 shadow-xl"
                >
                    <h2 className="text-3xl sm:text-4xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-cyan-400 
                                 bg-clip-text text-transparent text-center">
                        Deploy Your Project
                    </h2>
                    {/* Validation Messages */}
                    {validationError && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex items-center gap-2 p-4 rounded-xl bg-red-500/10 border border-red-500/20 
                                     backdrop-blur-md mb-6"
                        >
                            <FiXCircle className="flex-shrink-0 text-red-400" />
                            <span className="text-red-200 text-sm">{validationError}</span>
                        </motion.div>
                    )}
                    {isReactProject && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 backdrop-blur-md mb-6"
                        >
                            <div className="flex items-center gap-2 mb-3">
                                <FiCheckCircle className="text-blue-400" />
                                <span className="font-semibold text-blue-200">
                                    Valid {detectedFramework.framework} Project
                                </span>
                            </div>
                            <div className="space-y-2">
                                <Label className="text-sm text-blue-100">Build Command</Label>
                                <div className="flex gap-2 items-center">
                                    <FiTerminal className="text-blue-400" />
                                    <Input
                                        value={customBuildCommand}
                                        onChange={(e) => setCustomBuildCommand(e.target.value)}
                                        className="font-mono bg-slate-800/50 border-blue-500/20 hover:border-blue-500/40 
                                                 focus:border-blue-500 transition-all duration-300"
                                    />
                                </div>
                            </div>
                        </motion.div>
                    )}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Form Fields */}
                        <div className="space-y-4">
                            {/* Git URL Input */}
                            <div className="space-y-2">
                                <Label className="text-gray-200">Git Repository URL</Label>
                                <div className="flex items-center gap-2">
                                    <FiGitBranch className="text-blue-400" />
                                    <Input
                                        value={gitUrl}
                                        onChange={(e) => setGitUrl(e.target.value)}
                                        placeholder="https://github.com/username/repository"
                                        className="bg-slate-800/50 border-blue-500/20 hover:border-blue-500/40 
                                                 focus:border-blue-500 transition-all duration-300"
                                    />
                                </div>
                            </div>
                            {/* Framework Select */}
                            <div className="space-y-2">
                                <Label className="text-gray-200">Framework</Label>
                                <Select onValueChange={handleFrameworkChange}>
                                    <SelectTrigger className="bg-slate-800/50 border-blue-500/20 hover:border-blue-500/40">
                                        <SelectValue placeholder="Select framework" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-slate-800 border-blue-500/20">
                                        {["react", "nextjs", "angular", "vue"].map((fw) => (
                                            <SelectItem
                                                key={fw}
                                                value={fw}
                                                className="hover:bg-blue-500/10 focus:bg-blue-500/10 capitalize"
                                            >
                                                {fw}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            {/* Environment Variables */}
                            <div className="space-y-3">
                                <Label className="text-gray-200">Environment Variables</Label>
                                {envVariables.map((env, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="flex gap-3"
                                    >
                                        <Input
                                            placeholder="Key"
                                            value={env.key}
                                            onChange={(e) => handleEnvVariableChange(index, "key", e.target.value)}
                                            className="bg-slate-800/50 border-blue-500/20 hover:border-blue-500/40 
                                                     focus:border-blue-500 transition-all duration-300"
                                        />
                                        <Input
                                            placeholder="Value"
                                            value={env.value}
                                            onChange={(e) => handleEnvVariableChange(index, "value", e.target.value)}
                                            className="bg-slate-800/50 border-blue-500/20 hover:border-blue-500/40 
                                                     focus:border-blue-500 transition-all duration-300"
                                        />
                                    </motion.div>
                                ))}
                                <Button
                                    type="button"
                                    onClick={handleAddEnvVariable}
                                    className="bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 border 
                                             border-blue-500/30 transition-all duration-300"
                                >
                                    Add Variable +
                                </Button>
                            </div>
                            {/* Auto Deploy Toggle */}
                            <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-800/50 border border-blue-500/20">
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={autoDeploy}
                                        onChange={handleAutoDeployChange}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 rounded-full bg-slate-700 peer-checked:bg-blue-500 
                                                transition-all duration-300 peer-checked:after:translate-x-full 
                                                after:content-[''] after:absolute after:top-0.5 after:left-0.5 
                                                after:bg-white after:rounded-full after:h-5 after:w-5 
                                                after:transition-all peer-checked:after:border-white">
                                    </div>
                                </label>
                                <span className="text-gray-200">Enable Auto Deployment</span>
                            </div>
                        </div>
                        {/* Submit Button */}
                        <Button
                            type="submit"
                            disabled={!isReactProject || isSubmitting}
                            className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white 
                                     hover:from-blue-500 hover:to-blue-400 transform hover:scale-[1.02] 
                                     transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed
                                     shadow-lg shadow-blue-500/20"
                        >
                            {isSubmitting ? (
                                <div className="flex items-center justify-center gap-2">
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    <span>Deploying...</span>
                                </div>
                            ) : (
                                "Deploy Project"
                            )}
                        </Button>
                    </form>
                </motion.div>
            </div>
        </div>
    );
};

export default DeployForm;