import { describe, expect, it, vitest } from "vitest";

import AuthLayout, { AUTH_LAYOUT_MASCOT_CONTAINER_TEST_ID } from "./AuthLayout";
import { render, screen, resizeScreenSize } from "~~/lib/test";
import { DEFAULT_TAILWIND_CONFIG } from "~~/constants";

describe("AuthLayout", () => {
  const dummyText = "test";

  it("Should render the children in the layout", () => {
    render(
      <AuthLayout>
        <span>{dummyText}</span>
      </AuthLayout>
    );

    const childEl = screen.getByText((content) =>
      new RegExp(`${dummyText}`, "i").test(content)
    );
    expect(childEl).toBeInTheDocument();
  });
  //   Responsiveness

  describe.todo(
    "Responsive Layout (Fix responsive design testing not working, consider testing using just e2e(cypress) for now)",
    () => {
      it("Should display mascot image in the layout only on lg screens", () => {
        render(
          <AuthLayout>
            <span>{dummyText}</span>
          </AuthLayout>
        );
        const mascotContainer = screen.getByTestId(
          AUTH_LAYOUT_MASCOT_CONTAINER_TEST_ID
        );

        resizeScreenSize(DEFAULT_TAILWIND_CONFIG.screens.lg + 400);
        expect(mascotContainer).toBeVisible();
        resizeScreenSize(DEFAULT_TAILWIND_CONFIG.screens.md - 100);
        expect(mascotContainer).not.toBeVisible();
      });
      it.todo("Should display One logo in the layout depending on screen size");
    }
  );
});
