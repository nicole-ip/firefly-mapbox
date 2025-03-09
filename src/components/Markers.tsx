import { Marker } from "react-map-gl/mapbox";
import { useEvents } from "./EventsContext";

export const Markers = () => {
  const events = useEvents();

  return (
    <>
      {events.map((event) => {
        return (
          <Marker longitude={event.location[0]} latitude={event.location[1]} />
        );
      })}
    </>
  );
};
