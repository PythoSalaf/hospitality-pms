import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "~~/components/ui/tabs";
import GeneralDetails from "./tabItems/GeneralDetails";
const tabs = [
  { value: "general-details", label: "General Details" },
  { value: "documents", label: "Documents" },
  { value: "bank-details", label: "Bank Details" },
  { value: "loans", label: "Loans" },
  { value: "savings", label: "Savings" },
  { value: "app-and-system", label: "App and System" },
];

const UserTabs = () => {
  return (
    <Tabs defaultValue="general-details" className={``}>
      <TabsList
        className={`px-2 grid mb-6 w-full h-full grid-cols-3 gap-4 md:gap-2 md:grid-cols-6 rounded-tr-none rounded-tl-none shadow-sm bg-white border border-t-0`}
      >
        {tabs.map((item, i) => (
          <TabsTrigger
            key={i}
            value={item.value}
            className={`rounded-none shadow-none`}
          >
            {item.label}
          </TabsTrigger>
        ))}
      </TabsList>
      <TabsContent value="general-details">
        <GeneralDetails />
      </TabsContent>
    </Tabs>
  );
};

export default UserTabs;
