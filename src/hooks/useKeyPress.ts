import { useState, useEffect } from 'react'

function useKeyPress(key: string): boolean {
  const [isKeyPressed, setIsKeyPressed] = useState(false)

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === key) {
      setIsKeyPressed(true)
    }
  }

  const handleKeyUp = (event: KeyboardEvent) => {
    if (event.key === key) {
      setIsKeyPressed(false)
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [key])

  return isKeyPressed
}
export default useKeyPress
