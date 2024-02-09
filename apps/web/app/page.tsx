import { logout } from "@/lib/auth/logout";
import { validateRequest } from "@/lib/auth/validate-request";
import { Button } from "@repo/ui/components/ui/Button";
import { redirect } from "next/navigation";

export default async function Page(): Promise<JSX.Element> {
  const { user, session } = await validateRequest();

  if (!user) {
    redirect("/login");
  }

  return (
    <main className={"min-h-screen w-full grid place-items-center"}>
      <div className="flex flex-col">
        <span> Dashboard</span>
        <form action={logout}>
          <Button>Logout</Button>
        </form>
      </div>
    </main>
  );
}
