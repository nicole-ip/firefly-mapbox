import { EventType } from "@/components/EventsContext";
export type BoundValues = [[number, number], [number, number]];

const NUMBER_OF_EVENT_TYPES = 3;

enum EventSeverity {
  LOW,
  MEDIUM,
  HIGH,
}

const generateRandomEventType = () => {
  const idx = Math.floor(Math.random() * NUMBER_OF_EVENT_TYPES);
  return Object.values(EventType)[idx];
};

const generateRandomCoords = (bounds: BoundValues) => {
  const [[minLong, minLat], [maxLong, maxLat]] = bounds;
  const randomLong = Math.random() * (maxLong - minLong) + minLong;
  const randomLat = Math.random() * (maxLat - minLat) + minLat;

  return [randomLong, randomLat];
};

// generate a random minute between 0 to 60(?) can change
const generateRandomTime = () => {
  return Math.floor(Math.random() * 60);
};

const generateRandomNumber = (max: number) => {
  return Math.floor(Math.random() * max);
};

export const generateRandomEvents = (bounds: BoundValues) => {
  const events = [];

  for (let i = 0; i < 10; i++) {
    events.push({
      title: generateRandomEventType(),
      description: "Something happening here",
      type: generateRandomEventType(),
      location: generateRandomCoords(bounds),
      timestamp: new Date(Date.now() - 1000 * 60 * generateRandomTime()),
      severity: generateRandomNumber(3),
    });
  }

  return events;
};

export const getSeverityColor = (severity: EventSeverity) => {
  switch (severity) {
    case EventSeverity.HIGH:
      return "bg-red-500";
    case EventSeverity.MEDIUM:
      return "bg-yellow-500";
    case EventSeverity.LOW:
      return "bg-blue-500";
    default:
      return "bg-gray-500";
  }
};
