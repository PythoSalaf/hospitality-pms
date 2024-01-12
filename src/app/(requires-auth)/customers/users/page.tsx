import PageHeader from "~~/components/page/PageHeader";
import { UserCards } from "./_components/UserCard";

const Page = () => {
  return (
    <div className="">
      <PageHeader title={{ text: "Users" }} />
      <UserCards />
    </div>
  );
};

export default Page;
