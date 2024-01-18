import React from "react";
import {
  ActiveUserCardIcon,
  UserCardIcon,
  UserWithLoanCardIcon,
  UserWithSavingsCardIcon,
} from "~~/components/icons";

import { Card, CardContent, CardTitle } from "~~/components/ui/card";
import { formatNumberWithCommas } from "~~/lib/utils";

export type TUserInsightItem = { title: string; amount: number };
export interface UserCardProps {
  item: TUserInsightItem;
  icon: React.ReactNode;
  backgroundColor: string;
}

const userInsights: UserCardProps[] = [
  {
    icon: <UserCardIcon />,
    item: {
      amount: 2456,
      title: "Users",
    },
    backgroundColor: "#DF18FF10",
  },
  {
    backgroundColor: "#5718FF10",
    icon: <ActiveUserCardIcon />,
    item: {
      amount: 2456,
      title: "Active Users",
    },
  },
  {
    backgroundColor: "#F55F4410",
    icon: <UserWithLoanCardIcon />,
    item: {
      amount: 1706,
      title: "Users with loans",
    },
  },
  {
    backgroundColor: "#FF336610",
    icon: <UserWithSavingsCardIcon />,
    item: {
      amount: 102465,
      title: "Users with savings",
    },
  },
];

export const UserCard: React.FC<UserCardProps> = ({
  item,
  icon,
  backgroundColor,
}) => {
  const { title, amount } = item;
  return (
    <Card className="">
      <CardContent className="flex flex-col gap-2 mt-6">
        <CardTitle>
          <div className="p-3 w-max rounded-full" style={{ backgroundColor }}>
            {icon}
          </div>
        </CardTitle>
        <h6
          className={`uppercase text-sm text-muted font-worksans font-medium`}
        >
          {title}
        </h6>
        <span className={`font-semibold text-primary text-2xl font-worksans`}>
          {formatNumberWithCommas(amount, 0)}
        </span>
      </CardContent>
    </Card>
  );
};

export const UserCards = () => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4`}>
      {userInsights.map((props, i) => (
        <UserCard key={i} {...props} />
      ))}
    </div>
  );
};

export default UserCard;
