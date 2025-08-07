import { setCookie, getCookie, deleteCookie } from 'cookies-next';

export const setAuthCookie = (token: string, name: string) => {
  const toBase64 = Buffer.from(token).toString('base64');

  setCookie(name, toBase64, {
    maxAge: 30 * 24 * 60 * 60,
    path: '/',
    // sameSite: 'strict',
    httpOnly: false, // process.env.NODE_ENV !== 'development',
    secure: true, //process.env.NODE_ENV !== 'development',
  });
};

// helpers to get cookies
const getAuthCookie = (name: string): string | undefined => {
  const cookie = getCookie(name);

  if (!cookie) {
    console.error(`Cookie with name ${name} not found`);
    return undefined;
  }

  try {
    return Buffer.from(cookie as string, 'base64').toString('ascii');
  } catch (error) {
    console.error('Failed to decode cookie:', error);
    return undefined;
  }
};

// Check if the token is valid by checking the expiry date (e.g., from JWT `exp` field)
export const getValidAuthToken = (
  tokenName: 'access_token' | 'id_token' | 'refresh_token'
): string | null => {
  const token = getAuthCookie(tokenName);

  console.log('token---', token);

  if (!token) return null;

  return token;
};

// Helper to delete the auth cookie (e.g., for logout)
export const deleteAuthCookie = (name: string) => {
  deleteCookie(name, { path: '/' });
};
