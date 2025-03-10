import { createContext, useContext, useEffect, useState } from "react";
import { useMap } from "react-map-gl/mapbox";
import { mockEvents } from "@/lib/mockEvents";
import { Incident } from "@/lib/models";
import { createNewIncident } from "@/lib/helpers";

interface IncidentsState {
  incidents: Incident[];
  selectedIncidentId: number | null;
  setSelectedIncidentId: (id: number | null) => void;
  newIncidentAlert: Incident | null;
  setNewIncidentAlert: (incident: Incident | null) => void;
}

const IncidentsContext = createContext<IncidentsState | null>(null);

export const useIncidents = () => {
  const incidents = useContext(IncidentsContext);
  if (!incidents) throw new Error("Cna only use inside EventsProvider");
  return incidents;
};

export default function IncidentsProvider({
  children,
  isMoveEnd,
}: {
  children: React.ReactNode;
  isMoveEnd: boolean;
}) {
  const { current: map } = useMap();
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [selectedIncidentId, setSelectedIncidentId] = useState<number | null>(
    null
  );
  const [newIncidentAlert, setNewIncidentAlert] = useState<Incident | null>(
    null
  );

  useEffect(() => {
    if (!map) return;
    if (!isMoveEnd) return;
    // console.log(isMoveEnd);
    // const bounds = map.getBounds();
    // const boundsArray = bounds?.toArray();
    // const randomEvents = generateRandomEvents(boundsArray);
    setIncidents(mockEvents);
  }, [map, isMoveEnd]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const newIncident: Incident = createNewIncident();
      setIncidents((prev) => [...prev, newIncident]);
      setNewIncidentAlert(newIncident);
    }, 20000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const providerValue = {
    incidents,
    selectedIncidentId,
    setSelectedIncidentId,
    newIncidentAlert,
    setNewIncidentAlert,
  };

  return (
    <IncidentsContext.Provider value={providerValue}>
      {children}
    </IncidentsContext.Provider>
  );
}
