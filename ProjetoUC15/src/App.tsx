import { Routes, Route } from "react-router-dom";

import PaginaPrincipal from "@/pages/PaginaPrincipal";
import ModeloGemini from "@/pages/modeloGemini";
import TreinoTailwind from "@/pages/TreinoTailwind";

export function App() {
  return (
    <Routes>
      <Route path="/" element={<PaginaPrincipal />} />
      <Route path="/Modelo" element={<ModeloGemini />} />
      <Route path="/Tail" element={<TreinoTailwind />} />
    </Routes>
  );
}
