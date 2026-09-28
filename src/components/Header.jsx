import { useState } from "react";
import Relogio from "./Relogio";

function Header({ nome, subtitulo }) {
  const [mostrarRelogio, setMostrarRelogio] = useState(true);

  return (
    <header className="bg-[linear-gradient(135deg,#2d1b4d_0%,#4f46e5_45%,#06b6d4_100%)] text-white shadow-lg shadow-cyan-950/20">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-6">
        <div>
          <h1 className="text-3xl font-black tracking-[0.08em] uppercase text-white font-display">
            {nome}
          </h1>
          <p className="mt-2 text-sm text-violet-100">{subtitulo}</p>
        </div>

        <div className="flex items-center gap-3">
          {mostrarRelogio && (
            <span aria-hidden="true">
              <Relogio />
            </span>
          )}
          <button
            onClick={() => setMostrarRelogio(!mostrarRelogio)}
            aria-pressed={mostrarRelogio}
            className="rounded-lg border border-white/40 bg-slate-950/70 px-3 py-1 text-xs text-white transition-colors hover:border-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-300"
          >
            {mostrarRelogio ? "Esconder relógio" : "Mostrar relógio"}
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
