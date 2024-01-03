import React from "react";
import { AppError, TAppErrorProps } from "~~/components/error";

type TAuthErrorProps = TAppErrorProps & {};
const AuthError: React.FC<TAuthErrorProps> = ({
  message = "This is embarassing, an error seems to have occured while authenticating",
}) => {
  return <AppError message={message} />;
};

export default AuthError;
