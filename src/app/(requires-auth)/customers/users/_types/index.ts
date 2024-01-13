import { TOrganization } from "~~/types";

export type TUserFilter = Partial<{
  status: TUserStatus;
  name: string;
  email: string;
  phoneNumber: string;
  date: string;
  organizationId: string;
}>;

export type TUser = {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  dateJoined: string;
  status: string;
  // status: TUserStatus;
  dob: string;
  organizationId: string;
  organization: TOrganization;
};

export type TUserDetails = TUser & {
  image: string;
  userTier: number; //1-5
  account: {
    balance: number;
    accountNumber: number | string;
    bank: string;
  };
  personalInfo: {
    fullName: string;
    phoneNumber: string;
    emailAddress: string;
    bvn: number | string;
    gender: "male" | "female";
    maritalStatus: "single" | "divorced" | "married";
    children: "none" | number;
    typeOfResidence: string;
  };
  educationAndEmployment: {
    levelOfEducation: string;
    employmentStatus: string;
    sectorOfEmployment: string;
    durationOfEmployment: string;
    officialEmail: string;
    monthlyIncome: number | string;
    loanRepayment: number | string;
  };
  socials: { name: string; link: string }[];
  guarantor: {
    fullName: string;
    phoneNumber: string;
    emailAddress: string;
    relationship: string;
  };
};

export type TUserStatus = "inactive" | "pending" | "blacklisted" | "active";
