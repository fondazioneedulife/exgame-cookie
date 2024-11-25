import { useNavigate } from "react-router";
import { config } from "../config";

export type AuthenticatedFetchFunction = (
  input: RequestInfo | URL,
  init?: RequestInit,
) => Promise<void | Response>;

export const useFetch = (): AuthenticatedFetchFunction => {
  const navigate = useNavigate();

  return (...params) =>
    fetch(...params).then((res) => {
      if (res.status === 401) {
        return navigate(`${config.APP_BASENAME}login`);
      }
      return res;
    });
};
