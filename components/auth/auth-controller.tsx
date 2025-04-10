import { useUI } from "@/app/contexts/ui-context";
import AuthMenu from "./auth-menu";
import LoginForm from "./login-form";
import { SuccessScreen } from "./success-screen";
import ForgotPasswordForm from "./forgot-password-form";
import { ResetPasswordForm } from "./reset-password-form";
import VerificationForm from "./verification-form";
import SignUpForm from "./sign-up-form";

export function useAuthController() {
  const { openDialog, closeDialog } = useUI();

  const showAuthMenu = () => {
    openDialog({
      title: "Welcome!",
      description: "Log in or sign up to continue",
      content: <AuthMenu onLogin={showLogin} onSignUp={showSignUp} />,
    });
  };

  const showLogin = () => {
    openDialog({
      title: "Log In",
      description: "Log in to access the gear you need—when you need it.",
      content: (
        <LoginForm
          onForgotPassword={showForgotPassword}
          onSuccess={handleLoginSuccess}
        />
      ),
      showBackButton: true,
      onBackClick: showAuthMenu,
    });
  };

  const showSignUp = () => {
    openDialog({
      title: "Sign Up",
      content: <SignUpForm onSuccess={showVerification} />,
      showBackButton: true,
      onBackClick: () => showAuthMenu(),
    });
  };

  const showForgotPassword = () => {
    openDialog({
      title: "Reset Password",
      description:
        "Enter your email address and we'll send you a link to reset your password.",
      content: <ForgotPasswordForm onSuccess={showResetPasswordSent} />,
      showBackButton: true,
      onBackClick: showLogin,
    });
  };

  const showResetPasswordSent = (email: string) => {
    openDialog({
      title: "Check Your Email",
      content: (
        <SuccessScreen
          message={`We've sent a password reset link to ${email}. Please check your inbox.`}
          actionText="Back to Login"
          onAction={showLogin}
        />
      ),
    });
  };

  // Show the reset password form (after user clicks link in email)
  const showResetPassword = (token: string) => {
    openDialog({
      title: "Set New Password",
      content: (
        <ResetPasswordForm
          token={token}
          onSuccess={handlePasswordResetSuccess}
        />
      ),
    });
  };

  // Show the verification form (for email/phone verification)
  const showVerification = (identifier: string, type: "email" | "phone") => {
    const maskedIdentifier =
      type === "email"
        ? identifier.replace(/(.{2})(.*)(@.*)/, "$1***$3")
        : identifier.replace(/(\d{2})(\d+)(\d{2})/, "$1****$3");

    openDialog({
      title: `Verify Your ${type === "email" ? "Email" : "Phone"}`,
      description: `We've sent a verification code to ${maskedIdentifier}.
        ${
          type === "email"
            ? " Please check your inbox and spam folder."
            : " Please check your messages."
        }`,
      content: (
        <VerificationForm
          onSuccess={handleVerificationSuccess}
          onResend={() => handleResendCode(identifier, type)}
        />
      ),
      showBackButton: true,
      onBackClick: showSignUp,
    });
  };

  const handleLoginSuccess = (userData: {
    id: string;
    name: string;
    email: string;
  }) => {
    openDialog({
      title: "Welcome Back!",
      content: (
        <SuccessScreen
          message={`Welcome back, ${userData.name || "User"}!`}
          actionText="Continue"
          onAction={() => closeDialog()}
        />
      ),
    });

    // set the user data in the context or localStorage
    // setUser(userData);
  };

  const handlePasswordResetSuccess = () => {
    openDialog({
      title: "Password Reset",
      content: (
        <SuccessScreen
          message="Your password has been successfully reset."
          actionText="Log In"
          onAction={showLogin}
        />
      ),
    });
  };

  const handleVerificationSuccess = () => {
    openDialog({
      title: "Verification complete",
      content: (
        <SuccessScreen
          message="Your account has been verified successfully"
          actionText="Continue to Login"
          onAction={showLogin}
        />
      ),
    });
  };

  const handleResendCode = (identifier: string, type: "email" | "phone") => {
    // API call to resend code would go here
    console.log(`Resending code to ${identifier} via ${type}`);

    // Show the verification form again
    showVerification(identifier, type);
  };

  return {
    showAuthMenu,
    showLogin,
    showSignUp,
    showForgotPassword,
    showResetPassword,
    closeDialog,
  };
}
