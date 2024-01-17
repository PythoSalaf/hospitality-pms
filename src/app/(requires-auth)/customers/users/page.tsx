import PageHeader from "~~/components/page/PageHeader";
import UsersContainer from "./_components/UsersContainer";

const Page = () => {
  return (
    <div className="">
      <PageHeader title={{ text: "Users" }} />
      <UsersContainer />
    </div>
  );
};

export default Page;
