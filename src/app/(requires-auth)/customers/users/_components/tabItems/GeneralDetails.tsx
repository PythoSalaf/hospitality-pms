import { Card, CardContent } from "~~/components/ui/card";

type TDetailItem = {
  label: string;
  value: string;
};

type TDetailCategoryItem = {
  title: string;
  items: TDetailItem[] | TDetailItem[][];
  gridClassName?: string;
};

const categoryItems: TDetailCategoryItem[] = [
  {
    title: "Personal Information",

    items: [
      { label: "Full Name", value: "Grace Effion" },
      { label: "Phone Number", value: "07080080909" },
      { label: "Email Address", value: "grace@gmail.com" },
      { label: "BVN", value: "07080080909" },
      { label: "Gender", value: "Female" },
      { label: "Marital Status", value: "Single" },
      { label: "Children", value: "None" },
      { label: "Type of Residence", value: "Parent’s Apartment" },
    ],
  },
  {
    title: "Education And Employement",
    gridClassName: "md:grid-cols-4 grid-cols-2",
    items: [
      { label: "Level of Education", value: "B.Sc" },
      { label: "Employemnt Status", value: "Employed" },
      { label: "Sector of Employment", value: "FinTech" },
      { label: "Duration of Employment", value: "2 years" },
      { label: "Office Email", value: "grace@lendsqr.com" },
      { label: "Monthly Income", value: "₦200,000.00- ₦400,000.00" },
      { label: "Loan Repayment", value: "40,000" },
    ],
  },
  {
    title: "Socials",
    items: [
      { label: "Twitter", value: "@grace_effiom" },
      { label: "Facebook", value: "Grace Effiom" },
      { label: "Instagram", value: "@grace_effiom" },
    ],
  },
  {
    title: "Guarantor",
    items: [
      [
        { label: "Full Name", value: "Debby Ogana" },
        { label: "Phone Number", value: "07060780922" },
        { label: "Email Address", value: "debby@gmail.com" },
        { label: "Relationship", value: "Sister" },
      ],
      [
        { label: "Full Name", value: "Debby Ogana" },
        { label: "Phone Number", value: "07060780922" },
        { label: "Email Address", value: "debby@gmail.com" },
        { label: "Relationship", value: "Sister" },
      ],
    ],
  },
];

const GeneralDetails = () => {
  return (
    <Card>
      <CardContent className="space-y-14 my-8">
        {categoryItems.map(
          (
            { title, items, gridClassName = "md:grid-cols-5 grid-cols-2" },
            x
          ) => (
            <div
              className={`flex flex-col gap-4 ${
                x !== categoryItems.length - 1
                  ? "border-b border-b-[#e5ebf5] pb-8"
                  : ""
              }`}
              key={x}
            >
              <h2 className="scroll-m-20 text-base font-medium text-primary mb-4">
                {title}
              </h2>
              {items.length > 0 && !Array.isArray(items[0]) && (
                <div className={`grid ${gridClassName} gap-y-8`}>
                  {items.map((detail, i) => (
                    <div key={i} className={`flex flex-col gap-2`}>
                      <p
                        className={`text-sm uppercase font-normal text-[#545F7D]`}
                      >
                        {(detail as unknown as TDetailItem).label}
                      </p>
                      <p
                        className={`text-base capitalize font-medium text-[#545F7D]`}
                      >
                        {(detail as unknown as TDetailItem).value}
                      </p>
                    </div>
                  ))}
                </div>
              )}
              {items.length > 0 && Array.isArray(items[0]) && (
                <div className={`flex flex-col gap-4`}>
                  {items.map((detail, i) => (
                    <div
                      key={i}
                      className={`grid ${gridClassName} gap-y-8
                 ${
                   i !== items.length - 1
                     ? "border-b border-b-[#e5ebf5] pb-8 mb-12"
                     : ""
                 }`}
                    >
                      {(detail as unknown as TDetailItem[]).map(
                        (innerDetail, j) => (
                          <div key={j} className={`flex flex-col gap-2`}>
                            <p
                              className={`text-sm uppercase font-normal text-[#545F7D]`}
                            >
                              {innerDetail.label}
                            </p>
                            <p
                              className={`text-base capitalize font-medium text-[#545F7D]`}
                            >
                              {innerDetail.value}
                            </p>
                          </div>
                        )
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )
        )}
      </CardContent>
    </Card>
  );
};

export default GeneralDetails;
