import Typed from 'typed.js'
import styles from './index.module.less'
import PageWarp from '@/components/BusinessComponent/PageWarp'
import AuthButton from '@/components/Auth/AuthButton'
const TypedReactHooksDemo = (props: any) => {
  // Create reference to store the DOM element containing the animation
  const el = useRef(null)
  // Create reference to store the Typed instance itself
  const typed: any = useRef(null)

  useEffect(() => {
    const options = {
      strings: ['Wecome alan'],
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
      <div className={styles.wrap}>
        <div className="type-wrap">
          <span style={{ whiteSpace: 'pre', fontSize: 100 }} ref={el} />
        </div>
        <AuthButton authCode="admin1">
          <Button>111</Button>
        </AuthButton>
      </div>
    </PageWarp>
  )
}

export default memo(TypedReactHooksDemo)
