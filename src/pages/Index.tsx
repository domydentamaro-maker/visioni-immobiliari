import { useEffect, useState } from "react";
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
import { supabase } from "@/integrations/supabase/client";
import heroImage from "@/assets/hero-home.jpg";
import cantieriHero from "@/assets/cantieri-hero.jpg";
import investimentiHero from "@/assets/investimenti-hero.jpg";

interface Property {
  id: number;
  title: string;
  price: number;
  surface_area: number;
  rooms: number;
  floor: string;
  description: string;
  images?: { image_url: string }[];
  external_url?: string;
  image_url?: string;
}

const Index = () => {
  const [featuredProperties, setFeaturedProperties] = useState<Property[]>([]);

  useEffect(() => {
    // Track page view
    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'pageview',
        page: '/'
      });
    }
    
    // Load properties from database
    loadFeaturedProperties();
  }, []);

  const loadFeaturedProperties = async () => {
    // Load regular properties
    const { data: propertiesData, error: propertiesError } = await supabase
      .from('properties')
      .select(`
        id,
        title,
        price,
        surface_area,
        rooms,
        floor,
        description,
        images:property_images(image_url)
      `)
      .eq('status', 'active')
      .order('created_at', { ascending: false })
      .limit(2);

    // Load external constructions
    const { data: externalData, error: externalError } = await supabase
      .from('external_constructions')
      .select('id, title, description, external_url, image_url')
      .eq('status', 'active')
      .order('created_at', { ascending: false })
      .limit(1);

    const allProperties = [];

    if (!propertiesError && propertiesData) {
      allProperties.push(...propertiesData);
    }

    if (!externalError && externalData) {
      // Add external constructions with default values
      allProperties.push(...externalData.map(ext => ({
        ...ext,
        price: 0,
        surface_area: 0,
        rooms: 0,
        floor: '',
        images: ext.image_url ? [{ image_url: ext.image_url }] : []
      })));
    }

    setFeaturedProperties(allProperties.slice(0, 3));
  };
  const testimonials = [{
    name: "Marco Rossi",
    text: "Professionalità e competenza eccezionali. Hanno trovato la casa perfetta per la mia famiglia in tempi record.",
    rating: 5
  }, {
    name: "Laura Bianchi",
    text: "Servizio impeccabile dall'inizio alla fine. Consiglio 2D Sviluppo a chiunque cerchi un'agenzia seria e affidabile.",
    rating: 5
  }, {
    name: "Giuseppe Ferrari",
    text: "Esperienza fantastica! Il team è stato sempre disponibile e attento alle nostre esigenze.",
    rating: 5
  }];
  return <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Luxury villa" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-transparent" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl mx-auto text-center text-primary-foreground animate-fade-in mt-24 md:mt-0">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Visioni Immobiliari
            </h1>
            <p className="text-xl mb-6 opacity-90 md:text-xl">
              Esperienza, professionalità e passione al servizio del tuo futuro
            </p>
            
            {/* CTA */}
            <div className="mb-8">
              <p className="text-lg mb-4 opacity-95 font-medium">
                Trova l'immobile perfetto per te in pochi click
              </p>
            </div>
            
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

      {/* Cantieri & Investimenti Section */}
      <section className="py-20 bg-gradient-subtle">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Cantieri Card */}
            <Link to="/cantieri" className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300">
              <div className="relative h-[400px]">
                <img 
                  src={cantieriHero} 
                  alt="Cantieri in corso" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/50 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8 text-primary-foreground">
                  <h3 className="text-3xl font-bold mb-3">Cantieri</h3>
                  <p className="text-lg opacity-90 mb-4">
                    Scopri i nostri progetti in costruzione e le prossime realizzazioni
                  </p>
                  <div className="flex items-center gap-2 text-sm font-semibold">
                    <span>Esplora i Cantieri</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>

            {/* Investimenti Card */}
            <Link to="/investimenti" className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300">
              <div className="relative h-[400px]">
                <img 
                  src={investimentiHero} 
                  alt="Investimenti immobiliari" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/50 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8 text-primary-foreground">
                  <h3 className="text-3xl font-bold mb-3">Investimenti</h3>
                  <p className="text-lg opacity-90 mb-4">
                    Opportunità di investimento sicure e redditizie nel settore immobiliare
                  </p>
                  <div className="flex items-center gap-2 text-sm font-semibold">
                    <span>Scopri le Opportunità</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
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
            {featuredProperties.map(property => {
              // Check if it's an external construction
              if (property.external_url) {
                return (
                  <a 
                    key={property.id}
                    href={property.external_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block"
                  >
                    <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
                      <div className="relative aspect-video overflow-hidden">
                        <img 
                          src={property.images?.[0]?.image_url || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80'} 
                          alt={property.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-4 right-4 bg-accent text-white px-3 py-1 rounded-full text-sm font-semibold">
                          Cantiere
                        </div>
                      </div>
                      <CardContent className="p-6">
                        <h3 className="text-xl font-bold mb-2 group-hover:text-accent transition-colors">
                          {property.title}
                        </h3>
                        <p className="text-muted-foreground line-clamp-2 mb-4">
                          {property.description}
                        </p>
                        <div className="flex items-center text-accent font-semibold">
                          <span>Visita il sito</span>
                          <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-2 transition-transform" />
                        </div>
                      </CardContent>
                    </Card>
                  </a>
                );
              }
              
              // Regular property
              return (
                <PropertyCard 
                  key={property.id} 
                  id={property.id}
                  title={property.title}
                  price={`€${property.price.toLocaleString()}`}
                  location={property.floor}
                  beds={property.rooms}
                  baths={2}
                  area={property.surface_area}
                  image={property.images?.[0]?.image_url || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80'}
                  type="Vendita"
                />
              );
            })}
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
            {testimonials.map((testimonial, index) => <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <Quote className="w-10 h-10 text-accent mb-4" />
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => <Star key={i} className="w-4 h-4 fill-accent text-accent" />)}
                  </div>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    "{testimonial.text}"
                  </p>
                  <p className="font-semibold">{testimonial.name}</p>
                </CardContent>
              </Card>)}
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
    </div>;
};
export default Index;