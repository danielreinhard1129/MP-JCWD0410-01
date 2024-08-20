import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

interface User {
  id: number;
  email: string;
  role: "ADMIN" | "CUSTOMER";
}

const loggedOutRoutes = [
  "/login",
  "/register",
  "/reset-password",
  "/forgot-password",
];

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const user = req.auth?.user as User | undefined; // Casting ke tipe User

  const isLoggedOutRoute = loggedOutRoutes.some((route) =>
    pathname.startsWith(route),
  );

  // Redirect unauthenticated users to login if they are accessing private routes
  if (!user && !isLoggedOutRoute && pathname !== "/") {
    const newUrl = new URL("/", req.nextUrl.origin);
    return NextResponse.redirect(newUrl);
  }

  // Redirect authenticated users away from loggedOutRoutes
  if (user && isLoggedOutRoute) {
    const newUrl = new URL("/", req.nextUrl.origin);
    return NextResponse.redirect(newUrl);
  }

  // Izinkan admin mengakses dashboard
  if (user?.role === "ADMIN" && pathname === "/dashboard") {
    return NextResponse.next();
  }

  // Prevent customers from accessing dashboard
  if (user?.role === "CUSTOMER" && pathname === "/dashboard") {
    const newUrl = new URL("/", req.nextUrl.origin);
    return NextResponse.redirect(newUrl);
  }

  // For other routes, allow access
  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|images|favicon.ico).*)"],
};
