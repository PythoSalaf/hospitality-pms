import React from "react";
import PageHeader from "~~/components/page/PageHeader";
import PageTitle from "~~/components/page/PageTitle";
import { Button } from "~~/components/ui/button";
import BlacklistUser from "./userActionButtons/BlacklistUser";
import ActivateUser from "./userActionButtons/ActivateUser";

const UserDetailPageHeader = () => {
  return (
    <PageHeader
      title={{ text: "User Details" }}
      actions={[<BlacklistUser />, <ActivateUser />]}
    />
  );
};

export default UserDetailPageHeader;
