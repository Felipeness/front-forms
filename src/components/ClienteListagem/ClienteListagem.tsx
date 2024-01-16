import './clienteListagem.scss'

import React, { ChangeEvent, useEffect, useState } from 'react'
import { FaEdit, FaTrashAlt } from 'react-icons/fa'

interface Cliente {
  id: number
  nome: string
  email: string
  telefone: string
}

const ClienteListagem: React.FC = () => {
  const [clientes, setClientes] = useState<Cliente[]>([])
  const [editableCliente, setEditableCliente] = useState<Cliente | null>(null)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [filtro, setFiltro] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [erro, setErro] = useState<string>('')

  useEffect(() => {
    const fetchClientes = async () => {
      setLoading(true)
      try {
        const response = await fetch('http://localhost:3000/clientes/clientes')
        if (!response.ok) throw new Error('Erro ao buscar clientes')
        const data: Cliente[] = await response.json()
        setClientes(data)
      } catch (error) {
        if (error instanceof Error) {
          setErro('Falha ao carregar clientes: ${error.message}')
        } else {
          setErro('Erro ao buscar clientes')
        }
      } finally {
        setLoading(false)
      }
    }

    fetchClientes()
  }, [])

  const handleEdit = (cliente: Cliente): void => {
    setEditingId(cliente.id)
    setEditableCliente({ ...cliente })
  }

  const handleSave = async (id: number): Promise<void> => {
    if (editableCliente) {
      try {
        const response = await fetch(`http://localhost:3000/clientes/clientes/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(editableCliente),
        })

        if (!response.ok) throw new Error('Erro ao atualizar cliente')

        const updatedCliente: Cliente = await response.json()

        // Atualizar o cliente na lista local
        setClientes(clientes.map((cliente) => (cliente.id === id ? updatedCliente : cliente)))

        // Encerrar o modo de edição
        setEditingId(null)
        setEditableCliente(null)
      } catch (error) {
        if (error instanceof Error) {
          setErro(`Falha ao atualizar cliente: ${error.message}`)
        } else {
          setErro('Erro ao atualizar cliente')
        }
      }
    }
  }

  const handleDelete = async (id: number): Promise<void> => {
    if (window.confirm('Deseja realmente excluir este cliente?')) {
      try {
        const response = await fetch(`http://localhost:3000/clientes/clientes/${id}`, { method: 'DELETE' })
        if (!response.ok) throw new Error('Erro ao excluir cliente')
        setClientes(clientes.filter((cliente) => cliente.id !== id))
      } catch (error) {
        if (error instanceof Error) {
          setErro('Falha ao excluir cliente: ${error.message}')
        } else {
          setErro('Erro ao excluir cliente')
        }
      }
    }
  }

  const filteredClientes = clientes.filter(
    (cliente) =>
      cliente.nome.toLowerCase().includes(filtro.toLowerCase()) ||
      cliente.email.toLowerCase().includes(filtro.toLowerCase()) ||
      cliente.telefone.includes(filtro),
  )

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>, field: keyof Cliente): void => {
    if (editableCliente) {
      setEditableCliente({ ...editableCliente, [field]: e.target.value })
    }
  }

  return (
    <div className="cliente-listagem">
      <h1>Listagem de Clientes</h1>
      <input
        type="text"
        placeholder="Filtrar por nome, email ou telefone"
        value={filtro}
        onChange={(e) => setFiltro(e.target.value)}
      />
      {loading ? (
        <p>Carregando...</p>
      ) : erro ? (
        <p className="error">{erro}</p>
      ) : (
        <ul>
          {filteredClientes.map((cliente) => (
            <li key={cliente.id}>
              {editingId === cliente.id ? (
                <div>
                  <input type="text" value={editableCliente?.nome} onChange={(e) => handleInputChange(e, 'nome')} />
                  <input type="text" value={editableCliente?.email} onChange={(e) => handleInputChange(e, 'email')} />
                  <input
                    type="text"
                    value={editableCliente?.telefone}
                    onChange={(e) => handleInputChange(e, 'telefone')}
                  />
                  <button onClick={() => handleSave(cliente.id)}>Salvar</button>
                  <button onClick={() => setEditingId(null)}>Cancelar</button>
                </div>
              ) : (
                <div>
                  {cliente.nome} - {cliente.email} - {cliente.telefone}
                  <button className="btn-editar" onClick={() => handleEdit(cliente)}>
                    <FaEdit />
                  </button>
                  <button className="btn-excluir" onClick={() => handleDelete(cliente.id)}>
                    <FaTrashAlt />
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default ClienteListagem
