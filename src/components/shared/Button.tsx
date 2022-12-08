import React from "react";
import clsx from "clsx";
import Spinner from "./Spinner";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "outline" | "text";
  loading?: boolean;
};

const Button = ({
  disabled,
  variant = "primary",
  children,
  type = "button",
  loading = false,
  ...props
}: ButtonProps) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className={clsx(
        "inline-flex justify-center rounded-md border border-blue-600 py-2 px-4 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed w-40",
        variant === "primary" && "bg-blue-600 text-white hover:bg-blue-700",
        variant === "outline" && "bg-white text-blue-600 hover:bg-gray-100"
      )}
      {...props}
    >
      {loading && <Spinner />}

      {children}
    </button>
  );
};

export default Button;
