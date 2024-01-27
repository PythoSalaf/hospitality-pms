import React from "react";
import {
  ActiveUserCardIcon,
  UserCardIcon,
  UserWithLoanCardIcon,
  UserWithSavingsCardIcon,
} from "~~/components/icons";

import { Card, CardContent, CardTitle } from "~~/components/ui/card";
import { formatNumberWithCommas } from "~~/lib/utils";

export type TDBInsightItem = { title: string; amount: number };
export interface DBCardProps {
  item: TDBInsightItem;
  icon: React.ReactNode;
  backgroundColor: string;
}

const userInsights: DBCardProps[] = [
  {
    icon: <UserCardIcon />,
    item: {
      amount: 2456,
      title: "New Customers",
    },
    backgroundColor: "#DF18FF10",
  },
  {
    backgroundColor: "#5718FF10",
    icon: <ActiveUserCardIcon />,
    item: {
      amount: 2456,
      title: "Active Orders",
    },
  },
  {
    backgroundColor: "#F55F4410",
    icon: <UserWithLoanCardIcon />,
    item: {
      amount: 1706,
      title: "Total Bookings & Rese ...",
    },
  },
  {
    backgroundColor: "#FF336610",
    icon: <UserWithSavingsCardIcon />,
    item: {
      amount: 102465,
      title: "Available Rooms",
    },
  },
];

export const DBCard: React.FC<DBCardProps> = ({
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

export const DBCards = () => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4`}>
      {userInsights.map((props, i) => (
        <DBCard key={i} {...props} />
      ))}
    </div>
  );
};

export default DBCard;
