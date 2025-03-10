export type IncidentType =
  | "crime"
  | "emergency"
  | "weather"
  | "traffic"
  | "hazard";

export enum IncidentSeverity {
  HIGH,
  MEDIUM,
  LOW,
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
