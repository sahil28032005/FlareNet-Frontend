import React from "react";
import { FaTwitter, FaLinkedin, FaGithub, FaFacebook } from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-white py-8 sm:py-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Mobile-first grid layout */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-8 sm:gap-8 mb-8 sm:mb-12">
          {/* About Section - Full width on smallest screens */}
          <div className="col-span-2 sm:col-span-2 lg:col-span-1 space-y-4">
            <h3 className="text-lg sm:text-xl font-semibold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              About Us
            </h3>
            <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
              Our deployment service simplifies hosting, integrates seamlessly
              with CI/CD pipelines, and provides cloud products such as IDEs,
              automation tools, and more.
            </p>
          </div>

          {/* Quick Links Section */}
          <div className="space-y-3 sm:space-y-4">
            <h3 className="text-lg sm:text-xl font-semibold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Quick Links
            </h3>
            <div className="flex flex-col space-y-2">
              {["Home", "Features", "Pricing", "Documentation", "Contact"].map((link) => (
                <a
                  key={link}
                  href="#"
                  className="text-sm sm:text-base text-gray-400 hover:text-blue-400 transition-colors duration-300 w-fit"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          {/* Products Section */}
          <div className="space-y-3 sm:space-y-4">
            <h3 className="text-lg sm:text-xl font-semibold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Products
            </h3>
            <div className="flex flex-col space-y-2">
              {[
                "Cloud IDE",
                "Workflow Automation",
                "Monitoring Tools",
                "Custom Hosting"
              ].map((product) => (
                <a
                  key={product}
                  href="#"
                  className="text-sm sm:text-base text-gray-400 hover:text-blue-400 transition-colors duration-300 w-fit"
                >
                  {product}
                </a>
              ))}
            </div>
          </div>

          {/* Social Media Section */}
          <div className="space-y-3 sm:space-y-4">
            <h3 className="text-lg sm:text-xl font-semibold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Follow Us
            </h3>
            <div className="flex flex-col space-y-2">
              {[
                { icon: FaTwitter, name: "Twitter" },
                { icon: FaLinkedin, name: "LinkedIn" },
                { icon: FaGithub, name: "GitHub" },
                { icon: FaFacebook, name: "Facebook" }
              ].map(({ icon: Icon, name }) => (
                <a
                  key={name}
                  href="#"
                  className="flex items-center space-x-2 text-gray-400 hover:text-blue-400 transition-colors duration-300 w-fit group"
                >
                  <Icon className="text-lg sm:text-xl group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-sm sm:text-base">{name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-6 mt-6 sm:pt-8 sm:mt-8 border-t border-gray-800">
          <p className="text-center text-sm sm:text-base text-gray-500">
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              &copy; 2025 Sahil Sadekar.
            </span>{" "}
            All Rights Reserved.
          </p>
        </div>
      </div>

      {/* Responsive Glowing Orbs */}
      <div className="absolute bottom-0 left-1/4 w-48 sm:w-64 h-48 sm:h-64 bg-blue-500/10 rounded-full filter blur-3xl" />
      <div className="absolute top-0 right-1/4 w-48 sm:w-64 h-48 sm:h-64 bg-cyan-500/10 rounded-full filter blur-3xl" />
    </footer>
  );
};

export default Footer;
