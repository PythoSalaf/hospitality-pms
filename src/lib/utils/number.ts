/**
 * Formats a number or string with commas and optional minimum fraction digits.
 *
 * @param value - The number or string to be formatted.
 * @param _minimumFractionDigits - Optional. The minimum number of fraction digits. Defaults to 2.
 * @returns A string representing the formatted number with commas.
 */
export function formatNumberWithCommas(
  value: number | string | undefined,
  _minimumFractionDigits?: number
) {
  const minimumFractionDigits = _minimumFractionDigits ?? 2;
  if (typeof value === "undefined") return "0";
  if (typeof value === "string")
    return Number(value).toLocaleString("en-US", {
      minimumFractionDigits: minimumFractionDigits,
    });

  return value.toLocaleString("en-US", {
    minimumFractionDigits: minimumFractionDigits,
  });
}
