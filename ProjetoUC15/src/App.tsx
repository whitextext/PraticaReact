import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="h-screen w-full bg-slate-900 flex flex-col items-center justify-center text-white">
      <h1 className="text-5xl font-bold text-green-500 mb-4 hover:scale-110 transition-transform cursor-pointer">
        RootGuard Ativado 🚀
      </h1>
      <p className="text-xl text-gray-400">Ambiente Seguro & Gamificado</p>
      <button
        onClick={() => setCount(count + 1)}
        className="mt-8 px-6 py-3 bg-green-600 rounded-lg font-bold hover:bg-green-500 transition-colors"
      >
        Nível de Acesso: {count}
      </button>
    </div>
  );
}

export default App;
