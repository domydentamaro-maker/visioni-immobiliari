import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Loader2, Upload, X, Trash2 } from 'lucide-react';

interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  surface_area: number;
  rooms: number;
  floor: number | null;
  latitude: number;
  longitude: number;
  status: string;
  created_at: string;
}

export default function Dashboard() {
  const { user, isAdmin, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [properties, setProperties] = useState<Property[]>([]);
  const [images, setImages] = useState<File[]>([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    surface_area: '',
    rooms: '',
    floor: '',
    latitude: '',
    longitude: '',
  });

  useEffect(() => {
    if (!authLoading && (!user || !isAdmin)) {
      navigate('/login');
    }
  }, [user, isAdmin, authLoading, navigate]);

  useEffect(() => {
    if (user && isAdmin) {
      loadProperties();
    }
  }, [user, isAdmin]);

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
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Insert property
      const { data: property, error: propertyError } = await supabase
        .from('properties')
        .insert({
          title: formData.title,
          description: formData.description,
          price: parseFloat(formData.price),
          surface_area: parseFloat(formData.surface_area),
          rooms: parseInt(formData.rooms),
          floor: formData.floor ? parseInt(formData.floor) : null,
          latitude: parseFloat(formData.latitude),
          longitude: parseFloat(formData.longitude),
          created_by: user?.id,
        })
        .select()
        .single();

      if (propertyError) throw propertyError;

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
          });
        }
      }

      // Track event
      if (window.dataLayer) {
        window.dataLayer.push({
          event: 'immobilecaricato',
          propertyId: property.id,
          propertyTitle: property.title,
        });
      }

      toast.success('Immobile caricato con successo!');
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        price: '',
        surface_area: '',
        rooms: '',
        floor: '',
        latitude: '',
        longitude: '',
      });
      setImages([]);
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

  if (authLoading || !user || !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-12 px-4 bg-gradient-subtle">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-8 flex justify-between items-center">
            <h1 className="text-4xl font-display font-bold">Dashboard Admin</h1>
            <div className="text-sm text-muted-foreground opacity-30 select-none">
              2D Sviluppo Immobiliare
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Form */}
            <Card className="shadow-elegant">
              <CardHeader>
                <CardTitle>Carica Nuovo Immobile</CardTitle>
                <CardDescription>
                  Compila tutti i campi per aggiungere un nuovo immobile
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
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
                    <Label htmlFor="description">Descrizione *</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      required
                      rows={4}
                      placeholder="Descrizione dettagliata dell'immobile..."
                    />
                  </div>

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

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="latitude">Latitudine *</Label>
                      <Input
                        id="latitude"
                        type="number"
                        step="any"
                        value={formData.latitude}
                        onChange={(e) => setFormData({ ...formData, latitude: e.target.value })}
                        required
                        placeholder="41.9028"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="longitude">Longitudine *</Label>
                      <Input
                        id="longitude"
                        type="number"
                        step="any"
                        value={formData.longitude}
                        onChange={(e) => setFormData({ ...formData, longitude: e.target.value })}
                        required
                        placeholder="12.4964"
                      />
                    </div>
                  </div>

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
                      <div className="grid grid-cols-3 gap-2 mt-2">
                        {images.map((img, idx) => (
                          <div key={idx} className="relative group">
                            <img
                              src={URL.createObjectURL(img)}
                              alt={`Preview ${idx + 1}`}
                              className="w-full h-20 object-cover rounded"
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(idx)}
                              className="absolute top-1 right-1 bg-destructive text-destructive-foreground p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Caricamento...
                      </>
                    ) : (
                      'Carica Immobile'
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
