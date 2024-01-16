export type TUserGeneralDetailItem = {
  label: string;
  value?: string | number;
  textTransform?: "uppercase" | "capitalize" | "lowercase";
};

export type TUserGeneralDetailCategoryItem = {
  title: string;
  items: TUserGeneralDetailItem[] | TUserGeneralDetailItem[][];
  gridClassName?: string;
};
