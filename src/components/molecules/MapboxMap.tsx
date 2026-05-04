'use client';

import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const HOTEL_LNG_LAT: [number, number] = [47.0862, -21.4541];

// Set NEXT_PUBLIC_MAPBOX_TOKEN in .env (free tier at mapbox.com)
const TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

/**
 * Mapbox interactive map. World-class hotel pattern (Aman, Singita, Belmond).
 * Uses light-v11 monochrome style with a custom hotel marker.
 *
 * To use your own Mapbox account, set NEXT_PUBLIC_MAPBOX_TOKEN.
 */
export function MapboxMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    if (mapRef.current) return; // Already initialized
    if (!TOKEN) return; // Token not configured

    mapboxgl.accessToken = TOKEN;

    const map = new mapboxgl.Map({
      container: containerRef.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: HOTEL_LNG_LAT,
      zoom: 9,
      pitch: 0,
      bearing: 0,
      attributionControl: false,
      cooperativeGestures: false,
    });

    // Compact attribution
    map.addControl(new mapboxgl.AttributionControl({ compact: true }));

    // Custom hotel marker
    const el = document.createElement('div');
    el.className = 'mapbox-hotel-marker';

    new mapboxgl.Marker({ element: el, anchor: 'center' })
      .setLngLat(HOTEL_LNG_LAT)
      .setPopup(
        new mapboxgl.Popup({
          offset: 24,
          closeButton: false,
          closeOnClick: false,
          className: 'mapbox-hotel-popup',
        }).setHTML(
          '<div class="mapbox-popup-inner"><div class="mapbox-popup-label">Ambalakely</div><div class="mapbox-popup-sub">Fianarantsoa, Madagascar</div></div>',
        ),
      )
      .addTo(map);

    // Subtle zoom controls bottom-right
    map.addControl(
      new mapboxgl.NavigationControl({ showCompass: false, visualizePitch: false }),
      'bottom-right',
    );

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  return (
    <>
      <div ref={containerRef} className="absolute inset-0 w-full h-full" />
      {!TOKEN ? (
        <div className="absolute inset-0 flex items-center justify-center bg-[var(--color-bg-subtle)] z-10">
          <div className="text-center font-mono text-[12px] uppercase tracking-[0.1em] text-[var(--color-text-muted)] max-w-[280px]">
            Map preview · add NEXT_PUBLIC_MAPBOX_TOKEN to enable
          </div>
        </div>
      ) : null}
    </>
  );
}
