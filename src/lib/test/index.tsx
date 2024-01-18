// import fs from "fs";
import { createScreenQueryMatchMedia } from "../utils";
import { FormProvider, useForm } from "react-hook-form";
import { render, RenderOptions } from "@testing-library/react";
import React, { FC, ReactElement } from "react";

/**
 * Creates a mock Fetch API response object for testing purposes.
 *
 * @param {Object} props - The properties to configure the mock response.
 * @param {unknown} props.data - The data to be resolved when calling `json()` on the response.
 * @param {Partial<Response>} [props.response={}] - Additional response properties (e.g., status, statusText).
 * @returns {Object} - A mock Fetch API response object.
 */
export const createMockFetchResponse = (props: {
  data: unknown;
  response?: Partial<Response>;
}) => {
  const { data, response = {} } = props;
  const { ok, status, statusText, url } = response;
  return {
    json: () => Promise.resolve(data), // Return a promise that resolves with the provided data

    ok, // Indicate that the response is "OK"
    redirected: false, // Indicate that the response is not redirected
    headers: {
      "content-type": "application/json",
    },
    status, // Set the status code to 200 for a successful response
    statusText, // Set the status text to "OK"
    url,
  };
};
/**
 * Resizes the screen size to the specified width for testing purposes.
 *
 * @param width - The width to set the screen size to.
 */
export const resizeScreenSize = (width: number) => {
  window.matchMedia = createScreenQueryMatchMedia(width);
};

/**
 * Wrapper component for rendering components with a custom wrapper.
 *
 * @param children - The children to be wrapped.
 */

const wrapper: FC<{ children: React.ReactNode }> = ({ children }) => {
  return <>{children}</>;
};

/**
 * Custom render function that wraps the provided UI with a custom wrapper.
 *
 * @param ui - The React element to render.
 * @param options - Additional rendering options.
 * @returns The rendered view.
 */
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

/**
 * Renders a React element with React Hook Form support.
 *
 * @param props - The rendering options.
 * @returns An object containing the screen and React Hook Form methods.
 */
const renderWithReactHookForm = (props: {
  ui: ReactElement;
  defaultValues?: {
    [key: string]: string | number | boolean | object | NonNullable<unknown>;
  };
}) => {
  const { ui, defaultValues } = props;
  let reactHookFormMethods: unknown;
  const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const methods = useForm({ defaultValues });
    reactHookFormMethods = methods;

    return <FormProvider {...methods}>{children}</FormProvider>;
  };
  return {
    screen: { ...render(ui, { wrapper: Wrapper }) },
    reactHookFormMethods: reactHookFormMethods as ReturnType<typeof useForm>,
  };
};

export * from "@testing-library/react";
export { customRender as render, renderWithReactHookForm };
