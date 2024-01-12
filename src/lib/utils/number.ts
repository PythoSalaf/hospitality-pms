export function formatNumberWithCommas(
  number: number,
  minimumFractionDigits?: number
) {
  return number.toLocaleString("en-US", {
    minimumFractionDigits: minimumFractionDigits ?? 2,
  });
}
