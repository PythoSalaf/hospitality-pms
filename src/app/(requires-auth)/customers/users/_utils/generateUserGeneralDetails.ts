import { TUserDetails, TUserGeneralDetailCategoryItem } from "../_types";

type TProps = {
  data?: Pick<
    TUserDetails,
    "personalInfo" | "educationAndEmployment" | "socials" | "guarantor"
  >;
};

export const generateUserGeneralDetailCategoryItems = (
  data: TProps["data"]
): TUserGeneralDetailCategoryItem[] => {
  const personalInfo = data?.personalInfo;
  const educationAndEmployment = data?.educationAndEmployment;
  const socials = data?.socials;
  const guarantor = data?.guarantor;

  return [
    {
      title: "Personal Information",
      items: [
        { label: "Full Name", value: personalInfo?.fullName },
        { label: "Phone Number", value: personalInfo?.phoneNumber },
        { label: "Email Address", value: personalInfo?.emailAddress },
        { label: "BVN", value: personalInfo?.bvn },
        { label: "Gender", value: personalInfo?.gender },
        { label: "Marital Status", value: personalInfo?.maritalStatus },
        { label: "Children", value: personalInfo?.children },
        { label: "Type of Residence", value: personalInfo?.typeOfResidence },
      ],
    },
    {
      title: "Education And Employment",
      gridClassName: "md:grid-cols-4 grid-cols-2",
      items: [
        {
          label: "Level of Education",
          value: educationAndEmployment?.levelOfEducation,
        },
        {
          label: "Employment Status",
          value: educationAndEmployment?.employmentStatus,
        },
        {
          label: "Sector of Employment",
          value: educationAndEmployment?.sectorOfEmployment,
        },
        {
          label: "Duration of Employment",
          value: educationAndEmployment?.durationOfEmployment,
        },
        { label: "Office Email", value: educationAndEmployment?.officialEmail },
        {
          label: "Monthly Income",
          value: educationAndEmployment?.monthlyIncome,
        },
        {
          label: "Loan Repayment",
          value: educationAndEmployment?.loanRepayment,
        },
      ],
    },
    {
      title: "Socials",
      items:
        socials?.map((social) => ({
          label: social?.name,
          value: social?.link,
        })) ?? [],
    },
    {
      title: "Guarantor",
      items: [
        {
          label: "Full Name",
          value: guarantor?.fullName,
        },
        {
          label: "Phone Number",
          value: guarantor?.phoneNumber,
        },
        {
          label: "Email Address",
          value: guarantor?.emailAddress,
        },
        {
          label: "Relationship",
          value: guarantor?.relationship,
        },
      ],
    },
  ];
};
