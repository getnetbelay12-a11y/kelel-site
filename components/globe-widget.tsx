'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { useRef, useMemo, useState, useEffect } from 'react'
import * as THREE from 'three'

const R = 1.8

function latLonTo3D(lat: number, lon: number, r = R): [number, number, number] {
  const phi = (90 - lat) * (Math.PI / 180)
  const theta = (lon + 180) * (Math.PI / 180)
  return [
    -r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta),
  ]
}

const CITIES = [
  { name: 'Addis Ababa', lat: 9.02, lon: 38.74, kind: 'hq' },
  { name: 'Nairobi', lat: -1.29, lon: 36.82, kind: 'regional' },
  { name: 'Lagos', lat: 6.52, lon: 3.38, kind: 'regional' },
  { name: 'Cairo', lat: 30.04, lon: 31.24, kind: 'regional' },
  { name: 'Johannesburg', lat: -26.2, lon: 28.04, kind: 'regional' },
  { name: 'Dar es Salaam', lat: -6.79, lon: 39.21, kind: 'regional' },
  { name: 'Dubai', lat: 25.2, lon: 55.27, kind: 'global' },
  { name: 'London', lat: 51.51, lon: -0.13, kind: 'global' },
  { name: 'Singapore', lat: 1.35, lon: 103.82, kind: 'global' },
]

function CityDot({ city, active }: { city: (typeof CITIES)[number]; active: boolean }) {
  const dotRef = useRef<THREE.Mesh>(null)
  const [x, y, z] = latLonTo3D(city.lat, city.lon, R + 0.06)
  const isHQ = city.kind === 'hq'
  const isGlobal = city.kind === 'global'

  useFrame(({ clock }) => {
    if (!active || !dotRef.current) {
      return
    }

    const pulse = 1 + Math.sin(clock.elapsedTime * 2.4 + x) * (isHQ ? 0.22 : 0.12)
    dotRef.current.scale.setScalar(pulse)
  })

  return (
    <mesh ref={dotRef} position={[x, y, z]}>
      <sphereGeometry args={[isHQ ? 0.072 : isGlobal ? 0.046 : 0.04, 14, 14]} />
      <meshBasicMaterial color={isHQ ? '#4be3d6' : isGlobal ? '#f0a868' : '#7ee7df'} />
    </mesh>
  )
}

function RoutePacket({
  city,
  index,
  active,
}: {
  city: (typeof CITIES)[number]
  index: number
  active: boolean
}) {
  const packetRef = useRef<THREE.Mesh>(null)
  const start = useMemo(() => new THREE.Vector3(...latLonTo3D(CITIES[0].lat, CITIES[0].lon, R + 0.1)), [])
  const end = useMemo(() => new THREE.Vector3(...latLonTo3D(city.lat, city.lon, R + 0.1)), [city.lat, city.lon])
  const color = city.kind === 'global' ? '#f0a868' : '#4be3d6'

  useFrame(({ clock }) => {
    if (!active || !packetRef.current) {
      return
    }

    const duration = city.kind === 'global' ? 4.8 : 3.8
    const t = ((clock.elapsedTime + index * 0.46) % duration) / duration
    const eased = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2
    const pos = start.clone().lerp(end, eased).normalize().multiplyScalar(R + 0.13)
    packetRef.current.position.copy(pos)
    packetRef.current.scale.setScalar(0.65 + Math.sin(t * Math.PI) * 0.75)
  })

  if (!active) {
    return null
  }

  return (
    <mesh ref={packetRef}>
      <sphereGeometry args={[0.024, 10, 10]} />
      <meshBasicMaterial color={color} transparent opacity={0.92} />
    </mesh>
  )
}

function GlobeMesh({ rotating }: { rotating: boolean }) {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((_, delta) => {
    if (rotating && groupRef.current) {
      groupRef.current.rotation.y += delta * 0.2
      groupRef.current.rotation.x = Math.sin(Date.now() * 0.00018) * 0.08
    }
  })

  const regionalConnectionGeometry = useMemo(() => {
    const hq = CITIES[0]
    const points: number[] = []
    CITIES.slice(1)
      .filter((city) => city.kind === 'regional')
      .forEach((city) => {
        const [ax, ay, az] = latLonTo3D(hq.lat, hq.lon)
        const [bx, by, bz] = latLonTo3D(city.lat, city.lon)
        points.push(ax, ay, az, bx, by, bz)
      })
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.Float32BufferAttribute(points, 3))
    return geo
  }, [])

  const globalConnectionGeometry = useMemo(() => {
    const hq = CITIES[0]
    const points: number[] = []
    CITIES.slice(1)
      .filter((city) => city.kind === 'global')
      .forEach((city) => {
        const [ax, ay, az] = latLonTo3D(hq.lat, hq.lon)
        const [bx, by, bz] = latLonTo3D(city.lat, city.lon)
        points.push(ax, ay, az, bx, by, bz)
      })
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.Float32BufferAttribute(points, 3))
    return geo
  }, [])

  return (
    <group ref={groupRef}>
      {/* Outer wireframe shell */}
      <mesh>
        <icosahedronGeometry args={[R, 3]} />
        <meshBasicMaterial wireframe color="#4be3d6" transparent opacity={0.13} />
      </mesh>

      {/* Dark inner fill for depth */}
      <mesh>
        <sphereGeometry args={[R * 0.99, 32, 32]} />
        <meshBasicMaterial color="#0a0c10" transparent opacity={0.65} />
      </mesh>

      {/* Latitude/longitude reading rings */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[R * 1.01, 0.003, 8, 128]} />
        <meshBasicMaterial color="#4be3d6" transparent opacity={0.18} />
      </mesh>
      <mesh rotation={[0, Math.PI / 2, 0]}>
        <torusGeometry args={[R * 1.01, 0.003, 8, 128]} />
        <meshBasicMaterial color="#4be3d6" transparent opacity={0.12} />
      </mesh>
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[R * 1.01, 0.003, 8, 128]} />
        <meshBasicMaterial color="#4be3d6" transparent opacity={0.1} />
      </mesh>
      <mesh rotation={[0.45, Math.PI / 2, 0]}>
        <torusGeometry args={[R * 0.72, 0.002, 8, 96]} />
        <meshBasicMaterial color="#4be3d6" transparent opacity={0.09} />
      </mesh>
      <mesh rotation={[-0.45, Math.PI / 2, 0]}>
        <torusGeometry args={[R * 0.72, 0.002, 8, 96]} />
        <meshBasicMaterial color="#4be3d6" transparent opacity={0.08} />
      </mesh>
      <mesh rotation={[0.7, 0.35, 0.2]}>
        <torusGeometry args={[R * 1.08, 0.004, 8, 128]} />
        <meshBasicMaterial color="#f0a868" transparent opacity={0.1} />
      </mesh>

      {/* Connection corridors from Addis Ababa */}
      <lineSegments geometry={regionalConnectionGeometry}>
        <lineBasicMaterial color="#4be3d6" transparent opacity={0.2} />
      </lineSegments>
      <lineSegments geometry={globalConnectionGeometry}>
        <lineBasicMaterial color="#f0a868" transparent opacity={0.18} />
      </lineSegments>

      {/* Moving signal packets make the network read as active, not static. */}
      {CITIES.slice(1).map((city, index) => (
        <RoutePacket key={`${city.name}-packet`} city={city} index={index} active={rotating} />
      ))}

      {/* City dots */}
      {CITIES.map((city) => (
        <CityDot key={city.name} city={city} active={rotating} />
      ))}
    </group>
  )
}

export function GlobeWidget() {
  const [reducedMotion, setReducedMotion] = useState(() => {
    if (typeof window === 'undefined') {
      return false
    }

    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  })

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  return (
    <div className="globe-widget" aria-hidden="true">
      <div className="globe-glow" />
      <div className="globe-orbit globe-orbit--one" />
      <div className="globe-orbit globe-orbit--two" />
      <Canvas
        camera={{ position: [0, 0.4, 4.6], fov: 44 }}
        style={{ background: 'transparent', width: '100%', height: '100%' }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <GlobeMesh rotating={!reducedMotion} />
      </Canvas>
    </div>
  )
}
