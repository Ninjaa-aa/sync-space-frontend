// src/components/ui/avatar.tsx
import * as React from "react";

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children?: React.ReactNode;
}

export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ className = "", children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full items-center justify-center bg-gray-700 text-white ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Avatar.displayName = "Avatar";