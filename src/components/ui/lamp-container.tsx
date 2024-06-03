import { Lamp } from 'lucide-react'
import React from 'react'
import { SparklesCore } from './sparkles'

type Props = {}

function LampContainer({}: Props) {
  return (
    <Lamp>
        <SparklesCore
            background="transparent"
            minSize={0.4}
            maxSize={1}
            particleDensity={1200}
            className="w-full h-full"
            particleColor="#FFFFFF"
          />

    </Lamp>
  )
}

export default LampContainer