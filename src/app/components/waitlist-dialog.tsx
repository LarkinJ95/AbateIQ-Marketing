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
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { ApiError, submitWaitlistSubmission } from "../../lib/api";

interface WaitlistDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type SubmitState = "idle" | "submitting" | "success" | "error";

const initialFormData = {
  name: "",
  organization: "",
  email: "",
  role: "",
  phone: "",
  teamSize: "",
  notes: "",
};

export function WaitlistDialog({ open, onOpenChange }: WaitlistDialogProps) {
  const [formData, setFormData] = useState(initialFormData);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [submitMessage, setSubmitMessage] = useState("");

  useEffect(() => {
    if (!open) {
      setFormData(initialFormData);
      setSubmitState("idle");
      setSubmitMessage("");
    }
  }, [open]);

  const closeDialog = () => {
    onOpenChange(false);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!formData.name.trim() || !formData.organization.trim() || !formData.email.trim()) {
      setSubmitState("error");
      setSubmitMessage("Name, organization, and email are required.");
      return;
    }

    try {
      setSubmitState("submitting");
      setSubmitMessage("");

      await submitWaitlistSubmission({
        name: formData.name,
        organization: formData.organization,
        email: formData.email,
        role: formData.role || undefined,
        phone: formData.phone || undefined,
        teamSize: formData.teamSize || undefined,
        notes: formData.notes || undefined,
        source: "ios-release-modal",
      });

      setSubmitState("success");
      setSubmitMessage("You are on the iOS waitlist. We will send release updates to your email.");
      setFormData(initialFormData);
    } catch (error) {
      setSubmitState("error");
      if (error instanceof ApiError) {
        const detailedErrors = Array.isArray(error.details?.errors)
          ? error.details.errors.join(" ")
          : "";
        setSubmitMessage(
          [error.message, detailedErrors].filter(Boolean).join(" ") ||
            "Unable to join waitlist right now.",
        );
      } else {
        setSubmitMessage("Unable to join waitlist right now.");
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={(nextOpen) => (nextOpen ? onOpenChange(true) : closeDialog())}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">Join the AbateIQ iOS Waitlist</DialogTitle>
          <DialogDescription>
            Share your details and we will notify you when iOS early access opens.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="waitlist-name">Full Name *</Label>
              <Input
                id="waitlist-name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="waitlist-org">Organization *</Label>
              <Input
                id="waitlist-org"
                required
                value={formData.organization}
                onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                className="mt-1"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="waitlist-email">Work Email *</Label>
              <Input
                id="waitlist-email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="waitlist-phone">Phone (Optional)</Label>
              <Input
                id="waitlist-phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="mt-1"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="waitlist-role">Role (Optional)</Label>
              <Select
                value={formData.role}
                onValueChange={(value) => setFormData({ ...formData, role: value })}
              >
                <SelectTrigger id="waitlist-role" className="mt-1">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="industrial-hygienist">Industrial Hygienist</SelectItem>
                  <SelectItem value="asbestos-contractor">Asbestos Contractor</SelectItem>
                  <SelectItem value="ehs-manager">EHS Manager</SelectItem>
                  <SelectItem value="field-technician">Field Technician</SelectItem>
                  <SelectItem value="operations-manager">Operations Manager</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="waitlist-team-size">Team Size (Optional)</Label>
              <Select
                value={formData.teamSize}
                onValueChange={(value) => setFormData({ ...formData, teamSize: value })}
              >
                <SelectTrigger id="waitlist-team-size" className="mt-1">
                  <SelectValue placeholder="Select team size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-10">1-10</SelectItem>
                  <SelectItem value="11-50">11-50</SelectItem>
                  <SelectItem value="51-200">51-200</SelectItem>
                  <SelectItem value="201-500">201-500</SelectItem>
                  <SelectItem value="500+">500+</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="waitlist-notes">What do you want on mobile first? (Optional)</Label>
            <Textarea
              id="waitlist-notes"
              rows={3}
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="mt-1"
              placeholder="Examples: offline inspections, sample capture, photo logs, signatures."
            />
          </div>

          <p className="text-xs text-gray-600">
            Stored in DB for waitlist processing: name, organization, email, role, phone, team
            size, notes, source, and submission timestamp.
          </p>

          {submitMessage && (
            <p
              className={`text-sm ${
                submitState === "success" ? "text-green-700" : "text-red-700"
              }`}
            >
              {submitMessage}
            </p>
          )}

          <Button
            type="submit"
            className="w-full bg-[#fbbf24] hover:bg-[#f59e0b] text-black"
            disabled={submitState === "submitting"}
          >
            {submitState === "submitting" ? "Joining Waitlist..." : "Join iOS Waitlist"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
