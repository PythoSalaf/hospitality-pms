import PageHeader from "~~/components/page/PageHeader";
import DBContainer from "./_components/DBContainer";

const Page: React.FC<{}> = () => {
  return (
    <div>
      <PageHeader title={{ text: "Dashboard" }} />
      <DBContainer />
    </div>
  );
};

export default Page;
