"use client";

import { Button } from "@repo/ui/components/ui/Button";

export default function Page(): JSX.Element {
  return (
    <main className={"min-h-screen w-full grid place-items-center"}>
      <div className="flex flex-col">
        {" "}
        <span> Dashboard</span>{" "}
        <a className="underline" href="/login">
          {" "}
          Login{" "}
        </a>
      </div>
    </main>
  );
}
