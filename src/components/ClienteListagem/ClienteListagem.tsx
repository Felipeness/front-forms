import './clienteListagem.scss'

import React, { useEffect, useState } from 'react'

interface Cliente {
  id: number
  nome: string
  email: string
  telefone: string
}

const ClienteListagem: React.FC = () => {
  const [clientes, setClientes] = useState<Cliente[]>([])
  const [filtro, setFiltro] = useState('') // Adicionado estado para o filtro

  // Função para buscar clientes na API
  const fetchClientes = async () => {
    try {
      const response = await fetch('http://localhost:5000/clientes')
      const data: Cliente[] = await response.json() // Adicionada tipagem para os dados
      setClientes(data)
    } catch (error) {
      console.error(error) // Alterado para console.error
    }
  }

  // Efeito para buscar os clientes ao carregar o componente
  useEffect(() => {
    fetchClientes()
  }, [])

  // Filtrar clientes com base no texto de filtro
  const clientesFiltrados = clientes.filter(
    (cliente) =>
      cliente.nome.toLowerCase().includes(filtro.toLowerCase()) ||
      cliente.email.toLowerCase().includes(filtro.toLowerCase()) ||
      cliente.telefone.includes(filtro),
  )

  return (
    <div>
      <h1>Listagem de Clientes</h1>
      <input type="text" placeholder="Filtrar clientes" value={filtro} onChange={(e) => setFiltro(e.target.value)} />
      <ul>
        {clientesFiltrados.map((cliente) => (
          <li key={cliente.id}>
            {cliente.nome} - {cliente.email} - {cliente.telefone}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ClienteListagem
