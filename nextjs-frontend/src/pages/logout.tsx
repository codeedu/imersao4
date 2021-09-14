import { useKeycloak } from "@react-keycloak/ssr";
import { KeycloakInstance } from "keycloak-js";
import { GetServerSideProps } from "next";
import { createAuthCookies, validateAuth } from "../utils/auth";

export default function LogoutPage() {
  const { initialized, keycloak } = useKeycloak<KeycloakInstance>();
  if (initialized && typeof window !== "undefined") {
    createAuthCookies();
    keycloak?.logout({
      redirectUri: window.location.origin + "/login",
    });
  }

  return null;
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const auth = validateAuth(ctx.req);
  if (!auth) {
    return {
      redirect: {
        permanent: false,
        destination: "login",
      },
    };
  }

  return {
    props: {},
  };
};
