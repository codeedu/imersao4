import { AppBar, Toolbar, Typography, makeStyles } from "@material-ui/core";
import StoreIcon from "@material-ui/icons/Store";
import { useKeycloak } from "@react-keycloak/ssr";
import React, { useContext } from "react";
import TenantContext from "../TenantProvider";
import Menu from "./Menu";
import UserAccountMenu from "./UserAccountMenu";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
});
//next static
const Navbar: React.FunctionComponent = () => {
  const { initialized, keycloak } = useKeycloak();
  const tenant = useContext(TenantContext);
  const classes = useStyles();

  return initialized && keycloak?.authenticated && tenant ? (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Menu />
          <StoreIcon />
          <Typography component="h1" variant="h6" className={classes.title}>
            Fincycle - {tenant.name}
          </Typography>
          <Typography>Saldo R$ {tenant.balance}</Typography>
          <UserAccountMenu />
        </Toolbar>
      </AppBar>
    </div>
  ) : null;
};

export default Navbar;
