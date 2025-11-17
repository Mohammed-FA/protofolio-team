import { FC, ReactNode } from "react";
import { Button, buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";
import type { VariantProps } from "class-variance-authority";

interface SocialSignButtonProps extends VariantProps<typeof buttonVariants> {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}

const SocialSignButton: FC<SocialSignButtonProps> = ({
  children,
  variant = "secondary",
  size = "default",
  className,
  onClick,
  ...props
}) => {
  return (
    <Button
      variant={variant}
      size={size}
      onClick={onClick}
      className={cn(
        "w-full flex justify-center items-center px-6 py-3 rounded-xl shadow-sm",
        className
      )}
      {...props}
    >
      {children}
    </Button>
  );
};

export default SocialSignButton;
