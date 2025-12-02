import { Facebook, Instagram, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="">
      <div className="">
        <div className="">
          <div className="">
            <span className="">Livraria Circular</span>
            <p className="">
              &copy; {new Date().getFullYear()} Todos os direitos reservados.
            </p>
          </div>

          <div className="">
            <a href="#" className="">
              <Facebook size={24} />
            </a>
            <a href="#" className="">
              <Instagram size={24} />
            </a>
            <a href="#" className="">
              <Twitter size={24} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
