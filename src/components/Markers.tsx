import { Marker } from "react-map-gl/mapbox";
import { useIncidents } from "./IncidentsContext";
import { AlertCircle } from "lucide-react";
import { getSeverityColor } from "@/lib/helpers";

export const Markers = () => {
  const { incidents, setSelectedIncident } = useIncidents();

  return (
    <>
      {incidents.map((incident) => {
        return (
          <Marker
            key={incident.id}
            longitude={incident.location[0]}
            latitude={incident.location[1]}
            onClick={() => setSelectedIncident(incident.id)}
          >
            <AlertCircle
              className={`w-6 h-6 ${getSeverityColor(
                incident.severity
              )} rounded-full`}
            />
          </Marker>
        );
      })}
    </>
  );
};
