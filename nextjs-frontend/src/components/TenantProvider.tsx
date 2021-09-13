import { createContext, useEffect, useState } from "react";
import { useAuthSwr } from "../hooks/useAuthSwr";
import { isEqual } from "lodash"; //lodash

export interface Tenant {
  id: string;
  name: string;
  subdomain: string;
  balance: number;
}

const TenantContext = createContext<Tenant>(null as any);

export default TenantContext;

export const TenantProvider: React.FunctionComponent = (props) => {
  const [tenant, setTenant] = useState<Tenant>();
  const { data, error } = useAuthSwr("my-account", {
    refreshInterval: 10000,
  });

  useEffect(() => {
    if (!isEqual(data, tenant)) {
      setTenant(data);
    }
  }, [data, tenant]);

  return (
    <TenantContext.Provider value={tenant as any}>
      {props.children}
    </TenantContext.Provider>
  );
};
