import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useEvents } from "./EventsContext";
import { formatDistanceToNow } from "date-fns";
import { AlertCircle } from "lucide-react";
import { getSeverityColor } from "@/lib/helpers";

export const EventSheet = () => {
  const events = useEvents();

  return (
    <Sheet modal={false}>
      <SheetTrigger className="relative z-100">{">>>>"}</SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Live Events Near You</SheetTitle>
          <SheetDescription>You can see blah blah</SheetDescription>
          <div className="flex flex-col gap-3 mt-4 h-200 overflow-y-scroll">
            {events.map((event) => {
              return (
                <div className="border-1 border-gray-500 p-4 rounded-md">
                  <h1 className="inline-flex gap-2 font-bold text-lg">
                    {event.title}
                    <AlertCircle
                      className={`w-6 h-6 ${getSeverityColor(
                        event.severity
                      )} rounded-full`}
                    />
                  </h1>
                  <p>{event.description}</p>
                  <p className="text-sm text-gray-600 mb-2">{`${formatDistanceToNow(
                    event.timestamp
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
