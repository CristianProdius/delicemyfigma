// src/modules/contact/components/contact-form.tsx

"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, Loader2, Check, X, ChevronDown, Sparkles } from "lucide-react";
import { contactContent } from "../data/contact-content";

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
}

export const ContactForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [formState, setFormState] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [selectOpen, setSelectOpen] = useState(false);

  const validateForm = (): boolean => {
    const errors: FormErrors = {};

    if (!formData.name.trim()) {
      errors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Please enter a valid email";
    }

    if (formData.phone && !/^[\d\s\-\+\(\)]+$/.test(formData.phone)) {
      errors.phone = "Please enter a valid phone number";
    }

    if (!formData.subject) {
      errors.subject = "Please select a topic";
    }

    if (!formData.message.trim()) {
      errors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      errors.message = "Message must be at least 10 characters";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      setFormState("error");
      setTimeout(() => setFormState("idle"), 500);
      return;
    }

    setFormState("loading");

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setFormState("success");

    // Reset form after success
    setTimeout(() => {
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
      setFormErrors({});
      setFormState("idle");
    }, 3000);
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (formErrors[field]) {
      setFormErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const formConfig = contactContent.form;

  return (
    <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[95%] xl:max-w-[90%] mx-auto">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl [font-family:var(--font-playfair)] text-[#451C15] mb-4">
              {formConfig.title}
            </h2>
            <p className="text-lg text-[#451C15]/70 [font-family:var(--font-inter)]">
              {formConfig.subtitle}
            </p>
          </motion.div>

          {/* Form Container */}
          <motion.div
            className={`
              relative bg-white/95 backdrop-blur-sm border border-[#451C15]/10 
              rounded-3xl shadow-xl p-8 sm:p-10 lg:p-12
              ${formState === "error" ? "animate-shake" : ""}
            `}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Decorative Elements */}
            <div className="absolute -top-6 -right-6 text-[#D4A574]/20">
              <Sparkles size={40} />
            </div>
            <div className="absolute -bottom-6 -left-6 text-[#E8B4B8]/20">
              <Sparkles size={40} />
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name Field */}
                <motion.div
                  className="relative"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    onFocus={() => setFocusedField("name")}
                    onBlur={() => setFocusedField(null)}
                    className={`
                      peer w-full px-4 pt-6 pb-2 border rounded-xl
                      bg-white/80 backdrop-blur-sm
                      [font-family:var(--font-inter)]
                      transition-all duration-300
                      ${
                        formErrors.name
                          ? "border-red-500 focus:ring-red-500"
                          : "border-[#451C15]/20 focus:ring-[#D4A574]"
                      }
                      focus:outline-none focus:ring-2 focus:border-transparent
                      hover:border-[#451C15]/30
                    `}
                    placeholder=" "
                  />
                  <label
                    htmlFor="name"
                    className={`
                      absolute left-4 transition-all duration-300 pointer-events-none
                      [font-family:var(--font-inter)]
                      peer-placeholder-shown:top-4 peer-placeholder-shown:text-base
                      peer-focus:top-1 peer-focus:text-xs
                      ${formData.name ? "top-1 text-xs" : "top-4 text-base"}
                      ${
                        focusedField === "name"
                          ? "text-[#D4A574]"
                          : "text-[#451C15]/60"
                      }
                    `}
                  >
                    {formConfig.fields.name.label}
                  </label>
                  <AnimatePresence>
                    {formErrors.name && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-red-500 text-sm mt-1 [font-family:var(--font-inter)]"
                      >
                        {formErrors.name}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Email Field */}
                <motion.div
                  className="relative"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                    className={`
                      peer w-full px-4 pt-6 pb-2 border rounded-xl
                      bg-white/80 backdrop-blur-sm
                      [font-family:var(--font-inter)]
                      transition-all duration-300
                      ${
                        formErrors.email
                          ? "border-red-500 focus:ring-red-500"
                          : "border-[#451C15]/20 focus:ring-[#D4A574]"
                      }
                      focus:outline-none focus:ring-2 focus:border-transparent
                      hover:border-[#451C15]/30
                    `}
                    placeholder=" "
                  />
                  <label
                    htmlFor="email"
                    className={`
                      absolute left-4 transition-all duration-300 pointer-events-none
                      [font-family:var(--font-inter)]
                      peer-placeholder-shown:top-4 peer-placeholder-shown:text-base
                      peer-focus:top-1 peer-focus:text-xs
                      ${formData.email ? "top-1 text-xs" : "top-4 text-base"}
                      ${
                        focusedField === "email"
                          ? "text-[#D4A574]"
                          : "text-[#451C15]/60"
                      }
                    `}
                  >
                    {formConfig.fields.email.label}
                  </label>
                  <AnimatePresence>
                    {formErrors.email && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-red-500 text-sm mt-1 [font-family:var(--font-inter)]"
                      >
                        {formErrors.email}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Phone Field */}
                <motion.div
                  className="relative"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <input
                    type="tel"
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    onFocus={() => setFocusedField("phone")}
                    onBlur={() => setFocusedField(null)}
                    className={`
                      peer w-full px-4 pt-6 pb-2 border rounded-xl
                      bg-white/80 backdrop-blur-sm
                      [font-family:var(--font-inter)]
                      transition-all duration-300
                      ${
                        formErrors.phone
                          ? "border-red-500 focus:ring-red-500"
                          : "border-[#451C15]/20 focus:ring-[#D4A574]"
                      }
                      focus:outline-none focus:ring-2 focus:border-transparent
                      hover:border-[#451C15]/30
                    `}
                    placeholder=" "
                  />
                  <label
                    htmlFor="phone"
                    className={`
                      absolute left-4 transition-all duration-300 pointer-events-none
                      [font-family:var(--font-inter)]
                      peer-placeholder-shown:top-4 peer-placeholder-shown:text-base
                      peer-focus:top-1 peer-focus:text-xs
                      ${formData.phone ? "top-1 text-xs" : "top-4 text-base"}
                      ${
                        focusedField === "phone"
                          ? "text-[#D4A574]"
                          : "text-[#451C15]/60"
                      }
                    `}
                  >
                    {formConfig.fields.phone.label}
                  </label>
                  <AnimatePresence>
                    {formErrors.phone && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-red-500 text-sm mt-1 [font-family:var(--font-inter)]"
                      >
                        {formErrors.phone}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Subject Field - Custom Select */}
                <motion.div
                  className="relative"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setSelectOpen(!selectOpen)}
                      onBlur={() => setTimeout(() => setSelectOpen(false), 200)}
                      className={`
                        w-full px-4 pt-6 pb-2 border rounded-xl
                        bg-white/80 backdrop-blur-sm
                        [font-family:var(--font-inter)]
                        transition-all duration-300 text-left
                        ${
                          formErrors.subject
                            ? "border-red-500 focus:ring-red-500"
                            : "border-[#451C15]/20 focus:ring-[#D4A574]"
                        }
                        focus:outline-none focus:ring-2 focus:border-transparent
                        hover:border-[#451C15]/30
                      `}
                    >
                      <span
                        className={
                          formData.subject
                            ? "text-[#451C15]"
                            : "text-[#451C15]/40"
                        }
                      >
                        {formData.subject ||
                          formConfig.fields.subject.placeholder}
                      </span>
                      <ChevronDown
                        className={`
                          absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 
                          text-[#451C15]/60 transition-transform duration-300
                          ${selectOpen ? "rotate-180" : ""}
                        `}
                      />
                    </button>
                    <label
                      className={`
                        absolute left-4 top-1 text-xs pointer-events-none
                        [font-family:var(--font-inter)]
                        ${selectOpen ? "text-[#D4A574]" : "text-[#451C15]/60"}
                        transition-colors duration-300
                      `}
                    >
                      {formConfig.fields.subject.label}
                    </label>

                    <AnimatePresence>
                      {selectOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="absolute z-50 w-full mt-1 bg-white border border-[#451C15]/20 rounded-xl shadow-xl overflow-hidden"
                        >
                          {formConfig.fields.subject.options.map(
                            (option) => (
                              <button
                                key={option}
                                type="button"
                                onClick={() => {
                                  handleChange("subject", option);
                                  setSelectOpen(false);
                                }}
                                className={`
                                w-full px-4 py-3 text-left [font-family:var(--font-inter)]
                                hover:bg-[#D4A574]/10 transition-colors duration-200
                                ${
                                  formData.subject === option
                                    ? "bg-[#D4A574]/20"
                                    : ""
                                }
                              `}
                              >
                                {option}
                              </button>
                            )
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  <AnimatePresence>
                    {formErrors.subject && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-red-500 text-sm mt-1 [font-family:var(--font-inter)]"
                      >
                        {formErrors.subject}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>

              {/* Message Field */}
              <motion.div
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => handleChange("message", e.target.value)}
                  onFocus={() => setFocusedField("message")}
                  onBlur={() => setFocusedField(null)}
                  rows={6}
                  className={`
                    peer w-full px-4 pt-6 pb-2 border rounded-xl
                    bg-white/80 backdrop-blur-sm
                    [font-family:var(--font-inter)]
                    transition-all duration-300 resize-none
                    ${
                      formErrors.message
                        ? "border-red-500 focus:ring-red-500"
                        : "border-[#451C15]/20 focus:ring-[#D4A574]"
                    }
                    focus:outline-none focus:ring-2 focus:border-transparent
                    hover:border-[#451C15]/30
                    [&::-webkit-resizer]:hidden
                  `}
                  placeholder=" "
                  style={{
                    backgroundImage: `linear-gradient(45deg, transparent 45%, #D4A574 45%, #D4A574 55%, transparent 55%)`,
                    backgroundPosition: "calc(100% - 5px) calc(100% - 5px)",
                    backgroundSize: "10px 10px",
                    backgroundRepeat: "no-repeat",
                  }}
                />
                <label
                  htmlFor="message"
                  className={`
                    absolute left-4 transition-all duration-300 pointer-events-none
                    [font-family:var(--font-inter)]
                    peer-placeholder-shown:top-4 peer-placeholder-shown:text-base
                    peer-focus:top-1 peer-focus:text-xs
                    ${formData.message ? "top-1 text-xs" : "top-4 text-base"}
                    ${
                      focusedField === "message"
                        ? "text-[#D4A574]"
                        : "text-[#451C15]/60"
                    }
                  `}
                >
                  {formConfig.fields.message.label}
                </label>
                <AnimatePresence>
                  {formErrors.message && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-red-500 text-sm mt-1 [font-family:var(--font-inter)]"
                    >
                      {formErrors.message}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Submit Button */}
              <motion.div
                className="flex justify-center pt-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <motion.button
                  type="submit"
                  disabled={formState === "loading" || formState === "success"}
                  className={`
                    relative px-8 py-4 rounded-full font-medium
                    [font-family:var(--font-inter)]
                    transition-all duration-300 min-w-[200px]
                    ${
                      formState === "success"
                        ? "bg-green-500 text-white"
                        : formState === "error"
                        ? "bg-red-500 text-white"
                        : "bg-[#451C15] text-white hover:bg-[#451C15]/90"
                    }
                    disabled:cursor-not-allowed
                    group overflow-hidden
                  `}
                  whileHover={formState === "idle" ? { scale: 1.02 } : {}}
                  whileTap={formState === "idle" ? { scale: 0.98 } : {}}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <AnimatePresence mode="wait">
                      {formState === "idle" && (
                        <motion.span
                          key="idle"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="flex items-center gap-2"
                        >
                          {formConfig.submitButton}
                          <Send className="w-4 h-4" />
                        </motion.span>
                      )}
                      {formState === "loading" && (
                        <motion.span
                          key="loading"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="flex items-center gap-2"
                        >
                          {formConfig.submittingText}
                          <Loader2 className="w-4 h-4 animate-spin" />
                        </motion.span>
                      )}
                      {formState === "success" && (
                        <motion.span
                          key="success"
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.5 }}
                          className="flex items-center gap-2"
                        >
                          Message Sent!
                          <Check className="w-4 h-4" />
                        </motion.span>
                      )}
                      {formState === "error" && (
                        <motion.span
                          key="error"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 10 }}
                          className="flex items-center gap-2"
                        >
                          Please check errors
                          <X className="w-4 h-4" />
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-[#D4A574] to-[#E8B4B8]"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ opacity: 0.2 }}
                  />
                </motion.button>
              </motion.div>

              {/* Success Message */}
              <AnimatePresence>
                {formState === "success" && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    className="text-center p-4 bg-green-50 border border-green-200 rounded-xl"
                  >
                    <p className="text-green-700 [font-family:var(--font-inter)]">
                      {formConfig.successMessage}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>
        </div>
      </div>

      {/* CSS for shake animation */}
      <style jsx>{`
        @keyframes shake {
          0%,
          100% {
            transform: translateX(0);
          }
          10%,
          30%,
          50%,
          70%,
          90% {
            transform: translateX(-2px);
          }
          20%,
          40%,
          60%,
          80% {
            transform: translateX(2px);
          }
        }
        .animate-shake {
          animation: shake 0.5s;
        }
      `}</style>
    </section>
  );
};
