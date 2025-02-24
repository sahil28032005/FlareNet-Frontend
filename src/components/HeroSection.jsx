import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import "./HeroSection.css";
import { useNavigate } from "react-router-dom";
import { SpiderMan } from './chatAssistance/SpiderMan'
import { ChatInterface } from "./chatAssistance/ChaatInterface";
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'
import { TypeAnimation } from 'react-type-animation';

const HeroSection = () => {
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  return (
    <>
      <section
        ref={sectionRef}
        className="w-full min-h-screen flex flex-col justify-center items-center text-center bg-[#030712] text-white relative overflow-hidden pt-24"
      >
        {/* Modern Background Elements with Parallax */}
        {/* <div 
          className="absolute inset-0 z-0"
          style={{
            transform: `translateY(${scrollY * 0.2}px)`,
            transition: 'transform 0.1s ease-out'
          }}
        > */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950/50 via-gray-900 to-black" />
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.07]" />
        <div className="absolute inset-0 bg-noise-pattern mix-blend-soft-light opacity-[0.3]" />

        {/* Modern Gradient Orbs */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-[40rem] h-[40rem] bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full filter blur-3xl animate-orb-float" />
          <div className="absolute bottom-1/4 right-1/4 w-[35rem] h-[35rem] bg-gradient-to-r from-indigo-500/10 to-blue-500/10 rounded-full filter blur-3xl animate-orb-float-delayed" />
        </div>

        {/* Subtle Moving Lines */}
        <div className="absolute inset-0">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute h-[1px] w-full bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"
              style={{
                top: `${30 * (i + 1)}%`,
                animation: `moveLines ${15 + i * 5}s linear infinite`,
                opacity: 0.5,
              }}
            />
          ))}
        </div>
        {/* </div> */}


        {/* New Glowing Tech Effects */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          {/* Animated Grid Lines */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxsaW5lIHgxPSIwIiB5MT0iMCIgeDI9IjEwMCUiIHkyPSIxMDAlIiBzdHJva2U9InJnYmEoMjU1LDE5MiwwLDAuMSkiIHN0cm9rZS13aWR0aD0iMSIvPjxsaW5lIHgxPSIxMDAlIiB5MT0iMCIgeDI9IjAiIHkyPSIxMDAlIiBzdHJva2U9InJnYmEoMjU1LDE5MiwwLDAuMSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvc3ZnPg==')] opacity-20" />

          {/* Glowing Lines */}
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute glowing-line"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${i * 2}s`,
                transform: `rotate(${Math.random() * 360}deg)`,
              }}
            />
          ))}

          {/* Circuit Nodes */}
          <div className="circuit-lines">
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className="circuit-node"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${i * 0.1}s`,
                }}
              />
            ))}
          </div>
        </div>

        {/* Original Headline Section */}
        <div className="max-w-4xl px-4 md:px-12 relative z-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 glowing-headline flex flex-col items-center gap-2">
            <div className="min-h-[80px] flex items-center">
              <TypeAnimation
                sequence={[
                  'Single-Click Deploy with',
                  1000,
                  'Instant Deployment with',
                  1000,
                  'Cloud Solutions with',
                  1000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
                style={{
                  display: 'inline-block',
                  minWidth: 'auto',
                  maxWidth: '100%',
                  fontSize: 'inherit'
                }}
                className="w-full text-center px-2"
              />
            </div>
            <span className="tech-text">FlareNet</span>
          </h1>
          <p className="text-lg md:text-xl mb-8 neon-text">
            Deploy your applications instantly with world-class performance, scalability, and security.
          </p>
          <Button
            onClick={() => navigate("/new")}
            className="cyber-button bg-yellow-400 text-black hover:bg-yellow-300 px-6 py-3 text-lg rounded-md shadow-lg transform hover:scale-105 transition-transform"
          >
            <span className="glow-text">Start Deploying Now</span>
          </Button>
        </div>

        {/* Original 3D Cards with Holographic Effect */}
        {/* Modern Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-7xl px-4 md:px-8 mx-auto">
          {[
            {
              title: "Single-Click Deploy",
              description: "No complex setups. Deploy your app with a single click, saving you time and effort.",
              icon: "🚀",
              gradient: "from-blue-500 to-cyan-400"
            }, {
              title: "24/7 Uptime",
              description: "Guaranteed uptime for your applications with advanced monitoring and redundancy.",
              icon: "⚡",
              gradient: "from-purple-500 to-blue-400"
            }, {
              title: "Scalable Architecture",
              description: "Easily handle traffic spikes with our highly scalable deployment solutions.",
              icon: "📈",
              gradient: "from-cyan-500 to-blue-400"
            }, {
              title: "Free Hosting Tier",
              description: "Get started with our free tier that includes hosting for one website.",
              icon: "🎯",
              gradient: "from-blue-500 to-indigo-400"
            }, {
              title: "Real-Time Insights",
              description: "Track deployments, monitor traffic, and gain actionable insights.",
              icon: "📊",
              gradient: "from-indigo-500 to-blue-400"
            }, {
              title: "Concurrency Deployment",
              description: "Deploy multiple versions simultaneously with ease.",
              icon: "🔄",
              gradient: "from-blue-500 to-cyan-400"
            }
          ].map((feature, index) => (
            <div
              key={index}
              className="group relative p-8 rounded-2xl backdrop-blur-xl 
                                 bg-gradient-to-br from-slate-900/90 to-slate-800/90
                                 border border-blue-500/10 hover:border-blue-500/30 
                                 transition-all duration-500 hover:-translate-y-1"
            >
              {/* Simplified Content */}
              <div className="relative z-10 flex flex-col h-full">
                <span className="text-4xl mb-6">
                  {feature.icon}
                </span>

                <h2 className={`text-2xl font-bold mb-4 bg-gradient-to-r ${feature.gradient} 
                                     bg-clip-text text-transparent`}>
                  {feature.title}
                </h2>

                <p className="text-gray-300/90 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* Original Advertising Section with Effects */}
      <section className="advertising-section w-full min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-800 via-black to-gray-900 text-white relative px-4 md:px-12 overflow-hidden">
        {/* Glowing Background Effects */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute glowing-line"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${i * 3}s`,
                transform: `rotate(${Math.random() * 360}deg)`,
              }}
            />
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center w-full max-w-7xl relative z-10">
          <div className="text-content space-y-8 p-6 bg-black/20 rounded-2xl backdrop-blur-sm border border-blue-500/10 hover:border-blue-500/20 transition-all duration-500">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent animate-gradient">
              Seamless Integration for Your Customers
            </h2>
            <p className="text-lg md:text-xl text-gray-300/90 leading-relaxed">
              Empower your applications with cutting-edge deployment, real-time analytics, and unparalleled scalability.
              Join thousands of businesses who trust FlareNet to deliver world-class performance.
            </p>
            <ul className="space-y-4">
              {[
                "Easy customer onboarding",
                "Seamless integration with third-party tools",
                "Advanced analytics for better decision-making",
                "24/7 support for you and your customers"
              ].map((item, index) => (
                <li key={index} className="flex items-center space-x-3 text-gray-300 group">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <span className="text-white text-sm">✓</span>
                  </span>
                  <span className="group-hover:text-blue-400 transition-colors duration-300">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="image-container relative group">
            <div className="relative rounded-2xl overflow-hidden">
              <img
                src="/assects/images/heroSectionInsights.png"
                alt="Integration Illustration"
                className="w-full rounded-2xl shadow-2xl transform group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 transition-opacity duration-500" />
            </div>
            {/* Glow Effects */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl opacity-0 group-hover:opacity-15 blur-2xl transition-opacity duration-500" />
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/50 to-cyan-500/50 rounded-2xl opacity-0 group-hover:opacity-10 blur-3xl transition-opacity duration-500" />
          </div>
        </div>
      </section>

      <div style={{
        position: 'fixed',
        top: '100px',
        right: '100px',
        width: '600px',
        height: '400px',
        zIndex: 1000,
        pointerEvents: 'none',
        overflow: 'hidden', // Crucial for containment
        // border: '2px solid red' // Temporary for debugging
      }}>
        <Canvas
          style={{ background: 'transparent' }}
          camera={{
            position: [0, 1.5, 3], // Adjusted camera position
            fov: 45,               // Narrower field of view
            near: 0.1,
            far: 1000
          }}
        >
          <ambientLight intensity={1.2} />
          <directionalLight position={[3, 5, 2]} intensity={1.5} />
          <SpiderMan animationTrigger="all" />
          <Environment preset="sunset" />
        </Canvas>
      </div>
      <ChatInterface

      />
    </>
  );
};

export default HeroSection;