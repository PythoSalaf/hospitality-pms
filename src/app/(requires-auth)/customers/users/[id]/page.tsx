import PageGoBack from "~~/components/page/PageGoBack";
import PageTitle from "~~/components/page/PageTitle";
import { Button } from "~~/components/ui/button";
import { appRoutes } from "~~/routes";
import UserDetailPageHeader from "../_components/UserDetailPageHeader";
import UserDetailsContainer from "../_components/UserDetailsContainer";

const Page = ({ params: { id } }: { params: { id: number } }) => {
  return (
    <div className="">
      <PageGoBack text="Back to Users" url={appRoutes.customerUsers} />
      <UserDetailPageHeader />

      <UserDetailsContainer />
    </div>
  );
};

export default Page;
