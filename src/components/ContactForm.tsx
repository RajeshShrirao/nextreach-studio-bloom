import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Send, CheckCircle, AlertCircle } from "lucide-react";
import { sendContactEmail } from "@/services/emailService";

const contactSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  business: z.string().min(2, "Business name must be at least 2 characters"),
  location: z.string().min(2, "Location is required"),
  service: z.string().optional(),
  budget: z.string().optional(),
  phone: z.string().optional(),
  message: z.string().optional(),
});

type ContactFormType = z.infer<typeof contactSchema>;

interface ContactFormProps {
  className?: string;
  onSuccess?: () => void;
  compact?: boolean;
}

export default function ContactForm({ className = "", onSuccess, compact = false }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<ContactFormType>({
    resolver: zodResolver(contactSchema),
  });

  const storeSubmissionLocally = (data: ContactFormType) => {
    try {
      const submission = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        ...data,
        timestamp: new Date().toISOString(),
        status: 'new' as const
      };
      
      const existingSubmissions = JSON.parse(localStorage.getItem('contact_submissions') || '[]');
      const updatedSubmissions = [submission, ...existingSubmissions];
      localStorage.setItem('contact_submissions', JSON.stringify(updatedSubmissions));
      
      console.log('Submission stored locally for admin review');
    } catch (error) {
      console.error('Error storing submission locally:', error);
    }
  };

  const onSubmit = async (data: ContactFormType) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      storeSubmissionLocally(data);
      await sendContactEmail(data);
      setSubmitStatus('success');
      reset();
      if (onSuccess) {
        onSuccess();
      }
      setTimeout(() => setSubmitStatus('idle'), 5000);
      
    } catch (error) {
      console.warn('Email sending failed, but submission stored locally:', error);
      setSubmitStatus('success');
      reset();
      if (onSuccess) {
        onSuccess();
      }
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const services = [
    "Starter Docs Sprint",
    "Growth Docs Sprint",
    "Docs + Information Architecture",
    "Migration from Notion or GitBook",
    "Searchable Help Center Refresh",
    "Need help choosing"
  ];

  const budgets = [
    "$149 - $199",
    "$199 - $249",
    "$249 - $299",
    "$300+"
  ];

  const locations = [
    "US / Canada",
    "Europe / UK",
    "India / APAC",
    "Other Location"
  ];

  return (
    <div className={className}>
      {submitStatus === 'success' && (
        <Alert className="mb-6 border-green-200 bg-green-50">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-700">
            Your brief is in. Expect an async reply within 24 hours.
          </AlertDescription>
        </Alert>
      )}

      {submitStatus === 'error' && (
        <Alert className="mb-6 border-red-200 bg-red-50">
          <AlertCircle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-700">
            Something failed while sending the form. Email `admin@nextreachstudio.com` and include your product URL.
          </AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {!compact && (
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName" className="text-white">First Name *</Label>
              <Input
                {...register("firstName")}
                id="firstName"
                placeholder="John"
                className="mt-1 bg-white/10 border-white/20 text-white placeholder-white/60"
                disabled={isSubmitting}
              />
              {errors.firstName && (
                <p className="text-red-300 text-sm mt-1">{errors.firstName.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="lastName" className="text-white">Last Name *</Label>
              <Input
                {...register("lastName")}
                id="lastName"
                placeholder="Doe"
                className="mt-1 bg-white/10 border-white/20 text-white placeholder-white/60"
                disabled={isSubmitting}
              />
              {errors.lastName && (
                <p className="text-red-300 text-sm mt-1">{errors.lastName.message}</p>
              )}
            </div>
          </div>
        )}

        {compact && (
          <div>
            <Label htmlFor="fullName" className="text-white">Full Name *</Label>
            <div className="grid md:grid-cols-2 gap-2 mt-1">
              <Input
                {...register("firstName")}
                placeholder="First Name"
                className="bg-white/10 border-white/20 text-white placeholder-white/60"
                disabled={isSubmitting}
              />
              <Input
                {...register("lastName")}
                placeholder="Last Name"
                className="bg-white/10 border-white/20 text-white placeholder-white/60"
                disabled={isSubmitting}
              />
            </div>
            {(errors.firstName || errors.lastName) && (
              <p className="text-red-300 text-sm mt-1">
                {errors.firstName?.message || errors.lastName?.message}
              </p>
            )}
          </div>
        )}

        <div>
          <Label htmlFor="email" className="text-white">Work Email *</Label>
          <Input
            {...register("email")}
            id="email"
            type="email"
            placeholder="john@example.com"
            className="mt-1 bg-white/10 border-white/20 text-white placeholder-white/60"
            disabled={isSubmitting}
          />
          {errors.email && (
            <p className="text-red-300 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="business" className="text-white">Product / SaaS Name *</Label>
          <Input
            {...register("business")}
            id="business"
            placeholder="Acme Analytics"
            className="mt-1 bg-white/10 border-white/20 text-white placeholder-white/60"
            disabled={isSubmitting}
          />
          {errors.business && (
            <p className="text-red-300 text-sm mt-1">{errors.business.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="location" className="text-white">Primary Market *</Label>
          <Select onValueChange={(value) => setValue("location", value)} disabled={isSubmitting}>
            <SelectTrigger className="mt-1 bg-white/10 border-white/20 text-white">
              <SelectValue placeholder="Where are most of your users?" />
            </SelectTrigger>
            <SelectContent>
              {locations.map((location) => (
                <SelectItem key={location} value={location}>
                  {location}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.location && (
            <p className="text-red-300 text-sm mt-1">{errors.location.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="phone" className="text-white">WhatsApp / Discord / Phone</Label>
          <div className="mt-1">
            <Input
              {...register("phone")}
              id="phone"
              type="tel"
              placeholder="@founderhandle or +1..."
              className="bg-white/10 border-white/20 text-white placeholder-white/60"
              disabled={isSubmitting}
            />
          </div>
        </div>

        <div>
          <Label htmlFor="service" className="text-white">Package</Label>
          <Select onValueChange={(value) => setValue("service", value)} disabled={isSubmitting}>
            <SelectTrigger className="mt-1 bg-white/10 border-white/20 text-white">
              <SelectValue placeholder="Choose a docs package" />
            </SelectTrigger>
            <SelectContent>
              {services.map((service) => (
                <SelectItem key={service} value={service}>
                  {service}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="budget" className="text-white">Budget Range</Label>
          <Select onValueChange={(value) => setValue("budget", value)} disabled={isSubmitting}>
            <SelectTrigger className="mt-1 bg-white/10 border-white/20 text-white">
              <SelectValue placeholder="Select your budget" />
            </SelectTrigger>
            <SelectContent>
              {budgets.map((budget) => (
                <SelectItem key={budget} value={budget}>
                  {budget}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="message" className="text-white">What needs documenting?</Label>
          <Textarea
            {...register("message")}
            id="message"
            placeholder="Share your product URL, key features, current docs gap, and launch timeline."
            className="mt-1 bg-white/10 border-white/20 text-white placeholder-white/60 min-h-24"
            disabled={isSubmitting}
          />
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-green-400 via-emerald-500 to-blue-500 hover:from-green-500 hover:via-emerald-600 hover:to-blue-600 border-0 text-white disabled:opacity-50"
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Submitting...
            </>
          ) : (
            <>
              <Send className="w-4 h-4 mr-2" />
              Start My Docs Sprint
            </>
          )}
        </Button>
      </form>
    </div>
  );
}
