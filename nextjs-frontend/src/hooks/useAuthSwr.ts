import { useRouter } from "next/router";
import { AxiosError } from "axios";
import { useEffect } from "react";
import useSWR from "swr";
import makeHttp from "../utils/http";
import { SWRConfiguration } from "swr/dist/types";

const fetcher = (url: string) =>
  makeHttp()
    .get(url)
    .then((res) => res.data);

export function useAuthSwr(url: string, config?: SWRConfiguration) {
  const { data, error } = useSWR<any, AxiosError>(url, fetcher, config);
  const { push } = useRouter();

  useEffect(() => {
    if (error?.response?.status === 401) {
      push("/logout");
    }
    if (error) {
      console.error(error);
    }
  }, [data, error, push]);

  return { data, error };
}
