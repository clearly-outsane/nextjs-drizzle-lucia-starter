// app/login/github/callback/route.ts
import { google, lucia } from "@/auth";
import { cookies } from "next/headers";
import { OAuth2RequestError } from "arctic";
import { generateId } from "lucia";
import { db } from "db/drizzle";
import { userTable } from "db/schema";

export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const storedState = cookies().get("google_oauth_state")?.value ?? null;
  const storedCodeVerifier = cookies().get("code_verifier")?.value ?? "";

  if (!code || !state || !storedState || state !== storedState) {
    return new Response(null, {
      status: 400,
    });
  }

  try {
    const tokens = await google.validateAuthorizationCode(
      code,
      storedCodeVerifier
    );
    const response = await fetch(
      "https://openidconnect.googleapis.com/v1/userinfo",
      {
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`,
        },
      }
    );
    const googleUser = await response.json();
    console.log("googleUser", googleUser);
    // const existingUser = await db.table("user").where("github_id", "=", githubUser.id).get();

    const existingUser = await db.query.userTable.findFirst({
      where: (table, { eq, or }) => eq(table.email, googleUser.email!),
    });

    if (existingUser) {
      const session = await lucia.createSession(existingUser.id, {});
      const sessionCookie = lucia.createSessionCookie(session.id);
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      );
      return new Response(null, {
        status: 302,
        headers: {
          Location: "/",
        },
      });
    }

    const userId = generateId(15);
    await db.insert(userTable).values({
      id: userId,
      email: googleUser.email,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const session = await lucia.createSession(userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );
    return new Response(null, {
      status: 302,
      headers: {
        Location: "/",
      },
    });
  } catch (e) {
    // the specific error message depends on the provider
    if (e instanceof OAuth2RequestError) {
      // invalid code
      return new Response(null, {
        status: 400,
      });
    }
    return new Response(null, {
      status: 500,
    });
  }
}

interface GoogleUser {
  id: string;
  login: string;
}
