import React from "react";
import styles from "./styles.module.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { CardActionArea } from "@mui/material";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import GoogleIcon from "@mui/icons-material/Google";

export const Login = () => {
  const handleLogin = async () => {
    try {
      window.location.href = "http://localhost:8080/auth/google";
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <>
      <div className={styles.loginContainer}>
        <h1 className={styles.heading}>Login to Weather Application</h1>
        <Card
          sx={{
            borderRadius: 7,
            width: 350,
            backgroundColor: "rgba(255, 255, 255, 0.5)",
          }}
        >
          <CardActionArea>
            <CardContent>
              <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                <Grid item xs={12}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      margin: 3,
                    }}
                  >
                    <img
                      className={styles.img}
                      src="icons/user.png"
                      alt="login"
                    />
                  </Box>
                </Grid>

                <Grid item xs={12}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Button
                      component="label"
                      variant="contained"
                      color="info"
                      startIcon={<GoogleIcon />}
                      onClick={handleLogin}
                      sx={{
                        borderRadius: 5,
                      }}
                    >
                      Sign in with Google
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </CardActionArea>
        </Card>
      </div>
    </>
  );
};
