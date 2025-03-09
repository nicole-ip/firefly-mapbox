import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useIncidents } from "./IncidentsContext";
import { formatDistanceToNow } from "date-fns";
import { AlertCircle } from "lucide-react";
import { getSeverityColor } from "@/lib/helpers";
import { useEffect, useState } from "react";

export const EventSheet = () => {
  const { incidents, selectedIncident, setSelectedIncident } = useIncidents();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    if (selectedIncident) {
      setIsOpen(true);
    }
  }, [selectedIncident]);

  return (
    <Sheet modal={false} open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger className="relative z-100">{">>>>"}</SheetTrigger>
      <SheetContent
        side="left"
        onPointerDownOutside={(e) => {
          e.preventDefault();
          setSelectedIncident(null);
        }}
      >
        <SheetHeader>
          <SheetTitle>Live Events Near You</SheetTitle>
          <SheetDescription>You can see blah blah</SheetDescription>
          <div className="flex flex-col-reverse gap-3 mt-4 h-200 overflow-y-scroll">
            {incidents.map((incident) => {
              return (
                <div
                  key={incident.id}
                  className={`border-1  p-4 rounded-md ${
                    selectedIncident === incident.id
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
                </div>
              );
            })}
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};
