import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { supabase } from '@/integrations/supabase/client';

interface Property {
  id: string;
  title: string;
  address: string;
  latitude?: number;
  longitude?: number;
  price: number;
  surface_area: number;
  rooms: number;
  is_construction: boolean;
  is_investment: boolean;
  external_url?: string;
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
    // Load regular properties
    const { data: propertiesData, error: propertiesError } = await supabase
      .from('properties')
      .select('id, title, address, latitude, longitude, price, surface_area, rooms, is_construction, is_investment')
      .eq('status', 'active');

    // Load external constructions
    const { data: externalData, error: externalError } = await supabase
      .from('external_constructions')
      .select('id, title, address, latitude, longitude, is_construction, is_investment, external_url')
      .eq('status', 'active');

    const allProperties = [];

    if (!propertiesError && propertiesData) {
      // Geocode addresses that don't have coordinates
      const propertiesWithCoords = await Promise.all(
        propertiesData.map(async (property) => {
          if (!property.latitude || !property.longitude) {
            const coords = await geocodeAddress(property.address);
            return { ...property, ...coords };
          }
          return property;
        })
      );
      allProperties.push(...propertiesWithCoords.filter(p => p.latitude && p.longitude));
    }

    if (!externalError && externalData) {
      // Geocode external constructions
      const externalWithCoords = await Promise.all(
        externalData.map(async (construction) => {
          if (!construction.latitude || !construction.longitude) {
            const coords = await geocodeAddress(construction.address);
            return { 
              ...construction, 
              ...coords,
              price: 0,
              surface_area: 0,
              rooms: 0
            };
          }
          return {
            ...construction,
            price: 0,
            surface_area: 0,
            rooms: 0
          };
        })
      );
      allProperties.push(...externalWithCoords.filter(p => p.latitude && p.longitude));
    }

    setProperties(allProperties);
  };

  const geocodeAddress = async (address: string): Promise<{ latitude?: number; longitude?: number }> => {
    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${mapboxToken}`
      );
      const data = await response.json();
      if (data.features && data.features.length > 0) {
        const [longitude, latitude] = data.features[0].center;
        return { latitude, longitude };
      }
    } catch (error) {
      console.error('Geocoding error:', error);
    }
    return {};
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
      // Determine marker color based on property type
      let markerColor = '#ef4444'; // red for regular properties
      let markerLabel = '🏠';
      
      if (property.is_construction) {
        markerColor = '#22c55e'; // green for construction
        markerLabel = '🚧';
      } else if (property.is_investment) {
        markerColor = '#3b82f6'; // blue for investment
        markerLabel = '💼';
      }

      const el = document.createElement('div');
      el.className = 'custom-marker';
      el.innerHTML = markerLabel;
      el.style.width = '40px';
      el.style.height = '40px';
      el.style.fontSize = '24px';
      el.style.display = 'flex';
      el.style.alignItems = 'center';
      el.style.justifyContent = 'center';
      el.style.cursor = 'pointer';
      el.style.borderRadius = '50%';
      el.style.border = `3px solid ${markerColor}`;
      el.style.backgroundColor = 'white';
      el.style.boxShadow = '0 2px 8px rgba(0,0,0,0.2)';

      const marker = new mapboxgl.Marker(el)
        .setLngLat([property.longitude!, property.latitude!])
        .setPopup(
          new mapboxgl.Popup({ offset: 25 }).setHTML(`
            <div style="padding: 8px; min-width: 200px;">
              <h3 style="font-weight: bold; margin-bottom: 8px; font-size: 16px;">${property.title}</h3>
              ${property.price > 0 ? `<p style="margin: 4px 0; font-size: 14px;">€${property.price.toLocaleString()}</p>` : ''}
              ${property.surface_area > 0 ? `<p style="margin: 4px 0; font-size: 14px;">${property.surface_area}m² • ${property.rooms} vani</p>` : ''}
              <p style="margin: 4px 0; font-size: 12px; color: #666;">${property.address}</p>
              ${property.external_url 
                ? `<a href="${property.external_url}" target="_blank" rel="noopener noreferrer" style="display: inline-block; margin-top: 8px; color: hsl(var(--primary)); text-decoration: underline; font-size: 14px;">Visita il sito →</a>`
                : `<a href="/proprieta/${property.id}" style="display: inline-block; margin-top: 8px; color: hsl(var(--primary)); text-decoration: underline; font-size: 14px;">Scopri di più</a>`
              }
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
        if (property.longitude && property.latitude) {
          bounds.extend([property.longitude, property.latitude]);
        }
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
