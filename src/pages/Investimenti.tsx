import { Link } from "react-router-dom";
import { ArrowLeft, TrendingUp, Shield, PiggyBank, BarChart3, Home, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import investimentiHero from "@/assets/investimenti-hero.jpg";

const Investimenti = () => {
  const benefits = [
    {
      icon: TrendingUp,
      title: "Rendimenti Competitivi",
      description: "Investimenti immobiliari con rendimenti medi del 4-6% annuo"
    },
    {
      icon: Shield,
      title: "Sicurezza",
      description: "Asset tangibili e protezione del capitale nel lungo periodo"
    },
    {
      icon: PiggyBank,
      title: "Diversificazione",
      description: "Opportunità di diversificare il portafoglio investimenti"
    },
    {
      icon: BarChart3,
      title: "Crescita del Valore",
      description: "Apprezzamento del capitale nel mercato immobiliare italiano"
    }
  ];

  const opportunities = [
    {
      title: "Buy to Let",
      description: "Acquisto di immobili da mettere a reddito con contratti di locazione a lungo termine",
      roi: "4-5% annuo",
      minInvestment: "€150.000"
    },
    {
      title: "Riqualificazione",
      description: "Progetti di ristrutturazione e valorizzazione di immobili da rivendere",
      roi: "15-25% sul capitale",
      minInvestment: "€200.000"
    },
    {
      title: "Immobili Commerciali",
      description: "Investimenti in negozi, uffici e spazi commerciali con contratti business",
      roi: "5-7% annuo",
      minInvestment: "€300.000"
    }
  ];

  const whyChooseUs = [
    "Analisi di mercato approfondite e report dettagliati",
    "Selezione accurata delle migliori opportunità",
    "Gestione completa dell'investimento",
    "Supporto legale e fiscale specializzato",
    "Network di professionisti del settore",
    "Trasparenza totale in ogni fase"
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={investimentiHero} 
            alt="Investimenti immobiliari" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-transparent" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <Button 
              asChild 
              variant="ghost" 
              className="mb-6 text-primary-foreground hover:bg-primary-foreground/10"
            >
              <Link to="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Torna alla Home
              </Link>
            </Button>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-primary-foreground">
              Investimenti Immobiliari
            </h1>
            <p className="text-xl text-primary-foreground/90 leading-relaxed">
              Costruisci il tuo patrimonio con investimenti immobiliari sicuri e redditizi. 
              Ti guidiamo nella scelta delle migliori opportunità del mercato.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Perché Investire nel Settore Immobiliare</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Il real estate offre vantaggi unici per far crescere il tuo patrimonio
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <benefit.icon className="w-12 h-12 text-accent mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Opportunities Section */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Opportunità di Investimento</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Soluzioni personalizzate per ogni profilo di investitore
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {opportunities.map((opportunity, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <Home className="w-10 h-10 text-accent mb-4" />
                  <h3 className="text-2xl font-bold mb-3">{opportunity.title}</h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {opportunity.description}
                  </p>
                  
                  <div className="space-y-3 pt-6 border-t">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">ROI Previsto</span>
                      <span className="font-bold text-accent">{opportunity.roi}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Investimento Min.</span>
                      <span className="font-bold">{opportunity.minInvestment}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Perché Scegliere 2D Sviluppo</h2>
              <p className="text-lg text-muted-foreground">
                Partner affidabile per i tuoi investimenti immobiliari
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {whyChooseUs.map((reason, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                  <p className="text-lg leading-relaxed">{reason}</p>
                </div>
              ))}
            </div>

            <Card className="bg-gradient-to-r from-primary to-primary/90 text-primary-foreground">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold mb-4">Pronto a Iniziare?</h3>
                <p className="text-lg mb-6 opacity-90">
                  Contattaci per una consulenza gratuita e scopri le migliori opportunità di investimento
                </p>
                <Button asChild size="lg" variant="secondary" className="hover:scale-105 transition-transform">
                  <Link to="/contatti">Richiedi Consulenza</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Investimenti;
