"use client";

import { CheckCircle } from "lucide-react";
import CustomButton from "../ui/reusable/custom-button";

interface SuccessScreenProps {
  message: string;
  actionText: string;
  onAction: () => void;
}

export function SuccessScreen({
  message,
  actionText,
  onAction,
}: SuccessScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center py-6 text-center">
      <CheckCircle className="h-16 w-16 text-primary mb-4" />
      <p className="mb-6">{message}</p>
      <CustomButton onClick={onAction} size="xl" className="w-full">
        {actionText}
      </CustomButton>
    </div>
  );
}
