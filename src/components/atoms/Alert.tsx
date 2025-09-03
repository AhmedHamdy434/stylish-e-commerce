import type { JSX } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
type DialogDataProps = {
  button: JSX.Element;
  head?: string;
  paragraph?: string;
  buttonName: string;
  confirmFunction: (id?: number) => void;
  id?: number;
};
const Alert = ({
  button,
  head,
  paragraph,
  confirmFunction,
  buttonName,
  id,
}: DialogDataProps) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger>{button}</AlertDialogTrigger>
      <AlertDialogContent className="rounded-[1.25rem]">
          <AlertDialogHeader>
            <AlertDialogTitle>{head}</AlertDialogTitle>
            <AlertDialogDescription>{paragraph}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-4 justify-center!">
            <AlertDialogCancel className="sm:w-[calc(50%_-_1rem)]">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => confirmFunction(id)}
              className="sm:w-[calc(50%_-_1rem)]"
            >
              {buttonName}
            </AlertDialogAction>
          </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Alert;
