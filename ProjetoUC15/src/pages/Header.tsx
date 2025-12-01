import { BookOpen, Search, User, ShoppingBag } from "lucide-react";

export function Header() {
  return (
    <header className="">
      <div className="">
        <div className="">
          {/* Logo */}
          <div className="">
            <div className="">
              <BookOpen className="" size={24} />
            </div>
            <div>
              <h1 className="">Livraria Circular</h1>
              <p className="">TROCA & VENDA</p>
            </div>
          </div>

          {/* Search Bar - Hidden on mobile, visible on md+ */}
          <div className="">
            <input
              type="text"
              id="searchInput"
              placeholder="Busque por título ou autor..."
              className=""
            />
            <Search className="" size={18} />
          </div>

          {/* Actions */}
          <div className="">
            <button className="">
              <User size={20} />
              <span className="">Entrar</span>
            </button>

            <button className="">
              <ShoppingBag size={22} />
              <span id="cart-count" className="">
                0
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
