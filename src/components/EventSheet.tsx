import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useEvents } from "./EventsContext";

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
                  <h1>{event.name}</h1>
                  <p>{event.description}</p>
                </div>
              );
            })}
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};
