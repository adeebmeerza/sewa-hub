"use client";

import CustomButton from "../CustomButton";
import { Button } from "../ui/button";

interface AuthMenuProps {
  onLogin: () => void;
  onSignUp: () => void;
}

const AuthMenu = ({ onLogin, onSignUp }: AuthMenuProps) => {
  return (
    <div className="flex flex-col gap-4">
      <CustomButton
        variant="default"
        size="xl"
        onClick={onLogin}
        className="w-full"
      >
        Log In
      </CustomButton>
      <CustomButton
        variant="outline"
        size="lg"
        onClick={onSignUp}
        className="w-full"
      >
        Sign Up
      </CustomButton>
      <div className="text-center text-sm text-muted-foreground mt-2">
        By continuing, you agree to our{" "}
        <Button variant="link" size="sm" className="h-auto p-0">
          Terms of Service
        </Button>{" "}
        and{" "}
        <Button variant="link" size="sm" className="h-auto p-0">
          Privacy Policy
        </Button>
      </div>
    </div>
  );
};

export default AuthMenu;
