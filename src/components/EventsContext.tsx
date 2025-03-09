import { createContext, useContext, useEffect, useState } from "react";
import { generateRandomEvents } from "@/lib/helpers";
import { useMap } from "react-map-gl/mapbox";

interface Event {
  name: string;
  description: string;
  location: [number, number];
  icon: string;
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
    console.log(isMoveEnd);
    const bounds = map.getBounds();
    const boundsArray = bounds?.toArray();
    const randomEvents = generateRandomEvents(boundsArray);
    setEvents(randomEvents);
  }, [map, isMoveEnd]);

  console.log(events);

  return (
    <EventsContext.Provider value={events}>{children}</EventsContext.Provider>
  );
}
