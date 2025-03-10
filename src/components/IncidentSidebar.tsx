import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useIncidents } from "./IncidentsContext";
import { formatDistanceToNow } from "date-fns";
import { AlertCircle } from "lucide-react";
import { getSeverityColor } from "@/lib/helpers";
import { useRef, useEffect } from "react";

const InnerContent = () => {
  const cardRefs = useRef<null | Map<number, HTMLDivElement | null>>(null);
  const { selectedIncidentId, setSelectedIncidentId, incidents } =
    useIncidents();

  const getMap = () => {
    if (!cardRefs.current) {
      cardRefs.current = new Map();
    }
    return cardRefs.current;
  };

  // Could be custom hook
  useEffect(() => {
    if (selectedIncidentId) {
      const map = getMap();
      const node = map.get(selectedIncidentId);
      if (node) {
        node.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }
  }, [selectedIncidentId]);

  return (
    <SheetHeader>
      <SheetTitle className="text-lg">Incidents in the Area</SheetTitle>
      <div className="flex flex-col-reverse gap-3 mt-4">
        {incidents.map((incident) => {
          return (
            <div
              ref={(node) => {
                const map = getMap();
                if (node) {
                  map.set(incident.id, node);
                }
                return () => {
                  map.delete(incident.id);
                };
              }}
              onClick={() => setSelectedIncidentId(incident.id)}
              key={incident.id}
              className={`border-1  p-4 rounded-md ${
                selectedIncidentId === incident.id
                  ? "border-blue-500 bg-blue-200"
                  : "border-gray-500"
              }`}
            >
              <h1 className="inline-flex gap-2 font-bold text-lg">
                {incident.title}
                <AlertCircle
                  className={`w-6 h-6 ${getSeverityColor(
                    incident.severity
                  )} rounded-full`}
                />
              </h1>
              <p>{incident.description}</p>
              <p className="text-sm text-gray-600 mb-2">{`${formatDistanceToNow(
                incident.timestamp
              )} ago`}</p>
              {selectedIncidentId === incident.id && (
                <p className="text-sm">
                  More information regarding this incident. What people saw.
                  What neighborhood. Ipsum Lorem.
                </p>
              )}
            </div>
          );
        })}
      </div>
    </SheetHeader>
  );
};

export const IncidentSidebar = () => {
  const { selectedIncidentId } = useIncidents();
  const isOpen = !!selectedIncidentId;

  return (
    <Sheet modal={false} open={isOpen}>
      <SheetContent side="left" className="overflow-y-scroll">
        <InnerContent />
      </SheetContent>
    </Sheet>
  );
};
