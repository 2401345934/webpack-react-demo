type Callback = (...args: any[]) => any // 定义一个类型 Callback，它是一个函数类型，接受任意类型的参数并返回任意类型的结果

function useCachedCallback<T extends Callback>(
  callback: T,
  dependencies: any[],
): T {
  const [cachedCallback, setCachedCallback] = useState<Callback>(() => {
    // 将 cachedCallback 定义为一个 state，初始值为 callback 函数
    return (...args: any[]) => {
      return callback(...args)
    }
  })

  const memoizedCallback = useCallback(
    (...args: any[]) => {
      return cachedCallback(...args) // 返回定义在 state 中的 cachedCallback 函数
    },
    [cachedCallback, ...dependencies], // 将 cachedCallback 和 dependencies 添加为依赖项
  )

  return memoizedCallback as T // 返回 memoizedCallback 函数
}

export default useCachedCallback

// 使用示例
// import { useState } from 'react'
// import useCachedCallback from './useCachedCallback' // 引入自定义的 hook

// function MyComponent() {
//   const [count, setCount] = useState(0)

//   // 定义一个回调函数，依赖于 count 状态
//   const handleClick = () => {
//     setCount(count + 1)
//   }

//   // 使用 useCachedCallback 将 handleClick 函数进行缓存
//   const memoizedHandleClick = useCachedCallback(handleClick, [count])

//   return (
//     <div>
//       <h1>{count}</h1>
//       <button onClick={memoizedHandleClick}>Increment</button>
//     </div>
//   )
// }
