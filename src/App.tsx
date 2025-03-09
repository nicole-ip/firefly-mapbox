import { useRef, useState } from "react";
import Map, { GeolocateControl } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import "./App.css";

import { EventSheet } from "@/components/EventSheet";
import { Markers } from "@/components/Markers";
import EventsProvider from "@/components/EventsContext";

function App() {
  const geoControlRef = useRef<mapboxgl.GeolocateControl>(null);
  const [isMoveEnd, setIsMoveEnd] = useState<boolean>(false);

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
      <EventsProvider isMoveEnd={isMoveEnd}>
        <EventSheet />
        <Markers />
      </EventsProvider>
    </Map>
  );
}

export default App;
