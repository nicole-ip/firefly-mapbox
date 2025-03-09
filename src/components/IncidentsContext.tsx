import { createContext, useContext, useEffect, useState } from "react";
import { generateRandomEvents } from "@/lib/helpers";
import { useMap } from "react-map-gl/mapbox";
import { mockEvents } from "@/lib/mockEvents";

export enum IncidentType {
  CRIME = "crime",
  EMERGENCY = "emergency",
  WEATHER = "weather",
}

enum IncidentSeverity {
  LOW,
  MEDIUM,
  HIGH,
}

export interface Incident {
  id: number;
  title: string;
  description: string;
  type: IncidentType;
  location: [number, number];
  timestamp: Date;
  severity: IncidentSeverity;
}

interface IncidentsState {
  incidents: Incident[];
  selectedIncident: number | null;
  setSelectedIncident: (id: number | null) => void;
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
  const [selectedIncident, setSelectedIncident] = useState<number | null>(null);

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
      const nextIdx = incidents.length;
      //
    }, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const providerValue = {
    incidents,
    selectedIncident,
    setSelectedIncident,
  };

  return (
    <IncidentsContext.Provider value={providerValue}>
      {children}
    </IncidentsContext.Provider>
  );
}
