import { getSeverityColor } from "@/lib/helpers";
import { useIncidents } from "./IncidentsContext";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export const NewIncident = () => {
  const { newIncidentAlert, setNewIncidentAlert, setSelectedIncidentId } =
    useIncidents();

  const handleClick = () => {
    if (newIncidentAlert) {
      setSelectedIncidentId(newIncidentAlert.id);
      setNewIncidentAlert(null);
    }
  };

  return (
    <div className="flex h-full items-end">
      {newIncidentAlert && (
        <Alert
          onClick={handleClick}
          className="w-1/3 min-w-50 max-w-80 h-2em ml-auto right-12 bottom-12 cursor-pointer"
        >
          <AlertTitle className="flex text-lg gap-2 items-center">
            {newIncidentAlert.title}
            <AlertCircle
              className={`w-6 h-6 ${getSeverityColor(
                newIncidentAlert.severity
              )} rounded-full`}
            />
          </AlertTitle>
          <AlertDescription className="text-sm text-gray-600 mb-2">{`${formatDistanceToNow(
            newIncidentAlert.timestamp
          )} ago`}</AlertDescription>

          <AlertDescription>{newIncidentAlert.description}</AlertDescription>
        </Alert>
      )}
    </div>
  );
};
