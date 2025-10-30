import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Contact = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-12 bg-gradient-to-br from-primary to-primary/90 text-primary-foreground">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold mb-4">Contattaci</h1>
          <p className="text-xl opacity-90">Siamo qui per aiutarti. Scrivici o vieni a trovarci</p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Info Cards */}
            <div className="space-y-6">
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                    <Phone className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="font-semibold mb-2">Telefono</h3>
                  <p className="text-muted-foreground text-sm mb-3">
                    Chiamaci per informazioni immediate
                  </p>
                  <a href="tel:+390212345678" className="text-accent hover:underline font-medium">
                    +39 02 1234 5678
                  </a>
                  <br />
                  <a href="tel:+393331234567" className="text-accent hover:underline font-medium">
                    +39 333 123 4567
                  </a>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                    <Mail className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="font-semibold mb-2">Email</h3>
                  <p className="text-muted-foreground text-sm mb-3">
                    Scrivici per qualsiasi richiesta
                  </p>
                  <a href="mailto:info@casabella.it" className="text-accent hover:underline font-medium">
                    info@casabella.it
                  </a>
                  <br />
                  <a href="mailto:vendite@casabella.it" className="text-accent hover:underline font-medium">
                    vendite@casabella.it
                  </a>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                    <MapPin className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="font-semibold mb-2">Indirizzo</h3>
                  <p className="text-muted-foreground text-sm mb-3">
                    Vieni a trovarci in ufficio
                  </p>
                  <p className="font-medium">
                    Via Roma 123<br />
                    20121 Milano, Italia
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                    <Clock className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="font-semibold mb-2">Orari</h3>
                  <p className="text-muted-foreground text-sm mb-3">
                    Siamo aperti nei seguenti orari
                  </p>
                  <div className="space-y-1 text-sm">
                    <p><span className="font-medium">Lun - Ven:</span> 9:00 - 19:00</p>
                    <p><span className="font-medium">Sabato:</span> 9:00 - 13:00</p>
                    <p><span className="font-medium">Domenica:</span> Chiuso</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="shadow-lg">
                <CardContent className="p-8">
                  <h2 className="text-3xl font-bold mb-2">Inviaci un Messaggio</h2>
                  <p className="text-muted-foreground mb-8">
                    Compila il form e ti ricontatteremo entro 24 ore
                  </p>

                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Nome *
                        </label>
                        <Input placeholder="Il tuo nome" required />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Cognome *
                        </label>
                        <Input placeholder="Il tuo cognome" required />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Email *
                        </label>
                        <Input type="email" placeholder="tua@email.it" required />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Telefono *
                        </label>
                        <Input type="tel" placeholder="+39 333 123 4567" required />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Motivo del contatto *
                      </label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleziona un'opzione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="buy">Acquisto immobile</SelectItem>
                          <SelectItem value="sell">Vendita immobile</SelectItem>
                          <SelectItem value="rent">Affitto immobile</SelectItem>
                          <SelectItem value="valuation">Richiesta valutazione</SelectItem>
                          <SelectItem value="info">Informazioni generali</SelectItem>
                          <SelectItem value="other">Altro</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Messaggio *
                      </label>
                      <Textarea
                        placeholder="Descrivi la tua richiesta..."
                        rows={6}
                        required
                      />
                    </div>

                    <div className="flex items-start gap-2">
                      <input
                        type="checkbox"
                        id="privacy"
                        className="mt-1"
                        required
                      />
                      <label htmlFor="privacy" className="text-sm text-muted-foreground">
                        Acconsento al trattamento dei miei dati personali in conformità con la 
                        Privacy Policy e dichiaro di aver letto l'informativa sulla privacy.
                      </label>
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-gradient-to-r from-accent to-accent/90 hover:shadow-lg"
                    >
                      <Send className="w-4 h-4 mr-2" />
                      Invia Messaggio
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Dove Siamo</h2>
            <p className="text-lg text-muted-foreground">
              Ci trovi nel cuore di Milano, facilmente raggiungibile con i mezzi pubblici
            </p>
          </div>
          
          <Card className="overflow-hidden shadow-lg">
            <CardContent className="p-0">
              <div className="w-full h-[500px] bg-muted flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <MapPin className="w-16 h-16 mx-auto mb-4 text-accent" />
                  <p className="text-xl font-semibold mb-2">Via Roma 123, 20121 Milano</p>
                  <p className="text-sm">Mappa interattiva</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
