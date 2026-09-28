const estilos = {
  Aventura: { borda: "border-emerald-500", selo: "bg-emerald-400/20 text-emerald-200" },
  Puzzle: { borda: "border-amber-400", selo: "bg-amber-400/20 text-amber-100" },
  Ação: { borda: "border-rose-400", selo: "bg-rose-400/20 text-rose-100" },
  RPG: { borda: "border-violet-400", selo: "bg-violet-400/20 text-violet-100" },
};

const estiloPadrao = { borda: "border-slate-400", selo: "bg-slate-400/20 text-slate-100" };

function GameCard({
  titulo,
  descricao,
  categoria,
  plataforma,
  nota,
  imagem,
  jogado,
  onToggle,
  onRemover,
}) {
  const estilo = estilos[categoria] ?? estiloPadrao;

  return (
    <article
      className={`overflow-hidden rounded-2xl border-t-4 shadow-lg shadow-black/20 transition duration-300 hover:-translate-y-1 hover:shadow-cyan-500/20 ${estilo.borda} ${
        jogado ? "bg-slate-800/60" : "bg-slate-900/70"
      }`}
    >
      <div className="h-44 bg-gradient-to-br from-violet-500 via-cyan-500 to-fuchsia-600">
        <img
          src={imagem}
          alt={`Capa do jogo ${titulo}`}
          className={`h-full w-full object-cover ${jogado ? "grayscale" : ""}`}
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-2">
          <h3
            className={`text-lg font-bold ${
              jogado ? "text-slate-400 line-through" : "text-white"
            }`}
          >
            {titulo}
          </h3>
          <span className="shrink-0 rounded-full bg-cyan-400 px-2 py-0.5 text-sm font-semibold text-slate-950">
            ⭐ {nota}
          </span>
        </div>

        <p className="mt-2 text-sm leading-relaxed text-slate-300">{descricao}</p>

        <div className="mt-4 flex items-center justify-between gap-2 text-xs">
          <span className={`rounded-full px-3 py-1 font-semibold ${estilo.selo}`}>
            {categoria}
          </span>
          <span className="text-slate-400">{plataforma}</span>
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-slate-700 pt-4">
          <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-300">
            <input
              type="checkbox"
              checked={jogado}
              onChange={onToggle}
              aria-label={`Já joguei: ${titulo}`}
              className="h-4 w-4 accent-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-1 focus:ring-offset-slate-900"
            />
            Já joguei
          </label>
          <button
            onClick={onRemover}
            aria-label={`Remover jogo: ${titulo}`}
            className="rounded px-1 text-xs font-semibold text-rose-400 hover:text-rose-300 focus:outline-none focus:ring-2 focus:ring-rose-400"
          >
            Remover
          </button>
        </div>
      </div>
    </article>
  );
}

export default GameCard;
