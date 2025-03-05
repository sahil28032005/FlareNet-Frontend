import React from "react";
import NavBar from "../NavBar";
import ProjectsPage from "./ProjectsPage";
import Footer from "../Footer";
import { useLocation, useNavigate } from "react-router-dom";

const Service = () => {
    const location = useLocation();
    
    // Handle GitHub OAuth callback
    const code = new URLSearchParams(location.search).get('code');
    
    return (
        <>
            <div style={{ marginTop: "70px" }}>
                <ProjectsPage githubCode={code} />
            </div>
        </>
    );
};

export default Service;
