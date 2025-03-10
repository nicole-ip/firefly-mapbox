import { Incident } from "./models";

export const mockIncidents: Incident[] = [
  {
    id: 2,
    title: "Suspicious Activity Reported",
    description:
      "Multiple reports of suspicious individuals in the area. Police are investigating",
    type: "crime",
    location: [-73.98325528155169, 40.73123722580573],
    timestamp: new Date(Date.now() - 1000 * 60 * 60),
    severity: 2,
  },
  {
    id: 3,
    title: "Gas Leak",
    description:
      "A gas leak has been reported. Emergency services are evacuating the area.",
    type: "hazard",
    location: [-73.98101823514325, 40.73974728279454],
    timestamp: new Date(Date.now() - 1000 * 60 * 50),
    severity: 0,
  },
  {
    id: 8,
    title: "Medical Emergency",
    description:
      "Emergency medical services responding to a call at this location.",
    type: "emergency",
    location: [-73.97188390967436, 40.75155870110358],
    timestamp: new Date(Date.now() - 1000 * 60 * 40),
    severity: 1,
  },
  {
    id: 1,
    title: "Severe Thunderstorm",
    description: "A severe thunderstorm warning has been issued for the area.",
    type: "weather",
    location: [-73.97961555095064, 40.7339885536838],
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    severity: 0,
  },
  {
    id: 4,
    title: "Traffic Collision",
    description:
      "A two-vehicle collision has occurred, causing traffic delays.",
    type: "traffic",
    location: [-73.97887320471038, 40.74557762264581],
    timestamp: new Date(Date.now() - 1000 * 60 * 20),
    severity: 2,
  },
  {
    id: 5,
    title: "Flash Flood Warning",
    description: "MTA is under water again.",
    type: "weather",
    location: [-74.00241574713749, 40.74407659571911],
    timestamp: new Date(Date.now() - 1000 * 60 * 18),
    severity: 1,
  },
  {
    id: 10,
    title: "Suspicious Activity Reported",
    description:
      "Multiple reports of suspicious individuals in the area. Police are investigating",
    type: "crime",
    location: [-73.97668228203092, 40.72742766443412],
    timestamp: new Date(Date.now() - 1000 * 60 * 15),
    severity: 1,
  },
  {
    id: 6,
    title: "Flash Flood Warning",
    description: "MTA is under water again.",
    type: "weather",
    location: [-73.9963380694404, 40.7295128232502],
    timestamp: new Date(Date.now() - 1000 * 60 * 10),
    severity: 2,
  },
  {
    id: 7,
    title: "Gas Leak",
    description:
      "A gas leak has been reported. Emergency services are evacuating the area.",
    type: "hazard",
    location: [-73.98088815048303, 40.7518962005801],
    timestamp: new Date(Date.now() - 1000 * 60 * 7),
    severity: 1,
  },
  {
    id: 9,
    title: "Medical Emergency",
    description:
      "Emergency medical services responding to a call at this location.",
    type: "emergency",
    location: [-73.99929330302867, 40.75124470627504],
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
    severity: 2,
  },
];
