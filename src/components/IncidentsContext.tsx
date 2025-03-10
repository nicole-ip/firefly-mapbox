import { createContext, useContext, useEffect, useState } from "react";
import { useMap } from "react-map-gl/mapbox";
import { mockIncidents } from "@/lib/mockIncidents";
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

  /**
   * After the map is done moving we set the initial mock incidents
   * They are all centered around Manhattan.
   * I could have used some library like Faker-js to generate the mock data within the bounds of the map.
   */
  useEffect(() => {
    if (!map || !isMoveEnd) return;
    setIncidents(mockIncidents);
  }, [map, isMoveEnd]);

  /**
   * Generate a new incident every 20 seconds.
   * In a larger application I would move this out of context and use a state management tool instead.
   * As every time I generate a new incident it rerenders all its children.
   * However I thought this was appropriate for a smaller app.
   */
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
