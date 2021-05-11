export const NullAddress = "0x0000000000000000000000000000000000000000";

export function shortenAddress(address) {
  if (!address) return "N/A";
  return `${address.substring(0, 6)}...${address.substring(36)}`;
}
