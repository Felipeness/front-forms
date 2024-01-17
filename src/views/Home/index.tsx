import './module.scss'

import ClienteCadastro from '@/components/ClienteCadastro/ClienteCadastro'
import ClienteListagem from '@/components/ClienteListagem/ClienteListagem'

const Home = () => {
  return (
    <div className="container">
      <div className="cliente-cadastro">
        <ClienteCadastro />
      </div>
      <div className="cliente-lista">
        <ClienteListagem />
      </div>
    </div>
  )
}

export default Home
