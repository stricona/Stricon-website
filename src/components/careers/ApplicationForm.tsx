"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CheckCircle2,
  AlertCircle,
  Loader2,
  MessageCircle,
  Phone,
  Upload,
  X,
  RefreshCw,
  Send,
  FileText,
} from "lucide-react";
import {
  careerSchema,
  CareerInput,
  CareerAreaSlug,
  ExperienceChoice,
} from "@/lib/validations";
import {
  careerAreaOptions,
  experienceOptions,
  getCareerAreaLabel,
} from "@/data/careers";
import { company } from "@/data/company";
import { siteConfig } from "@/config/site";

interface ApplicationFormProps {
  defaultArea?: string;
  resumeUploadEnabled: boolean;
}

export function ApplicationForm({
  defaultArea,
  resumeUploadEnabled,
}: ApplicationFormProps) {
  const [serverError, setServerError] = useState<{
    type: "rate_limited" | "delivery_failed" | "generic";
    message: string;
  } | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [successRef, setSuccessRef] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);
  const successHeadingRef = useRef<HTMLHeadingElement>(null);

  const initialArea: CareerAreaSlug =
    defaultArea && careerAreaOptions.some((c) => c.value === defaultArea)
      ? (defaultArea as CareerAreaSlug)
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
  } = useForm<CareerInput>({
    resolver: zodResolver(careerSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      area: initialArea,
      experience: "Fresher" as ExperienceChoice,
      location: "",
      education: "",
      message: "",
      consent: true,
      website: "",
      startedAt: 0,
    },
  });

  const messageText = useWatch({ control, name: "message", defaultValue: "" }) || "";

  // Set startedAt on mount for bot protection
  useEffect(() => {
    setValue("startedAt", Date.now());
  }, [setValue]);

  // Focus success heading on submission
  useEffect(() => {
    if (successRef && successHeadingRef.current) {
      successHeadingRef.current.focus();
    }
  }, [successRef]);

  // Handle client-side file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileError(null);
    const file = e.target.files?.[0];
    if (!file) {
      setSelectedFile(null);
      return;
    }

    // 2 MB size check
    if (file.size > 2 * 1024 * 1024) {
      setFileError("Resume file size cannot exceed 2 MB");
      setSelectedFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    // Extension check
    const ext = file.name.substring(file.name.lastIndexOf(".")).toLowerCase();
    if (![".pdf", ".doc", ".docx"].includes(ext)) {
      setFileError("Only PDF, DOC, or DOCX documents are accepted");
      setSelectedFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    setSelectedFile(file);
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setFileError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Focus first invalid field on error
  const onError = () => {
    const errorKeys = Object.keys(errors) as (keyof CareerInput)[];
    if (errorKeys.length > 0) {
      setFocus(errorKeys[0]);
      setStatusMessage("Form has errors. Please check the highlighted fields.");
    }
  };

  const onSubmit = async (data: CareerInput) => {
    setServerError(null);
    setStatusMessage("Submitting your application...");

    try {
      let res: Response;

      if (selectedFile) {
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("phone", data.phone);
        if (data.email) formData.append("email", data.email);
        formData.append("area", data.area);
        formData.append("experience", data.experience);
        formData.append("location", data.location);
        if (data.education) formData.append("education", data.education);
        if (data.message) formData.append("message", data.message);
        formData.append("consent", "true");
        formData.append("website", data.website || "");
        formData.append("startedAt", (data.startedAt || 0).toString());
        formData.append("resume", selectedFile);

        res = await fetch("/api/careers", {
          method: "POST",
          body: formData,
        });
      } else {
        res = await fetch("/api/careers", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
      }

      const result = await res.json().catch(() => ({}));

      if (res.status === 200 && result.ok) {
        setSuccessRef(result.ref || "APP-SUCCESS");
        setStatusMessage("Thank you! Your application has been received.");
        return;
      }

      if (res.status === 400 && result.errors) {
        for (const [field, msg] of Object.entries(result.errors)) {
          if (field === "resume") {
            setFileError(msg as string);
          } else {
            setError(field as keyof CareerInput, {
              type: "server",
              message: msg as string,
            });
          }
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
          "We could not send your application. Please call +91 89781 07573 or message us on WhatsApp.",
      });
      setStatusMessage("Application delivery failed. Direct channels available.");
    } catch {
      setServerError({
        type: "delivery_failed",
        message:
          "We could not send your application. Please call +91 89781 07573 or message us on WhatsApp.",
      });
      setStatusMessage("Network error. Please call +91 89781 07573 or message us on WhatsApp.");
    }
  };

  // WhatsApp prefilled application redirect
  const handleApplyViaWhatsApp = () => {
    const values = getValues();
    const name = values.name?.trim() || "";
    if (!name) {
      setError("name", {
        type: "manual",
        message: "Please enter your name to connect via WhatsApp",
      });
      setFocus("name");
      return;
    }

    const areaLabel = getCareerAreaLabel(values.area || initialArea);
    const parts = [
      `Hi STRICON, my name is ${name}.`,
      `I would like to apply for roles in ${areaLabel}.`,
      `Experience: ${values.experience}.`,
      values.location ? `Current Location: ${values.location}.` : null,
      values.education ? `Education: ${values.education}.` : null,
    ].filter(Boolean);

    const waText = encodeURIComponent(parts.join(" "));
    const waUrl = `https://wa.me/918978107573?text=${waText}`;
    window.open(waUrl, "_blank", "noopener,noreferrer");
  };

  const handleReset = () => {
    reset({
      name: "",
      phone: "",
      email: "",
      area: initialArea,
      experience: "Fresher",
      location: "",
      education: "",
      message: "",
      consent: true,
      website: "",
      startedAt: 0,
    });
    setValue("startedAt", Date.now());
    handleRemoveFile();
    setSuccessRef(null);
    setServerError(null);
  };

  // SUCCESS CONFIRMATION PANEL
  if (successRef) {
    return (
      <div
        className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-8 sm:p-10 shadow-sm"
        role="region"
        aria-labelledby="app-success-heading"
      >
        <div className="flex flex-col items-center text-center max-w-lg mx-auto">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-[var(--secondary)]/15 text-[var(--secondary)] mb-6">
            <CheckCircle2 className="h-9 w-9" />
          </div>

          <h3
            id="app-success-heading"
            ref={successHeadingRef}
            tabIndex={-1}
            className="font-heading text-2xl sm:text-3xl font-bold text-[var(--foreground)] mb-3 focus:outline-hidden"
          >
            Application Submitted
          </h3>

          <p className="text-sm sm:text-base text-[var(--muted-foreground)] leading-relaxed mb-6">
            Thank you for applying to STRICON. Your application details have been received by our recruitment and HR operations team in Hyderabad.
          </p>

          <div className="w-full rounded-xl border border-[var(--border)] bg-[var(--background)] p-4 sm:p-5 mb-8">
            <p className="text-xs uppercase tracking-wider font-semibold text-[var(--muted-foreground)] mb-1">
              Application Reference
            </p>
            <p className="font-mono text-lg sm:text-xl font-bold text-[var(--primary)] select-all">
              {successRef}
            </p>
            <p className="text-xs text-[var(--muted-foreground)] mt-1">
              Please quote this reference for any enquiries regarding your application.
            </p>
          </div>

          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-6 py-3 text-sm font-semibold text-[var(--foreground)] transition-colors hover:bg-[var(--background)] focus-visible:outline-2 focus-visible:outline-[var(--primary)]"
          >
            <RefreshCw className="h-4 w-4 text-[var(--muted-foreground)]" />
            <span>Submit another application</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8 lg:p-10 shadow-sm">
      <div className="mb-8">
        <h3 className="font-heading text-xl sm:text-2xl font-bold text-[var(--foreground)]">
          Job Application Form
        </h3>
        <p className="mt-1 text-xs sm:text-sm text-[var(--muted-foreground)]">
          Submit your details directly to our recruitment team in Hyderabad.
        </p>
      </div>

      {/* Polite Live Region for status */}
      <div className="sr-only" role="status" aria-live="polite">
        {statusMessage}
      </div>

      {/* Server Error Alerts */}
      {serverError && (
        <div
          role="alert"
          className="mb-8 rounded-xl border border-[var(--danger)]/30 bg-[var(--danger)]/10 p-5 text-sm text-[var(--foreground)]"
        >
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-[var(--danger)] shrink-0 mt-0.5" />
            <div className="flex-1 space-y-3">
              <p className="font-semibold text-[var(--danger)]">
                {serverError.message}
              </p>

              {serverError.type === "delivery_failed" && (
                <div className="flex flex-wrap gap-3 pt-2">
                  <a
                    href={siteConfig.phoneHref}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-[var(--primary)] px-3.5 py-1.5 text-xs font-semibold text-[var(--primary-foreground)] hover:opacity-90"
                  >
                    <Phone className="h-3.5 w-3.5" />
                    <span>Call {company.contact.phoneDisplay}</span>
                  </a>
                  <button
                    type="button"
                    onClick={handleApplyViaWhatsApp}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-[var(--secondary)] px-3.5 py-1.5 text-xs font-semibold text-[var(--secondary-foreground)] hover:opacity-90"
                  >
                    <MessageCircle className="h-3.5 w-3.5" />
                    <span>Message on WhatsApp</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit, onError)} noValidate className="space-y-6">
        {/* Honeypot field (hidden from assistive technologies) */}
        <div className="hidden" aria-hidden="true">
          <label htmlFor="website-field">Website</label>
          <input
            id="website-field"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            {...register("website")}
          />
        </div>

        {/* Short Fields 2-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
          {/* Full Name */}
          <div>
            <label
              htmlFor="applicant-name"
              className="block text-xs sm:text-sm font-semibold text-[var(--foreground)] mb-1.5"
            >
              Full Name <span className="text-[var(--danger)]">*</span>
            </label>
            <input
              id="applicant-name"
              type="text"
              autoComplete="name"
              aria-required="true"
              aria-invalid={errors.name ? "true" : "false"}
              aria-describedby={errors.name ? "name-error" : undefined}
              placeholder="e.g. Ramesh Sharma"
              className={`w-full rounded-xl border bg-[var(--background)] px-4 py-3 text-sm text-[var(--foreground)] placeholder:text-[var(--muted-foreground)]/60 focus-visible:outline-2 focus-visible:outline-[var(--primary)] transition-colors ${
                errors.name
                  ? "border-[var(--danger)] focus-visible:outline-[var(--danger)]"
                  : "border-[var(--border)]"
              }`}
              {...register("name")}
            />
            {errors.name && (
              <span
                id="name-error"
                role="alert"
                className="mt-1.5 block text-xs font-medium text-[var(--danger)]"
              >
                {errors.name.message}
              </span>
            )}
          </div>

          {/* Mobile Phone */}
          <div>
            <label
              htmlFor="applicant-phone"
              className="block text-xs sm:text-sm font-semibold text-[var(--foreground)] mb-1.5"
            >
              Phone Number (10 digits) <span className="text-[var(--danger)]">*</span>
            </label>
            <input
              id="applicant-phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              aria-required="true"
              aria-invalid={errors.phone ? "true" : "false"}
              aria-describedby={errors.phone ? "phone-error" : undefined}
              placeholder="e.g. 98765 43210"
              className={`w-full rounded-xl border bg-[var(--background)] px-4 py-3 text-sm text-[var(--foreground)] placeholder:text-[var(--muted-foreground)]/60 focus-visible:outline-2 focus-visible:outline-[var(--primary)] transition-colors ${
                errors.phone
                  ? "border-[var(--danger)] focus-visible:outline-[var(--danger)]"
                  : "border-[var(--border)]"
              }`}
              {...register("phone")}
            />
            {errors.phone && (
              <span
                id="phone-error"
                role="alert"
                className="mt-1.5 block text-xs font-medium text-[var(--danger)]"
              >
                {errors.phone.message}
              </span>
            )}
          </div>

          {/* Email Address (Optional) */}
          <div>
            <label
              htmlFor="applicant-email"
              className="block text-xs sm:text-sm font-semibold text-[var(--foreground)] mb-1.5"
            >
              Email Address <span className="text-xs text-[var(--muted-foreground)] font-normal">(Optional)</span>
            </label>
            <input
              id="applicant-email"
              type="email"
              autoComplete="email"
              aria-invalid={errors.email ? "true" : "false"}
              aria-describedby={errors.email ? "email-error" : undefined}
              placeholder="name@example.com"
              className={`w-full rounded-xl border bg-[var(--background)] px-4 py-3 text-sm text-[var(--foreground)] placeholder:text-[var(--muted-foreground)]/60 focus-visible:outline-2 focus-visible:outline-[var(--primary)] transition-colors ${
                errors.email
                  ? "border-[var(--danger)] focus-visible:outline-[var(--danger)]"
                  : "border-[var(--border)]"
              }`}
              {...register("email")}
            />
            {errors.email && (
              <span
                id="email-error"
                role="alert"
                className="mt-1.5 block text-xs font-medium text-[var(--danger)]"
              >
                {errors.email.message}
              </span>
            )}
          </div>

          {/* Location / Current City */}
          <div>
            <label
              htmlFor="applicant-location"
              className="block text-xs sm:text-sm font-semibold text-[var(--foreground)] mb-1.5"
            >
              Current Location / City <span className="text-[var(--danger)]">*</span>
            </label>
            <input
              id="applicant-location"
              type="text"
              autoComplete="address-level2"
              aria-required="true"
              aria-invalid={errors.location ? "true" : "false"}
              aria-describedby={errors.location ? "location-error" : undefined}
              placeholder="e.g. Mehdipatnam, Hyderabad"
              className={`w-full rounded-xl border bg-[var(--background)] px-4 py-3 text-sm text-[var(--foreground)] placeholder:text-[var(--muted-foreground)]/60 focus-visible:outline-2 focus-visible:outline-[var(--primary)] transition-colors ${
                errors.location
                  ? "border-[var(--danger)] focus-visible:outline-[var(--danger)]"
                  : "border-[var(--border)]"
              }`}
              {...register("location")}
            />
            {errors.location && (
              <span
                id="location-error"
                role="alert"
                className="mt-1.5 block text-xs font-medium text-[var(--danger)]"
              >
                {errors.location.message}
              </span>
            )}
          </div>

          {/* Area of Interest */}
          <div>
            <label
              htmlFor="applicant-area"
              className="block text-xs sm:text-sm font-semibold text-[var(--foreground)] mb-1.5"
            >
              Area of Interest <span className="text-[var(--danger)]">*</span>
            </label>
            <select
              id="applicant-area"
              aria-required="true"
              aria-invalid={errors.area ? "true" : "false"}
              aria-describedby={errors.area ? "area-error" : undefined}
              className={`w-full rounded-xl border bg-[var(--background)] px-4 py-3 text-sm text-[var(--foreground)] focus-visible:outline-2 focus-visible:outline-[var(--primary)] transition-colors ${
                errors.area
                  ? "border-[var(--danger)] focus-visible:outline-[var(--danger)]"
                  : "border-[var(--border)]"
              }`}
              {...register("area")}
            >
              {careerAreaOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            {errors.area && (
              <span
                id="area-error"
                role="alert"
                className="mt-1.5 block text-xs font-medium text-[var(--danger)]"
              >
                {errors.area.message}
              </span>
            )}
          </div>

          {/* Experience Level */}
          <div>
            <label
              htmlFor="applicant-experience"
              className="block text-xs sm:text-sm font-semibold text-[var(--foreground)] mb-1.5"
            >
              Experience Level <span className="text-[var(--danger)]">*</span>
            </label>
            <select
              id="applicant-experience"
              aria-required="true"
              aria-invalid={errors.experience ? "true" : "false"}
              aria-describedby={errors.experience ? "experience-error" : undefined}
              className={`w-full rounded-xl border bg-[var(--background)] px-4 py-3 text-sm text-[var(--foreground)] focus-visible:outline-2 focus-visible:outline-[var(--primary)] transition-colors ${
                errors.experience
                  ? "border-[var(--danger)] focus-visible:outline-[var(--danger)]"
                  : "border-[var(--border)]"
              }`}
              {...register("experience")}
            >
              {experienceOptions.map((exp) => (
                <option key={exp} value={exp}>
                  {exp}
                </option>
              ))}
            </select>
            {errors.experience && (
              <span
                id="experience-error"
                role="alert"
                className="mt-1.5 block text-xs font-medium text-[var(--danger)]"
              >
                {errors.experience.message}
              </span>
            )}
          </div>
        </div>

        {/* Education Qualification (Optional) */}
        <div>
          <label
            htmlFor="applicant-education"
            className="block text-xs sm:text-sm font-semibold text-[var(--foreground)] mb-1.5"
          >
            Highest Qualification <span className="text-xs text-[var(--muted-foreground)] font-normal">(Optional)</span>
          </label>
          <input
            id="applicant-education"
            type="text"
            placeholder="e.g. Intermediate, Diploma, Graduate"
            maxLength={80}
            className="w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-sm text-[var(--foreground)] placeholder:text-[var(--muted-foreground)]/60 focus-visible:outline-2 focus-visible:outline-[var(--primary)]"
            {...register("education")}
          />
        </div>

        {/* Resume Upload (Rendered only when resumeUploadEnabled is true) */}
        {resumeUploadEnabled && (
          <div>
            <label
              htmlFor="applicant-resume"
              className="block text-xs sm:text-sm font-semibold text-[var(--foreground)] mb-1.5"
            >
              Resume (Optional): PDF, DOC or DOCX, up to 2 MB
            </label>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <input
                id="applicant-resume"
                ref={fileInputRef}
                type="file"
                accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                onChange={handleFileChange}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-2.5 text-xs sm:text-sm font-semibold text-[var(--foreground)] hover:bg-[var(--surface)] hover:border-[var(--primary)]/40 focus-visible:outline-2 focus-visible:outline-[var(--primary)] transition-colors"
              >
                <Upload className="h-4 w-4 text-[var(--primary)]" />
                <span>{selectedFile ? "Change file" : "Upload Resume"}</span>
              </button>

              {selectedFile && (
                <div className="inline-flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-1.5 text-xs text-[var(--foreground)]">
                  <FileText className="h-3.5 w-3.5 text-[var(--secondary)] shrink-0" />
                  <span className="font-mono truncate max-w-[200px]">
                    {selectedFile.name}
                  </span>
                  <button
                    type="button"
                    onClick={handleRemoveFile}
                    aria-label="Remove selected resume"
                    className="text-[var(--muted-foreground)] hover:text-[var(--danger)]"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              )}
            </div>
            {fileError && (
              <span
                role="alert"
                className="mt-1.5 block text-xs font-medium text-[var(--danger)]"
              >
                {fileError}
              </span>
            )}
          </div>
        )}

        {/* Message / Additional Information */}
        <div>
          <div className="flex justify-between items-center mb-1.5">
            <label
              htmlFor="applicant-message"
              className="block text-xs sm:text-sm font-semibold text-[var(--foreground)]"
            >
              Additional Information / Note <span className="text-xs text-[var(--muted-foreground)] font-normal">(Optional)</span>
            </label>
            <span className="text-[11px] text-[var(--muted-foreground)] tabular-nums">
              {messageText.length} / 800
            </span>
          </div>
          <textarea
            id="applicant-message"
            rows={3}
            maxLength={800}
            placeholder="Tell us about your previous experience, certifications, or preferred shift timing..."
            className="w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-sm text-[var(--foreground)] placeholder:text-[var(--muted-foreground)]/60 focus-visible:outline-2 focus-visible:outline-[var(--primary)] resize-y"
            {...register("message")}
          />
        </div>

        {/* Consent Checkbox */}
        <div className="space-y-1.5">
          <div className="flex items-start gap-3">
            <input
              id="applicant-consent"
              type="checkbox"
              aria-required="true"
              aria-invalid={errors.consent ? "true" : "false"}
              aria-describedby={errors.consent ? "consent-error" : undefined}
              className="h-4 w-4 rounded-sm border-[var(--border)] text-[var(--primary)] mt-1 focus:ring-[var(--primary)]"
              {...register("consent")}
            />
            <label
              htmlFor="applicant-consent"
              className="text-xs sm:text-sm text-[var(--muted-foreground)] leading-snug cursor-pointer select-none"
            >
              I agree that STRICON may contact me about my application. <span className="text-[var(--danger)]">*</span>
            </label>
          </div>
          <div className="pl-7">
            <Link
              href="/privacy-policy"
              className="text-xs text-[var(--primary)] hover:underline inline-block"
            >
              Read our Privacy Policy
            </Link>
          </div>
          {errors.consent && (
            <span
              id="consent-error"
              role="alert"
              className="mt-1.5 block text-xs font-medium text-[var(--danger)] pl-7"
            >
              {errors.consent.message}
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
          {/* Primary Submit Button (Gold with charcoal text) */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--accent-gold)] px-8 py-3.5 text-sm font-bold text-[var(--accent-gold-foreground)] shadow-xs transition-all hover:brightness-105 active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-[var(--primary)]"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin motion-reduce:hidden" />
                <span>Sending...</span>
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                <span>Submit Application</span>
              </>
            )}
          </button>

          {/* Secondary WhatsApp Button */}
          <button
            type="button"
            onClick={handleApplyViaWhatsApp}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-[var(--secondary)]/40 bg-[var(--background)] px-6 py-3.5 text-sm font-semibold text-[var(--secondary)] transition-colors hover:bg-[var(--secondary)]/10 focus-visible:outline-2 focus-visible:outline-[var(--secondary)]"
          >
            <MessageCircle className="h-4 w-4 text-[var(--secondary)]" />
            <span>Apply via WhatsApp</span>
          </button>
        </div>
      </form>
    </div>
  );
}
