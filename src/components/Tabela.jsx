import React, { useEffect, useState } from 'react'
import './css/Tabela.css'
const Tabela = () => {
    const [edit, setEdit] = useState(1);
    const [livros, setLivros] = useState();

    const [livro, setLivro] = useState();
    const [autor, setAutor] = useState('')
    const [categoria, setCategoria] = useState('')
    const [estado, setEstado] = useState('')
    const [aluno, setAluno] = useState('')
    const [data, setData] = useState('')

    const opcoes = [
        { id: 1, label: 'fantasia' },
        { id: 2, label: 'terror' },
        { id: 3, label: 'história' }
    ]

    const opcoesStatus = [
        { id: 1, label: 'Disponível' },
        { id: 2, label: 'Reservado' }
    ]

    function handleEditTable(e) {
        if (edit == 0) {
            // puxar o livro pelo id e depois fazer o put
            setEdit(1)
        }
        else {
            setEdit(0)
        }
    }

    // useEffect({

    // }, [])
    return (
        <main className='container-tabela'>
            <div>
                <div>
                    <h2>Tabela de livros</h2>
                </div>
            </div>
            {/* {livro && */}
            <table className='tabela'>
                <thead>
                    <tr>
                        <th>Livro</th>
                        <th>Autor</th>
                        <th>Categoria</th>
                        <th>Disponibilidade</th>
                        <th>Aluno que reservou</th>
                    </tr>
                </thead>
                {/* fazer um loop */}
                <tbody>
                    <tr>
                        <td>nome filme</td>
                        <td>nome autor</td>
                        <td>categoria</td>
                        <td>Disponibilidade</td>
                        <td>aluno</td>
                        <td><button key='1' onClick={(e) => handleEditTable(e)}>Editar</button></td>
                    </tr>
                </tbody>
            </table>
            {/* } */}
            {edit==0 &&
                <form method='PUT' className='formularioEditar'>
                    <div className='flex-col'>
                        <label name="livro">Livro</label>
                        <input id='livro' type="text" value={livro} onChange={(e) => setLivro(e.target.value)} placeholder='Digite o nome do livro...' />
                    </div>
                    <div className='flex-col'>
                        <label name="autor">Autor</label>
                        <input id='autor' type="text" value={autor} onChange={(e) => setAutor(e.target.value)} placeholder='Digite o nome do autor...' />
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
                    <div className='flex-col'>
                        <label name="aluno">Aluno</label>
                        <input id='aluno' type="text" value={aluno} onChange={(e) => setAutor(e.target.value)} placeholder='Digite o nome do aluno...' />
                    </div>
                    <div className='flex-col'>
                        <label name="data">Data da devolução</label>
                        <input id='data' type="date" value={data} onChange={(e) => setAutor(e.target.value)} placeholder='Digite o nome do data...' />
                    </div>
                    <button type='submit' className='btnSalvar'>Salvar</button>
                </form>
            }
        </main>
    )
}

export default Tabela