import { describe, expect, it, vi } from "vitest";
import { fireEvent, waitFor } from "@testing-library/react";
import { renderWithReactHookForm } from "~~/lib/test";
import LoginForm from "./LoginForm";
import { appRoutes } from "~~/routes";
import { LoginSchema } from "../_schemas";
import { z } from "zod";
import { GENERAL_PASSWORD_REGEX } from "../../_constants";

describe("LoginForm", () => {
  it("Should render a form containing an email input, password input, register link, fogot password link and login btn", () => {
    const { screen } = renderWithReactHookForm({
      ui: <LoginForm onSubmit={() => {}} />,
    });
    const form = screen.getByRole("form");
    expect(form).toBeInTheDocument();

    const emailInput = screen.getByPlaceholderText(/email/i);
    expect(emailInput).toBeInTheDocument();
    expect(emailInput).toHaveValue("");
    expect(emailInput).toHaveAttribute("role", "email");
    const passwordInput = screen.getByPlaceholderText(/password/i);
    expect(passwordInput).toBeInTheDocument();
    expect(passwordInput).toHaveValue("");
    expect(passwordInput).toHaveAttribute("role", "password");
    const registerLink = screen.getByRole("link", {
      name: /register/i,
    });
    expect(registerLink).toBeInTheDocument();
    expect(registerLink).toHaveAttribute("href", appRoutes.register);
    const forgotPasswordLink = screen.getByRole("link", {
      name: /forgot password/i,
    });
    expect(forgotPasswordLink).toBeInTheDocument();
    expect(forgotPasswordLink).toHaveAttribute(
      "href",
      appRoutes.forgotPassword
    );
    const loginBtn = screen.getByRole("button", { name: /log in/i });

    expect(loginBtn).toBeInTheDocument();
    expect(loginBtn).toHaveAttribute("type", "submit");
  });
  it.each([
    //invalid input values
    [" ", " "],
    [" ", "abcd"],
    ["james@example", ""],
    ["james@example", "abcd"],
    ["james@example", "abcdefghop"],
    ["james@example.com", "abcd"],
  ])(
    "Should return appropriate error messages when submit button is clicked with invalid input values and form should not be submitted",
    async (email, password) => {
      const handleSubmit = ({
        email,
        password,
      }: z.infer<typeof LoginSchema>) => {
        console.log(
          email,
          password,
          "This are values from the login form test"
        );
      };
      const props = {
        onSubmit: handleSubmit,
        isLoading: false,
      };
      const fnSpy = vi.spyOn(props, "onSubmit");
      const { screen, reactHookFormMethods } = renderWithReactHookForm({
        ui: <LoginForm {...props} />,
      });
      const emailInput = screen.getByRole("email");
      const passwordInput = screen.getByRole("password");
      const submitButton = screen.getByText((content) => {
        return /Log in/i.test(content);
      });
      fireEvent.change(emailInput, {
        target: {
          value: email,
        },
      });
      fireEvent.change(passwordInput, {
        target: {
          value: password,
        },
      });
      fireEvent.click(submitButton);

      await waitFor(() => {
        // Here we manually manipulate the form, setting an error the same way React Hook Form does

        reactHookFormMethods.setValue("email", email);
        reactHookFormMethods.setValue("password", password);
      });

      // when email is invalid
      !/^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)*(\.[a-z]{2,})$/.test(email) &&
        expect(
          await screen.findByText((content) =>
            /Please input a valid email/i.test(content)
          )
        ).toBeInTheDocument();

      // when password is not matching required regex
      new RegExp(GENERAL_PASSWORD_REGEX).test(password) &&
        expect(
          await screen.findByText((content) =>
            /Password should contain at least one digit and special character and a letter in uppercase, and at least 8 characters/i.test(
              content
            )
          )
        ).toBeInTheDocument();
      expect(fnSpy).not.toHaveBeenCalled();
    }
  );
  it("Should submit form when all form inputs are valid", async () => {
    const handleSubmit = ({ email, password }: z.infer<typeof LoginSchema>) => {
      console.log(email, password, "This are values from the login form test");
    };
    const props = {
      onSubmit: handleSubmit,
      isLoading: false,
    };
    const fnSpy = vi.spyOn(props, "onSubmit");
    const { screen, reactHookFormMethods } = renderWithReactHookForm({
      ui: <LoginForm {...props} />,
    });

    const emailInput = screen.getByRole("email");
    const passwordInput = screen.getByRole("password");
    const submitButton = screen.getByRole("button", {
      name: (content) => {
        return /log in/i.test(content);
      },
    });
    const emailVal = "james@example.com";
    const passwordVal = "Lendsqr123$";
    expect(submitButton).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    fireEvent.change(emailInput, {
      target: {
        value: emailVal,
      },
    });
    fireEvent.change(passwordInput, {
      target: {
        value: passwordVal,
      },
    });
    fireEvent.click(submitButton);
    await waitFor(() => {
      // Here we manually manipulate the form, setting an error the same way React Hook Form does
      reactHookFormMethods.setValue("email", emailVal);
      reactHookFormMethods.setValue("password", passwordVal);
    });

    expect(emailInput).toHaveValue(emailVal);
    expect(passwordInput).toHaveValue(passwordVal);
    expect(fnSpy).toHaveBeenCalledOnce();
  });
});
