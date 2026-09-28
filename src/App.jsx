import { useState, useEffect } from "react";
import Header from "./components/Header";
import GameCard from "./components/GameCard";
import Footer from "./components/Footer";
import GameForm from "./components/GameForm";
import StatusRede from "./components/StatusRede";
import InstallPrompt from "./components/InstallPrompt";
import NotificationPrompt from "./components/NotificationPrompt";
import { notificarLocal } from "./notifications";
import { agendarSincronizacao } from "./backgroundSync";

const JOGOS_INICIAIS = [
  {
    id: 1,
    titulo: "Minecraft",
    descricao: "Construa, explore e sobreviva em um mundo infinito cheio de criatividade.",
    categoria: "Aventura",
    plataforma: "PC / Switch",
    nota: 9.7,
    jogado: true,
    imagem:
      "https://upload.wikimedia.org/wikipedia/pt/9/9c/Minecraft_capa.png?utm_source=pt.wikipedia.org&utm_campaign=index&utm_content=original",
  },
  {
    id: 2,
    titulo: "Zelda",
    descricao: "Aventura épica em um mundo vasto com desafios, mistérios e ação intensa.",
    categoria: "Ação",
    plataforma: "Switch",
    nota: 9.8,
    jogado: false,
    imagem:
      "https://assets.nintendo.com/image/upload/ar_16:9,b_auto:border,c_lpad/b_white/f_auto/q_auto/dpr_1.5/c_scale,w_400/ncom/en_US/merchandising/feature-banner/2026/Zelda%2040th%20Anniversary/Ocarina_of_Time",
  },
  {
    id: 3,
    titulo: "Portal 2",
    descricao: "Quebra-cabeças inteligentes com humor, física e raciocínio preciso.",
    categoria: "Puzzle",
    plataforma: "PC",
    nota: 9.5,
    jogado: false,
    imagem:
      "https://assets.nintendo.com/image/upload/q_auto/f_auto/store/software/switch/70010000050313/75484f73fedd25cb830c5d93fbb3fca643a5ec0b09df2815291ead880bc7d6b1",
  },
  {
    id: 4,
    titulo: "Cyberpunk 2077",
    descricao: "Uma cidade futurista repleta de escolhas, conflitos e tecnologia avançada.",
    categoria: "RPG",
    plataforma: "PC / Console",
    nota: 8.9,
    jogado: false,
    imagem:
      "https://cdn1.epicgames.com/offer/77f2b98e2cef40c8a7437518bf420e47/EGS_Cyberpunk2077_CDPROJEKTRED_S1_03_2560x1440-359e77d3cd0a40aebf3bbc130d14c5c7",
  },
  {
    id: 5,
    titulo: "Rocket League",
    descricao: "Competição frenética com veículos, gols incríveis e partidas eletrizantes.",
    categoria: "Ação",
    plataforma: "PC / Console",
    nota: 9.1,
    jogado: false,
    imagem:
      "https://cdn1.epicgames.com/offer/9773aa1aa54f4f7b80e44bef04986cea/EGS_RocketLeague_PsyonixLLC_S1_2560x1440-1a37e26b20fb4f3ebd825e64bc7914eb",
  },
  {
    id: 6,
    titulo: "Stardew Valley",
    descricao: "Cultive, socialize e crie um refúgio acolhedor em uma fazenda tranquila.",
    categoria: "Aventura",
    plataforma: "Multi",
    nota: 9.4,
    jogado: false,
    imagem:
      "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/413150/capsule_616x353.jpg?t=1786554168",
  },
];

const FILTROS = [
  { valor: "todos", rotulo: "Todos" },
  { valor: "para-jogar", rotulo: "Para jogar" },
  { valor: "jogados", rotulo: "Jogados" },
];

function App() {
  const [jogos, setJogos] = useState(() => {
    const salvos = localStorage.getItem("pixelshelf-jogos");
    return salvos ? JSON.parse(salvos) : JOGOS_INICIAIS;
  });
  const [filtro, setFiltro] = useState("todos");
  const [anuncio, setAnuncio] = useState("");

  useEffect(() => {
    localStorage.setItem("pixelshelf-jogos", JSON.stringify(jogos));
  }, [jogos]);

  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;
    function aoReceberMensagem(evento) {
      if (evento.data?.tipo === "SINCRONIZADO") {
        setAnuncio("🔄 Sincronização em segundo plano concluída.");
      }
    }
    navigator.serviceWorker.addEventListener("message", aoReceberMensagem);
    return () => navigator.serviceWorker.removeEventListener("message", aoReceberMensagem);
  }, []);

  function adicionarJogo(novoJogo) {
    setJogos((atual) => [...atual, { ...novoJogo, id: Date.now(), jogado: false }]);
    setAnuncio(`Jogo "${novoJogo.titulo}" adicionado.`);
    avisarMudancaOffline();
  }

  function alternarJogado(id) {
    const jogo = jogos.find((j) => j.id === id);
    if (!jogo) return;
    const status = jogo.jogado ? "para jogar" : "jogado";
    setJogos((atual) =>
      atual.map((j) => (j.id === id ? { ...j, jogado: !j.jogado } : j))
    );
    setAnuncio(`Jogo "${jogo.titulo}" marcado como ${status}.`);
    const vaiJogar = !jogo.jogado;
    // Exemplo de gatilho: notificar quando um jogo for marcado como jogado e tiver nota alta
    if (vaiJogar && jogo.nota >= 9) {
      notificarLocal("Boa! Jogo marcado como jogado 🎉", { body: jogo.titulo });
    }
  }

  function removerJogo(id) {
    const jogo = jogos.find((j) => j.id === id);
    if (!jogo) return;
    setJogos((atual) => atual.filter((j) => j.id !== id));
    setAnuncio(`Jogo "${jogo.titulo}" removido.`);
    avisarMudancaOffline();
  }

  function avisarMudancaOffline() {
    if (!("navigator" in window) || navigator.onLine) return;
    agendarSincronizacao("sincronizar-jogos");
    setAnuncio((atual) => `${atual} A sincronização ocorrerá quando a conexão voltar.`);
  }

  const jogosFiltrados = jogos.filter((j) => {
    if (filtro === "para-jogar") return !j.jogado;
    if (filtro === "jogados") return j.jogado;
    return true;
  });

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#2a1345,#120b1d_45%,#09060d)] text-slate-100">
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:left-2 focus:top-2 focus:z-50 focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-slate-900 focus:shadow-lg"
      >
        Pular para o conteúdo
      </a>

      <Header nome="PixelShelf" subtitulo="Seu catálogo de jogos favoritos" />
      <StatusRede />
      <InstallPrompt />
      <NotificationPrompt />

      <div aria-live="polite" role="status" className="sr-only">
        {anuncio}
      </div>

      <main id="conteudo" tabIndex={-1} className="mx-auto max-w-6xl px-4 py-8 focus:outline-none">
        <GameForm onAdicionar={adicionarJogo} />

        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-xl font-bold text-slate-200">
            Meus jogos ({jogos.length})
          </h2>
          <div role="group" aria-label="Filtrar jogos" className="flex gap-2">
            {FILTROS.map((opcao) => (
              <button
                key={opcao.valor}
                onClick={() => setFiltro(opcao.valor)}
                aria-pressed={filtro === opcao.valor}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-300 ${
                  filtro === opcao.valor
                    ? "bg-cyan-400 text-slate-950"
                    : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                }`}
              >
                {opcao.rotulo}
              </button>
            ))}
          </div>
        </div>

        {jogosFiltrados.length === 0 && (
          <p className="py-10 text-center text-slate-400">
            Nenhum jogo por aqui ainda.
          </p>
        )}

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {jogosFiltrados.map((jogo) => (
            <GameCard
              key={jogo.id}
              titulo={jogo.titulo}
              descricao={jogo.descricao}
              categoria={jogo.categoria}
              plataforma={jogo.plataforma}
              nota={jogo.nota}
              imagem={jogo.imagem}
              jogado={jogo.jogado}
              onToggle={() => alternarJogado(jogo.id)}
              onRemover={() => removerJogo(jogo.id)}
            />
          ))}
        </div>
      </main>

      <Footer texto="PixelShelf © 2026 · SA03 Programação Front-end" />
    </div>
  );
}

export default App;
