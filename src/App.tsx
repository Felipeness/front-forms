import './styles/global.scss'

import { useVcosole } from '@hooks/useVconsole'

import MyRoutes from '@/router'

export default function App() {
  useVcosole()
  return (
    <div>
      <MyRoutes />
    </div>
  )
}
