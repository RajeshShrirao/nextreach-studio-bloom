import { cn } from "@/lib/utils";
import React from "react";

interface StepsProps {
  children: React.ReactNode;
  className?: string;
}

export function Steps({ children, className }: StepsProps) {
  return (
    <div className={cn("relative ml-4 border-l-2 border-slate-200 pl-6", className)}>
      {children}
    </div>
  );
}

interface StepProps {
  children: React.ReactNode;
  title?: string;
}

export function Step({ children, title }: StepProps) {
  return (
    <div className="relative pb-8 last:pb-0">
      <div className="absolute -left-[31px] top-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-slate-900 text-xs font-semibold text-white">
        •
      </div>
      {title && (
        <h4 className="mb-2 font-semibold text-slate-900">{title}</h4>
      )}
      <div className="text-slate-700">{children}</div>
    </div>
  );
}
