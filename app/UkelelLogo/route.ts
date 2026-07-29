import { NextResponse } from "next/server";

export function GET(request: Request) {
  return NextResponse.redirect(new URL("/brand/kelel-logo-en.jpg", request.url), 308);
}
