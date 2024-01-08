import { describe, expect, it } from "vitest";
import { render, screen } from "~~/lib/test";
import RegisterForm from "./RegisterForm";
import { appRoutes } from "~~/routes";

describe("RegisterForm", () => {
  it("Should render a form containing a name input, email input, password input, login link, and reqister btn", () => {
    render(<RegisterForm onSubmit={() => {}} />);
    const form = screen.getByRole("form");
    expect(form).toBeInTheDocument();
    const nameInput = screen.getByPlaceholderText(/name/i);
    expect(nameInput).toBeInTheDocument();
    expect(nameInput).toHaveValue("");
    expect(nameInput).toHaveAttribute("role", "textbox");
    const emailInput = screen.getByPlaceholderText(/email/i);
    expect(emailInput).toBeInTheDocument();
    expect(emailInput).toHaveValue("");
    expect(emailInput).toHaveAttribute("role", "email");
    const passwordInput = screen.getByPlaceholderText(/password/i);
    expect(passwordInput).toBeInTheDocument();
    expect(passwordInput).toHaveValue("");
    expect(passwordInput).toHaveAttribute("role", "password");
    const loginLink = screen.getByRole("link", {
      name: /login/i,
    });
    expect(loginLink).toBeInTheDocument();
    expect(loginLink).toHaveAttribute("href", appRoutes.login);
    const registerBtn = screen.getByRole("button", { name: /register/i });

    expect(registerBtn).toBeInTheDocument();
    expect(registerBtn).toHaveAttribute("type", "submit");
  });
  it.todo("Should prevent submitting the form if the fields are invalid");
  it.todo("Should submit the form if the fields are valid");
});
