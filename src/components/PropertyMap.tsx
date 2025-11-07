import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { supabase } from '@/integrations/supabase/client';

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
  const mapboxToken = 'pk.eyJ1IjoiMmRzdmlsdXBwb2ltbW9iaWxpYXJlIiwiYSI6ImNtZ3BkaDQ3bzB1dzAya3IyYTFjd291MHIifQ.PIdQe-j8rZIHBF5ppyaHqA';

  useEffect(() => {
    loadProperties();
  }, []);

  useEffect(() => {
    if (mapboxToken && mapContainer.current && properties.length > 0) {
      initializeMap();
    }
  }, [mapboxToken, properties]);

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

  return (
    <div className="relative w-full h-[500px] rounded-lg overflow-hidden shadow-elegant">
      <div ref={mapContainer} className="absolute inset-0" />
    </div>
  );
}
