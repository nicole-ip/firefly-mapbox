import { IncidentSeverity } from "@/lib/models";
import { mockIncidents } from "@/lib/mockIncidents";

export type BoundValues = [[number, number], [number, number]];

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

// Generating random coordinates around a 1km radius of the inital starting point (Manhattan)
const generateRandomCoordinates = (coords: number[]): [number, number] => {
  const [long, lat] = coords;
  const latAdjustment = () => (Math.random() - 0.5) * 0.018;
  const lonAdjustment = () => (Math.random() - 0.5) * 0.0236;

  const newLongitude = long + lonAdjustment();
  const newLatitude = lat + latAdjustment();

  return [newLongitude, newLatitude];
};

const generateRandomNumber = (max: number) => {
  return Math.floor(Math.random() * max);
};

// To take one of the pre-written coordinates and overwriting id / location / severity
export const createNewIncident = () => {
  const randomIdx = Math.floor(Math.random() * mockIncidents.length);
  const mockIncident = mockIncidents[randomIdx];

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
