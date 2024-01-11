import { auth, signOut } from "~~/lib/authentication/auth";
import DBContainer from "./_components/DBContainer";

export default function Page() {
  const session = auth();
  return (
    <div>
      Dashboard
      <DBContainer />
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  );
}
