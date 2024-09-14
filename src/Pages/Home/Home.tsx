import React, { useEffect, useState } from "react";
import {
  Grid,
  Box,
  Typography,
  Skeleton,
  TextField,
  Button,
} from "@mui/material";
import CloudIcon from "@mui/icons-material/Cloud";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import { redirect } from "react-router-dom";
import { FetchData } from "../../Utils/FetchData";
import { day, generatedUrl } from "../../Utils/types";
import { DayCounter } from "../../Hooks/DayCounter";
import { getLocation } from "../../Utils/GetLocation";

function Home() {
  const [location, setLocation] = useState({ lat: 0, lon: 0 });
  const [error, setError] = useState("");
  const [city, setCity] = useState("");
  const [Url, setUrl] = useState<generatedUrl>({
    urlQuery: "",
    urlAddress: "",
  });
  const [isPending, data] = FetchData(Url.urlQuery, Url.urlAddress);
  let watchId: number | null = null;
  const searchCityWeatherHandler = () => {
    setUrl({
      urlQuery: "searchCityWeatherInfo",
      urlAddress: city
        ? `https://api.weatherapi.com/v1/forecast.json?q=${city}&days=6&key=f5b87b69ed59461fad195517241409`
        : "",
    });
    setCity("");
  };

  useEffect(() => {
       getLocation(watchId,setLocation,setError)
    setUrl({
      urlQuery: "weatherInfo",
      urlAddress:
        location.lat && location.lon
          ? `https://api.weatherapi.com/v1/forecast.json?q=${location.lat},${location.lon}&days=6&key=f5b87b69ed59461fad195517241409`
          : "",
    });
    return ()=>{
       if (watchId) {
              navigator.geolocation.clearWatch(watchId);
            }
    }
  }, [location]);



  if (error) redirect("/not-found");
  if (isPending)
    return <Skeleton variant="rectangular" width={210} height={118} />;
  if (data) {
    return (
      <>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Enter City ..."
              InputProps={{
                style: { backgroundColor: "white", color: "black" },
              }}
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              style={{
                backgroundColor: "#1E3A8A",
                color: "white",
                padding: "1rem",
              }}
              onClick={searchCityWeatherHandler}
            >
              Search
            </Button>
          </Grid>
        </Grid>
        <Box className="main">
          <Grid
            container
            spacing={3}
            justifyContent="center"
            className="wrapper"
          >
            <Grid item xs={6}>
              <Typography variant="h4">
                {data?.location?.name}
                <br />
                <Typography component="small" sx={{ fontSize: "0.5em" }}>
                  {data?.location?.localtime}
                </Typography>
              </Typography>
              <Typography variant="h5" className="flexC">
                <CloudIcon fontSize="large" /> {data?.current?.condition?.text}
              </Typography>
            </Grid>

            <Grid item xs={6} sx={{ textAlign: "center" }}>
              <Typography variant="h1" className="temperature">
                <span>{data?.current?.temp_c}°</span>
                <br />
                <Typography component="small">
                  {data?.current?.temp_c}
                </Typography>
              </Typography>
            </Grid>

            <Grid item xs={12} className="daysBox">
              <Grid container spacing={2} justifyContent="space-between">
                {data?.forecast?.forecastday.map((day: day, index: number) => (
                  <Grid item xs={4} sm={2} textAlign="center" key={index}>
                    <Typography variant="h6">{DayCounter(day.date)}</Typography>
                    <Typography>
                      <WbSunnyIcon fontSize="large" />
                      <br />
                      {day.day.mintemp_c}°/{day.day.maxtemp_c}°
                    </Typography>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </>
    );
  }
}

export default Home;
