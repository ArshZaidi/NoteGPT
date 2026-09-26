import type { NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  return updateSession(request);
}

export const config = {
  /*
   * Match page routes only. Explicitly exclude:
   *   - Next internals (_next/static, _next/image, _next/data)
   *   - API route handlers
   *   - Supabase callback (it manages its own cookies)
   *   - static assets
   */
  matcher: [
    "/((?!_next/|api/|auth/callback|favicon.ico|robots.txt|sitemap.xml|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|woff|woff2|ttf|map)$).*)",
  ],
};