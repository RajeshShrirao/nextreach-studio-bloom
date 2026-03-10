import { cn } from "@/lib/utils";
import React from "react";
import { Link } from "react-router-dom";

interface CardProps {
  title: string;
  href?: string;
  children?: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
}

export function Card({ title, href, children, className, icon }: CardProps) {
  const content = (
    <div className={cn(
      "group relative overflow-hidden rounded-xl border border-slate-200 bg-white p-5 transition-colors hover:bg-slate-50",
      href && "cursor-pointer",
      className
    )}>
      {icon && <div className="mb-3 text-slate-500">{icon}</div>}
      <h3 className="font-semibold text-slate-900">{title}</h3>
      {children && <div className="mt-2 text-sm text-slate-600">{children}</div>}
    </div>
  );

  if (href) {
    return (
      <Link to={href} className="block">
        {content}
      </Link>
    );
  }

  return content;
}

interface CardsProps {
  children: React.ReactNode;
  className?: string;
}

export function Cards({ children, className }: CardsProps) {
  return (
    <div className={cn("grid gap-4 md:grid-cols-2 lg:grid-cols-3", className)}>
      {children}
    </div>
  );
}
