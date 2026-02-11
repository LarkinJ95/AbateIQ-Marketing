import { useState } from "react";
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

interface SignInDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type ViewType = "signin" | "forgot" | "trial";

export function SignInDialog({ open, onOpenChange }: SignInDialogProps) {
  const [view, setView] = useState<ViewType>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Sign in:", { email, password });
    alert("Sign in functionality would be implemented here");
  };

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Reset password for:", email);
    alert("Password reset link would be sent to: " + email);
  };

  const handleFreeTrial = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Free trial:", { name, email, company });
    alert("Free trial account would be created");
  };

  const resetView = () => {
    setView("signin");
    setEmail("");
    setPassword("");
    setName("");
    setCompany("");
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      resetView();
    }
    onOpenChange(open);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
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
                <a 
                  href="#" 
                  className="text-[#60a5fa] hover:underline"
                  onClick={(e) => {
                    e.preventDefault();
                    setView("forgot");
                  }}
                >
                  Forgot password?
                </a>
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-[#fbbf24] hover:bg-[#f59e0b] text-black"
              >
                Sign In
              </Button>
              
              <div className="text-center text-sm text-gray-600">
                Don't have an account?{" "}
                <a 
                  href="#" 
                  className="text-[#60a5fa] hover:underline"
                  onClick={(e) => {
                    e.preventDefault();
                    setView("trial");
                  }}
                >
                  Start free trial
                </a>
              </div>
            </form>
          </>
        )}

        {view === "forgot" && (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl">
                Reset Password
              </DialogTitle>
              <DialogDescription>
                Enter your email and we'll send you a reset link
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
              
              <Button 
                type="submit" 
                className="w-full bg-[#fbbf24] hover:bg-[#f59e0b] text-black"
              >
                Send Reset Link
              </Button>
              
              <div className="text-center text-sm text-gray-600">
                Remember your password?{" "}
                <a 
                  href="#" 
                  className="text-[#60a5fa] hover:underline"
                  onClick={(e) => {
                    e.preventDefault();
                    setView("signin");
                  }}
                >
                  Back to sign in
                </a>
              </div>
            </form>
          </>
        )}

        {view === "trial" && (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl">
                Start Your Free Trial
              </DialogTitle>
              <DialogDescription>
                Get 14 days of full access to AbateIQ - no credit card required
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
              
              <Button 
                type="submit" 
                className="w-full bg-[#fbbf24] hover:bg-[#f59e0b] text-black"
              >
                Start Free Trial
              </Button>
              
              <div className="text-center text-sm text-gray-600">
                Already have an account?{" "}
                <a 
                  href="#" 
                  className="text-[#60a5fa] hover:underline"
                  onClick={(e) => {
                    e.preventDefault();
                    setView("signin");
                  }}
                >
                  Sign in
                </a>
              </div>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}