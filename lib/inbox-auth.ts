import crypto from "node:crypto";
import { cookies } from "next/headers";

export const INBOX_COOKIE_NAME = "kelel_inbox_auth";
const DEFAULT_INBOX_SESSION_SECRET = "kelel-session-secret-2026";

type InboxUser = {
  username: string;
  password: string;
  name: string;
  role: InboxRole;
  email?: string;
};

type InboxSession = {
  username: string;
  name: string;
  role: InboxRole;
};

export type InboxRole = "viewer" | "editor" | "admin";
export type InboxDirectoryUser = Omit<InboxUser, "password">;

function normalize(value: string | undefined) {
  return value?.trim() || "";
}

function getSessionSecret() {
  return normalize(process.env.INBOX_SESSION_SECRET) || DEFAULT_INBOX_SESSION_SECRET;
}

function getConfiguredInboxUsers() {
  const raw = normalize(process.env.INBOX_USERS);

  if (!raw) {
    return [] as InboxUser[];
  }

  return raw
    .split("|")
    .map<InboxUser | null>((entry) => {
      const [username, password, name, role, email] = entry
        .split(":")
        .map((part) => part.trim());

      if (!username || !password) {
        return null;
      }

      return {
        username,
        password,
        name: name || username,
        role: isInboxRole(role) ? role : "viewer",
        email: email || undefined,
      };
    })
    .filter((user): user is InboxUser => Boolean(user));
}

function getDefaultInboxUsers(): InboxUser[] {
  return [
    {
      username: "getnet",
      password: "kelel-admin-2026",
      name: "Getnet Amdu Belay",
      role: "admin",
      email: "info@kelelitsolution.com",
    },
  ];
}

function isInboxRole(value: string | undefined): value is InboxRole {
  return value === "viewer" || value === "editor" || value === "admin";
}

export function getInboxUsers() {
  const configuredUsers = getConfiguredInboxUsers();
  return configuredUsers.length > 0 ? configuredUsers : getDefaultInboxUsers();
}

export function getInboxDirectoryUsers(): InboxDirectoryUser[] {
  return getInboxUsers().map((user) => ({
    username: user.username,
    name: user.name,
    role: user.role,
    email: user.email,
  }));
}

export function hasCustomInboxUsers() {
  return Boolean(normalize(process.env.INBOX_USERS));
}

export function getInboxUserByCredentials(username: string, password: string) {
  const normalizedUsername = username.trim().toLowerCase();

  return (
    getInboxUsers().find(
      (user) =>
        user.username.toLowerCase() === normalizedUsername && user.password === password,
    ) || null
  );
}

export function getInboxUserByName(name: string) {
  const normalizedName = name.trim().toLowerCase();

  return (
    getInboxUsers().find((user) => user.name.trim().toLowerCase() === normalizedName) || null
  );
}

function signValue(value: string) {
  return crypto
    .createHmac("sha256", getSessionSecret())
    .update(value)
    .digest("hex");
}

function encodeSession(user: InboxUser) {
  const payload = `${user.username}:${signValue(user.username)}`;
  return Buffer.from(payload, "utf8").toString("base64url");
}

function decodeSession(cookieValue: string | undefined) {
  if (!cookieValue) {
    return null;
  }

  try {
    const payload = Buffer.from(cookieValue, "base64url").toString("utf8");
    const [username, signature] = payload.split(":");

    if (!username || !signature || signature !== signValue(username)) {
      return null;
    }

    const user = getInboxUsers().find((entry) => entry.username === username);

    if (!user) {
      return null;
    }

    return {
      username: user.username,
      name: user.name,
      role: user.role,
    } satisfies InboxSession;
  } catch {
    return null;
  }
}

export async function getInboxSession() {
  const cookieStore = await cookies();
  return decodeSession(cookieStore.get(INBOX_COOKIE_NAME)?.value);
}

export async function isInboxAuthenticated() {
  return Boolean(await getInboxSession());
}

export function createInboxSessionCookieValue(user: InboxUser) {
  return encodeSession(user);
}

export async function hasInboxRole(requiredRole: InboxRole) {
  const session = await getInboxSession();

  if (!session) {
    return false;
  }

  const rank = {
    viewer: 0,
    editor: 1,
    admin: 2,
  } satisfies Record<InboxRole, number>;

  return rank[session.role] >= rank[requiredRole];
}
