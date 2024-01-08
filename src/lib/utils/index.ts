import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import mediaQuery from "css-mediaquery";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const createScreenQueryMatchMedia = (width: number) => {
  return (query: string) => {
    return {
      matches: mediaQuery.match(query, { width }),
      media: "",
      addListener: () => {},
      removeListener: () => {},
      onchange: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => true,
    };
  };
};
