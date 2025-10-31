import { Link } from "react-router-dom";
import { Home as HomeIcon, Mail, Phone, MapPin, Facebook, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground relative">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <HomeIcon className="w-8 h-8 text-accent" />
              <div>
                <h3 className="text-xl font-bold">2D Sviluppo Immobiliare</h3>
              </div>
            </div>
            <p className="text-sm opacity-80 leading-relaxed">
              La tua agenzia di fiducia per trovare la casa dei tuoi sogni.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4">Menu</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm opacity-80 hover:opacity-100 hover:text-accent transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/proprieta" className="text-sm opacity-80 hover:opacity-100 hover:text-accent transition-colors">
                  Immobili
                </Link>
              </li>
              <li>
                <Link to="/servizi" className="text-sm opacity-80 hover:opacity-100 hover:text-accent transition-colors">
                  Servizi
                </Link>
              </li>
              <li>
                <Link to="/contatti" className="text-sm opacity-80 hover:opacity-100 hover:text-accent transition-colors">
                  Contatti
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4">Servizi</h4>
            <ul className="space-y-2 text-sm opacity-80">
              <li>Vendita immobili</li>
              <li>Affitto immobili</li>
              <li>Valutazione gratuita</li>
              <li>Consulenza immobiliare</li>
              <li>Gestione contratti</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contatti</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm opacity-80">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                <span>Via Roma 123, 20121 Milano, Italia</span>
              </li>
              <li className="flex items-center gap-2 text-sm opacity-80">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <a href="tel:+390212345678" className="hover:text-accent transition-colors">
                  +39 02 1234 5678
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm opacity-80">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <a href="mailto:info@2dsviluppo.it" className="hover:text-accent transition-colors">
                  info@2dsviluppo.it
                </a>
              </li>
            </ul>
            <div className="flex gap-3 mt-4">
              <a href="#" className="w-9 h-9 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-accent hover:scale-110 transition-all">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-accent hover:scale-110 transition-all">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-accent hover:scale-110 transition-all">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm opacity-80">
          <p>&copy; 2025 2D Sviluppo Immobiliare. Tutti i diritti riservati.</p>
          <div className="flex gap-4">
            <Link to="#" className="hover:text-accent transition-colors">Privacy Policy</Link>
            <Link to="#" className="hover:text-accent transition-colors">Cookie Policy</Link>
            <Link to="#" className="hover:text-accent transition-colors">Note Legali</Link>
          </div>
        </div>
      </div>
      
      {/* Watermark logo bottom right */}
      <div className="absolute bottom-4 right-4 text-xs opacity-10 select-none font-semibold">
        2D Sviluppo
      </div>
    </footer>
  );
};

export default Footer;
