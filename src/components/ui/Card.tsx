import * as React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function Card({ children, className = "", ...props }: CardProps) {
  return (
    <div
      className={`rounded-2xl bg-gray-900/90 border border-gray-800 shadow-lg transition hover:shadow-xl hover:border-gray-700 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  children,
  className = "",
  ...props
}: CardProps) {
  return (
    <div
      className={`px-5 pt-5 pb-3 border-b border-gray-800 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardContent({
  children,
  className = "",
  ...props
}: CardProps) {
  return (
    <div className={`px-5 py-4 ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({
  children,
  className = "",
  ...props
}: CardProps) {
  return (
    <div
      className={`px-5 pt-3 pb-5 border-t border-gray-800 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
