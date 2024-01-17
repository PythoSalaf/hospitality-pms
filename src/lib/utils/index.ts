import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import mediaQuery from "css-mediaquery";
export { formatNumberWithCommas } from "./number";

/**
 * Merges and deduplicates the provided class values using Tailwind CSS utilities.
 *
 * @param inputs - Class values to be merged.
 * @returns Merged and deduplicated class string.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Creates a function to match media queries based on a specified width.
 *
 * @param width - Width to use for media query matching.
 * @returns Function that simulates matchMedia with the specified width.
 */
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

/**
 * Shortens a string if its length exceeds a specified maximum length.
 *
 * @param props - Input and optional maximum length for shortening.
 * @returns Shortened string with ellipsis if max length is exceeded.
 */
export function shortenString(props: {
  input: string;
  maxLength?: number;
}): string {
  const { input, maxLength = 12 } = props;
  if (input.length <= maxLength) {
    return input;
  }

  const ellipsis = "...";

  if (maxLength < ellipsis.length) {
    return input.substring(0, maxLength);
  }

  const truncatedLength = maxLength - ellipsis.length;

  const truncatedString = input.substring(0, truncatedLength);

  if (truncatedString.endsWith(" ")) {
    return truncatedString.trim() + ellipsis;
  }

  return truncatedString + ellipsis;
}
