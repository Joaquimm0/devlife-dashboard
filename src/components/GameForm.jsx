import { useState } from "react";

const campo =
  "w-full rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400";
const rotulo = "mb-1 block text-sm font-semibold text-slate-300";

function GameForm({ onAdicionar }) {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [categoria, setCategoria] = useState("Aventura");
  const [plataforma, setPlataforma] = useState("PC");
  const [nota, setNota] = useState(8);
  const [imagem, setImagem] = useState("");

  function aoEnviar(evento) {
    evento.preventDefault();
    if (titulo.trim() === "") return;

    onAdicionar({
      titulo: titulo.trim(),
      descricao: descricao.trim() || "Sem descrição ainda.",
      categoria,
      plataforma,
      nota: Math.min(10, Math.max(0, Number(nota) || 0)),
      imagem: imagem.trim(),
    });

    setTitulo("");
    setDescricao("");
    setImagem("");
  }

  return (
    <form
      onSubmit={aoEnviar}
      className="mb-8 flex flex-wrap items-end gap-3 rounded-2xl bg-slate-900/70 p-5 shadow-lg shadow-black/20"
    >
      <div className="min-w-[200px] flex-1">
        <label htmlFor="campo-titulo" className={rotulo}>
          Novo jogo
        </label>
        <input
          id="campo-titulo"
          type="text"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          placeholder="Nome do jogo"
          className={campo}
        />
      </div>

      <div className="min-w-[200px] flex-1">
        <label htmlFor="campo-descricao" className={rotulo}>
          Descrição
        </label>
        <input
          id="campo-descricao"
          type="text"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          placeholder="Sobre o que é o jogo?"
          className={campo}
        />
      </div>

      <div>
        <label htmlFor="campo-categoria" className={rotulo}>
          Categoria
        </label>
        <select
          id="campo-categoria"
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          className={campo}
        >
          <option>Aventura</option>
          <option>Ação</option>
          <option>Puzzle</option>
          <option>RPG</option>
        </select>
      </div>

      <div>
        <label htmlFor="campo-plataforma" className={rotulo}>
          Plataforma
        </label>
        <select
          id="campo-plataforma"
          value={plataforma}
          onChange={(e) => setPlataforma(e.target.value)}
          className={campo}
        >
          <option>PC</option>
          <option>Switch</option>
          <option>PC / Switch</option>
          <option>PC / Console</option>
          <option>Multi</option>
        </select>
      </div>

      <div className="w-24">
        <label htmlFor="campo-nota" className={rotulo}>
          Nota
        </label>
        <input
          id="campo-nota"
          type="number"
          min="0"
          max="10"
          step="0.1"
          value={nota}
          onChange={(e) => setNota(e.target.value)}
          className={campo}
        />
      </div>

      <div className="min-w-[200px] flex-1">
        <label htmlFor="campo-imagem" className={rotulo}>
          Link da capa (opcional)
        </label>
        <input
          id="campo-imagem"
          type="text"
          value={imagem}
          onChange={(e) => setImagem(e.target.value)}
          placeholder="https://..."
          className={campo}
        />
      </div>

      <button
        type="submit"
        className="rounded-lg bg-cyan-400 px-5 py-2 font-bold text-slate-950 transition-colors hover:bg-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-900"
      >
        + Adicionar
      </button>
    </form>
  );
}

export default GameForm;
