import PageGoBack from "~~/components/page/PageGoBack";
import PageTitle from "~~/components/page/PageTitle";
import { Button } from "~~/components/ui/button";
import { appRoutes } from "~~/routes";
import UserDetailPageHeader from "../_components/UserDetailPageHeader";
import UserDetailsContainer from "../_components/UserDetailsContainer";

const Page = ({ params: { id } }: { params: { id: string } }) => {
  return (
    <div className="">
      <PageGoBack text="Back to Users" url={appRoutes.customerUsers} />
      <UserDetailPageHeader />

      <UserDetailsContainer {...{ id }} />
    </div>
  );
};

export default Page;
