import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Loader2, Upload, X, Trash2, LogOut, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Checkbox } from '@/components/ui/checkbox';

interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  surface_area: number;
  rooms: number;
  floor: number | null;
  address: string;
  latitude?: number;
  longitude?: number;
  is_construction: boolean;
  is_investment: boolean;
  status: string;
  created_at: string;
}

export default function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [properties, setProperties] = useState<Property[]>([]);
  const [images, setImages] = useState<File[]>([]);
  const [previewImageIndex, setPreviewImageIndex] = useState<number>(0);
  const { user, signOut } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    surface_area: '',
    rooms: '',
    floor: '',
    address: '',
    is_construction: false,
    is_investment: false,
    external_url: '',
    image_url: '',
  });

  useEffect(() => {
    loadProperties();
  }, []);

  const loadProperties = async () => {
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setProperties(data);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files));
      setPreviewImageIndex(0); // Reset preview to first image
    }
  };

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
    // Adjust preview index if needed
    if (previewImageIndex >= newImages.length && newImages.length > 0) {
      setPreviewImageIndex(newImages.length - 1);
    } else if (newImages.length === 0) {
      setPreviewImageIndex(0);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (formData.external_url && formData.external_url.length > 0) {
        // Insert external construction
        const { error: externalError } = await supabase
          .from('external_constructions')
          .insert({
            title: formData.title,
            description: formData.description || '',
            address: formData.address,
            external_url: formData.external_url,
            image_url: formData.image_url || null,
            is_construction: true,
            is_investment: false,
          });

        if (externalError) {
          console.error('External construction error:', externalError);
          throw externalError;
        }

        toast.success('Cantiere esterno aggiunto con successo!');
      } else {
        // Insert property
        const { data: property, error: propertyError } = await supabase
          .from('properties')
          .insert({
            title: formData.title,
            description: formData.description,
            price: parseFloat(formData.price) || 0,
            surface_area: parseFloat(formData.surface_area) || 0,
            rooms: parseInt(formData.rooms) || 0,
            floor: formData.floor ? parseInt(formData.floor) : null,
            address: formData.address,
            is_construction: formData.is_construction,
            is_investment: formData.is_investment,
          })
          .select()
          .single();

        if (propertyError) {
          console.error('Property error:', propertyError);
          throw propertyError;
        }

        // Upload images
        if (images.length > 0 && property) {
          for (let i = 0; i < images.length; i++) {
            const file = images[i];
            const fileExt = file.name.split('.').pop();
            const fileName = `${property.id}-${Date.now()}-${i}.${fileExt}`;
            const filePath = `${fileName}`;

            const { error: uploadError } = await supabase.storage
              .from('property-images')
              .upload(filePath, file);

            if (uploadError) throw uploadError;

            const { data: { publicUrl } } = supabase.storage
              .from('property-images')
              .getPublicUrl(filePath);

            await supabase.from('property_images').insert({
              property_id: property.id,
              image_url: publicUrl,
              display_order: i,
              is_preview: i === previewImageIndex, // Set preview flag
            });
          }
        }

        toast.success('Immobile aggiunto con successo!');
      }

      // Track event
      if (window.dataLayer) {
        window.dataLayer.push({
          event: formData.external_url ? 'cantiereesternocaricato' : 'immobilecaricato',
          title: formData.title,
        });
      }
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        price: '',
        surface_area: '',
        rooms: '',
        floor: '',
        address: '',
        is_construction: false,
        is_investment: false,
        external_url: '',
        image_url: '',
      });
      setImages([]);
      setPreviewImageIndex(0);
      loadProperties();
    } catch (error: any) {
      toast.error(error.message || 'Errore durante il caricamento');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (propertyId: string) => {
    if (!confirm('Sei sicuro di voler eliminare questo immobile?')) return;

    try {
      const { error } = await supabase
        .from('properties')
        .delete()
        .eq('id', propertyId);

      if (error) throw error;

      toast.success('Immobile eliminato con successo');
      loadProperties();
    } catch (error: any) {
      toast.error(error.message || 'Errore durante l\'eliminazione');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-12 px-4 bg-gradient-subtle">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-4xl font-display font-bold">Dashboard Admin</h1>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-lg border border-primary/20">
                  <User className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">{user?.email}</span>
                  <Badge variant="default" className="ml-2">Loggato</Badge>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={signOut}
                  className="gap-2"
                >
                  <LogOut className="h-4 w-4" />
                  Esci
                </Button>
              </div>
            </div>
            <div className="text-sm text-muted-foreground opacity-30 select-none">
              2D Sviluppo Immobiliare - Sezione Privata
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Form */}
            <Card className="shadow-elegant">
              <CardHeader>
                <CardTitle>Carica Nuovo Immobile o Cantiere</CardTitle>
                <CardDescription>
                  Compila i campi per aggiungere un immobile o un cantiere esterno
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* External Link Field */}
                  <div className="space-y-2 p-4 bg-muted rounded-lg">
                    <Label htmlFor="external_url" className="font-semibold">
                      Link Esterno (opzionale - per cantieri come Borgo San Nicola)
                    </Label>
                    <Input
                      id="external_url"
                      value={formData.external_url}
                      onChange={(e) => {
                        setFormData({ ...formData, external_url: e.target.value });
                      }}
                      placeholder="https://live-future-homes.com/borgo-san-nicola"
                    />
                    {formData.external_url && (
                      <p className="text-sm text-muted-foreground">
                        ✓ Modalità cantiere esterno attiva - solo titolo e indirizzo richiesti
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="title">Titolo *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      required
                      placeholder="Es: Appartamento in centro"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Descrizione {!formData.external_url && '*'}</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      required={!formData.external_url}
                      rows={4}
                      placeholder="Descrizione dettagliata dell'immobile..."
                    />
                  </div>

                  {!formData.external_url && (
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="price">Prezzo (€) *</Label>
                        <Input
                          id="price"
                          type="number"
                          step="0.01"
                          value={formData.price}
                          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                          required
                          placeholder="250000"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="surface_area">Superficie (m²) *</Label>
                        <Input
                          id="surface_area"
                          type="number"
                          step="0.01"
                          value={formData.surface_area}
                          onChange={(e) => setFormData({ ...formData, surface_area: e.target.value })}
                          required
                          placeholder="120"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="rooms">Numero Vani *</Label>
                        <Input
                          id="rooms"
                          type="number"
                          value={formData.rooms}
                        onChange={(e) => setFormData({ ...formData, rooms: e.target.value })}
                        required
                        placeholder="4"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="floor">Piano</Label>
                      <Input
                        id="floor"
                        type="number"
                        value={formData.floor}
                        onChange={(e) => setFormData({ ...formData, floor: e.target.value })}
                        placeholder="2"
                      />
                    </div>
                  </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="address">Indirizzo *</Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      required
                      placeholder="Via Roma 123, Milano"
                    />
                  </div>

                  {formData.external_url && (
                    <div className="space-y-2">
                      <Label htmlFor="image_url">URL Immagine Anteprima (opzionale)</Label>
                      <Input
                        id="image_url"
                        value={formData.image_url}
                        onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                        placeholder="https://images.unsplash.com/photo-..."
                      />
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="is_construction"
                        checked={formData.is_construction}
                        onChange={(e) => setFormData({ ...formData, is_construction: e.target.checked })}
                        className="h-4 w-4 rounded border-gray-300"
                      />
                      <Label htmlFor="is_construction" className="cursor-pointer">
                        È un cantiere (bandierina verde)
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="is_investment"
                        checked={formData.is_investment}
                        onChange={(e) => setFormData({ ...formData, is_investment: e.target.checked })}
                        className="h-4 w-4 rounded border-gray-300"
                      />
                      <Label htmlFor="is_investment" className="cursor-pointer">
                        È un investimento (bandierina blu)
                      </Label>
                    </div>
                  </div>

                  {!formData.external_url && (
                    <div className="space-y-2">
                      <Label htmlFor="images">Immagini</Label>
                      <div className="flex items-center gap-2">
                        <Input
                          id="images"
                          type="file"
                          accept="image/jpeg,image/png,image/webp"
                          multiple
                          onChange={handleImageChange}
                          className="flex-1"
                        />
                        <Upload className="h-5 w-5 text-muted-foreground" />
                      </div>
                      {images.length > 0 && (
                      <div className="space-y-2 mt-2">
                        <Label className="text-sm text-muted-foreground">
                          Seleziona l'immagine di anteprima:
                        </Label>
                        <div className="grid grid-cols-3 gap-2">
                          {images.map((img, idx) => (
                            <div 
                              key={idx} 
                              className={`relative group cursor-pointer border-2 rounded ${
                                previewImageIndex === idx 
                                  ? 'border-accent ring-2 ring-accent/50' 
                                  : 'border-transparent hover:border-accent/50'
                              }`}
                              onClick={() => setPreviewImageIndex(idx)}
                            >
                              <img
                                src={URL.createObjectURL(img)}
                                alt={`Preview ${idx + 1}`}
                                className="w-full h-20 object-cover rounded"
                              />
                              {previewImageIndex === idx && (
                                <div className="absolute top-1 left-1 bg-accent text-white px-2 py-0.5 rounded text-xs font-semibold">
                                  Anteprima
                                </div>
                              )}
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  removeImage(idx);
                                }}
                                className="absolute top-1 right-1 bg-destructive text-destructive-foreground p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <X className="h-3 w-3" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  )}

                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Caricamento...
                      </>
                    ) : (
                      formData.external_url ? 'Carica Cantiere Esterno' : 'Carica Immobile'
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Properties List */}
            <Card className="shadow-elegant">
              <CardHeader>
                <CardTitle>Immobili Caricati</CardTitle>
                <CardDescription>
                  {properties.length} immobili nel database
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 max-h-[600px] overflow-y-auto">
                  {properties.map((property) => (
                    <div
                      key={property.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/5 transition-colors"
                    >
                      <div className="flex-1">
                        <h3 className="font-semibold">{property.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          €{property.price.toLocaleString()} • {property.surface_area}m² • {property.rooms} vani
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {new Date(property.created_at).toLocaleDateString('it-IT')}
                        </p>
                      </div>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(property.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  {properties.length === 0 && (
                    <p className="text-center text-muted-foreground py-8">
                      Nessun immobile caricato
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
