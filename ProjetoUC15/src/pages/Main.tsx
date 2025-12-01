import { Banner } from "@/components/Banner";
import { InformativeSection } from "@/components/InformativeSection";
import { BookDetails } from "@/components/BookDetails";

export function Main() {
  return (
    <main id="catalog" className="">
      <Banner />
      <div className="">
        <h3 className="">Acervo Disponível</h3>

        <div className="">
          <button className="">Todos</button>
          <button className="">Comprar</button>
          <button className="">Trocar</button>
        </div>
      </div>

      {/*Grid de Livros*/}
      <div id="book-grid" className="">
        {/*Os livros serão inseridos aqui via typescript*/}
      </div>

      {/* Mensagem de Nenhum Resultado*/}
      <div id="no-results" className=" ">
        <i className=""></i>
        <p className="">Nenhum livro encontrado com esses critérios.</p>
      </div>
      <InformativeSection />
      <BookDetails />
    </main>
  );
}
