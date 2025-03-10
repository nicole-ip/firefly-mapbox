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

export const IncidentSidebar = () => {
  const { incidents, selectedIncidentId, setSelectedIncidentId } =
    useIncidents();
  const selectedCardRef = useRef<HTMLDivElement | null>(null);

  const isOpen = !!selectedIncidentId;

  useEffect(() => {
    if (selectedIncidentId && selectedCardRef.current) {
      selectedCardRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [selectedIncidentId]);

  return (
    <Sheet modal={false} open={isOpen}>
      <SheetContent side="left" className="overflow-y-scroll">
        <SheetHeader>
          <SheetTitle className="text-lg">Incidents in the Area</SheetTitle>
          <div className="flex flex-col-reverse gap-3 mt-4">
            {incidents.map((incident) => {
              return (
                <div
                  ref={
                    selectedIncidentId === incident.id ? selectedCardRef : null
                  }
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
      </SheetContent>
    </Sheet>
  );
};
