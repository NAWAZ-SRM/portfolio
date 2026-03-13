"use client"

import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { useRef, useMemo, Suspense } from "react"
import * as THREE from "three"
import { Float, MeshDistortMaterial } from "@react-three/drei"

// Floating geometric shapes
function FloatingShapes() {
  const groupRef = useRef<THREE.Group>(null)
  const shapes = useMemo(() => {
    const items = []
    for (let i = 0; i < 15; i++) {
      items.push({
        position: [
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 10 - 5,
        ] as [number, number, number],
        rotation: [Math.random() * Math.PI, Math.random() * Math.PI, 0] as [number, number, number],
        scale: Math.random() * 0.5 + 0.2,
        speed: Math.random() * 0.5 + 0.2,
        type: Math.floor(Math.random() * 3),
        color: ["#00D4FF", "#7C3AED", "#39FF14"][Math.floor(Math.random() * 3)],
      })
    }
    return items
  }, [])

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.02
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.1
    }
  })

  return (
    <group ref={groupRef}>
      {shapes.map((shape, i) => (
        <Float
          key={i}
          speed={shape.speed}
          rotationIntensity={0.5}
          floatIntensity={1}
        >
          <mesh position={shape.position} rotation={shape.rotation} scale={shape.scale}>
            {shape.type === 0 && <octahedronGeometry args={[1, 0]} />}
            {shape.type === 1 && <icosahedronGeometry args={[1, 0]} />}
            {shape.type === 2 && <tetrahedronGeometry args={[1, 0]} />}
            <meshStandardMaterial
              color={shape.color}
              emissive={shape.color}
              emissiveIntensity={0.5}
              wireframe
              transparent
              opacity={0.6}
            />
          </mesh>
        </Float>
      ))}
    </group>
  )
}

// Animated particle field
function ParticleField() {
  const particlesRef = useRef<THREE.Points>(null)
  const count = 500

  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const colorOptions = [
      new THREE.Color("#00D4FF"),
      new THREE.Color("#7C3AED"),
      new THREE.Color("#39FF14"),
    ]

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 30
      positions[i * 3 + 1] = (Math.random() - 0.5) * 30
      positions[i * 3 + 2] = (Math.random() - 0.5) * 15

      const color = colorOptions[Math.floor(Math.random() * colorOptions.length)]
      colors[i * 3] = color.r
      colors[i * 3 + 1] = color.g
      colors[i * 3 + 2] = color.b
    }

    return [positions, colors]
  }, [])

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.02
      particlesRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.03) * 0.1
    }
  })

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  )
}

// Central glowing orb
function GlowingOrb() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3
    }
  })

  return (
    <mesh ref={meshRef} position={[0, 0, -5]}>
      <sphereGeometry args={[2, 32, 32]} />
      <MeshDistortMaterial
        color="#00D4FF"
        emissive="#00D4FF"
        emissiveIntensity={0.3}
        roughness={0.2}
        metalness={0.8}
        distort={0.4}
        speed={2}
        transparent
        opacity={0.3}
      />
    </mesh>
  )
}

// Grid floor effect
function CyberGrid() {
  const gridRef = useRef<THREE.GridHelper>(null)

  useFrame((state) => {
    if (gridRef.current) {
      gridRef.current.position.z = (state.clock.elapsedTime * 0.5) % 1
    }
  })

  return (
    <gridHelper
      ref={gridRef}
      args={[50, 50, "#00D4FF", "#1a1a2e"]}
      position={[0, -8, 0]}
      rotation={[0, 0, 0]}
    />
  )
}

// Mouse-following light
function MouseLight() {
  const lightRef = useRef<THREE.PointLight>(null)
  const { viewport } = useThree()

  useFrame((state) => {
    if (lightRef.current) {
      lightRef.current.position.x = (state.pointer.x * viewport.width) / 2
      lightRef.current.position.y = (state.pointer.y * viewport.height) / 2
    }
  })

  return (
    <pointLight
      ref={lightRef}
      color="#00D4FF"
      intensity={2}
      distance={10}
      position={[0, 0, 3]}
    />
  )
}

function Scene() {
  return (
    <>
      <color attach="background" args={["#0a0a0f"]} />
      <fog attach="fog" args={["#0a0a0f", 10, 30]} />
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} color="#7C3AED" intensity={0.5} />
      <pointLight position={[-10, -10, -10]} color="#00D4FF" intensity={0.5} />
      <MouseLight />
      <FloatingShapes />
      <ParticleField />
      <GlowingOrb />
      <CyberGrid />
    </>
  )
}

export function CyberBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  )
}
