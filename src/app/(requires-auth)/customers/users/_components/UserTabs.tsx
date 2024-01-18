import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "~~/components/ui/tabs";
import GeneralDetails from "./tabItems/GeneralDetails";
import { TUserDetails } from "../_types";
import SkeletonLoader from "~~/components/loader/SkeletonLoader";
const tabs = [
  { value: "general-details", label: "General Details" },
  { value: "documents", label: "Documents" },
  { value: "bank-details", label: "Bank Details" },
  { value: "loans", label: "Loans" },
  { value: "savings", label: "Savings" },
  { value: "app-and-system", label: "App and System" },
];

const UserTabs: React.FC<{ data?: TUserDetails; isLoading?: boolean }> = ({
  data,
  isLoading,
}) => {
  return (
    <SkeletonLoader loading={isLoading} paragraph={{ rows: 25 }}>
      <Tabs defaultValue="general-details" className={``}>
        <TabsList
          className={`px-4 md:px-4 lg:px-4 grid mb-6 w-full h-full gap-4 md:gap-2 grid-cols-3 md:grid-cols-6 rounded-tr-none rounded-tl-none shadow-sm bg-white border border-t-0`}
        >
          {tabs.map((item, i) => (
            <TabsTrigger
              key={i}
              value={item.value}
              className={`rounded-none shadow-none mb-4 md:mb-0 text-sm lg:text-base`}
            >
              {item.label}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value="general-details">
          <GeneralDetails data={data} />
        </TabsContent>
      </Tabs>
    </SkeletonLoader>
  );
};

export default UserTabs;
