export type TUserGeneralDetailItem = {
  label: string;
  value?: string | number;
};

export type TUserGeneralDetailCategoryItem = {
  title: string;
  items: TUserGeneralDetailItem[] | TUserGeneralDetailItem[][];
  gridClassName?: string;
};
