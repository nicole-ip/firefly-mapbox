import { IncidentType, IncidentSeverity } from "@/lib/models";
import { mockEvents } from "@/lib/mockEvents";

export type BoundValues = [[number, number], [number, number]];

const incidentTypes: IncidentType[] = [
  "crime",
  "emergency",
  "weather",
  "traffic",
  "hazard",
];

const generateRandomEventType = () => {
  const idx = Math.floor(Math.random() * incidentTypes.length);
  return Object.values(incidentTypes)[idx];
};

const generateRandomCoords = (bounds: BoundValues) => {
  const [[minLong, minLat], [maxLong, maxLat]] = bounds;
  const randomLong = Math.random() * (maxLong - minLong) + minLong;
  const randomLat = Math.random() * (maxLat - minLat) + minLat;

  return [randomLong, randomLat];
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
      timestamp: new Date(Date.now() - 1000 * 60 * generateRandomNumber(60)),
      severity: "low",
    });
  }

  return events;
};

export const getSeverityColor = (severity: IncidentSeverity) => {
  switch (severity) {
    case IncidentSeverity.HIGH:
      return "bg-red-500";
    case IncidentSeverity.MEDIUM:
      return "bg-yellow-500";
    case IncidentSeverity.LOW:
      return "bg-blue-500";
    default:
      return "bg-gray-500";
  }
};

// +/- 0.009 degrees for latitude +/-0.0118 degrees for longitude in 1km radius
const generateRandomCoordinates = (coords: number[]): [number, number] => {
  const [long, lat] = coords;
  const latAdjustment = () => (Math.random() - 0.5) * 0.018;
  const lonAdjustment = () => (Math.random() - 0.5) * 0.0236;

  const newLongitude = long + lonAdjustment();
  const newLatitude = lat + latAdjustment();

  return [newLongitude, newLatitude];
};

export const createNewIncident = () => {
  const randomIdx = Math.floor(Math.random() * mockEvents.length);
  const mockIncident = mockEvents[randomIdx];

  // To take one of the pre-written title / description / type from mocks
  // Overwriting id / location / severity
  const location = generateRandomCoordinates(mockIncident.location);
  const timestamp = new Date();
  const severity = generateRandomNumber(3);

  const newIncident = {
    ...mockIncident,
    id: Date.now(),
    location,
    timestamp,
    severity,
  };

  return newIncident;
};
