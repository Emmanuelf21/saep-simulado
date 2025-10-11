import React, { useState } from 'react'
import './css/FormCadastro.css'

const FormCadastrar = () => {
    const [livro, setLivro] = useState('')
    const [autor, setAutor] = useState('')
    const [categoria, setCategoria] = useState('')
    const [estado, setEstado] = useState('')

    const opcoes = [
        { id: 1, label: 'fantasia' },
        { id: 2, label: 'terror' },
        { id: 3, label: 'história' }
    ]

    const opcoesStatus = [
        { id: 1, label: 'Disponível' },
        { id: 2, label: 'Reservado' }
    ]

    return (
        <form method='POST' className='formulario'>
            <div className='flex-col'>
                <label name="livro">Livro</label>
                <input id='livro' type="text" value={livro} onChange={(e) => setLivro(e.target.value)} placeholder='Digite o nome do livro...'/>
            </div>
            <div className='flex-col'>
                <label name="autor">Autor</label>
                <input id='autor' type="text" value={autor} onChange={(e) => setAutor(e.target.value)} placeholder='Digite o nome do autor...'/>
            </div>
            <div className='select flex-col'>
                <label name="categoria">Categoria</label>
                <select name='categoria' value={categoria} id="meuSelecionado" onChange={(e) => { setCategoria(e.target.value) }}>
                    <option value="">--Selecione--</option>
                    {opcoes.map((op) => {
                        return <option value={op.label} key={op.id}>{op.label}</option>
                    })}
                </select>
            </div>
            <div className='select flex-col'>
                <label name="status">Disponibilidade</label>
                <select name='status' value={estado} id="meuSelecionadoStatus" onChange={(e) => { setEstado(e.target.value) }}>
                    <option value="">--Selecione--</option>
                    {opcoesStatus.map((op) => {
                        return <option value={op.label} key={op.id}>{op.label}</option>
                    })}
                </select>
            </div>
            <button type='submit' className='btnRegistrar'>Registrar</button>
        </form>
    )
}

export default FormCadastrar