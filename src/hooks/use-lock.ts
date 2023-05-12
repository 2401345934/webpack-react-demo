const useLock = () => {
  const [locked, setLocked] = useState(false)

  const withLock = async (request: any) => {
    if (locked) {
      return
    }
    setLocked(true)
    try {
      await request()
    } finally {
      setLocked(false)
    }
  }

  return withLock
}

export default useLock
