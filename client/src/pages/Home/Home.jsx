import React, { useState } from "react";
import {
  CardActionArea,
  Grid,
  Paper,
  Box,
  InputBase,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Card,
  CardContent,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import axios from "axios";
import styles from "./styles.module.css";

export const Home = () => {
  const [data, setData] = useState("");
  const [search, setSearch] = useState("");
  const [backgroundImage, setBackgroundImage] = useState(
    "url('images/background.jpg')"
  );
  const [searchInitiated, setSearchInitiated] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [temperatureUnit, setTemperatureUnit] = useState("C");

  // ************ PROFILE DROPDOWN ************//
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);

    if (anchorEl) {
      axios
        .get("http://localhost:8080/logout", { withCredentials: true })
        .then(function (response) {
          console.log(response.data);
          // Assuming the API response contains a success message
          if (response.data === "Logged out successfully") {
            // Redirect to the login page or another desired route
            window.location.href = "http://localhost:3000/";
          } else {
            // Handle error cases
            console.error("Logout failed");
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  const handleProfileClick = (event) => {
    console.log("Profile icon clicked!");
    handleClick(event);
  };

  // ************ SEARCH WEATHER ACCORDING TO CITY ************//
  const searchCity = () => {
    axios
      .post(`http://localhost:8080/api/weather/?city=${search}`, {
        withCredentials: true,
      })
      .then(function (response) {
        console.log(response.data);
        setData(response.data);
        setBackgroundImage(getBackgroundImage(response.data.weather));
        setSearchInitiated(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleSearch = () => {
    searchCity();
  };

  const handleSearchInitiated = (e) => {
    if (e.key === "Enter") {
      setSearchInitiated(true);
      searchCity();
    }
  };

  // ************ CHANGE BACKGROUND IMAGE ************//
  const getBackgroundImage = (weather) => {
    const lowerCaseWeather = weather.toLowerCase();
    if (!search || search.length === 0) {
      return "url('images/default-background.jpg')";
    }
    if (lowerCaseWeather.includes("sunny")) {
      return "url('images/sunny.jpg')";
    } else if (lowerCaseWeather.includes("clear")) {
      return "url('images/clear.jpg')";
    } else if (
      lowerCaseWeather.includes("rainy") ||
      lowerCaseWeather.includes("drizzle")
    ) {
      return "url('images/rainy.jpg')";
    } else if (lowerCaseWeather.includes("clouds")) {
      return "url('images/cloudy.jpg')";
    } else if (lowerCaseWeather.includes("snow")) {
      return "url('images/snow.jpg')";
    } else if (lowerCaseWeather.includes("mist")) {
      return "url('images/mist.jpg')";
    } else if (
      lowerCaseWeather.includes("haze") ||
      lowerCaseWeather.includes("smoke")
    ) {
      return "url('images/haze.jpg')";
    } else {
      return "url('images/background.jpg')";
    }
  };

  // ************ TEMPERATURE CONVERSION ************//
  const convertTemperature = (temperature, unit) =>
    unit === "C" ? temperature : ((temperature * 9) / 5 + 32).toFixed(2);

  const toggleTemperatureUnit = () => {
    setTemperatureUnit((prevUnit) => (prevUnit === "C" ? "F" : "C"));
  };

  return (
    <>
      <div
        className={styles.homeContainer}
        style={{ backgroundImage: backgroundImage }}
      >
        {/* ************ PROFILE DROPDOWN ************ */}
        <div className={styles.profileIcon} onClick={handleProfileClick}>
          <AccountCircleIcon fontSize="large" />
        </div>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <MenuItem onClick={handleClose}>Logout</MenuItem>
        </Menu>

        <h2 className={styles.heading}>Weather Application</h2>

        {/* ************ SEARCHBAR ************ */}
        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: 300,
            margin: 5,
          }}
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
        >
          <InputBase
            sx={{ ml: 3, flex: 1 }}
            placeholder="Enter City Name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <IconButton
            type="button"
            sx={{ p: "10px" }}
            aria-label="search"
            onClick={handleSearch}
          >
            <SearchIcon />
          </IconButton>
        </Paper>

        {/* If Search value is entered completely, only then the weather card is displayed */}
        {searchInitiated ? (
          <Card
            sx={{
              maxWidth: 345,
              borderRadius: 7,
              width: 450,
              backgroundColor: "rgba(255, 255, 255, 0.45)",
            }}
          >
            <CardActionArea>
              <Box
                sx={{
                  textAlign: "center",
                  margin: 2,
                }}
              >
                <Typography variant="h6" gutterBottom>
                  {data.city}
                </Typography>
              </Box>

              <Box
                sx={{
                  height: 80,
                  textAlign: "center",
                  marginTop: 1,
                }}
              >
                <Typography
                  variant="h3"
                  gutterBottom
                  onClick={toggleTemperatureUnit}
                >
                  {convertTemperature(data.temperature, temperatureUnit)}°
                  {temperatureUnit}
                </Typography>
                <Typography variant="h6" gutterBottom>
                  {data.weather}
                </Typography>
              </Box>
              <CardContent>
                <Grid
                  container
                  rowSpacing={1}
                  columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                  sx={{ margin: 2 }}
                >
                  <Grid item xs={4}>
                    <Typography sx={{ display: "flex", alignItems: "center" }}>
                      <img
                        src="icons/wind.png"
                        alt="wind-icon"
                        style={{ height: 40, width: 40, marginRight: "8px" }}
                      />
                      {data.wind}
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography sx={{ display: "flex", alignItems: "center" }}>
                      <img
                        src="icons/clouds.png"
                        alt="cloud-icon"
                        style={{ height: 40, width: 40, marginRight: "8px" }} // Adjust spacing as needed
                      />
                      {data.clouds}%
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography sx={{ display: "flex", alignItems: "center" }}>
                      <img
                        src="icons/humidity.png"
                        alt="humidity-icon"
                        style={{ height: 40, width: 40, marginRight: "8px" }} // Adjust spacing as needed
                      />
                      {data.humidity}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </CardActionArea>
          </Card>
        ) : (
          <div>Enter a city name to view weather card</div>
        )}
      </div>
    </>
  );
};
