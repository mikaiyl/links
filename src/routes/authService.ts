import { createAuth0Client } from "@auth0/auth0-spa-js";
import type { Auth0Client, PopupLoginOptions } from "@auth0/auth0-spa-js";
import { isAuthenticated, popupOpen, user } from "../store";
import {
  PUBLIC_DOMAIN,
  PUBLIC_CLIENT_ID
} from '$env/static/public';
import type { Auth0ClientOptions } from "@auth0/auth0-spa-js/dist/typings/global";

async function createClient(): Promise<Auth0Client> {
  return await createAuth0Client({
    domain: PUBLIC_DOMAIN,
    clientId: PUBLIC_CLIENT_ID
  } as Auth0ClientOptions);
}

async function loginWithPopup(client: Auth0Client, options: PopupLoginOptions | undefined) {
  popupOpen.set(true);
  try {
    await Promise.all([
      client.loginWithPopup(options),
      client.getUser().then(User => User && user.set(User)),
    ]).then(
      () => isAuthenticated.set(true)
    );
  } catch (e) {
    // eslint-disable-next-line
    console.error(e);
  } finally {
    popupOpen.set(false);
  }
}

function logout(client: Auth0Client) {
  return client.logout();
}

const auth = {
  createClient,
  loginWithPopup,
  logout
};

export default auth;