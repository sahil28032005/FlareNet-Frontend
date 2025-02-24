import { useGLTF, useAnimations } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useEffect, useState } from "react";
import * as THREE from 'three'; // Add this import

export function SpiderMan({ animationTrigger }) {
  const { scene, animations } = useGLTF("/final.glb");
  const spidermanRef = useRef();
  const { actions } = useAnimations(animations, spidermanRef);
  const [currentAnimation, setCurrentAnimation] = useState("idle");
  const [isAnimating, setIsAnimating] = useState(false);
  const animationQueue = useRef([]);

  // Map animation triggers to actual animation names
  const animationMap = {
    idle: "Armature|mixamo.com|Layer0",
    jump: "Armature.001|mixamo.com|Layer0",
    wave: "Armature.002|mixamo.com|Layer0",
    talk: "Armature.003|mixamo.com|Layer0",
    action4: "Armature.004|mixamo.com|Layer0",
    action5: "Armature.005|mixamo.com|Layer0",
    action6: "Armature.006|mixamo.com|Layer0",
    action7: "Armature.007|mixamo.com|Layer0",
    action8: "Armature.008|mixamo.com|Layer0",
  };
  const playAnimation = async (animationName) => {
    if (!actions[animationMap[animationName]]) return;
    
    setIsAnimating(true);
    Object.values(actions).forEach(action => action.stop());
    
    const action = actions[animationMap[animationName]];
    
    return new Promise((resolve) => {
      action
        .reset()
        .setLoop(THREE.LoopOnce)
        .fadeIn(0.3)
        .play();
    // Listen for animation completion
    action.clampWhenFinished = true;
    const duration = action.getClip().duration * 1000;
    
    console.log(`🕷️ Playing: ${animationName}, Duration: ${duration}ms`);
    
    setTimeout(() => {
      action.fadeOut(0.3);
      resolve();
    }, duration);
    });
  };

  const playAllAnimations = async () => {
    const animationList = Object.keys(animationMap);
    
    for (const anim of animationList) {
      setCurrentAnimation(anim);
      await playAnimation(anim);
      // Shorter delay between animations
      await new Promise(resolve => setTimeout(resolve, 300));
    }
    
    setIsAnimating(false);
    // Return to idle animation
    playAnimation('idle');
  };
  // Updated effect to handle animation triggers
  useEffect(() => {
    if (!animationTrigger || isAnimating) return;

    const handleAnimation = async () => {
      if (animationTrigger === 'all') {
        await playAllAnimations();
      } else if (animationMap[animationTrigger]) {
        setIsAnimating(true);
        await playAnimation(animationTrigger);
        setIsAnimating(false);
        // Return to idle after single animation
        playAnimation('idle');
      }
    };

    handleAnimation();
  }, [animationTrigger]);
  // Initial idle animation
  useEffect(() => {
    if (actions && Object.keys(actions).length > 0) {
      playAnimation('idle');
    }
  }, [actions]);
  return (
    <primitive
      ref={spidermanRef}
      object={scene}
      scale={[150, 150, 150]}
      position={[0, -1.5, 0]}
    />
  );
}

SpiderMan.defaultProps = {
  animationTrigger: "idle"
};