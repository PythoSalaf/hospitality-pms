import { Avatar, AvatarFallback, AvatarImage } from "~~/components/ui/avatar";
import { Card, CardContent } from "~~/components/ui/card";
import { formatNumberWithCommas } from "~~/lib/utils";
import { useState } from "react";
import StarPicker from "react-star-picker";

const UserOverview = () => {
  return (
    <Card className={`rounded-br-none rounded-bl-none border-b-0`}>
      <CardContent className=" flex gap-12 md:flex-row items-start flex-wrap space-y-6 mt-6 pb-12">
        <UserBaseInfo />
        <UserTier />
        <UserAcc />
      </CardContent>
    </Card>
  );
};

const UserBaseInfo = () => {
  return (
    <div className={`flex gap-4 items-center`}>
      <Avatar className="lg:h-28 lg:w-28 md:w-24 md:h-24 h-18 w-18">
        <AvatarImage src="" alt="user avatar" />
        <AvatarFallback>
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.04053 35.1796C6.47961 32.2202 7.79365 29.6264 9.97961 27.4C12.7405 24.6 16.0732 23.2 19.9796 23.2C23.886 23.2 27.2204 24.6 29.9796 27.4C32.1796 29.6266 33.5062 32.2204 33.9593 35.1796M28.1405 14.0204C28.1405 16.247 27.3468 18.1532 25.7593 19.7408C24.1734 21.3408 22.253 22.1408 20.0001 22.1408C17.7594 22.1408 15.8409 21.3408 14.2409 19.7408C12.6534 18.1533 11.8596 16.247 11.8596 14.0204C11.8596 11.7673 12.6534 9.84679 14.2409 8.25959C15.8409 6.67367 17.7596 5.87991 20.0001 5.87991C22.2532 5.87991 24.1737 6.67367 25.7593 8.25959C27.3468 9.84711 28.1405 11.7674 28.1405 14.0204Z"
              stroke="#213F7D"
              stroke-width="3"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </AvatarFallback>
      </Avatar>
      <div>
        <h2 className="text-lg font-medium md:text-xl lg:text-2xl text-primary">
          Grace Effiom
        </h2>
        <p className={`text-[#545F7D] mt-2`}>LSQFf587g90</p>
      </div>
    </div>
  );
};
const UserTier = () => {
  const [rating, setRating] = useState(3);

  return (
    <div className={`flex flex-col items-start border-l border-r px-12`}>
      <p className={`text-[#545F7D]`}>User's Tier</p>
      <div className={`mt-2`}>
        <StarPicker
          value={rating}
          onChange={(val) => typeof val === "number" && setRating(val)}
          disabled
          size={30}
          numberStars={3}
        />
      </div>
    </div>
  );
};

const UserAcc = () => {
  return (
    <div>
      <h2 className=" text-lg font-medium  lg:text-2xl text-[#213F7D]">
        ₦{formatNumberWithCommas(200_000)}
      </h2>
      <p className={`text-primary mt-2`}>9912345678/Providus Bank</p>
    </div>
  );
};

export default UserOverview;