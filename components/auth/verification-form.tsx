"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import CustomButton from "../CustomButton";

const verificationSchema = z.object({
  code: z.string().min(4, "Please enter the verification code"),
});

type VerificationFormValues = z.infer<typeof verificationSchema>;

interface VerificationFormProps {
  onSuccess: () => void;
  onResend: () => void;
}

const VerificationForm = ({ onSuccess, onResend }: VerificationFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (countdown > 0 && !canResend) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0 && !canResend) {
      setCanResend(true);
    }
  }, [countdown, canResend]);

  const handleResend = () => {
    setCanResend(false);
    setCountdown(60);
    onResend();
  };

  const form = useForm<VerificationFormValues>({
    resolver: zodResolver(verificationSchema),
    defaultValues: {
      code: "",
    },
  });

  async function onSubmit(data: VerificationFormValues) {
    setIsLoading(true);
    setError(null);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // In a real app, you would call your verification API here
      // const response = await verifyCode(identifier, data.code)

      // For demo purposes, we'll just simulate a successful verification
      // Check if code is "1234" for demo purposes
      if (data.code === "1234") {
        onSuccess();
      } else {
        setError("Invalid verification code. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-4">
      {error && (
        <div className="bg-destructive/15 text-destructive text-sm p-3 rounded-md">
          {error}
        </div>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Enter verification code"
                    disabled={isLoading}
                    {...field}
                    className="py-6 px-4"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <CustomButton
            type="submit"
            size="xl"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? "Verifying..." : "Verify"}
          </CustomButton>
        </form>
      </Form>

      <div className="text-center text-sm">
        {canResend ? (
          <CustomButton
            variant="link"
            onClick={handleResend}
            className="h-auto p-0"
          >
            Resend code
          </CustomButton>
        ) : (
          <p className="text-muted-foreground">
            Resend code in {countdown} seconds
          </p>
        )}
      </div>

      <div className="text-center text-xs text-muted-foreground">
        <p>For demo purposes, use code: 1234</p>
      </div>
    </div>
  );
};

export default VerificationForm;
