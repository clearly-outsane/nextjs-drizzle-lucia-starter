import { Button } from "@ui/components/ui/button";

export default async function Page() {
  return (
    <div className="min-h-screen grid place-items-center">
      <a href="/login/google">
        <Button> Sign in with Google </Button>{" "}
      </a>
    </div>
  );
}
