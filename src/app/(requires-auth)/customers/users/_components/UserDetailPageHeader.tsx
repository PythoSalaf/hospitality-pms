import React from "react";
import PageHeader from "~~/components/page/PageHeader";
import PageTitle from "~~/components/page/PageTitle";
import { Button } from "~~/components/ui/button";
import BlacklistUser, { BlacklistBtn } from "./userActionButtons/BlacklistUser";
import ActivateUser, {
  ActivateUserBtn,
} from "./userActionButtons/ActivateUser";

const UserDetailPageHeader: React.FC = () => {
  return (
    <PageHeader
      title={{ text: "User Details" }}
      actions={[<BlacklistBtn />, <ActivateUserBtn />]}
    />
  );
};

export default UserDetailPageHeader;
