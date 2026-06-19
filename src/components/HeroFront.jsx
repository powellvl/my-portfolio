import { Suspense, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Lightformer, Float } from '@react-three/drei'
import { EffectComposer, Pixelation, Bloom } from '@react-three/postprocessing'
import * as THREE from 'three'

const reduced =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

function heroProgress() {
  if (typeof window === 'undefined') return 0
  return Math.min(Math.max(window.scrollY / window.innerHeight, 0), 1)
}

/* Y2K 4-point "sparkle" star geometry — sharp concave star, lightly extruded. */
function makeSparkleGeometry() {
  const shape = new THREE.Shape()
  const R = 1
  const r = 0.16 // tight inner radius → sharp points
  for (let i = 0; i < 8; i++) {
    const ang = (i / 8) * Math.PI * 2 - Math.PI / 2
    const rad = i % 2 === 0 ? R : r
    const x = Math.cos(ang) * rad
    const y = Math.sin(ang) * rad
    i === 0 ? shape.moveTo(x, y) : shape.lineTo(x, y)
  }
  shape.closePath()
  return new THREE.ExtrudeGeometry(shape, {
    depth: 0.12,
    bevelEnabled: false,
  }).center()
}

/* Sparkle stars drifting across the title — white, twinkling, slow swirl. */
const STARS = [
  { pos: [-2.7, 0.9, 1.2], scale: 0.42, drift: 1.0, spin: 0.4, phase: 0.0 },
  { pos: [2.6, -0.3, 1.6], scale: 0.3, drift: 1.4, spin: -0.3, phase: 1.7 },
  { pos: [-1.3, -1.1, 2.0], scale: 0.22, drift: 1.8, spin: 0.5, phase: 3.0 },
  { pos: [1.6, 1.4, 0.8], scale: 0.34, drift: 0.7, spin: -0.45, phase: 4.2 },
  { pos: [0.2, -0.7, 1.4], scale: 0.18, drift: 1.2, spin: 0.6, phase: 5.5 },
]

function Star({ geo, pos, scale, drift, spin, phase }) {
  const group = useRef()
  const mesh = useRef()
  const s = useRef(0)

  useFrame((state, dt) => {
    if (reduced) return
    s.current += (heroProgress() - s.current) * Math.min(dt * 6, 1)
    const p = s.current
    const t = state.clock.elapsedTime
    // slow swirl in 3D so the sparkle catches depth
    mesh.current.rotation.z += dt * spin
    mesh.current.rotation.y = Math.sin(t * 0.5 + phase) * 0.5
    // twinkle: scale + glow pulse
    const tw = 0.85 + Math.sin(t * 1.6 + phase) * 0.15
    mesh.current.scale.setScalar(scale * tw)
    mesh.current.material.emissiveIntensity = 0.5 + Math.sin(t * 1.6 + phase) * 0.3
    // foreground parallax: faster than the galaxy, drifts up + fades past
    group.current.position.y = pos[1] + p * drift * 2.2
    group.current.position.x = pos[0] + p * drift * 0.4
    mesh.current.material.opacity = Math.max(1 - p * 1.1, 0)
  })

  return (
    <group ref={group} position={pos}>
      <Float
        speed={reduced ? 0 : 1.2}
        rotationIntensity={reduced ? 0 : 0.3}
        floatIntensity={reduced ? 0 : 0.7}
      >
        <mesh ref={mesh} geometry={geo} scale={scale}>
          <meshStandardMaterial
            color="#ffffff"
            emissive="#cfc4ff"
            emissiveIntensity={0.6}
            roughness={0.35}
            metalness={0}
            transparent
            opacity={1}
            flatShading
          />
        </mesh>
      </Float>
    </group>
  )
}

export default function HeroFront() {
  const geo = useMemo(() => makeSparkleGeometry(), [])
  return (
    <Canvas
      dpr={[1, 1.25]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      camera={{ position: [0, 0, 6], fov: 38 }}
      frameloop={reduced ? 'demand' : 'always'}
      style={{ width: '100%', height: '100%' }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 4, 5]} intensity={1.6} />
      <directionalLight position={[-4, -1, 2]} intensity={1.4} color="#8b6dff" />
      <Suspense fallback={null}>
        {STARS.map((s, i) => (
          <Star key={i} geo={geo} {...s} />
        ))}
        <Environment resolution={64}>
          <Lightformer intensity={1.2} position={[0, 2, 3]} scale={[5, 3, 1]} color="#ffffff" />
          <Lightformer intensity={2} position={[-3, -1, 2]} scale={[3, 3, 1]} color="#7b61ff" />
        </Environment>
      </Suspense>
      <EffectComposer>
        <Bloom intensity={0.6} luminanceThreshold={0.4} luminanceSmoothing={0.5} mipmapBlur />
        <Pixelation granularity={5} />
      </EffectComposer>
    </Canvas>
  )
}
