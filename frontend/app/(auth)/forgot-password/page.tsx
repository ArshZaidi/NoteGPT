"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Mail } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { useToast } from "@/components/ui/Toast";
import { useAuth } from "@/hooks/useAuth";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const { toast } = useToast();
  const { sendPasswordReset } = useAuth();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    try {
      await sendPasswordReset(email.trim());
      setSent(true);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Couldn't send reset email.";
      toast("error", message);
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="text-center"
      >
        <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-success-soft text-success">
          <Mail className="h-5 w-5" />
        </div>
        <h1 className="font-display text-[26px] leading-tight tracking-[-0.02em] text-ink">
          Check your email.
        </h1>
        <p className="mx-auto mt-3 max-w-sm text-pretty text-[14.5px] leading-relaxed text-ink-muted">
          If <strong>{email}</strong> matches an account, we&apos;ve sent a
          reset link.
        </p>
        <Link
          href="/login"
          className="mt-6 inline-flex items-center gap-1.5 text-[13.5px] font-medium text-ink underline-offset-4 hover:underline"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to sign in
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="mb-8">
        <p className="mb-3 text-[11.5px] font-medium uppercase tracking-[0.14em] text-ink-faint">
          Reset password
        </p>
        <h1 className="font-display text-[32px] leading-[1.1] tracking-[-0.025em] text-ink sm:text-[36px]">
          Forgot your password?
        </h1>
        <p className="mt-3 text-pretty text-[14.5px] leading-relaxed text-ink-muted">
          Enter your email and we&apos;ll send you a link to reset it.
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        <Input
          label="Email"
          type="email"
          autoComplete="email"
          inputMode="email"
          placeholder="you@university.edu"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={loading}
          autoFocus
        />

        <div className="pt-2">
          <MagneticButton
            type="submit"
            loading={loading}
            fullWidth
            size="lg"
          >
            Send reset link
          </MagneticButton>
        </div>
      </form>

      <div className="mt-8 border-t border-line pt-6 text-center">
        <Link
          href="/login"
          className="inline-flex items-center gap-1.5 text-[13.5px] font-medium text-ink-muted hover:text-ink"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to sign in
        </Link>
      </div>
    </motion.div>
  );
}