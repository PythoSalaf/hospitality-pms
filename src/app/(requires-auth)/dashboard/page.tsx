import { auth } from "~~/lib/authentication/auth";

export default function Page() {
  const session = auth();
  return (
    <div>
      Dashboard
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  );
}
