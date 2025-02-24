import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import "./DeploymentProgress.css";
import NavBar from "../NavBar";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import axios from "axios";

const DeploymentProgress = () => {
  const location = useLocation();
  const { autoDeploy, gitUrl } = location.state || {};
  const [logs, setLogs] = useState([]);
  const [isDeploying, setIsDeploying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [deploymentStats, setDeploymentStats] = useState({ success: 70, failure: 30, total: 100 });
  const navigate = useNavigate();
  const { id } = useParams();

  const COLORS = ["#00FF00", "#FF4D4D"];

  const createWebhook = async () => {
    if (!gitUrl) {
      alert("Git URL is required to create a webhook.");
      return;
    }

    const gitUrlPattern = /^(?:https?:\/\/|git@)github\.com[:/](?<owner>[^/]+)\/(?<repo>[^.]+)(?:\.git)?$/;
    const match = gitUrl.match(gitUrlPattern);
    const oAuthToken = localStorage.getItem("github_token");

    if (!oAuthToken || !match?.groups) {
      alert("Invalid Git URL or missing OAuth token.");
      return;
    }

    const { owner, repo } = match.groups;
    const requestBody = { repo, oauthToken: oAuthToken, owner };

    try {
      const webhookCreated = localStorage.getItem("webhookCreated");
      if (webhookCreated) return;

      await axios.post("http://localhost:5000/api/github/create-webhook", requestBody, {
        headers: { "Content-Type": "application/json" },
      });
      localStorage.setItem("webhookCreated", "true");
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    if (autoDeploy) createWebhook();
  }, []);

  useEffect(() => {
    let lastFetchedTimestamp = null;
  
    const fetchLogs = async () => {
      try {
        const url = lastFetchedTimestamp
          ? `http://localhost:5000/getLogs/${id}?since=${lastFetchedTimestamp}`
          : `http://localhost:5000/getLogs/${id}`;
  
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
  
        const data = await response.json();
  
        if (data.logs?.length) {
          lastFetchedTimestamp = data.logs[data.logs.length - 1].created_at; // Track last log timestamp
  
          setLogs((prevLogs) => {
            const newLogs = data.logs.map(
              (log) =>
                `Log ${log.event_id}: ${log.log_message} | Level: ${log.log_level} | File: ${log.file_name || 'N/A'} | ` +
                `Size: ${log.file_size || 'N/A'} (${log.file_size_in_bytes || 'N/A'} bytes) | ` +
                `Time Taken: ${log.time_taken || 'N/A'}s | Created At: ${log.created_at}`
            );
            return Array.from(new Set([...prevLogs, ...newLogs]));
          });
        }
  
        setProgress(data.progress || progress);
        setDeploymentStats(data.stats || deploymentStats);
      } catch (error) {
        console.error("Error fetching logs:", error.message);
      }
    };
  
    const interval = setInterval(fetchLogs, 2000);
    return () => clearInterval(interval);
  }, [id]);
  

  const handleCancel = () => {
    setIsDeploying(false);
    navigate("/service");
  };
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white relative overflow-hidden pt-20">
        {/* Background Effects */}
        <div className="absolute inset-0">
            <div className="absolute inset-0 bg-grid-pattern opacity-[0.07]" />
            <div className="absolute top-1/4 left-1/4 w-[40rem] h-[40rem] bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full filter blur-3xl animate-orb-float" />
            <div className="absolute bottom-1/4 right-1/4 w-[35rem] h-[35rem] bg-gradient-to-r from-indigo-500/10 to-blue-500/10 rounded-full filter blur-3xl animate-orb-float-delayed" />
        </div>

        <div className="relative z-10 container mx-auto px-4">
            <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-4">
                    Deployment Progress
                </h2>
                <p className="text-lg text-gray-400">Live deployment logs and real-time analytics</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                {["Total Deployments", "Success Rate", "Failure Rate"].map((label, index) => (
                    <div key={index} 
                         className="p-6 rounded-2xl backdrop-blur-xl bg-slate-800/30 border border-blue-500/10 
                                  hover:border-blue-500/30 transition-all duration-500">
                        <h3 className="text-xl font-semibold bg-gradient-to-r from-blue-400 to-cyan-400 
                                     bg-clip-text text-transparent mb-4">{label}</h3>
                        <div className="h-[200px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={[
                                            { name: "Success", value: deploymentStats.success },
                                            { name: "Failure", value: deploymentStats.failure },
                                        ]}
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={70}
                                        dataKey="value"
                                    >
                                        {COLORS.map((color, idx) => (
                                            <Cell key={idx} fill={color} />
                                        ))}
                                    </Pie>
                                    <Tooltip contentStyle={{ background: 'rgba(15, 23, 42, 0.9)', border: 'none' }} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mb-8">
                <div className="rounded-2xl backdrop-blur-xl bg-slate-800/30 border border-blue-500/10 
                              hover:border-blue-500/30 transition-all duration-500 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-semibold bg-gradient-to-r from-blue-400 to-cyan-400 
                                     bg-clip-text text-transparent">Deployment Logs</h3>
                        <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 
                                     border border-green-500/30 text-sm">LIVE</span>
                    </div>
                    <div className="terminal-window h-[400px] overflow-y-auto rounded-xl bg-slate-900/50 p-4">
                        {logs.map((log, index) => (
                            <div key={index} 
                                 className={`py-2 px-4 rounded-lg mb-2 font-mono text-sm
                                          ${index % 2 === 0 
                                              ? 'bg-blue-500/10 text-blue-200' 
                                              : 'bg-purple-500/10 text-purple-200'}`}>
                                {log}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="mb-8">
                <div className="h-2 rounded-full bg-slate-800/50 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-500"
                         style={{ width: `${progress}%` }}></div>
                </div>
            </div>

            <div className="flex flex-wrap gap-4 justify-center mb-12">
                {isDeploying ? (
                    <>
                        <Button onClick={handleCancel}
                                className="bg-red-500/20 text-red-400 hover:bg-red-500/30 border 
                                         border-red-500/30 transition-all duration-300">
                            Cancel Deployment
                        </Button>
                        <Button onClick={() => navigate("/dashboard")}
                                className="bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 border 
                                         border-blue-500/30 transition-all duration-300">
                            View Dashboard
                        </Button>
                    </>
                ) : (
                    <Button onClick={() => navigate("/")}
                            className="bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 border 
                                     border-blue-500/30 transition-all duration-300">
                        Go Back Home
                    </Button>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                {["/assects/images/photoShowcase.png", "/assects/images/showCase.png"].map((img, idx) => (
                    <div key={idx} 
                         className="rounded-2xl backdrop-blur-xl bg-slate-800/30 border border-blue-500/10 
                                  hover:border-blue-500/30 transition-all duration-500 p-6 group">
                        <img src={img} alt="Showcase" 
                             className="w-full h-48 object-cover rounded-xl mb-4 group-hover:scale-[1.02] 
                                      transition-transform duration-500" />
                        <h4 className="text-xl font-semibold bg-gradient-to-r from-blue-400 to-cyan-400 
                                     bg-clip-text text-transparent mb-2">
                            {idx === 0 ? "🚀 Try Our Cloud Services!" : "🔒 Secure Your Applications!"}
                        </h4>
                        <p className="text-gray-400 mb-4">
                            {idx === 0
                                ? "Experience seamless deployments. Sign up now for 20% off!"
                                : "Ensure your applications stay secure. Learn more."}
                        </p>
                        <Button className="bg-gradient-to-r from-blue-600 to-blue-500 text-white 
                                       hover:from-blue-500 hover:to-blue-400 transform hover:scale-[1.02] 
                                       transition-all duration-300 shadow-lg shadow-blue-500/20">
                            {idx === 0 ? "Sign Up" : "Learn More"}
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    </div>
  );
};

export default DeploymentProgress;
