import { cookies } from "next/headers";

const COOKIE_NAME = "gw_admin";
const MAX_AGE = 60 * 60 * 8; // 8 hours

export async function isAuthenticated(): Promise<boolean> {
  const c = await cookies();
  const v = c.get(COOKIE_NAME)?.value;
  return Boolean(v && v === process.env.ADMIN_PASSWORD);
}

export async function setAuthCookie() {
  const c = await cookies();
  c.set(COOKIE_NAME, process.env.ADMIN_PASSWORD ?? "", {
    httpOnly: true,
    sameSite: "lax",
    secure: true,
    maxAge: MAX_AGE,
    path: "/",
  });
}

export async function clearAuthCookie() {
  const c = await cookies();
  c.delete(COOKIE_NAME);
}
