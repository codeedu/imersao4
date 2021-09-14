import { getKeycloakInstance } from "@react-keycloak/ssr";
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { first, Subject } from "rxjs";

const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

const makeHttp = (token?: string): AxiosInstance => {
  if (!process.browser && !token) {
    throw new Error("The access token must be provided");
  }

  http.interceptors.request.use((request) => {
    if (process.browser) {
      return addTokenByKeycloak(request);
    } else {
      addToken(request, token!);
      return request;
    }
  });

  return http;
};

export const keycloakEvents$ = new Subject();

function addTokenByKeycloak(
  request: AxiosRequestConfig
): AxiosRequestConfig | Promise<AxiosRequestConfig> {
  const keycloak = getKeycloakInstance(null as any);
  if (keycloak?.token) {
    addToken(request, keycloak?.token);
    return request;
  }
  
  return new Promise((resolve, reject) => {
    keycloakEvents$.pipe(first()).subscribe((event: any) => {
      if (event.type === "success" && keycloak?.token) {
        addToken(request, keycloak?.token!);
        resolve(request);
      } else {
        reject("Unauthenticated");
      }
    });
  });
}

function addToken(request: AxiosRequestConfig, token: string) {
  request.headers["Authorization"] = `Bearer ${token}`;
}

export default makeHttp;
