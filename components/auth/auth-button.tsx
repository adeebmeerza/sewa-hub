"use client";

import CustomButton from "../ui/reusable/custom-button";
import { useAuthController } from "./auth-controller";

interface AuthButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "secondary" | "ghost" | "link";
}

const AuthButton = ({
  children = "Account",
  variant = "outline",
  className,
  ...props
}: AuthButtonProps) => {
  const { showAuthMenu } = useAuthController();

  return (
    <CustomButton
      variant={variant}
      onClick={showAuthMenu}
      className={className}
      {...props}
    >
      {children}
    </CustomButton>
  );
};

export default AuthButton;
