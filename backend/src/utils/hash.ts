import { createHash } from "crypto";

export const hashIPAddress = (ipAddress: string): string => {
  const hash = createHash("sha256");
  hash.update(ipAddress);
  return hash.digest("hex"); // 16進数で出力
};
