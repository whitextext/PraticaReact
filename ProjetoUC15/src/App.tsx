import { useState } from "react";

import receita from "@/../public/ReceitaDeBolo.json";

function App() {
  const [Receita] = useState(receita);

  return (
    <div className="h-screen w-full bg-slate-900 flex flex-col items-center justify-center text-white">
      <h1 className="text-5xl font-bold text-green-500 mb-4 hover:scale-110 transition-transform cursor-pointer">
        Receita de bolo
      </h1>
      <div className="flex flex-col items-center justify-center">
        <p className="text-xl text-gray-400">{Receita.receita}</p>
        <p className="text-xl text-gray-400">{Receita.tipo}</p>
        <p className="text-xl text-gray-400">{Receita.tempo_preparo_minutos}</p>
        <p className="text-xl text-gray-400">{Receita.rendimento_porcoes}</p>
      </div>
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-5xl font-bold text-green-500 mb-4 hover:scale-110 transition-transform cursor-pointer">
          Ingredientes
        </h1>
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-5xl font-bold text-green-500 mb-4 hover:scale-110 transition-transform cursor-pointer">
            Massa
          </h2>
          <ul>
            {Receita.ingredientes.massa.map((ingrediente, index) => (
              <li key={index}>{ingrediente.item}</li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-5xl font-bold text-green-500 mb-4 hover:scale-110 transition-transform cursor-pointer">
            Cobertura
          </h2>
          <ul>
            {Receita.ingredientes.cobertura.map((ingrediente, index) => (
              <li key={index}>{ingrediente.item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
