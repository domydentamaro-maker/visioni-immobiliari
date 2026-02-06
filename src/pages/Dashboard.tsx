import { useState, useEffect, useCallback } from 'react';
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
import { Loader2, Upload, X, Trash2, LogOut, User, MapPin, ExternalLink, Building2, Search, Pencil } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

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
  status: string | null;
  created_at: string | null;
}

// Geocoding function using Nominatim (free, no API key needed)
const geocodeAddress = async (address: string): Promise<{ lat: number; lng: number } | null> => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=1`
    );
    const data = await response.json();
    if (data && data.length > 0) {
      return {
        lat: parseFloat(data[0].lat),
        lng: parseFloat(data[0].lon)
      };
    }
    return null;
  } catch (error) {
    console.error('Geocoding error:', error);
    return null;
  }
};

export default function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [properties, setProperties] = useState<Property[]>([]);
  const [images, setImages] = useState<File[]>([]);
  const [previewImageIndex, setPreviewImageIndex] = useState<number>(0);
  const [geocodingStatus, setGeocodingStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [coordinates, setCoordinates] = useState<{ lat: number; lng: number } | null>(null);
  const [addressInput, setAddressInput] = useState('');
  const { user, signOut } = useAuth();
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    surface_area: '',
    rooms: '',
    floor: '',
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

  // Geocode address when requested
  const handleGeocodeAddress = useCallback(async () => {
    if (!addressInput || addressInput.length < 5) {
      setCoordinates(null);
      setGeocodingStatus('idle');
      return;
    }
    
    setGeocodingStatus('loading');
    const result = await geocodeAddress(addressInput);
    
    if (result) {
      setCoordinates(result);
      setGeocodingStatus('success');
    } else {
      setCoordinates(null);
      setGeocodingStatus('error');
    }
  }, [addressInput]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setImages(prev => [...prev, ...newFiles]);
      if (images.length === 0) {
        setPreviewImageIndex(0);
      }
    }
  };

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
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
      // UPDATE EXISTING PROPERTY
      if (editingProperty) {
        const { error: updateError } = await supabase
          .from('properties')
          .update({
            title: formData.title,
            description: formData.description,
            price: parseFloat(formData.price) || 0,
            surface_area: parseFloat(formData.surface_area) || 0,
            rooms: parseInt(formData.rooms) || 0,
            floor: formData.floor ? parseInt(formData.floor) : null,
            latitude: coordinates?.lat || editingProperty.latitude,
            longitude: coordinates?.lng || editingProperty.longitude,
          })
          .eq('id', editingProperty.id);

        if (updateError) throw updateError;

        // Upload new images if any
        if (images.length > 0) {
          for (let i = 0; i < images.length; i++) {
            const file = images[i];
            const fileExt = file.name.split('.').pop();
            const fileName = `${editingProperty.id}-${Date.now()}-${i}.${fileExt}`;

            const { error: uploadError } = await supabase.storage
              .from('property-images')
              .upload(fileName, file);

            if (uploadError) throw uploadError;

            const { data: { publicUrl } } = supabase.storage
              .from('property-images')
              .getPublicUrl(fileName);

            const { data: existingImages } = await supabase
              .from('property_images')
              .select('display_order')
              .eq('property_id', editingProperty.id)
              .order('display_order', { ascending: false })
              .limit(1);

            const nextOrder = (existingImages?.[0]?.display_order ?? -1) + 1;

            await supabase.from('property_images').insert({
              property_id: editingProperty.id,
              image_url: publicUrl,
              display_order: nextOrder + i,
            });
          }
        }

        toast.success('Immobile aggiornato con successo!');
        cancelEdit();
        loadProperties();
        setLoading(false);
        return;
      }

      // INSERT NEW PROPERTY
      const { data: property, error: propertyError } = await supabase
        .from('properties')
        .insert({
          title: formData.title,
          description: formData.description,
          price: parseFloat(formData.price) || 0,
          surface_area: parseFloat(formData.surface_area) || 0,
          rooms: parseInt(formData.rooms) || 0,
          floor: formData.floor ? parseInt(formData.floor) : null,
          latitude: coordinates?.lat || 0,
          longitude: coordinates?.lng || 0,
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

          const { error: uploadError } = await supabase.storage
            .from('property-images')
            .upload(fileName, file);

          if (uploadError) throw uploadError;

          const { data: { publicUrl } } = supabase.storage
            .from('property-images')
            .getPublicUrl(fileName);

          await supabase.from('property_images').insert({
            property_id: property.id,
            image_url: publicUrl,
            display_order: i,
          });
        }
      }

      toast.success('Immobile aggiunto con successo!');

      // Track event
      if (window.dataLayer) {
        window.dataLayer.push({
          event: 'immobilecaricato',
          title: formData.title,
        });
      }
      
      // Reset form
      resetForm();
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

  const handleEditProperty = (property: Property) => {
    setEditingProperty(property);
    setFormData({
      title: property.title,
      description: property.description || '',
      price: property.price?.toString() || '',
      surface_area: property.surface_area?.toString() || '',
      rooms: property.rooms?.toString() || '',
      floor: property.floor?.toString() || '',
    });
    if (property.latitude && property.longitude) {
      setCoordinates({ lat: property.latitude, lng: property.longitude });
      setGeocodingStatus('success');
    }
  };

  const cancelEdit = () => {
    setEditingProperty(null);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      price: '',
      surface_area: '',
      rooms: '',
      floor: '',
    });
    setImages([]);
    setPreviewImageIndex(0);
    setCoordinates(null);
    setGeocodingStatus('idle');
    setAddressInput('');
  };

  const openInGoogleMaps = (lat?: number, lng?: number) => {
    if (lat && lng) {
      window.open(`https://www.google.com/maps?q=${lat},${lng}`, '_blank');
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
                <CardTitle>
                  {editingProperty ? 'Modifica Immobile' : 'Carica Nuovo Immobile'}
                </CardTitle>
                <CardDescription>
                  {editingProperty 
                    ? 'Modifica i campi e salva le modifiche' 
                    : 'Compila i campi per aggiungere un immobile'}
                </CardDescription>
                {editingProperty && (
                  <Button variant="outline" size="sm" onClick={cancelEdit} className="mt-2 w-fit">
                    <X className="h-4 w-4 mr-2" />
                    Annulla modifica
                  </Button>
                )}
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

                  <div className="space-y-2">
                    <Label htmlFor="address">Cerca indirizzo per coordinate</Label>
                    <div className="flex gap-2">
                      <Input
                        id="address"
                        value={addressInput}
                        onChange={(e) => setAddressInput(e.target.value)}
                        placeholder="Via Roma 123, Milano"
                        className="flex-1"
                      />
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="icon"
                        onClick={handleGeocodeAddress}
                        disabled={geocodingStatus === 'loading' || !addressInput}
                        title="Cerca coordinate su mappa"
                      >
                        {geocodingStatus === 'loading' ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Search className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    {geocodingStatus === 'success' && coordinates && (
                      <div className="flex items-center gap-2 text-sm text-green-600">
                        <MapPin className="h-4 w-4" />
                        <span>Coordinate trovate: {coordinates.lat.toFixed(6)}, {coordinates.lng.toFixed(6)}</span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="h-6 px-2 text-xs"
                          onClick={() => openInGoogleMaps(coordinates.lat, coordinates.lng)}
                        >
                          <ExternalLink className="h-3 w-3 mr-1" />
                          Vedi su Maps
                        </Button>
                      </div>
                    )}
                    {geocodingStatus === 'error' && (
                      <p className="text-sm text-amber-600">
                        ⚠️ Coordinate non trovate. Riprova con un indirizzo più specifico.
                      </p>
                    )}
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

                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Caricamento...
                      </>
                    ) : (
                      editingProperty ? 'Salva Modifiche' : 'Carica Immobile'
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Properties List */}
            <Card className="shadow-elegant">
              <CardHeader>
                <CardTitle>Gestione Immobili</CardTitle>
                <CardDescription>
                  {properties.length} immobili totali
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-[600px] overflow-y-auto">
                  {properties.map((property) => (
                    <div
                      key={property.id}
                      className="flex items-start justify-between p-4 border rounded-lg hover:bg-accent/5 transition-colors"
                    >
                      <div className="flex-1">
                        <h3 className="font-semibold">{property.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          €{property.price.toLocaleString()} • {property.surface_area}m² • {property.rooms} vani
                          {property.floor !== null && ` • Piano ${property.floor}`}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1 flex items-center gap-2">
                          <span>{property.created_at ? new Date(property.created_at).toLocaleDateString('it-IT') : ''}</span>
                          {property.latitude && property.longitude && (
                            <span className="text-green-600 flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              Geolocalizzato
                            </span>
                          )}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditProperty(property)}
                          title="Modifica"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openInGoogleMaps(property.latitude, property.longitude)}
                          title="Apri su Google Maps"
                          disabled={!property.latitude || !property.longitude}
                        >
                          <MapPin className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDelete(property.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  {properties.length === 0 && (
                    <p className="text-center text-muted-foreground py-8">
                      Nessun immobile trovato
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
