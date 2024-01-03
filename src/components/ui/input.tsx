import * as React from "react";

import { cn } from "~~/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  onShowPassword?: () => void;
  isPassword?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, onShowPassword, isPassword = false, ...props }, ref) => {
    return (
      <div className="flex relative">
        <input
          type={type}
          className={cn(
            "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          {...props}
        />
        {isPassword && (
          <button
            onClick={onShowPassword}
            className={`uppercase text-xs text-highlight absolute bg-inherit top-0 bottom-0 right-0 my-0.5 mr-0.5 pl-2 pr-4`}
          >
            {type === "password" ? "Show" : "Hide"}
          </button>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
