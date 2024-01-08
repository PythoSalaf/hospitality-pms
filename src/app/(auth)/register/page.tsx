import AuthContainer from "../_components/AuthContainer";
import { RegisterFormContainer } from "./_components/RegisterForm";

export default function Page() {
  return (
    <AuthContainer title="Register" description="Please enter your details.">
      <RegisterFormContainer />
    </AuthContainer>
  );
}
