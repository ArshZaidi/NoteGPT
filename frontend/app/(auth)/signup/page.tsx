"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { useToast } from "@/components/ui/Toast";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 700));
    setLoading(false);
    toast("success", "Account setup will be live soon.");
    router.push("/dashboard");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="mb-8">
        <p className="mb-3 text-[11.5px] font-medium uppercase tracking-[0.14em] text-ink-faint">
          Get started
        </p>
        <h1 className="font-display text-[30px] leading-[1.15] tracking-[-0.02em] text-ink sm:text-[34px]">
          Create your account.
        </h1>
        <p className="mt-2 text-pretty text-[14px] leading-relaxed text-ink-muted">
          One calm place for everything academic.
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-3.5">
        <Input
          label="Full name"
          autoComplete="name"
          placeholder="Arsh"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <Input
          label="Email"
          type="email"
          autoComplete="email"
          inputMode="email"
          placeholder="you@university.edu"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          label="Password"
          type="password"
          autoComplete="new-password"
          placeholder="At least 8 characters"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <div className="pt-1">
          <MagneticButton
            type="submit"
            loading={loading}
            fullWidth
            size="lg"
          >
            Create account
            {!loading ? <ArrowRight className="h-4 w-4" /> : null}
          </MagneticButton>
        </div>
      </form>

      <p className="mt-6 text-center text-[13px] text-ink-muted">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-medium text-ink underline-offset-4 hover:underline"
        >
          Sign in
        </Link>
      </p>
    </motion.div>
  );
}