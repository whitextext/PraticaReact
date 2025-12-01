export function BookDetails() {
  return (
    <div id="book-modal" className="">
      <div className="">
        <button className="">
          <i className=""></i>
        </button>

        <div className="">
          {/* Imagem no Modal */}
          <div className="">
            <img id="modal-img" src="" alt="Capa do Livro" className="" />
          </div>

          {/* Informações no Modal */}
          <div className="">
            <span id="modal-tag" className="">
              Venda
            </span>
            <h2 id="modal-title" className="">
              Título do Livro
            </h2>
            <p id="modal-author" className="">
              Autor do Livro
            </p>

            <div className="">
              <span className="">Condição:</span>
              <div className="" id="modal-rating">
                {/* Estrelas inseridas via JS*/}
              </div>
              <span id="modal-condition" className="">
                Seminovo
              </span>
            </div>

            <p id="modal-desc" className="">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>

            <div className="">
              <span id="modal-price" className="">
                R$ 00,00
              </span>
              <button className="">
                <i className=""></i> Adicionar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
