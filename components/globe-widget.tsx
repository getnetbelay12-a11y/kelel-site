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
  { name: 'Addis Ababa', lat: 9.02,   lon: 38.74, isHQ: true  },
  { name: 'Nairobi',     lat: -1.29,  lon: 36.82, isHQ: false },
  { name: 'Lagos',       lat: 6.52,   lon: 3.38,  isHQ: false },
  { name: 'Cairo',       lat: 30.04,  lon: 31.24, isHQ: false },
  { name: 'Johannesburg',lat: -26.20, lon: 28.04, isHQ: false },
  { name: 'Dar es Salaam', lat: -6.79, lon: 39.21, isHQ: false },
]

function GlobeMesh({ rotating }: { rotating: boolean }) {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((_, delta) => {
    if (rotating && groupRef.current) {
      groupRef.current.rotation.y += delta * 0.12
    }
  })

  const connectionGeometry = useMemo(() => {
    const hq = CITIES[0]
    const points: number[] = []
    CITIES.slice(1).forEach((city) => {
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

      {/* Connection lines from HQ to other cities */}
      <lineSegments geometry={connectionGeometry}>
        <lineBasicMaterial color="#4be3d6" transparent opacity={0.22} />
      </lineSegments>

      {/* City dots */}
      {CITIES.map((city) => {
        const [x, y, z] = latLonTo3D(city.lat, city.lon, R + 0.06)
        return (
          <mesh key={city.name} position={[x, y, z]}>
            <sphereGeometry args={[city.isHQ ? 0.06 : 0.038, 10, 10]} />
            <meshBasicMaterial color={city.isHQ ? '#4be3d6' : '#f0a868'} />
          </mesh>
        )
      })}
    </group>
  )
}

export function GlobeWidget() {
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  return (
    <div className="globe-widget" aria-hidden="true">
      <div className="globe-glow" />
      <Canvas
        camera={{ position: [0, 0.4, 4.6], fov: 44 }}
        style={{ background: 'transparent', width: '100%', height: '100%' }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <GlobeMesh rotating={!reducedMotion} />
      </Canvas>
      <div className="globe-overlay">
        <span className="globe-badge">
          <span className="globe-dot" />
          ADDIS · HQ
        </span>
      </div>
    </div>
  )
}
