"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import gsap from "gsap";
import { services, companyInfo } from "@/lib/constants";
import { createMagneticEffect } from "@/lib/animations";

interface FormData {
  firstName: string;
  lastName: string;
  company: string;
  email: string;
  phone: string;
  message: string;
  servicesRequired: string[];
}

interface FormErrors {
  firstName?: string;
  email?: string;
  message?: string;
}

export function ConsultationForm() {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    company: "",
    email: "",
    phone: "",
    message: "",
    servicesRequired: [],
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const submitBtnRef = useRef<HTMLButtonElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const btn = submitBtnRef.current;
    if (!btn) return;
    const cleanup = createMagneticEffect(btn, { strength: 0.2 });
    return cleanup;
  }, []);

  useEffect(() => {
    if (submitted && successRef.current) {
      gsap.fromTo(
        successRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" }
      );
    }
  }, [submitted]);

  const validate = useCallback((): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData.firstName, formData.email, formData.message]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleCheckboxChange = (slug: string) => {
    setFormData((prev) => ({
      ...prev,
      servicesRequired: prev.servicesRequired.includes(slug)
        ? prev.servicesRequired.filter((s) => s !== slug)
        : [...prev.servicesRequired, slug],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // Build mailto link
    const subject = encodeURIComponent("Consultation Request");
    const selectedServices = formData.servicesRequired
      .map((slug) => services.find((s) => s.slug === slug)?.name)
      .filter(Boolean)
      .join(", ");
    const body = encodeURIComponent(
      `Name: ${formData.firstName} ${formData.lastName}\n` +
        `Company: ${formData.company}\n` +
        `Email: ${formData.email}\n` +
        `Phone: ${formData.phone}\n` +
        `Services Required: ${selectedServices || "Not specified"}\n\n` +
        `Message:\n${formData.message}`
    );
    window.location.href = `mailto:${companyInfo.email}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div
        ref={successRef}
        className="flex flex-col items-center justify-center py-12 text-center"
      >
        <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mb-6">
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            stroke="currentColor"
            className="text-accent"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="8,17 14,23 24,10" />
          </svg>
        </div>
        <h3 className="text-xl font-bold mb-2">Thank You</h3>
        <p className="text-muted text-sm max-w-sm">
          Your consultation request has been prepared. Please complete the email
          submission to reach our team.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      {/* Name Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormInput
          label="First Name"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          error={errors.firstName}
          required
        />
        <FormInput
          label="Last Name"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
        />
      </div>

      {/* Company */}
      <FormInput
        label="Company Name"
        name="company"
        value={formData.company}
        onChange={handleChange}
      />

      {/* Email & Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormInput
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          required
        />
        <FormInput
          label="Phone"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
        />
      </div>

      {/* Services Required */}
      <fieldset>
        <legend className="text-sm text-muted mb-3">Services Required</legend>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {services.map((service) => (
            <label
              key={service.slug}
              className="flex items-center gap-3 cursor-pointer py-2 px-3 rounded-sm hover:bg-border/20 transition-colors duration-200"
            >
              <input
                type="checkbox"
                checked={formData.servicesRequired.includes(service.slug)}
                onChange={() => handleCheckboxChange(service.slug)}
                className="w-4 h-4 accent-accent"
              />
              <span className="text-sm">{service.name}</span>
            </label>
          ))}
        </div>
      </fieldset>

      {/* Message */}
      <div className="relative">
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={4}
          className={`w-full bg-transparent border-b-2 ${
            errors.message ? "border-red-500" : "border-border"
          } focus:border-accent outline-none py-3 text-sm transition-colors duration-300 resize-none peer placeholder-transparent`}
          placeholder="Message"
          required
        />
        <label className="absolute left-0 top-3 text-sm text-muted transition-all duration-300 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-accent peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs">
          Message *
        </label>
        {errors.message && (
          <p className="text-red-500 text-xs mt-1">{errors.message}</p>
        )}
      </div>

      {/* Submit */}
      <button
        ref={submitBtnRef}
        type="submit"
        className="w-full bg-accent text-white font-medium py-4 rounded-sm hover:bg-accent-light transition-colors duration-300 cursor-pointer text-sm tracking-wide"
      >
        Submit Request
      </button>
    </form>
  );
}

/* Reusable floating-label input */
function FormInput({
  label,
  name,
  type = "text",
  value,
  onChange,
  error,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  required?: boolean;
}) {
  return (
    <div className="relative">
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full bg-transparent border-b-2 ${
          error ? "border-red-500" : "border-border"
        } focus:border-accent outline-none py-3 text-sm transition-colors duration-300 peer placeholder-transparent`}
        placeholder={label}
        required={required}
      />
      <label className="absolute left-0 top-3 text-sm text-muted transition-all duration-300 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-accent peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs">
        {label}
        {required && " *"}
      </label>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}
