"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import CustomButton from "../ui/reusable/custom-button";
import { Loader2 } from "lucide-react";

const loginSchema = z.object({
  email: z.string().email("Please enter valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

interface UserData {
  id: string;
  name: string;
  email: string;
}

interface LoginFormProps {
  onSuccess: (userData: UserData) => void;
  onForgotPassword: () => void;
}

const LoginForm = ({ onSuccess, onForgotPassword }: LoginFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: LoginFormValues) {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // In a real app, you would call your authentication API here
      // const response = await signIn(data.email, data.password)

      // For demo purposes, we'll just simulate a successful login
      const userData = {
        id: "user_123",
        name: "John Doe",
        email: data.email,
      };

      onSuccess(userData);
    } catch (err) {
      setError("Invalid email or password. Please try again.");
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      {error && (
        <div className="bg-destructive/15 text-destructive text-sm p-3 rounded-md">
          {error}
        </div>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel hidden>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Email"
                    type="email"
                    autoComplete="email"
                    disabled={isLoading}
                    {...field}
                    className="py-6 px-4"
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel hidden>Password</FormLabel>

                <FormControl>
                  <Input
                    placeholder="Password"
                    type="password"
                    autoComplete="current-password"
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
            variant="ghost"
            size="sm"
            className="text-xs w-auto"
            onClick={(e) => {
              e.preventDefault();
              onForgotPassword();
            }}
            disabled={isLoading}
          >
            Forgot your password?
          </CustomButton>

          <CustomButton
            size="xl"
            type="submit"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin" />
                Logging in...
              </>
            ) : (
              "Log In"
            )}
          </CustomButton>
        </form>
      </Form>
    </div>
  );
};

export default LoginForm;
