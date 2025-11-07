import { Link } from "react-router-dom";
import { ArrowLeft, MapPin, Calendar, Hammer, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import cantieriHero from "@/assets/cantieri-hero.jpg";

const Cantieri = () => {
  const projects = [
    {
      id: 1,
      title: "Residenza Porta Nuova",
      location: "Milano, Porta Nuova",
      startDate: "Gennaio 2024",
      completionDate: "Dicembre 2025",
      status: "In corso",
      description: "Complesso residenziale di lusso con 45 appartamenti, spazi comuni e verde privato.",
      units: 45,
      progress: 65
    },
    {
      id: 2,
      title: "Villa Moderna Como",
      location: "Como",
      startDate: "Marzo 2024",
      completionDate: "Giugno 2025",
      status: "In corso",
      description: "Ville singole di design con piscina e giardino privato.",
      units: 8,
      progress: 40
    },
    {
      id: 3,
      title: "Torre Horizonte",
      location: "Milano Centro",
      startDate: "Settembre 2023",
      completionDate: "Marzo 2025",
      status: "Fase finale",
      description: "Grattacielo residenziale con vista panoramica sulla città.",
      units: 120,
      progress: 85
    }
  ];

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
            {projects.map((project) => (
              <Card key={project.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                      <div className="flex items-center text-muted-foreground mb-2">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span>{project.location}</span>
                      </div>
                    </div>
                    <Badge variant={project.progress > 80 ? "default" : "secondary"}>
                      {project.status}
                    </Badge>
                  </div>

                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="space-y-4 mb-6">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Progresso</span>
                      <span className="font-semibold">{project.progress}%</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div 
                        className="bg-accent h-2 rounded-full transition-all duration-500"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-accent" />
                      <div>
                        <p className="text-xs text-muted-foreground">Inizio</p>
                        <p className="font-semibold text-sm">{project.startDate}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-accent" />
                      <div>
                        <p className="text-xs text-muted-foreground">Fine prevista</p>
                        <p className="font-semibold text-sm">{project.completionDate}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mt-4 pt-4 border-t">
                    <Hammer className="w-4 h-4 text-accent" />
                    <span className="text-sm">
                      <span className="font-semibold">{project.units}</span> unità immobiliari
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
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
