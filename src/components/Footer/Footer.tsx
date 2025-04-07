import * as React from "react";
import { Box, Typography, Container } from "@mui/material";

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#000000",
        color: "white",
        py: 3,
        position: "relative",
        bottom: 0,
        width: "100%",
      }}
    >
      <Container
        maxWidth="lg"
        sx={{ display: "flex", justifyContent: "center" }}
      >
        <Typography variant="body1" sx={{ textAlign: "center" }}>
          &copy; {new Date().getFullYear()} Your Company. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
