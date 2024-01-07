import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import AppLogo from "./AppLogo";
import {
  DEFAULT_LOGO_ALT,
  DEFAULT_LOGO_HEIGHT,
  DEFAULT_LOGO_URL,
  DEFAULT_LOGO_WIDTH,
} from "~~/constants";

describe("AppLogo", () => {
  it("Should render an image with default props when no props are passed", () => {
    render(<AppLogo />);
    const imgEl = screen.getByRole("img");
    expect(imgEl).toBeDefined();
    expect(imgEl).toHaveAttribute("alt", DEFAULT_LOGO_ALT);
    expect(imgEl).toHaveAttribute("src", DEFAULT_LOGO_URL);
    expect(imgEl).toHaveAttribute("height", DEFAULT_LOGO_HEIGHT.toString());
    expect(imgEl).toHaveAttribute("width", DEFAULT_LOGO_WIDTH.toString());
  });
  it("Should render an image with custom props when props are passed", () => {
    const imgProps = {
      alt: "test",
      src: "https://next-auth.js.org/img/logo/logo-xs.png",
      height: 100,
      width: 100,
    };
    render(<AppLogo image={imgProps} />);
    const imgEl = screen.getByRole("img");
    expect(imgEl).toBeDefined();
    const imgSrcAttr = decodeURIComponent(
      imgEl?.attributes?.getNamedItem("src")?.value ?? ""
    );
    expect(imgEl).toHaveAttribute("alt", imgProps.alt);
    expect(imgSrcAttr.indexOf(imgProps.src) !== -1).toBe(true);
    expect(imgEl).toHaveAttribute("height", imgProps.height.toString());
    expect(imgEl).toHaveAttribute("width", imgProps.width.toString());
  });
  it("Should render a text when text props are passed", () => {
    const textProps = {
      className: "text-primary text-xl lg:text-3xl font-semibold",
      value: "lendsqr",
    };
    render(<AppLogo text={textProps} />);
    const spanEl = screen.getByText((content) =>
      new RegExp(`${textProps.value}`, "i").test(content)
    );
    expect(spanEl).toBeDefined();

    expect(spanEl).toHaveAttribute("class", textProps.className);
  });
});
