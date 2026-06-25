import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { redis } from "@/lib/redis";

// Simple middleware for Edge-compatible route protection and rate limiting
export async function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname;

  // 1. Route Protection
  // Note: We use a session cookie check. In a production app, you'd verify
  // the Firebase session cookie or a JWT.
  const session = req.cookies.get("session")?.value;
  const isProtectedRoute = path.startsWith("/dashboard") || path.startsWith("/api/ai");
  const isAuthPage = path.startsWith("/login") || path.startsWith("/signup");

  if (isProtectedRoute && !session) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // Inject a mock user ID for API calls if session exists
  // (In a real app, this would be extracted from a verified JWT)
  let userId = "demo-user";
  const response = NextResponse.next();
  if (session) {
    response.headers.set("x-user-id", userId);
  }

  if (isAuthPage && session) {
    const url = req.nextUrl.clone();
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  // 2. Rate Limiting for AI API
  if (path.startsWith("/api/ai") && redis) {
    const ip = req.headers.get("x-forwarded-for") || "anonymous";
    const key = `ratelimit:${ip}`;

    try {
      const count = await redis.incr(key);
      if (count === 1) {
        await redis.expire(key, 86400); // 24 hours
      }

      // Default limits. Ideally fetched from session/DB
      const limit = 50;

      if (count > limit) {
        return NextResponse.json(
          { error: "Rate limit exceeded. Upgrade to Pro for more." },
          { status: 429 }
        );
      }
    } catch (e) {
      console.error("Redis Rate Limit Error:", e);
    }
  }

  return response;
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/api/ai/:path*",
    "/settings/:path*",
    "/login",
    "/signup"
  ],
};
