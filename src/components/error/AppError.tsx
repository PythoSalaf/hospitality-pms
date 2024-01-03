import React from "react";

export type TAppErrorProps = { message?: string };
const AppError: React.FC<TAppErrorProps> = ({
  message = "OOoops! An error occured!",
}) => {
  // TODO: Flesh out this component, AppError
  return <div>{message}</div>;
};

export default AppError;
