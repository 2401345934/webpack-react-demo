import React from 'react'
import Typed from 'typed.js'
import styles from './index.module.less'
const TypedReactHooksDemo = (props: any) => {
  // Create reference to store the DOM element containing the animation
  console.log('props', props)
  const el = React.useRef(null)
  // Create reference to store the Typed instance itself
  const typed: any = React.useRef(null)

  React.useEffect(() => {
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
    <div className={styles.wrap}>
      <div className="type-wrap">
        <span style={{ whiteSpace: 'pre', fontSize: 100 }} ref={el} />
      </div>
    </div>
  )
}

export default React.memo(TypedReactHooksDemo)
