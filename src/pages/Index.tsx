import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, Home, Award, Users, ArrowRight, Star, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PropertyCard from "@/components/PropertyCard";
import PropertyMap from "@/components/PropertyMap";
import heroImage from "@/assets/hero-home.jpg";
import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";
import property3 from "@/assets/property-3.jpg";

const Index = () => {
  useEffect(() => {
    // Track page view
    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'pageview',
        page: '/',
      });
    }
  }, []);

  const featuredProperties = [
    {
      id: 1,
      title: "Appartamento Moderno Centro Città",
      price: "€450.000",
      location: "Milano Centro",
      beds: 3,
      baths: 2,
      area: 120,
      image: property1,
      type: "Vendita"
    },
    {
      id: 2,
      title: "Villa Contemporanea con Piscina",
      price: "€1.200.000",
      location: "Como",
      beds: 5,
      baths: 4,
      area: 350,
      image: property2,
      type: "Vendita"
    },
    {
      id: 3,
      title: "Attico con Terrazza Panoramica",
      price: "€2.800/mese",
      location: "Milano, Porta Nuova",
      beds: 2,
      baths: 2,
      area: 95,
      image: property3,
      type: "Affitto"
    }
  ];

  const testimonials = [
    {
      name: "Marco Rossi",
      text: "Professionalità e competenza eccezionali. Hanno trovato la casa perfetta per la mia famiglia in tempi record.",
      rating: 5
    },
    {
      name: "Laura Bianchi",
      text: "Servizio impeccabile dall'inizio alla fine. Consiglio 2D Sviluppo a chiunque cerchi un'agenzia seria e affidabile.",
      rating: 5
    },
    {
      name: "Giuseppe Ferrari",
      text: "Esperienza fantastica! Il team è stato sempre disponibile e attento alle nostre esigenze.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Luxury villa"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-transparent" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl mx-auto text-center text-primary-foreground animate-fade-in">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Visioni Immobiliari
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Esperienza, professionalità e passione al servizio del tuo futuro
            </p>
            
            {/* Quick Search */}
            <Card className="bg-background/95 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Tipologia" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="appartamento">Appartamento</SelectItem>
                      <SelectItem value="villa">Villa</SelectItem>
                      <SelectItem value="attico">Attico</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Input placeholder="Zona / Città" />
                  
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Prezzo max" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="300000">€300.000</SelectItem>
                      <SelectItem value="500000">€500.000</SelectItem>
                      <SelectItem value="1000000">€1.000.000</SelectItem>
                      <SelectItem value="2000000">€2.000.000+</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Button asChild className="w-full bg-gradient-to-r from-accent to-accent/90 hover:shadow-lg">
                    <Link to="/proprieta">
                      <Search className="w-4 h-4 mr-2" />
                      Cerca
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Immobili in Evidenza</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Scopri una selezione delle nostre migliori proposte immobiliari
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredProperties.map((property) => (
              <PropertyCard key={property.id} {...property} />
            ))}
          </div>
          
          <div className="text-center">
            <Button asChild size="lg" variant="outline" className="hover:bg-accent hover:text-accent-foreground hover:border-accent">
              <Link to="/proprieta">
                Vedi Tutti gli Immobili
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 px-4 bg-gradient-subtle">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-display font-bold mb-4">Esplora gli Immobili sulla Mappa</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Trova la tua casa ideale visualizzando tutti i nostri immobili sulla mappa interattiva
            </p>
          </div>
          <PropertyMap />
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">Chi Siamo</h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                2D Sviluppo Immobiliare è un'agenzia immobiliare con esperienza nel mercato italiano. 
                La nostra missione è aiutare le persone a trovare la casa perfetta, offrendo un servizio 
                personalizzato e professionale in ogni fase della transazione.
              </p>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Il nostro team di esperti è specializzato nella compravendita e nell'affitto di immobili 
                residenziali e commerciali, garantendo sempre la massima trasparenza e affidabilità.
              </p>
              <Button asChild size="lg" className="bg-gradient-to-r from-accent to-accent/90">
                <Link to="/servizi">Scopri i Nostri Servizi</Link>
              </Button>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <Award className="w-12 h-12 text-accent mx-auto mb-4" />
                  <h3 className="text-3xl font-bold mb-2">25+</h3>
                  <p className="text-muted-foreground">Anni di Esperienza</p>
                </CardContent>
              </Card>
              
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <Home className="w-12 h-12 text-accent mx-auto mb-4" />
                  <h3 className="text-3xl font-bold mb-2">5000+</h3>
                  <p className="text-muted-foreground">Immobili Venduti</p>
                </CardContent>
              </Card>
              
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <Users className="w-12 h-12 text-accent mx-auto mb-4" />
                  <h3 className="text-3xl font-bold mb-2">3500+</h3>
                  <p className="text-muted-foreground">Clienti Soddisfatti</p>
                </CardContent>
              </Card>
              
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <Star className="w-12 h-12 text-accent mx-auto mb-4" />
                  <h3 className="text-3xl font-bold mb-2">4.9/5</h3>
                  <p className="text-muted-foreground">Rating Medio</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Cosa Dicono di Noi</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              La soddisfazione dei nostri clienti è la nostra priorità
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <Quote className="w-10 h-10 text-accent mb-4" />
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    "{testimonial.text}"
                  </p>
                  <p className="font-semibold">{testimonial.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary/90 text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Pronto a Trovare la Tua Casa Ideale?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Contattaci oggi per una consulenza gratuita e scopri come possiamo aiutarti
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary" className="hover:scale-105 transition-transform">
              <Link to="/proprieta">Esplora gli Immobili</Link>
            </Button>
            <Button asChild size="lg" variant="secondary" className="hover:scale-105 transition-transform">
              <Link to="/contatti">Contattaci Ora</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
