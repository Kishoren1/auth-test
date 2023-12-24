import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function AdminLayout({ children }) {
  const session = await getServerSession(authOptions);

  const user = session?.user;
  const isAdmin = user?.role === "admin";

  if (!isAdmin) redirect("/auth/login");

  return <>{children}</>;
}
