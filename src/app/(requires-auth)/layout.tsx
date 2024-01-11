import { AppLayout } from "~~/components/layouts";
import { auth } from "~~/lib/authentication/auth";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  return <AppLayout session={session}>{children}</AppLayout>;
}
