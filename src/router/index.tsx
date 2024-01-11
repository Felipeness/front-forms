import { useRoutes } from 'react-router-dom'

import About from '@/views/About'
import UploadCSV from '@/views/Home'

export default function Router() {
  return useRoutes([
    {
      path: '/',
      element: <UploadCSV />,
    },
    {
      path: '/about',
      element: <About />,
    },
  ])
}
