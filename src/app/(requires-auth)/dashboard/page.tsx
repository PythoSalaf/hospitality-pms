import { auth, signOut } from "~~/lib/authentication/auth";
import DBContainer from "./_components/DBContainer";

const Page: React.FC<{}> = () => {
  const session = auth();
  return (
    <div>
      <DBContainer />
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  );
};

export default Page;
