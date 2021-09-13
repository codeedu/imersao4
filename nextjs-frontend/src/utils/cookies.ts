import cookie from "cookie";
import Cookies from "js-cookie";

export function parseCookies(req?: any) {
  if (!req || !req.headers) {
    return {};
  }

  return cookie.parse(req.headers.cookie || "");
}

export function destroyCookie(key: string) {
  Cookies.remove(key);
}
