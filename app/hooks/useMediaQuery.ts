'use client'

import { useEffect, useState } from 'react'

export function useMediaQuery() {
  const [isDesktop, setIsDesktop] = useState(
    window.matchMedia('(min-width: 768px)').matches,
  )

  useEffect(() => {
    const updateTouchSupport = () => {
      setIsDesktop(window.matchMedia('(min-width: 768px)').matches)
    }

    window.addEventListener('resize', updateTouchSupport)

    return () => {
      window.removeEventListener('resize', updateTouchSupport)
    }
  }, [])

  return isDesktop
}