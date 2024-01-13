import { Card, CardContent } from "~~/components/ui/card";
import { TUserDetails, TUserGeneralDetailItem } from "../../_types";
import { generateUserGeneralDetailCategoryItems } from "../../_utils/generateUserGeneralDetails";
type TProps = {
  data?: Pick<
    TUserDetails,
    "personalInfo" | "educationAndEmployment" | "socials" | "guarantor"
  >;
};

const GeneralDetails: React.FC<TProps> = ({ data }) => {
  const categoryItems = generateUserGeneralDetailCategoryItems(data);
  return (
    <Card>
      <CardContent className="space-y-14 my-8 truncate ">
        {categoryItems.map(
          (
            {
              title,
              items,
              gridClassName = "md:grid-cols-5 grid-cols-2 gap-x-4",
            },
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
              <h2 className=" text-base font-medium text-primary mb-4">
                {title}
              </h2>
              {items.length > 0 && !Array.isArray(items[0]) && (
                <div className={`grid ${gridClassName} gap-y-8`}>
                  {items.map((detail, i) => (
                    <div key={i} className={`flex flex-col gap-2`}>
                      <p
                        className={`text-sm uppercase font-normal text-[#545F7D]`}
                      >
                        {(detail as unknown as TUserGeneralDetailItem).label}
                      </p>
                      <p
                        className={`text-base capitalize font-medium text-[#545F7D]`}
                      >
                        {(detail as unknown as TUserGeneralDetailItem).value}
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
                      {(detail as unknown as TUserGeneralDetailItem[]).map(
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
