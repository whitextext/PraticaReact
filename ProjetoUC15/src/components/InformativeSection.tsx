import { Leaf, Wallet, ShieldCheck } from "lucide-react";

export function InformativeSection() {
  return (
    <section className="">
      <div className="">
        <div className="">
          {/* Sustentabilidade */}
          <div className="">
            <div className="">
              <Leaf size={32} strokeWidth={1.5} />
            </div>
            <h4 className="">Sustentabilidade</h4>
            <p className="">
              Circular livros reduz o impacto ambiental e evita o desperdício de
              papel.
            </p>
          </div>

          {/* Economia */}
          <div className="">
            <div className="">
              <Wallet size={32} strokeWidth={1.5} />
            </div>
            <h4 className="">Economia</h4>
            <p className="">
              Encontre títulos incríveis por até 70% menos que o valor de capa.
            </p>
          </div>

          {/* Garantia de Qualidade */}
          <div className="">
            <div className="">
              <ShieldCheck size={32} strokeWidth={1.5} />
            </div>
            <h4 className="">Garantia de Qualidade</h4>
            <p className="">
              Todos os livros são verificados. Garantimos a condição descrita ou
              seu dinheiro de volta.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
