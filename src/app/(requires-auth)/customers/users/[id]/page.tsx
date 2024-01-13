import PageGoBack from "~~/components/page/PageGoBack";
import { appRoutes } from "~~/routes";
import UserDetailsContainer from "../_components/UserDetailsContainer";

const Page = ({ params: { id } }: { params: { id: string } }) => {
  return (
    <div className="">
      <PageGoBack text="Back to Users" url={appRoutes.customerUsers} />

      <UserDetailsContainer {...{ id }} />
    </div>
  );
};

export default Page;
