import AuthContainer from "../_components/AuthContainer";
import AuthError from "../_components/AuthError";

export default function Page() {
  return (
    <AuthContainer title="Error!" description="An error occured .....">
      <AuthError />
    </AuthContainer>
  );
}
