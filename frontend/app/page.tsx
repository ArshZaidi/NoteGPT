import { redirect } from "next/navigation";

export default function RootPage() {
  // Auth middleware will replace this later.
  redirect("/dashboard");
}