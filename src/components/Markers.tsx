import { Marker } from "react-map-gl/mapbox";
import { useEvents } from "./EventsContext";
import { AlertCircle } from "lucide-react";
import { getSeverityColor } from "@/lib/helpers";

export const Markers = () => {
  const events = useEvents();

  return (
    <>
      {events.map((event) => {
        return (
          <Marker longitude={event.location[0]} latitude={event.location[1]}>
            <AlertCircle
              className={`w-6 h-6 ${getSeverityColor(
                event.severity
              )} rounded-full`}
            />
          </Marker>
        );
      })}
    </>
  );
};
