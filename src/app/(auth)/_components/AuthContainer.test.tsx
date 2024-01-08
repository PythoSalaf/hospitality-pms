import { describe, expect, it } from "vitest";
import { render, screen } from "~~/lib/test";
import AuthContainer from "./AuthContainer";

describe("AuthContainer", () => {
  it("Should render the children, title, and description props in the container", () => {
    const dummyText = "children";
    const dummyTitle = "your title";
    const dummyDescription = "your description";
    render(
      <AuthContainer title={dummyTitle} description={dummyDescription}>
        <span>{dummyText}</span>
      </AuthContainer>
    );

    const childEl = screen.getByText((content) =>
      new RegExp(`${dummyText}`, "i").test(content)
    );
    const titleEl = screen.getByText((content) =>
      new RegExp(`${dummyTitle}`, "i").test(content)
    );
    const descriptionEl = screen.getByText((content) =>
      new RegExp(`${dummyDescription}`, "i").test(content)
    );
    expect(childEl).toBeInTheDocument();
    expect(titleEl).toBeInTheDocument();
    expect(descriptionEl).toBeInTheDocument();
  });
});
