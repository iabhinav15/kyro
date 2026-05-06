import "server-only";

import {
  createCipheriv,
  createDecipheriv,
  createHash,
  randomBytes,
} from "crypto";

const ALGORITHM = "aes-256-gcm";
const IV_LENGTH = 12;
const ENCRYPTION_PREFIX = "v1";

const getEncryptionKey = () => {
  const secret =
    process.env.CREDENTIAL_ENCRYPTION_KEY ?? process.env.BETTER_AUTH_SECRET;

  if (!secret) {
    throw new Error(
      "Missing CREDENTIAL_ENCRYPTION_KEY or BETTER_AUTH_SECRET environment variable",
    );
  }

  return createHash("sha256").update(secret).digest();
};

export const encryptApiKey = (value: string) => {
  const iv = randomBytes(IV_LENGTH);
  const cipher = createCipheriv(ALGORITHM, getEncryptionKey(), iv);

  const encrypted = Buffer.concat([
    cipher.update(value, "utf8"),
    cipher.final(),
  ]);
  const authTag = cipher.getAuthTag();

  return [
    ENCRYPTION_PREFIX,
    iv.toString("base64url"),
    authTag.toString("base64url"),
    encrypted.toString("base64url"),
  ].join(":");
};

export const decryptApiKey = (value: string) => {
  const [version, iv, authTag, encrypted] = value.split(":");

  if (version !== ENCRYPTION_PREFIX || !iv || !authTag || !encrypted) {
    return value;
  }

  const decipher = createDecipheriv(
    ALGORITHM,
    getEncryptionKey(),
    Buffer.from(iv, "base64url"),
  );

  decipher.setAuthTag(Buffer.from(authTag, "base64url"));

  return Buffer.concat([
    decipher.update(Buffer.from(encrypted, "base64url")),
    decipher.final(),
  ]).toString("utf8");
};
