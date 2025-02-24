// Scene.jsx
import { Canvas } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import { SpiderMan } from './SpiderMan'

export default function Scene() {
  return (
    <Canvas camera={{ position: [0, 2, 5], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <SpiderMan />
      <Environment preset="city" />
    </Canvas>
  )
}