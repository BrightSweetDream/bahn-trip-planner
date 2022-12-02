import React from "react";
import clsx from "clsx";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "outline" | "text";
};

const Button = ({
  disabled,
  variant = "primary",
  children,
  type = "button",
  ...props
}: ButtonProps) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className={clsx(
        "inline-flex justify-center rounded-md border border-green-600 py-2 px-4 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed",
        variant === "primary" && "bg-green-600 text-white hover:bg-green-700",
        variant === "outline" && "bg-white text-green-600 hover:bg-gray-100"
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
