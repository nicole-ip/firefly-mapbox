import { useEffect, useRef, useState } from "react";
import Map, { GeolocateControl } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import "./App.css";

import IncidentsProvider from "@/components/IncidentsContext";
import { IncidentSidebar } from "@/components/IncidentSidebar";
import { Markers } from "@/components/Markers";
import { NewIncident } from "@/components/NewIncident";

function App() {
  const geoControlRef = useRef<mapboxgl.GeolocateControl>(null);
  const [isMoveEnd, setIsMoveEnd] = useState<boolean>(false);

  useEffect(() => {
    if (geoControlRef.current) {
      geoControlRef.current.trigger();
    }
  }, []);

  return (
    <Map
      mapboxAccessToken={import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}
      initialViewState={{
        longitude: -73.989723,
        latitude: 40.741112,
        zoom: 14,
      }}
      mapStyle="mapbox://styles/mapbox/dark-v11"
      onMoveEnd={() => setIsMoveEnd(true)}
    >
      <GeolocateControl ref={geoControlRef} />
      <IncidentsProvider isMoveEnd={isMoveEnd}>
        <IncidentSidebar />
        <Markers />
        <NewIncident />
      </IncidentsProvider>
    </Map>
  );
}

export default App;
