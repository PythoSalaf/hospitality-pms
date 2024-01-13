import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import mediaQuery from "css-mediaquery";
export { formatNumberWithCommas } from "./number";

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

export function shortenString(props: {
  input: string;
  maxLength?: number;
}): string {
  const { input, maxLength = 12 } = props;
  if (input.length <= maxLength) {
    return input; // No need to shorten
  }

  const ellipsis = "...";

  // Ensure there's enough room for the ellipsis
  if (maxLength < ellipsis.length) {
    return input.substr(0, maxLength); // Just truncate without ellipsis
  }

  // Calculate the length of the truncated string
  const truncatedLength = maxLength - ellipsis.length;

  // Get the truncated portion of the string and add ellipsis
  const truncatedString = input.substring(0, truncatedLength);

  // Ensure the ellipsis doesn't get added if it's already at the end
  if (truncatedString.endsWith(" ")) {
    return truncatedString.trim() + ellipsis; // Remove extra space before ellipsis
  }

  return truncatedString + ellipsis;
}
