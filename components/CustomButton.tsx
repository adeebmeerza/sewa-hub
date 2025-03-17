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
  ...props
}: Props) => {
  return (
    <Button
      variant={variant}
      className={cn("p-4 min-h-12", className)}
      {...props}
    >
      {icon && <span>{icon}</span>}
      {children}
    </Button>
  );
};

export default CustomButton;
