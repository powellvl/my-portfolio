import { Suspense, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { EffectComposer, Pixelation, Bloom } from '@react-three/postprocessing'
import * as THREE from 'three'

const reduced =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/* Hero scroll progress 0→1 (top of page → one viewport down). */
function heroProgress() {
  if (typeof window === 'undefined') return 0
  return Math.min(Math.max(window.scrollY / window.innerHeight, 0), 1)
}

/* Global pointer, normalized -1..1 over the viewport. Tracked on window so the
   galaxy follows the cursor even when the hero text overlays the canvas. */
const pointer = { x: 0, y: 0 }
if (typeof window !== 'undefined') {
  window.addEventListener(
    'pointermove',
    (e) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1
      pointer.y = (e.clientY / window.innerHeight) * 2 - 1
    },
    { passive: true }
  )
}

/* Central spiral galaxy halo — the page's "color moment", replacing the glass
   monolith. Chunky point cloud (Y2K pixel feel), bright bloom core, orbiting
   halo ring. Tilts to pointer, swirls, recedes on scroll. */
function GalaxyHalo({ count = 5200 }) {
  const tilt = useRef()
  const disc = useRef()
  const scroll = useRef(0)

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const inside = new THREE.Color('#f3efff') // near-white core
    const mid = new THREE.Color('#b9a7ff') // glow violet
    const outside = new THREE.Color('#6a52ff') // muted violet arms
    const branches = 3
    const radiusMax = 4.4
    const spin = 1.25
    const randomness = 0.45
    const randomPow = 2.6

    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      const radius = Math.pow(Math.random(), 1.7) * radiusMax
      const branchAngle = ((i % branches) / branches) * Math.PI * 2
      const spinAngle = radius * spin
      const rand = () =>
        Math.pow(Math.random(), randomPow) *
        (Math.random() < 0.5 ? 1 : -1) *
        randomness *
        radius
      positions[i3] = Math.cos(branchAngle + spinAngle) * radius + rand()
      positions[i3 + 1] = rand() * 0.3
      positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + rand()

      const k = Math.min(radius / radiusMax, 1)
      const c =
        k < 0.5
          ? inside.clone().lerp(mid, k * 2)
          : mid.clone().lerp(outside, (k - 0.5) * 2)
      colors[i3] = c.r
      colors[i3 + 1] = c.g
      colors[i3 + 2] = c.b
    }
    return { positions, colors }
  }, [count])

  // thin orbiting halo ring around the core
  const ring = useMemo(() => {
    const n = 900
    const arr = new Float32Array(n * 3)
    for (let i = 0; i < n; i++) {
      const a = Math.random() * Math.PI * 2
      const rad = 3.1 + (Math.random() - 0.5) * 0.22
      arr[i * 3] = Math.cos(a) * rad
      arr[i * 3 + 1] = (Math.random() - 0.5) * 0.1
      arr[i * 3 + 2] = Math.sin(a) * rad
    }
    return arr
  }, [])

  useFrame((_, dt) => {
    if (reduced) return
    scroll.current += (heroProgress() - scroll.current) * Math.min(dt * 6, 1)
    const p = scroll.current
    disc.current.rotation.y += dt * 0.12

    // base tilt + scroll deepening + pointer-driven sway (damped → slight latency)
    const targetX = -0.85 - p * 0.5 - pointer.y * 0.22
    const targetY = pointer.x * 0.26
    const targetZ = 0.16 + pointer.x * 0.14
    const ease = Math.min(dt * 3, 1) // smaller factor = more latency
    tilt.current.rotation.x += (targetX - tilt.current.rotation.x) * ease
    tilt.current.rotation.y += (targetY - tilt.current.rotation.y) * ease
    tilt.current.rotation.z += (targetZ - tilt.current.rotation.z) * ease
    tilt.current.position.y = -0.2 - p * 0.9
    tilt.current.position.z = -p * 1.6
    tilt.current.scale.setScalar(1 - p * 0.1)
  })

  return (
    <group ref={tilt} rotation={[-0.85, 0, 0.16]} position={[0, -0.2, 0]}>
      {/* bloom core */}
      <mesh scale={0.16}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>

      <group ref={disc}>
        <points>
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
            opacity={0.9}
            sizeAttenuation
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </points>

        {/* halo ring */}
        <points>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={ring.length / 3}
              array={ring}
              itemSize={3}
            />
          </bufferGeometry>
          <pointsMaterial
            size={0.045}
            color="#cfc3ff"
            transparent
            opacity={0.7}
            sizeAttenuation
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </points>
      </group>
    </group>
  )
}

export default function Scene3D() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{ antialias: false, powerPreference: 'high-performance' }}
      camera={{ position: [0, 0, 6], fov: 38 }}
      frameloop={reduced ? 'demand' : 'always'}
      style={{ width: '100%', height: '100%' }}
    >
      <color attach="background" args={['#0a0a0b']} />
      <Suspense fallback={null}>
        <GalaxyHalo />
      </Suspense>
      <EffectComposer>
        <Bloom
          intensity={1.1}
          luminanceThreshold={0.15}
          luminanceSmoothing={0.5}
          mipmapBlur
        />
        <Pixelation granularity={5} />
      </EffectComposer>
    </Canvas>
  )
}
