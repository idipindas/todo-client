import { useState } from "react";
import { Typography, Box, Grid } from "@mui/material";

const menuItems = ["My List"];

const MenuList = () => {
    
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <Grid size={12} container spacing={1} sx={{ p: 2 }}>
      {menuItems.map((item, index) => (
        <Grid size={12} key={index}>
          <Box
            onClick={() => setActiveIndex(index)}
            sx={{
              cursor: "pointer",
              pl: 2,
              py: 1,
              borderLeft: `4px solid ${
                activeIndex === index ? "#6366f1" : "transparent"
              }`,
              backgroundColor:
                activeIndex === index ? "#eef2ff" : "transparent",
              transition: "all 0.3s ease-in-out",
            }}
          >
            <Typography
              color="#111827"
              fontWeight={500}
              fontSize={"1.125rem"}
              lineHeight={"1.75rem"}
            >
              {item}
            </Typography>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default MenuList;
