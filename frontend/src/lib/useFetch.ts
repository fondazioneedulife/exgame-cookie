import { useCallback } from "react";
import { useNavigate } from "react-router";
import { config } from "../config";

export type AuthenticatedFetchFunction = (
  input: RequestInfo | URL,
  init?: RequestInit,
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
        const body = init?.body && JSON.stringify(init.body);
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
        return Promise.reject(e);
      }
    },
    [navigate],
  );
};
