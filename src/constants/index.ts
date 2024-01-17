import { LendQrLogo } from "~~/assets";

export const DEFAULT_LOGO_URL = LendQrLogo;
export const DEFAULT_LOGO_ALT = "logo";
export const DEFAULT_LOGO_HEIGHT = 25;
export const DEFAULT_LOGO_WIDTH = 25;

export const GENERAL_LAYOUT_CONTAINER_PADDING = "lg:px-6 px-4 py-4 lg:py-5";
export const GLOBAL_SEARCH_PLACEHOLDER_TEXT = "Search for anything";

export const EXTERNAL_DOCUMENTATION_URL =
  "https://carnation-bladder-b2b.notion.site/Lendsqr-Assessment-2be98206dfbd4b128b118d8516e26e2f?pvs=4";
// tailwind
export const DEFAULT_TAILWIND_CONFIG = {
  screens: {
    sm: 576,
    // => @media (min-width: 576px) { ... }

    md: 960,
    // => @media (min-width: 960px) { ... }

    lg: 1440,
    // => @media (min-width: 1440px) { ... }
  },
};
