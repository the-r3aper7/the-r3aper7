import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === "/") {
    const response = NextResponse.next();
    response.headers.set("x-page-visited", "true");
    return response;
  }
  return NextResponse.next();
}

export const config = {
  matcher: "/",
};
