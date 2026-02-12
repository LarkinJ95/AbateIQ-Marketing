import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Building2, Mail, User, Users, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    role: '',
    companySize: '',
    primaryHazard: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setShowSuccess(true);
    setFormData({
      name: '',
      company: '',
      email: '',
      role: '',
      companySize: '',
      primaryHazard: '',
    });
  };

  return (
    <section id="contact" className="py-20 lg:py-32 bg-graphite-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Column - Content */}
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Transform Your{' '}
              <span className="text-safety-yellow">Compliance Program</span>?
            </h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              Schedule a personalized demo to see how AbateIQ can streamline your
              industrial hygiene workflows, automate NEA generation, and provide
              defensible exposure intelligence.
            </p>

            {/* Benefits */}
            <div className="space-y-4">
              {[
                'Live product walkthrough with our EHS experts',
                'Customized to your industry and use case',
                'Q&A session with implementation team',
                'No commitment required',
              ].map((benefit, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-safety-yellow/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-safety-yellow" />
                  </div>
                  <span className="text-gray-300">{benefit}</span>
                </div>
              ))}
            </div>

            {/* Trust Badges */}
            <div className="mt-12 pt-8 border-t border-white/10">
              <p className="text-gray-500 text-sm mb-4">
                Trusted by EHS teams at:
              </p>
              <div className="flex flex-wrap gap-6 items-center opacity-50">
                {['Fortune 500', 'Government', 'Healthcare', 'Manufacturing'].map(
                  (industry, index) => (
                    <span
                      key={index}
                      className="text-gray-400 font-semibold text-sm"
                    >
                      {industry}
                    </span>
                  )
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="bg-white rounded-2xl p-8 lg:p-10">
            <h3 className="text-2xl font-bold text-graphite mb-2">
              Request a Demo
            </h3>
            <p className="text-steel mb-8">
              Fill out the form below and we will be in touch within 24 hours.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-graphite">
                  Full Name
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="name"
                    placeholder="John Smith"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              {/* Company */}
              <div className="space-y-2">
                <Label htmlFor="company" className="text-graphite">
                  Company
                </Label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="company"
                    placeholder="Acme Corporation"
                    value={formData.company}
                    onChange={(e) =>
                      setFormData({ ...formData, company: e.target.value })
                    }
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-graphite">
                  Work Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@company.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              {/* Role */}
              <div className="space-y-2">
                <Label htmlFor="role" className="text-graphite">
                  Your Role
                </Label>
                <Select
                  value={formData.role}
                  onValueChange={(value) =>
                    setFormData({ ...formData, role: value })
                  }
                >
                  <SelectTrigger className="w-full">
                    <div className="flex items-center gap-2">
                      <User className="w-5 h-5 text-gray-400" />
                      <SelectValue placeholder="Select your role" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ehs-manager">EHS Manager</SelectItem>
                    <SelectItem value="industrial-hygienist">
                      Industrial Hygienist
                    </SelectItem>
                    <SelectItem value="asbestos-inspector">
                      Asbestos Inspector
                    </SelectItem>
                    <SelectItem value="abatement-contractor">
                      Abatement Contractor
                    </SelectItem>
                    <SelectItem value="environmental-specialist">
                      Environmental Specialist
                    </SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Company Size */}
              <div className="space-y-2">
                <Label htmlFor="companySize" className="text-graphite">
                  Company Size
                </Label>
                <Select
                  value={formData.companySize}
                  onValueChange={(value) =>
                    setFormData({ ...formData, companySize: value })
                  }
                >
                  <SelectTrigger className="w-full">
                    <div className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-gray-400" />
                      <SelectValue placeholder="Select company size" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-50">1-50 employees</SelectItem>
                    <SelectItem value="51-200">51-200 employees</SelectItem>
                    <SelectItem value="201-500">201-500 employees</SelectItem>
                    <SelectItem value="501-1000">501-1000 employees</SelectItem>
                    <SelectItem value="1000+">1000+ employees</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Primary Hazard */}
              <div className="space-y-2">
                <Label htmlFor="primaryHazard" className="text-graphite">
                  Primary Hazard
                </Label>
                <Select
                  value={formData.primaryHazard}
                  onValueChange={(value) =>
                    setFormData({ ...formData, primaryHazard: value })
                  }
                >
                  <SelectTrigger className="w-full">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-gray-400" />
                      <SelectValue placeholder="Select primary hazard" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="acm">Asbestos (ACM)</SelectItem>
                    <SelectItem value="lead">Lead</SelectItem>
                    <SelectItem value="silica">Silica</SelectItem>
                    <SelectItem value="multi">Multiple Hazards</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-safety-yellow text-graphite-dark hover:bg-safety-yellow-hover font-semibold py-6"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <svg
                      className="animate-spin h-5 w-5"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Submitting...
                  </span>
                ) : (
                  'Request Demo'
                )}
              </Button>

              <p className="text-center text-gray-400 text-sm">
                By submitting, you agree to our{' '}
                <a href="#" className="text-safety-yellow hover:underline">
                  Privacy Policy
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>

      {/* Success Dialog */}
      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle2 className="w-8 h-8 text-green-600" />
            </div>
            <DialogTitle className="text-center text-2xl">
              Demo Request Received!
            </DialogTitle>
            <DialogDescription className="text-center">
              Thank you for your interest in AbateIQ. Our team will reach out to
              you within 24 hours to schedule your personalized demo.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            <Button
              onClick={() => setShowSuccess(false)}
              className="w-full bg-safety-yellow text-graphite-dark hover:bg-safety-yellow-hover"
            >
              Got it!
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
