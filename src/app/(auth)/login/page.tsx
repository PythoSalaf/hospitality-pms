import AuthContainer from "../_components/AuthContainer";
import LoginForm from "./_components/LoginForm";

export default function Page() {
  return (
    <AuthContainer title="Welcome!" description="Enter details to login.">
      <LoginForm />
    </AuthContainer>
  );
}
