export function formatNumberWithCommas(
  value: number | string | undefined,
  minimumFractionDigits?: number
) {
  if (typeof value === "undefined") return "0";
  if (typeof value === "string")
    return Number(value).toLocaleString("en-US", {
      minimumFractionDigits: minimumFractionDigits ?? 2,
    });

  return value.toLocaleString("en-US", {
    minimumFractionDigits: minimumFractionDigits ?? 2,
  });
}
