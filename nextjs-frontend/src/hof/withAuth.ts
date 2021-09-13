import { KeycloakProfile, KeycloakTokenParsed } from "keycloak-js";
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from "next";
import { ParsedUrlQuery } from "querystring";
import { validateAuth, Token } from "../utils/auth";
import { Request } from "express";

export type AuthServerSideProps<
  P extends { [key: string]: any } = { [key: string]: any },
  Q extends ParsedUrlQuery = ParsedUrlQuery
> = (
  ctx: GetServerSidePropsContext<Q>,
  auth: { tokenParsed: KeycloakTokenParsed & KeycloakProfile; token: string }
) => Promise<GetServerSidePropsResult<P>>;

export function withAuth<P, Q extends ParsedUrlQuery>(
  func: AuthServerSideProps<P, Q>
): GetServerSideProps<P, Q> {
  return async (context) => {
    const request = context.req as Request;
    const auth = validateAuth(request);
    
    if (!auth) {
      const destination = "/login";
      const from = context.req.url;
      return {
        redirect: {
          permanent: false,
          destination: `${destination}?from=${from}`,
        },
      };
    }

    const token = (auth as Token).token;
    const payload = (auth as Token).payload;
    
    if (request?.subdomain && payload.subdomain !== request?.subdomain) {
      const destination = request.headers.host?.replace(
        request.subdomain,
        payload.subdomain
      ) as string;
      return {
        redirect: {
          permanent: false,
          destination: `${request.protocol}://${destination}`,
        },
      };
    }

    const result = await func(context, {
      tokenParsed: payload,
      token,
    });
    if ("props" in result) {
      result.props = {
        user: payload,
        ...result.props,
      };
    }
    return result;
  };
}
