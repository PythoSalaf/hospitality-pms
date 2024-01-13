import { TUserGeneralDetailCategoryItem, TUserStatus } from "../_types";

export const USER_STATUS_OPTIONS: TUserStatus[] = [
  "inactive",
  "pending",
  "blacklisted",
  "active",
];
export const LOCAL_STORAGE_KEY_FOR_USERS = "users";
export const DUMMY_USER_GENERAL_DETAILS: TUserGeneralDetailCategoryItem[] = [
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
