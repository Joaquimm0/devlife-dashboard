import { useState, useEffect } from "react";
import {
  suportaNotificacoes,
  ativarNotificacoes,
  notificarLocal,
} from "../notifications";

function NotificationPrompt() {
  const [permissao, setPermissao] = useState(
    suportaNotificacoes() ? Notification.permission : "unsupported"
  );
  const [carregando, setCarregando] = useState(false);

  useEffect(() => {
    if (permissao === "granted") {
      ativarNotificacoes().catch((erro) => console.warn("Inscrição de push adiada:", erro));
    }
  }, [permissao]);

  async function handleAtivar() {
    setCarregando(true);
    const resultado = await ativarNotificacoes();
    setPermissao(Notification.permission);
    setCarregando(false);
    if (resultado.ok) {
      notificarLocal("PixelShelf", {
        body: "Notificações ativadas! Você receberá avisos importantes.",
      });
    }
  }

  if (permissao === "unsupported" || permissao === "denied") return null;

  if (permissao === "granted") {
    return (
      <div className={`bg-slate-800 text-slate-200 text-sm px-6 py-2 flex items-center justify-between flex-wrap gap-2`}>
        <span>🔔 Notificações ativadas.</span>
        <button
          onClick={() =>
            notificarLocal("PixelShelf", {
              body: "Esta é uma notificação de teste.",
            })
          }
          className={`text-xs font-semibold underline decoration-dotted hover:text-white focus:outline-none focus:ring-2 focus:ring-emerald-400 rounded px-1`}
        >
          Testar notificação
        </button>
      </div>
    );
  }

  return (
    <div className={`bg-slate-800 text-slate-200 px-6 py-3 flex items-center justify-between flex-wrap gap-3`}>
      <p className="text-sm">🔔 Quer ser avisado sobre novidades interessantes?</p>
      <button
        onClick={handleAtivar}
        disabled={carregando}
        className={`bg-emerald-700 hover:bg-emerald-800 disabled:opacity-60 text-white text-sm font-bold px-4 py-1.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-slate-800`}
      >
        {carregando ? "Ativando…" : "Ativar notificações"}
      </button>
    </div>
  );
}

export default NotificationPrompt;
