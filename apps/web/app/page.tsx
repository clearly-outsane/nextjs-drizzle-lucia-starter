"use client";

import { signIn } from "next-auth/react";
import { Button } from "@repo/ui/components/ui/Button";

export default function Page(): JSX.Element {
  return (
    <main className={"min-h-screen w-full grid place-items-center"}>
      <Button onClick={() => signIn("google")}>Sign in</Button>
    </main>
  );
}
