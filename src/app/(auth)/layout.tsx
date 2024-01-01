import AuthLayout from "./_components/AuthLayout";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthLayout>{children}</AuthLayout>;
}
