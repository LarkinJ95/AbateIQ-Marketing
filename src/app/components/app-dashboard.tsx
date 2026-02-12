import { Button } from "./ui/button";
import type { ReactNode } from "react";
import type { AuthSession } from "../../lib/session";

interface AppDashboardProps {
  session: AuthSession | null;
  onLoginClick: () => void;
  onLogout: () => void;
  children?: ReactNode;
}

function AccessDenied({ onLoginClick }: { onLoginClick: () => void }) {
  return (
    <main className="min-h-screen bg-[#1f1f1f] text-white flex items-center justify-center p-6">
      <div className="max-w-xl w-full bg-[#2a2a2a] border border-gray-700 rounded-xl p-8 text-center">
        <h1 className="text-3xl mb-4">Sign in required</h1>
        <p className="text-gray-300 mb-6">
          This route is reserved for authenticated AbateIQ users.
        </p>
        <div className="flex items-center justify-center gap-3">
          <Button
            className="bg-[#fbbf24] hover:bg-[#f59e0b] text-black"
            onClick={onLoginClick}
          >
            Sign In
          </Button>
          <Button
            variant="outline"
            className="border-gray-500 text-white"
            onClick={() => window.location.assign("/")}
          >
            Back to site
          </Button>
        </div>
      </div>
    </main>
  );
}

export function AppDashboard({
  session,
  onLoginClick,
  onLogout,
  children,
}: AppDashboardProps) {
  if (!session) {
    return (
      <>
        <AccessDenied onLoginClick={onLoginClick} />
        {children}
      </>
    );
  }

  return (
    <main className="min-h-screen bg-[#101215] text-white p-6 lg:p-12">
      <div className="max-w-5xl mx-auto">
        <div className="bg-[#1a1f26] border border-gray-700 rounded-xl p-6 lg:p-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl">AbateIQ App</h1>
              <p className="text-gray-300 mt-2">
                Authenticated route is wired. Connect your full app shell here.
              </p>
            </div>
            <Button
              variant="outline"
              className="border-gray-500 text-white"
              onClick={onLogout}
            >
              Sign Out
            </Button>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-[#11161d] border border-gray-700 rounded-lg p-4">
              <p className="text-gray-400 text-sm mb-1">Signed in as</p>
              <p className="text-lg">{session.user?.email || "Unknown user"}</p>
            </div>
            <div className="bg-[#11161d] border border-gray-700 rounded-lg p-4">
              <p className="text-gray-400 text-sm mb-1">Session expires</p>
              <p className="text-lg">{session.expiresAt || "Not provided"}</p>
            </div>
          </div>
        </div>
      </div>
      {children}
    </main>
  );
}
