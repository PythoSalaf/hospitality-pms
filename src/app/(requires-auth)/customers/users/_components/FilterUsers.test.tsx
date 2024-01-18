import { describe, expect, it, vi } from "vitest";
import { fireEvent, waitFor } from "@testing-library/react";
import { renderWithReactHookForm } from "~~/lib/test";
import FilterUsers from "./FilterUsers";

describe("FilterUsers", () => {
  it("Should display svg trigger button", () => {
    const { screen } = renderWithReactHookForm({
      ui: <FilterUsers handleSave={() => {}} />,
    });
    const triggerBtn = screen.getByRole("button");

    expect(triggerBtn).toBeInTheDocument();
  });
  it("Should form elements(organization select, username, email, date, phoneNumber, status, reset btn, filter btn) correctly", () => {
    const { screen } = renderWithReactHookForm({
      ui: <FilterUsers handleSave={() => {}} />,
    });
    //   Arrange
    //   Act
    const triggerBtn = screen.getByRole("button");
    fireEvent.click(triggerBtn);
    const orgSelect = screen.getByText((content) =>
      /select organization/i.test(content)
    );
    const nameInput = screen.getByText((content) => /name/i.test(content));
    const emailInput = screen.getByText((content) => /email/i.test(content));
    const dateInput = screen.getByText((content) =>
      /pick a date/i.test(content)
    );
    const phoneInput = screen.getByText((content) => /phone/i.test(content));
    const statusInput = screen.getByText((content) =>
      /select status/i.test(content)
    );
    const resetBtn = screen.getByRole("button", {
      name: (content) => /reset/i.test(content),
    });
    const filterBtn = screen.getByRole("button", {
      name: (content) => /filter/i.test(content),
    });

    // Assert

    expect(orgSelect).toBeInTheDocument();
    expect(nameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(dateInput).toBeInTheDocument();
    expect(phoneInput).toBeInTheDocument();
    expect(statusInput).toBeInTheDocument();
    expect(resetBtn).toBeInTheDocument();
    expect(filterBtn).toBeInTheDocument();
  });

  it("Should call handleSave function when filter button is clicked", async () => {
    const handleSave = vi.fn();
    const { screen, reactHookFormMethods } = renderWithReactHookForm({
      ui: <FilterUsers handleSave={handleSave} />,
    });
    const triggerBtn = screen.getByRole("button");
    fireEvent.click(triggerBtn);
    const filterBtn = screen.getByRole("button", {
      name: (content) => /filter/i.test(content),
    });
    fireEvent.click(filterBtn);
    await waitFor(() => {
      // reactHookFormMethods.handleSubmit(handleSave);
      reactHookFormMethods.handleSubmit(handleSave);
    });

    expect(handleSave).toHaveBeenCalledOnce();
  }); //use it.each
  it("Should reset form elements when reset button is clicked", async () => {
    const handleSave = vi.fn();
    const { screen, reactHookFormMethods } = renderWithReactHookForm({
      ui: (
        <FilterUsers
          handleSave={handleSave}
          filterValues={{ status: "active" }}
        />
      ),
    });
    const triggerBtn = screen.getByRole("button");
    fireEvent.click(triggerBtn);
    // TODO: DO Same 4 other inputs also create a test to ensure that form elements are same as passed in filter vals
    const phoneInput = screen.getByRole("input", {
      name: (content) => /phone number/i.test(content),
    });
    fireEvent.change(phoneInput, {
      target: {
        value: "09090909099",
      },
    });
    await waitFor(() => {
      reactHookFormMethods.setValue("phoneNumber", "09090909099");
    });

    expect(phoneInput).toHaveAttribute("value", "09090909099");

    const resetBtn = screen.getByRole("button", {
      name: (content) => /reset/i.test(content),
    });
    fireEvent.click(resetBtn);
    await waitFor(() => {
      reactHookFormMethods.reset();
    });

    expect(phoneInput).toHaveAttribute("value", "");
  });
  //   _______ Then move to the next step __________
  // -----hooks
  // - usePagination [Done]
  // - useGetUsers [Here]
  // - useGetOrganizations [Done]
  // -----components
  // -forms
  // - Login Form [Done]
  // - User Filter Form [PENDING]
  // - User Table
  // - Select Organization Globally
  // - User Components
});
