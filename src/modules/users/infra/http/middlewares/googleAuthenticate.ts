import { OAuth2Client } from 'google-auth-library';

export default async function googleAuthenticate(
  token: string,
): Promise<string> {
  const oAuth2Client = new OAuth2Client();

  const test = await oAuth2Client.verifyIdToken({
    idToken: token,
    audience: [
      '1080680055474-05qqruphd3fadsf9m2ghh9gtvuvr13de.apps.googleusercontent.com',
      '1080680055474-k3ahdq8c2ap4kq6606iu3feos1m43887.apps.googleusercontent.com',
    ],
  });

  return test.getPayload().email;
}
