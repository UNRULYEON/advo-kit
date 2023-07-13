import { FC, ReactNode, useState } from "react";
import useSWRMutation from "swr/mutation";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import Box from "@mui/material/Box";
import EmojiEmotionsRoundedIcon from "@mui/icons-material/EmojiEmotionsRounded";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";

type DrawerItem = {
  icon: ReactNode | string;
  name: string;
  href: string;
};

const drawerItems: DrawerItem[] = [
  { icon: <EmojiEmotionsRoundedIcon />, name: "Decks", href: "/admin/decks" },
  { icon: <EmojiEmotionsRoundedIcon />, name: "Cards", href: "/admin/cards" },
];

const drawerWidth = 240;

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
  const navigate = useNavigate();
  const { trigger } = useSWRMutation("/api/auth/logout", logOut);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleOnLogout = () => {
    trigger().then(() => {
      window.location.reload();
    });
  };

  const handleOnNavItem = (to: string) => {
    navigate(to);
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {drawerItems.map(({ name, icon, href }) => (
          <ListItem
            onClick={() => handleOnNavItem(href)}
            key={name}
            disablePadding
          >
            <ListItemButton>
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText primary={name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={handleOnLogout}>
            <ListItemIcon>
              <LogoutRoundedIcon />
            </ListItemIcon>
            <ListItemText primary={"Log out"} />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window.document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            🥑 Communikit
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          marginTop: "64px",
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          height: { sm: "calc(100% - 64px)" },
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
