import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { MapPin, Bed, Bath, Square, ArrowLeft, Share2, Heart, Phone, Mail, Home, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import property1 from "@/assets/property-1.jpg";
import interior1 from "@/assets/property-interior-1.jpg";
import interior2 from "@/assets/property-interior-2.jpg";
import interior3 from "@/assets/property-interior-3.jpg";
import interior4 from "@/assets/property-interior-4.jpg";

const PropertyDetail = () => {
  const { id } = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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
    images: [property1, interior1, interior2, interior3, interior4],
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

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % property.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length);
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
          <div className="relative rounded-xl overflow-hidden group">
            <img
              src={property.images[currentImageIndex]}
              alt={`${property.title} - Foto ${currentImageIndex + 1}`}
              className="w-full h-[500px] object-cover transition-opacity duration-300"
            />
            
            {/* Navigation Buttons */}
            <Button
              size="icon"
              variant="secondary"
              className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={prevImage}
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button
              size="icon"
              variant="secondary"
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={nextImage}
            >
              <ChevronRight className="w-5 h-5" />
            </Button>

            {/* Image Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-background/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">
              {currentImageIndex + 1} / {property.images.length}
            </div>

            <div className="absolute top-4 left-4 flex gap-2">
              <Badge className="bg-accent text-accent-foreground text-base px-4 py-2">
                {property.type}
              </Badge>
              <Badge className="bg-primary text-primary-foreground text-base px-4 py-2">
                Classe {property.energyClass}
              </Badge>
            </div>
            <div className="absolute top-4 right-4 flex gap-2">
              <Button size="icon" variant="secondary" className="rounded-full hover:scale-110 transition-transform">
                <Heart className="w-5 h-5" />
              </Button>
              <Button size="icon" variant="secondary" className="rounded-full hover:scale-110 transition-transform">
                <Share2 className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Thumbnail Gallery */}
          <div className="grid grid-cols-5 gap-2 mt-4">
            {property.images.map((img, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`relative h-20 rounded-lg overflow-hidden transition-all ${
                  currentImageIndex === index 
                    ? "ring-2 ring-accent scale-105" 
                    : "opacity-70 hover:opacity-100"
                }`}
              >
                <img
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
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
                  <h3 className="text-xl font-bold mb-2">Richiedi Informazioni</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Compila il form o contattaci direttamente
                  </p>
                  
                  <div className="space-y-3 mb-6">
                    <Button className="w-full bg-gradient-to-r from-accent to-accent/90 hover:shadow-lg transition-shadow" size="lg">
                      <Phone className="w-4 h-4 mr-2" />
                      Chiama Ora
                    </Button>
                    
                    <Button variant="outline" className="w-full hover:bg-accent/10" size="lg">
                      <Mail className="w-4 h-4 mr-2" />
                      Invia Email
                    </Button>
                  </div>

                  <Separator className="my-6" />

                  <form className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Nome e Cognome</label>
                      <input
                        type="text"
                        placeholder="Mario Rossi"
                        className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Email</label>
                      <input
                        type="email"
                        placeholder="mario@esempio.it"
                        className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Telefono</label>
                      <input
                        type="tel"
                        placeholder="+39 333 123 4567"
                        className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Messaggio</label>
                      <textarea
                        placeholder="Mi interesserebbe ricevere maggiori informazioni su questo immobile..."
                        rows={4}
                        className="w-full px-4 py-3 rounded-lg border border-input bg-background resize-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full bg-primary hover:bg-primary/90 transition-colors">
                      Invia Richiesta
                    </Button>
                  </form>

                  <p className="text-xs text-muted-foreground text-center mt-4">
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
