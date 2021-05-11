import { BigNumber as LegacyBigNumber } from "@ethersproject/bignumber";

import BigNumber from "bignumber.js";

const TEN = new BigNumber(10);

const DigitsFormatter = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 18,
});

export function formatUnits(value, unit, limit) {
  if ((!value && !Number.isInteger(value)) || !unit) return undefined;
  if (value instanceof LegacyBigNumber) {
    value = value.toString();
  }
  const number = new BigNumber(value);
  const formatted = number.div(TEN.pow(unit)).toString();
  if (!limit) return DigitsFormatter.format(formatted);
  const [whole, decimal] = formatted.split(".");
  if (decimal.length < limit) return formatted;
  return DigitsFormatter.format(`${whole}.${decimal.substr(0, limit)}`);
}

export { parseUnits } from "@ethersproject/units";
