import { createRoot } from 'react-dom/client'
import { router } from './router'
import { RouterProvider } from 'react-router-dom'
import './index.less'
const container = window.document.getElementById('app')!
const root = createRoot(container) // createRoot(container!) if you use TypeScript
root.render(<RouterProvider router={router} />)
