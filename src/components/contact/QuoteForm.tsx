"use client";

import { useState, useEffect, useRef } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CheckCircle2,
  AlertCircle,
  Loader2,
  MessageCircle,
  Phone,
  RefreshCw,
  Send,
} from "lucide-react";
import {
  enquirySchema,
  EnquiryInput,
  SERVICE_OPTIONS,
  ServiceSlugOption,
  getServiceLabel,
} from "@/lib/validations";
import { company } from "@/data/company";
import { siteConfig } from "@/config/site";

interface QuoteFormProps {
  defaultService?: string;
}

export function QuoteForm({ defaultService }: QuoteFormProps) {
  const [serverError, setServerError] = useState<{
    type: "rate_limited" | "delivery_failed" | "generic";
    message: string;
  } | null>(null);
  const [successRef, setSuccessRef] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState("");
  const successHeadingRef = useRef<HTMLHeadingElement>(null);

  // Validate initial default service if provided
  const initialService: ServiceSlugOption =
    defaultService && SERVICE_OPTIONS.some((s) => s.value === defaultService)
      ? (defaultService as ServiceSlugOption)
      : "security-services";

  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    setError,
    reset,
    setFocus,
    formState: { errors, isSubmitting },
  } = useForm<EnquiryInput>({
    resolver: zodResolver(enquirySchema),
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      name: "",
      company: "",
      phone: "",
      email: "",
      service: initialService,
      location: "",
      manpower: "",
      message: "",
      consent: true,
      website: "",
      startedAt: 0,
    },
  });

  const messageText = useWatch({ control, name: "message", defaultValue: "" }) || "";

  // Set startedAt timestamp on mount
  useEffect(() => {
    setValue("startedAt", Date.now());
  }, [setValue]);

  // Focus success heading on completion
  useEffect(() => {
    if (successRef && successHeadingRef.current) {
      successHeadingRef.current.focus();
    }
  }, [successRef]);

  // Focus first invalid field on form submission error
  const onError = () => {
    const errorKeys = Object.keys(errors) as (keyof EnquiryInput)[];
    if (errorKeys.length > 0) {
      setFocus(errorKeys[0]);
      setStatusMessage("Form has errors. Please correct the highlighted fields.");
    }
  };

  const onSubmit = async (data: EnquiryInput) => {
    setServerError(null);
    setStatusMessage("Submitting your enquiry...");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json().catch(() => ({}));

      if (res.status === 200 && result.ok) {
        setSuccessRef(result.ref || "STR-SUCCESS");
        setStatusMessage("Thank you! Your enquiry has been received.");
        return;
      }

      if (res.status === 400 && result.errors) {
        for (const [field, msg] of Object.entries(result.errors)) {
          setError(field as keyof EnquiryInput, {
            type: "server",
            message: msg as string,
          });
        }
        onError();
        return;
      }

      if (res.status === 429) {
        setServerError({
          type: "rate_limited",
          message: "Too many attempts. Please try again later or call us.",
        });
        setStatusMessage("Too many attempts. Please try again later or call us.");
        return;
      }

      // 502 / 503 / Network failure
      setServerError({
        type: "delivery_failed",
        message:
          "We could not send your enquiry. Please call +91 89781 07573 or message us on WhatsApp.",
      });
      setStatusMessage("Submission failed. Direct phone and WhatsApp channels available.");
    } catch {
      setServerError({
        type: "delivery_failed",
        message:
          "We could not send your enquiry. Please call +91 89781 07573 or message us on WhatsApp.",
      });
      setStatusMessage("Network error. Please call +91 89781 07573 or message us on WhatsApp.");
    }
  };

  // Construct WhatsApp prefilled enquiry from filled fields
  const handleSendViaWhatsApp = () => {
    const formValues = getValues();
    const name = formValues.name?.trim() || "";
    if (!name) {
      setError("name", {
        type: "manual",
        message: "Please enter your name to connect via WhatsApp",
      });
      setFocus("name");
      return;
    }

    const serviceLabel = getServiceLabel(formValues.service || initialService);
    const parts = [
      `Hi STRICON, my name is ${name}.`,
      formValues.company ? `Company: ${formValues.company}.` : null,
      `I am enquiring about ${serviceLabel}.`,
      formValues.location ? `Site Location: ${formValues.location}.` : null,
      formValues.manpower ? `Manpower: ${formValues.manpower}.` : null,
      formValues.message ? `Requirement: ${formValues.message}.` : null,
    ].filter(Boolean);

    const waText = encodeURIComponent(parts.join(" "));
    const waUrl = `https://wa.me/918978107573?text=${waText}`;
    window.open(waUrl, "_blank", "noopener,noreferrer");
  };

  const handleReset = () => {
    reset({
      name: "",
      company: "",
      phone: "",
      email: "",
      service: initialService,
      location: "",
      manpower: "",
      message: "",
      consent: true,
      website: "",
      startedAt: Date.now(),
    });
    setSuccessRef(null);
    setServerError(null);
  };

  // SUCCESS STATE PANEL
  if (successRef) {
    return (
      <div className="rounded-2xl border border-[var(--secondary)]/40 bg-[var(--surface)] p-8 sm:p-12 shadow-md transition-all duration-300">
        <div className="flex flex-col items-center text-center space-y-5">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-[var(--secondary)]/10 text-[var(--secondary)]">
            <CheckCircle2 className="h-10 w-10" />
          </div>

          <h2
            ref={successHeadingRef}
            tabIndex={-1}
            className="font-heading text-2xl sm:text-3xl font-bold text-[var(--foreground)] focus:outline-none"
          >
            Thank You
          </h2>

          <p className="text-base text-[var(--muted-foreground)] max-w-md leading-relaxed">
            Your quotation request has been received by our operations team.
          </p>

          <div className="rounded-xl border border-[var(--border)] bg-[var(--background)] px-5 py-3 text-sm">
            <span className="text-[var(--muted-foreground)]">Reference Number: </span>
            <span className="font-mono font-bold text-[var(--foreground)] tracking-wider">
              {successRef}
            </span>
          </div>

          <div className="pt-4 flex flex-wrap gap-4 justify-center">
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-5 py-2.5 text-sm font-semibold text-[var(--foreground)] hover:bg-[var(--border)]/20 transition-colors focus-visible:outline-2"
            >
              <RefreshCw className="h-4 w-4 text-[var(--muted-foreground)]" />
              <span>Send another enquiry</span>
            </button>

            <a
              href={siteConfig.phoneHref}
              className="inline-flex items-center gap-2 rounded-lg bg-[var(--primary)] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[var(--primary)]/90 transition-colors focus-visible:outline-2"
            >
              <Phone className="h-4 w-4" />
              <span>Call Us: {company.contact.phoneDisplay}</span>
            </a>
          </div>
        </div>
      </div>
    );
  }

  // ACTIVE QUOTE FORM
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-10 shadow-xs">
      <div className="mb-8">
        <h2 className="font-heading text-xl sm:text-2xl font-bold text-[var(--foreground)]">
          Request a Proposal
        </h2>
        <p className="mt-1.5 text-xs sm:text-sm text-[var(--muted-foreground)] leading-relaxed">
          Fill in your facility parameters below for an operational assessment and commercial quotation.
        </p>
      </div>

      {/* Screen Reader Live Region */}
      <div aria-live="polite" className="sr-only">
        {statusMessage}
      </div>

      {/* Server Error Banners */}
      {serverError && (
        <div
          role="alert"
          className="mb-6 rounded-xl border border-[var(--danger)]/30 bg-[var(--danger)]/10 p-5 text-sm text-[var(--foreground)]"
        >
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 shrink-0 text-[var(--danger)] mt-0.5" />
            <div className="space-y-3 flex-1">
              <p className="font-medium text-[var(--danger)]">{serverError.message}</p>

              {serverError.type === "delivery_failed" && (
                <div className="flex flex-wrap gap-3 pt-1">
                  <a
                    href={siteConfig.phoneHref}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-[var(--primary)] px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-[var(--primary)]/90 transition-colors focus-visible:outline-2"
                  >
                    <Phone className="h-3.5 w-3.5" />
                    <span>Call +91 89781 07573</span>
                  </a>
                  <a
                    href={siteConfig.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg bg-[var(--secondary)] px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-[var(--secondary)]/90 transition-colors focus-visible:outline-2"
                  >
                    <MessageCircle className="h-3.5 w-3.5" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <form
        noValidate
        onSubmit={handleSubmit(onSubmit, onError)}
        className="space-y-5"
      >
        {/* Hidden Honeypot Field */}
        <div className="sr-only" aria-hidden="true">
          <label htmlFor="website-field">Leave blank</label>
          <input
            id="website-field"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            {...register("website")}
          />
        </div>

        {/* Row 1: Name & Company */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="name"
              className="block text-xs font-semibold uppercase tracking-wider text-[var(--foreground)] mb-1.5"
            >
              Your Name <span className="text-[var(--danger)]">*</span>
            </label>
            <input
              id="name"
              type="text"
              autoComplete="name"
              aria-required="true"
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "name-error" : undefined}
              className={`w-full rounded-lg border bg-[var(--background)] px-3.5 py-2.5 text-sm text-[var(--foreground)] placeholder:text-[var(--muted-foreground)]/60 focus-visible:outline-2 focus-visible:outline-[var(--primary)] transition-colors ${
                errors.name ? "border-[var(--danger)]" : "border-[var(--border)]"
              }`}
              placeholder="e.g. Ramesh Sharma"
              {...register("name")}
            />
            {errors.name && (
              <p id="name-error" className="mt-1 text-xs text-[var(--danger)] font-medium">
                {errors.name.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="company"
              className="block text-xs font-semibold uppercase tracking-wider text-[var(--foreground)] mb-1.5"
            >
              Company / Organization
            </label>
            <input
              id="company"
              type="text"
              autoComplete="organization"
              aria-invalid={!!errors.company}
              aria-describedby={errors.company ? "company-error" : undefined}
              className={`w-full rounded-lg border bg-[var(--background)] px-3.5 py-2.5 text-sm text-[var(--foreground)] placeholder:text-[var(--muted-foreground)]/60 focus-visible:outline-2 focus-visible:outline-[var(--primary)] transition-colors ${
                errors.company ? "border-[var(--danger)]" : "border-[var(--border)]"
              }`}
              placeholder="e.g. Acme Tech Park"
              {...register("company")}
            />
            {errors.company && (
              <p id="company-error" className="mt-1 text-xs text-[var(--danger)] font-medium">
                {errors.company.message}
              </p>
            )}
          </div>
        </div>

        {/* Row 2: Phone & Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="phone"
              className="block text-xs font-semibold uppercase tracking-wider text-[var(--foreground)] mb-1.5"
            >
              Mobile Number <span className="text-[var(--danger)]">*</span>
            </label>
            <input
              id="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              aria-required="true"
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? "phone-error" : undefined}
              className={`w-full rounded-lg border bg-[var(--background)] px-3.5 py-2.5 text-sm text-[var(--foreground)] placeholder:text-[var(--muted-foreground)]/60 focus-visible:outline-2 focus-visible:outline-[var(--primary)] transition-colors ${
                errors.phone ? "border-[var(--danger)]" : "border-[var(--border)]"
              }`}
              placeholder="+91 98765 43210"
              {...register("phone")}
            />
            {errors.phone && (
              <p id="phone-error" className="mt-1 text-xs text-[var(--danger)] font-medium">
                {errors.phone.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-xs font-semibold uppercase tracking-wider text-[var(--foreground)] mb-1.5"
            >
              Email Address <span className="text-[var(--danger)]">*</span>
            </label>
            <input
              id="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              aria-required="true"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
              className={`w-full rounded-lg border bg-[var(--background)] px-3.5 py-2.5 text-sm text-[var(--foreground)] placeholder:text-[var(--muted-foreground)]/60 focus-visible:outline-2 focus-visible:outline-[var(--primary)] transition-colors ${
                errors.email ? "border-[var(--danger)]" : "border-[var(--border)]"
              }`}
              placeholder="e.g. contact@example.com"
              {...register("email")}
            />
            {errors.email && (
              <p id="email-error" className="mt-1 text-xs text-[var(--danger)] font-medium">
                {errors.email.message}
              </p>
            )}
          </div>
        </div>

        {/* Row 3: Service & Site Location */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="service"
              className="block text-xs font-semibold uppercase tracking-wider text-[var(--foreground)] mb-1.5"
            >
              Service Needed <span className="text-[var(--danger)]">*</span>
            </label>
            <select
              id="service"
              aria-required="true"
              aria-invalid={!!errors.service}
              aria-describedby={errors.service ? "service-error" : undefined}
              className={`w-full rounded-lg border bg-[var(--background)] px-3.5 py-2.5 text-sm text-[var(--foreground)] focus-visible:outline-2 focus-visible:outline-[var(--primary)] transition-colors ${
                errors.service ? "border-[var(--danger)]" : "border-[var(--border)]"
              }`}
              {...register("service")}
            >
              {SERVICE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            {errors.service && (
              <p id="service-error" className="mt-1 text-xs text-[var(--danger)] font-medium">
                {errors.service.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="location"
              className="block text-xs font-semibold uppercase tracking-wider text-[var(--foreground)] mb-1.5"
            >
              Facility Location in Hyderabad <span className="text-[var(--danger)]">*</span>
            </label>
            <input
              id="location"
              type="text"
              autoComplete="street-address"
              aria-required="true"
              aria-invalid={!!errors.location}
              aria-describedby={errors.location ? "location-error" : undefined}
              className={`w-full rounded-lg border bg-[var(--background)] px-3.5 py-2.5 text-sm text-[var(--foreground)] placeholder:text-[var(--muted-foreground)]/60 focus-visible:outline-2 focus-visible:outline-[var(--primary)] transition-colors ${
                errors.location ? "border-[var(--danger)]" : "border-[var(--border)]"
              }`}
              placeholder="e.g. Madhapur / HITEC City, Hyderabad"
              {...register("location")}
            />
            {errors.location && (
              <p id="location-error" className="mt-1 text-xs text-[var(--danger)] font-medium">
                {errors.location.message}
              </p>
            )}
          </div>
        </div>

        {/* Row 4: Manpower Requirements */}
        <div>
          <label
            htmlFor="manpower"
            className="block text-xs font-semibold uppercase tracking-wider text-[var(--foreground)] mb-1.5"
          >
            Estimated Manpower Requirement (Optional)
          </label>
          <input
            id="manpower"
            type="text"
            aria-invalid={!!errors.manpower}
            aria-describedby={errors.manpower ? "manpower-error" : undefined}
            className={`w-full rounded-lg border bg-[var(--background)] px-3.5 py-2.5 text-sm text-[var(--foreground)] placeholder:text-[var(--muted-foreground)]/60 focus-visible:outline-2 focus-visible:outline-[var(--primary)] transition-colors ${
              errors.manpower ? "border-[var(--danger)]" : "border-[var(--border)]"
            }`}
            placeholder="e.g. 10 Security Guards / 6 Housekeeping Staff"
            {...register("manpower")}
          />
          {errors.manpower && (
            <p id="manpower-error" className="mt-1 text-xs text-[var(--danger)] font-medium">
              {errors.manpower.message}
            </p>
          )}
        </div>

        {/* Row 5: Message with character counter */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label
              htmlFor="message"
              className="block text-xs font-semibold uppercase tracking-wider text-[var(--foreground)]"
            >
              Additional Scope & Notes (Optional)
            </label>
            <span
              className={`text-xs ${
                messageText.length > 900
                  ? "text-[var(--danger)] font-semibold"
                  : "text-[var(--muted-foreground)]"
              }`}
            >
              {messageText.length}/1000
            </span>
          </div>
          <textarea
            id="message"
            rows={4}
            maxLength={1000}
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? "message-error" : undefined}
            className={`w-full rounded-lg border bg-[var(--background)] px-3.5 py-2.5 text-sm text-[var(--foreground)] placeholder:text-[var(--muted-foreground)]/60 focus-visible:outline-2 focus-visible:outline-[var(--primary)] transition-colors ${
              errors.message ? "border-[var(--danger)]" : "border-[var(--border)]"
            }`}
            placeholder="Provide any specific facility details, shifts, or scope requirements..."
            {...register("message")}
          />
          {errors.message && (
            <p id="message-error" className="mt-1 text-xs text-[var(--danger)] font-medium">
              {errors.message.message}
            </p>
          )}
        </div>

        {/* Row 6: Consent Checkbox */}
        <div className="pt-1">
          <div className="flex items-start gap-3">
            <input
              id="consent"
              type="checkbox"
              aria-required="true"
              aria-invalid={!!errors.consent}
              aria-describedby={errors.consent ? "consent-error" : undefined}
              className="h-4 w-4 rounded border-[var(--border)] text-[var(--primary)] focus:ring-[var(--primary)] mt-1"
              {...register("consent")}
            />
            <label
              htmlFor="consent"
              className="text-xs sm:text-sm text-[var(--muted-foreground)] leading-snug cursor-pointer"
            >
              I agree that STRICON may contact me about this enquiry.
            </label>
          </div>
          {errors.consent && (
            <p id="consent-error" className="mt-1 text-xs text-[var(--danger)] font-medium pl-7">
              {errors.consent.message}
            </p>
          )}
        </div>

        {/* Actions: Primary Submit & Secondary WhatsApp */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-3">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-[var(--accent-gold)] px-6 py-3.5 text-sm font-bold text-[var(--accent-gold-foreground)] shadow-xs hover:bg-[var(--accent-gold)]/90 transition-all focus-visible:outline-2 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin text-[var(--accent-gold-foreground)]" />
                <span>Sending...</span>
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                <span>Submit Quotation Request</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleSendViaWhatsApp}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-[var(--secondary)]/40 bg-[var(--surface)] px-5 py-3.5 text-sm font-semibold text-[var(--secondary)] hover:bg-[var(--secondary)]/10 transition-colors focus-visible:outline-2"
          >
            <MessageCircle className="h-4 w-4 text-[var(--secondary)]" />
            <span>Send via WhatsApp</span>
          </button>
        </div>
      </form>
    </div>
  );
}
