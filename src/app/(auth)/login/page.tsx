import AuthContainer from "../_components/AuthContainer";
import { LoginFormContainer } from "./_components/LoginFormContainer";

export default function Page() {
  return (
    <AuthContainer title="Welcome!" description="Enter details to login.">
      <LoginFormContainer />
    </AuthContainer>
  );
}
