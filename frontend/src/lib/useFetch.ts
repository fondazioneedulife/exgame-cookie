import { useCallback } from "react";
import { useNavigate } from "react-router";
import { config } from "../config";

type ExtendedRequestInit = Omit<RequestInit, "body"> & {
  body?: any;
};

export type AuthenticatedFetchFunction = (
  input: RequestInfo | URL,
  init?: ExtendedRequestInit,
) => Promise<void | Response>;

/**
 * Utilizza questo hook per invocare le api. Gestisce correttamente l'autenticazione e il redirect alla pagina di login.
 *
 * Utilizzo
 * All'interno di un componente react, istanzia la variabile "fetch = useFetch()" e poi invoca le api con la stessa sintassi della funzione "fetch" standard. Esempio:
 * ```js
 * const fetch = useFetch();
 * fetch('/api/to/fetch', { options });
 * ```
 */
export const useFetch = (): AuthenticatedFetchFunction => {
  const navigate = useNavigate();

  return useCallback(
    (input, init) => {
      try {
        // check if the body is an object and stringify it
        const body =
          init?.body && typeof init.body === "object"
            ? JSON.stringify(init.body)
            : (init?.body as BodyInit);
        return fetch(input, {
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body,
          ...init,
        }).then((res) => {
          if (res.status === 401) {
            return navigate(`${config.APP_BASENAME}login`);
          }
          return res;
        });
      } catch (e) {
        return Promise.reject(e as Error);
      }
    },
    [navigate],
  );
};
