import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

interface Props extends React.ComponentProps<typeof Button> {
  icon?: ReactNode;
}

const CustomButton = ({
  variant,
  className,
  icon,
  children,
  type,
  ...props
}: Props) => {
  return (
    <Button
      type={type}
      variant={variant}
      className={cn(
        "text-[13px] sm:text-sm font-medium tracking-wide",
        className
      )}
      {...props}
    >
      {icon && <span>{icon}</span>}
      {children}
    </Button>
  );
};

export default CustomButton;
