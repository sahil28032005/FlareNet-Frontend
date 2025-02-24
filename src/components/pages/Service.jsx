import React from "react";
import NavBar from "../NavBar";
// import DeployForm from "./DeployForm";
import ProjectsPage from "./ProjectsPage";
import Footer from "../Footer";

const Service = () => {
    return (
        <>

            <div style={{ marginTop: "70px" }}> {/* Adjust based on NavBar height */}
                {/* <DeployForm />  we will go at this form after deploy buttin on projects page now make projects page */}
                <ProjectsPage />
            </div>
        </>
    );
};

export default Service;
