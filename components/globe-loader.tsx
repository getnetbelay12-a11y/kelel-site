'use client'

import dynamic from 'next/dynamic'

const GlobeWidget = dynamic(
  () => import('@/components/globe-widget').then((m) => m.GlobeWidget),
  {
    ssr: false,
    loading: () => <div className="globe-placeholder" aria-hidden="true" />,
  }
)

export function GlobeLoader() {
  return <GlobeWidget />
}
