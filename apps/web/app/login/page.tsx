import { validateRequest } from "@/lib/auth/validate-request";
import { Button } from "@ui/components/ui/button";
import { redirect } from "next/navigation";

export default async function Page() {
  const { user, session } = await validateRequest();

  if (user) {
    redirect("/");
  }

  return (
    <div className="min-h-screen grid place-items-center">
      <a href="/login/google">
        <Button> Sign in with Google </Button>{" "}
      </a>
    </div>
  );
}
