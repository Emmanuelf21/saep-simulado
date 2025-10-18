import React, { useState } from 'react'
import './css/FormCadastro.css'

const FormCadastrar = () => {
    const [livro, setLivro] = useState('')
    const [autor, setAutor] = useState('')
    const [categoria, setCategoria] = useState('')

    const opcoes = [
        { id: 1, label: 'fantasia' },
        { id: 2, label: 'terror' },
        { id: 3, label: 'história' }
    ]

    const handleSubmit = async (e) => {
        e.preventDefault()
    
        const novoLivro = {
            nome_livro: livro,
            autor: autor,
            categoria: categoria
        }
    
        try {
            const res = await fetch('http://127.0.0.1:8000/livros/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(novoLivro)
            })
    
            if (!res.ok) throw new Error('Erro ao cadastrar livro')
    
            const data = await res.json()
            console.log('Livro cadastrado:', data)
    
            // Limpar campos
            setLivro('')
            setAutor('')
            setCategoria('')
            window.location.reload();
        } catch (error) {
            console.error('Erro:', error)
        }
    }
    
    return (
        <form onSubmit={handleSubmit} className='formulario'>
            <div className='flex-col'>
                <label htmlFor="livro">Livro</label>
                <input
                    id='livro'
                    type="text"
                    value={livro}
                    onChange={(e) => setLivro(e.target.value)}
                    placeholder='Digite o nome do livro...'
                    required
                />
            </div>
            <div className='flex-col'>
                <label htmlFor="autor">Autor</label>
                <input
                    id='autor'
                    type="text"
                    value={autor}
                    onChange={(e) => setAutor(e.target.value)}
                    placeholder='Digite o nome do autor...'
                    required
                />
            </div>
            <div className='select flex-col'>
                <label htmlFor="categoria">Categoria</label>
                <select
                    id="categoria"
                    value={categoria}
                    onChange={(e) => setCategoria(e.target.value)}
                    required
                >
                    <option value="">--Selecione--</option>
                    {opcoes.map((op) => (
                        <option value={op.label} key={op.id}>{op.label}</option>
                    ))}
                </select>
            </div>
            <button type='submit' className='btnRegistrar'>Registrar</button>
        </form>
    )
}

export default FormCadastrar
