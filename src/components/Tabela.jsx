import React, { useEffect, useState } from 'react'
import './css/Tabela.css'
import EditarTabela from './EditarTabela';
const Tabela = () => {
    const [edit, setEdit] = useState(1);
    const [livros, setLivros] = useState();
    const [livroEditar, setLivroEditar] = useState();

    function handleEditTable(e, livro) {
        e.preventDefault();
        setEdit(0);             // ativa modo edição
        setLivroEditar(livro);  // envia livro para o form de edição
    }

    useEffect(() => {
        const get_livros = async () => {
               const res = await fetch('http://127.0.0.1:8000/livros/');
              try {
               if (!res.ok) throw new Error("Erro na requisição");
                const data = await res.json();
                setLivros(data);
            } catch (error) {
                console.error("Erro:", error);
            }
        }

        get_livros()
    }, [])
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
                        <th>Editar</th>
                    </tr>
                </thead>
                {/* fazer um loop */}
                <tbody>
                    {livros && livros.map(livro => (
                        <tr key={livro.id}>
                            <td>{livro.nome_livro}</td>
                            <td>{livro.autor}</td>
                            <td>{livro.categoria}</td>
                            <td>{livro.disponibilidade}</td>
                            <td>{livro.aluno}</td>
                            <td><button className='btnEditar' onClick={(e) => handleEditTable(e, livro)}>Editar</button></td>
                        </tr>
                    ))
                    }
                </tbody>
            </table>
            {/* } */}
            {edit === 0 && livroEditar && (
                <EditarTabela
                edit={edit}
                livro={livroEditar}
                setEdit={setEdit} // ✅ passa essa função
              />
              
            )}
        </main>
    )
}

export default Tabela