"use client";

import { useState } from "react";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";
import { useHaptics } from "@/hooks/useHaptics";

export function SignOutButton() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { tap } = useHaptics();

  const handleSignOut = async () => {
    if (loading) return;
    setLoading(true);
    tap();

    try {
      if (isSupabaseConfigured()) {
        const supabase = createClient();
        await supabase.auth.signOut();
      }
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Couldn't sign out cleanly.";
      toast("error", message);
    }

    // Hard navigation — avoids the RSC-stream / cookie-write race.
    window.location.href = "/login";
  };

  return (
    <Button variant="secondary" onClick={handleSignOut} loading={loading}>
      <LogOut className="h-3.5 w-3.5" />
      Sign out
    </Button>
  );
}