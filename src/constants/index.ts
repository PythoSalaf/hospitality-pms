import { LendQrLogo } from "~~/assets";

export const DEFAULT_LOGO_URL = LendQrLogo;
export const DEFAULT_LOGO_ALT = "logo";
export const DEFAULT_LOGO_HEIGHT = 25;
export const DEFAULT_LOGO_WIDTH = 25;

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
