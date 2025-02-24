import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import scalable from "@/assets/scalable.jpg";
import integrate from "@/assets/integrate.jpg";
import secure from "@/assets/secure.jpg";
import performance from "@/assets/performance.jpg";
import support from "@/assets/support.jpg";
import './FeaturesSection.css'; // Import the custom CSS file for styles

const FeaturesSection = () => {
    const features = [
        { title: "Fast Performance", description: "Blazing-fast load times for your websites.", imgSrc: performance },
        { title: "24/7 Support", description: "Our team is here to help you anytime.", imgSrc: support },
        { title: "Scalability", description: "Easily scale with growing traffic.", imgSrc: scalable},
        { title: "Secure Hosting", description: "Top-notch security for your data.", imgSrc: secure },
        { title: "Easy Integration", description: "Seamless integration with popular platforms.", imgSrc: integrate },
    ];

    return (
        <section className="py-16 bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white overflow-hidden relative">
            {/* Background Effects */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full filter blur-3xl animate-pulse-slow" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full filter blur-3xl animate-pulse-slow delay-1000" />
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
                <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent animate-gradient">
                    Our Features
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <Card 
                            key={index} 
                            className="group bg-black/40 backdrop-blur-md border border-white/10 rounded-xl hover:border-blue-500/50 transition-all duration-500 hover:shadow-glow overflow-hidden"
                        >
                            <div className="aspect-w-16 aspect-h-9 overflow-hidden">
                                <img 
                                    src={feature.imgSrc} 
                                    alt={feature.title} 
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-semibold mb-3 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-300/90 leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;
