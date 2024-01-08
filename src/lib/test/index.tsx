import { createScreenQueryMatchMedia } from "../utils";

export const resizeScreenSize = (width: number) => {
  window.matchMedia = createScreenQueryMatchMedia(width);
};

import { render, RenderOptions } from "@testing-library/react";
import React, { FC, ReactElement } from "react";
import fs from "fs";

const wrapper: FC<{ children: React.ReactNode }> = ({ children }) => {
  return <>{children}</>;
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => {
  const view = render(ui, { wrapper, ...options });
  // const cssFile = fs.readFileSync("src/app/globals.css", "utf8");
  // const style = document.createElement("style");
  // style.type = "text/css";
  // style.innerHTML = cssFile;
  // document.head.appendChild(style);

  return view;
};

export * from "@testing-library/react";
export { customRender as render };
