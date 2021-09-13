import { useKeycloak } from "@react-keycloak/ssr";
import { KeycloakInstance } from "keycloak-js";
import { GetServerSideProps } from "next";
import { validateAuth } from "../utils/auth";
import { destroyCookie } from "../utils/cookies";

export default function LogoutPage() {
  const { initialized, keycloak } = useKeycloak<KeycloakInstance>();
  if (initialized && typeof window !== "undefined") {
    destroyCookie('kcToken');
    destroyCookie('kcIdToken');
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
