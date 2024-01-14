import './clienteCadastro.scss'

import React, { useState } from 'react'
import InputMask from 'react-input-mask'

interface Cliente {
  nome: string
  email: string
  telefone: string
}

interface Erros {
  nome?: string
  email?: string
  telefone?: string
}

const ClienteCadastro: React.FC = () => {
  const [cliente, setCliente] = useState<Cliente>({ nome: '', email: '', telefone: '' })
  const [mensagem, setMensagem] = useState<string>('')
  const [erros, setErros] = useState<Erros>({})
  const [enviando, setEnviando] = useState<boolean>(false)

  // Função para lidar com mudanças nos inputs
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    if (name === 'nome' && value && !/^[A-Za-zÀ-ÿ\s]*$/.test(value)) {
      return
    }
    setCliente({ ...cliente, [name]: value })
  }

  // Função para validar o cadastro
  const validarCadastro = (cliente: Cliente): Erros => {
    return {
      nome: !cliente.nome ? 'O campo nome é obrigatório.' : '',
      email: !cliente.email
        ? 'O campo email é obrigatório.'
        : !/\S+@\S+\.\S+/.test(cliente.email)
          ? 'O campo email é inválido.'
          : '',
      telefone: !cliente.telefone
        ? 'O campo telefone é obrigatório.'
        : !/\(\d{2}\) \d{5}-\d{4}/.test(cliente.telefone)
          ? 'O campo telefone é inválido.'
          : '',
    }
  }

  // Função para enviar o form
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const novosErros = validarCadastro(cliente)
    if (Object.values(novosErros).some((erro) => erro)) {
      setErros(novosErros)
      return
    }

    setEnviando(true)
    try {
      const response = await fetch('http://localhost:8080/clientes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
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
    setEnviando(false)
    setErros({})
  }

  return (
    <div className="cadastro-cliente">
      <h1>Cadastro de Clientes</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome:</label>
          <input
            type="text"
            name="nome"
            value={cliente.nome}
            onChange={handleInputChange}
            placeholder="Digite seu nome"
            className={erros.nome ? 'input-error' : ''}
          />
          {erros.nome && <div className="error-message">{erros.nome}</div>}
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={cliente.email}
            onChange={handleInputChange}
            placeholder="exemplo@dominio.com"
            className={erros.email ? 'input-error' : ''}
          />
          {erros.email && <div className="error-message">{erros.email}</div>}
        </div>
        <div>
          <label>Telefone:</label>
          <InputMask
            mask="(99) 99999-9999"
            name="telefone"
            value={cliente.telefone}
            onChange={handleInputChange}
            placeholder="(XX) XXXXX-XXXX"
            className={erros.telefone ? 'input-error' : ''}
          />
          {erros.telefone && <div className="error-message">{erros.telefone}</div>}
        </div>

        <button type="submit" disabled={enviando}>
          {enviando ? 'Enviando...' : 'Cadastrar'}
        </button>
      </form>
      {mensagem && <p>{mensagem}</p>}
    </div>
  )
}
export default ClienteCadastro
