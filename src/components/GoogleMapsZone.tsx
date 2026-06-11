import React, { useState, useEffect, useRef } from "react";
import { 
  APIProvider, Map, AdvancedMarker, Pin, InfoWindow, useMap, useMapsLibrary, useAdvancedMarkerRef 
} from "@vis.gl/react-google-maps";
import { 
  MapPin, Compass, Navigation, Car, Bike, Footprints, AlertCircle, Copy, Check, CheckCircle 
} from "lucide-react";

const API_KEY =
  process.env.GOOGLE_MAPS_PLATFORM_KEY ||
  (import.meta as any).env?.VITE_GOOGLE_MAPS_PLATFORM_KEY ||
  (globalThis as any).GOOGLE_MAPS_PLATFORM_KEY ||
  "";

const hasValidKey = Boolean(API_KEY) && API_KEY !== "YOUR_API_KEY";

const REGINA_CENTER = { lat: 50.4184, lng: -104.6295 }; // 4822 Queen St, Regina, SK
const CENTER_ADDRESS = "4822 Queen Street, Regina, SK S4S 5Y3";

// RouteDisplay sub-component
function RouteDisplay({ 
  origin, 
  destination, 
  travelMode, 
  onRouteComputed 
}: {
  origin: string;
  destination: string | google.maps.LatLngLiteral;
  travelMode: "DRIVING" | "WALKING" | "BICYCLING" | "TRANSIT";
  onRouteComputed: (info: { distance: string; duration: string } | null, error?: string | null) => void;
}) {
  const map = useMap();
  const routesLib = useMapsLibrary("routes");
  const polylinesRef = useRef<google.maps.Polyline[]>([]);

  useEffect(() => {
    if (!routesLib || !map || !origin) {
      if (polylinesRef.current.length > 0) {
        polylinesRef.current.forEach(p => p.setMap(null));
        polylinesRef.current = [];
      }
      return;
    }

    // Clear previous route polylines
    polylinesRef.current.forEach(p => p.setMap(null));
    polylinesRef.current = [];

    onRouteComputed(null, null); // reset

    routesLib.Route.computeRoutes({
      origin: origin,
      destination: destination,
      travelMode: travelMode,
      fields: ["path", "distanceMeters", "durationMillis", "viewport"],
    })
    .then(({ routes }) => {
      if (routes && routes[0]) {
        const route = routes[0];
        
        // Create matching polylines
        const newPolylines = route.createPolylines();
        newPolylines.forEach(p => {
          p.setMap(map);
          // Give it a beautiful brand style (Peekaboo Corner orange)
          p.setOptions({
            strokeColor: "#FF724E",
            strokeOpacity: 0.85,
            strokeWeight: 5,
          });
        });
        polylinesRef.current = newPolylines;

        // Extract metadata
        const distanceM = route.distanceMeters || 0;
        const rawDuration = route.durationMillis;
        const durationMs = typeof rawDuration === "number" 
          ? rawDuration 
          : parseInt(rawDuration ? String(rawDuration) : "0", 10);

        const distanceStr = (distanceM / 1000).toFixed(1) + " km";
        const durationMin = Math.round(durationMs / 60000);
        const durationStr = durationMin >= 60 ? `${Math.floor(durationMin / 60)}h ${durationMin % 60}m` : `${durationMin} mins`;

        onRouteComputed({ distance: distanceStr, duration: durationStr });

        // Fit map bounds to view the full route nicely
        if (route.viewport) {
          map.fitBounds(route.viewport);
        }
      } else {
        onRouteComputed(null, "Could not find a valid route between these locations.");
      }
    })
    .catch((err) => {
      console.error("Error computing route:", err);
      onRouteComputed(null, "Could not retrieve route. Please check the address query.");
    });

    return () => {
      polylinesRef.current.forEach(p => p.setMap(null));
    };
  }, [routesLib, map, origin, destination, travelMode]);

  return null;
}

export default function GoogleMapsZone() {
  const [originInput, setOriginInput] = useState("");
  const [activeOrigin, setActiveOrigin] = useState("");
  const [travelMode, setTravelMode] = useState<"DRIVING" | "WALKING" | "BICYCLING" | "TRANSIT">("DRIVING");
  const [routeInfo, setRouteInfo] = useState<{ distance: string; duration: string } | null>(null);
  const [routeError, setRouteError] = useState<string | null>(null);
  const [infoWindowOpen, setInfoWindowOpen] = useState(true);
  const [markerRef, marker] = useAdvancedMarkerRef();
  const [copiedSecret, setCopiedSecret] = useState(false);

  const presets = [
    { name: "Regina Airport (YQR)", address: "Regina International Airport, Regina, SK" },
    { name: "Wascana Centre Lake", address: "Wascana Centre, Regina, SK" },
    { name: "Downtown Mall", address: "Cornwall Centre, Regina, SK" },
    { name: "U of Regina", address: "University of Regina, Regina, SK" }
  ];

  const handleGetDirections = (e: React.FormEvent) => {
    e.preventDefault();
    if (!originInput.trim()) return;
    setActiveOrigin(originInput.trim());
  };

  const clearRoute = () => {
    setOriginInput("");
    setActiveOrigin("");
    setRouteInfo(null);
    setRouteError(null);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText("GOOGLE_MAPS_PLATFORM_KEY");
    setCopiedSecret(true);
    setTimeout(() => setCopiedSecret(false), 2000);
  };

  // If the secret key is missing, render an incredibly polished, friendly custom playground/splash screen container
  if (!hasValidKey) {
    return (
      <div className="bg-slate-50 rounded-3xl p-6.5 border border-amber-200/60 shadow-sm space-y-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-amber-600 font-extrabold text-[10px] tracking-wider uppercase">
            <AlertCircle className="w-4.5 h-4.5 text-amber-500 shrink-0" />
            Google Maps API Key Setup Needed
          </div>
          <h3 className="text-sm font-black text-slate-800 tracking-tight leading-tight">
            Configure Google Maps Platform Integration
          </h3>
          <p className="text-[11px] text-gray-500 leading-normal font-medium">
            To view the interactive Regina daycare map and check route times, adding a Google Maps API Key to your platform secrets is required.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-4.5 border border-gray-150 space-y-3.5 text-xs text-slate-700">
          <div className="flex gap-3">
            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-orange-50 text-[#FF724E] font-black text-[10px] shrink-0">1</span>
            <p className="font-normal text-[11px] leading-relaxed">
              Retrieve a valid API key from the <a href="https://console.cloud.google.com/google/maps-apis/start?utm_campaign=gmp-code-assist-ais" target="_blank" rel="noopener noreferrer" className="text-[#FF724E] underline font-bold">Google Cloud Console</a>.
            </p>
          </div>

          <div className="flex gap-3">
            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-orange-50 text-[#FF724E] font-black text-[10px] shrink-0">2</span>
            <div className="flex-1 space-y-1.5">
              <p className="font-normal text-[11px] leading-relaxed">
                Add your key as a platform Secret in this AI Studio project:
              </p>
              <div className="bg-slate-50 p-2.5 rounded-xl border border-gray-200 flex items-center justify-between text-[11px] font-mono leading-none">
                <span className="text-[#FF724E] font-bold">GOOGLE_MAPS_PLATFORM_KEY</span>
                <button 
                  onClick={handleCopyCode}
                  className="p-1 text-slate-400 hover:text-slate-600 cursor-pointer"
                  title="Copy secret name"
                >
                  {copiedSecret ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-orange-50 text-[#FF724E] font-black text-[10px] shrink-0">3</span>
            <div className="font-normal text-[11px] leading-relaxed space-y-1">
              <p>
                Click <strong>Settings</strong> (⚙️ gear button in top-right) &rarr; <strong>Secrets</strong>.
              </p>
              <p className="text-[10px] text-[#59C7F5] font-semibold">
                Once saved, the daycare system compiles instantly with active Maps.
              </p>
            </div>
          </div>
        </div>

        {/* Local interactive fallback box simulating map positions */}
        <div className="bg-orange-50/20 border border-orange-105 rounded-2xl p-4 flex items-center gap-3.5">
          <div className="p-2.5 bg-white rounded-xl shadow-xs shrink-0">
            📍
          </div>
          <div>
            <h4 className="font-extrabold text-[11px] text-gray-800">Saskatchewan Coordinates Centered:</h4>
            <p className="text-[10px] text-gray-400 font-semibold uppercase mt-0.5 tracking-wider">Lat: {REGINA_CENTER.lat} | Lng: {REGINA_CENTER.lng}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50/35 border border-orange-50/15 rounded-3xl p-5 space-y-5">
      
      {/* Route Inputs Panel */}
      <div className="bg-white p-4.5 rounded-2xl border border-gray-150 space-y-3.5">
        <div className="flex items-center gap-1.5 text-xs font-extrabold text-slate-800">
          <Navigation className="w-4.5 h-4.5 text-[#FF724E] animate-pulse" />
          <span>Interactive Directions & Routing</span>
        </div>

        <form onSubmit={handleGetDirections} className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            placeholder="Starting address in Regina (e.g., Regina Downtown)"
            value={originInput}
            onChange={(e) => setOriginInput(e.target.value)}
            className="flex-1 bg-slate-50 border border-gray-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#FF724E] focus:bg-white"
          />
          <div className="flex gap-2">
            <select
              value={travelMode}
              onChange={(e) => setTravelMode(e.target.value as any)}
              className="bg-slate-50 border border-gray-200 rounded-xl px-2 py-2 text-xs font-semibold text-gray-700 outline-none"
            >
              <option value="DRIVING">🚗 Drive</option>
              <option value="WALKING">🚶 Walk</option>
              <option value="BICYCLING">🚲 Bike</option>
              <option value="TRANSIT">🚇 Transit</option>
            </select>
            <button
              type="submit"
              className="px-4 py-2 bg-[#FF724E] hover:bg-[#e05b38] text-white rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer transition-colors"
            >
              Go
            </button>
            {activeOrigin && (
              <button
                type="button"
                onClick={clearRoute}
                className="px-2.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-500 rounded-xl text-xs font-bold cursor-pointer"
              >
                Reset
              </button>
            )}
          </div>
        </form>

        {/* Quick Presets list */}
        <div className="flex flex-wrap gap-1.5 items-center">
          <span className="text-[10px] text-gray-450 font-bold uppercase mr-1">Quick Starts:</span>
          {presets.map((preset, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setOriginInput(preset.address);
                setActiveOrigin(preset.address);
              }}
              className="text-[10px] bg-slate-50 hover:bg-orange-50/30 border border-gray-150 hover:border-orange-200 px-2 py-1 rounded-lg text-slate-650 font-medium transition-colors cursor-pointer"
            >
              📍 {preset.name}
            </button>
          ))}
        </div>

        {/* Directions Meta info feedback */}
        {routeInfo && (
          <div className="bg-emerald-50 text-emerald-800 border border-emerald-150 rounded-xl p-3 flex justify-between items-center text-xs font-bold leading-normal animate-fade-in animate-duration-300 select-text">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-500" />
              <span>Route Calculated Successfully!</span>
            </div>
            <div className="flex items-center gap-4 text-[11px] font-mono">
              <span className="bg-white border text-slate-800 px-2 py-0.5 rounded-md">📏 {routeInfo.distance}</span>
              <span className="bg-white border text-slate-800 px-2 py-0.5 rounded-md">⏱️ {routeInfo.duration}</span>
            </div>
          </div>
        )}

        {routeError && (
          <div className="bg-rose-50 text-rose-800 border border-rose-150 rounded-xl p-3 text-xs font-semibold animate-fade-in">
            ⚠️ {routeError}
          </div>
        )}
      </div>

      {/* Actual Live Map Panel Frame */}
      <div className="w-full h-80 rounded-2xl relative border border-gray-250 overflow-hidden shadow-xs relative">
        <APIProvider apiKey={API_KEY} version="weekly">
          <Map
            defaultCenter={REGINA_CENTER}
            defaultZoom={15}
            mapId="PEEKABOO_MAP_ID"
            internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
            style={{ width: "100%", height: "100%" }}
            gestureHandling="cooperative"
            disableDefaultUI={false}
          >
            {/* Draw Marker at Peekaboo Corner Daycare */}
            <AdvancedMarker 
              ref={markerRef}
              position={REGINA_CENTER} 
              onClick={() => setInfoWindowOpen(prev => !prev)}
            >
              <Pin 
                background="#FF724E" 
                borderColor="#fff" 
                glyphColor="#fff" 
                scale={1.1} 
              />
            </AdvancedMarker>

            {/* Display Infowindow descriptive layout */}
            {infoWindowOpen && (
              <InfoWindow 
                anchor={marker} 
                onCloseClick={() => setInfoWindowOpen(false)}
                headerContent={<strong className="text-gray-900 font-extrabold text-[11px]">Peekaboo Corner Regina</strong>}
                maxWidth={220}
              >
                <div className="text-[10px] text-gray-700 leading-normal font-medium space-y-1">
                  <p className="font-bold text-[#FF724E]">{CENTER_ADDRESS}</p>
                  <p className="text-gray-400">Hours: 7:00 AM - 6:00 PM</p>
                  <p className="font-semibold text-[#59C7F5]">Government Licensed Early Care</p>
                </div>
              </InfoWindow>
            )}

            {/* Compute route directions overlay overlay */}
            <RouteDisplay
              origin={activeOrigin}
              destination={REGINA_CENTER}
              travelMode={travelMode}
              onRouteComputed={(info, error) => {
                setRouteInfo(info);
                setRouteError(error || null);
              }}
            />
          </Map>
        </APIProvider>
      </div>

      <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider flex items-center justify-between px-1 select-none">
        <span>📍 Regina Daycare Coordinates Indexed</span>
        <span className="text-sky-505">Treaty 4 Territory Campus</span>
      </div>
    </div>
  );
}
