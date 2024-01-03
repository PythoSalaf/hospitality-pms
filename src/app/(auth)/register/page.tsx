import AuthContainer from "../_components/AuthContainer";
import RegisterForm from "./_components/RegisterForm";

export default function Page() {
  return (
    <AuthContainer title="Register" description="Please enter your details.">
      <RegisterForm />
    </AuthContainer>
  );
}
