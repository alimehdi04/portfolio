'use client'
import { TypeAnimation } from 'react-type-animation'

export default function AnimationRoles({ roles }: { roles: string[] }) {
  const sequence = roles.flatMap(role => [role, 2000])
  return (
    <TypeAnimation
      sequence={sequence}
      repeat={Infinity}
    />
  )
}