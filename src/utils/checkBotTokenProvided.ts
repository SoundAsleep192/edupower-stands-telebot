export function checkBotTokenProvided(
  token: string | undefined
): token is string {
  return typeof token === 'string' && token.length > 0;
}
