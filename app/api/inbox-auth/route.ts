import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
  createInboxSessionCookieValue,
  getInboxUserByCredentials,
  INBOX_COOKIE_NAME,
} from "@/lib/inbox-auth";

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as { username?: string; password?: string };

    if (!payload.username || !payload.password) {
      return NextResponse.json(
        { message: "Please provide both username and password." },
        { status: 400 },
      );
    }

    const user = getInboxUserByCredentials(payload.username, payload.password);

    if (!user) {
      return NextResponse.json(
        { message: "Incorrect inbox username or password." },
        { status: 401 },
      );
    }

    const cookieStore = await cookies();
    cookieStore.set(INBOX_COOKIE_NAME, createInboxSessionCookieValue(user), {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 8,
    });

    return NextResponse.json({
      message: "Inbox unlocked.",
      user: { username: user.username, name: user.name },
    });
  } catch {
    return NextResponse.json(
      { message: "Unable to process inbox login right now." },
      { status: 500 },
    );
  }
}

export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.set(INBOX_COOKIE_NAME, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });

  return NextResponse.json({ message: "Inbox locked." });
}
