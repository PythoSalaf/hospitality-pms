import AuthContainer from "../_components/AuthContainer";
import ForgotPasswordForm from "./_components/ForgotPasswordForm";

export default function Page() {
  return (
    <AuthContainer
      title="Forgot Password!"
      description="Enter your email to reset your password"
    >
      <ForgotPasswordForm />
    </AuthContainer>
  );
}
