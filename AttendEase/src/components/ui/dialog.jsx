import * as React from "react";
import { Dialog as HeadlessDialog } from "@headlessui/react";
import { X } from "lucide-react";

export function Dialog({ open, onOpenChange, children }) {
  return (
    <HeadlessDialog open={open} onClose={onOpenChange}>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        {children}
      </div>
    </HeadlessDialog>
  );
}

export function DialogTrigger({ children, onClick }) {
  return (
    <button onClick={onClick} className="inline-flex items-center justify-center">
      {children}
    </button>
  );
}

export function DialogContent({ children }) {
  return (
    <div className="w-full max-w-lg rounded-lg bg-white p-6 shadow-lg">
      {children}
    </div>
  );
}

export function DialogHeader({ children }) {
  return <div className="mb-4 flex items-start justify-between">{children}</div>;
}

export function DialogTitle({ children }) {
  return <h2 className="text-lg font-semibold">{children}</h2>;
}

export function DialogFooter({ children }) {
  return <div className="mt-4 flex justify-end gap-2">{children}</div>;
}

export function DialogDescription({ children }) {
  return <p className="text-sm text-gray-300">{children}</p>;
}
