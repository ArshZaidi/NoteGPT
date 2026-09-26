"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { useToast } from "@/components/ui/Toast";
import { useAuth } from "@/hooks/useAuth";
import { useHaptics } from "@/hooks/useHaptics";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const { signIn } = useAuth();
  const { error: errorHaptic, success: successHaptic } = useHaptics();

  const next = searchParams.get("next") ?? "/dashboard";

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    try {
      await signIn(email.trim(), password);
      successHaptic();
      toast("success", "Welcome back.");
      router.push(next);
      // Do NOT call router.refresh() here — it double-renders and can
      // break the RSC stream in dev.
    } catch (err) {
      errorHaptic();
      const message =
        err instanceof Error ? err.message : "Couldn't sign you in.";
      toast("error", message);
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="mb-8">
        <p className="mb-3 text-[11.5px] font-medium uppercase tracking-[0.14em] text-ink-faint">
          Welcome back
        </p>
        <h1 className="font-display text-[32px] leading-[1.1] tracking-[-0.025em] text-ink sm:text-[36px]">
          Sign in to continue.
        </h1>
        <p className="mt-3 text-pretty text-[14.5px] leading-relaxed text-ink-muted">
          Your notebooks, tasks, and deadlines are waiting.
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        <Input
          label="Email"
          type="email"
          autoComplete="email"
          inputMode="email"
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck={false}
          placeholder="you@university.edu"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={loading}
        />

        <div>
          <PasswordInput
            label="Password"
            autoComplete="current-password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
          />
          <div className="mt-2 flex justify-end">
            <Link
              href="/forgot-password"
              className="text-[12.5px] font-medium text-ink-muted transition-colors hover:text-ink"
            >
              Forgot password?
            </Link>
          </div>
        </div>

        <div className="pt-2">
          <MagneticButton
            type="submit"
            loading={loading}
            fullWidth
            size="lg"
          >
            Sign in
            {!loading ? <ArrowRight className="h-4 w-4" /> : null}
          </MagneticButton>
        </div>
      </form>

      <div className="mt-8 border-t border-line pt-6 text-center">
        <p className="text-[13.5px] text-ink-muted">
          New to NoteGPT?{" "}
          <Link
            href="/signup"
            className="font-medium text-ink underline-offset-4 hover:underline"
          >
            Create an account
          </Link>
        </p>
      </div>
    </motion.div>
  );
}