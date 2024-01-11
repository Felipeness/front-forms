import './clienteCadastro.scss'

import React, { useState } from 'react'

interface Cliente {
  nome: string
  email: string
  telefone: string
}

const ClienteCadastro: React.FC = () => {
  const [cliente, setCliente] = useState<Cliente>({ nome: '', email: '', telefone: '' })
  const [mensagem, setMensagem] = useState<string>('')

  // Função para lidar com mudanças nos inputs
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setCliente({ ...cliente, [name]: value })
  }

  // Função para enviar o form
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!cliente.nome || !cliente.email || !cliente.telefone) {
      setMensagem('Preencha todos os campos!')
      return
    }
    try {
      const response = await fetch('http://localhost:5000/clientes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cliente),
      })

      if (response.ok) {
        setMensagem('Cliente cadastrado com sucesso!')
        setCliente({ nome: '', email: '', telefone: '' })
      } else {
        setMensagem('Ocorreu um erro ao cadastrar o cliente!')
      }
    } catch (error) {
      console.error('Ocorreu um erro ao cadastrar o cliente!', error)
      setMensagem('Ocorreu um erro ao cadastrar o cliente!')
    }
  }
}

return (
  <div>
    <h1>Cadastro de Clientes</h1>
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nome:</label>
        <input type="text" name="nome" value={cliente.nome} onChange={handleInputChange} />
      </div>
      <div>
        <label>Email:</label>
        <input type="email" name="email" value={cliente.email} onChange={handleInputChange} />
      </div>
      <div>
        <label>Telefone:</label>
        <input type="text" name="telefone" value={cliente.telefone} onChange={handleInputChange} />
      </div>

      <button type="submit">Cadastrar</button>
    </form>
    {mensagem && <p>{mensagem}</p>}
  </div>
)

export default ClienteCadastro
