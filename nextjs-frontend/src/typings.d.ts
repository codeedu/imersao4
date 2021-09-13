import { Tenant } from "./components/tenant/TenantProvider";

declare module "http" {
  interface IncomingMessage {
    subdomain?: string;
  }
}