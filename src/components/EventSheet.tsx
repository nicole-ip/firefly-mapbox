import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export const EventSheet = () => {
  return (
    <Sheet modal={false}>
      <SheetTrigger>{">>>>"}</SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Live Events Near You</SheetTitle>
          <SheetDescription>You can see blah blah</SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};
