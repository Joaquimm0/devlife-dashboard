import { useState, useEffect } from "react";

function Relogio() {
  const [hora, setHora] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    console.log("⏰ Relogio MONTADO — intervalo ligado");

    const intervalo = setInterval(() => {
      setHora(new Date().toLocaleTimeString());
    }, 1000);

    return () => {
      console.log("💀 Relogio DESMONTADO — intervalo desligado");
      clearInterval(intervalo);
    };
  }, []);

  return (
    <span className="rounded-lg bg-slate-950/60 px-3 py-1 font-mono text-sm text-cyan-300">
      {hora}
    </span>
  );
}

export default Relogio;
