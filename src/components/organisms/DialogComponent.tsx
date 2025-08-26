import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { JSX } from "react";
const DialogComponent = ({
  buttonJSX,
  children,
}: {
  buttonJSX: JSX.Element;
  children: JSX.Element;
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{buttonJSX}</DialogTrigger>
      <DialogHeader>
        <DialogTitle className="sr-only">Sign In</DialogTitle>
        <DialogDescription className="sr-only">
          Authentication form
        </DialogDescription>
      </DialogHeader>
      <DialogContent>
        {children}
        </DialogContent>
    </Dialog>
  );
};

export default DialogComponent;
