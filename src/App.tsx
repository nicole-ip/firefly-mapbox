import { useRef } from "react";
import Map, { GeolocateControl } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import "./App.css";

function App() {
  const geoControlRef = useRef<mapboxgl.GeolocateControl>(null);

  const handleMapLoad = () => {
    if (geoControlRef.current) {
      geoControlRef.current.trigger();
    }
    // and then set alternative location if geolocator doesn't work
    // or maybe just use initial
  };

  return (
    <Map
      mapboxAccessToken={import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}
      initialViewState={{
        longitude: -74.0242,
        latitude: 40.6941,
        zoom: 14,
      }}
      style={{ width: "100vw", height: "100vh" }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      onLoad={handleMapLoad}
    >
      <GeolocateControl ref={geoControlRef} />
    </Map>
  );
}

export default App;
