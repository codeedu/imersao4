import { IconButton, MenuItem, Divider, Menu } from "@material-ui/core";
import AccountBox from "@material-ui/icons/AccountBox";
import { useKeycloak } from "@react-keycloak/ssr";
import { KeycloakInstance } from "keycloak-js";
import { useRouter } from "next/router";
import React, { useState } from "react";

const UserAccountMenu: React.FunctionComponent = () => {
  const { keycloak } = useKeycloak<KeycloakInstance>();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const router = useRouter();
  const handleOpen = (event: any) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <React.Fragment>
      <IconButton edge="end" color="inherit" onClick={handleOpen}>
        <AccountBox />
      </IconButton>

      <Menu
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
        getContentAnchorEl={null}
      >
        <MenuItem disabled={true}>
          {(keycloak?.idTokenParsed as any).family_name}
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => router.push("/logout")}>Logout</MenuItem>
      </Menu>
    </React.Fragment>
  );
};

export default UserAccountMenu;
