import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { supabase } from '@/integrations/supabase/client';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

interface Property {
  id: string;
  title: string;
  latitude: number;
  longitude: number;
  price: number;
  surface_area: number;
  rooms: number;
}

export default function PropertyMap() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [properties, setProperties] = useState<Property[]>([]);
  const [mapboxToken, setMapboxToken] = useState('');
  const [tokenSaved, setTokenSaved] = useState(false);

  useEffect(() => {
    loadProperties();
  }, []);

  useEffect(() => {
    if (tokenSaved && mapboxToken && mapContainer.current && properties.length > 0) {
      initializeMap();
    }
  }, [tokenSaved, mapboxToken, properties]);

  const loadProperties = async () => {
    const { data, error } = await supabase
      .from('properties')
      .select('id, title, latitude, longitude, price, surface_area, rooms')
      .eq('status', 'active');

    if (!error && data) {
      setProperties(data);
    }
  };

  const initializeMap = () => {
    if (!mapContainer.current || map.current) return;

    mapboxgl.accessToken = mapboxToken;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [12.4964, 41.9028], // Rome
      zoom: 10,
    });

    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Track map view event
    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'mappavisualizzata',
        propertiesCount: properties.length,
      });
    }

    // Add markers for each property
    properties.forEach((property) => {
      const el = document.createElement('div');
      el.className = 'custom-marker';
      el.style.width = '40px';
      el.style.height = '40px';
      el.style.backgroundImage = 'url(/placeholder.svg)';
      el.style.backgroundSize = 'cover';
      el.style.cursor = 'pointer';
      el.style.borderRadius = '50%';
      el.style.border = '3px solid hsl(var(--primary))';
      el.style.backgroundColor = 'white';

      const marker = new mapboxgl.Marker(el)
        .setLngLat([property.longitude, property.latitude])
        .setPopup(
          new mapboxgl.Popup({ offset: 25 }).setHTML(`
            <div style="padding: 8px; min-width: 200px;">
              <h3 style="font-weight: bold; margin-bottom: 8px; font-size: 16px;">${property.title}</h3>
              <p style="margin: 4px 0; font-size: 14px;">€${property.price.toLocaleString()}</p>
              <p style="margin: 4px 0; font-size: 14px;">${property.surface_area}m² • ${property.rooms} vani</p>
              <a href="/proprieta/${property.id}" style="display: inline-block; margin-top: 8px; color: hsl(var(--primary)); text-decoration: underline; font-size: 14px;">Scopri di più</a>
            </div>
          `)
        )
        .addTo(map.current!);

      el.addEventListener('click', () => {
        // Track marker click event
        if (window.dataLayer) {
          window.dataLayer.push({
            event: 'markerclick',
            propertyId: property.id,
            propertyTitle: property.title,
          });
        }
      });
    });

    // Fit map to show all markers
    if (properties.length > 0) {
      const bounds = new mapboxgl.LngLatBounds();
      properties.forEach((property) => {
        bounds.extend([property.longitude, property.latitude]);
      });
      map.current.fitBounds(bounds, { padding: 50 });
    }
  };

  const handleSaveToken = () => {
    if (!mapboxToken.trim()) {
      toast.error('Inserisci un token Mapbox valido');
      return;
    }
    setTokenSaved(true);
    toast.success('Token salvato! Mappa in caricamento...');
  };

  if (!tokenSaved) {
    return (
      <div className="bg-background border rounded-lg p-8 text-center">
        <h3 className="text-xl font-semibold mb-4">Configura Mappa Interattiva</h3>
        <p className="text-muted-foreground mb-6">
          Per visualizzare la mappa degli immobili, inserisci il tuo token pubblico Mapbox.
          <br />
          Puoi ottenerlo gratuitamente su{' '}
          <a
            href="https://mapbox.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            mapbox.com
          </a>
        </p>
        <div className="max-w-md mx-auto space-y-4">
          <div className="space-y-2">
            <Label htmlFor="mapbox-token">Token Pubblico Mapbox</Label>
            <Input
              id="mapbox-token"
              type="text"
              placeholder="pk.eyJ1..."
              value={mapboxToken}
              onChange={(e) => setMapboxToken(e.target.value)}
            />
          </div>
          <button
            onClick={handleSaveToken}
            className="px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            Salva e Carica Mappa
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[500px] rounded-lg overflow-hidden shadow-elegant">
      <div ref={mapContainer} className="absolute inset-0" />
    </div>
  );
}
