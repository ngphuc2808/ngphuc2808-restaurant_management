"use client";

import { useRouter } from "next/navigation";
import React from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@repo/ui/components/dialog";

const Modal = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [open, setOpen] = React.useState(true);

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        setOpen(open);
        setTimeout(() => {
          if (!open) {
            router.back();
          }
        }, 200);
      }}
    >
      <DialogContent className="max-h-full overflow-auto">
        <DialogHeader className="hidden">
          <DialogTitle></DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
