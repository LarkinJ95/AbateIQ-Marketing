import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  ApiError,
  requestPasswordReset,
  signIn,
  startTrial,
} from "../../lib/api";
import type { AuthSession } from "../../lib/session";
import { saveSession } from "../../lib/session";

interface SignInDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialView?: ViewType;
  onAuthSuccess: (session: AuthSession) => void;
}

export type ViewType = "signin" | "forgot" | "trial";

export function SignInDialog({
  open,
  onOpenChange,
  initialView = "signin",
  onAuthSuccess,
}: SignInDialogProps) {
  const [view, setView] = useState<ViewType>(initialView);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [infoMessage, setInfoMessage] = useState("");

  useEffect(() => {
    if (!open) {
      return;
    }
    setView(initialView);
    setErrorMessage("");
    setInfoMessage("");
    setIsSubmitting(false);
  }, [initialView, open]);

  const resetFields = () => {
    setView("signin");
    setEmail("");
    setPassword("");
    setName("");
    setCompany("");
    setIsSubmitting(false);
    setErrorMessage("");
    setInfoMessage("");
  };

  const closeDialog = () => {
    resetFields();
    onOpenChange(false);
  };

  const handleError = (error: unknown) => {
    if (error instanceof ApiError) {
      setErrorMessage(error.message || "Request failed. Please try again.");
      return;
    }
    setErrorMessage("Request failed. Please try again.");
  };

  const handleSignIn = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");
    setInfoMessage("");

    try {
      const session = await signIn(email, password);
      saveSession(session);
      onAuthSuccess(session);
      closeDialog();
    } catch (error) {
      handleError(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleForgotPassword = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");
    setInfoMessage("");

    try {
      await requestPasswordReset(email);
      setInfoMessage("If this email exists, a password reset link has been sent.");
    } catch (error) {
      handleError(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFreeTrial = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");
    setInfoMessage("");

    try {
      const session = await startTrial({
        name,
        email,
        company,
        password,
      });
      saveSession(session);
      onAuthSuccess(session);
      closeDialog();
    } catch (error) {
      handleError(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(nextOpen) => (nextOpen ? onOpenChange(true) : closeDialog())}>
      <DialogContent className="sm:max-w-md">
        {view === "signin" && (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl">
                Sign in to Abate<span className="text-[#60a5fa]">IQ</span>
              </DialogTitle>
              <DialogDescription>
                Access your compliance dashboard and exposure intelligence platform
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSignIn} className="space-y-4 mt-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="mt-1"
                />
              </div>

              <div className="flex items-center justify-between text-sm">
                <button
                  type="button"
                  className="text-[#60a5fa] hover:underline"
                  onClick={() => {
                    setView("forgot");
                    setErrorMessage("");
                    setInfoMessage("");
                  }}
                >
                  Forgot password?
                </button>
              </div>

              {errorMessage && <p className="text-sm text-red-700">{errorMessage}</p>}

              <Button
                type="submit"
                className="w-full bg-[#fbbf24] hover:bg-[#f59e0b] text-black"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Signing in..." : "Sign In"}
              </Button>

              <div className="text-center text-sm text-gray-600">
                Don&apos;t have an account?{" "}
                <button
                  type="button"
                  className="text-[#60a5fa] hover:underline"
                  onClick={() => {
                    setView("trial");
                    setErrorMessage("");
                    setInfoMessage("");
                  }}
                >
                  Start for Free Today
                </button>
              </div>
            </form>
          </>
        )}

        {view === "forgot" && (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl">Reset Password</DialogTitle>
              <DialogDescription>
                Enter your email and we&apos;ll send you a reset link
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleForgotPassword} className="space-y-4 mt-4">
              <div>
                <Label htmlFor="reset-email">Email</Label>
                <Input
                  id="reset-email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-1"
                />
              </div>

              {errorMessage && <p className="text-sm text-red-700">{errorMessage}</p>}
              {infoMessage && <p className="text-sm text-green-700">{infoMessage}</p>}

              <Button
                type="submit"
                className="w-full bg-[#fbbf24] hover:bg-[#f59e0b] text-black"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send Reset Link"}
              </Button>

              <div className="text-center text-sm text-gray-600">
                Remember your password?{" "}
                <button
                  type="button"
                  className="text-[#60a5fa] hover:underline"
                  onClick={() => {
                    setView("signin");
                    setErrorMessage("");
                    setInfoMessage("");
                  }}
                >
                  Back to sign in
                </button>
              </div>
            </form>
          </>
        )}

        {view === "trial" && (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl">Start for Free Today</DialogTitle>
              <DialogDescription>
                Create your AbateIQ account and start on the Free tier immediately.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleFreeTrial} className="space-y-4 mt-4">
              <div>
                <Label htmlFor="trial-name">Full Name</Label>
                <Input
                  id="trial-name"
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="trial-email">Work Email</Label>
                <Input
                  id="trial-email"
                  type="email"
                  placeholder="your@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="trial-company">Company Name</Label>
                <Input
                  id="trial-company"
                  type="text"
                  placeholder="Your Company"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  required
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="trial-password">Create Password</Label>
                <Input
                  id="trial-password"
                  type="password"
                  placeholder="Create a secure password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="mt-1"
                />
              </div>

              {errorMessage && <p className="text-sm text-red-700">{errorMessage}</p>}

              <Button
                type="submit"
                className="w-full bg-[#fbbf24] hover:bg-[#f59e0b] text-black"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Creating account..." : "Start for Free Today"}
              </Button>

              <div className="text-center text-sm text-gray-600">
                Already have an account?{" "}
                <button
                  type="button"
                  className="text-[#60a5fa] hover:underline"
                  onClick={() => {
                    setView("signin");
                    setErrorMessage("");
                    setInfoMessage("");
                  }}
                >
                  Sign in
                </button>
              </div>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
