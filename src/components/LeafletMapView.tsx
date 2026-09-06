import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { ExternalLink, Navigation, Compass, Layers } from 'lucide-react';
import type { DrivePoint } from '../types/tesla';

interface LeafletMapViewProps {
  points: DrivePoint[];
  startAddress?: string;
  endAddress?: string;
  heightClass?: string;
}

export const LeafletMapView: React.FC<LeafletMapViewProps> = ({
  points,
  startAddress,
  endAddress,
  heightClass = 'h-72',
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (points.length === 0) return;

    // Si ya existe instancia, destruirla para evitar fugas
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    const firstPoint = points[0];
    const lastPoint = points[points.length - 1];

    // Inicializar mapa centrado en el inicio
    const map = L.map(mapContainerRef.current, {
      zoomControl: true,
      attributionControl: false,
    }).setView([firstPoint.latitude, firstPoint.longitude], 12);

    mapInstanceRef.current = map;

    // Capa de mosaicos 100% gratuita de OpenStreetMap (CartoDB Dark Matter para modo oscuro perfecto)
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      maxZoom: 19,
      subdomains: 'abcd',
    }).addTo(map);

    // Dibujar polilíneas coloreadas según la potencia (Regeneración en verde, Crucero en cian, Aceleración en rojo)
    for (let i = 0; i < points.length - 1; i++) {
      const p1 = points[i];
      const p2 = points[i + 1];

      let segmentColor = '#00e5ff'; // Crucero por defecto
      if (p1.power_kw < 0) {
        segmentColor = '#10b981'; // Freno regenerativo (verde)
      } else if (p1.power_kw > 40) {
        segmentColor = '#ef4444'; // Fuerte aceleración (rojo)
      } else if (p1.power_kw > 20) {
        segmentColor = '#f59e0b'; // Potencia media (ámbar)
      }

      const polyline = L.polyline(
        [
          [p1.latitude, p1.longitude],
          [p2.latitude, p2.longitude],
        ],
        {
          color: segmentColor,
          weight: 4,
          opacity: 0.9,
        }
      ).addTo(map);

      // Popup informativo al hacer clic en el tramo
      polyline.bindPopup(`
        <div style="font-family: inherit; font-size: 11px; color: #111;">
          <strong>Punto del Trayecto</strong><br/>
          Velocidad: <b>${p1.speed_kmh} km/h</b><br/>
          Potencia: <b style="color: ${p1.power_kw < 0 ? '#059669' : '#dc2626'}">${p1.power_kw} kW</b><br/>
          Batería: <b>${p1.battery_level}%</b><br/>
          Altitud: <b>${p1.elevation_m} m</b>
        </div>
      `);
    }

    // Marcador de Inicio (Verde)
    const startIcon = L.divIcon({
      className: 'custom-map-pin-start',
      html: `<div style="background-color: #10b981; width: 14px; height: 14px; border-radius: 50%; border: 3px solid #fff; box-shadow: 0 0 8px rgba(0,0,0,0.6);"></div>`,
      iconSize: [14, 14],
      iconAnchor: [7, 7],
    });
    L.marker([firstPoint.latitude, firstPoint.longitude], { icon: startIcon })
      .bindPopup(`<b>Inicio:</b> ${startAddress || 'Punto de partida'}`)
      .addTo(map);

    // Marcador de Fin (Rojo)
    const endIcon = L.divIcon({
      className: 'custom-map-pin-end',
      html: `<div style="background-color: #ef4444; width: 14px; height: 14px; border-radius: 50%; border: 3px solid #fff; box-shadow: 0 0 8px rgba(0,0,0,0.6);"></div>`,
      iconSize: [14, 14],
      iconAnchor: [7, 7],
    });
    L.marker([lastPoint.latitude, lastPoint.longitude], { icon: endIcon })
      .bindPopup(`<b>Destino:</b> ${endAddress || 'Llegada'}`)
      .addTo(map);

    // Ajustar zoom automáticamente a los límites de la ruta
    const latLngs = points.map(p => [p.latitude, p.longitude] as [number, number]);
    const bounds = L.latLngBounds(latLngs);
    map.fitBounds(bounds, { padding: [25, 25] });

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [points]);

  // Abrir coordenadas en app de mapas externa gratuita (Google Maps, OsmAnd, Organic Maps, Waze)
  const openInExternalMaps = () => {
    if (points.length === 0) return;
    const dest = points[points.length - 1];
    // Formato estándar universal 'geo:lat,lng' para Android
    const geoUrl = `geo:${dest.latitude},${dest.longitude}?q=${dest.latitude},${dest.longitude}(Destino+Tesla)`;
    window.open(geoUrl, '_system');
  };

  if (points.length === 0) {
    return (
      <div className={`w-full ${heightClass} rounded-2xl glass-panel flex flex-col items-center justify-center text-gray-400 text-xs border border-white/5`}>
        <Compass className="w-8 h-8 text-gray-500 mb-2 animate-spin" />
        <span>Sin puntos GPS registrados en este trayecto</span>
      </div>
    );
  }

  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-white/10 shadow-xl">
      {/* Contenedor del Mapa Leaflet */}
      <div ref={mapContainerRef} className={`w-full ${heightClass} z-10`} />

      {/* Leyenda y Botón "Abrir en App de Mapas Gratuita" */}
      <div className="absolute bottom-2.5 left-2.5 right-2.5 z-20 flex items-center justify-between pointer-events-none">
        {/* Leyenda de colores */}
        <div className="bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10 text-[10px] text-gray-300 flex items-center gap-3 pointer-events-auto">
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            Regeneración
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
            Crucero
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
            Aceleración
          </span>
        </div>

        {/* Botón Abrir en App de Mapas */}
        <button
          onClick={openInExternalMaps}
          className="bg-black/90 hover:bg-black/95 active:scale-95 text-white text-xs font-semibold px-3 py-1.5 rounded-xl border border-white/20 flex items-center gap-1.5 shadow-lg pointer-events-auto transition"
        >
          <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
          <span>App de mapas</span>
        </button>
      </div>
    </div>
  );
};
