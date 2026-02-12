import { useState } from "react";
import type { FormEvent } from "react";
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
import { ApiError, submitContactSubmission } from "../../lib/api";

const initialFormData = {
  name: "",
  company: "",
  email: "",
  role: "",
  companySize: "",
  primaryHazard: "",
  message: "",
};

type SubmitState = "idle" | "submitting" | "success" | "error";

export function ContactSection() {
  const [formData, setFormData] = useState(initialFormData);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [submitMessage, setSubmitMessage] = useState<string>("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!formData.role || !formData.companySize || !formData.primaryHazard) {
      setSubmitState("error");
      setSubmitMessage("Please complete all required fields before submitting.");
      return;
    }

    try {
      setSubmitState("submitting");
      setSubmitMessage("");

      await submitContactSubmission(formData);

      setSubmitState("success");
      setSubmitMessage("Thanks. Your request has been received and our team will follow up shortly.");
      setFormData(initialFormData);
    } catch (error) {
      setSubmitState("error");
      if (error instanceof ApiError) {
        const detailedErrors = Array.isArray(error.details?.errors)
          ? error.details.errors.join(" ")
          : "";
        setSubmitMessage(
          [error.message, detailedErrors].filter(Boolean).join(" ") ||
            "Unable to submit your request right now.",
        );
      } else {
        setSubmitMessage("Unable to submit your request right now.");
      }
    }
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-5xl mb-4 text-gray-900">
            Request a Demo
          </h2>
          <p className="text-xl text-gray-600">
            See how AbateIQ can transform your compliance program
          </p>
        </div>

        <div className="bg-white border-2 border-gray-200 rounded-lg p-8 shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="company">Company *</Label>
                <Input
                  id="company"
                  required
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="mt-1"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="mt-1"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="role">Role *</Label>
                <Select
                  value={formData.role}
                  onValueChange={(value) => setFormData({ ...formData, role: value })}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="environmental-specialist">Environmental Specialist</SelectItem>
                    <SelectItem value="industrial-hygienist">Industrial Hygienist</SelectItem>
                    <SelectItem value="asbestos-inspector">Asbestos Inspector</SelectItem>
                    <SelectItem value="abatement-contractor">Abatement Contractor</SelectItem>
                    <SelectItem value="ehs-manager">EHS Manager</SelectItem>
                    <SelectItem value="compliance-team">Compliance Team</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="companySize">Company Size *</Label>
                <Select
                  value={formData.companySize}
                  onValueChange={(value) => setFormData({ ...formData, companySize: value })}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select company size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-10">1-10 employees</SelectItem>
                    <SelectItem value="11-50">11-50 employees</SelectItem>
                    <SelectItem value="51-200">51-200 employees</SelectItem>
                    <SelectItem value="201-500">201-500 employees</SelectItem>
                    <SelectItem value="500+">500+ employees</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="primaryHazard">Primary Hazard *</Label>
              <Select
                value={formData.primaryHazard}
                onValueChange={(value) =>
                  setFormData({ ...formData, primaryHazard: value })
                }
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select primary hazard" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="acm">ACM (Asbestos-Containing Materials)</SelectItem>
                  <SelectItem value="lead">Lead</SelectItem>
                  <SelectItem value="silica">Silica</SelectItem>
                  <SelectItem value="multi">Multi-Hazard</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="message">Additional Details (Optional)</Label>
              <Textarea
                id="message"
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="mt-1"
                placeholder="Tell us about your compliance needs..."
              />
            </div>

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
              size="lg"
              className="w-full bg-[#fbbf24] hover:bg-[#f59e0b] text-black"
              disabled={submitState === "submitting"}
            >
              {submitState === "submitting" ? "Submitting..." : "Request Demo"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
