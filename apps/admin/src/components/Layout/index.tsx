import { FC, ReactNode } from "react";
import useSWRMutation from "swr/mutation";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";

const LOGOUT_URL = import.meta.env.DEV
  ? "https://localhost:3000/api/auth/logout"
  : "/api/auth/logout";

async function logOut() {
  await fetch(LOGOUT_URL, {
    method: "POST",
    credentials: "include",
  });
}

type LayoutProps = {
  children: ReactNode;
};

const Layout: FC<LayoutProps> = ({ children }) => {
  const { trigger } = useSWRMutation("/api/auth/logout", logOut);

  const handleOnLogout = () => {
    void trigger().then(() => {
      window.location.reload();
    });
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            🥑 Communikit
          </Typography>
          <Tooltip title="Log out">
            <IconButton onClick={handleOnLogout}>
              <LogoutRoundedIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
      <Box component={"main"} p={3}>
        {children}
      </Box>
    </>
  );
};

export default Layout;
