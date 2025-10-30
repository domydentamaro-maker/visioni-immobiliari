import { useParams, Link } from "react-router-dom";
import { MapPin, Bed, Bath, Square, Calendar, ArrowLeft, Share2, Heart, Phone, Mail, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import property1 from "@/assets/property-1.jpg";

const PropertyDetail = () => {
  const { id } = useParams();

  // Mock data - in a real app, this would be fetched based on the ID
  const property = {
    id: Number(id),
    title: "Appartamento Moderno Centro Città",
    price: "€450.000",
    location: "Milano Centro, Via della Repubblica 45",
    beds: 3,
    baths: 2,
    area: 120,
    type: "Vendita",
    energyClass: "A",
    floor: "3° piano",
    condition: "Ottimo",
    year: 2018,
    image: property1,
    description: `Splendido appartamento completamente ristrutturato nel cuore del centro storico di Milano. 
    L'immobile si presenta in condizioni impeccabili con finiture di alta qualità e materiali ricercati.
    
    La proprietà è composta da un ampio soggiorno con cucina a vista, tre camere da letto, di cui una con bagno en-suite,
    e un ulteriore bagno. Tutti gli ambienti sono luminosi grazie alle ampie finestre che si affacciano sulla piazza principale.
    
    L'appartamento è dotato di riscaldamento autonomo, aria condizionata in tutti i locali, infissi in PVC con doppi vetri,
    e sistema di sicurezza con allarme. Completa la proprietà una cantina di pertinenza.
    
    Posizione strategica a pochi passi da tutti i servizi, mezzi pubblici, negozi e ristoranti.`,
    features: [
      "Riscaldamento autonomo",
      "Aria condizionata",
      "Infissi in PVC",
      "Doppi vetri",
      "Allarme",
      "Cantina",
      "Ascensore",
      "Parcheggio condominiale"
    ]
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="pt-24">
        {/* Back Button */}
        <div className="container mx-auto px-4 py-6">
          <Button asChild variant="ghost" className="hover:bg-accent/10">
            <Link to="/proprieta">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Torna agli immobili
            </Link>
          </Button>
        </div>

        {/* Image Gallery */}
        <div className="container mx-auto px-4 mb-8">
          <div className="relative rounded-xl overflow-hidden">
            <img
              src={property.image}
              alt={property.title}
              className="w-full h-[500px] object-cover"
            />
            <div className="absolute top-4 left-4 flex gap-2">
              <Badge className="bg-accent text-accent-foreground text-base px-4 py-2">
                {property.type}
              </Badge>
              <Badge className="bg-primary text-primary-foreground text-base px-4 py-2">
                Classe {property.energyClass}
              </Badge>
            </div>
            <div className="absolute top-4 right-4 flex gap-2">
              <Button size="icon" variant="secondary" className="rounded-full">
                <Heart className="w-5 h-5" />
              </Button>
              <Button size="icon" variant="secondary" className="rounded-full">
                <Share2 className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Header */}
              <div>
                <h1 className="text-4xl font-bold mb-4">{property.title}</h1>
                <div className="flex items-center gap-2 text-muted-foreground mb-6">
                  <MapPin className="w-5 h-5" />
                  <span className="text-lg">{property.location}</span>
                </div>
                <div className="text-4xl font-bold text-accent">{property.price}</div>
              </div>

              <Separator />

              {/* Key Features */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-6 text-center">
                    <Bed className="w-8 h-8 text-accent mx-auto mb-2" />
                    <p className="text-2xl font-bold">{property.beds}</p>
                    <p className="text-sm text-muted-foreground">Camere</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6 text-center">
                    <Bath className="w-8 h-8 text-accent mx-auto mb-2" />
                    <p className="text-2xl font-bold">{property.baths}</p>
                    <p className="text-sm text-muted-foreground">Bagni</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6 text-center">
                    <Square className="w-8 h-8 text-accent mx-auto mb-2" />
                    <p className="text-2xl font-bold">{property.area}</p>
                    <p className="text-sm text-muted-foreground">m²</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6 text-center">
                    <Home className="w-8 h-8 text-accent mx-auto mb-2" />
                    <p className="text-2xl font-bold">{property.floor}</p>
                    <p className="text-sm text-muted-foreground">Piano</p>
                  </CardContent>
                </Card>
              </div>

              {/* Description */}
              <div>
                <h2 className="text-2xl font-bold mb-4">Descrizione</h2>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                  {property.description}
                </p>
              </div>

              {/* Details */}
              <div>
                <h2 className="text-2xl font-bold mb-4">Caratteristiche</h2>
                <Card>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Stato</p>
                        <p className="font-semibold">{property.condition}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Anno costruzione</p>
                        <p className="font-semibold">{property.year}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Piano</p>
                        <p className="font-semibold">{property.floor}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Classe energetica</p>
                        <p className="font-semibold">Classe {property.energyClass}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Features */}
              <div>
                <h2 className="text-2xl font-bold mb-4">Servizi</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {property.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 p-3 bg-secondary rounded-lg">
                      <div className="w-2 h-2 rounded-full bg-accent" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Map */}
              <div>
                <h2 className="text-2xl font-bold mb-4">Posizione</h2>
                <Card>
                  <CardContent className="p-0">
                    <div className="w-full h-[400px] bg-muted rounded-lg flex items-center justify-center">
                      <div className="text-center text-muted-foreground">
                        <MapPin className="w-12 h-12 mx-auto mb-2" />
                        <p>Mappa interattiva</p>
                        <p className="text-sm">{property.location}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Contact Card */}
              <Card className="sticky top-28">
                <CardContent className="p-6 space-y-4">
                  <h3 className="text-xl font-bold">Richiedi Informazioni</h3>
                  <p className="text-sm text-muted-foreground">
                    Compila il form o contattaci direttamente
                  </p>
                  
                  <div className="space-y-3">
                    <Button className="w-full bg-gradient-to-r from-accent to-accent/90" size="lg">
                      <Phone className="w-4 h-4 mr-2" />
                      Chiama Ora
                    </Button>
                    
                    <Button variant="outline" className="w-full" size="lg">
                      <Mail className="w-4 h-4 mr-2" />
                      Invia Email
                    </Button>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="Nome e Cognome"
                      className="w-full px-4 py-2 rounded-lg border border-input bg-background"
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      className="w-full px-4 py-2 rounded-lg border border-input bg-background"
                    />
                    <input
                      type="tel"
                      placeholder="Telefono"
                      className="w-full px-4 py-2 rounded-lg border border-input bg-background"
                    />
                    <textarea
                      placeholder="Messaggio"
                      rows={4}
                      className="w-full px-4 py-2 rounded-lg border border-input bg-background resize-none"
                    />
                    <Button className="w-full bg-primary">
                      Invia Richiesta
                    </Button>
                  </div>

                  <p className="text-xs text-muted-foreground text-center">
                    Cliccando su "Invia" accetti la nostra Privacy Policy
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PropertyDetail;
