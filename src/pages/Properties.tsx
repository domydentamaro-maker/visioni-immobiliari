import { useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PropertyCard from "@/components/PropertyCard";
import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";
import property3 from "@/assets/property-3.jpg";

const Properties = () => {
  const [showFilters, setShowFilters] = useState(false);

  const properties = [
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
    },
    {
      id: 4,
      title: "Loft Industriale Ristrutturato",
      price: "€380.000",
      location: "Milano, Navigli",
      beds: 2,
      baths: 1,
      area: 85,
      image: property1,
      type: "Vendita"
    },
    {
      id: 5,
      title: "Casa Singola con Giardino",
      price: "€650.000",
      location: "Monza",
      beds: 4,
      baths: 3,
      area: 200,
      image: property2,
      type: "Vendita"
    },
    {
      id: 6,
      title: "Bilocale Vista Lago",
      price: "€1.800/mese",
      location: "Como",
      beds: 1,
      baths: 1,
      area: 65,
      image: property3,
      type: "Affitto"
    }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Page Header */}
      <section className="pt-32 pb-12 bg-gradient-to-br from-primary to-primary/90 text-primary-foreground">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold mb-4">I Nostri Immobili</h1>
          <p className="text-xl opacity-90">Trova la proprietà perfetta per te</p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-secondary border-b border-border sticky top-20 z-40">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4">
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Tipo contratto" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="vendita">Vendita</SelectItem>
                  <SelectItem value="affitto">Affitto</SelectItem>
                </SelectContent>
              </Select>
              
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Tipologia" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="appartamento">Appartamento</SelectItem>
                  <SelectItem value="villa">Villa</SelectItem>
                  <SelectItem value="attico">Attico</SelectItem>
                  <SelectItem value="loft">Loft</SelectItem>
                </SelectContent>
              </Select>
              
              <Input placeholder="Zona / Città" className="bg-background" />
              
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
            </div>
            
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={() => setShowFilters(!showFilters)}
                className="flex-1 lg:flex-none"
              >
                <SlidersHorizontal className="w-4 h-4 mr-2" />
                Più Filtri
              </Button>
              <Button className="flex-1 lg:flex-none bg-gradient-to-r from-accent to-accent/90">
                <Search className="w-4 h-4 mr-2" />
                Cerca
              </Button>
            </div>
          </div>
          
          {showFilters && (
            <Card className="mt-4 animate-fade-in">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Camere da letto" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1+</SelectItem>
                      <SelectItem value="2">2+</SelectItem>
                      <SelectItem value="3">3+</SelectItem>
                      <SelectItem value="4">4+</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Bagni" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1+</SelectItem>
                      <SelectItem value="2">2+</SelectItem>
                      <SelectItem value="3">3+</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Superficie min (m²)" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="50">50+</SelectItem>
                      <SelectItem value="80">80+</SelectItem>
                      <SelectItem value="100">100+</SelectItem>
                      <SelectItem value="150">150+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      {/* Results */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <p className="text-muted-foreground">
              Trovati <span className="font-semibold text-foreground">{properties.length} immobili</span>
            </p>
            <Select defaultValue="recent">
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Più recenti</SelectItem>
                <SelectItem value="price-asc">Prezzo crescente</SelectItem>
                <SelectItem value="price-desc">Prezzo decrescente</SelectItem>
                <SelectItem value="area-desc">Superficie maggiore</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property) => (
              <PropertyCard key={property.id} {...property} />
            ))}
          </div>
          
          {/* Pagination */}
          <div className="flex justify-center mt-12">
            <div className="flex gap-2">
              <Button variant="outline" disabled>Precedente</Button>
              <Button variant="default" className="bg-accent">1</Button>
              <Button variant="outline">2</Button>
              <Button variant="outline">3</Button>
              <Button variant="outline">Successivo</Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Properties;
