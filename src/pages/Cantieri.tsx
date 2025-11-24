import { Link } from "react-router-dom";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import cantieriHero from "@/assets/cantieri-hero.jpg";

const Cantieri = () => {

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={cantieriHero} 
            alt="Cantieri in corso" 
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
              I Nostri Cantieri
            </h1>
            <p className="text-xl text-primary-foreground/90 leading-relaxed">
              Seguiamo ogni progetto con dedizione, dalla prima pietra alla consegna delle chiavi. 
              Scopri i nostri cantieri attivi e i prossimi sviluppi immobiliari.
            </p>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Progetti in Corso</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Qualità costruttiva, innovazione tecnologica e rispetto dei tempi di consegna
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <Card className="hover:shadow-lg transition-shadow overflow-hidden group cursor-pointer">
              <a 
                href="https://live-future-homes.lovable.app/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block"
              >
                <div className="relative aspect-video overflow-hidden bg-muted">
                  <img 
                    src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=90" 
                    alt="Borgo San Nicola"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <Badge className="absolute top-4 right-4 bg-accent">In corso</Badge>
                </div>
                <CardContent className="p-8">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold mb-2 group-hover:text-accent transition-colors">
                        Borgo San Nicola
                      </h3>
                      <p className="text-muted-foreground">
                        Complesso residenziale moderno con soluzioni abitative innovative
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-accent mt-4">
                    <span className="font-semibold">Scopri il progetto</span>
                    <ExternalLink className="w-4 h-4" />
                  </div>
                </CardContent>
              </a>
            </Card>
          </div>

          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-6">
              Interessato a uno dei nostri progetti in costruzione?
            </p>
            <Button asChild size="lg" className="bg-gradient-to-r from-accent to-accent/90">
              <Link to="/contatti">Richiedi Informazioni</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Cantieri;
