import React, { useState } from 'react';

const EditarTabela = ({ edit, livro, setEdit }) => {
  const [nomeLivro, setNomeLivro] = useState(livro.nome_livro || '');
  const [autor, setAutor] = useState(livro.autor || '');
  const [categoria, setCategoria] = useState(livro.categoria || '');
  const [estado, setEstado] = useState(livro.disponibilidade || '');
  const [aluno, setAluno] = useState(livro.aluno || '');
  const [data, setData] = useState(
    livro.data ? new Date(livro.data).toISOString().split("T")[0] : ''
  );
  

  const opcoes = [
    { id: 1, label: 'fantasia' },
    { id: 2, label: 'terror' },
    { id: 3, label: 'história' }
  ];

  const opcoesStatus = [
    { id: 1, label: 'Disponível' },
    { id: 2, label: 'Reservado' }
  ];

  const atualizarLivro = async () => {
    try {
      const res = await fetch(`http://localhost:8000/livros/${livro.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome_livro: nomeLivro,
          autor,
          categoria,
          disponibilidade: estado,
          aluno: aluno.trim() === '' ? null : aluno,
          data: data === '' ? null : data
        })        
      });
  
      if (!res.ok) throw new Error("Erro ao atualizar livro");
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    atualizarLivro();
    setEdit(1); // Fecha o modo de edição
  };

  return (
    <>
      {edit === 0 && (
        <form onSubmit={handleSubmit} className='formularioEditar'>
          <div className='flex-col'>
            <label htmlFor='livro'>Livro</label>
            <input
              id='livro'
              type='text'
              value={nomeLivro}
              onChange={(e) => setNomeLivro(e.target.value)}
              placeholder='Digite o nome do livro...'
            />
          </div>

          <div className='flex-col'>
            <label htmlFor='autor'>Autor</label>
            <input
              id='autor'
              type='text'
              value={autor}
              onChange={(e) => setAutor(e.target.value)}
              placeholder='Digite o nome do autor...'
            />
          </div>

          <div className='select flex-col'>
            <label htmlFor='categoria'>Categoria</label>
            <select
              name='categoria'
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
            >
              <option value=''>--Selecione--</option>
              {opcoes.map((op) => (
                <option value={op.label} key={op.id}>
                  {op.label}
                </option>
              ))}
            </select>
          </div>

          <div className='select flex-col'>
            <label htmlFor='status'>Disponibilidade</label>
            <select
              name='status'
              value={estado}
              onChange={(e) => setEstado(e.target.value)}
            >
              <option value=''>--Selecione--</option>
              {opcoesStatus.map((op) => (
                <option value={op.label} key={op.id}>
                  {op.label}
                </option>
              ))}
            </select>
          </div>

          <div className='flex-col'>
            <label htmlFor='aluno'>Aluno</label>
            <input
              id='aluno'
              type='text'
              value={aluno}
              onChange={(e) => setAluno(e.target.value)}
              placeholder='Digite o nome do aluno...'
            />
          </div>

          <div className='flex-col'>
            <label htmlFor='data'>Data da devolução</label>
            <input
              id='data'
              type='date'
              value={data}
              onChange={(e) => setData(e.target.value)}
            />
          </div>

          <button type='submit' className='btnSalvar'>
            Salvar
          </button>
        </form>
      )}
    </>
  );
};

export default EditarTabela;
