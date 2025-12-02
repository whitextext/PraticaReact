export default function TreinoTailwind() {
  return (
    // DESAFIO 1: O Container
    // - Coloque um fundo escuro (bg-slate-900)
    // - Faça ele ocupar toda a altura da tela (h-screen)
    // - Centralize tudo que está dentro (flex, flex-col, items-center, justify-center)
    // - Coloque o texto branco (text-white)
    <div className="flex h-screen flex-col items-center justify-center bg-slate-900 text-white">
      <h1 className="mb-8 text-4xl font-bold">Treino RootGuard</h1>

      {/* DESAFIO 2: O Card do Trator */}
      {/* - Fundo cinza um pouco mais claro que o fundo da tela (bg-slate-800)
         - Padding interno confortável (p-6)
         - Bordas arredondadas (rounded-xl)
         - Largura fixa ou relativa (w-80)
         - Sombra (shadow-lg)
         - Borda fina e sutil (border, border-slate-700)
      */}
      <div className="w-80 rounded-xl border border-slate-700 bg-slate-800 p-6 shadow-lg">
        {/* DESAFIO 3: O Status (Badge) */}
        {/* - Deve ficar alinhado na direita (flex, justify-between, items-center na div pai abaixo)
         */}
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">Trator A1</h2>

          {/* - Fundo verde bem clarinho (bg-green-500/20 ou bg-green-900)
             - Texto verde neon (text-green-400)
             - Padding pequeno horizontal (px-2) e vertical (py-1)
             - Arredondado (rounded-full)
             - Texto pequeno e negrito (text-xs, font-bold)
          */}
          <span className="rounded-full bg-green-500/20 px-2 py-1 text-xs font-bold text-green-400">
            ATIVO
          </span>
        </div>

        <p className="mb-6 text-slate-400">
          Operando no setor Norte com eficiência máxima.
        </p>

        {/* DESAFIO 4: O Botão Interativo */}
        {/* - Fundo azul (bg-blue-600)
           - Largura total (w-full)
           - Padding vertical (py-2)
           - Arredondado (rounded-lg)
           - Negrito (font-bold)
           - EFEITO HOVER: Fundo azul mais claro quando passar o mouse (hover:bg-blue-500)
           - EFEITO HOVER: Escala levemente (hover:scale-105)
           - Transição suave (transition-all)
        */}
        <button className="w-full rounded-lg bg-blue-600 py-2 font-bold transition-all hover:scale-105 hover:bg-blue-500">
          Ver Detalhes
        </button>
      </div>
    </div>
  )
}
