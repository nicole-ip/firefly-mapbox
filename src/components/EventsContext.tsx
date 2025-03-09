import { createContext, useContext, useEffect, useState } from "react";
import { generateRandomEvents } from "@/lib/helpers";
import { useMap } from "react-map-gl/mapbox";
import { mockEvents } from "@/lib/mockEvents";

export enum EventType {
  CRIME = "crime",
  EMERGENCY = "emergency",
  WEATHER = "weather",
}

enum EventSeverity {
  LOW,
  MEDIUM,
  HIGH,
}
interface Event {
  id: number;
  title: string;
  description: string;
  type: EventType;
  location: [number, number];
  timestamp: Date;
  severity: EventSeverity;
}

const EventsContext = createContext<Event[] | null>(null);

export const useEvents = () => {
  const events = useContext(EventsContext);
  if (!events) throw new Error("Cna only use inside EventsProvider");
  return events;
};

export default function EventsProvider({
  children,
  isMoveEnd,
}: {
  children: React.ReactNode;
  isMoveEnd: boolean;
}) {
  const { current: map } = useMap();
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    if (!map) return;
    if (!isMoveEnd) return;
    // console.log(isMoveEnd);
    // const bounds = map.getBounds();
    // const boundsArray = bounds?.toArray();
    // const randomEvents = generateRandomEvents(boundsArray);
    setEvents(mockEvents);
  }, [map, isMoveEnd]);

  console.log(events);

  return (
    <EventsContext.Provider value={events}>{children}</EventsContext.Provider>
  );
}
