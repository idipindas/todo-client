import {
  Avatar,
  Box,
  Button,
  Drawer,
  Grid,
  IconButton,
  Modal,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import { Menu as MenuIcon } from "@mui/icons-material";
import MenuList from "./MenuList";
import { Outlet, useNavigate } from "react-router-dom";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};
const Layout = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  return (
    <div>
      <Grid container>
        <Grid
          size={12}
          height={60}
          sx={{
            borderBottom: ".99px solid #e5e7eb",
            px: 2,
          }}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box display="flex" alignItems="center">
            {isMobile && (
              <IconButton sx={{ mr: 1 }} onClick={toggleMobileMenu}>
                <MenuIcon />
              </IconButton>
            )}
            <CheckCircleOutlineRoundedIcon
              fontSize="large"
              sx={{ color: "#4f46e5", mr: 1 }}
            />
            <Typography
              fontWeight={600}
              fontSize={"1.25rem"}
              lineHeight={"1.75rem"}
              color="#111827"
            >
              Task Manager
            </Typography>
          </Box>

          <Box display="flex" alignItems="center" onClick={() => handleOpen()}>
            <Avatar
              sx={{ bgcolor: "#e0e7ff", mr: 1, color: "#4f46e5" }}
              variant="circular"
            >
              D
            </Avatar>
            {!isMobile && (
              <Typography
                fontWeight={500}
                fontSize={"0.875rem"}
                lineHeight={"1.25rem"}
                color="#374151"
              >
                Dipindas
              </Typography>
            )}
          </Box>
        </Grid>

        {!isMobile ? (
          <Grid
            size={3}
            sx={{ borderRight: "1px solid #e5e7eb", minHeight: "88vh" }}
          >
            <MenuList />
          </Grid>
        ) : (
          <Drawer
            open={mobileMenuOpen}
            onClose={toggleMobileMenu}
            PaperProps={{ sx: { width: 240 } }}
          >
            <Box sx={{ p: 2 }}>
              <Typography variant="h6" fontWeight={600} mb={2}>
                Menu
              </Typography>
              <MenuList />
            </Box>
          </Drawer>
        )}

        <Grid
          size={{ md: 9, xs: 12 }}
          display={"flex"}
          justifyContent={"center"}
          sx={{ p: 3 }}
          container
        >
          <Grid size={{ md: 11, xs: 12 }} p={1}>
            <Outlet />
          </Grid>
        </Grid>
      </Grid>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Grid container spacing={2}>
            <Grid size={12}>
              <Typography variant="h6" fontWeight={600}>
                Confirm Logout
              </Typography>
              <Typography variant="body1" color="text.secondary" mt={1}>
                Are you sure you want to log out?
              </Typography>
            </Grid>

            <Grid size={12} display="flex" justifyContent="flex-end" mt={2}>
              <Button onClick={handleClose} variant="outlined" sx={{ mr: 2 }}>
                Cancel
              </Button>
              <Button onClick={handleLogout} variant="contained" color="error">
                Logout
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
};

export default Layout;
