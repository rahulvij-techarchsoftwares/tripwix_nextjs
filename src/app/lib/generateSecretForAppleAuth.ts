import { createPrivateKey } from 'crypto';
import { SignJWT } from 'jose';

interface generateSecretArgs {
  teamId: string;
  privateKey: string;
  clientId: string;
  keyId: string;
  expiresIn?: number;
}

export function generateSecretForAppleAuth({
  teamId,
  privateKey,
  clientId,
  keyId,
  expiresIn = 86400 * 180,
}: generateSecretArgs) {
  const exp = Math.ceil(Date.now() / 1000) + expiresIn;

  /**
   * How long is the secret valid in seconds.
   * @default 15780000
   */
  const expiresAt = Math.ceil(Date.now() / 1000) + expiresIn;
  const expirationTime = exp ?? expiresAt;
  console.log(
    `Apple client secret generated. Valid until: ${new Date(expirationTime * 1000)}`
  );
  return new SignJWT({})
    .setAudience('https://appleid.apple.com')
    .setIssuer(teamId || '')
    .setIssuedAt()
    .setExpirationTime(expirationTime)
    .setSubject(clientId || '')
    .setProtectedHeader({ alg: 'ES256', kid: keyId, typ: 'JWT' })
    .sign(createPrivateKey(privateKey?.replace(/\\n/g, '\n') || ''));
}
