export type BoundValues = [[number, number], [number, number]];

enum EventType {
  FIRE = "Fire",
  ROAD = "Traffic Accident",
  FIGHT = "Physical Altercation",
  FLOOD = "Flood Warning",
  POWER = "Power Outage",
  INDIVIDUAL = "Dangerous Individual",
}

const NUMBER_OF_EVENT_TYPES = 6;

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

export const generateRandomEvents = (bounds: BoundValues) => {
  const events = [];

  for (let i = 0; i < 10; i++) {
    events.push({
      name: generateRandomEventType(),
      description: "Something happening here",
      location: generateRandomCoords(bounds),
      icon: "Fire",
    });
  }

  return events;
};
