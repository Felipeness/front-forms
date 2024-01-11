import ClienteCadastro from '@/components/ClienteCadastro/ClienteCadastro'
import ClienteListagem from '@/components/ClienteListagem/ClienteListagem'

const Home = () => {
  return (
    <div>
      <ClienteListagem />
      <ClienteCadastro />
    </div>
  )
}

export default Home
