import PageWarp from '@/components/BusinessComponent/PageWarp'
import Typed from 'typed.js'
const TypedReactHooksDemo = () => {
  // Create reference to store the DOM element containing the animation
  const el = useRef(null)
  // Create reference to store the Typed instance itself
  const typed: any = useRef(null)

  useEffect(() => {
    const options = {
      strings: ['我是你typed'],
      typeSpeed: 50,
      backSpeed: 50,
    }

    // elRef refers to the <span> rendered below
    typed.current = new Typed(el.current, options)

    return () => {
      // Make sure to destroy Typed instance during cleanup
      // to prevent memory leaks
      typed.current.destroy()
    }
  }, [])

  return (
    <PageWarp>
      <div className="wrap">
        <div className="type-wrap">
          <span style={{ whiteSpace: 'pre' }} ref={el} />
        </div>
      </div>
    </PageWarp>
  )
}

export default TypedReactHooksDemo
