import PageHeader from "~~/components/page/PageHeader";
import { useGetBranches } from "./_hooks/useGetBranches";

const Page = () => {
  // useGetBranches();
  return (
    <div>
      <PageHeader title={{ text: "Branches" }} />
    </div>
  );
};

export default Page;
