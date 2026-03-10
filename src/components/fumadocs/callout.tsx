import { cn } from "@/lib/utils";
import { Info, AlertTriangle, AlertCircle, CheckCircle2, XCircle } from "lucide-react";
import React from "react";

const icons = {
  info: Info,
  warning: AlertTriangle,
  error: AlertCircle,
  success: CheckCircle2,
  danger: XCircle,
};

const styles = {
  info: "bg-blue-50 border-blue-200 text-blue-900",
  warning: "bg-amber-50 border-amber-200 text-amber-900",
  error: "bg-red-50 border-red-200 text-red-900",
  success: "bg-green-50 border-green-200 text-green-900",
  danger: "bg-red-50 border-red-200 text-red-900",
};

const iconStyles = {
  info: "text-blue-500",
  warning: "text-amber-500",
  error: "text-red-500",
  success: "text-green-500",
  danger: "text-red-500",
};

interface CalloutProps {
  type?: "info" | "warning" | "error" | "success" | "danger";
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export function Callout({
  type = "info",
  title,
  children,
  className,
}: CalloutProps) {
  const Icon = icons[type];
  
  return (
    <div
      className={cn(
        "my-6 flex gap-3 rounded-lg border p-4",
        styles[type],
        className
      )}
    >
      <Icon className={cn("h-5 w-5 shrink-0 mt-0.5", iconStyles[type])} />
      <div className="flex-1 space-y-2">
        {title && <p className="font-semibold">{title}</p>}
        <div className="text-sm leading-relaxed">{children}</div>
      </div>
    </div>
  );
}
