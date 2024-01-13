import { TUser, TUserDetails } from "../_types";
import { faker } from "@faker-js/faker";
export const generateRandomUserDetails = (user: TUser): TUserDetails => {
  // Randomly generate data for fields not available in TUser
  const userDetails: TUserDetails = {
    ...user,
    image: faker.image.avatar(),
    userTier: Math.floor(Math.random() * 5) + 1,
    account: {
      balance: +faker.finance.amount(200_000, 1_000_000),
      accountNumber: faker.finance.accountNumber(),
      bank: faker.finance.accountName(),
    },
    personalInfo: {
      fullName: user.name,
      phoneNumber: user.phoneNumber,
      emailAddress: user.email,
      bvn: faker.finance.creditCardNumber(),
      gender: faker.helpers.arrayElement(["male", "female"]),
      maritalStatus: faker.helpers.arrayElement([
        "single",
        "divorced",
        "married",
      ]),
      children: faker.helpers.arrayElement(["none", 1, 2, 3]),
      typeOfResidence: faker.location.street(),
    },
    educationAndEmployment: {
      levelOfEducation: faker.helpers.arrayElement([
        "High School",
        "Bsc.",
        "Master",
        "PhD.",
      ]),
      employmentStatus: faker.helpers.arrayElement([
        "Employed",
        "Unemployed",
        "Self-Employed",
      ]),
      sectorOfEmployment: faker.company.buzzNoun(),
      durationOfEmployment: faker.helpers.arrayElement([
        "1 year",
        "2 years",
        "3 years",
        "4 years",
      ]),
      officialEmail: faker.internet.email({
        firstName: user.name,
        provider: "lendsqr.com",
      }),
      monthlyIncome: faker.finance.amount(200_000, 1_000_000),
      loanRepayment: faker.finance.amount(50_000, 100_000),
    },
    socials: Array.from({ length: 3 }, () => ({
      name: faker.helpers.arrayElement(["Twitter", "Facebook", "Instagram"]),
      link: faker.internet.userName({ firstName: user.name }),
    })),
    guarantor: {
      fullName: faker.person.fullName(),
      phoneNumber: faker.phone.number(),
      emailAddress: faker.internet.email(),
      relationship: faker.helpers.arrayElement([
        "Uncle",
        "Sister",
        "Brother",
        "Mom",
        "Colleague",
      ]),
    },
  };

  return userDetails;
};
