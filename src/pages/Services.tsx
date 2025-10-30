import { Home, Key, FileText, TrendingUp, Shield, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import servicesHero from "@/assets/services-hero.jpg";

const Services = () => {
  const services = [
    {
      icon: Home,
      title: "Vendita Immobili",
      description: "Assistenza completa nella vendita del tuo immobile, dalla valutazione alla chiusura del contratto. Massima visibilità e marketing professionale per raggiungere i migliori acquirenti."
    },
    {
      icon: Key,
      title: "Affitto e Locazione",
      description: "Gestione completa di affitti e locazioni, con selezione accurata degli inquilini, gestione contrattuale e assistenza continua per proprietari e locatari."
    },
    {
      icon: TrendingUp,
      title: "Valutazione Immobiliare",
      description: "Valutazione professionale del tuo immobile basata su analisi di mercato approfondite. Ricevi una stima accurata e gratuita entro 24 ore."
    },
    {
      icon: FileText,
      title: "Consulenza Legale",
      description: "Supporto legale completo per tutte le fasi della transazione immobiliare. Verifica documenti, pratiche catastali e assistenza notarile."
    },
    {
      icon: Shield,
      title: "Gestione Patrimoni",
      description: "Servizi di property management per la gestione ottimale del tuo patrimonio immobiliare. Manutenzione, amministrazione e valorizzazione degli investimenti."
    },
    {
      icon: Users,
      title: "Consulenza Personalizzata",
      description: "Assistenza dedicata per trovare l'immobile perfetto in base alle tue esigenze. Analisi delle opportunità di investimento e supporto nelle scelte strategiche."
    }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={servicesHero}
            alt="Services"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/85 to-primary/70" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl text-primary-foreground">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">I Nostri Servizi</h1>
            <p className="text-xl md:text-2xl opacity-90 leading-relaxed">
              Soluzioni complete per ogni tua esigenza immobiliare. 
              Dalla ricerca alla vendita, dall'affitto alla gestione patrimoniale.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-8">
                  <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent group-hover:scale-110 transition-all">
                    <service.icon className="w-8 h-8 text-accent group-hover:text-accent-foreground" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* For Owners Section */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">Per i Proprietari</h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Affidaci il tuo immobile e scopri i vantaggi di lavorare con professionisti esperti 
                del settore immobiliare.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  "Valutazione gratuita e accurata del tuo immobile",
                  "Marketing professionale con foto e video di qualità",
                  "Massima visibilità su tutti i principali portali",
                  "Gestione completa delle visite e delle trattative",
                  "Assistenza legale e notarile inclusa",
                  "Pagamento garantito e sicuro"
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-accent" />
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Button asChild size="lg" className="bg-gradient-to-r from-accent to-accent/90">
                <Link to="/contatti">Valuta il tuo Immobile</Link>
              </Button>
            </div>
            
            <Card className="bg-gradient-to-br from-accent/5 to-accent/10 border-accent/20">
              <CardContent className="p-8 md:p-12">
                <h3 className="text-2xl font-bold mb-6">Perché Sceglierci</h3>
                <div className="space-y-6">
                  <div>
                    <div className="text-4xl font-bold text-accent mb-2">25+</div>
                    <p className="text-muted-foreground">Anni di esperienza nel settore</p>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-accent mb-2">98%</div>
                    <p className="text-muted-foreground">Clienti soddisfatti</p>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-accent mb-2">45 gg</div>
                    <p className="text-muted-foreground">Tempo medio di vendita</p>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-accent mb-2">100%</div>
                    <p className="text-muted-foreground">Trasparenza e professionalità</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* For Buyers Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20 lg:order-1">
              <CardContent className="p-8 md:p-12">
                <h3 className="text-2xl font-bold mb-6">Il Nostro Metodo</h3>
                <div className="space-y-6">
                  {[
                    {
                      step: "01",
                      title: "Ascolto delle Esigenze",
                      description: "Comprendiamo le tue necessità e preferenze"
                    },
                    {
                      step: "02",
                      title: "Ricerca Mirata",
                      description: "Selezioniamo gli immobili più adatti a te"
                    },
                    {
                      step: "03",
                      title: "Visite Organizzate",
                      description: "Ti accompagniamo nelle visite agli immobili"
                    },
                    {
                      step: "04",
                      title: "Chiusura Sicura",
                      description: "Assistenza completa fino al rogito"
                    }
                  ].map((item, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="text-3xl font-bold text-accent opacity-30">{item.step}</div>
                      <div>
                        <h4 className="font-semibold mb-1">{item.title}</h4>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <div className="lg:order-2">
              <h2 className="text-4xl font-bold mb-6">Per gli Acquirenti</h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Cerchi casa? Ti aiutiamo a trovare l'immobile perfetto per te e la tua famiglia, 
                con un servizio personalizzato e attento ad ogni dettaglio.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  "Consulenza gratuita e senza impegno",
                  "Accesso esclusivo a immobili non in vetrina",
                  "Supporto nella scelta e nella valutazione",
                  "Assistenza per mutui e finanziamenti",
                  "Verifica documentale completa",
                  "Accompagnamento fino al rogito notarile"
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Button asChild size="lg" variant="outline" className="hover:bg-primary hover:text-primary-foreground">
                <Link to="/proprieta">Esplora gli Immobili</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary/90 text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Hai Bisogno di Aiuto?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Il nostro team è a tua disposizione per rispondere a tutte le tue domande 
            e guidarti nella scelta migliore.
          </p>
          <Button asChild size="lg" variant="secondary" className="hover:scale-105 transition-transform">
            <Link to="/contatti">Contattaci Ora</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;
