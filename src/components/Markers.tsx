import { Marker, Popup } from "react-map-gl/mapbox";
import { useIncidents } from "./IncidentsContext";
import { AlertCircle } from "lucide-react";
import { getSeverityColor } from "@/lib/helpers";

export const Markers = () => {
  const { incidents, selectedIncidentId, setSelectedIncidentId } =
    useIncidents();

  return (
    <>
      {incidents.map((incident) => {
        return (
          <Marker
            key={incident.id}
            longitude={incident.location[0]}
            latitude={incident.location[1]}
            onClick={(e) => {
              e.originalEvent.stopPropagation();
              setSelectedIncidentId(incident.id);
            }}
            className="cursor-pointer"
          >
            {selectedIncidentId === incident.id && (
              <Popup
                longitude={incident.location[0]}
                latitude={incident.location[1]}
                onClose={() => setSelectedIncidentId(null)}
              >
                {incident.title}
              </Popup>
            )}
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
